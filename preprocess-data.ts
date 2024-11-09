import fs from 'fs';
import path from 'path';
import cardsJson from './src/lib/v2_Cards.json';
import monstersJson from './src/lib/v2_Monsters.json';
import { parseJson as parseCardsJson } from './src/lib/cardsJsonParser.ts';
import { parseJson as parseMonstersJson } from './src/lib/monstersJsonParser.ts';
import type { CardsJson, MonstersJson } from './src/lib/types.ts';

// Define the output file paths
const processedCardsPath = path.resolve('./src/lib/processedCards.json');
const processedMonstersPath = path.resolve('./src/lib/processedMonsters.json');

async function preprocessData() {
    try {
        console.log('running');
        // Process the cards and monsters data
        const processedCards = parseCardsJson(cardsJson as CardsJson);
        
        console.log('running2');
        const processedMonsters = parseMonstersJson(monstersJson as MonstersJson, processedCards);

        // Write processed cards data to disk
        fs.writeFileSync(processedCardsPath, JSON.stringify(processedCards, null, 2));
        console.log(`Processed cards data saved to ${processedCardsPath}`);

        // Write processed monsters data to disk
        fs.writeFileSync(processedMonstersPath, JSON.stringify(processedMonsters, null, 2));
        console.log(`Processed monsters data saved to ${processedMonstersPath}`);
    } catch (error) {
        console.error('Error processing data:', error);
        process.exit(1);
    }
}

preprocessData();
