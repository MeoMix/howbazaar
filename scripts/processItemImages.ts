import * as fs from 'fs';
import * as path from 'path';
import { copyAndRenameFiles } from './utils/fileUtils';
import parsedItemCards from "../src/lib/db/patches/latest/parsedItemCards";
import { checkAndResizeImages, convertImagesToAvif } from './utils/imageUtils';
import { extractAssets } from './utils/assetStudioUtil';

interface ExpectedImage {
    cardGUID: string;
    name: string;
    imageAlias?: string;
}

const inputDirectory = './scripts/images/';
const assetType = 'items';
const assetPath = `${inputDirectory}${assetType}/`;
const outputDirectory = './static/images/';

// Parse command line arguments
const args = process.argv.slice(2);
const shouldExtract = !args.includes('--no-extract');

const nameToFileMap: { [key: string]: string } = {
    'BusinessCard': 'BuisnessCard',
    'TheCore': 'PowerCore',
    'NestingDoll': 'Matryoshka',
    'Sapphire': 'Saphire',
    'PickledPeppers': 'PickledAlienVeggies',
    'CrustaceanClaw': 'CrusherClaw1',
    'CosmicAmulet': 'CosmicAmulet1',
    'Seaweed': 'Seaweed1',
    'Hacksaw': 'MetalSaw',
    'Ballista': 'Balista',
    'EpicEpicureanChoclate': 'EpicEpicureanChocolate',
    'CrocodileTears': 'CursePotion',
    'CyberSecurity': 'AvantGuard',
    'CrabbyLobster': 'CrubbyLobster',
    'DarkwaterAnglerfish': 'DarkwaterAnglerfish(1)',
    'JuicerBro': 'Juiecerbro',
    'DoodleGlass': 'DoodleGlas',
    // Oh hell yeah we're mapping to a Cyrillic character
    'Cleaver': 'Сleaver'
};

