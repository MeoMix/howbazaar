import fsPromises from 'fs/promises';
import path from 'path';

// Example data imports. Replace or rename as needed:
import parsedSkillCards from '../src/lib/db/patches/latest/parsedSkillCards.ts';
import { copyAndRenameFiles } from './utils/fileUtils.ts';
import { convertImagesToAvif, checkAndResizeImages } from './utils/imageUtils.ts';
import { removeSpecialCharacters } from './utils/stringUtils.ts';

const inputDirectory = './scripts/images/';
const assetType = 'skills'; // or 'monsters', etc.
const assetPath = `${inputDirectory}${assetType}/`;
const renamedAssetPath = `${inputDirectory}${assetType}-renamed/`;
const outputDirectory = './static/images/';

function findMatchingFile(artKey: string, files: string[]): string | undefined {
    // artKey might already be a base name without extension or might have an extension
    // We typically match it as the exact (base) filename if possible
    const baseArtKey = path.parse(artKey).name.toLowerCase();

    // We find a file in `files` whose base name (lowercased) matches baseArtKey
    return files.find(f => path.parse(f).name.toLowerCase() === baseArtKey);
}

async function processSkillImages() {
    // 1) Gather your "entries" from data. In this example, let's assume each skill card has an `artKey` and a `name`.
    //    E.g.:
    const skillEntries = parsedSkillCards.map(card => ({
        artKey: card.artKey,
        name: card.name
    }));

    // 2) Read the actual skill image files in that folder
    const imageFiles = await fsPromises.readdir(assetPath);

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

    // 4) Log how many were found / missing
    console.log(`Found ${foundImages.length} matching images.`);
    console.log(`Missing ${missingImages.length} images.`);

    if (missingImages.length > 0) {
        console.log('Missing images:');
        console.table(missingImages);
        throw new Error('Missing required skill images. Exiting early.');
    }

    const toRename = foundImages.map(item => {
        // TODO: Either it's OK to call this here, but copyAndRenameFile shouldn't, or don't call it here.
        const sanitized = removeSpecialCharacters(item.name);
        return {
            name: sanitized,
            matchedFile: item.matchedFile
        };
    });

    const copiedFiles = await copyAndRenameFiles(toRename, assetPath, renamedAssetPath);
    console.log(`Copied and renamed ${copiedFiles.length} files to ${renamedAssetPath}`);

    const avifOutputPath = path.join(inputDirectory, `${assetType}-avif`);
    const convertedFiles = await convertImagesToAvif(copiedFiles, avifOutputPath);
    console.log(`Converted to AVIF: ${convertedFiles.length} files.`);

    const finalOutputPath = path.join(outputDirectory, assetType);
    const resizedFiles = await checkAndResizeImages(convertedFiles, finalOutputPath);
    console.log(`Resized ${resizedFiles.length} images into ${finalOutputPath}`);
}

// Run it
processSkillImages().catch(err => {
    console.error('Error processing skill images:', err);
    process.exit(1); // or handle error as desired
});
