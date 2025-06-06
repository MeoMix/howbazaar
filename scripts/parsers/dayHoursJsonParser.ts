import type { ParsedDayHour } from "$lib/types";
import type { DayHoursJson } from "./types.parser";

export function parseJson(dayHoursJson: DayHoursJson): ParsedDayHour[] {
    const dayHoursList = Object.values(dayHoursJson)
        .map((dayHour) => {
            return {
                day: dayHour.Day,
                spawnGroups: dayHour.Groups.map(group => {
                    let ids = group;

                    if (dayHour.Day === 10) {
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