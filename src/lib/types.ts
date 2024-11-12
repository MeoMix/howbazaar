import type { V2CardsD as Card, Hero, HiddenTag, Size, Tag, Tier as TierType } from "$lib/v2_Cards";
import type { The04747408_De0E4944_B79D23_Ca41008619 as Monster } from "$lib/v2_Monsters";
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
};

export type ClientSideCardCombatEncounter = {
    id: string;
    type: "CombatEncounter";
    name: string;
    monsterTemplateId: string;
};

export type MonstersJson = { [key: string]: Monster };

export type ClientSideMonster = {
    cardId: string;
    name: string;
    attributes: {
        level: number,
        health: number,
    };
    items: {
        card: ClientSideCardItem,
        tierType: ClientSideTierType
        // TODO: name vs type
        enchantmentName: ClientSideEnchantmentType | undefined;
    }[],
    skills: {
        card: ClientSideCardSkill,
        tierType: ClientSideTierType
    }[]
}

export type DayHoursJson = { [key: string]: DayHour };

export type ClientSideDayHours = {
    day: number;
    hour: number;
    spawnGroups: {
        ids: string[]
    }[];
};