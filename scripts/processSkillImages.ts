import * as fs from 'fs';
import * as path from 'path';
import parsedSkillCards from "../src/lib/db/patches/latest/parsedSkillCards";
import { removeSpecialCharacters } from './utils/stringUtils';
import { copyAndRenameFiles } from './utils/fileUtils';
import { checkAndResizeImages, convertImagesToAvif } from './utils/imageUtils';

const inputDirectory = './scripts/images/';
const assetType = 'skills';
const assetPath = path.join(inputDirectory, assetType);
const outputDirectory = './static/images';

// This function attempts to find the exact matching file (by artKey) in the provided list of files.
function findMatchingFile(artKey: string, files: string[]): string | undefined {
  // artKey might already be a base name without extension or might have an extension
  // We typically match it as the exact (base) filename if possible
  const baseArtKey = path.parse(artKey).name.toLowerCase();

  // We find a file in `files` whose base name (lowercased) matches baseArtKey
  return files.find(f => path.parse(f).name.toLowerCase() === baseArtKey);
}

async function processSkillImages() {
  console.log(`\nStarting skill image processing...`);

  // 1) Gather skill data, filtering out anything with no artKey
  const skillEntries = parsedSkillCards
    .filter(card => !!card.artKey)
    .map(card => ({
      artKey: card.artKey,
      name: card.name
    }));

  // 2) Read the actual skill image files in that folder
  let imageFiles = await fs.promises.readdir(assetPath);

  // 3) Find matches / track missing
  const missingImages: { artKey: string; name: string }[] = [];
  const foundImages: { artKey: string; name: string; matchedFile: string }[] = [];

  for (const entry of skillEntries) {
    const matched = findMatchingFile(entry.artKey, imageFiles);

    if (!matched) {
      missingImages.push({
        artKey: entry.artKey,
        name: entry.name
      });
    } else {
      foundImages.push({
        artKey: entry.artKey,
        name: entry.name,
        matchedFile: matched
      });
    }
  }

  // Log how many were found / missing
  console.log(`Found ${foundImages.length} matching images.`);
  console.log(`Missing ${missingImages.length} images.`);

  if (missingImages.length > 0) {
    console.log('Missing images:');
    console.table(missingImages);
    throw new Error('Missing required skill images');
  }

  const toRename = foundImages.map(item => ({
    name: removeSpecialCharacters(item.name),
    matchedFile: item.matchedFile
  }));

  const copiedFiles = await copyAndRenameFiles(toRename, assetPath, `${inputDirectory}/${assetType}-renamed`);
  const convertedFiles = await convertImagesToAvif(copiedFiles, `${inputDirectory}/${assetType}-avif`);
  const resizedFiles = await checkAndResizeImages(convertedFiles, `${outputDirectory}/${assetType}`);

  console.log(`\nSkill image processing complete. Copied: ${copiedFiles.length}, converted: ${convertedFiles.length}, resized: ${resizedFiles.length}`);
}

processSkillImages().catch(console.error);
