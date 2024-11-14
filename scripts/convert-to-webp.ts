import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputFolder = './scripts/images/encounters/';
const outputFolder = './scripts/images/webp-encounters/';

// Create output folder if it doesn't exist
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}

fs.readdir(inputFolder, (err, files) => {
  if (err) {
    console.error('Error reading the input folder:', err);
    return;
  }

  files.forEach(file => {
    if (path.extname(file).toLowerCase() === '.jpg' || path.extname(file).toLowerCase() === '.jpeg' || path.extname(file).toLowerCase() === '.png') {
      const inputPath = path.join(inputFolder, file);
      const outputPath = path.join(outputFolder, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));

      sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath, (err, info) => {
          if (err) {
            console.error('Error converting', file, ':', err);
          } else {
            console.log('Converted', file, 'to', outputPath);
          }
        });
    }
  });
});
