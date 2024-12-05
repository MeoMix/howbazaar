import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import parsedItemCards from "../src/lib/db/parsedItemCards";
import parsedSkillCards from "../src/lib/db/parsedSkillCards";
import parsedCombatEncounterCards from "../src/lib/db/parsedCombatEncounterCards";
import parsedMonsters from "../src/lib/db/parsedMonsters";
import parsedDayHours from "../src/lib/db/parsedDayHours";
import { getMonsterEncounterDays } from "../src/lib/services/monsterEncounterService";
import sharp from 'sharp';
import { getSanitizedFileName, removeSpecialCharacters } from './utils/stringUtils';
import { deleteFiles } from './utils/fileUtils';
import { checkAndResizeImages, convertImagesToAvif } from './utils/imageUtils';

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

const inputDirectory = './scripts/images/';
const assetType = 'monsters';
const assetPath = `${inputDirectory}${assetType}/`;
const outputDirectory = './static/images/';

// Define a mapping for manual overrides with shorthand names
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
    'RoboBouncer': 'Robobouncer',
    'BountyHunter': 'BountyHunters'
};

async function processMonsterImages() {
    const monsterEncounterDays = getMonsterEncounterDays(parsedItemCards, parsedSkillCards, parsedCombatEncounterCards, parsedMonsters, parsedDayHours);

    const monsterEncounterNames = monsterEncounterDays.flatMap(({ groups }) =>
        groups.flatMap(group =>
            group.flatMap(monsterEncounter =>
                removeSpecialCharacters(monsterEncounter.cardName)
            )
        )
    );

    console.log('monsterEncounterNames', monsterEncounterNames);

    // Adjust the mapping to the full expected file name format
    const adjustedNameToFileMap = Object.fromEntries(
        Object.entries(nameToFileMap).map(([key, value]) => [key, `${value}_Portrait.png`])
    );

    // Start by cleaning the files to make comparison easier.
    await cleanFileNames(assetPath).catch(console.error);

    const files = await fsPromises.readdir(assetPath);

    // List of files that are not matched by any monsterEncounterNames or adjustedNameToFileMap
    const unmatchedFiles = files.filter(file => {
        const baseFileName = file.replace(/(_PortraitBG|_Portrait)\.png$/, '_Portrait.png');
        return (
            !monsterEncounterNames.some(name => `${name}_Portrait.png` === baseFileName) &&
            !Object.values(adjustedNameToFileMap).includes(baseFileName)
        );
    });

    console.log(`Unmatched files (${unmatchedFiles.length}):`, unmatchedFiles);

    const stillMissing = monsterEncounterNames.filter((name) => {
        const expectedFileName = `${name}_Portrait.png`;
        const alternativeFileName = `${name}_PortraitBG.png`;
        return !files.includes(expectedFileName) && !files.includes(alternativeFileName) &&
            !(name in adjustedNameToFileMap && (files.includes(adjustedNameToFileMap[name]) || files.includes(adjustedNameToFileMap[name].replace('_Portrait.png', '_PortraitBG.png'))));
    });

    console.error(`Missing ${stillMissing.length} encounter images:`, stillMissing);

    if (stillMissing.length !== 0) {
        return;
    }

    console.log('Deleting unmatched');

    await deleteFiles(unmatchedFiles, assetPath);

    console.log('Fixing names');

    // Rename files in nameToFileMap if they exist in the directory
    for (const [newName, originalName] of Object.entries(nameToFileMap)) {
        const originalFilePathPortrait = path.join(assetPath, `${originalName}_Portrait.png`);
        const newFilePathPortrait = path.join(assetPath, `${newName}_Portrait.png`);

        const originalFilePathPortraitBG = path.join(assetPath, `${originalName}_PortraitBG.png`);
        const newFilePathPortraitBG = path.join(assetPath, `${newName}_PortraitBG.png`);

        try {
            // Rename _Portrait files if they exist
            if (await fileExists(originalFilePathPortrait)) {
                await fsPromises.rename(originalFilePathPortrait, newFilePathPortrait);
                console.log(`Renamed ${originalFilePathPortrait} to ${newFilePathPortrait}`);
            }
            // Rename _PortraitBG files if they exist
            if (await fileExists(originalFilePathPortraitBG)) {
                await fsPromises.rename(originalFilePathPortraitBG, newFilePathPortraitBG);
                console.log(`Renamed ${originalFilePathPortraitBG} to ${newFilePathPortraitBG}`);
            }
        } catch (error) {
            console.error(`Failed to rename ${originalName}:`, error);
        }
    }

    await sanitizeFileNames(files);
    await mergeImages(assetPath, `${assetPath}/merged`);
    await convertImagesToAvif(`${assetPath}/merged`, `${inputDirectory}/${assetType}-avif`);
    await checkAndResizeImages(`${inputDirectory}/${assetType}-avif`, `${outputDirectory}/${assetType}`);
}

