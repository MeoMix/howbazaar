import * as fs from 'fs';
import path from 'path';
import { createHash } from 'crypto';
import { removeSpecialCharacters } from './stringUtils';

export async function deleteFiles(files: string[], assetPath: string): Promise<void> {
    // Create an array of promises for deleting unused files
    const deletePromises = files.map(async file => {
        const filePath = path.join(assetPath, file);

        return fs.promises.unlink(filePath).then(() => {
            console.log(`Deleted file: "${file}"`)
        });
    });

    // Wait for all deletes to complete in parallel
    await Promise.all(deletePromises);
}

async function hashFile(filepath: string): Promise<string> {
    const data = await fs.promises.readFile(filepath);
    return createHash('sha256').update(data).digest('hex');
}

export async function copyAndRenameFiles(
    foundImages: { name: string; matchedFile: string }[],
    sourceDir: string,
    outputDir: string
): Promise<string[]> {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const copiedFiles: string[] = [];

    for (const { name, matchedFile } of foundImages) {
        const sourcePath = path.join(sourceDir, matchedFile);
        const cleanName = removeSpecialCharacters(name);
        const targetPath = path.join(outputDir, `${cleanName}${path.extname(matchedFile)}`);

        try {
            // Check if target file exists
            try {
                await fs.promises.access(targetPath);

                // If it exists, compare the files
                const [sourceStats, targetStats] = await Promise.all([
                    fs.promises.stat(sourcePath),
                    fs.promises.stat(targetPath)
                ]);

                // First check size and mtime as a quick filter
                if (sourceStats.size === targetStats.size &&
                    sourceStats.mtimeMs === targetStats.mtimeMs) {
                    console.log(`Skipping identical file (quick check): ${cleanName}${path.extname(matchedFile)}`);
                    continue;
                }

                // If quick check fails, do a thorough hash comparison
                const [sourceHash, targetHash] = await Promise.all([
                    hashFile(sourcePath),
                    hashFile(targetPath)
                ]);

                if (sourceHash === targetHash) {
                    console.log(`Skipping identical file (hash check): ${cleanName}${path.extname(matchedFile)}`);
                    continue;
                }
            } catch {
                // File doesn't exist, proceed with copy
            }

            // Copy the file
            await fs.promises.copyFile(sourcePath, targetPath);
            console.log(`Copied and renamed: ${matchedFile} -> ${cleanName}${path.extname(matchedFile)}`);
            copiedFiles.push(targetPath);
        } catch (err) {
            console.error(`Error copying ${matchedFile} to ${cleanName}${path.extname(matchedFile)}:`, err);
        }
    }

    return copiedFiles;
}
