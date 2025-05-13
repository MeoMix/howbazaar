import fsPromises from 'fs/promises';
import path from 'path';
import parsedMerchantCards from "../src/lib/db/patches/latest/parsedMerchantCards";
import { getMerchants } from "../src/lib/services/merchantService";
import { copyAndRenameFiles } from './utils/fileUtils';
import { checkAndResizeImages, convertImagesToAvif, type ImagePair, mergeImages } from './utils/imageUtils';
import { extractAssets } from './utils/assetStudioUtil';

const inputDirectory = './scripts/images/';
const assetType = 'merchants';
const assetPath = `${inputDirectory}${assetType}/`;
const outputDirectory = './static/images/';

const nameToFileMap: Record<string, string> = {
    'Silvia': 'Sterling',
    // There's no (obvious) Mak ENC_Merchant, so using a skin instead.
    'Mak': 'MAK_01a'
};

const portraitOverrides: Record<string, string> = {
    // Special case: Vanessa's only image is mis-tagged as _BG but is actually the portrait.
    'Vanessa': 'ENC_Merchant_Vanessa_BG.png'
};

async function processMerchantImages() {
    await extractAssets({
        outputPath: `${inputDirectory}merchants`,
        filterByName: 'ENC_Merchant,ENC_Mechant,Skin_MAK_01a_Portrait',
        type: 'tex2d',
    });

    const merchants = getMerchants(
        parsedMerchantCards,
    );

    console.log('Scanning for merchant images...');

    const imageFiles = await fsPromises.readdir(assetPath);

    const missingImages: { name: string }[] = [];
    const foundImages: { isPortrait: boolean; id: string; name: string; matchedFile: string }[] = [];

    for (const merchant of merchants) {
        const sourceName = nameToFileMap[merchant.name] ?? merchant.name;

        const matchedPortrait = findMatchingFile(imageFiles, sourceName, '_Portrait');
        const matchedPortraitBG = findMatchingFile(imageFiles, sourceName, '_PortraitBG');

        if (!matchedPortrait) {
            missingImages.push({ name: merchant.name });
            continue;
        }

        foundImages.push({
            isPortrait: true,
            id: merchant.id,
            name: merchant.name,
            matchedFile: matchedPortrait
        });

        if (matchedPortraitBG) {
            foundImages.push({
                isPortrait: false,
                id: merchant.id,
                name: merchant.name,
                matchedFile: matchedPortraitBG
            });
        }
    }

    console.log(`Found ${foundImages.length} matching images.`);
    console.log(`Missing ${missingImages.length} images.`);

    if (missingImages.length > 0) {
        console.log('Missing images:');
        console.table(missingImages);
        throw new Error('Missing required encounter images. Exiting early.');
    }

    const imageCopyDescriptors = foundImages.map(({ isPortrait, id, matchedFile }) => ({
        fileName: isPortrait ? `${id}_Portrait` : `${id}_PortraitBG`,
        relativePath: matchedFile
    }));

    const copyAndRenamePath = path.join(inputDirectory, `${assetType}-renamed`);
    const copiedFiles = await copyAndRenameFiles(imageCopyDescriptors, assetPath, copyAndRenamePath);
    console.log(`Copied and renamed ${copiedFiles.length} files to ${copyAndRenamePath}`);

    // It's possible that there's unpaired images when background doesn't exist but foreground does due to incomplete design.
    const { pairs: imagePairs, unmatched } = pairImages(copiedFiles);
    console.log(`Found ${imagePairs.length} pairs and ${unmatched.length} unmatched files.`);

    const mergePath = path.join(inputDirectory, `${assetType}-merged`);
    const mergedFiles = await mergeImages(imagePairs, mergePath);
    console.log(`Merged ${mergedFiles.length} files into ${mergePath}`);

    const avifPath = path.join(inputDirectory, `${assetType}-avif`);
    const convertedFiles = await convertImagesToAvif([...mergedFiles, ...unmatched], avifPath);
    console.log(`Converted to AVIF: ${convertedFiles.length} files.`);

    const outputPath = path.join(outputDirectory, assetType);
    const resizedFiles = await checkAndResizeImages(convertedFiles, outputPath);
    console.log(`Resized ${resizedFiles.length} images into ${outputPath}`);
}

processMerchantImages().catch(console.error);

function findMatchingFile(
    imageFiles: string[],
    targetName: string,
    type: '_Portrait' | '_PortraitBG'
): string | null {
    const prefixes = ['ENC_', 'Merchant_', 'Mechant_', 'Skin_'];
    const normalizedTarget = normalizeName(`${targetName}${type}.png`);

    if (type === '_Portrait' && portraitOverrides[targetName]) {
        const overrideFile = portraitOverrides[targetName];
        const match = imageFiles.find(file => normalizeName(file) === normalizeName(overrideFile));
        if (match) return match;
    }

    for (const file of imageFiles) {
        let base = file;

        // Remove known prefixes
        for (const prefix of prefixes) {
            base = base.replace(new RegExp(`^${prefix}|(?<=_)${prefix}`, 'g'), '');
        }

        // Normalize suffixes to standard naming
        base = base.replace(/_BG(?=\.[^.]+$)/, '_PortraitBG');
        base = base.replace(/_char(?=\.[^.]+$)/i, '_Portrait');

        if (normalizeName(base) === normalizedTarget) {
            return file;
        }
    }

    return null;
}

function normalizeName(name: string): string {
    return name.replace(/[\s\-'.&]+/g, '').toLowerCase();
}

type PairedImagesResult = {
    pairs: ImagePair[];
    unmatched: string[];
};

export function pairImages(files: string[]): PairedImagesResult {
    const pairMap: Record<string, Partial<ImagePair>> = {};
    const unmatched: string[] = [];

    for (const fullPath of files) {
        const filename = path.basename(fullPath);
        const match = filename.match(/^(.*?)(_Portrait|_PortraitBG)\.png$/);

        if (!match) {
            unmatched.push(fullPath);
            continue;
        }

        const baseName = match[1];
        const type = match[2];

        if (!pairMap[baseName]) {
            pairMap[baseName] = { baseName };
        }

        if (type === '_Portrait') {
            pairMap[baseName].foreground = fullPath;
        } else if (type === '_PortraitBG') {
            pairMap[baseName].background = fullPath;
        }
    }

    const pairs = Object.values(pairMap) as ImagePair[];
    return { pairs, unmatched };
}