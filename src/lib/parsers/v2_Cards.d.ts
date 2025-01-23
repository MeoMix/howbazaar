export interface V2CardsD {
    $type:                  V2CardsDType;
    IsReselectable?:        boolean;
    Type:                   Type;
    Attributes?:            V2CardsDAttributes | null;
    Id:                     string;
    Version:                Version;
    InternalName:           string;
    InternalDescription:    V2CardsDInternalDescription | null;
    StartingTier:           Tier;
    Size:                   Size;
    Heroes:                 Hero[];
    Tags:                   Tag[];
    HiddenTags:             HiddenTag[];
    ArtKey:                 string;
    CardPackId:             CardPackID;
    TranslationKey:         string;
    AudioKey:               null | string;
    Localization:           V2CardsDLocalization;
    Abilities:              { [key: string]: Ability };
    Auras:                  { [key: string]: Aura };
    Tiers?:                 Tiers;
    Enchantments?:          Enchantments | null;
    CombatantType?:         CombatantType;
    RewardCombatGold?:      number;
    RewardVictory?:         Reward;
    RewardDefeat?:          Reward;
    SelectionContext?:      SelectionContext | null;
    SelectionRequirements?: null;
    SelectionCriteria?:     SelectionCriteria;
}

export type V2CardsDType = "TCardEncounterStep" | "TCardItem" | "TCardEncounterCombat" | "TCardSkill" | "TCardEncounterEvent" | "TCardEncounterPedestal";

export interface Ability {
    Id:                  string;
    Trigger:             AbilityTrigger;
    ActiveIn:            ActiveIn;
    Action:              AbilityAction;
    Prerequisites:       AbilityPrerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: null | string;
    MigrationData:       string;
    VFXConfig:           VFXConfig | null;
    TranslationKey:      string;
}

export interface AbilityAction {
    $type:           PurpleType;
    AttributeType?:  AttributeType;
    Value?:          TentacledValue;
    Operation?:      Operation;
    Duration?:       Duration | null;
    Target?:         PurpleTarget | null;
    ReferenceValue?: null;
    UpgradeToTier?:  null;
    TargetPlayer?:   TargetPlayer;
    SpawnContext?:   PurpleSpawnContext;
    TargetCount?:    TargetCount | null;
    Enchantment?:    string;
    Source?:         Source;
    Tags?:           Tag[];
}

export type PurpleType = "TActionPlayerModifyAttribute" | "TActionPlayerHeal" | "TActionPlayerDamage" | "TActionCardSlow" | "TActionCardUpgrade" | "TActionPlayerShieldApply" | "TActionPlayerBurnApply" | "TActionGameSpawnCards" | "TActionCardModifyAttribute" | "TActionGameDealCards" | "TActionCardHaste" | "TActionCardFreeze" | "TActionCardEnchant" | "TActionPlayerPoisonApply" | "TActionCardForceUse" | "TActionCardReload" | "TActionCardCharge" | "TActionCardDisable" | "TActionPlayerJoyApply" | "TActionPlayerReviveHeal" | "TActionCardAddTagsBySource" | "TActionCardRemoveTagsList" | "TActionPlayerPoisonRemove" | "TActionCardBeginSandstorm" | "TActionCardRemoveTagsBySource" | "TActionCardAddTagsList" | "TActionPlayerShieldRemove" | "TActionPlayerBurnRemove" | "TActionCardDestroy" | "TAuraActionCardModifyAttribute";

export type AttributeType = "HealthMax" | "CritChance" | "Gold" | "BurnApplyAmount" | "DamageAmount" | "JoyApplyAmount" | "HealthRegen" | "CooldownMax" | "Experience" | "PoisonApplyAmount" | "Custom_1" | "ShieldApplyAmount" | "HealAmount" | "Prestige" | "Income" | "SellPrice" | "AmmoMax" | "Freeze" | "Shield" | "FreezeAmount" | "Multicast" | "Custom_0" | "BuyPrice" | "Lifesteal" | "Counter" | "Custom_4" | "Custom_5" | "Slow" | "HasteAmount" | "SlowAmount" | "Custom_3" | "Custom_2" | "Haste" | "Health" | "Ammo" | "Poison" | "Level" | "Burn" | "BurnRemoveAmount" | "RerollCostModifier" | "DamageCrit" | "PoisonRemoveAmount" | "ShieldRemoveAmount" | "ChargeAmount" | "ReloadAmount" | "FreezeTargets" | "Joy";

export interface Duration {
    $type:        DurationType;
    DurationType: DurationTypeEnum;
}

export type DurationType = "TDeterminantDuration";

export type DurationTypeEnum = "UntilEndOfCombat" | "UntilEndOfDay";

export type Operation = "Add" | "Multiply" | "Subtract";

export interface Source {
    $type:          SourceType;
    Origin?:        Origin;
    TargetMode?:    Origin;
    IncludeOrigin?: boolean;
    Conditions:     SourceConditions | null;
}

export type SourceType = "TTargetCardPositional" | "TTargetCardSelf" | "TTargetPlayerRelative" | "TTargetPlayerAbsolute" | "TTargetCardRandom" | "TTargetCardXMost" | "TTargetCardTriggerSource" | "TTargetCardSection" | "TTargetPlayer" | "TCardConditionalAnd" | "TCardConditionalOr";

export interface SourceConditions {
    $type:       ConditionType;
    Conditions?: PurpleCondition[];
    Tags?:       Tag[];
    Operator?:   Operator;
}

export type ConditionType = "TCardConditionalOr" | "TCardConditionalAttribute" | "TCardConditionalTag" | "TCardConditionalHiddenTag" | "TCardConditionalEnchantmentEligible" | "TCardConditionalAnd" | "TCardConditionalTier" | "TCardConditionalSize" | "TCardConditionalTriggerSource" | "TCardConditionalId" | "TCardConditionalAttributeHighest" | "TCardConditionalType" | "TCardConditionalHasEnchantment" | "TCardConditionalPlayerHero" | "TCardConditionalAttributeLowest" | "TPlayerConditionalAttribute";

export interface PurpleCondition {
    $type:               ConditionType;
    Conditions?:         Condition[];
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
}

export type Comparison = "LessThanOrEqual" | "Equal" | "GreaterThanOrEqual" | "GreaterThan" | "LessThan";

export interface TargetCount {
    $type: TargetCountType;
    Value: number;
}

export type TargetCountType = "TFixedValue" | "TReferenceValueCardAttribute" | "TReferenceValuePlayerAttribute" | "TReferenceValuePlayerAttributeChange" | "TReferenceValueCardCount" | "TReferenceValueCardAttributeAggregate" | "TRangeValue";

export interface FluffyCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    Conditions?:         Condition[];
    Enchantment?:        string;
}

export interface Condition {
    $type:        ConditionType;
    Tags?:        Tag[];
    Operator?:    Operator;
    Conditions?:  FluffyCondition[];
    Enchantment?: string;
}

export type Operator = "Any" | "None";

export type Tag = "Weapon" | "Shield" | "Heal" | "Joy" | "Burn" | "Poison" | "Merchant" | "Core" | "Property" | "Friend" | "Freeze" | "Aquatic" | "Vehicle" | "Tool" | "Potion" | "Food" | "Dragon" | "Tech" | "Ray" | "Dinosaur" | "Haste" | "Slow" | "Damage" | "Loot" | "Unsellable" | "Apparel" | "Toy";

