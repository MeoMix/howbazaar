import { getVersionedMonsterEncounterDays } from "$lib/utils/dataUtils";

export function load() {
    const { monsterEncounterDays, version } = getVersionedMonsterEncounterDays();

    const dayOptions = monsterEncounterDays.map(({ day }) => ({
        name: `${day}${day === 10 ? "+" : ""}`,
        value: day,
    }));

    return { version, dayOptions };
}