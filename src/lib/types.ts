import type { V2CardsD as Card, Tier as TierType } from "$lib/v2_Cards";
import type { The04747408_De0E4944_B79D23_Ca41008619 as Monster } from "$lib/v2_Monsters";

export type CardsJson = { [key: string]: Card };

export type ClientSideTier = {
    attributes: {
        name: string;
        value: number;
        valueDescriptor: string | null;
    }[];
    tooltips: string[];
};

type ClientSideEnchantment = {
    name: string;
    tooltips: string[];
};

export type ClientSideTierType = TierType;

// TODO: Fix naming
export type ClientSideCard = {
    id: string;
    type: "Item" | "Skill";
    name: string;
    tiers: {
        [key in TierType]: ClientSideTier
    };
    tags: string[];
    hiddenTags: string[];
    size: "Small" | "Medium" | "Large";
    heroes: string[];
    enchantments: ClientSideEnchantment[]
}

export type ClientSideCardItem = ClientSideCard & { type: "Item" };
export type ClientSideCardSkill = ClientSideCard & { type: "Skill" };


export type MonstersJson = { [key: string]: Monster };

export type ClientSideMonster = {
    name: string;
    attributes: {
        level: number,
        health: number,
        healthRegen: number,
    };
    items: {
        card: ClientSideCardItem,
        tier: TierType
    }[],
    skills: {
        card: ClientSideCardSkill,
        tier: TierType
    }[]
}