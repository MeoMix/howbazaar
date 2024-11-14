import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

export async function convertImagesToAvif(inputFolder: string, outputFolder: string) {
  try {
    // Ensure output folder exists
    await fs.mkdir(outputFolder, { recursive: true });

    // Read files in the input folder
    const files = await fs.readdir(inputFolder);

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
