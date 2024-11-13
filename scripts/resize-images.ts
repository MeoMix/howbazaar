import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Define the paths
const imagesFolder = "./scripts/images/webp-items/";
const outputFolder = "./scripts/images/webp-items/resized";

async function checkAndResizeImages() {
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder);
    }

    const files = fs.readdirSync(imagesFolder).filter(file => file.endsWith('.webp'));

    for (const file of files) {
        const filePath = path.join(imagesFolder, file);

        try {
            const image = sharp(filePath);
            const metadata = await image.metadata();

            let width = metadata.width || 0;
            let height = metadata.height || 0;

            // Skip resizing if image is already 256x256 or smaller
            if (width <= 256 && height <= 256) {
                console.log(`Skipping ${file} as it is already 256x256 or smaller.`);
                continue;
            }

            // Halve the dimensions as long as they stay above 256x256
            while (width > 256 && height > 256) {
                width = Math.floor(width / 2);
                height = Math.floor(height / 2);
            }

            console.log(`Resizing ${file} to ${width}x${height}...`);

            // Perform the resize
            await image
                .resize(width, height)
                .toFile(path.join(outputFolder, file));

            console.log(`Resized ${file} and saved to resized folder.`);
        } catch (error) {
            console.error(`Failed to process ${file}:`, error);
        }
    }
}

checkAndResizeImages().catch(error => console.error("Error processing images:", error));