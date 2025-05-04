import type { ItemsApiResponse, MerchantsApiResponse, MonsterEncounterDaysApiResponse, SkillsApiResponse } from "$lib/types";
import { getCardFilterOptions } from "$lib/utils/filterUtils";

export async function load({ fetch }) {
    const itemsResponse = await fetch('/api/items');

    if (!itemsResponse.ok) {
        throw new Error(`Failed to load items: ${itemsResponse.statusText}`);
    }

    const { data: items, version: itemsVersion }: ItemsApiResponse = await itemsResponse.json();

    const skillsResponse = await fetch('/api/skills');

    if (!skillsResponse.ok) {
        throw new Error(`Failed to load skills: ${skillsResponse.statusText}`);
    }

    const { data: skills, version: skillsVersion }: SkillsApiResponse = await skillsResponse.json();
    const { heroOptions, tagOptions, minimumTierOptions, sizeOptions, expansionOptions } = getCardFilterOptions([...items, ...skills]);

    const monsterEncounterDaysResponse = await fetch('/api/monsterEncounterDays');

    if (!monsterEncounterDaysResponse.ok) {
        throw new Error(`Failed to load monsterEncounterDays: ${monsterEncounterDaysResponse.statusText}`);
    }

    const { version: monstersVersion }: MonsterEncounterDaysApiResponse = await monsterEncounterDaysResponse.json();

    const merchantsResponse = await fetch('/api/merchants');

    if (!merchantsResponse.ok) {
        throw new Error(`Failed to load merchants: ${merchantsResponse.statusText}`);
    }

    const { version: merchantsVersion }: MerchantsApiResponse = await merchantsResponse.json();

    return {
        heroOptions,
        tagOptions,
        minimumTierOptions,
        sizeOptions,
        expansionOptions,
        itemsVersion,
        skillsVersion,
        monstersVersion,
        merchantsVersion
    };
}