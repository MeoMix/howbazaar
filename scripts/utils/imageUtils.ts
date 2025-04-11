import fsPromises from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

// TODO: It would be nice to always have logging enabled but to find a way to make it less verbose.
// Logging configuration
const LOGGING_ENABLED = false;

function log(message: string, error?: any) {
    if (LOGGING_ENABLED) {
        if (error) {
            console.error(message, error);
        } else {
            console.log(message);
        }
    }
}

export async function convertImagesToAvif(inputFiles: string[], outputFolder: string): Promise<string[]>;
export async function convertImagesToAvif(inputFolder: string, outputFolder: string): Promise<string[]>;
export async function convertImagesToAvif(input: string | string[], outputFolder: string): Promise<string[]> {
    try {
        await fsPromises.mkdir(outputFolder, { recursive: true });

        // Handle both string (folder) and string[] (files) input
        const files = typeof input === 'string'
            ? await fsPromises.readdir(input)
            : input;

        const convertedFiles: string[] = [];

        // Process each file asynchronously
        const conversions = files.map(async (file) => {
            const inputPath = typeof input === 'string' ? path.join(input, file) : file;
            const outputPath = path.join(outputFolder, path.basename(file).replace(/\.(jpg|jpeg|png)$/i, '.avif'));

            if (['.jpg', '.jpeg', '.png'].includes(path.extname(inputPath).toLowerCase())) {
                try {
                    await sharp(inputPath).avif({ quality: 40 }).toFile(outputPath);
                    log('Converted ' + path.basename(file) + ' to ' + outputPath);
                    convertedFiles.push(outputPath);
                } catch (err) {
                    log('Error converting ' + path.basename(file) + ':', err);
                }
            }
        });

        // Wait for all conversions to complete
        await Promise.all(conversions);
        return convertedFiles;
    } catch (err) {
        log('Error processing images:', err);
        return [];
    }
}

export async function checkAndResizeImages(inputFiles: string[], outputFolder: string): Promise<string[]>;
export async function checkAndResizeImages(inputFolder: string, outputFolder: string): Promise<string[]>;
export async function checkAndResizeImages(input: string | string[], outputFolder: string): Promise<string[]> {
    try {
        await fsPromises.mkdir(outputFolder, { recursive: true });

        // Handle both string (folder) and string[] (files) input
        const files = typeof input === 'string'
            ? (await fsPromises.readdir(input)).filter(async (file) => {
                const filePath = path.join(input, file);
                return (await fsPromises.stat(filePath)).isFile();
            })
            : input;

        const processedFiles: string[] = [];

        const resizePromises = files.map(async (file) => {
            const inputPath = typeof input === 'string' ? path.join(input, file) : file;
            const outputPath = path.join(outputFolder, path.basename(file));

            try {
                const image = sharp(inputPath);
                const metadata = await image.metadata();

                let width = metadata.width || 0;
                let height = metadata.height || 0;

                // Skip resizing if image is already 256x256 or smaller
                if (width <= 256 && height <= 256) {
                    log(`Skipping resize of ${path.basename(file)} as it is already 256x256 or smaller. Copying as-is to resized folder.`);
                    await image.toFile(outputPath);
                    processedFiles.push(outputPath);
                    return;
                }

                // Halve the dimensions as long as they stay above 256x256
                while (width / 2 >= 256 && height / 2 >= 256) {
                    width = Math.floor(width / 2);
                    height = Math.floor(height / 2);
                }

                log(`Resizing ${path.basename(file)} to ${width}x${height}...`);

                // Perform the resize
                await image
                    .resize(width, height)
                    .toFile(outputPath);
                log(`Resized ${path.basename(file)} and saved to resized folder.`);
                processedFiles.push(outputPath);
            } catch (error) {
                log(`Failed to process ${path.basename(file)}:`, error);
            }
        });

        await Promise.all(resizePromises);
        return processedFiles;
    } catch (err) {
        log('Error processing images:', err);
        return [];
    }
}

export type ImagePair = {
    baseName: string;
     // TODO: Maybe these aren't optional?
    portrait?: string;
    background?: string;
}

export async function mergeImages(pairs: ImagePair[], outputFolder: string): Promise<string[]> {
    try {
        await fsPromises.mkdir(outputFolder, { recursive: true });

        const mergedFiles: string[] = [];

        const mergePromises = pairs.map(async ({ baseName, portrait, background }) => {
            const outputPath = path.join(outputFolder, `${baseName}.png`);

            try {
                if (portrait && background) {
                    const bgImage = sharp(background);
                    const { width, height } = await bgImage.metadata();

                    await bgImage
                        .composite([{ input: portrait, gravity: 'center' }])
                        .resize(width, height)
                        .toFile(outputPath);

                    log(`Merged ${path.basename(portrait)} + ${path.basename(background)} -> ${baseName}.png`);
                } else {
                    const singleFile = portrait || background;
                    if (!singleFile) {
                        log(`No source image for ${baseName}, skipping.`);
                        return;
                    }

                    await sharp(singleFile).toFile(outputPath);
                    log(`Copied ${path.basename(singleFile)} -> ${baseName}.png`);
                }

                mergedFiles.push(outputPath);
            } catch (err) {
                log(`Error processing ${baseName}:`, err);
            }
        });

        await Promise.all(mergePromises);
        return mergedFiles;
    } catch (err) {
        log('Error creating output folder or merging images:', err);
        return [];
    }
}

