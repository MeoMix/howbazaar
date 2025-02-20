import * as dotenv from 'dotenv';
dotenv.config({ path: './.env.local' });

import axios from 'axios';
import { readdir } from 'fs/promises';
import { createReadStream } from 'fs';
import { join, relative, dirname } from 'path';

// Load environment variables
const API_KEY = process.env.BUNNY_API_KEY;
const STORAGE_NAME = process.env.BUNNY_STORAGE_NAME;
const STORAGE_URL = `https://storage.bunnycdn.com/${STORAGE_NAME}/images`;

if (!API_KEY || !STORAGE_NAME) {
    console.error("❌ Missing required environment variables.");
    process.exit(1);
}

// NOTE: This doesn't include the favicon which is a directory above. No real reason to not support it.
const IMAGES_DIR = "static/images";

// Function to upload a file
const uploadFile = async (filePath: string) => {
    try {
        // Get relative path (e.g., "items/ATM.avif" from "static/images/items/ATM.avif")
        const relativePath = relative(IMAGES_DIR, filePath);

        // Construct the full storage path (e.g., "/images/items/ATM.avif")
        const storagePath = `${STORAGE_URL}/${relativePath}`.replace(/\\/g, '/'); // Ensure UNIX-style paths

        console.log(`📤 Uploading: ${filePath} → ${storagePath}`);

        const fileStream = createReadStream(filePath);

        const response = await axios.put(storagePath, fileStream, {
            headers: {
                AccessKey: API_KEY!,
                "Content-Type": "application/octet-stream",
            },
        });

        console.log(`✅ Uploaded: ${relativePath} - Status: ${response.status}`);
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

// Upload all images
(async () => {
    try {
        const files = await getFiles(IMAGES_DIR);
        console.log(`📂 Found ${files.length} images. Uploading to BunnyCDN...`);

        for (const file of files) {
          await uploadFile(file);
        }

        console.log("🎉 All images uploaded!");
    } catch (error) {
        console.error("❌ Error:", error);
    }
})();