export type Origin = "Self" | "LeftCard" | "RightCard" | "Neighbor" | "Player" | "Opponent" | "LeftMostCard" | "RightMostCard" | "Both" | "AllLeftCards" | "AllRightCards";

export interface PurpleSpawnContext {
    $type: SpawnContextType;
    Limit: Limit;
}

export type SpawnContextType = "TSpawnContextQuery";

export interface Limit {
    $type:          TargetCountType;
    Value?:         number;
    Target?:        LimitTarget;
    AttributeType?: AttributeType;
    DefaultValue?:  number;
    Modifier?:      LimitModifier | null;
}

export interface LimitModifier {
    ModifyMode: Operation;
    Value:      TargetCount;
}

export interface LimitTarget {
    $type:      SourceType;
    Conditions: FluffyCondition[] | PurpleConditions | null;
}

export interface PurpleConditions {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    Tiers?:              Tier[];
    IsNot?:              boolean;
}

export type Tier = "Silver" | "Gold" | "Diamond" | "Bronze" | "Legendary";

export interface PurpleTarget {
    $type:          SourceType;
    TargetMode?:    Origin;
    Conditions:     FluffyCondition[] | FluffyConditions | null;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
    Origin?:        PurpleOrigin;
    IncludeOrigin?: boolean;
}

export interface FluffyConditions {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    PurpleComparisonValue;
    Conditions?:         TentacledCondition[];
    Tags?:               Tag[];
    Operator?:           Operator;
    Enchantment?:        null | string;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Sizes?:              Size[];
    Id?:                 string;
    AttributeType?:      AttributeType;
    CardType?:           Type;
    IsSameAsPlayerHero?: boolean;
}

export type Type = "Item" | "EncounterStep" | "CombatEncounter" | "Skill" | "EventEncounter" | "PedestalEncounter";

export interface PurpleComparisonValue {
    $type:          TargetCountType;
    Value?:         number;
    Target?:        FluffyTarget;
    AttributeType?: AttributeType;
    DefaultValue?:  number;
    Modifier?:      PurpleModifier | null;
}

export interface PurpleModifier {
    ModifyMode: Operation;
    Value:      Limit;
}

export interface FluffyTarget {
    $type:          SourceType;
    Conditions:     FluffyCondition[] | TentacledConditions | null;
    TargetMode?:    Origin;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
}

export interface TentacledConditions {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    FluffyComparisonValue;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    AttributeType?:      AttributeType;
    Conditions?:         Condition[];
}

export interface FluffyComparisonValue {
    $type:          TargetCountType;
    Value?:         number;
    Target?:        TentacledTarget;
    AttributeType?: AttributeType;
    DefaultValue?:  number;
    Modifier?:      LimitModifier;
}

export interface PurpleValue {
    $type:          TargetCountType;
    Value?:         number;
    Target?:        TentacledTarget;
    AttributeType?: AttributeType;
    DefaultValue?:  number;
    Modifier?:      LimitModifier;
}

export interface StickyConditions {
    $type:              ConditionType;
    Attribute:          AttributeType;
    ComparisonOperator: Comparison;
    ComparisonValue:    PurpleValue;
}

export interface TentacledTarget {
    $type:       SourceType;
    TargetMode?: Origin;
    Conditions:  StickyConditions | null;
}

export type Size = "Small" | "Medium" | "Large";

export type TargetSection = "SelfBoard" | "SelfHand" | "SelfHandAndStash" | "AllHands" | "OpponentHand" | "AbsolutePlayerHand" | "AbsolutePlayerHandAndStash" | "SelfNeighbors" | "OpponentBoard";

export interface TentacledCondition {
    $type:               ConditionType;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    Conditions?:         StickyCondition[];
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    Enchantment?:        string;
    Id?:                 string;
    AttributeType?:      AttributeType;
    IsSameAsPlayerHero?: boolean;
    CardType?:           Type;
}

export interface StickyCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Enchantment?:        string;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    Conditions?:         FluffyCondition[];
}

export type PurpleOrigin = "Self" | "TriggerSource";

export interface TargetPlayer {
    $type:          SourceType;
    TargetMode?:    Origin;
    Conditions:     IndigoConditions | null;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
}

export interface IndigoConditions {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Tiers?:              Tier[];
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    FluffyValue;
    AttributeType?:      AttributeType;
    Conditions?:         IndigoCondition[];
    CardType?:           Type;
}

export interface FluffyValue {
    $type:          TargetCountType;
    Value?:         number;
    Target?:        TentacledTarget;
    AttributeType?: AttributeType;
    DefaultValue?:  number;
    Modifier?:      LimitModifier | null;
}

export interface IndigoCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    CardType?:           Type;
    IsNot?:              boolean;
    Enchantment?:        string;
    Conditions?:         FluffyCondition[];
}

export interface TentacledValue {
    $type:          TargetCountType;
    Target?:        StickyTarget;
    AttributeType?: AttributeType;
    DefaultValue?:  number;
    Modifier?:      PurpleModifier | null;
    Value?:         number;
    MinValue?:      number;
    MaxValue?:      number;
}

export interface StickyTarget {
    $type:          SourceType;
    TargetMode?:    Origin;
    Conditions:     FluffyCondition[] | IndigoConditions | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export type ActiveIn = "HandOnly" | "HandAndStash";

export interface AbilityPrerequisite {
    $type:       PrerequisiteType;
    Subject?:    PurpleSubject;
    Comparison?: Comparison;
    Amount?:     number;
    Conditions?: PrerequisiteConditions;
}

export type PrerequisiteType = "TPrerequisiteCardCount" | "TPrerequisitePlayer" | "TPrerequisiteRun";

export interface PrerequisiteConditions {
    $type:              FluffyType;
    CurrentDay:         number;
    ComparisonOperator: Comparison;
}

export type FluffyType = "TRunConditionalCurrentDay";

export interface PurpleSubject {
    $type:          SourceType;
    Conditions:     FluffyCondition[] | IndecentConditions | null;
    TargetMode?:    Origin;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
}

export interface IndecentConditions {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TentacledComparisonValue;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         IndecentCondition[];
    CardType?:           Type;
    AttributeType?:      AttributeType;
    Tiers?:              Tier[];
}

export interface TentacledComparisonValue {
    $type:          TargetCountType;
    Value?:         number;
    Target?:        TargetPlayerClass;
    AttributeType?: AttributeType;
    DefaultValue?:  number;
    Modifier?:      PurpleModifier | null;
}

export interface TargetPlayerClass {
    $type:          SourceType;
    TargetMode?:    Origin;
    Conditions:     HilariousConditions | null;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
}

export interface HilariousConditions {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Tiers?:              Tier[];
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    PurpleValue;
    AttributeType?:      AttributeType;
    Conditions?:         Condition[];
}

export interface IndecentCondition {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    Tags?:               Tag[];
    Operator?:           Operator;
    Enchantment?:        string;
    Sizes?:              Size[];
    IsNot?:              boolean;
    CardType?:           Type;
}

export type Priority = "Medium" | "Low" | "High" | "Lowest" | "Highest" | "Immediate";

export interface AbilityTrigger {
    $type:             TriggerType;
    Subject?:          FluffySubject;
    CombatType?:       null | string;
    AttributeType?:    AttributeType;
    ChangeType?:       ChangeType;
    CombatOutcome?:    CombatOutcome | null;
    AttributeChanged?: AttributeType;
    Conditions?:       Condition;
}

export type TriggerType = "TTriggerOnCardSelected" | "TTriggerOnCardFired" | "TTriggerOnCardCritted" | "TTriggerOnCardPerformedHaste" | "TTriggerOnItemUsed" | "TTriggerOnCardPerformedBurn" | "TTriggerOnCardSold" | "TTriggerOnFightStarted" | "TTriggerOnCardPurchased" | "TTriggerOnPlayerAttributeChanged" | "TTriggerOnCardPerformedSlow" | "TTriggerOnPlayerDied" | "TTriggerOnHourStarted" | "TTriggerOnCardPerformedShield" | "TTriggerOnCardPerformedPoison" | "TTriggerOnDayStarted" | "TTriggerOnCardPerformedHeal" | "TTriggerOnFightEnded" | "TTriggerOnCardPerformedDestruction" | "TTriggerOnCardPerformedFreeze" | "TTriggerOnCardAttributeChanged" | "TTriggerOnEncounterSelected" | "TTriggerOnCardUpgraded" | "TTriggerOnCardPerformedDamage" | "TTriggerOnPlayerAttributePercentChange";

export type ChangeType = "Loss" | "Gain";

export type CombatOutcome = "Win" | "Lose";

export interface FluffySubject {
    $type:          SourceType;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Conditions:     AmbitiousConditions | null;
    TargetMode?:    Origin;
    Origin?:        PurpleOrigin;
    IncludeOrigin?: boolean;
}

export interface AmbitiousConditions {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Conditions?:         HilariousCondition[];
    CardType?:           Type;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TentacledComparisonValue;
    AttributeType?:      AttributeType;
    Enchantment?:        null | string;
    Id?:                 string;
    Tiers?:              Tier[];
    IsSameAsPlayerHero?: boolean;
}

export interface HilariousCondition {
    $type:               ConditionType;
    CardType?:           Type;
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    AttributeType?:      AttributeType;
    Enchantment?:        string;
    Tiers?:              Tier[];
    Conditions?:         AmbitiousCondition[];
    IsSameAsPlayerHero?: boolean;
    Id?:                 string;
}

export interface AmbitiousCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    AttributeType?:      AttributeType;
    Conditions?:         CunningCondition[];
    Enchantment?:        string;
}

