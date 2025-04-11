import * as fs from 'fs';
import path from 'path';
import { createHash } from 'crypto';

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

async function hashFile(filePath: string): Promise<string> {
    const data = await fs.promises.readFile(filePath);
    return createHash('sha256').update(data).digest('hex');
}

export async function copyAndRenameFiles(
    imageCopyDescriptors: { fileName: string; relativePath: string }[],
    sourceDir: string,
    outputDir: string
): Promise<string[]> {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const copiedFiles: string[] = [];

    for (const { fileName, relativePath } of imageCopyDescriptors) {
        const sourcePath = path.join(sourceDir, relativePath);
        const fileExtension = path.extname(relativePath);
        const targetPath = path.join(outputDir, `${fileName}${fileExtension}`);

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
                    console.log(`Skipping identical file (quick check): ${fileName}${fileExtension}`);
                    continue;
                }

                // If quick check fails, do a thorough hash comparison
                const [sourceHash, targetHash] = await Promise.all([
                    hashFile(sourcePath),
                    hashFile(targetPath)
                ]);

                if (sourceHash === targetHash) {
                    console.log(`Skipping identical file (hash check): ${fileName}${fileExtension}`);
                    continue;
                }
            } catch {
                // File doesn't exist, proceed with copy
            }

            // Copy the file
            await fs.promises.copyFile(sourcePath, targetPath);
            console.log(`Copied and renamed: ${relativePath} -> ${fileName}${fileExtension}`);
            copiedFiles.push(targetPath);
        } catch (err) {
            console.error(`Error copying ${relativePath} to ${fileName}${fileExtension}:`, err);
        }
    }

    return copiedFiles;
}
