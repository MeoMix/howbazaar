export type EnchantmentType = 'Heavy' | 'Icy' | 'Turbo' | 'Shielded' | 'Restorative' | 'Toxic' | 'Fiery' | 'Shiny' | 'Deadly' | 'Radiant' | 'Obsidian' | 'Golden';
export type Hero = "Pygmalien" | "Vanessa" | "Stelle" | "Jules" | "Dooley" | "Mak" | "Common";
export type TierType = "Silver" | "Diamond" | "Bronze" | "Gold" | "Legendary";
export type Size = "Small" | "Medium" | "Large";
export type Tag = "Weapon" | "Shield" | "Heal" | "Joy" | "Burn" | "Poison" | "Merchant" | "Core" | "Property" | "Friend" | "Apparel" | "Freeze" | "Aquatic" | "Toy" | "Dinosaur" | "Tool" | "Potion" | "Vehicle" | "Food" | "Dragon" | "Tech" | "Ray" | "Haste" | "Slow" | "Damage" | "Loot" | "Ingredient";
export type HiddenTag = "HealthMax" | "Health" | "Poison" | "Income" | "Cooldown" | "Heal" | "Value" | "EconomyReference" | "Damage" | "BurnReference" | "Slow" | "Active" | "Shield" | "Burn" | "DamageReference" | "CritReference" | "Gold" | "Passive" | "NonWeapon" | "Multicast" | "Haste" | "HealReference" | "ShieldReference" | "HasteReference" | "Freeze" | "Crit" | "Ammo" | "Charge" | "JoyReference" | "Regen" | "PoisonReference" | "Joy" | "HealthReference" | "FreezeReference" | "SlowReference" | "AmmoReference" | "Toughness" | "Lifesteal" | "Experience" | "RegenReference" | "Unsellable";

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
    packId: CorePackId | ExpansionPackId;
};

export type CorePackId = "Core" | "Pygmalien_Core" | "Vanessa_Core" | "Dooley_Core" | "Mak_Core" | "Jules_Core" | "Stelle_Core";
export type ExpansionPackId = "Pyg_Frozen_Assets" | "Vanessa_Mysteries_of_the_Deep";

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
    remarks: string[];
    packId: CorePackId | ExpansionPackId;
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
    remarks: string[];
    packId: CorePackId | ExpansionPackId;
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
    remarks: string[];
    packId: CorePackId | ExpansionPackId;
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
    day: ClientSideMonsterEncounterDay['day'];
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

export type AllSearchLocationOption = ItemSearchLocationOption | SkillSearchLocationOption | MonsterSearchLocationOption;
export type ItemSearchLocationOption = "name" | "name-text" | "name-text-enchantments";
export type SkillSearchLocationOption = "name" | "name-text";
export type MonsterSearchLocationOption = "name" | "name-text";
export type ItemSortOption = "name" | "tier" | "size" | "hero";
export type SkillSortOption = "name" | "tier" | "hero";

// Patch Notes Types
export type SimplePropertyChange<T> = {
    oldValue: T | null;
    newValue: T | null;
};

export type ArrayPropertyChange<T> = {
    added: T[];
    removed: T[];
};

export type TooltipChange = {
    index: number;
    oldValue: string | null;
    newValue: string | null;
};

export type EnchantmentChange = {
    type: EnchantmentType;
    tooltipChanges: TooltipChange[];
};

export type BaseMetadata = {
    id: string;
    name: string;
    previousStartingTier: TierType;
    currentStartingTier: TierType;
    currentSize: Size;
    type: "item" | "skill";
};

export type ItemMetadata = BaseMetadata & {
    currentHero: Hero;
};

export type SkillMetadata = BaseMetadata & {
    heroes: Hero[];
};

export type BasePatchNote = {
    name?: SimplePropertyChange<string>;
    startingTier?: SimplePropertyChange<TierType>;
    tags?: ArrayPropertyChange<Tag>;
    hiddenTags?: ArrayPropertyChange<HiddenTag>;
    size?: SimplePropertyChange<Size>;
    tooltips?: TooltipChange[];
};

export type ItemPatchNote = BasePatchNote & {
    metadata: ItemMetadata;
    heroes?: ArrayPropertyChange<Hero>;
    enchantments?: {
        added: EnchantmentChange[];
        removed: EnchantmentChange[];
        modified: EnchantmentChange[];
    };
};

export type SkillPatchNote = BasePatchNote & {
    metadata: SkillMetadata;
    heroes?: ArrayPropertyChange<Hero>;
};

export type PatchNotes = {
    version: string;
    items: Record<string, ItemPatchNote>;
    skills: Record<string, SkillPatchNote>;
};