export interface CunningCondition {
    $type:               ConditionType;
    Enchantment?:        string;
    IsNot?:              boolean;
    Sizes?:              Size[];
    Tiers?:              Tier[];
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    Conditions?:         MagentaCondition[];
}

export interface MagentaCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         MagentaCondition[];
    Enchantment?:        string;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
}

export interface VFXConfig {
    VFXOverrideKey: null | string;
    VFXShouldPlay:  boolean;
    VFXIsTakeover:  boolean;
}

export interface V2CardsDAttributes {
    BuyPrice?:  number;
    SellPrice?: number;
}

export interface Aura {
    Id:                  string;
    ActiveIn:            ActiveIn;
    Action:              AuraAction;
    Prerequisites:       AuraPrerequisite[] | null;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig | null;
    TranslationKey:      string;
}

export interface AuraAction {
    $type:         TentacledType;
    AttributeType: AttributeType;
    Operation:     Operation;
    Value:         StickyValue;
    Target:        IndigoTarget;
}

export type TentacledType = "TAuraActionCardModifyAttribute" | "TAuraActionPlayerModifyAttribute";

export interface IndigoTarget {
    $type:          SourceType;
    Conditions:     FluffyCondition[] | CunningConditions | null;
    TargetMode?:    Origin;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Origin?:        PurpleOrigin;
    IncludeOrigin?: boolean;
}

export interface CunningConditions {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         FriskyCondition[];
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    Enchantment?:        null | string;
    Sizes?:              Size[];
    IsNot?:              boolean;
    CardType?:           Type;
    AttributeType?:      AttributeType;
    Id?:                 string;
    Tiers?:              Tier[];
    IsSameAsPlayerHero?: boolean;
}

export interface FriskyCondition {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    Tags?:               Tag[];
    Operator?:           Operator;
    AttributeType?:      AttributeType;
    Conditions?:         CunningCondition[];
    Enchantment?:        string;
    CardType?:           Type;
    IsNot?:              boolean;
    Sizes?:              Size[];
    Tiers?:              Tier[];
    IsSameAsPlayerHero?: boolean;
    Id?:                 string;
}

export interface StickyValue {
    $type:          TargetCountType;
    Target?:        IndecentTarget;
    DefaultValue?:  number;
    Modifier?:      PurpleModifier | null;
    AttributeType?: AttributeType;
    Value?:         number;
}

export interface IndecentTarget {
    $type:          SourceType;
    TargetMode?:    Origin;
    Conditions:     FluffyCondition[] | MagentaConditions | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Origin?:        Origin;
    IncludeOrigin?: boolean;
}

export interface MagentaConditions {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    FluffyComparisonValue;
    Conditions?:         MischievousCondition[];
    Tags?:               Tag[];
    Operator?:           Operator;
    Enchantment?:        string;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Sizes?:              Size[];
    Id?:                 string;
    AttributeType?:      AttributeType;
    CardType?:           Type;
    IsSameAsPlayerHero?: boolean;
}

export interface MischievousCondition {
    $type:               ConditionType;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    Conditions?:         BraggadociousCondition[];
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    Enchantment?:        string;
    CardType?:           Type;
    AttributeType?:      AttributeType;
    Id?:                 string;
}

export interface BraggadociousCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    Id?:                 string;
    IsNot?:              boolean;
    Conditions?:         MagentaCondition[];
    Enchantment?:        string;
}

export interface AuraPrerequisite {
    $type:       PrerequisiteType;
    Subject:     TentacledSubject;
    Comparison?: Comparison;
    Amount?:     number;
}

export interface TentacledSubject {
    $type:          SourceType;
    Conditions:     FriskyConditions | null;
    TargetMode?:    Origin;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Origin?:        Origin;
    IncludeOrigin?: boolean;
}

export interface FriskyConditions {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TentacledComparisonValue;
    Tags?:               Tag[];
    Operator?:           Operator;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Sizes?:              Size[];
    Conditions?:         Condition1[];
    Enchantment?:        string;
    Id?:                 string;
    AttributeType?:      AttributeType;
    CardType?:           Type;
    IsSameAsPlayerHero?: boolean;
}

export interface Condition1 {
    $type:               ConditionType;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    Conditions?:         FluffyCondition[];
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    Enchantment?:        string;
    CardType?:           Type;
    AttributeType?:      AttributeType;
    Id?:                 string;
}

export type CardPackID = "Pygmalien_Core" | "Core" | "Vanessa_Core" | "Stelle_Core" | "Dooley_Core" | "Pyg_Frozen_Assets" | "Jules_Core" | "Mak_Core" | "Vanessa_Mysteries_of_the_Deep" | "Vanessa";

export interface CombatantType {
    $type: CombatantTypeType;
    Level: number;
}

export type CombatantTypeType = "TCombatantMonster";

export interface Enchantments {
    Golden?:      Golden;
    Heavy?:       Heavy;
    Icy?:         Icy;
    Turbo?:       Turbo;
    Shielded?:    Shielded;
    Restorative?: Restorative;
    Toxic?:       Toxic;
    Fiery?:       Fiery;
    Shiny?:       Shiny;
    Deadly?:      Deadly;
    Radiant?:     Radiant;
    Obsidian?:    Obsidian;
}

