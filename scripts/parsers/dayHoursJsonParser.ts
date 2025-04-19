import type { ParsedDayHour } from "$lib/types";
import type { DayHoursJson } from "./types.parser";

export function parseJson(dayHoursJson: DayHoursJson): ParsedDayHour[] {
    const dayHoursList = Object.values(dayHoursJson)
        .filter((dayHour) => dayHour.SpawnContext.Limit.Value === 3)
        .map((dayHour) => {
            return {
                day: dayHour.Day,
                hour: dayHour.Hour,
                spawnGroups: dayHour.SpawnContext.Groups.map(group => {
                    if (group.Filters.length > 1) {
                        console.warn('Expected group.Filters to have length of 1.');
                    }

                    let ids = group.Filters[0].Ids;

                    if (dayHour.Day === 10 && dayHour.Hour === 3) {
                        // Sparring Partner is no longer an Hour 3 encounter.
                        ids = ids.filter(id => id !== "60be5dca-6908-439c-843a-92dcb5b5dc4e");
                    }

                    return {
                        ids
                    };
                })
            };
        });

    return dayHoursList;
}