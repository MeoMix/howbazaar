export const tierOrder = [
    "Bronze",
    "Silver",
    "Gold",
    "Diamond",
    "Legendary",
] as const;

export type TierType = (typeof tierOrder)[number];

export type Tier = {
    Attributes: { [key: string]: number };
};

type Tiers = Partial<Record<TierType, Tier>>;

type AbilityActionType =
    | "TActionCardHaste"
    | "TActionPlayerDamage"
    | "TActionCardSlow"
    | "TActionPlayerBurnApply"
    | "TActionPlayerShieldApply"
    | "TActionPlayerHeal"
    | "TActionPlayerPoisonApply"
    | "TActionCardReload"
    | "TActionCardFreeze"
    | "TActionCardCharge"
    | "TActionCardModifyAttribute"
    | "TActionPlayerModifyAttribute"
    | "TActionGameSpawnCards";

// TODO: tighten up the expectations here
type AbilityAction =
    | {
        $type: AbilityActionType;
        Value: AbilityActionValue;
        SpawnContext?: never;
    }
    | {
        $type: AbilityActionType;
        SpawnContext: AbilitySpawnContext;
        Value?: never;
    };

type AbilityActionValue =
    | { AttributeType: string; $type?: never; Value?: never }
    | { $type: "TFixedValue"; Value: number; AttributeType?: never }
    | {
        $type: "TReferenceValueCardAttribute";
        Target: { $type: "TTargetCardSelf" };
        AttributeType?: never;
    };

type AbilitySpawnContext = {
    Limit: {
        $type: "TFixedValue";
        Value: number;
    };
};

export type Ability = {
    Id: string;
    TranslationKey: string;
    Action: AbilityAction;
};

export type Aura = {
    Id: string;
    TranslationKey: string;
    Action: {
        $type: "TAuraActionCardModifyAttribute";
        Value: {
            AttributeType: string;
            Modifier?: {
                Value: number;
            };
        };
    };
};

type CardItemSize = "Small" | "Medium" | "Large";

export type CardItem = {
    $type: "TCardItem";
    Id: string;
    Tiers: Tiers;
    Localization: {
        Title: { Text: string };
        Tooltips: Array<{
            Key: string;
            Content: { Key: string; Text: string };
        }>;
    };
    Abilities: {
        [key: string]: Ability;
    };
    Auras: {
        [key: string]: Aura;
    };
    StartingTier: TierType;
    Tags: string[];
    HiddenTags: string[];
    Size: CardItemSize;
    Heroes: string[];
    SpawningEligibility: "Always" | "Never" | "GuidOnly";
}

// TODO: Fix naming
export type ClientSideCardItem = {
    name: string;
    tiers: {
        name: string;
        attributes: {
            name: string;
            value: number;
            valueDescriptor: string | null;
        }[];
        abilityTexts: string[];
    }[];
    tags: string[];
    hiddenTags: string[];
    size: CardItemSize;
    heroes: string[];
}
