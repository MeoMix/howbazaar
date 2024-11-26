import fs from 'fs';
import path from 'path';
import cardsJson from '../src/lib/v2_Cards.json';
import monstersJson from '../src/lib/v2_Monsters.json';
import dayHoursJson from '../src/lib/v2_DayHours.json';
import { parseJson as parseCardsJson } from '../src/lib/parsers/cardsJsonParser.ts';
import { parseJson as parseMonstersJson } from '../src/lib/parsers/monstersJsonParser.ts';
import { parseJson as parseDayHoursJson } from '../src/lib/parsers/dayHoursJsonParser.ts';
import type { CardsJson, DayHoursJson, MonstersJson } from '../src/lib/types.ts';

// Define the output file paths
// TODO: It would probably make sense to store these as TypeScript for better type safety
const processedItemCardsPath = path.resolve('./src/lib/processedItemCards.json');
const processedSkillCardsPath = path.resolve('./src/lib/processedSkillCards.json');
const processedCombatEncounterCardsPath = path.resolve('./src/lib/processedCombatEncounterCards.json');
const processedMonstersPath = path.resolve('./src/lib/processedMonsters.json');
const processedDayHoursPath = path.resolve('./src/lib/processedDayHours.json');

async function preprocessData() {
    try {
        // Process the cards and monsters data
        const {
            itemCards,
            skillCards,
            combatEncounterCards
        } = parseCardsJson(cardsJson as CardsJson);
        const processedMonsters = parseMonstersJson(monstersJson as MonstersJson);
        const processedDayHours = parseDayHoursJson(dayHoursJson as DayHoursJson);

        // Write processed cards data to disk
        fs.writeFileSync(processedItemCardsPath, JSON.stringify(itemCards, null, 2));
        console.log(`Saved item cards to ${processedItemCardsPath}`);

        fs.writeFileSync(processedSkillCardsPath, JSON.stringify(skillCards, null, 2));
        console.log(`Saved skill cards to ${processedSkillCardsPath}`);

        fs.writeFileSync(processedCombatEncounterCardsPath, JSON.stringify(combatEncounterCards, null, 2));
        console.log(`Saved combat encounter cards to ${processedCombatEncounterCardsPath}`);

        // Write processed monsters data to disk
        fs.writeFileSync(processedMonstersPath, JSON.stringify(processedMonsters, null, 2));
        console.log(`Saved monsters to ${processedMonstersPath}`);

        fs.writeFileSync(processedDayHoursPath, JSON.stringify(processedDayHours, null, 2));
        console.log(`Saved day hours to ${processedDayHoursPath}`);
    } catch (error) {
        console.error('Error processing data:', error);
        process.exit(1);
    }
}

preprocessData();
