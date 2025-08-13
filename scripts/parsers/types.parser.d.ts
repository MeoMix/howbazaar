import type { The500 as Card } from "./data/cards";
import type { V2MonstersD as Monster } from "./data/v2_Monsters";
import type { V2DayHoursD as DayHour } from "./data/v2_DayHours";

export type CardsJson = {
    [version: string]: Card[];
};

export type MonstersJson = { [key: string]: Monster };
export type DayHoursJson = { [key: string]: DayHour };