export interface Deadly {
    Attributes:   Attributes;
    Abilities:    DeadlyAbilities;
    Auras:        DeadlyAuras;
    Tags:         any[];
    HiddenTags:   HiddenTag[];
    Localization: DeadlyLocalization;
    HasAbilities: boolean;
    HasAuras:     boolean;
}

export interface DeadlyAbilities {
    e1?: PurpleE1;
    e2?: PurpleE2;
}

export interface PurpleE1 {
    Id:                  E1ID;
    Trigger:             PurpleTrigger;
    ActiveIn:            ActiveIn;
    Action:              PurpleAction;
    Prerequisites:       PurplePrerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface PurpleAction {
    $type:          PurpleType;
    Value?:         Limit;
    AttributeType?: AttributeType;
    Operation?:     Operation;
    Duration?:      Duration | null;
    TargetCount?:   TargetCount | null;
    Target:         HilariousTarget;
    Enchantment?:   PurpleInternalDescription;
}

export type PurpleInternalDescription = "Deadly 50" | "Deadly 2" | "Deadly" | "Deadly 25" | "" | "Deadly 2x" | "Deadly 1" | "Deadly 10" | "Deadly None";

export interface HilariousTarget {
    $type:          SourceType;
    TargetMode?:    Origin;
    Conditions:     MischievousConditions | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Origin?:        Origin;
    IncludeOrigin?: boolean;
}

export interface MischievousConditions {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    Conditions?:         Condition2[];
    Tags?:               Tag[];
    Operator?:           Operator;
    Enchantment?:        string;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Sizes?:              Size[];
    Id?:                 string;
    AttributeType?:      AttributeType;
    CardType?:           Type;
    IsSameAsPlayerHero?: boolean;
}

export interface Condition2 {
    $type:               ConditionType;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    Conditions?:         Condition3[];
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    Enchantment?:        string;
    CardType?:           Type;
    AttributeType?:      AttributeType;
    Id?:                 string;
}

export interface Condition3 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
}

export type E1ID = "e1" | "e3";

export interface PurplePrerequisite {
    $type:       PrerequisiteType;
    Subject?:    TentacledTarget;
    Conditions?: PrerequisiteConditions;
    Comparison?: Comparison;
    Amount?:     number;
}

export interface PurpleTrigger {
    $type:             TriggerType;
    Subject?:          HilariousTarget;
    AttributeType?:    AttributeType;
    ChangeType?:       ChangeType;
    AttributeChanged?: AttributeType;
}

