import fsPromises from 'fs/promises';
import path from 'path';
import parsedItemCards from "../src/lib/db/patches/latest/parsedItemCards";
import parsedSkillCards from "../src/lib/db/patches/latest/parsedSkillCards";
import parsedCombatEncounterCards from "../src/lib/db/patches/latest/parsedCombatEncounterCards";
import parsedMonsters from "../src/lib/db/patches/latest/parsedMonsters";
import parsedDayHours from "../src/lib/db/patches/latest/parsedDayHours";
import { getMonsterEncounterDays } from "../src/lib/services/monsterEncounterService";
import { removeSpecialCharacters } from './utils/stringUtils';
import { copyAndRenameFiles } from './utils/fileUtils';
import { checkAndResizeImages, convertImagesToAvif, type ImagePair, mergeImages } from './utils/imageUtils';

const inputDirectory = './scripts/images/';
const assetType = 'monsters';
const assetPath = `${inputDirectory}${assetType}/`;
const outputDirectory = './static/images/';

// .\AssetStudioModCLI "C:\Program Files\Tempo Launcher - Beta\The Bazaar game_64\bazaarwinprodlatest\TheBazaar_Data\StreamingAssets\aa\StandaloneWindows64" --filter-by-name Monster,ENC_Monster,ENC_Event -g none -t tex2d -o ./monsters

const nameToFileMap: Record<string, string> = {
    'HakurvianRocketTrooper': 'HarkuvianRocketTrooper',
    'RogueScrapper': 'RogueScraper',
    'DeathKnightReaper': 'Reaper',
    'Bouncertron': 'RoboBouncer',
    'BountyHunter': 'BountyHunters',
    'TrashtownMayor': 'TentCityMayor',
    'PrinceMarianas': 'HydroDude',
    'Hellbilly': 'DeadlyCrooner',
    'Ahexa': 'TechnoVirus',
    'Banannabal': 'Bananabal',
    'BloodreefCaptain': 'BloodReefCaptain'
};

async function processMonsterImages() {
    const monsterEncounterDays = getMonsterEncounterDays(
        parsedItemCards,
        parsedSkillCards,
        parsedCombatEncounterCards,
        parsedMonsters,
        parsedDayHours
    );

    const monsterEncounters = monsterEncounterDays.flatMap(({ groups }) =>
        groups.flatMap((group) =>
            group.map((monsterEncounter) =>
            ({
                cardId: monsterEncounter.cardId,
                // TODO: Is it necessary to call removeSpecialCharacters here? Double check.
                name: removeSpecialCharacters(monsterEncounter.cardName)
            }))
        )
    );

    console.log('Scanning for monster images...');

    const imageFiles = await fsPromises.readdir(assetPath);

    const missingImages: { name: string }[] = [];
    const foundImages: { isPortrait: boolean; cardId: string; name: string; matchedFile: string }[] = [];

    for (const monsterEncounter of monsterEncounters) {
        const sourceName = nameToFileMap[monsterEncounter.name] ?? monsterEncounter.name;

        const matchedPortrait = findMatchingFile(imageFiles, sourceName, '_Portrait');
        const matchedPortraitBG = findMatchingFile(imageFiles, sourceName, '_PortraitBG');

        if (!matchedPortrait) {
            missingImages.push({ name: monsterEncounter.name });
            continue;
        }

        foundImages.push({
            isPortrait: true,
            cardId: monsterEncounter.cardId,
            name: monsterEncounter.name,
            matchedFile: matchedPortrait
        });

        if (matchedPortraitBG) {
            foundImages.push({
                isPortrait: false,
                cardId: monsterEncounter.cardId,
                name: monsterEncounter.name,
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

    const imageCopyDescriptors = foundImages.map(({ isPortrait, cardId, matchedFile }) => ({
        fileName: isPortrait ? `${cardId}_Portrait` : `${cardId}_PortraitBG`,
        relativePath: matchedFile
    }));

    const copyAndRenamePath = path.join(inputDirectory, `${assetType}-renamed`);
    const copiedFiles = await copyAndRenameFiles(imageCopyDescriptors, assetPath, copyAndRenamePath);
    console.log(`Copied and renamed ${copiedFiles.length} files to ${copyAndRenamePath}`);
    if (copiedFiles.length !== imageCopyDescriptors.length) {
        throw new Error('Copied files count mismatch. Exiting early.');
    }

    // It's possible that there's unpaired images when background doesn't exist but foreground does due to incomplete design.
    const { pairs: imagePairs, unmatched } = pairImages(copiedFiles);
    console.log(`Found ${imagePairs.length} pairs and ${unmatched.length} unmatched files.`);

    const mergePath = path.join(inputDirectory, `${assetType}-merged`);
    const mergedFiles = await mergeImages(imagePairs, mergePath);
    console.log(`Merged ${mergedFiles.length} files into ${mergePath}`);
    if (mergedFiles.length !== imagePairs.length) {
        throw new Error('Merged files count mismatch. Exiting early.');
    }

    const avifPath = path.join(inputDirectory, `${assetType}-avif`);
    const convertedFiles = await convertImagesToAvif([...mergedFiles, ...unmatched], avifPath);
    console.log(`Converted to AVIF: ${convertedFiles.length} files.`);
    if (convertedFiles.length !== mergedFiles.length + unmatched.length) {
        throw new Error('Converted files count mismatch. Exiting early.');
    }

    const outputPath = path.join(outputDirectory, assetType);
    const resizedFiles = await checkAndResizeImages(convertedFiles, outputPath);
    console.log(`Resized ${resizedFiles.length} images into ${outputPath}`);
    if (resizedFiles.length !== convertedFiles.length) {
        throw new Error('Resized files count mismatch. Exiting early.');
    }
}

processMonsterImages().catch(console.error);

function findMatchingFile(imageFiles: string[], targetName: string, type: '_Portrait' | '_PortraitBG'): string | null {
    const prefixes = ['ENC_', 'Event_', 'Monster_'];

    for (const file of imageFiles) {
        let normalized = file;

        // Remove prefixes
        for (const prefix of prefixes) {
            normalized = normalized.replace(new RegExp(`^${prefix}|(?<=_)${prefix}`, 'g'), '');
        }

        // Replace suffixes
        normalized = normalized.replace(/_BG(?=\.[^.]+$)/, '_PortraitBG');
        normalized = normalized.replace(/_char(?=\.[^.]+$)/i, '_Portrait');

        if (normalized === `${targetName}${type}.png`) {
            return file;
        }
    }

    return null;
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