import parsedCards from "$lib/processedCards.json" assert { type: "json" };
import parsedMonsters from "$lib/processedMonsters.json" assert { type: "json" };
import parsedDayHours from "$lib/processedDayHours.json" assert { type: "json" };
import { getMonsterEncounterDays } from "$lib/services/monsterEncounterService";
import type { ClientSideCard, ClientSideCardItem, ClientSideCardSkill, ClientSideDayHours, Monster, MonsterEncounterDay } from "$lib/types";
import stringify from 'fast-json-stable-stringify';
import xxhash from 'xxhashjs';

let skillsHash: string | undefined;
let itemsHash: string | undefined;
let monsterEncounterDaysHash: string | undefined;

const getHash = (obj: object): string => xxhash.h32(stringify(obj), 0xABCD).toString(16)

export function getVersionedSkills(): { skills: ClientSideCardSkill[]; version: string; } {
    const skills = (parsedCards as ClientSideCard[])
        .filter((card): card is ClientSideCardSkill => card.type === "Skill");

    if (skillsHash === undefined) {
        skillsHash = getHash(skills);
    }

    return {
        skills: skills.sort((a, b) => a.name.localeCompare(b.name)),
        version: skillsHash,
    };
}

export function getVersionedItems(): { items: ClientSideCardItem[]; version: string; } {
    const items = (parsedCards as ClientSideCard[])
        .filter((card): card is ClientSideCardItem => card.type === "Item");

    if (itemsHash === undefined) {
        itemsHash = getHash(items);
    }

    return {
        items: items.sort((a, b) => a.name.localeCompare(b.name)),
        version: itemsHash,
    };
}

export function getVersionedMonsterEncounterDays(): { monsterEncounterDays: MonsterEncounterDay[]; version: string; } {
    const cards = parsedCards as ClientSideCard[];
    const monsters = parsedMonsters as Monster[];
    const dayHours = parsedDayHours as ClientSideDayHours[];

    const monsterEncounterDays = getMonsterEncounterDays(cards, monsters, dayHours)

    if (monsterEncounterDaysHash === undefined) {
        monsterEncounterDaysHash = getHash(monsterEncounterDays);
    }

    return {
        monsterEncounterDays: monsterEncounterDays.sort((a, b) => a.day - b.day),
        version: monsterEncounterDaysHash,
    };
}