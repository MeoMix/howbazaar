export type EnchantmentType = 'Heavy' | 'Icy' | 'Turbo' | 'Shielded' | 'Restorative' | 'Toxic' | 'Fiery' | 'Shiny' | 'Deadly' | 'Radiant' | 'Obsidian' | 'Golden';
export type Hero = "Pygmalien" | "Vanessa" | "Stelle" | "Jules" | "Dooley" | "Mak" | "Common";
export type TierType = "Silver" | "Diamond" | "Bronze" | "Gold" | "Legendary";
export type Size = "Small" | "Medium" | "Large";
export type Tag = "Weapon" | "Shield" | "Heal" | "Joy" | "Burn" | "Poison" | "Merchant" | "Core" | "Property" | "Friend" | "Freeze" | "Aquatic" | "Vehicle" | "Tool" | "Potion" | "Food" | "Dragon" | "Tech" | "Ray" | "Dinosaur" | "Haste" | "Slow" | "Damage" | "Loot" | "Unsellable" | "Apparel" | "Toy";
export type HiddenTag = "Crit" | "Damage" | "Cooldown" | "Heal" | "Value" | "EconomyReference" | "BurnReference" | "Slow" | "Active" | "Shield" | "Burn" | "DamageReference" | "CritReference" | "Gold" | "Passive" | "NonWeapon" | "Multicast" | "Haste" | "HealReference" | "ShieldReference" | "HasteReference" | "Freeze" | "Poison" | "Ammo" | "Charge" | "JoyReference" | "Regen" | "PoisonReference" | "Health" | "Joy" | "Income" | "HealthReference" | "FreezeReference" | "SlowReference" | "AmmoReference" | "Toughness" | "Lifesteal" | "Experience" | "RegenReference";

type ClientSideTier = {
    tooltips: string[];
};

type ClientSideEnchantment = {
    type: EnchantmentType;
    tooltips: string[];
};

// TODO: Fix naming
export type ParsedItemCard = {
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
    remarks: string[];
};

export type ClientSideItemCard = {
    id: string;
    name: string;
    startingTier: TierType;
    tiers: { [key in TierType]: ClientSideTier };
    tags: Tag[];
    hiddenTags: HiddenTag[];
    size: Size;
    heroes: Hero[];
    enchantments: ClientSideEnchantment[];
    unifiedTooltips: string[];
    combatEncounters: ClientSideCombatEncounterSummary[];
    remarks: string[]
};

export type ParsedSkillCard = {
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

export type ClientSideSkillCard = {
    id: string;
    name: string;
    startingTier: TierType;
    tiers: { [key in TierType]: ClientSideTier };
    tags: Tag[];
    hiddenTags: HiddenTag[];
    size: Size;
    heroes: Hero[];
    unifiedTooltips: string[];
    combatEncounters: ClientSideCombatEncounterSummary[];
};

export type ClientSideCombatEncounterSummary = {
    cardId: string;
    cardName: string;
}

export type ParsedCombatEncounterCard = {
    id: string;
    // TODO: this could be more tightly typed
    name: string;
    monsterTemplateId: string;
};

export type ParsedMonster = {
    id: string;
    level: number;
    health: number;
    items: {
        templateId: string;
        tierType: TierType;
        // TODO: ideally this property wouldn't be sent client side as it's not needed
        socketId: string;
        enchantmentType?: EnchantmentType;
    }[];
    skills: {
        templateId: string;
        tierType: TierType;
    }[];
}

export type ParsedDayHour = {
    day: number;
    hour: number;
    spawnGroups: {
        // TODO: maybe rename to cardId for clarity
        ids: string[]
    }[];
};

type ClientSideMonsterEncounterItem = {
    card: ClientSideItemCard;
    tierType: TierType;
    enchantmentType: EnchantmentType | undefined;
};

type ClientSideMonsterEncounterSkill = {
    card: ClientSideSkillCard;
    tierType: TierType;
};

export type ClientSideMonsterEncounter = {
    cardId: string;
    cardName: string;
    level: number;
    health: number;
    items: ClientSideMonsterEncounterItem[];
    skills: ClientSideMonsterEncounterSkill[];
};

export type ClientSideMonsterEncounterDay = {
    day: number | "event";
    groups: ClientSideMonsterEncounter[][];
};

export type Option = {
    name: string;
    value: string | number;
};

export type TriState = "on" | "off" | "unset";

export type ItemsApiResponse = {
    data: ClientSideItemCard[];
    version: string;
}

export type SkillsApiResponse = {
    data: ClientSideSkillCard[];
    version: string;
}

export type MonsterEncounterDaysApiResponse = {
    data: ClientSideMonsterEncounterDay[];
    version: string;
}

export type ItemSortOptions = "name" | "tier" | "size" | "hero";
export type SkillSortOptions = "name" | "tier" | "hero";