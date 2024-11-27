import fs from 'fs';
import path from 'path';
import cardsJson from '../src/lib/parsers/v2_Cards.json';
import monstersJson from '../src/lib/parsers/v2_Monsters.json';
import dayHoursJson from '../src/lib/parsers/v2_DayHours.json';
import { parseJson as parseCardsJson } from '../src/lib/parsers/cardsJsonParser.ts';
import { parseJson as parseMonstersJson } from '../src/lib/parsers/monstersJsonParser.ts';
import { parseJson as parseDayHoursJson } from '../src/lib/parsers/dayHoursJsonParser.ts';
import type { CardsJson, DayHoursJson, MonstersJson } from '../src/lib/parsers/types.parser.d.ts';

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
        writeTypeScriptDefaultExport('processedItemCards', itemCards, 'ParsedItemCard');
        writeTypeScriptDefaultExport('processedSkillCards', skillCards, 'ParsedSkillCard');
        writeTypeScriptDefaultExport('processedCombatEncounterCards', combatEncounterCards, 'ParsedCombatEncounterCard');
        writeTypeScriptDefaultExport('processedMonsters', processedMonsters, 'ParsedMonster');
        writeTypeScriptDefaultExport('processedDayHours', processedDayHours, 'ParsedDayHours');
    } catch (error) {
        console.error('Error processing data:', error);
        process.exit(1);
    }
}

preprocessData();

function writeTypeScriptDefaultExport(fileName: string, data: any, typeName: string) {
    const typeSafeData = JSON.stringify(data, null, 2);
    const fileContent = `// Auto-generated file. Do not edit directly.
// TypeScript representation of processed data.
import type { ${typeName} } from '$lib/types';

const data: ${typeName}[] = ${typeSafeData};

export default data;
`;

    const filePath = path.resolve(`./src/lib/${fileName}.ts`);

    fs.writeFileSync(filePath, fileContent);
    console.log(`Saved ${typeName} file with default export to ${filePath}`);
}