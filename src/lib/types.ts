import type { V2CardsD as Card, Hero, HiddenTag, Size, Tag, Tier as TierType } from "$lib/parsers/v2_Cards";
import type { The04747408_De0E4944_B79D23_Ca41008619 as JsonMonsterType } from "$lib/parsers/v2_Monsters";
import type { V2DayHoursD as DayHour } from "$lib/parsers/v2_DayHours";

export type CardsJson = { [key: string]: Card };
export type MonstersJson = { [key: string]: JsonMonsterType };
export type DayHoursJson = { [key: string]: DayHour };

export type ClientSideTier = {
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
export type ParsedCardItem = {
    id: string;
    name: string;
    startingTier: TierType;
    tiers: { [key in TierType]: {
        tooltips: string[];
    } };
    tags: Tag[];
    hiddenTags: HiddenTag[];
    size: Size;
    heroes: Hero[];
    enchantments: ClientSideEnchantment[];
    unifiedTooltips: string[];
};

export type ClientSideCardItem = {
    id: string;
    name: string;
    startingTier: ClientSideTierType;
    tiers: { [key in ClientSideTierType]: ClientSideTier };
    tags: ClientSideTag[];
    hiddenTags: ClientSideHiddenTag[];
    size: ClientSideSize;
    heroes: ClientSideHero[];
    enchantments: ClientSideEnchantment[];
    unifiedTooltips: string[];
    combatEncounters: ClientSideCombatEncounterSummary[];
};

export type ParsedCardSkill = {
    id: string;
    name: string;
    startingTier: TierType;
    tiers: { [key in TierType]: {
        tooltips: string[];
    } };
    tags: Tag[];
    hiddenTags: HiddenTag[];
    size: Size;
    heroes: Hero[];
    artKey: string;
    unifiedTooltips: string[];
};

export type ClientSideCardSkill = {
    id: string;
    name: string;
    startingTier: ClientSideTierType;
    tiers: { [key in ClientSideTierType]: ClientSideTier };
    tags: ClientSideTag[];
    hiddenTags: ClientSideHiddenTag[];
    size: ClientSideSize;
    heroes: ClientSideHero[];
    unifiedTooltips: string[];
    combatEncounters: ClientSideCombatEncounterSummary[];
};

export type ClientSideCombatEncounterSummary = {
    cardId: string;
    cardName: string;
}

export type ParsedCardCombatEncounter = {
    id: string;
    name: string;
    monsterTemplateId: string;
};

export type Monster = {
    id: string;
    level: number;
    health: number;
    items: {
        templateId: string;
        tierType: TierType;
        // TODO: ideally this property wouldn't be sent client side as it's not needed
        socketId: string;
        enchantmentType: ClientSideEnchantmentType | undefined;
    }[];
    skills: {
        templateId: string;
        tierType: TierType;
    }[];
}

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

export type ItemsApiResponse = {
    data: ClientSideCardItem[];
    version: string;
}

export type SkillsApiResponse = {
    data: ClientSideCardSkill[];
    version: string;
}

export type MonsterEncounterDaysApiResponse = {
    data: MonsterEncounterDay[];
    version: string;
}