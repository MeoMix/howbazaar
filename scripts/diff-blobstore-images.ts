import { promises as fs } from 'fs';
import { list } from '@vercel/blob';
import dotenv from 'dotenv';


import cardsJson from '../src/lib/v2_Cards.json';
import monstersJson from '../src/lib/v2_Monsters.json';
import dayHoursJson from '../src/lib/v2_DayHours.json';
import { parseJson as parseCardsJson } from '../src/lib/cardsJsonParser.ts';
import { parseJson as parseMonstersJson } from '../src/lib/monstersJsonParser.ts';
import { parseJson as parseDayHoursJson } from '../src/lib/dayHoursJsonParser.ts';

import type { CardsJson, DayHoursJson, Monster, MonsterEncounterDay, MonstersJson } from "../src/lib/types";
import { getMonsterEncounterDays } from "../src/lib/services/monsterEncounterService";

dotenv.config({ path: '.env.development.local' });

const token = process.env.BLOB_READ_WRITE_TOKEN;

if (!token) {
    console.error("BLOB_READ_WRITE_TOKEN is not set in the environment.");
    process.exit(1);
}

const prefix = 'items';

async function diffBlobstoreImages() {
    const { blobs } = await list({ prefix });

    const uploadedItemNames = blobs.map(blob => blob.pathname.replace(`${prefix}/`, '').replace('.webp', ''));
    console.log('Uploaded Item Names:', uploadedItemNames);

    const parsedCards = parseCardsJson(cardsJson as CardsJson);
    const parsedMonsters = parseMonstersJson(monstersJson as MonstersJson);
    const parsedDayHours = parseDayHoursJson(dayHoursJson as DayHoursJson);

    const monsterEncounterDays = getMonsterEncounterDays(parsedCards, parsedMonsters as Monster[], parsedDayHours) as MonsterEncounterDay[];

    const itemNames = monsterEncounterDays.flatMap(({ groups }) =>
        groups.flatMap(group =>
            group.flatMap(monsterEncounter =>
                monsterEncounter.items.map(item => item.card.name.replace(/[\s&'-]+/g, ""))
            )
        )
    );
    // console.log('Item Names:', itemNames);

    const missingItems = itemNames.filter(itemName => !uploadedItemNames.includes(itemName));
    console.log('Missing Items:', missingItems);

    // Get file names in the local directory
    const files = await fs.readdir('./scripts/images/items');

    const localFileNames = files.map(file => file.replace('.jpeg', ''));

    // Find missing items that are still missing locally
    const foundLocally = missingItems.filter(itemName => localFileNames.includes(itemName));
    const stillMissing = missingItems.filter(itemName => !localFileNames.includes(itemName));

    console.log('Found Locally:', foundLocally);
    console.log('Still Missing:', stillMissing);
}

diffBlobstoreImages().catch(console.error);
