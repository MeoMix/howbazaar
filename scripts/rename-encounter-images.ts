import * as fs from 'fs/promises';
import path from 'path';

import cardsJson from '../src/lib/v2_Cards.json';
import monstersJson from '../src/lib/v2_Monsters.json';
import dayHoursJson from '../src/lib/v2_DayHours.json';
import { parseJson as parseCardsJson } from '../src/lib/cardsJsonParser.ts';
import { parseJson as parseMonstersJson } from '../src/lib/monstersJsonParser.ts';
import { parseJson as parseDayHoursJson } from '../src/lib/dayHoursJsonParser.ts';
import type { CardsJson, DayHoursJson, Monster, MonsterEncounterDay, MonstersJson } from "../src/lib/types";
import { getMonsterEncounterDays } from "../src/lib/services/monsterEncounterService";

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

const assetPath = './scripts/images/encounters/';

async function renameSkillImages() {
    const parsedCards = parseCardsJson(cardsJson as CardsJson);
    const parsedMonsters = parseMonstersJson(monstersJson as MonstersJson);
    const parsedDayHours = parseDayHoursJson(dayHoursJson as DayHoursJson);
    const monsterEncounterDays = getMonsterEncounterDays(parsedCards, parsedMonsters as Monster[], parsedDayHours) as MonsterEncounterDay[];

    const monsterEncounterNames = monsterEncounterDays.flatMap(({ groups }) =>
        groups.flatMap(group =>
            group.flatMap(monsterEncounter =>
                monsterEncounter.cardName.replace(/\s+/g, '').replace(/[-'&]/g, '')
            )
        )
    );

    console.log('monsterEncounterNames', monsterEncounterNames);

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
        'Dr.Vortex': 'MadScientist',
        'RoboBouncer': 'Robobouncer'
    };

    // Adjust the mapping to the full expected file name format
    const adjustedNameToFileMap = Object.fromEntries(
        Object.entries(nameToFileMap).map(([key, value]) => [key, `${value}_Portrait.png`])
    );

    // Start by cleaning the files to make comparison easier.
    await cleanFileNames(assetPath).catch(console.error);

    const files = await fs.readdir(assetPath);

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

    // Delete unmatched files
    for (const file of unmatchedFiles) {
        const filePath = path.join(assetPath, file);
        try {
            await fs.unlink(filePath);
            console.log(`Deleted unmatched file: ${file}`);
        } catch (error) {
            console.error(`Failed to delete ${file}:`, error);
        }
    }

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
                await fs.rename(originalFilePathPortrait, newFilePathPortrait);
                console.log(`Renamed ${originalFilePathPortrait} to ${newFilePathPortrait}`);
            }
            // Rename _PortraitBG files if they exist
            if (await fileExists(originalFilePathPortraitBG)) {
                await fs.rename(originalFilePathPortraitBG, newFilePathPortraitBG);
                console.log(`Renamed ${originalFilePathPortraitBG} to ${newFilePathPortraitBG}`);
            }
        } catch (error) {
            console.error(`Failed to rename ${originalName}:`, error);
        }
    }

    // Sanitize file names
    for (const file of files) {
        const sanitizedFileName = file.replace(/[-'&]/g, '');
        const originalFilePath = path.join(assetPath, file);
        const sanitizedFilePath = path.join(assetPath, sanitizedFileName);

        // Rename the file only if the sanitized name is different
        if (file !== sanitizedFileName) {
            try {
                await fs.rename(originalFilePath, sanitizedFilePath);
                console.log(`Renamed ${file} to ${sanitizedFileName}`);
            } catch (error) {
                console.error(`Failed to rename ${file}:`, error);
            }
        }
    }
}

renameSkillImages().catch(console.error);

async function cleanFileNames(folderPath: string) {
    // Define prefixes and suffix to remove
    const prefixes = ["ENC_", "Event_", "Monster_"];
    const suffixToReplace = "_Char";
    const replacementSuffix = "_Portrait";

    // Read all files in the directory
    const files = await fs.readdir(folderPath);

    for (const file of files) {
        const originalFilePath = path.join(folderPath, file);

        // Skip if it's not a file
        const stats = await fs.stat(originalFilePath);
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
        newFileName = newFileName.replace(/[-'&]/g, '');

        // Generate the new file path
        const newFilePath = path.join(folderPath, newFileName);

        // Rename the file if the name has changed
        if (originalFilePath !== newFilePath) {
            await fs.rename(originalFilePath, newFilePath);
            console.log(`Renamed: ${file} -> ${newFileName}`);
        }
    }
}

async function fileExists(filePath: string): Promise<boolean> {
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
}