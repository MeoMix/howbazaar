import type { MonsterEncounterDaysApiResponse } from "$lib/types";

export async function load({ fetch }) {
    const response = await fetch('/api/monsterEncounterDays');

    if (!response.ok) {
        throw new Error(`Failed to load monsterEncounterDays: ${response.statusText}`);
    }

    const { data: monsterEncounterDays, version }: MonsterEncounterDaysApiResponse = await response.json();

    const dayOptions = monsterEncounterDays.map(({ day }) => ({
        name: `${day}${day === 10 ? "+" : ""}`,
        value: day,
    }));

    return { version, dayOptions };
}