export interface PurpleE2 {
    Id:                  E2ID;
    Trigger:             FluffyTrigger;
    ActiveIn:            ActiveIn;
    Action:              FluffyAction;
    Prerequisites:       null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface FluffyAction {
    $type:         PurpleType;
    Value:         TargetCount;
    AttributeType: AttributeType;
    Operation:     Operation;
    Duration:      Duration;
    TargetCount:   null;
    Target:        Source;
}

export type E2ID = "e2" | "e3" | "e4" | "e5" | "e6";

export interface FluffyTrigger {
    $type:             TriggerType;
    Subject:           Source;
    AttributeChanged?: AttributeType;
    ChangeType?:       ChangeType;
}

export interface Attributes {
}

export interface DeadlyAuras {
    e1?: FluffyE1;
    e?:  E;
}

export interface E {
    Id:                  E1ID;
    ActiveIn:            ActiveIn;
    Action:              EAction;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface EAction {
    $type:         PurpleType;
    AttributeType: AttributeType;
    Operation:     Operation;
    Value:         TargetCount;
    Target:        AmbitiousTarget;
}

export interface AmbitiousTarget {
    $type:          SourceType;
    Conditions:     BraggadociousConditions | null;
    TargetMode?:    Origin;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
}

export interface BraggadociousConditions {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    StickyComparisonValue;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         Condition4[];
    CardType?:           Type;
    AttributeType?:      AttributeType;
}

export interface StickyComparisonValue {
    $type:          TargetCountType;
    Value?:         number;
    Target?:        TargetPlayerClass;
    AttributeType?: AttributeType;
    DefaultValue?:  number;
    Modifier?:      PurpleModifier | null;
}

export interface Condition4 {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    Tags?:               Tag[];
    Operator?:           Operator;
    Enchantment?:        string;
    Sizes?:              Size[];
    IsNot?:              boolean;
}

export interface FluffyE1 {
    Id:                  E1ID;
    ActiveIn:            ActiveIn;
    Action:              TentacledAction;
    Prerequisites:       FluffyPrerequisite[] | null;
    InternalName:        string;
    InternalDescription: PurpleInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface TentacledAction {
    $type:         PurpleType;
    AttributeType: AttributeType;
    Operation:     Operation;
    Value:         IndigoValue;
    Target:        HilariousTarget;
}

export interface IndigoValue {
    $type:          TargetCountType;
    Value?:         number;
    Target?:        AmbitiousTarget;
    DefaultValue?:  number;
    Modifier?:      LimitModifier;
    AttributeType?: AttributeType;
}

export interface FluffyPrerequisite {
    $type:      PrerequisiteType;
    Subject:    Source;
    Comparison: Comparison;
    Amount:     number;
}

export type HiddenTag = "Crit" | "Damage" | "Cooldown" | "Heal" | "Value" | "EconomyReference" | "BurnReference" | "Slow" | "Active" | "Shield" | "Burn" | "DamageReference" | "CritReference" | "Gold" | "Passive" | "NonWeapon" | "Multicast" | "Haste" | "HealReference" | "ShieldReference" | "HasteReference" | "Freeze" | "Poison" | "Ammo" | "Charge" | "JoyReference" | "Regen" | "PoisonReference" | "Health" | "Joy" | "Income" | "HealthReference" | "FreezeReference" | "SlowReference" | "AmmoReference" | "Toughness" | "Lifesteal" | "Experience" | "RegenReference";

export interface DeadlyLocalization {
    Tooltips: Tooltip[];
}

export interface Tooltip {
    Content:       Title;
    TooltipType:   HiddenTag;
    Prerequisites: null;
}

export interface Title {
    Key:  string;
    Text: null | string;
}

export interface Fiery {
    Attributes:   FieryAttributes;
    Abilities:    FieryAbilities;
    Auras:        FieryAuras;
    Tags:         any[];
    HiddenTags:   HiddenTag[];
    Localization: DeadlyLocalization;
    HasAbilities: boolean;
    HasAuras:     boolean;
}

export interface FieryAbilities {
    e1?: TentacledE1;
    e2?: FluffyE2;
    E1?: E1;
}

export interface E1 {
    Id:                  string;
    Trigger:             E1Trigger;
    ActiveIn:            ActiveIn;
    Action:              E1Action;
    Prerequisites:       null;
    Priority:            Size;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface E1Action {
    $type:          PurpleType;
    ReferenceValue: null;
    Target:         TentacledTarget;
}

export interface E1Trigger {
    $type: TriggerType;
}

export interface TentacledE1 {
    Id:                  E1ID;
    Trigger:             TentacledTrigger;
    ActiveIn:            ActiveIn;
    Action:              StickyAction;
    Prerequisites:       PurplePrerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface StickyAction {
    $type:           PurpleType;
    ReferenceValue?: null;
    Target:          CunningTarget;
    Value?:          IndecentValue;
    AttributeType?:  AttributeType;
    Operation?:      Operation;
    Duration?:       Duration | null;
    TargetCount?:    null;
    Enchantment?:    Enchantment;
}

export type Enchantment = "Fiery" | "Restorative" | "Shielded" | "Toxic";

export interface CunningTarget {
    $type:          SourceType;
    Conditions:     Condition | null;
    TargetMode?:    Origin;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Origin?:        Origin;
    IncludeOrigin?: boolean;
}

export interface IndecentValue {
    $type:          TargetCountType;
    Value?:         number;
    Target?:        MagentaTarget;
    AttributeType?: AttributeType;
    DefaultValue?:  number;
    Modifier?:      LimitModifier | null;
}

export interface MagentaTarget {
    $type:          SourceType;
    Conditions:     Conditions1 | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export interface Conditions1 {
    $type:         ConditionType;
    AttributeType: AttributeType;
}

export interface TentacledTrigger {
    $type:             TriggerType;
    CombatType?:       null;
    Subject?:          StickySubject;
    AttributeType?:    AttributeType;
    ChangeType?:       ChangeType;
    AttributeChanged?: AttributeType;
}

export interface StickySubject {
    $type:          SourceType;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Conditions:     Conditions2 | null;
    TargetMode?:    Origin;
    Origin?:        Origin;
    IncludeOrigin?: boolean;
}

export interface Conditions2 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    IsSameAsPlayerHero?: boolean;
    Sizes?:              Size[];
    IsNot?:              boolean;
}

export interface FluffyE2 {
    Id:                  string;
    Trigger:             StickyTrigger;
    ActiveIn:            ActiveIn;
    Action:              IndigoAction;
    Prerequisites:       TentacledPrerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface IndigoAction {
    $type:           PurpleType;
    Value?:          Limit;
    AttributeType?:  AttributeType;
    Operation?:      Operation;
    Duration?:       Duration;
    TargetCount?:    null;
    Target:          TargetPlayerClass;
    ReferenceValue?: null;
}

export interface TentacledPrerequisite {
    $type:   PrerequisiteType;
    Subject: TargetPlayerClass;
}

export interface StickyTrigger {
    $type:             TriggerType;
    Subject?:          AmbitiousTarget;
    AttributeChanged?: AttributeType;
    ChangeType?:       ChangeType;
}

export interface FieryAttributes {
    BurnApplyAmount?: number;
    Custom_0?:        number;
    Custom_1?:        number;
}

export interface FieryAuras {
    e1?: StickyE1;
    e2?: TentacledE2;
    E2?: E2Class;
}

export interface E2Class {
    Id:                  string;
    ActiveIn:            ActiveIn;
    Action:              E2Action;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface E2Action {
    $type:         PurpleType;
    AttributeType: AttributeType;
    Operation:     Operation;
    Value:         Limit;
    Target:        AmbitiousTarget;
}

export interface StickyE1 {
    Id:                  E1ID;
    ActiveIn:            ActiveIn;
    Action:              IndecentAction;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface IndecentAction {
    $type:         TentacledType;
    AttributeType: AttributeType;
    Operation:     Operation;
    Value:         HilariousValue;
    Target:        CunningTarget;
}

export interface HilariousValue {
    $type:          TargetCountType;
    Value?:         number;
    Target?:        FriskyTarget;
    DefaultValue?:  number;
    Modifier?:      LimitModifier;
    AttributeType?: AttributeType;
}

export interface FriskyTarget {
    $type:          SourceType;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Conditions:     Conditions3 | null;
}

export interface Conditions3 {
    $type:          ConditionType;
    CardType?:      Type;
    IsNot?:         boolean;
    Sizes?:         Size[];
    AttributeType?: AttributeType;
    Conditions?:    Condition5[];
}

export interface Condition5 {
    $type:          ConditionType;
    CardType?:      Type;
    IsNot?:         boolean;
    Tags?:          Tag[];
    Operator?:      Operator;
    AttributeType?: AttributeType;
    Sizes?:         Size[];
    Conditions?:    Condition6[];
    Tiers?:         Tier[];
}

export interface Condition6 {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    Tags?:               Tag[];
    Operator?:           Operator;
    AttributeType?:      AttributeType;
    Conditions?:         Condition7[];
}

export interface Condition7 {
    $type:               ConditionType;
    Enchantment?:        string;
    IsNot?:              boolean;
    Sizes?:              Size[];
    Tiers?:              Tier[];
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    Conditions?:         Condition[];
}

export interface TentacledE2 {
    Id:                  E2ID;
    ActiveIn:            ActiveIn;
    Action:              HilariousAction;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface HilariousAction {
    $type:         PurpleType;
    AttributeType: AttributeType;
    Operation:     Operation;
    Value:         AmbitiousValue;
    Target:        LimitTarget;
}

export interface AmbitiousValue {
    $type:          TargetCountType;
    Target?:        CunningTarget;
    AttributeType?: AttributeType;
    DefaultValue?:  number;
    Modifier?:      LimitModifier | null;
    Value?:         number;
}

export interface Golden {
    Attributes:   GoldenAttributes;
    Abilities:    GoldenAbilities;
    Auras:        GoldenAuras;
    Tags:         any[];
    HiddenTags:   HiddenTag[];
    Localization: DeadlyLocalization;
    HasAbilities: boolean;
    HasAuras:     boolean;
}

export interface GoldenAbilities {
    e1?: IndigoE1;
    e2?: StickyE2;
}

export interface IndigoE1 {
    Id:                  E1ID;
    Trigger:             IndigoTrigger;
    ActiveIn:            ActiveIn;
    Action:              AmbitiousAction;
    Prerequisites:       null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: FluffyInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface AmbitiousAction {
    $type:          PurpleType;
    Value?:         FluffyValue;
    AttributeType?: AttributeType;
    Operation?:     Operation;
    Duration?:      null;
    TargetCount?:   null;
    Target?:        TargetPlayerClass;
    TargetPlayer?:  TargetPlayerClass;
    SpawnContext?:  FluffySpawnContext;
}

export interface FluffySpawnContext {
    $type: SpawnContextType;
    Limit: TargetCount;
}

export type FluffyInternalDescription = "Golden 1" | "" | "Golden 100" | "Shiny 1" | "Golden 0" | "When you buy a Property, this item gains [1/2/3/4] value." | "Shiny";

export interface IndigoTrigger {
    $type:          TriggerType;
    Subject:        Subject;
    AttributeType?: AttributeType;
    ChangeType?:    ChangeType;
}

export interface Subject {
    $type:          SourceType;
    TargetMode?:    Origin;
    Conditions:     Conditions4 | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export interface Conditions4 {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    FluffyValue;
    Tags?:               Tag[];
    Operator?:           Operator;
    AttributeType?:      AttributeType;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Conditions?:         Condition8[];
    Tiers?:              Tier[];
    CardType?:           Type;
}

export interface Condition8 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    CardType?:           Type;
    IsNot?:              boolean;
    Enchantment?:        FluffyInternalDescription;
}

export interface StickyE2 {
    Id:                  E2ID;
    Trigger:             IndecentTrigger;
    ActiveIn:            ActiveIn;
    Action:              CunningAction;
    Prerequisites:       null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface CunningAction {
    $type:        PurpleType;
    TargetPlayer: Subject;
    SpawnContext: FluffySpawnContext;
}

export interface IndecentTrigger {
    $type:   TriggerType;
    Subject: LimitTarget;
}

export interface GoldenAttributes {
    Custom_0?: number;
}

export interface GoldenAuras {
    e1?: IndecentE1;
    e3?: E1Class;
}

export interface IndecentE1 {
    Id:                  E1ID;
    ActiveIn:            ActiveIn;
    Action:              MagentaAction;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: FluffyInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface MagentaAction {
    $type:         TentacledType;
    AttributeType: AttributeType;
    Operation:     Operation;
    Value:         PurpleValue;
    Target:        MischievousTarget;
}

export interface MischievousTarget {
    $type:          SourceType;
    Conditions:     Conditions5 | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Origin?:        Origin;
    TargetMode?:    Origin;
    IncludeOrigin?: boolean;
}

export interface Conditions5 {
    $type:       ConditionType;
    Sizes?:      Size[];
    IsNot?:      boolean;
    Tags?:       Tag[];
    Operator?:   Operator;
    Conditions?: Condition9[];
}

export interface Condition9 {
    $type: ConditionType;
    Id:    string;
    IsNot: boolean;
}

export interface E1Class {
    Id:                  E1ID;
    ActiveIn:            ActiveIn;
    Action:              FriskyAction;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface FriskyAction {
    $type:         PurpleType;
    AttributeType: AttributeType;
    Operation:     Operation;
    Value:         TargetCount;
    Target:        LimitTarget;
}

export interface Heavy {
    Attributes:   HeavyAttributes;
    Abilities:    HeavyAbilities;
    Auras:        HeavyAuras;
    Tags:         any[];
    HiddenTags:   AttributeType[];
    Localization: DeadlyLocalization;
    HasAbilities: boolean;
    HasAuras:     boolean;
}

export interface HeavyAbilities {
    e1?: HilariousE1;
    e2?: IndigoE2;
}

export interface HilariousE1 {
    Id:                  E1ID;
    Trigger:             HilariousTrigger;
    ActiveIn:            ActiveIn;
    Action:              MischievousAction;
    Prerequisites:       E3Prerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: TentacledInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface MischievousAction {
    $type:        PurpleType;
    Target:       AmbitiousTarget;
    Enchantment?: string;
}

export type TentacledInternalDescription = "" | "Heavy" | "Heavy 3";

export interface E3Prerequisite {
    $type:      PrerequisiteType;
    Subject:    LimitTarget;
    Comparison: Comparison;
    Amount:     number;
}

export interface HilariousTrigger {
    $type:       TriggerType;
    CombatType?: null;
    Subject?:    IndigoSubject;
}

export interface IndigoSubject {
    $type:          SourceType;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Conditions:     Conditions6 | null;
    Origin?:        Origin;
    TargetMode?:    Origin;
    IncludeOrigin?: boolean;
}

export interface Conditions6 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    IsSameAsPlayerHero?: boolean;
}

export interface IndigoE2 {
    Id:                  E2ID;
    Trigger:             E1Trigger;
    ActiveIn:            ActiveIn;
    Action:              BraggadociousAction;
    Prerequisites:       null;
    Priority:            Size;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface BraggadociousAction {
    $type:  PurpleType;
    Target: MagentaTarget;
}

export interface HeavyAttributes {
    SlowTargets?: number;
    SlowAmount?:  number;
}

export interface HeavyAuras {
    e1?: E1Class;
}

export interface Icy {
    Attributes:   IcyAttributes;
    Abilities:    IcyAbilities;
    Auras:        HeavyAuras;
    Tags:         any[];
    HiddenTags:   AttributeType[];
    Localization: DeadlyLocalization;
    HasAbilities: boolean;
    HasAuras:     boolean;
}

export interface IcyAbilities {
    e1?: AmbitiousE1;
}

export interface AmbitiousE1 {
    Id:                  E1ID;
    Trigger:             TentacledTrigger;
    ActiveIn:            ActiveIn;
    Action:              Action1;
    Prerequisites:       PurplePrerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: StickyInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface Action1 {
    $type:          PurpleType;
    Target:         AmbitiousTarget;
    Enchantment?:   StickyInternalDescription;
    AttributeType?: AttributeType;
    Operation?:     Operation;
    Value?:         TargetCount;
}

export type StickyInternalDescription = "" | "Icy" | "Icy 1" | "Icy 2";

export interface IcyAttributes {
    FreezeTargets?: number;
    FreezeAmount?:  number;
}

export interface Obsidian {
    Attributes:   PurpleAttributes;
    Abilities:    ObsidianAbilities;
    Auras:        Attributes;
    Tags:         any[];
    HiddenTags:   AttributeType[];
    Localization: DeadlyLocalization;
    HasAbilities: boolean;
    HasAuras:     boolean;
}

export interface ObsidianAbilities {
    e1?: CunningE1;
}

export interface CunningE1 {
    Id:                  E1ID;
    Trigger:             E4Trigger;
    ActiveIn:            ActiveIn;
    Action:              MischievousAction;
    Prerequisites:       E3Prerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface E4Trigger {
    $type:    TriggerType;
    Subject?: Subject;
}

export interface PurpleAttributes {
    Lifesteal?: number;
}

export interface Radiant {
    Attributes:   Attributes;
    Abilities:    RadiantAbilities;
    Auras:        Attributes;
    Tags:         any[];
    HiddenTags:   any[];
    Localization: DeadlyLocalization;
    HasAbilities: boolean;
    HasAuras:     boolean;
}

export interface RadiantAbilities {
    e1?: MagentaE1;
    e2?: IndecentE2;
}

export interface MagentaE1 {
    Id:                  E1ID;
    Trigger:             AmbitiousTrigger;
    ActiveIn:            ActiveIn;
    Action:              Action2;
    Prerequisites:       E3Prerequisite[] | null;
    Priority:            Priority;
    InternalName:        E1InternalName;
    InternalDescription: IndigoInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface Action2 {
    $type:          PurpleType;
    Value?:         TargetCount;
    AttributeType?: AttributeType;
    Operation?:     Operation;
    Duration?:      null;
    TargetCount?:   null;
    Target:         TargetPlayerClass;
    Enchantment?:   IndigoInternalDescription;
}

export type IndigoInternalDescription = "When this item gains Freeze, remove Freeze from it." | "Radiant" | "";

export type E1InternalName = "Radiant " | "Radiant Scrap Metal Ability" | "Radiant" | "Radiant Hammer Ability" | "Radiant Wrench Ability" | "Radiant Upgrade Hammer Ability";

export interface AmbitiousTrigger {
    $type:             TriggerType;
    Subject?:          TargetPlayerClass;
    AttributeChanged?: AttributeType;
    ChangeType?:       ChangeType;
}

export interface IndecentE2 {
    Id:                  E2ID;
    Trigger:             CunningTrigger;
    ActiveIn:            ActiveIn;
    Action:              Action3;
    Prerequisites:       null;
    Priority:            Priority;
    InternalName:        E2InternalName;
    InternalDescription: IndecentInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      E2TranslationKey;
}

export interface Action3 {
    $type:         PurpleType;
    Value:         TargetCount;
    AttributeType: AttributeType;
    Operation:     Operation;
    Duration:      Duration | null;
    TargetCount:   null;
    Target:        LimitTarget;
}

export type IndecentInternalDescription = "When this item gains Slow, remove Slow from it.";

export type E2InternalName = "Radiant Slow";

export type E2TranslationKey = "db02baf95ec3866b3bcf0761025fd005";

export interface CunningTrigger {
    $type:            TriggerType;
    Subject:          LimitTarget;
    AttributeChanged: AttributeType;
    ChangeType:       ChangeType;
}

export interface Restorative {
    Attributes:   RestorativeAttributes;
    Abilities:    RestorativeAbilities;
    Auras:        RestorativeAuras;
    Tags:         any[];
    HiddenTags:   HiddenTag[];
    Localization: DeadlyLocalization;
    HasAbilities: boolean;
    HasAuras:     boolean;
}

export interface RestorativeAbilities {
    e1?: FriskyE1;
    e3?: PurpleE3;
    e2?: HilariousE2;
    e4?: E4;
}

export interface FriskyE1 {
    Id:                  E1ID;
    Trigger:             MagentaTrigger;
    ActiveIn:            ActiveIn;
    Action:              StickyAction | null;
    Prerequisites:       PurplePrerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: HilariousInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export type HilariousInternalDescription = "" | "Shielded 1" | "Restorative" | "Restorative 1";

export interface MagentaTrigger {
    $type:             TriggerType;
    Subject?:          IndigoSubject;
    AttributeChanged?: AttributeType;
    ChangeType?:       ChangeType;
    CombatType?:       null;
    AttributeType?:    AttributeType;
}

export interface HilariousE2 {
    Id:                  string;
    Trigger:             FriskyTrigger;
    ActiveIn:            ActiveIn;
    Action:              Action4;
    Prerequisites:       TentacledPrerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface Action4 {
    $type:           PurpleType;
    ReferenceValue?: null;
    Target:          BraggadociousTarget;
    Value?:          Limit;
    AttributeType?:  AttributeType;
    Operation?:      Operation;
    Duration?:       Duration | null;
    TargetCount?:    null;
}

export interface BraggadociousTarget {
    $type:          SourceType;
    TargetMode?:    Origin;
    Conditions:     Condition | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export interface FriskyTrigger {
    $type:             TriggerType;
    Subject?:          TargetPlayerClass;
    AttributeType?:    AttributeType;
    ChangeType?:       ChangeType;
    AttributeChanged?: AttributeType;
}

export interface PurpleE3 {
    Id:                  E1ID;
    Trigger:             MischievousTrigger;
    ActiveIn:            ActiveIn;
    Action:              Action5;
    Prerequisites:       null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface Action5 {
    $type:         PurpleType;
    Value:         TargetCount;
    AttributeType: AttributeType;
    Operation:     Operation;
    Duration:      Duration | null;
    TargetCount?:  null;
    Target:        AmbitiousTarget;
}

export interface MischievousTrigger {
    $type:    TriggerType;
    Subject?: AmbitiousTarget;
}

export interface E4 {
    Id:                  E2ID;
    Trigger:             E4Trigger;
    ActiveIn:            ActiveIn;
    Action:              Action3;
    Prerequisites:       null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface RestorativeAttributes {
    HealAmount?:         number;
    PoisonRemoveAmount?: number;
    BurnRemoveAmount?:   number;
    Custom_1?:           number;
}

export interface RestorativeAuras {
    e1?: StickyE1;
    e2?: AmbitiousE2;
    e5?: E5;
    e6?: E5;
    e3?: E2Class;
}

export interface AmbitiousE2 {
    Id:                  E2ID;
    ActiveIn:            ActiveIn;
    Action:              Action6;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: E9InternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface Action6 {
    $type:         PurpleType;
    AttributeType: AttributeType;
    Operation:     Operation;
    Value:         CunningValue;
    Target:        LimitTarget;
}

export interface CunningValue {
    $type:          TargetCountType;
    Target:         Target1;
    AttributeType?: AttributeType;
    DefaultValue:   number;
    Modifier:       LimitModifier;
}

export interface Target1 {
    $type:          SourceType;
    TargetMode?:    Origin;
    Conditions:     Conditions7 | null;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
    Origin?:        PurpleOrigin;
    IncludeOrigin?: boolean;
}

export interface Conditions7 {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    Conditions?:         Condition10[];
    Tags?:               Tag[];
    Operator?:           Operator;
    Enchantment?:        string;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Sizes?:              Size[];
    Id?:                 string;
    AttributeType?:      AttributeType;
}

export interface Condition10 {
    $type:               ConditionType;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    Conditions?:         Condition11[];
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    Enchantment?:        string;
    Id?:                 string;
    AttributeType?:      AttributeType;
    IsSameAsPlayerHero?: boolean;
}

export interface Condition11 {
    $type:        ConditionType;
    Tags?:        Tag[];
    Operator?:    Operator;
    Sizes?:       Size[];
    IsNot?:       boolean;
    Enchantment?: StickyInternalDescription;
}

export type E9InternalDescription = "Sets the value of heal" | "" | "Sets the value of Tommoo Gun 1" | "Sets the value of shield" | "Sets shield" | "Sets the value of Heal" | "Sets the value of ShieldApplyAmount" | "Sets the value of Restorative Submersible" | "Sets the value of Restorative Submarine Ability" | "Restorative" | "Sets the value of Ability 1" | "Sets the value of Restorative The Boulder" | "Sets the value of Restorative Dragon Whelp" | "Sets the value of Shield" | "Sets the heal of the item" | "Sets Shield" | "Sets the value" | "Sets the value of Shielded The Boulder";

export interface E5 {
    Id:                  string;
    ActiveIn:            ActiveIn;
    Action:              Action7;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      E5TranslationKey;
}

export interface Action7 {
    $type:         PurpleType;
    AttributeType: AttributeType;
    Operation:     Operation;
    Value:         PurpleValue;
    Target:        LimitTarget;
}

export type E5TranslationKey = "9ed8516049000a0e1a90054e0aab06ce" | "a193d872e6cb3a8dc2d05aedb98955c0" | "b7b4b93275c7490d6e2b0997872ba2e1";

export interface Shielded {
    Attributes:   ShieldedAttributes;
    Abilities:    ShieldedAbilities;
    Auras:        ShieldedAuras;
    Tags:         any[];
    HiddenTags:   HiddenTag[];
    Localization: DeadlyLocalization;
    HasAbilities: boolean;
    HasAuras:     boolean;
}

export interface ShieldedAbilities {
    e1?: MischievousE1;
    e3?: FluffyE3;
    e2?: CunningE2;
}

export interface MischievousE1 {
    Id:                  E1ID;
    Trigger:             HilariousTrigger;
    ActiveIn:            ActiveIn;
    Action:              StickyAction;
    Prerequisites:       PurplePrerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: AmbitiousInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export type AmbitiousInternalDescription = "" | "Shielded" | "set " | "Shielded 1";

export interface CunningE2 {
    Id:                  string;
    Trigger:             AmbitiousTrigger;
    ActiveIn:            ActiveIn;
    Action:              Action4;
    Prerequisites:       TentacledPrerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface FluffyE3 {
    Id:                  E1ID;
    Trigger:             E4Trigger;
    ActiveIn:            ActiveIn;
    Action:              Action8;
    Prerequisites:       null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface Action8 {
    $type:         PurpleType;
    Value:         TargetCount;
    AttributeType: AttributeType;
    Operation:     Operation;
    Duration:      Duration | null;
    TargetCount:   null;
    Target:        Subject;
}

export interface ShieldedAttributes {
    ShieldApplyAmount?: number;
    Custom_1?:          number;
}

export interface ShieldedAuras {
    e2?: AmbitiousE2;
    e1?: StickyE1;
    e3?: E9Class;
}

export interface E9Class {
    Id:                  string;
    ActiveIn:            ActiveIn;
    Action:              E9Action;
    Prerequisites:       null;
    InternalName:        E3InternalName;
    InternalDescription: E9InternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      E5TranslationKey;
}

export interface E9Action {
    $type:         PurpleType;
    AttributeType: AttributeType;
    Operation:     Operation;
    Value:         Limit;
    Target:        LimitTarget;
}

export type E3InternalName = "Tooltip Handling" | "Shielded Sharkclaws Aura" | "Shielded Handaxe Aura" | "Shielded Rune Axe Aura";

export interface Shiny {
    Attributes:   ShinyAttributes;
    Abilities:    ShinyAbilities;
    Auras:        ShinyAuras;
    Tags:         any[];
    HiddenTags:   HiddenTag[];
    Localization: DeadlyLocalization;
    HasAbilities: boolean;
    HasAuras:     boolean;
}

export interface ShinyAbilities {
    e1?: BraggadociousE1;
    e2?: StickyE2;
}

export interface BraggadociousE1 {
    Id:                  E1ID;
    Trigger:             E4Trigger;
    ActiveIn:            ActiveIn;
    Action:              Action9 | null;
    Prerequisites:       E3Prerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: FluffyInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface Action9 {
    $type:         PurpleType;
    Enchantment?:  FluffyInternalDescription;
    Target?:       Subject;
    TargetPlayer?: Subject;
    SpawnContext?: FluffySpawnContext;
}

export interface ShinyAttributes {
    CritChance?:   number;
    Multicast?:    number;
    Custom_1?:     number;
    DamageAmount?: number;
}

export interface ShinyAuras {
    e1?: E11;
    e2?: E4Class;
    e3?: E4Class;
    e4?: E4Class;
    e5?: E4Class;
    e6?: E4Class;
}

export interface E11 {
    Id:                  E1ID;
    ActiveIn:            ActiveIn;
    Action:              Action10;
    Prerequisites:       StickyPrerequisite[] | null;
    InternalName:        string;
    InternalDescription: E4InternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface Action10 {
    $type:         TentacledType;
    AttributeType: AttributeType;
    Operation:     Operation;
    Value:         AmbitiousValue;
    Target:        CunningTarget;
}

export type E4InternalDescription = "Shiny 1" | "Shiny" | "" | "Shiny 2" | "XP 2x" | "Golden 1" | "This has +{aura.1} Multicast for each Property you have." | "Icy 2" | "Shiny None" | "Tooltip Handling";

export interface StickyPrerequisite {
    $type:      PrerequisiteType;
    Subject:    Subject;
    Comparison: Comparison;
    Amount:     number;
}

export interface E4Class {
    Id:                  E2ID;
    ActiveIn:            ActiveIn;
    Action:              Action11;
    Prerequisites:       E3Prerequisite[] | null;
    InternalName:        string;
    InternalDescription: E4InternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface Action11 {
    $type:         PurpleType;
    AttributeType: AttributeType;
    Operation:     Operation;
    Value:         MagentaValue;
    Target:        Source;
}

export interface MagentaValue {
    $type:          TargetCountType;
    Value?:         number;
    Target?:        Source;
    AttributeType?: AttributeType;
    DefaultValue?:  number;
    Modifier?:      null;
}

export interface Toxic {
    Attributes:   ToxicAttributes;
    Abilities:    ToxicAbilities;
    Auras:        ToxicAuras;
    Tags:         any[];
    HiddenTags:   HiddenTag[];
    Localization: DeadlyLocalization;
    HasAbilities: boolean;
    HasAuras:     boolean;
}

export interface ToxicAbilities {
    e1?: TentacledE1;
    e2?: MagentaE2;
    E1?: E1;
}

export interface MagentaE2 {
    Id:                  E2ID;
    Trigger:             MischievousTrigger;
    ActiveIn:            ActiveIn;
    Action:              IndigoAction;
    Prerequisites:       TentacledPrerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface ToxicAttributes {
    PoisonApplyAmount?: number;
    Custom_3?:          number;
    Custom_0?:          number;
}

export interface ToxicAuras {
    e2?: TentacledE2;
    e1?: StickyE1;
    e9?: E9Class;
}

export interface Turbo {
    Attributes:   TurboAttributes;
    Abilities:    TurboAbilities;
    Auras:        HeavyAuras;
    Tags:         any[];
    HiddenTags:   AttributeType[];
    Localization: DeadlyLocalization;
    HasAbilities: boolean;
    HasAuras:     boolean;
}

export interface TurboAbilities {
    e1?: E12;
    e2?: IndigoE2;
}

export interface E12 {
    Id:                  E1ID;
    Trigger:             MagentaTrigger;
    ActiveIn:            ActiveIn;
    Action:              Action12;
    Prerequisites:       PurplePrerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: CunningInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface Action12 {
    $type:        PurpleType;
    Target:       Target1;
    Enchantment?: CunningInternalDescription;
}

export type CunningInternalDescription = "" | "Turbo" | "Turbo 2" | "Turbo 3";

export interface TurboAttributes {
    HasteTargets?: number;
    HasteAmount?:  number;
}

export type Hero = "Pygmalien" | "Common" | "Vanessa" | "Dooley" | "Jules" | "Stelle" | "Mak";

export type V2CardsDInternalDescription = "" | "Sells Items" | "Day 1" | "Keep the wallet for yourself." | "Any investment helps!" | "The creature hums with happiness and you feel at peace." | "Spend your time looking for spare change instead of investing." | "Gain a Diamond-tier item" | "Sells items" | "The creature purrs with joy and you feel warm inside." | "You own the circus! What do you want to do with it?" | "Close the circus down and free all the animals." | "You feed the creature and it leads you to an item!" | "Side with the merchant and shoo the customer away." | "Have a nice day :)";

export interface V2CardsDLocalization {
    Title:       Title;
    Description: Title | null;
    FlavorText:  null;
    Tooltips:    Tooltip[];
}

export interface Reward {
    SelectionContextRules: Rules | null;
    GoldReward:            number;
    ExperienceReward:      number;
}

export interface Rules {
    CanSelectMultiple:   boolean;
    SelectionIsFree:     boolean;
    CanExit:             boolean;
    RerollRules:         RerollRules | null;
    WillAutoSellOnExit:  boolean;
    NextEncounterOnExit: null;
}

export interface RerollRules {
    TotalAllowedRerolls: number | null;
    CostIncrease:        number;
    StartingCost:        number;
    CostMax:             null;
}

export interface SelectionContext {
    Rules: Rules;
}

export interface SelectionCriteria {
    $type:       ConditionType;
    Tiers?:      Tier[];
    IsNot?:      boolean;
    Conditions?: SelectionCriteriaCondition[];
}

export interface SelectionCriteriaCondition {
    $type:        ConditionType;
    Enchantment?: string;
    IsNot?:       boolean;
    CardType?:    Type;
    Conditions?:  Condition12[];
}

export interface Condition12 {
    $type:       ConditionType;
    Enchantment: string;
}

export interface Tiers {
    Gold?:      Bronze;
    Diamond:    Bronze;
    Bronze?:    Bronze;
    Silver?:    Bronze;
    Legendary?: Bronze;
}

export interface Bronze {
    Attributes: { [key: string]: number };
    AbilityIds: string[];
    AuraIds:    string[];
    TooltipIds: number[];
}

export type Version = "1.0.0" | "0.0.0";
