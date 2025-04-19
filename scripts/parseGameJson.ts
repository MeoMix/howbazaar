import fs from 'fs';
import path from 'path';
import cardsJson from './parsers/data/cards.json' with { type: "json" };
import monstersJson from './parsers/data/v2_Monsters.json' with { type: "json" };
import dayHoursJson from './parsers/data/v2_DayHours.json' with { type: "json" };
import { parseJson as parseCardsJson } from './parsers/cardsJsonParser.ts';
import { parseJson as parseMonstersJson } from './parsers/monstersJsonParser.ts';
import { parseJson as parseDayHoursJson } from './parsers/dayHoursJsonParser.ts';
import type { CardsJson, DayHoursJson, MonstersJson } from './parsers/types.parser';

async function parseGameJson() {
    try {
        // Process the cards and monsters data
        const {
            itemCards,
            skillCards,
            combatEncounterCards,
            merchantCards
        } = parseCardsJson(cardsJson as CardsJson);
        const monsters = parseMonstersJson(monstersJson as MonstersJson);
        const dayHours = parseDayHoursJson(dayHoursJson as DayHoursJson);

        // Write processed cards data to disk
        writeTypeScriptDefaultExport('parsedItemCards', itemCards, 'ParsedItemCard');
        writeTypeScriptDefaultExport('parsedSkillCards', skillCards, 'ParsedSkillCard');
        writeTypeScriptDefaultExport('parsedCombatEncounterCards', combatEncounterCards, 'ParsedCombatEncounterCard');
        writeTypeScriptDefaultExport('parsedMerchantCards', merchantCards, 'ParsedMerchantCard');
        writeTypeScriptDefaultExport('parsedMonsters', monsters, 'ParsedMonster');
        writeTypeScriptDefaultExport('parsedDayHours', dayHours, 'ParsedDayHour');
    } catch (error) {
        console.error('Error processing data:', error);
        process.exit(1);
    }
}

parseGameJson();

function writeTypeScriptDefaultExport(fileName: string, data: any, typeName: string) {
    const typeSafeData = JSON.stringify(data, null, 2);
    const fileContent = `// Auto-generated file. Do not edit directly.
// TypeScript representation of processed data.
import type { ${typeName} } from '$lib/types';

const data: ${typeName}[] = ${typeSafeData};

export default data;
`;

    const filePath = path.resolve(`./src/lib/db/patches/latest/${fileName}.ts`);

    fs.writeFileSync(filePath, fileContent);
    console.log(`Saved ${typeName} file with default export to ${filePath}`);
}