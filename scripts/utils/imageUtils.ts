import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

export async function convertImagesToAvif(inputFolder: string, outputFolder: string) {
    try {
        // Ensure output folder exists
        await fsPromises.mkdir(outputFolder, { recursive: true });

        // Read files in the input folder
        const files = await fsPromises.readdir(inputFolder);

        // Process each file asynchronously
        const conversions = files.map(async (file) => {
            if (['.jpg', '.jpeg', '.png'].includes(path.extname(file).toLowerCase())) {
                const inputPath = path.join(inputFolder, file);
                const outputPath = path.join(outputFolder, file.replace(/\.(jpg|jpeg|png)$/i, '.avif'));

                try {
                    return sharp(inputPath).avif({ quality: 80 }).toFile(outputPath).then(() => {
                        console.log('Converted', file, 'to', outputPath);
                    });
                } catch (err) {
                    console.error('Error converting', file, ':', err);
                }
            }
        });

        // Wait for all conversions to complete
        await Promise.all(conversions);
    } catch (err) {
        console.error('Error processing the input folder:', err);
    }
}

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
                console.log(`Skipping resize of ${file} as it is already 256x256 or smaller. Copying as-is to resized folder.`);
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