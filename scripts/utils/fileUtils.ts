
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