async function processItemImages() {
    if (shouldExtract) {
        console.log('Running asset extraction...');
        await extractAssets({
            outputPath: `${inputDirectory}items`,
            filterByName: 'CF_,PNG_,Ectoplasm,Seaweed,Octopus,Snowflake',
            type: 'tex2d',
            imageFormat: 'jpg'
        });
        await extractAssets({
            outputPath: `${inputDirectory}items_carddata`,
            filterByName: '_CardData',
            type: 'monoBehaviour'
        });
    } else {
        console.log('Skipping asset extraction...');
    }

    const expectedImages = await processCardDataFiles();

    const knownCardIds = new Set(parsedItemCards.map(card => card.id));
    const filteredImages = expectedImages.filter(image => knownCardIds.has(image.cardGUID));

    // Early exit if lengths don't match
    const expectedGUIDs = new Set(expectedImages.map(e => e.cardGUID));
    const missingFromExpected = [...knownCardIds].filter(id => !expectedGUIDs.has(id));

    if (missingFromExpected.length > 0) {
        console.log('Card GUIDs in parsedItemCards missing from expectedImages:');
        console.table(missingFromExpected.map(id => {
            const card = parsedItemCards.find(c => c.id === id);
            return { id, name: card?.name ?? 'Unknown' };
        }));

        throw new Error(`Mismatch between parsedItemCards and expectedImages: missing ${missingFromExpected.length}`);
    }

    const imageFiles = await fs.promises.readdir(assetPath);

    const missingImages: { id: string; name: string; expectedFile: string }[] = [];
    const foundImages: { id: string; name: string; matchedFile: string }[] = [];

    for (const { cardGUID, name, imageAlias } of filteredImages) {
        const searchName = imageAlias ?? name;
        const matchedFile = findMatchingFile(searchName, imageFiles);

        if (!matchedFile) {
            missingImages.push({
                id: cardGUID,
                name,
                expectedFile: searchName
            });
        } else {
            foundImages.push({
                id: cardGUID,
                name,
                matchedFile
            });
        }
    }

    console.log(`Found ${foundImages.length} matching images`);
    console.log(`Missing ${missingImages.length} images`);

    if (missingImages.length > 0) {
        console.log('Missing images:');
        console.table(missingImages);
        throw new Error('Missing required images');
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

processItemImages().catch(console.error);

async function processCardDataFiles(): Promise<ExpectedImage[]> {
    const cardDataDir = path.join(inputDirectory, 'items_carddata');
    const expectedImages: ExpectedImage[] = [];

    try {
        const files = await fs.promises.readdir(cardDataDir);
        // There are some duplicate files with #number after _CardData - filter those out.
        const filteredFiles = files.filter(file =>
            file.endsWith('_CardData.json')
        );

        for (const file of filteredFiles) {
            const filePath = path.join(cardDataDir, file);
            const fileContent = await fs.promises.readFile(filePath, 'utf-8');
            const cardData = JSON.parse(fileContent) as { m_Name: string; cardGUID: string };
            const cardName = cardData.m_Name.replace('_CardData', '');

            const invalidGuidFixes: Record<string, string> = {
                // For some reason ATM's cardGUID maps to a Dooley skill?
                'ATM': 'c926fac8-f9ba-4430-a01a-a71a32c501c7',
                'Tortuga': 'f8a38ad1-5e5a-4c95-9bd1-55c81c31b117',
                'CustomScope': 'b2709d56-2c69-444f-8fd5-5cd237e6c053',
                'SwordMorguloth': 'e5af5b7c-2e8f-4135-8e14-8d1ea71908de',
                'VentriloquistDoll': 'e2a09e24-d454-450f-a39a-23f505ee32fa',
                'Hand': '6028b902-ccf6-4cca-bc37-de4649806460',
                // Balance doesn't exist as a card in-game, but it does have a CardData file, and its GUID points to "Scales"
                'Balance': '',
                'OblivionCore': '',
                'FossilFemur': '',
                'FocusedCore': ''
            };

            const guid = invalidGuidFixes[cardName] ?? cardData.cardGUID;

            if (guid) {
                const nameWithoutSpaces = cardName.replace(/\s+/g, '');

                expectedImages.push({
                    cardGUID: guid,
                    name: nameWithoutSpaces
                });
            }
        }

        // Piggles: each base image covers multiple variants
        expectedImages.push(
            // Red
            { cardGUID: '844efa15-de6f-4fec-a438-21904969577b', name: 'RedPigglesA', imageAlias: 'PigglesRed' },
            { cardGUID: 'b3c06ff9-f0e1-4527-81aa-2f71d7bf6503', name: 'RedPigglesL', imageAlias: 'PigglesRed' },
            { cardGUID: 'b57d9963-d241-40c9-8f9f-f9925a2da661', name: 'RedPigglesR', imageAlias: 'PigglesRed' },
            { cardGUID: '48d24eb0-d953-409c-9602-1d3d4c4278c5', name: 'RedPigglesX', imageAlias: 'PigglesRed' },

            // Blue
            { cardGUID: 'ce7ff94f-29e4-4f2d-bca9-cca83eacf774', name: 'BluePigglesA', imageAlias: 'PigglesBlue' },
            { cardGUID: '2df8f38b-bb9f-4247-afe9-525067c9e29e', name: 'BluePigglesL', imageAlias: 'PigglesBlue' },
            { cardGUID: '1d8d4dea-aaf9-4041-aa54-ae133f552d55', name: 'BluePigglesR', imageAlias: 'PigglesBlue' },
            { cardGUID: '8124f91b-3b4f-40ae-9493-057a0be7feb9', name: 'BluePigglesX', imageAlias: 'PigglesBlue' },

            // Yellow
            { cardGUID: '9c21ee00-116d-4868-a215-3f9b57bc8657', name: 'YellowPigglesA', imageAlias: 'PigglesYellow' },
            { cardGUID: 'd8e476dd-8184-4cb5-8cca-df1cb66c4305', name: 'YellowPigglesL', imageAlias: 'PigglesYellow' },
            { cardGUID: 'd4586506-d4d6-45d5-866b-796203f8d9d3', name: 'YellowPigglesX', imageAlias: 'PigglesYellow' },
            { cardGUID: '3868bcee-4463-4c34-9a9b-b1ab1fa49260', name: 'YellowPigglesR', imageAlias: 'PigglesYellow' },
        );

        // Tiny Cutlass (uses Cutlass image)
        expectedImages.push({
            cardGUID: '97d8654e-532b-4960-8f5b-5822562d3450',
            name: 'TinyCutlass',
            imageAlias: 'Cutlass'
        });

        // Sanity check to ensure no duplicate GUIDs
        const guidCounts = new Map<string, string[]>();

        Object.entries(expectedImages).forEach(([guid, { name }]) => {
            const names = guidCounts.get(guid) ?? [];
            names.push(name);
            guidCounts.set(guid, names);
        });

        const duplicates = Array.from(guidCounts.entries())
            .filter(([, names]) => names.length > 1)
            .map(([guid, names]) => `GUID ${guid} appears ${names.length} times (cards: ${names.join(', ')})`);

        if (duplicates.length > 0) {
            throw new Error(`Found duplicate GUIDs:\n${duplicates.join('\n')}`);
        }

        return expectedImages;
    } catch (error) {
        console.error('Error processing card data files:', error);
        throw error;
    }
}

/**
 * Attempts to find a matching image filename for a given expected name.
 *
 * To avoid false positives when matching short substrings (e.g. matching "Claw" inside "CrusherClaw1"),
 * we wrap both the search pattern and the candidate filename with underscores before testing.
 * This acts as a pseudo-boundary system, ensuring matches only occur when the expected name
 * appears as a standalone token within the filename (e.g. "_Claw_" but not "CrusherClaw").
 *
 * This approach avoids the pitfalls of regex \b word boundaries, which do not work reliably
 * with camelCase, PascalCase, or filenames ending in digits. Underscore wrapping is a
 * minimally sufficient and more predictable solution for our asset naming conventions.
 */
function findMatchingFile(expectedName: string, imageFiles: string[]): string | undefined {
    const name = nameToFileMap[expectedName] ?? expectedName;
    const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`_${escapedName}_`, 'i');

    // Patterns of known irrelevant or confusing files
    const shouldSkip = (file: string): boolean => {
        return (
            file.includes('FX_') ||
            file.includes('_FX') ||
            file.includes('_Mask') ||
            file.endsWith('Mask.jpeg') ||
            file.endsWith('Portrait.jpeg') ||
            file.endsWith('PortraitBG.jpeg') ||
            file.endsWith('CF_S_STE_Feather_D.jpeg') ||
            file.endsWith('CF_L_PYG_Windmill_Baloons.jpeg') ||
            /_#\d{1,10}\.jpeg$/.test(file)
        );
    };

    const match = imageFiles.find(file => {
        if (shouldSkip(file)) return false;

        const baseName = path.parse(file).name.replace(/\s+/g, '');
        return pattern.test(`_${baseName}_`);
    });

    return match;
}
