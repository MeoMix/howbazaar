export type EnchantmentType = 'Heavy' | 'Icy' | 'Turbo' | 'Shielded' | 'Restorative' | 'Toxic' | 'Fiery' | 'Shiny' | 'Deadly' | 'Radiant' | 'Obsidian' | 'Golden';
export type Hero = "Pygmalien" | "Vanessa" | "Stelle" | "Jules" | "Dooley" | "Mak" | "Common";
export type TierType = "Silver" | "Diamond" | "Bronze" | "Gold" | "Legendary";
export type Size = "Small" | "Medium" | "Large";
export type Tag = "Merchant" | "Weapon" | "Shield" | "Heal" | "Joy" | "Burn" | "Poison" | "Core" | "Property" | "Aquatic" | "Friend" | "Freeze" | "Potion" | "Vehicle" | "Tool" | "Food" | "Slow" | "Haste" | "Damage" | "Unsellable";
export type HiddenTag = "Crit" | "EconomyReference" | "Damage" | "Cooldown" | "Heal" | "Active" | "Value" | "BurnReference" | "Slow" | "DamageReference" | "Shield" | "Passive" | "NonWeapon" | "FreezeReference" | "Freeze" | "CritReference" | "Gold" | "Burn" | "Toughness" | "Multicast" | "Haste" | "HealReference" | "ShieldReference" | "HasteReference" | "Poison" | "Ammo" | "JoyReference" | "Regen" | "PoisonReference" | "Health" | "Joy" | "Income" | "HealthReference" | "Charge" | "SlowReference" | "Lifesteal" | "AmmoReference" | "Experience" | "CooldownReference" | "RegenReference";

type ClientSideTier = {
    tooltips: string[];
};

type ClientSideEnchantment = {
    name: EnchantmentType;
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

type MonsterEncounterItem = {
    card: ClientSideItemCard;
    tierType: TierType;
    enchantmentType: EnchantmentType | undefined;
};

type MonsterEncounterSkill = {
    card: ClientSideSkillCard;
    tierType: TierType;
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
    data: ClientSideItemCard[];
    version: string;
}

export type SkillsApiResponse = {
    data: ClientSideSkillCard[];
    version: string;
}

export type MonsterEncounterDaysApiResponse = {
    data: MonsterEncounterDay[];
    version: string;
}