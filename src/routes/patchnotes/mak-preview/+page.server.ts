import type { ItemsApiResponse, SkillsApiResponse } from "$lib/types";

export async function load({ fetch }) {
    const itemsResponse = await fetch('/api/items');

    if (!itemsResponse.ok) {
        throw new Error(`Failed to load items: ${itemsResponse.statusText}`);
    }

    const { version: itemsVersion }: ItemsApiResponse = await itemsResponse.json();

    const skillsResponse = await fetch('/api/skills');

    if (!skillsResponse.ok) {
        throw new Error(`Failed to load skills: ${skillsResponse.statusText}`);
    }

    const { version: skillsVersion }: SkillsApiResponse = await skillsResponse.json();

    return {
        itemsVersion,
        skillsVersion,
    };
}