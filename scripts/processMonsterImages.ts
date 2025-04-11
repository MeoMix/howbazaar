import fsPromises from 'fs/promises';
import path from 'path';
import parsedItemCards from "../src/lib/db/patches/latest/parsedItemCards";
import parsedSkillCards from "../src/lib/db/patches/latest/parsedSkillCards";
import parsedCombatEncounterCards from "../src/lib/db/patches/latest/parsedCombatEncounterCards";
import parsedMonsters from "../src/lib/db/patches/latest/parsedMonsters";
import parsedDayHours from "../src/lib/db/patches/latest/parsedDayHours";
import { getMonsterEncounterDays } from "../src/lib/services/monsterEncounterService";
import { getSanitizedFileName, removeSpecialCharacters } from './utils/stringUtils';
import { copyAndRenameFiles } from './utils/fileUtils';
import { checkAndResizeImages, convertImagesToAvif, type ImagePair, mergeImages } from './utils/imageUtils';

const inputDirectory = './scripts/images/';
const assetType = 'monsters';
const assetPath = `${inputDirectory}${assetType}/`;
const outputDirectory = './static/images/';

// NOTES:
// Got the majority of encounter images by searching for _Portrait and exporting all those that started with Monster and ended in Portrait
// This resulted in 11 missing:
// 'EnclaveWeeper', -- didn't have Monster prefix
// 'LoanShark', -- didn't have Monster prefix
// 'Retiree', -- only one copy exists (with the BG suffix)
// 'Banannabal', -- suffixed with Char, prefixed with ENC (ENC_Monster_Banannabal_Char)
// 'Pyro', -- suffixed with Char, prefixed with ENC (ENC_Monster_Pyro_Char)
// 'HauntedKimono', suffixed with Char, prefixed with ENC (ENC_Monster_HauntedKimono_Char)
// 'SergeantSuds', -- only one copy exists (with the BG suffix)
// 'ChillyCharles', -- only one copy exists (with the BG suffix)
// 'FerrosKhan', -- prefixed with ENC
// 'EnclaveRevenant', -- prefixed with Event
// 'Robo-Bouncer' -- only one copy exists (with the BG suffix), named Robobouncer
// 'Bounty Hunter' -- prefixed with ENC
// 'Mimic' -- prefixed with ENC

const nameToFileMap: Record<string, string> = {
    'DireInglet': 'DireIngle',
    'HakurvianRocketTrooper': 'HarkuvianRocketTrooper',
    'LordoftheWastes': 'LordOfTheWastes',
    'BurninatorBot': 'IncinerationBot',
    'ShockTrooper': 'Shocktrooper',
    'ScoutTrooper': 'Scouttrooper',
    'PropertyBaron': 'PropertyMogul',
    'KyverDrone': 'KyverNest',
    'TrashGolem': 'TrashBandit',
    'RogueScrapper': 'RogueScraper',
    'TempestFlamedancer': 'TempestBravo',
    'Thug': 'Mugger',
    'DeathKnightReaper': 'Reaper',
    'DrVortex': 'MadScientist',
    'Bouncertron': 'RoboBouncer',
    'BountyHunter': 'BountyHunters',
    'TrashtownMayor': 'TentCityMayor',
    'PrinceMarianas': 'Hydrodude',
    'Hellbilly': 'DeadlyCrooner',
    'Ahexa': 'TechnoVirus'
};

