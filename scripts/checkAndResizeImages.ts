import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export async function checkAndResizeImages(inputFolder: string, outputFolder: string) {
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder);
    }

    const files = fs.readdirSync(inputFolder).filter(file => {
        const filePath = path.join(inputFolder, file);
        return fs.statSync(filePath).isFile();
    });

    const resizePromises = files.map(async (file) => {
        const filePath = path.join(inputFolder, file);

        try {
            const image = sharp(filePath);
            const metadata = await image.metadata();

            let width = metadata.width || 0;
            let height = metadata.height || 0;

            // Skip resizing if image is already 256x256 or smaller
            if (width <= 256 && height <= 256) {
                console.log(`Skipping ${file} as it is already 256x256 or smaller.`);
                return image.toFile(path.join(outputFolder, file));
            }

            // Halve the dimensions as long as they stay above 256x256
            while (width / 2 >= 256 && height / 2 >= 256) {
                width = Math.floor(width / 2);
                height = Math.floor(height / 2);
            }

            console.log(`Resizing ${file} to ${width}x${height}...`);

            // Perform the resize
            return image
                .resize(width, height)
                .toFile(path.join(outputFolder, file)).then(() => {
                    console.log(`Resized ${file} and saved to resized folder.`);
                });
        } catch (error) {
            console.error(`Failed to process ${file}:`, error);
        }
    });

    await Promise.all(resizePromises);
}