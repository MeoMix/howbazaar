import type { V2CardsD as Card } from "$lib/parsers/cards";
import type { The04747408_De0E4944_B79D23_Ca41008619 as Monster } from "$lib/parsers/data/v2_Monsters";
import type { V2DayHoursD as DayHour } from "$lib/parsers/data/v2_DayHours";

export type CardsJson = {
    [version: string]: Card[];
};

export type MonstersJson = { [key: string]: Monster };
export type DayHoursJson = { [key: string]: DayHour };
