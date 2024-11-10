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

export type ClientSideEnchantment = {
    // TODO: This type could be tighter
    name: string;
    tooltips: string[];
};

export type ClientSideTierType = TierType;

// TODO: Fix naming
export type ClientSideCard = ClientSideCardItem | ClientSideCardSkill | ClientSideCardCombatEncounter;

export type ClientSideCardItem = {
    id: string;
    type: "Item";
    name: string;
    startingTier: ClientSideTierType;
    tiers: { [key in ClientSideTierType]: ClientSideTier };
    tags: string[];
    hiddenTags: string[];
    size: "Small" | "Medium" | "Large";
    heroes: string[];
    enchantments: ClientSideEnchantment[];
};

export type ClientSideCardSkill = {
    id: string;
    type: "Skill";
    name: string;
    startingTier: ClientSideTierType;
    tiers: { [key in ClientSideTierType]: ClientSideTier };
    tags: string[];
    hiddenTags: string[];
    size: "Small" | "Medium" | "Large";
    heroes: string[];
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
    name: string;
    attributes: {
        level: number,
        health: number,
        // healthRegen: number,
    };
    items: {
        card: ClientSideCardItem,
        tier: ClientSideTierType
        // TODO: tighten this name
        enchantmentName: string | undefined;
    }[],
    skills: {
        card: ClientSideCardSkill,
        tier: ClientSideTierType
    }[]
}