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
import sharp from 'sharp';

// Initially missing skills from the original export given to me by Book:
// 'Icon_SKILL_MON_ToxicFriendship',
// 'Icon_SKILL_MON_ExtremeComfort',
// 'Icon_SKILL_MON_CleanStorefront',
// 'Icon_SKILL_MON_AugmentedWeaponry',
// 'Icon_SKILL_MON_AugmentedDefenses',
// 'Icon_SKILL_MON_PurifyingFlame'
const assetPath = './scripts/images/skills/';

async function renameSkillImages() {
    // Parse data
    const parsedCards = parseCardsJson(cardsJson as CardsJson);
    const parsedMonsters = parseMonstersJson(monstersJson as MonstersJson);
    const parsedDayHours = parseDayHoursJson(dayHoursJson as DayHoursJson);
    const monsterEncounterDays = getMonsterEncounterDays(parsedCards, parsedMonsters as Monster[], parsedDayHours) as MonsterEncounterDay[];

    // Collect skillArtEntries with artKey and corresponding name without spaces
    const skillArtEntries = Array.from(new Map(
        monsterEncounterDays.flatMap(({ groups }) =>
            groups.flatMap(group =>
                group.flatMap(monsterEncounter =>
                    monsterEncounter.skills.map(skill => {
                        const { name, artKey } = skill.card;
                        const nameWithoutSpecialCharacters = name.replace(/[\s&'-]+/g, "");
                        const artKeyWithoutExtension = path.parse(artKey).name; // Remove file extension from artKey
                        return [artKeyWithoutExtension, { artKey: artKeyWithoutExtension, nameWithoutSpecialCharacters }];
                    })
                )
            )
        )
    ).values());

    // Get file names in the local directory (without extensions)
    const files = await fs.readdir(assetPath);
    const localFileNames = files.map(file => path.parse(file).name); // Exclude file type from names

    // Identify missing files by comparing artKeys to local file names
    const stillMissing = skillArtEntries.filter(({ artKey }) => !localFileNames.includes(artKey));

    // Exit if there are missing files
    if (stillMissing.length > 0) {
        console.error(`Missing ${stillMissing.length} skill images:`, stillMissing.map(({ artKey }) => artKey));
        return;
    }

    // Rename files and collect unused files
    const renamedFiles = new Set<string>();

    for (const { artKey, nameWithoutSpecialCharacters } of skillArtEntries) {
        const originalFile = files.find(file => path.parse(file).name === artKey);
        if (originalFile) {
            const originalFilePath = `${assetPath}${originalFile}`;
            const newFilePath = `${assetPath}${nameWithoutSpecialCharacters}${path.extname(originalFile)}`;
    
            // Rename the file if the new name is different from the current name
            if (originalFilePath !== newFilePath) {
                await fs.rename(originalFilePath, newFilePath);
                console.log(`Renamed "${originalFile}" to "${nameWithoutSpecialCharacters}${path.extname(originalFile)}"`);
            }
    
            // Add the original file name to renamedFiles
            renamedFiles.add(originalFile);
        }
    }
    
    // Delete files that weren't renamed (exclude files that were renamed by original name)
    const unusedFiles = files.filter(file => !renamedFiles.has(file));
    for (const unusedFile of unusedFiles) {
        const unusedFilePath = `${assetPath}${unusedFile}`;
        await fs.unlink(unusedFilePath);
        console.log(`Deleted unused file: "${unusedFile}"`);
    }

    console.log("All skill images renamed and unused files deleted.");
}

renameSkillImages().catch(console.error);
