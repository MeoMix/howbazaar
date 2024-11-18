import parsedCards from "$lib/processedCards.json" assert { type: "json" };
import parsedMonsters from "$lib/processedMonsters.json" assert { type: "json" };
import parsedDayHours from "$lib/processedDayHours.json" assert { type: "json" };

import type { ClientSideCard, Monster, MonsterEncounterDay } from "$lib/types";
import { redirect } from "@sveltejs/kit";
import { getMonsterEncounterDays } from "$lib/services/monsterEncounterService";

let cards: ClientSideCard[];
let monsterEncounterDays: MonsterEncounterDay[];

export function load({ url }) {
    if (url.pathname === '/') {
        redirect(302, '/items');
    }

    if (!monsterEncounterDays) {
        if (!cards) {
            cards = parsedCards as ClientSideCard[];
        }

        monsterEncounterDays = getMonsterEncounterDays(cards, parsedMonsters as Monster[], parsedDayHours);
    }

    return { monsterEncounterDays };
}