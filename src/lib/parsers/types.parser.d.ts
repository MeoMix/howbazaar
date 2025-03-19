import type { V2CardsD as Card } from "$lib/parsers/v2_Cards";
import type { The04747408_De0E4944_B79D23_Ca41008619 as Monster } from "$lib/parsers/patches/latest/v2_Monsters";
import type { V2DayHoursD as DayHour } from "$lib/parsers/patches/latest/v2_DayHours";

export type CardsJson = {
    "0.1.9": Card[];
};

export type MonstersJson = { [key: string]: Monster };
export type DayHoursJson = { [key: string]: DayHour };
