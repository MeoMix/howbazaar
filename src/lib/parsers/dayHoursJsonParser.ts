import type { ParsedDayHours } from "$lib/types";
import type { DayHoursJson } from "./types.parser";

export function parseJson(dayHoursJson: DayHoursJson): ParsedDayHours[] {
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

                    return {
                        ids: group.Filters[0].Ids
                    };
                })
            };
        });

    return dayHoursList;
}