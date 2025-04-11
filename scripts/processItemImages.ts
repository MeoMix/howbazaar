import * as fs from 'fs';
import * as path from 'path';
import { deleteFiles, copyAndRenameFiles } from './utils/fileUtils';
import parsedItemCards from "../src/lib/db/patches/latest/parsedItemCards";
// TODO: Prolly want to reuse this so accidents don't occur with diverging implementations.
// TODO: This wouldn't be necessary if I looked things up by GUID instead of name. And then I wouldn't need to update CDN when an item is renamed.
import { removeSpecialCharacters } from './utils/stringUtils';
import { checkAndResizeImages, convertImagesToAvif } from './utils/imageUtils';

// Command:
// Needs to be whole folder - not all assets found in defaultlocalgroup_assets_all
// .\AssetStudioModCLI "C:\Program Files\Tempo Launcher - Beta\The Bazaar game_64\bazaarwinprodlatest\TheBazaar_Data\StreamingAssets\aa\StandaloneWindows64" --filter-by-name CF_,PNG_,Ectoplasm,Seaweed,Octopus,Snowflake -g none --image-format jpg -t tex2d -o ./items
// .\AssetStudioModCLI "C:\Program Files\Tempo Launcher - Beta\The Bazaar game_64\bazaarwinprodlatest\TheBazaar_Data\StreamingAssets\aa\StandaloneWindows64" --filter-by-name _CardData -g none -t monoBehaviour -o ./carddata

interface CardGuidMap {
    [key: string]: string;
}

const inputDirectory = './scripts/images/';
const assetType = 'items';
const assetPath = `${inputDirectory}${assetType}/`;
const outputDirectory = './static/images/';

const RENAME_RULES: { [key: string]: string } = {
    'BuisnessCard': 'BusinessCard',
    'PowerCore': 'TheCore',
    'Matryoshka': 'NestingDoll',
    'Saphire': 'Sapphire',
    'PickledAlienVeggies': 'PickledPeppers',
    'CrusherClaw1': 'CrustaceanClaw',
    'CosmicAmulet1': 'CosmicAmulet',
    'Seaweed1': 'Seaweed',
    'MetalSaw': 'Hacksaw',
    'Balista': 'Ballista',
    'EpicEpicureanChocolate': 'EpicEpicureanChoclate',
    'CursePotion': 'CrocodileTears',
    'AvantGuard': 'Cybersecurity',
    'ArmoredCore': 'OblivionCore',
    'CrubbyLobster': 'CrabbyLobster'
};

// Track which rename rules are used
const usedRenameRules = new Set<string>();

function normalizeName(name: string): string {
    return name
        .replace(/\s*\(\d+\)$/, '') // Remove trailing " (1)", " (2)", etc.
        .replace(/\s+/g, '')        // Remove all whitespace
        .toLowerCase();             // Lowercase
}

// TODO: Figure out how to simplify this a bit. It still seems convoluted.
// Function to try and find a matching file using rename rules
function findMatchingFile(expectedName: string, imageFiles: string[]): string | undefined {
    const normalizedExpected = normalizeName(expectedName);

    // Try reverse lookup from rename rules
    const possibleOriginalNames = Object.entries(RENAME_RULES)
        .filter(([_, value]) => normalizeName(value) === normalizedExpected)
        .map(([key]) => key);

    for (const originalName of possibleOriginalNames) {
        const normalizedOriginal = normalizeName(originalName);
        const pattern = new RegExp(`_${normalizedOriginal}_`, 'i');

        const match = imageFiles.find(file => {
            const baseName = normalizeName(path.parse(file).name);
            return pattern.test(`_${baseName}_`);
        });

        if (match) {
            usedRenameRules.add(originalName);
            return match;
        }
    }

    // Regex: match name wrapped in underscores (e.g. _Amber_)
    const pattern = new RegExp(`_${normalizedExpected}_`, 'i');

    // Try bounded match first
    const boundedMatch = imageFiles.find(file => {
        const baseName = normalizeName(path.parse(file).name);
        return pattern.test(`_${baseName}_`); // Add underscores to enforce boundaries
    });

    if (boundedMatch) return boundedMatch;

    return undefined;
}

async function deleteKnownUselessFiles() {
    const files = await fs.promises.readdir(assetPath);
    const filesToDelete = files.filter(file =>
        file.includes('FX_') ||
        file.includes('_FX') ||
        file.includes('_Mask') ||
        file.endsWith('Mask.jpeg') ||
        file.endsWith('Portrait.jpeg') ||
        file.endsWith('PortraitBG.jpeg') ||
        // There's two files both named "Feather" and only one is correct (the purple feather)
        file.endsWith('CF_S_STE_Feather_D.jpeg') ||
        // This is causing confusion with "Windmill". There's probably a more robust way of matching on Windmill without needing this.
        file.endsWith('CF_L_PYG_Windmill_Baloons.jpeg') ||
        /_#\d{1,10}\.jpeg$/.test(file) // Matches '_#<numbers>.jpeg', where <numbers> is 1-10 digits
    );

    await deleteFiles(filesToDelete, assetPath);
}

