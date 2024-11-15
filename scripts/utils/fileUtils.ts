
import * as fs from 'fs';
import path from 'path';

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

/**
 * Flattens the directory hierarchy by moving all files to the root
 * and deleting empty folders.
 * 
 * @param rootDir The root directory to flatten.
 */
export async function flattenDirectory(rootDir: string): Promise<void> {
    const filesToMove: string[] = [];
    const directoriesToDelete: string[] = [];

    /**
     * Recursively collect files and directories.
     */
    async function collectFilesAndDirs(currentDir: string) {
        const entries = await fs.promises.readdir(currentDir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name);

            if (entry.isDirectory()) {
                directoriesToDelete.push(fullPath);
                await collectFilesAndDirs(fullPath);
            } else if (entry.isFile()) {
                filesToMove.push(fullPath);
            }
        }
    }

    // Collect all files and directories
    await collectFilesAndDirs(rootDir);

    // Move all files to the root directory
    for (const filePath of filesToMove) {
        const fileName = path.basename(filePath);
        const destination = path.join(rootDir, fileName);

        // Ensure no overwriting of existing files with the same name
        let finalDestination = destination;
        let counter = 1;
        while (fs.existsSync(finalDestination)) {
            const parsedPath = path.parse(destination);
            finalDestination = path.join(
                parsedPath.dir,
                `${parsedPath.name} (${counter})${parsedPath.ext}`
            );
            counter++;
        }

        console.log(`Moving ${filePath} to ${finalDestination}`);
        await fs.promises.rename(filePath, finalDestination);
    }

    // Delete all directories (in reverse order to ensure they're empty)
    for (const dirPath of directoriesToDelete.reverse()) {
        console.log(`Deleting directory: ${dirPath}`);
        await fs.promises.rmdir(dirPath);
    }

    console.log('Directory flattening complete.');
}