import fsPromises from 'fs/promises';
import path from 'path';

import parsedSkillCards from '../src/lib/db/patches/latest/parsedSkillCards.ts';
import { copyAndRenameFiles } from './utils/fileUtils.ts';
import { convertImagesToAvif, checkAndResizeImages } from './utils/imageUtils.ts';

// .\AssetStudioModCLI "C:\Program Files\Tempo Launcher - Beta\The Bazaar game_64\bazaarwinprodlatest\TheBazaar_Data\StreamingAssets\aa\StandaloneWindows64\defaultlocalgroup_assets_all.bundle" --filter-by-name Icon_SKILL -g none -t tex2d -o ./skills

const inputDirectory = './scripts/images/';
const assetType = 'skills';
const assetPath = `${inputDirectory}${assetType}/`;
const outputDirectory = './static/images/';

async function processSkillImages() {
    const skillEntries = parsedSkillCards.map(card => ({
        id: card.id,
        artKey: card.artKey,
        name: card.name
    })).filter(entry => !!entry.artKey);

    const imageFiles = await fsPromises.readdir(assetPath);

    const missingImages: { artKey: string; name: string }[] = [];
    const foundImages: { id: string; artKey: string; name: string; matchedFile: string }[] = [];

    for (const entry of skillEntries) {
        const matched = findMatchingFile(entry.artKey, imageFiles);

        if (!matched) {
            missingImages.push({
                artKey: entry.artKey,
                name: entry.name
            });
        } else {
            foundImages.push({
                id: entry.id,
                artKey: entry.artKey,
                name: entry.name,
                matchedFile: matched
            });
        }
    }

    console.log(`Found ${foundImages.length} matching images.`);
    console.log(`Missing ${missingImages.length} images.`);

    if (missingImages.length > 0) {
        console.log('Missing images:');
        console.table(missingImages);
        throw new Error('Missing required skill images. Exiting early.');
    }

    const imageCopyDescriptors = foundImages.map(({ id, matchedFile }) => ({
        fileName: id,
        relativePath: matchedFile
    }));

    const copyAndRenamePath = path.join(inputDirectory, `${assetType}-renamed`);
    const copiedFiles = await copyAndRenameFiles(imageCopyDescriptors, assetPath, copyAndRenamePath);
    console.log(`Copied and renamed ${copiedFiles.length} files to ${copyAndRenamePath}`);

    const avifPath = path.join(inputDirectory, `${assetType}-avif`);
    const convertedFiles = await convertImagesToAvif(copiedFiles, avifPath);
    console.log(`Converted to AVIF: ${convertedFiles.length} files.`);

    const outputPath = path.join(outputDirectory, assetType);
    const resizedFiles = await checkAndResizeImages(convertedFiles, outputPath);
    console.log(`Resized ${resizedFiles.length} images into ${outputPath}`);
}

processSkillImages().catch(console.error);

function findMatchingFile(artKey: string, files: string[]): string | undefined {
    // artKey might already be a base name without extension or might have an extension
    // We typically match it as the exact (base) filename if possible
    const baseArtKey = path.parse(artKey).name.toLowerCase();

    // We find a file in `files` whose base name (lowercased) matches baseArtKey
    return files.find(f => path.parse(f).name.toLowerCase() === baseArtKey);
}