interface DuplicateConfig {
    files: string[];
    deleteOnCopy: boolean;
}

async function duplicateFiles() {
    // Map of files to duplicate with configuration
    const duplicateMappings: Record<string, DuplicateConfig> = {
        'PigglesRed': {
            files: ['RedPigglesA', 'RedPigglesX', 'RedPigglesL', 'RedPigglesR'],
            deleteOnCopy: true
        },
        'PigglesYellow': {
            files: ['YellowPigglesA', 'YellowPigglesX', 'YellowPigglesL', 'YellowPigglesR'],
            deleteOnCopy: true
        },
        'PigglesBlue': {
            files: ['BluePigglesA', 'BluePigglesX', 'BluePigglesL', 'BluePigglesR'],
            deleteOnCopy: true
        },
        'Cutlass': {
            files: ['TinyCutlass'],
            deleteOnCopy: false
        }
    };

    try {
        const files = await fs.promises.readdir(assetPath);
        const missingFiles: string[] = [];
        const filesToDelete: string[] = [];

        for (const [sourceFile, config] of Object.entries(duplicateMappings)) {
            // Find source file by containing the name (loose match)
            const sourceMatch = files.find(file =>
                path.parse(file).name.toLowerCase().includes(sourceFile.toLowerCase())
            );

            if (sourceMatch) {
                const sourceFilePath = path.join(assetPath, sourceMatch);
                const sourceExt = path.extname(sourceMatch);

                for (const targetFile of config.files) {
                    const targetFilePath = path.join(assetPath, `${targetFile}${sourceExt}`);

                    try {
                        // Copy the file
                        await fs.promises.copyFile(sourceFilePath, targetFilePath);
                        console.log(`Copied ${sourceMatch} to ${targetFile}${sourceExt}`);
                    } catch (err) {
                        if (err instanceof Error) {
                            console.error(`Error copying ${sourceMatch} to ${targetFile}${sourceExt}:`, err.message);
                        } else {
                            console.error(`Error copying ${sourceMatch} to ${targetFile}${sourceExt}:`, err);
                        }
                    }
                }

                // Add source file to deletion list if configured
                if (config.deleteOnCopy) {
                    filesToDelete.push(sourceMatch);
                }
            } else {
                missingFiles.push(sourceFile);
            }
        }

        // Delete the source files that are marked for deletion
        if (filesToDelete.length > 0) {
            console.log('\nDeleting source files:');
            for (const file of filesToDelete) {
                try {
                    await fs.promises.unlink(path.join(assetPath, file));
                    console.log(`Deleted ${file}`);
                } catch (err) {
                    if (err instanceof Error) {
                        console.error(`Error deleting ${file}:`, err.message);
                    } else {
                        console.error(`Error deleting ${file}:`, err);
                    }
                }
            }
        }

        // Log missing files
        if (missingFiles.length > 0) {
            console.error('The following files were not found:', missingFiles.join(', '));
        }
    } catch (err) {
        if (err instanceof Error) {
            console.error('Error reading directory:', err.message);
        } else {
            console.error('Error reading directory:', err);
        }
    }
}

async function processItemImages() {
    await deleteKnownUselessFiles();

    console.log('Duplicating files');
    await duplicateFiles();

    // Load the GUID to name mapping
    const guidMapPath = './scripts/cardGuidToName.json';
    const guidMapContent = await fs.promises.readFile(guidMapPath, 'utf-8');
    const guidToName = JSON.parse(guidMapContent) as CardGuidMap;

    // Read all image files
    const imageFiles = await fs.promises.readdir(assetPath);

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
        const matchingFile = findMatchingFile(assetName, imageFiles);

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
        throw new Error('Missing required images');
    }

    // Log unused rename rules
    const allRules = new Set(Object.keys(RENAME_RULES));
    const unusedRules = Array.from(allRules).filter(rule => !usedRenameRules.has(rule));

    if (unusedRules.length > 0) {
        console.log('\nUnused rename rules:');
        const unusedRulesList = unusedRules.map(originalName => ({
            original: originalName,
            renamed: RENAME_RULES[originalName]
        }));
        console.table(unusedRulesList);
    }

    // If we got here, we found all images, so proceed with conversion
    const copiedFiles = await copyAndRenameFiles(foundImages, assetPath, `${inputDirectory}/${assetType}-renamed`);
    const convertedFiles = await convertImagesToAvif(copiedFiles, `${inputDirectory}/${assetType}-avif`);
    const resizedFiles = await checkAndResizeImages(convertedFiles, `${outputDirectory}/${assetType}`);

    console.log('Processed', resizedFiles.length, 'files');
}

processItemImages().catch(console.error);