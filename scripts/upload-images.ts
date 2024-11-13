import fs from 'fs';
import path from 'path';
import { put } from '@vercel/blob';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.development.local' });

const type = 'skills';
const inputFolder = `./scripts/images/webp-${type}/resized`;
const token = process.env.BLOB_READ_WRITE_TOKEN;

if (!token) {
  console.error("BLOB_READ_WRITE_TOKEN is not set in the environment.");
  process.exit(1);
}

async function uploadImages() {
  // Read all files in the directory
  const files = fs.readdirSync(inputFolder);

  for (const file of files) {
    // Check if the file is a .webp image
    if (path.extname(file).toLowerCase() === '.webp') {
      const filePath = path.join(inputFolder, file);
      const fileContent = fs.readFileSync(filePath);

      try {
        // Upload the file to Vercel Blob Storage
        const { url } = await put(`${type}/${file}`, fileContent, { access: 'public', addRandomSuffix: false });
        console.log(`Uploaded ${file} to ${url}`);
      } catch (error) {
        console.error(`Failed to upload ${file}:`, error);
      }
    }
  }
}

uploadImages().catch(console.error);
