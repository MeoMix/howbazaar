import type { SkillsApiResponse } from "$lib/types";
import { getCardFilterOptions } from "$lib/utils/filterUtils";

export async function load({ fetch }) {
    const response = await fetch('/api/skills');

    if (!response.ok) {
        throw new Error(`Failed to load skills: ${response.statusText}`);
    }

    const { data: skills, version }: SkillsApiResponse = await response.json();
    const { heroOptions, tagOptions, minimumTierOptions } = getCardFilterOptions(skills);

    return {
        heroOptions,
        tagOptions,
        minimumTierOptions,
        version,
    };
}