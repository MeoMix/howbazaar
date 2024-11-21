import parsedCards from "$lib/processedCards.json" assert { type: "json" };
import parsedMonsters from "$lib/processedMonsters.json" assert { type: "json" };
import parsedDayHours from "$lib/processedDayHours.json" assert { type: "json" };
import { getMonsterEncounterDays } from "$lib/services/monsterEncounterService";
import type { ClientSideCard, ClientSideCardItem, ClientSideCardSkill, ClientSideDayHours, Monster, MonsterEncounterDay } from "$lib/types";
import versionHashes from "$lib/versionHashes";

export function getVersionedSkills(): { skills: ClientSideCardSkill[]; version: string; } {
    const skills = (parsedCards as ClientSideCard[])
        .filter((card): card is ClientSideCardSkill => card.type === "Skill")
        .sort((a, b) => a.name.localeCompare(b.name));

    return {
        skills,
        version: versionHashes.cardsHash,
    };
}

export function getVersionedItems(): { items: ClientSideCardItem[]; version: string; } {
    const items = (parsedCards as ClientSideCard[])
        .filter((card): card is ClientSideCardItem => card.type === "Item")
        .sort((a, b) => a.name.localeCompare(b.name));

    return {
        items,
        version: versionHashes.cardsHash,
    };
}

export function getVersionedMonsterEncounterDays(): { monsterEncounterDays: MonsterEncounterDay[]; version: string; } {
    const cards = parsedCards as ClientSideCard[];
    const monsters = parsedMonsters as Monster[];
    const dayHours = parsedDayHours as ClientSideDayHours[];

    const monsterEncounterDays = getMonsterEncounterDays(cards, monsters, dayHours).sort(
        (dayHourA, dayHourB) => dayHourA.day - dayHourB.day,
    );

    return {
        monsterEncounterDays,
        version: `${versionHashes.cardsHash}-${versionHashes.monstersHash}-${versionHashes.dayHoursHash}`,
    };
}