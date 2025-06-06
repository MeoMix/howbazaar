export interface V2MonstersD {
    Id:           string;
    InternalName: string;
    Health:       number;
    Items:        Item[];
    Skills:       Skill[];
}

export interface Item {
    EnchantmentType: null | string;
    Id:              string;
    Tier:            Tier;
}

export type Tier = "Bronze" | "Silver" | "Gold" | "Diamond" | "Legendary";

export interface Skill {
    Id:   string;
    Tier: Tier;
}
