import * as dotenv from 'dotenv';
dotenv.config({ path: './.env.local' });

import axios from 'axios';
import { readdir } from 'fs/promises';
import { createReadStream } from 'fs';
import { join, relative } from 'path';
import { execSync } from 'child_process';

// Load environment variables
const API_KEY = process.env.BUNNY_API_KEY;
const PURGE_API_KEY = process.env.BUNNY_PURGE_API_KEY;
const PULL_ZONE_URL = process.env.BUNNY_PULL_ZONE_URL;

const STORAGE_NAME = process.env.BUNNY_STORAGE_NAME;
const STORAGE_URL = `https://storage.bunnycdn.com/${STORAGE_NAME}/images`;

if (!API_KEY || !STORAGE_NAME) {
    console.error("❌ Missing required environment variables.");
    process.exit(1);
}

// NOTE: This doesn't include the favicon which is a directory above. No real reason to not support it.
const IMAGES_DIR = "static/images";

const purgeCache = async (relativePath: string) => {
    if (!PURGE_API_KEY || !PULL_ZONE_URL) {
        console.warn("⚠️ Skipping cache purge - missing purge API key or pull zone URL");
        return;
    }

    const fullUrl = `${PULL_ZONE_URL}images/${relativePath}`.replace(/\\/g, '/');

    try {
        const response = await axios.post("https://api.bunny.net/purge", null, {
            params: { url: fullUrl },
            headers: {
                AccessKey: PURGE_API_KEY
            }
        });

        console.log(`🧹 Cache purged for: ${fullUrl} - Status: ${response.status}`);
    } catch (error: any) {
        console.error(`❌ Failed to purge cache for ${fullUrl}:`, error.response?.data || error.message);
    }
};

// Function to upload a file
const uploadFile = async (filePath: string) => {
    try {
        const relativePath = relative(IMAGES_DIR, filePath);
        const storagePath = `${STORAGE_URL}/${relativePath}`.replace(/\\/g, '/');
        console.log(`📤 Uploading: ${filePath} → ${storagePath}`);

        const fileStream = createReadStream(filePath);

        const response = await axios.put(storagePath, fileStream, {
            headers: {
                AccessKey: API_KEY!,
                "Content-Type": "application/octet-stream",
            },
        });

        console.log(`✅ Uploaded: ${relativePath} - Status: ${response.status}`);

        await purgeCache(relativePath); // Add this line
    } catch (error: any) {
        console.error(`❌ Failed to upload ${filePath}:`, error.response?.data || error.message);
    }
};

// Recursively find all image files
const getFiles = async (dir: string): Promise<string[]> => {
    const entries = await readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
        entries.map((entry) => {
            const fullPath = join(dir, entry.name);
            return entry.isDirectory() ? getFiles(fullPath) : fullPath;
        })
    );
    return files.flat();
};

function getChangedImageFiles(): string[] {
    const output = execSync(`git diff --name-only HEAD`, { encoding: "utf-8" });
    return output
        .split("\n")
        .filter((line: string) => line.match(/\.(png|jpe?g|gif|webp|avif)$/i))
        .filter((line: string) => line.startsWith("static/images/"));
}

// Upload specific files
(async () => {
    try {
        // Check for --changed flag
        const useChangedFiles = process.argv.includes('--changed');
        let fileNames: string[];

        if (useChangedFiles) {
            fileNames = getChangedImageFiles().map(file => relative(IMAGES_DIR, file));
            if (fileNames.length === 0) {
                console.log("ℹ️ No changed image files found");
                process.exit(0);
            }
            console.log(`📂 Found ${fileNames.length} changed image files to upload...`);
        } else {
            // Get file names from command line arguments, excluding any flags
            fileNames = process.argv.slice(2).filter(arg => !arg.startsWith('--'));

            if (fileNames.length === 0) {
                console.error("❌ Please provide at least one file name to upload or use --changed flag");
                process.exit(1);
            }
            console.log(`📂 Uploading ${fileNames.length} specified files to BunnyCDN...`);
        }

        // Get all available files in the images directory
        const allFiles = await getFiles(IMAGES_DIR);

        // Filter files to only include the specified ones
        const filesToUpload = allFiles.filter(file => {
            const relativePath = relative(IMAGES_DIR, file);
            return fileNames.includes(relativePath);
        });

        if (filesToUpload.length === 0) {
            console.error("❌ No matching files found in the images directory");
            process.exit(1);
        }

        // Upload the filtered files
        for (const file of filesToUpload) {
            await uploadFile(file);
        }

        console.log("🎉 All specified files uploaded!");
    } catch (error) {
        console.error("❌ Error:", error);
    }
})();