async function processMonsterImages() {
    const monsterEncounterDays = getMonsterEncounterDays(
        parsedItemCards,
        parsedSkillCards,
        parsedCombatEncounterCards,
        parsedMonsters,
        parsedDayHours
    );

    const monsterEncounterNames = monsterEncounterDays.flatMap(({ groups }) =>
        groups.flatMap((group) =>
            group.map((monsterEncounter) =>
                removeSpecialCharacters(monsterEncounter.cardName)
            )
        )
    );

    await cleanFileNames(assetPath);

    console.log('Scanning for monster images...');

    // 1) Read the actual image files in that folder
    const imageFiles = await fsPromises.readdir(assetPath);

    // 2) Find matches / track missing
    const missingImages: { name: string }[] = [];
    const foundImages: { name: string; matchedFile: string }[] = [];

    for (const encounterName of monsterEncounterNames) {
        const sourceName = nameToFileMap[encounterName] ?? encounterName;
        const portraitFile = `${sourceName}_Portrait.png`;
        const portraitBGFile = `${sourceName}_PortraitBG.png`;

        const hasPortrait = imageFiles.includes(portraitFile);
        const hasPortraitBG = imageFiles.includes(portraitBGFile);

        if (!hasPortrait && !hasPortraitBG) {
            missingImages.push({ name: encounterName });
            continue;
        }

        if (hasPortrait) {
            foundImages.push({
                name: `${encounterName}_Portrait`,
                matchedFile: portraitFile
            });
        }

        if (hasPortraitBG) {
            foundImages.push({
                name: `${encounterName}_PortraitBG`,
                matchedFile: portraitBGFile
            });
        }
    }

    // 3) Log how many were found / missing
    console.log(`Found ${foundImages.length} matching images.`);
    console.log(`Missing ${missingImages.length} images.`);

    if (missingImages.length > 0) {
        console.log('Missing images:');
        console.table(missingImages);
        throw new Error('Missing required encounter images. Exiting early.');
    }

    // 4) Rename and copy files
    const toRename = foundImages.map(item => ({
        name: item.name,
        matchedFile: item.matchedFile
    }));

    const renamedAssetPath = `${inputDirectory}${assetType}-renamed/`;
    const copiedFiles = await copyAndRenameFiles(toRename, assetPath, renamedAssetPath);

    console.log(`Copied and renamed ${copiedFiles.length} files to ${renamedAssetPath}`);

    console.log('Merging, converting, and resizing images...');
    const { pairs: imagePairs, unmatched } = pairImages(copiedFiles);
    const mergedAssetPath = path.join(inputDirectory, `${assetType}-merged`);
    const mergedFiles = await mergeImages(imagePairs, mergedAssetPath);
    console.log(`Merged ${mergedFiles.length} files into ${mergedAssetPath}`);

    // It's possible that there's an unpaired image due to the image being in an unfinished design state.
    const convertedFiles = await convertImagesToAvif([...mergedFiles, ...unmatched], `${inputDirectory}/${assetType}-avif`);

    const finalOutputPath = path.join(outputDirectory, assetType);
    const resizedFiles = await checkAndResizeImages(convertedFiles, finalOutputPath);

    console.log(`Resized ${resizedFiles.length} images into ${finalOutputPath}`);
}

processMonsterImages().catch(console.error);

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
            pairMap[baseName].portrait = fullPath;
        } else if (type === '_PortraitBG') {
            pairMap[baseName].background = fullPath;
        }
    }

    const pairs = Object.values(pairMap) as ImagePair[];
    return { pairs, unmatched };
}

async function cleanFileNames(folderPath: string) {
    const prefixes = ["ENC_", "Event_", "Monster_"];
    const suffixToReplace = "_Char";
    const replacementSuffix = "_Portrait";

    const files = await fsPromises.readdir(folderPath);

    for (const file of files) {
        const originalFilePath = path.join(folderPath, file);
        const stats = await fsPromises.stat(originalFilePath);
        if (!stats.isFile()) continue;

        let newFileName = file;
        for (const prefix of prefixes) {
            newFileName = newFileName.replace(new RegExp(`^${prefix}|(?<=_)${prefix}`, 'g'), '');
        }

        const extension = path.extname(newFileName);
        if (new RegExp(`${suffixToReplace}${extension}$`, 'i').test(newFileName)) {
            newFileName = newFileName.slice(0, -suffixToReplace.length - extension.length) + replacementSuffix + extension;
        }

        newFileName = newFileName.replace(/_BG(?=\.[^.]+$)/, '_PortraitBG');
        newFileName = getSanitizedFileName(newFileName);

        const newFilePath = path.join(folderPath, newFileName);

        if (originalFilePath !== newFilePath) {
            await fsPromises.rename(originalFilePath, newFilePath);
            console.log(`Renamed: ${file} → ${newFileName}`);
        }
    }
}