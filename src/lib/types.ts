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
    // TODO: add support for AbilityIds[] and AuraIds[]
    TooltipIds: readonly number[];
};

type Tiers = Partial<Record<TierType, Tier>>;

type AbilityActionType =
    | "TActionCardHaste"
    | "TActionCardSlow"
    | "TActionCardReload"
    | "TActionCardFreeze"
    | "TActionCardCharge"
    | "TActionPlayerBurnApply"
    | "TActionPlayerPoisonApply"
    | "TActionPlayerShieldApply"
    | "TActionPlayerJoyApply"
    | "TActionPlayerHeal"
    | "TActionPlayerDamage"
    | "TActionCardModifyAttribute"
    | "TActionPlayerModifyAttribute"
    | "TActionGameSpawnCards";

// TODO: tighten up the expectations here - this basically doesn't make any sense / provide any value as written
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
    } | {
        $type: AbilityActionType,
        SpawnContext?: never;
        Value?: never;
    };

type AbilityActionValue =
    | { AttributeType: string; $type?: never; Value?: never }
    | { $type: "TFixedValue"; Value: number; AttributeType?: never }
    | {
        $type: "TReferenceValueCardAttribute";
        Target: { $type: "TTargetCardSelf" };
        AttributeType?: string;
    };

type AbilitySpawnContext = {
    Limit: {
        $type: "TFixedValue";
        Value: number;
    };
};

export type Ability = {
    Id: string;
    Action: AbilityAction;
};

export type Aura = {
    Id: string;
    Action: | {
        $type: "TAuraActionCardModifyAttribute";
        Value:
        | {
            $type: "TReferenceValueCardAttribute";
            AttributeType: string;
            Modifier?: {
                Value: number;
            };
        }
        | {
            $type: "TReferenceValueCardCount";
            Modifier: {
                Value: number;
            };
        }
        | {
            $type: "TFixedValue";
            Value: number;
        };
    } | {
        $type: "TAuraActionPlayerModifyAttribute";
        Value: {
            $type: "TReferenceValueCardAttribute";
            AttributeType: string;
        }
    }
};

type CardItemSize = "Small" | "Medium" | "Large";

export type CardItem = {
    $type: "TCardItem";
    Id: string;
    Tiers: Tiers;
    Localization: {
        Title: { Text: string };
        Tooltips: readonly {
            Content: { Key: string; Text: string };
        }[];
    };
    Abilities: {
        [key: string]: Ability;
    };
    Auras: {
        [key: string]: Aura;
    };
    StartingTier: TierType;
    Tags: readonly string[];
    HiddenTags: readonly string[];
    Size: CardItemSize;
    Heroes: readonly string[];
    SpawningEligibility: "Always" | "Never" | "GuidOnly";
}

export type CardsJson = { [key: string]: CardItem };

// TODO: Fix naming
export type ClientSideCardItem = {
    name: string;
    tiers: {
        // TODO: This should be TierType
        [key: string]: {
            attributes: {
                name: string;
                value: number;
                valueDescriptor: string | null;
            }[];
            tooltips: string[];
        }
    };
    tags: string[];
    hiddenTags: string[];
    size: CardItemSize;
    heroes: string[];
}
