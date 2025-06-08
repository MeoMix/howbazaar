export type EnchantmentType = 'Heavy' | 'Icy' | 'Turbo' | 'Shielded' | 'Restorative' | 'Toxic' | 'Fiery' | 'Shiny' | 'Deadly' | 'Radiant' | 'Obsidian' | 'Golden';
export type Hero = "Pygmalien" | "Vanessa" | "Stelle" | "Jules" | "Dooley" | "Mak" | "Common" | "Hero7";
export type TierType = "Silver" | "Diamond" | "Bronze" | "Gold" | "Legendary";
export type Size = "Small" | "Medium" | "Large";
export type Tag = "Weapon" | "Shield" | "Heal" | "Joy" | "Burn" | "Poison" | "Merchant" | "Core" | "Property" | "Friend" | "Apparel" | "Freeze" | "Aquatic" | "Toy" | "Dinosaur" | "Tool" | "Potion" | "Vehicle" | "Food" | "Dragon" | "Tech" | "Ray" | "Haste" | "Slow" | "Damage" | "Loot" | "Ingredient" | "Relic" | "Reagent" | "Regen" | "Quest" | "Charge";
// TODO: Why is Regen both a Tag and a HiddenTag?
// TODO: Why is HealthMax both a Tag and a HiddenTag?
export type HiddenTag = "Health" | "Level" | "Gold" | "Burn" | "Shield" | "DamageReference" | "Regen" | "Damage" | "Active" | "Haste" | "Cooldown" | "Crit" | "Ammo" | "EconomyReference" | "PotionReference" | "Value" | "Charge" | "Multicast" | "RegenReference" | "JoyReference" | "Heal" | "BurnReference" | "NonWeapon" | "Slow" | "ShieldReference" | "CritReference" | "Poison" | "SlowReference" | "TechReference" | "Freeze" | "HealReference" | "PoisonReference" | "Joy" | "Toughness" | "HasteReference" | "Lifesteal" | "Income" | "FreezeReference" | "Quest" | "AmmoReference" | "Passive" | "HealthReference" | "Experience" | "Unsellable" | "Regeneration";
export type CustomTag = "Unpurchasable";

type ClientSideTier = {
    tooltips: string[];
};

export type ClientSideEnchantment = {
    type: EnchantmentType;
    tooltips: string[];
};

export type ClientSideQuest = {
    entries: {
        tooltips: string[];
        rewardTooltips: string[];
    }[];
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
    customTags: CustomTag[];
    size: Size;
    heroes: Hero[];
    // TODO: Shouldn't be "ClientSide" already here
    enchantments: ClientSideEnchantment[];
    quests: ClientSideQuest[];
    unifiedTooltips: string[];
    packId: CorePackId | ExpansionPackId;
};

// TODO: Why is Pygmalien in the Core pack?
export type CorePackId = "Core" | "Pygmalien_Core" | "Vanessa_Core" | "Dooley_Core" | "Mak_Core" | "Jules_Core" | "Stelle_Core" | "Pygmalien";
export type ExpansionPackId = "Pyg_Frozen_Assets" | "Vanessa_Mysteries_of_the_Deep" | "Mak_Lost_Treasures" |"Vanessa_From_the_Shadows" | "Pyg_Pigglestorm" | "Dooley_Primal_Dooley" | "Dooley_Dooltron" | "Vanessa_The_Gang" | "Pyg_Investment_Opportunities" | "Mak_Dangerous_Experiments";

export type ClientSideItemCard = {
    id: string;
    name: string;
    startingTier: TierType;
    tiers: { [key in TierType]: ClientSideTier };
    tags: Tag[];
    hiddenTags: HiddenTag[];
    customTags: CustomTag[];
    size: Size;
    // TODO: Items can only have a single hero.
    heroes: Hero[];
    enchantments: ClientSideEnchantment[];
    quests: ClientSideQuest[];
    unifiedTooltips: string[];
    combatEncounters: ClientSideCombatEncounterSummary[];
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
    customTags: CustomTag[];
    size: Size;
    heroes: Hero[];
    artKey: string;
    unifiedTooltips: string[];
    packId: CorePackId | ExpansionPackId;
};

export type ClientSideSkillCard = {
    id: string;
    name: string;
    startingTier: TierType;
    tiers: { [key in TierType]: ClientSideTier };
    tags: Tag[];
    hiddenTags: HiddenTag[];
    customTags: CustomTag[];
    size: Size;
    heroes: Hero[];
    unifiedTooltips: string[];
    combatEncounters: ClientSideCombatEncounterSummary[];
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
};

export type ParsedMerchantCard = {
    id: string;
    name: string;
    heroes: Hero[];
    description: string;
}

export type ClientSideMerchantCard = {
    id: string;
    name: string;
    heroes: Hero[];
    description: string;
    filters: {
        sizes?: Size[];
        tagStates?: Partial<Record<Tag | HiddenTag, TriState>>;
        tiers?: TierType[];
        heroes?: Hero[];
        isMatchAnyTag?: false;
    }
}

export type ParsedMonster = {
    id: string;
    health: number;
    items: {
        id: string;
        tierType: TierType;
        enchantmentType?: EnchantmentType;
    }[];
    skills: {
        id: string;
        tierType: TierType;
    }[];
}

export type ParsedDayHour = {
    day: number;
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

export type MerchantsApiResponse = {
    data: ClientSideMerchantCard[];
    version: string;
}

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

export interface PatchVersion {
    version: string;
    label: string;
    date: string;
    path: string;
}