processMonsterImages().catch(console.error);

// TODO: I forget why this is necessary
async function sanitizeFileNames(files: string[]) {
    const renamePromises = files.map(async (file) => {
        const sanitizedFileName = getSanitizedFileName(file);
        const originalFilePath = path.join(assetPath, file);
        const sanitizedFilePath = path.join(assetPath, sanitizedFileName);

        // Rename the file only if the sanitized name is different
        if (file !== sanitizedFileName) {
            try {
                await fsPromises.rename(originalFilePath, sanitizedFilePath);
                console.log(`Renamed ${file} to ${sanitizedFileName}`);
            } catch (error) {
                console.error(`Failed to rename ${file}:`, error);
            }
        }
    });

    await Promise.all(renamePromises);
}

async function cleanFileNames(folderPath: string) {
    // Define prefixes and suffix to remove
    const prefixes = ["ENC_", "Event_", "Monster_"];
    const suffixToReplace = "_Char";
    const replacementSuffix = "_Portrait";

    // Read all files in the directory
    const files = await fsPromises.readdir(folderPath);

    for (const file of files) {
        const originalFilePath = path.join(folderPath, file);

        // Skip if it's not a file
        const stats = await fsPromises.stat(originalFilePath);
        if (!stats.isFile()) continue;

        // Remove all instances of prefixes from the file name
        let newFileName = file;
        for (const prefix of prefixes) {
            newFileName = newFileName.replace(new RegExp(`^${prefix}|(?<=_)${prefix}`, 'g'), '');
        }

        // Replace suffix "_Char" with "_Portrait" before the file extension
        const extension = path.extname(newFileName);
        if (newFileName.endsWith(suffixToReplace + extension)) {
            newFileName = newFileName.slice(0, -suffixToReplace.length - extension.length) + replacementSuffix + extension;
        }

        // Replace _BG with _PortraitBG if it exists before the extension
        newFileName = newFileName.replace(/_BG(?=\.[^.]+$)/, '_PortraitBG');

        // Sanitize the name
        newFileName = getSanitizedFileName(newFileName);

        // Generate the new file path
        const newFilePath = path.join(folderPath, newFileName);

        // Rename the file if the name has changed
        if (originalFilePath !== newFilePath) {
            await fsPromises.rename(originalFilePath, newFilePath);
            console.log(`Renamed: ${file} -> ${newFileName}`);
        }
    }
}

async function fileExists(filePath: string): Promise<boolean> {
    try {
        await fsPromises.access(filePath);
        return true;
    } catch {
        return false;
    }
}

async function mergeImages(inputFolder: string, outputFolder: string) {
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true });
    }

    const files = fs.readdirSync(inputFolder);
    const portraitMap: Record<string, string> = {};

    // Sort files into portrait and background pairs
    files.forEach(file => {
        const match = file.match(/^(.*?)(_Portrait|_PortraitBG)\.png$/);
        if (match) {
            const baseName = match[1];
            if (!portraitMap[baseName]) {
                portraitMap[baseName] = '';
            }
            portraitMap[baseName] += ` ${file}`;
        }
    });

    const mergePromises = Object.entries(portraitMap).map(async ([baseName, fileNames]) => {
        const [portraitFile, backgroundFile] = fileNames.trim().split(' ');

        if (portraitFile && backgroundFile) {
            // Load both images and composite them
            const portraitPath = path.join(inputFolder, portraitFile);
            const backgroundPath = path.join(inputFolder, backgroundFile);
            const outputPath = path.join(outputFolder, `${baseName}.png`);

            try {
                const bgImage = sharp(backgroundPath);
                const { width, height } = await bgImage.metadata();

                await bgImage
                    .composite([{ input: portraitPath, gravity: 'center' }])
                    .resize(width, height) // Ensures they match, in case of minor differences
                    .toFile(outputPath);

                console.log(`Merged ${portraitFile} and ${backgroundFile} into ${outputPath}`);
            } catch (err) {
                console.error(`Error merging images for ${baseName}:`, err);
            }
        } else {
            // Only one image found, save it as is
            const singleFile = portraitFile || backgroundFile;
            const singleFilePath = path.join(inputFolder, singleFile);
            const outputPath = path.join(outputFolder, `${baseName}.png`);

            try {
                await sharp(singleFilePath).toFile(outputPath);
                console.log(`Saved ${singleFile} as ${outputPath}`);
            } catch (err) {
                console.error(`Error saving image for ${baseName}:`, err);
            }
        }
    });

    await Promise.all(mergePromises);
}