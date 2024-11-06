import type { V2CardsD as Card, Tier as TierType } from "$lib/v2_Cards";

export type CardsJson = { [key: string]: Card };

export type ClientSideTier = {
    attributes: {
        name: string;
        value: number;
        valueDescriptor: string | null;
    }[];
    tooltips: string[];
};

// TODO: Fix naming
export type ClientSideCard = {
    type: "Item" | "Skill";
    name: string;
    tiers: {
        [key in TierType]: ClientSideTier
    };
    tags: string[];
    hiddenTags: string[];
    size: "Small" | "Medium" | "Large";
    heroes: string[];
}

export type ClientSideCardItem = ClientSideCard & { type: "Item" };
export type ClientSideCardSkill = ClientSideCard & { type: "Skill" };
