import * as fs from 'fs';
import * as path from 'path';
import parsedItemCards from "../src/lib/db/patches/latest/parsedItemCards";

interface CardGuidMap {
    [key: string]: string;
}

async function validateItemImages() {
    // Read the GUID to name mapping
    const guidMapPath = './scripts/cardGuidToName.json';
    const guidMapContent = await fs.promises.readFile(guidMapPath, 'utf-8');
    const guidToName = JSON.parse(guidMapContent) as CardGuidMap;

    // Read all image files
    const imagesDir = './scripts/images/items';
    const imageFiles = await fs.promises.readdir(imagesDir);

    const missingImages: { id: string; name: string; expectedFile: string }[] = [];
    const foundImages: { id: string; name: string; matchedFile: string }[] = [];

    // For each parsed item card
    for (const card of parsedItemCards) {
        const assetName = guidToName[card.id];

        if (!assetName) {
            missingImages.push({
                id: card.id,
                name: card.name,
                expectedFile: 'Unknown - No GUID mapping found'
            });
            continue;
        }

        // Look for a file that includes this name
        const matchingFile = imageFiles.find(file =>
            file.toLowerCase().includes(assetName.toLowerCase())
        );

        if (!matchingFile) {
            missingImages.push({
                id: card.id,
                name: card.name,
                expectedFile: assetName
            });
        } else {
            foundImages.push({
                id: card.id,
                name: card.name,
                matchedFile: matchingFile
            });
        }
    }

    // Log results
    console.log(`\nProcessing complete!`);
    console.log(`Found ${foundImages.length} matching images`);
    console.log(`Missing ${missingImages.length} images\n`);

    if (missingImages.length > 0) {
        console.log('Missing images:');
        console.table(missingImages);
    }

    if (foundImages.length > 0) {
        console.log('\nFound images:');
        console.table(foundImages);
    }
}

validateItemImages().catch(console.error); 