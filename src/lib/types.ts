import type { V2CardsD as Card, Hero, HiddenTag, Size, Tag, Tier as TierType } from "$lib/v2_Cards";
import type { The04747408_De0E4944_B79D23_Ca41008619 as JsonMonsterType } from "$lib/v2_Monsters";
import type { V2DayHoursD as DayHour } from "$lib/v2_DayHours";

export type CardsJson = { [key: string]: Card };

export type ClientSideTier = {
    attributes: {
        name: string;
        value: number;
        valueDescriptor: string | null;
    }[];
    tooltips: string[];
};

export type ClientSideEnchantmentType = 'Heavy' | 'Icy' | 'Turbo' | 'Shielded' | 'Restorative' | 'Toxic' | 'Fiery' | 'Shiny' | 'Deadly' | 'Radiant' | 'Obsidian' | 'Golden';

type ClientSideEnchantment = {
    name: ClientSideEnchantmentType;
    tooltips: string[];
};

export type ClientSideHero = Hero;
export type ClientSideTierType = TierType;
export type ClientSideSize = Size;
export type ClientSideTag = Tag;
export type ClientSideHiddenTag = HiddenTag;

// TODO: Fix naming
export type ClientSideCard = ClientSideCardItem | ClientSideCardSkill | ClientSideCardCombatEncounter;

export type ClientSideCardItem = {
    id: string;
    type: "Item";
    name: string;
    startingTier: ClientSideTierType;
    tiers: { [key in ClientSideTierType]: ClientSideTier };
    tags: ClientSideTag[];
    hiddenTags: ClientSideHiddenTag[];
    size: ClientSideSize;
    heroes: ClientSideHero[];
    enchantments: ClientSideEnchantment[];
    artKey?: string;
};

export type ClientSideCardSkill = {
    id: string;
    type: "Skill";
    name: string;
    startingTier: ClientSideTierType;
    tiers: { [key in ClientSideTierType]: ClientSideTier };
    tags: ClientSideTag[];
    hiddenTags: ClientSideHiddenTag[];
    size: ClientSideSize;
    heroes: ClientSideHero[];
    enchantments: ClientSideEnchantment[];
    artKey: string;
};

export type ClientSideCardCombatEncounter = {
    id: string;
    type: "CombatEncounter";
    name: string;
    monsterTemplateId: string;
};

export type MonstersJson = { [key: string]: JsonMonsterType };

export type Monster = {
    id: string;
    level: number;
    health: number;
    items: {
        templateId: string;
        tierType: TierType;
        enchantmentType: ClientSideEnchantmentType | undefined;
    }[];
    skills: {
        templateId: string;
        tierType: TierType;
    }[];
}

export type DayHoursJson = { [key: string]: DayHour };

export type ClientSideDayHours = {
    day: number;
    hour: number;
    spawnGroups: {
        // TODO: maybe rename to cardId for clarity
        ids: string[]
    }[];
};


type MonsterEncounterItem = {
    card: ClientSideCardItem;
    tierType: ClientSideTierType;
    enchantmentType: ClientSideEnchantmentType | undefined;
};

type MonsterEncounterSkill = {
    card: ClientSideCardSkill;
    tierType: ClientSideTierType;
};

export type MonsterEncounter = {
    cardId: string;
    cardName: string;
    level: number;
    health: number;
    items: MonsterEncounterItem[];
    skills: MonsterEncounterSkill[];
};

export type MonsterEncounterDay = {
    day: number;
    groups: MonsterEncounter[][];
};

export type Option = {
    name: string;
    value: string | number;
};

export type TriState = "on" | "off" | "unset";