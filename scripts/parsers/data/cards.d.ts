export interface CardsD {
    "2.0.0": The200[];
}

export interface The200 {
    $type:                         The200_$Type;
    IsReselectable?:               boolean;
    Type:                          Type;
    ExperienceAwardUponSelection?: number;
    Attributes?:                   The200_Attributes | null;
    Id:                            string;
    Version:                       Version;
    InternalName:                  string;
    InternalDescription:           The200_InternalDescription | null;
    StartingTier:                  Tier;
    Size:                          Size;
    Heroes:                        Hero[];
    Tags:                          Tag[];
    HiddenTags:                    HiddenTag[];
    ArtKey:                        string;
    CardPackId:                    CardPackID;
    TranslationKey:                string;
    AudioKey:                      null | string;
    Localization:                  The200_Localization;
    Abilities:                     { [key: string]: Ability };
    Auras:                         { [key: string]: Aura };
    Tiers?:                        Tiers;
    Enchantments?:                 Enchantments | null;
    Transform?:                    Transform | null;
    CombatantType?:                CombatantType;
    RewardCombatGold?:             number;
    RewardVictory?:                Reward;
    RewardDefeat?:                 Reward;
    SelectionContext?:             SelectionContext | null;
    SelectionRequirements?:        null;
    SelectionCriteria?:            SelectionCriteria;
}

export type The200_$Type = "TCardEncounterStep" | "TCardItem" | "TCardEncounterCombat" | "TCardSkill" | "TCardEncounterEvent" | "TCardEncounterPedestal";

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
    $type:            PurpleType;
    AttributeType?:   AttributeType;
    Value?:           TentacledValue | null;
    Operation?:       Operation;
    Duration?:        PurpleDuration | null;
    Target?:          PurpleTarget;
    ReferenceValue?:  null;
    TargetCount?:     Limit | null;
    UpgradeToTier?:   AttributeType | null;
    SpawnContext?:    PurpleSpawnContext;
    TargetPlayer?:    TargetPlayer;
    Enchantment?:     string;
    PreventOverride?: boolean;
    Abilities?:       null;
    Enchantments?:    EnchantmentElement[];
    Tags?:            Tag[];
    Source?:          Source;
}

export type PurpleType = "TActionPlayerModifyAttribute" | "TActionPlayerHeal" | "TActionPlayerDamage" | "TActionCardSlow" | "TActionCardUpgrade" | "TActionPlayerShieldApply" | "TActionPlayerPoisonApply" | "TActionPlayerBurnApply" | "TActionGameDealCards" | "TActionGameSpawnCards" | "TActionCardModifyAttribute" | "TActionCardCharge" | "TActionCardFreeze" | "TActionCardEnchant" | "TActionCardForceUse" | "TActionCardHaste" | "TActionCardReload" | "TActionCardTransform" | "TActionPlayerRegenApply" | "TActionCardDisable" | "TActionPlayerJoyApply" | "TActionPlayerReviveHeal" | "TActionCardEnchantRandom" | "TActionPlayerPoisonRemove" | "TActionCardBeginSandstorm" | "TActionCardAddTagsList" | "TActionPlayerBurnRemove" | "TActionCardDestroy" | "TActionCardAddTagsBySource" | "TAuraActionCardModifyAttribute";

export type AttributeType = "HealthMax" | "CritChance" | "Gold" | "BurnApplyAmount" | "DamageAmount" | "JoyApplyAmount" | "Income" | "CooldownMax" | "Experience" | "PoisonApplyAmount" | "Custom_1" | "ShieldApplyAmount" | "HealAmount" | "Cooldown" | "Prestige" | "SellPrice" | "RegenApplyAmount" | "HealthRegen" | "Multicast" | "PercentDamageReduction" | "AmmoMax" | "Freeze" | "Shield" | "FreezeAmount" | "Custom_0" | "BuyPrice" | "Counter" | "Custom_3" | "Custom_2" | "Custom_5" | "Slow" | "HasteAmount" | "SlowAmount" | "Lifesteal" | "Custom_4" | "Health" | "Custom_8" | "Ammo" | "Burn" | "Poison" | "Haste" | "Level" | "Joy" | "DamageCrit" | "FreezeTargets" | "ChargeAmount" | "BurnRemoveAmount" | "RerollCostModifier" | "PoisonRemoveAmount";

export interface PurpleDuration {
    $type:         DurationType;
    DurationType?: DurationTypeEnum;
    DurationInMs?: number;
}

export type DurationType = "TDeterminantDuration" | "TCombatDuration";

export type DurationTypeEnum = "UntilEndOfCombat" | "UntilEndOfDay";

export interface EnchantmentElement {
    Enchantment: string;
    Weight:      number;
}

export type Operation = "Add" | "Multiply" | "Subtract";

export interface Source {
    $type:          SourceType;
    TargetMode?:    TargetMode;
    Conditions:     PurpleConditions | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export type SourceType = "TTargetPlayerAbsolute" | "TTargetCardSelf" | "TTargetCardXMost" | "TTargetCardSection" | "TTargetPlayerRelative" | "TTargetCardTriggerSource" | "TTargetCardRandom" | "TTargetCardPositional" | "TTargetPlayer" | "TCardConditionalAnd" | "TCardConditionalOr";

export interface PurpleConditions {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    PurpleValue;
    Tags?:               Tag[];
    Operator?:           Operator;
    AttributeType?:      AttributeType;
    Conditions?:         PurpleCondition[];
    Tiers?:              Tier[];
    IsNot?:              boolean;
}

export type ConditionType = "TCardConditionalAttribute" | "TCardConditionalTag" | "TCardConditionalAttributeLowest" | "TCardConditionalAnd" | "TCardConditionalHiddenTag" | "TPlayerConditionalAttribute" | "TCardConditionalTier" | "TCardConditionalOr" | "TCardConditionalEnchantmentEligible" | "TCardConditionalSize" | "TCardConditionalTriggerSource" | "TCardConditionalHasEnchantment" | "TCardConditionalId" | "TCardConditionalAttributeHighest" | "TCardConditionalPlayerHero" | "TCardConditionalType";

export type Comparison = "GreaterThan" | "LessThanOrEqual" | "Equal" | "LessThan" | "GreaterThanOrEqual" | "NotEqual";

export interface FluffyConditions {
    $type:              ConditionType;
    Attribute:          AttributeType;
    ComparisonOperator: Comparison;
    ComparisonValue:    PurpleValue;
}

export interface ComparisonValueSubject {
    $type:       SourceType;
    Conditions:  FluffyConditions | null;
    TargetMode?: TargetMode;
}

export interface PurpleValue {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        ComparisonValueSubject;
    AttributeType?: AttributeType;
    DefaultValue?:  number;
    Modifier?:      ComparisonValueModifier;
}

export type TargetMode = "Self" | "Opponent" | "Player" | "LeftMostCard" | "Neighbor" | "RightCard" | "LeftCard" | "RightMostCard" | "Both" | "AllRightCards" | "AllLeftCards";

export type ComparisonValueType = "TFixedValue" | "TReferenceValuePlayerAttribute" | "TReferenceValuePlayerAttributeChange" | "TReferenceValueCardAttribute" | "TRangeValue" | "TReferenceValueCardCount" | "TReferenceValueCardAttributeAggregate" | "TReferenceValueCardTagCount";

export interface ComparisonValueModifier {
    ModifyMode: Operation;
    Value:      ComparisonValue;
}

export interface ComparisonValue {
    $type: ComparisonValueType;
    Value: number;
}

export interface PurpleCondition {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Conditions?:         TriggerConditions[];
}

export interface FluffyCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Enchantment?:        ConditionEnchantment;
    IsNot?:              boolean;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Conditions?:         TriggerConditions[];
}

export interface TriggerConditions {
    $type:        ConditionType;
    Tags?:        Tag[];
    Operator?:    Operator;
    Conditions?:  FluffyCondition[];
    Enchantment?: string;
}

export type ConditionEnchantment = "Radiant" | "Obsidian" | "Deadly";

export type Operator = "Any" | "None";

export type Tag = "Merchant" | "Weapon" | "Shield" | "Heal" | "Joy" | "Burn" | "Poison" | "Regen" | "Core" | "Friend" | "Aquatic" | "Toy" | "Tool" | "Dinosaur" | "Dragon" | "Relic" | "Tech" | "Food" | "Ray" | "Potion" | "Property" | "Vehicle" | "Slow" | "Freeze" | "Reagent" | "Apparel" | "Haste" | "Damage" | "Loot";

export type Tier = "Gold" | "Silver" | "Diamond" | "Bronze" | "Legendary";

export type TargetSection = "SelfHand" | "AbsolutePlayerHandAndStash" | "SelfBoard" | "AllHands" | "OpponentHand" | "AbsolutePlayerHand" | "SelfHandAndStash" | "AbsoluteOpponentHand" | "SelfNeighbors" | "SelfStash";

export interface PurpleSpawnContext {
    $type: SpawnContextType;
    Limit: Limit;
}

export type SpawnContextType = "TSpawnContextQuery";

export interface Limit {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        ConditionsClass;
    AttributeType?: AttributeType;
    DefaultValue?:  number;
    Modifier?:      ComparisonValueModifier | null;
}

export interface ConditionsClass {
    $type:      SourceType;
    Conditions: TentacledCondition[] | TentacledConditions | null;
}

export interface TentacledCondition {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         StickyCondition[];
}

export interface StickyCondition {
    $type:    ConditionType;
    Tags:     Tag[];
    Operator: Operator;
}

export interface TentacledConditions {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Enchantment?:        string;
}

export interface PurpleTarget {
    $type:          SourceType;
    TargetMode?:    TargetMode;
    Conditions:     TentacledCondition[] | StickyConditions | null;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
    Origin?:        Origin;
    IncludeOrigin?: boolean;
}

export interface StickyConditions {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    PurpleComparisonValue;
    Conditions?:         IndigoCondition[];
    Tags?:               Tag[];
    Operator?:           Operator;
    Enchantment?:        null | string;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Sizes?:              Size[];
    Id?:                 string;
    AttributeType?:      AttributeType;
    IsSameAsPlayerHero?: boolean;
    CardType?:           Type;
}

export type Type = "Item" | "EncounterStep" | "CombatEncounter" | "Skill" | "EventEncounter" | "PedestalEncounter";

export interface PurpleComparisonValue {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        ComparisonValueSubject;
    AttributeType?: AttributeType;
    DefaultValue?:  number;
    Modifier?:      ComparisonValueModifier | null;
}

export interface IndigoCondition {
    $type:               ConditionType;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Conditions?:         IndecentCondition[];
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    Enchantment?:        null | string;
    CardType?:           Type;
    Id?:                 string;
    IsSameAsPlayerHero?: boolean;
    AttributeType?:      AttributeType;
}

export interface IndecentCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    AttributeType?:      AttributeType;
    Enchantment?:        null | string;
    IsNot?:              boolean;
    CardType?:           Type;
    Sizes?:              Size[];
    Conditions?:         FluffyCondition[];
}

export type Size = "Small" | "Medium" | "Large";

export type Origin = "Self" | "TriggerSource";

export interface TargetPlayer {
    $type:          SourceType;
    TargetMode?:    TargetMode;
    Conditions:     IndigoConditions | null;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
}

export interface IndigoConditions {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    FluffyValue;
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         HilariousCondition[];
    CardType?:           Type;
    IsNot?:              boolean;
    Sizes?:              Size[];
    Tiers?:              Tier[];
    AttributeType?:      AttributeType;
}

export interface FluffyValue {
    $type:          ComparisonValueType;
    Target?:        ComparisonValueSubject;
    AttributeType?: AttributeType;
    DefaultValue?:  number;
    Modifier?:      ComparisonValueModifier | null;
    Value?:         number;
}

export interface HilariousCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
}

export interface TentacledValue {
    $type:          ComparisonValueType;
    Target?:        FluffyTarget;
    AttributeType?: AttributeType;
    DefaultValue?:  number;
    Modifier?:      PurpleModifier | null;
    Value?:         number;
    MinValue?:      number;
    MaxValue?:      number;
}

export interface PurpleModifier {
    ModifyMode: Operation;
    Value:      Limit;
}

export interface FluffyTarget {
    $type:          SourceType;
    TargetMode?:    TargetMode;
    Conditions:     TentacledCondition[] | IndecentConditions | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export interface IndecentConditions {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    FluffyComparisonValue;
    Tags?:               Tag[];
    Operator?:           Operator;
    AttributeType?:      AttributeType;
    Conditions?:         PurpleCondition[];
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Enchantment?:        string;
}

export interface FluffyComparisonValue {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        ComparisonValueSubject;
    AttributeType?: AttributeType;
    DefaultValue?:  number;
    Modifier?:      ComparisonValueModifier;
}

export type ActiveIn = "HandOnly" | "HandAndStash";

export interface AbilityPrerequisite {
    $type:           PrerequisiteType;
    Subject?:        PurpleSubject;
    Comparison?:     Comparison;
    Amount?:         number;
    Conditions?:     PrerequisiteConditions;
    SubjectOther?:   null;
    Attribute?:      AttributeType;
    AttributeOther?: AttributeType;
}

export type PrerequisiteType = "TPrerequisiteCardCount" | "TPrerequisitePlayer" | "TPrerequisiteRun" | "TPrerequisiteCardAttributeComparator";

export interface PrerequisiteConditions {
    $type:              FluffyType;
    CurrentDay:         number;
    ComparisonOperator: Comparison;
}

export type FluffyType = "TRunConditionalCurrentDay";

export interface PurpleSubject {
    $type:          SourceType;
    Conditions:     TentacledCondition[] | HilariousConditions | null;
    TargetMode?:    TargetMode;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Origin?:        TargetMode;
    IncludeOrigin?: boolean;
}

export interface HilariousConditions {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TentacledComparisonValue;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         AmbitiousCondition[];
    Tiers?:              Tier[];
    Enchantment?:        null | string;
    IsSameAsPlayerHero?: boolean;
    CardType?:           Type;
    AttributeType?:      AttributeType;
}

export interface TentacledComparisonValue {
    $type:          ComparisonValueType;
    Target?:        ComparisonValueTarget;
    AttributeType?: AttributeType;
    DefaultValue?:  number;
    Modifier?:      ComparisonValueModifier | null;
    Value?:         number;
}

export interface ComparisonValueTarget {
    $type:          SourceType;
    Conditions:     IndigoConditions | null;
    TargetMode?:    TargetMode;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
}

export interface AmbitiousCondition {
    $type:               ConditionType;
    Id?:                 string;
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    AttributeType?:      AttributeType;
    Conditions?:         CunningCondition[];
    Enchantment?:        null | string;
    Sizes?:              Size[];
}

export interface CunningCondition {
    $type:               ConditionType;
    Enchantment?:        ConditionEnchantment | null;
    IsNot?:              boolean;
    Sizes?:              Size[];
    Tiers?:              Tier[];
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         MagentaCondition[];
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Id?:                 string;
    AttributeType?:      AttributeType;
    IsSameAsPlayerHero?: boolean;
}

export interface MagentaCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Enchantment?:        null;
    IsNot?:              boolean;
}

export type Priority = "Medium" | "Low" | "High" | "Lowest" | "Immediate" | "Highest";

export interface AbilityTrigger {
    $type:             TriggerType;
    Subject?:          FluffySubject;
    Target?:           TentacledTarget | null;
    CombatType?:       null | string;
    AttributeType?:    AttributeType;
    ChangeType?:       ChangeType;
    Source?:           null;
    CombatOutcome?:    CombatOutcome | null;
    Conditions?:       TriggerConditions;
    AttributeChanged?: AttributeType;
    PreviousValue?:    PreviousValue | null;
    CurrentValue?:     null;
}

export type TriggerType = "TTriggerOnCardSelected" | "TTriggerOnCardFired" | "TTriggerOnCardCritted" | "TTriggerOnCardPerformedHaste" | "TTriggerOnItemUsed" | "TTriggerOnCardPerformedBurn" | "TTriggerOnCardSold" | "TTriggerOnFightStarted" | "TTriggerOnCardPurchased" | "TTriggerOnPlayerAttributeChanged" | "TTriggerOnCardPerformedSlow" | "TTriggerOnPlayerDied" | "TTriggerOnHourStarted" | "TTriggerOnCardPerformedShield" | "TTriggerOnCardPerformedPoison" | "TTriggerOnFightEnded" | "TTriggerOnCardPerformedOverHeal" | "TTriggerOnCardPerformedHeal" | "TTriggerOnCardPerformedDestruction" | "TTriggerOnCardPerformedFreeze" | "TTriggerOnDayStarted" | "TTriggerOnEncounterSelected" | "TTriggerOnCardTransformed" | "TTriggerOnCardAttributeChanged" | "TTriggerOnCardUpgraded" | "TTriggerOnBeforeCardDestroyed" | "TTriggerOnCardPerformedReload" | "TTriggerOnCardPerformedRegen" | "TTriggerOnCardReloaded" | "TTriggerOnBeforeCardTransformed";

export type ChangeType = "Gain" | "Loss";

export type CombatOutcome = "Win" | "Lose";

export interface PreviousValue {
    $type:              string;
    ComparisonOperator: Comparison;
    ComparisonValue:    number;
}

export interface FluffySubject {
    $type:          SourceType;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Conditions:     AmbitiousConditions | null;
    TargetMode?:    TargetMode;
    Origin?:        Origin;
    IncludeOrigin?: boolean;
}

export interface AmbitiousConditions {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Conditions?:         FriskyCondition[];
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    PurpleComparisonValue;
    CardType?:           Type;
    Enchantment?:        PurpleEnchantment | null;
    Id?:                 string;
    Tiers?:              Tier[];
    IsSameAsPlayerHero?: boolean;
    AttributeType?:      AttributeType;
}

export interface FriskyCondition {
    $type:               ConditionType;
    CardType?:           Type;
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Tiers?:              Tier[];
    Enchantment?:        null | string;
    Id?:                 string;
    Conditions?:         MischievousCondition[];
    AttributeType?:      AttributeType;
    IsSameAsPlayerHero?: boolean;
}

export interface MischievousCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Conditions?:         FluffyCondition[];
    Enchantment?:        string;
}

export type PurpleEnchantment = "Radiant" | "Shiny" | "Toxic";

export interface TentacledTarget {
    $type:          SourceType;
    TargetMode?:    TargetMode;
    Conditions:     CunningConditions | null;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
}

export interface CunningConditions {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    FluffyValue;
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         BraggadociousCondition[];
    CardType?:           Type;
    IsNot?:              boolean;
    Sizes?:              Size[];
    Tiers?:              Tier[];
    AttributeType?:      AttributeType;
}

export interface BraggadociousCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Conditions?:         TriggerConditions[];
}

export interface VFXConfig {
    VFXOverrideKey: null | string;
    VFXShouldPlay:  boolean;
    VFXIsTakeover:  boolean;
}

export interface The200_Attributes {
    BuyPrice?:         number;
    SellPrice?:        number;
    RegenApplyAmount?: number;
}

export interface Aura {
    Id:                  string;
    ActiveIn:            ActiveIn;
    Action:              AuraAction;
    Prerequisites:       AuraPrerequisite[] | null;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface AuraAction {
    $type:          TentacledType;
    AttributeType?: AttributeType;
    Operation?:     Operation;
    Value?:         StickyValue;
    Target:         StickyTarget;
    Source?:        TargetPlayer;
    Tags?:          Tag[];
}

export type TentacledType = "TAuraActionCardModifyAttribute" | "TAuraActionPlayerModifyAttribute" | "TAuraActionCardAddTagsBySource" | "TAuraActionCardAddTagsList";

export interface StickyTarget {
    $type:          SourceType;
    Conditions:     TentacledCondition[] | MagentaConditions | null;
    TargetMode?:    TargetMode;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
    Origin?:        Origin;
    IncludeOrigin?: boolean;
}

export interface MagentaConditions {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    AttributeType?:      AttributeType;
    Conditions?:         FriskyCondition[];
    Enchantment?:        null | string;
    Sizes?:              Size[];
    IsNot?:              boolean;
    CardType?:           Type;
    Id?:                 string;
    Tiers?:              Tier[];
}

export interface StickyValue {
    $type:          ComparisonValueType;
    Target?:        IndigoTarget;
    AttributeType?: AttributeType;
    DefaultValue?:  number;
    Modifier?:      PurpleModifier | null;
    Distinct?:      boolean;
    Value?:         number;
}

export interface IndigoTarget {
    $type:          SourceType;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Conditions:     TentacledCondition[] | FriskyConditions | null;
    TargetMode?:    TargetMode;
    Origin?:        TargetMode;
    IncludeOrigin?: boolean;
}

export interface FriskyConditions {
    $type:               ConditionType;
    Enchantment?:        null | string;
    IsNot?:              boolean;
    Sizes?:              Size[];
    Tiers?:              Tier[];
    Tags?:               Tag[];
    Operator?:           Operator;
    AttributeType?:      AttributeType;
    Conditions?:         Condition1[];
    Id?:                 string;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    PurpleComparisonValue;
    CardType?:           Type;
}

export interface Condition1 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Enchantment?:        null | string;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    CardType?:           Type;
    Conditions?:         Condition2[];
    Id?:                 string;
}

export interface Condition2 {
    $type:        ConditionType;
    Id?:          string;
    IsNot?:       boolean;
    Tags?:        Tag[];
    Operator?:    Operator;
    Enchantment?: InternalDescription;
}

export type InternalDescription = "Sets the value of heal" | "" | "Sets the value of Heal" | "Sets the value of shield" | "Sets shield" | "Sets the value of ShieldApplyAmount" | "Heal 12 for each non-Weapon item you have." | "Sets the value of Restorative Submersible" | "Heal 15 for each Aquatic or Toy item you have." | "Sets the value of Restorative Submarine Ability" | "Sets the value of Restorative Test Subject Alpha" | "Restorative" | "Sets the value of Restorative The Boulder" | "Sets the value of Restorative Dragon Whelp";

export interface AuraPrerequisite {
    $type:       PrerequisiteType;
    Subject:     TentacledSubject;
    Comparison?: Comparison;
    Amount?:     number;
}

export interface TentacledSubject {
    $type:          SourceType;
    Conditions:     TentacledCondition[] | MischievousConditions | null;
    TargetMode?:    TargetMode;
    Origin?:        TargetMode;
    IncludeOrigin?: boolean;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export interface MischievousConditions {
    $type:               ConditionType;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    PurpleComparisonValue;
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         Condition3[];
    CardType?:           Type;
    Tiers?:              Tier[];
    AttributeType?:      AttributeType;
    Id?:                 string;
    Enchantment?:        string;
}

export interface Condition3 {
    $type:               ConditionType;
    CardType?:           Type;
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    Enchantment?:        InternalDescription | null;
    Conditions?:         Condition4[];
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
}

export interface Condition4 {
    $type:        ConditionType;
    Id?:          string;
    IsNot?:       boolean;
    Tags?:        Tag[];
    Operator?:    Operator;
    Enchantment?: string;
    Conditions?:  FluffyCondition[];
}

export type CardPackID = "Pygmalien_Core" | "Core" | "Vanessa_Core" | "Stelle_Core" | "Dooley_Core" | "Mak_Dangerous_Experiments" | "Pyg_Frozen_Assets" | "Mak_Core" | "Jules_Core" | "Pyg_Investment_Opportunities" | "Vanessa_The_Gang" | "Vanessa_Mysteries_of_the_Deep" | "Dooley_Dooltron" | "Pygmalien";

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
    Attributes:   DeadlyAttributes;
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
    Id:                  string;
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
    $type:            PurpleType;
    Value?:           Limit;
    AttributeType?:   AttributeType;
    Operation?:       Operation;
    Duration:         FluffyDuration | null;
    TargetCount:      ComparisonValue | null;
    Target:           IndecentTarget;
    Enchantment?:     ConditionEnchantment;
    PreventOverride?: boolean;
}

export interface FluffyDuration {
    $type:        DurationType;
    DurationType: DurationTypeEnum;
}

export interface IndecentTarget {
    $type:          SourceType;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Conditions:     BraggadociousConditions | null;
    TargetMode?:    TargetMode;
    Origin?:        Origin;
    IncludeOrigin?: boolean;
}

export interface BraggadociousConditions {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Conditions?:         Condition5[];
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    CardType?:           Type;
    Enchantment?:        ConditionEnchantment | null;
    Id?:                 string;
    Tiers?:              Tier[];
}

export interface Condition5 {
    $type:               ConditionType;
    CardType?:           Type;
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Tiers?:              Tier[];
    Enchantment?:        string;
    Id?:                 string;
    Conditions?:         HilariousCondition[];
    AttributeType?:      AttributeType;
    IsSameAsPlayerHero?: boolean;
}

export interface PurplePrerequisite {
    $type:       PrerequisiteType;
    Subject:     ComparisonValueSubject;
    Comparison?: Comparison;
    Amount?:     number;
}

export interface PurpleTrigger {
    $type:             TriggerType;
    Subject?:          StickySubject;
    AttributeType?:    AttributeType;
    ChangeType?:       ChangeType;
    Source?:           null;
    Target?:           null;
    AttributeChanged?: AttributeType;
    PreviousValue?:    null;
    CurrentValue?:     null;
}

export interface StickySubject {
    $type:          SourceType;
    Conditions:     Conditions1 | null;
    TargetMode?:    TargetMode;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
    Origin?:        TargetMode;
    IncludeOrigin?: boolean;
}

export interface Conditions1 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    AttributeType?:      AttributeType;
    Conditions?:         Condition6[];
    Enchantment?:        ConditionEnchantment;
}

export interface Condition6 {
    $type:               ConditionType;
    Enchantment?:        ConditionEnchantment | null;
    IsNot?:              boolean;
    Sizes?:              Size[];
    Tiers?:              Tier[];
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         HilariousCondition[];
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Id?:                 string;
}

export interface PurpleE2 {
    Id:                  E2ID;
    Trigger:             FluffyTrigger;
    ActiveIn:            ActiveIn;
    Action:              FluffyAction;
    Prerequisites:       null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: PurpleInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface FluffyAction {
    $type:         PurpleType;
    Value:         ComparisonValue;
    AttributeType: AttributeType;
    Operation:     Operation;
    Duration:      FluffyDuration;
    TargetCount:   null;
    Target:        HilariousTarget;
}

export interface HilariousTarget {
    $type:          SourceType;
    Conditions:     ConditionsClass | null;
    Origin?:        TargetMode;
    TargetMode?:    TargetMode;
    IncludeOrigin?: boolean;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export type E2ID = "e2" | "e3" | "e4" | "e5" | "e6";

export type PurpleInternalDescription = "Deadly 50" | "Deadly 2" | "" | "Deadly" | "Deadly 1" | "Deadly 20" | "Deadly 30" | "Deadly 25" | "Deadly 2x" | "Shiny 1" | "Deadly 10" | "Crit Chance 25%";

export interface FluffyTrigger {
    $type:             TriggerType;
    Subject:           ActionSubject;
    AttributeChanged?: AttributeType;
    ChangeType?:       ChangeType;
    PreviousValue?:    null;
    CurrentValue?:     null;
    Source?:           null;
    Target?:           null;
}

export interface ActionSubject {
    $type:          SourceType;
    Conditions:     Conditions2 | null;
    TargetMode?:    TargetMode;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Origin?:        TargetMode;
    IncludeOrigin?: boolean;
}

export interface Conditions2 {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    IndigoValue;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Tiers?:              Tier[];
    Conditions?:         Condition7[];
    Enchantment?:        null;
    IsSameAsPlayerHero?: boolean;
}

export interface IndigoValue {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        TargetPlayer;
    AttributeType?: AttributeType;
    DefaultValue?:  number;
    Modifier?:      ComparisonValueModifier | null;
}

export interface Condition7 {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Conditions?:         Condition8[];
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Enchantment?:        null | string;
    Id?:                 string;
}

export interface Condition8 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Conditions?:         Condition9[];
    Enchantment?:        ConditionEnchantment | null;
    IsNot?:              boolean;
    Sizes?:              Size[];
    Tiers?:              Tier[];
    Id?:                 string;
    AttributeType?:      AttributeType;
    IsSameAsPlayerHero?: boolean;
}

export interface Condition9 {
    $type:        ConditionType;
    Tags?:        Tag[];
    Operator?:    Operator;
    Enchantment?: null;
    IsNot?:       boolean;
}

export interface DeadlyAttributes {
    Custom_5?: number;
}

export interface DeadlyAuras {
    e1?: FluffyE1;
    e2?: FluffyE2;
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
    Target:        ActionSubject;
}

export type E1ID = "e1" | "e9";

export interface FluffyPrerequisite {
    $type:      PrerequisiteType;
    Subject:    AmbitiousTarget;
    Comparison: Comparison;
    Amount:     number;
}

export interface AmbitiousTarget {
    $type:          SourceType;
    Conditions:     Conditions3 | null;
    TargetMode?:    TargetMode;
    Origin?:        TargetMode;
    IncludeOrigin?: boolean;
}

export interface Conditions3 {
    $type:       ConditionType;
    Tags?:       Tag[];
    Operator?:   Operator;
    Conditions?: TentacledCondition[];
}

export interface FluffyE2 {
    Id:                  string;
    ActiveIn:            ActiveIn;
    Action:              StickyAction;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface StickyAction {
    $type:         PurpleType;
    AttributeType: AttributeType;
    Operation:     Operation;
    Value:         ComparisonValue;
    Target:        AmbitiousTarget;
}

export type HiddenTag = "HealthMax" | "Health" | "Poison" | "Burn" | "Income" | "Cooldown" | "Heal" | "Value" | "EconomyReference" | "Damage" | "BurnReference" | "Slow" | "Active" | "Shield" | "DamageReference" | "CritReference" | "Gold" | "Passive" | "NonWeapon" | "Multicast" | "HealReference" | "ShieldReference" | "HasteReference" | "Freeze" | "Haste" | "Crit" | "Regen" | "AmmoReference" | "Charge" | "JoyReference" | "PoisonReference" | "Ammo" | "SlowReference" | "Joy" | "HealthReference" | "FreezeReference" | "RegenReference" | "Toughness" | "Lifesteal" | "Unsellable" | "Experience";

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
    e2?: TentacledE2;
}

export interface TentacledE1 {
    Id:                  string;
    Trigger:             TentacledTrigger;
    ActiveIn:            ActiveIn;
    Action:              IndigoAction;
    Prerequisites:       PurplePrerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface IndigoAction {
    $type:            PurpleType;
    ReferenceValue?:  null;
    Target:           ActionSubject;
    Value?:           IndecentValue;
    AttributeType?:   AttributeType;
    Operation?:       Operation;
    Duration?:        FluffyDuration | null;
    TargetCount?:     null;
    Enchantment?:     string;
    PreventOverride?: boolean;
}

export interface IndecentValue {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        CunningTarget;
    AttributeType?: AttributeType;
    DefaultValue?:  number;
    Modifier?:      ComparisonValueModifier | null;
}

export interface CunningTarget {
    $type:          SourceType;
    Conditions:     Conditions4 | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export interface Conditions4 {
    $type:         ConditionType;
    AttributeType: AttributeType;
}

export interface TentacledTrigger {
    $type:             TriggerType;
    Subject?:          ActionSubject;
    AttributeType?:    AttributeType;
    ChangeType?:       ChangeType;
    Source?:           null;
    Target?:           ComparisonValueSubject | null;
    AttributeChanged?: AttributeType;
    PreviousValue?:    null;
    CurrentValue?:     null;
    CombatType?:       null;
}

export interface TentacledE2 {
    Id:                  E2ID;
    Trigger:             StickyTrigger;
    ActiveIn:            ActiveIn;
    Action:              IndecentAction;
    Prerequisites:       The3_Prerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface IndecentAction {
    $type:           PurpleType;
    Value?:          ComparisonValue;
    AttributeType?:  AttributeType;
    Operation?:      Operation;
    Duration?:       FluffyDuration;
    TargetCount?:    null;
    Target:          Source;
    ReferenceValue?: null;
}

export interface The3_Prerequisite {
    $type:   PrerequisiteType;
    Subject: ComparisonValueSubject;
}

export interface StickyTrigger {
    $type:             TriggerType;
    Subject?:          Source;
    AttributeType?:    AttributeType;
    ChangeType?:       ChangeType;
    Source?:           null;
    AttributeChanged?: AttributeType;
    PreviousValue?:    null;
    CurrentValue?:     null;
    Target?:           null;
}

export interface FieryAttributes {
    BurnApplyAmount?: number;
    Custom_4?:        number;
    Custom_5?:        number;
}

export interface FieryAuras {
    e2?: StickyE2;
    e1?: StickyE1;
    e3?: PurpleE3;
}

export interface StickyE1 {
    Id:                  E1ID;
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
    $type:         TentacledType;
    AttributeType: AttributeType;
    Operation:     Operation;
    Value:         Limit;
    Target:        MagentaTarget;
}

export interface MagentaTarget {
    $type:          SourceType;
    Conditions:     StickyCondition | null;
    TargetMode?:    TargetMode;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Origin?:        TargetMode;
    IncludeOrigin?: boolean;
}

export interface StickyE2 {
    Id:                  E2ID;
    ActiveIn:            ActiveIn;
    Action:              AmbitiousAction;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: FluffyInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface AmbitiousAction {
    $type:         PurpleType;
    AttributeType: AttributeType;
    Operation:     Operation;
    Value:         HilariousValue;
    Target:        ConditionsClass;
}

export interface HilariousValue {
    $type:          ComparisonValueType;
    Target?:        FriskyTarget;
    AttributeType?: AttributeType;
    DefaultValue?:  number;
    Modifier?:      ComparisonValueModifier;
    Distinct?:      boolean;
    Value?:         number;
}

export interface FriskyTarget {
    $type:          SourceType;
    Conditions:     StickyCondition | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export type FluffyInternalDescription = "Sets the value of burn" | "Sets the value of Burn" | "" | "Burn 1 for each non-Weapon item you have." | "Burn 1 for each Aquatic or Toy item you have." | "Sets the value of shield" | "Sets the value of Shield" | "Sets the value of ShieldApplyAmount" | "Shield 8 for each non-Weapon item you have." | "Sets Shield" | "Shield 10 for each Aquatic or Toy item you have." | "Sets the value of Shielded Test Subject Alpha" | "Sets the value of Shielded The Boulder" | "Deal 10 damage for each Unique type you have." | "Deal 8 damage for each non-Weapon item you have." | "Obsidian 2" | "Deal 10 Damage for each Aquatic or Toy item you have." | "Sets the value of Damage" | "Sets the value of poison" | "Sets the value of Poison" | "Poison 1 for each non-Weapon item you have." | "Sets the value of heal" | "Poison 1 for each Aquatic or Toy item you have.";

export interface PurpleE3 {
    Id:                  E2ID;
    ActiveIn:            ActiveIn;
    Action:              CunningAction;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      PurpleTranslationKey;
}

export interface CunningAction {
    $type:         PurpleType;
    AttributeType: AttributeType;
    Operation:     Operation;
    Value:         FluffyValue;
    Target:        TargetPlayer;
}

export type PurpleTranslationKey = "b7b4b93275c7490d6e2b0997872ba2e1" | "93826b7b7a154c7823629388e16a3823" | "979608f87a0c2ed7baf5d05e4ee935f1" | "e45684454d745b0e77f71face9b2ebb6" | "94b6b97fa820b28535181c40302b5363";

export interface Golden {
    Attributes:   Attributes;
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
}

export interface IndigoE1 {
    Id:                  E1ID;
    Trigger:             IndigoTrigger;
    ActiveIn:            ActiveIn;
    Action:              MagentaAction;
    Prerequisites:       null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: TentacledInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface MagentaAction {
    $type:          PurpleType;
    AttributeType?: AttributeType;
    Value?:         PurpleValue;
    Operation?:     Operation;
    Duration?:      null;
    Target?:        Source;
    TargetPlayer?:  Source;
    SpawnContext?:  FluffySpawnContext;
    TargetCount?:   null;
}

export interface FluffySpawnContext {
    $type: SpawnContextType;
    Limit: ComparisonValue;
}

export type TentacledInternalDescription = "Golden 1" | "Shiny 1" | "" | "Golden 100" | "At the start of each fight double value" | "Golden 0";

export interface IndigoTrigger {
    $type:          TriggerType;
    Subject:        TargetPlayer;
    AttributeType?: AttributeType;
    ChangeType?:    ChangeType;
    Source?:        null;
}

export interface Attributes {
}

export interface GoldenAuras {
    e1?: IndecentE1;
}

export interface IndecentE1 {
    Id:                  E1ID;
    ActiveIn:            ActiveIn;
    Action:              FriskyAction;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: TentacledInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface FriskyAction {
    $type:         TentacledType;
    AttributeType: AttributeType;
    Operation:     Operation;
    Value:         PurpleValue;
    Target:        ActionSubject;
}

export interface Heavy {
    Attributes:   HeavyAttributes;
    Abilities:    HeavyAbilities;
    Auras:        HeavyAuras;
    Tags:         any[];
    HiddenTags:   HiddenTag[];
    Localization: DeadlyLocalization;
    HasAbilities: boolean;
    HasAuras:     boolean;
}

export interface HeavyAbilities {
    e1?:  HilariousE1;
    e2?:  IndigoE2;
    "3"?: The3;
}

export interface The3 {
    Id:                  string;
    Trigger:             The3_Trigger;
    ActiveIn:            ActiveIn;
    Action:              The3_Action;
    Prerequisites:       The3_Prerequisite[];
    Priority:            Priority;
    InternalName:        The3_InternalName;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface The3_Action {
    $type:          PurpleType;
    TargetCount?:   null;
    Target?:        ConditionsClass;
    Value?:         ComparisonValue | null;
    AttributeType?: AttributeType;
    Operation?:     Operation;
    Duration?:      FluffyDuration | null;
    TargetPlayer?:  TargetPlayer;
    SpawnContext?:  FluffySpawnContext;
}

export type The3_InternalName = "Counter Increment" | "Heavy Hogwash Ability 2" | "" | "Turbo Hogwash Ability 2";

export interface The3_Trigger {
    $type:         TriggerType;
    Subject:       ComparisonValueSubject;
    AttributeType: AttributeType;
    ChangeType:    ChangeType;
    Source:        null;
}

export interface HilariousE1 {
    Id:                  string;
    Trigger:             IndecentTrigger;
    ActiveIn:            ActiveIn;
    Action:              MischievousAction;
    Prerequisites:       PurplePrerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: StickyInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface MischievousAction {
    $type:            PurpleType;
    Value?:           ComparisonValue | null;
    TargetCount:      null;
    Target:           ActionSubject;
    AttributeType?:   AttributeType;
    Operation?:       Operation;
    Duration?:        null;
    Enchantment?:     string;
    PreventOverride?: boolean;
}

export type StickyInternalDescription = "" | "Heavy" | "If the item is not enchanted, enchant it with Heavy if able." | "Turbo" | "Turbo 2" | "Turbo 3" | "If the item is not enchanted, enchant it with Turbo if able.";

export interface IndecentTrigger {
    $type:          TriggerType;
    Subject?:       ActionSubject;
    AttributeType?: AttributeType;
    ChangeType?:    ChangeType;
    Source?:        null;
    Target?:        ComparisonValueSubject | null;
    CombatType?:    null;
}

export interface IndigoE2 {
    Id:                  E2ID;
    Trigger:             HilariousTrigger;
    ActiveIn:            ActiveIn;
    Action:              BraggadociousAction;
    Prerequisites:       The3_Prerequisite[] | null;
    Priority:            Priority;
    InternalName:        The3_InternalName;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface BraggadociousAction {
    $type:          PurpleType;
    Value:          ComparisonValue | null;
    AttributeType?: AttributeType;
    Operation?:     Operation;
    Duration?:      FluffyDuration;
    TargetCount:    null;
    Target:         MischievousTarget;
}

export interface MischievousTarget {
    $type:          SourceType;
    Conditions:     PurpleCondition | null;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
}

export interface HilariousTrigger {
    $type:          TriggerType;
    CombatType?:    null;
    CombatOutcome?: null;
    Subject?:       TargetPlayer;
    Target?:        null;
    AttributeType?: AttributeType;
    ChangeType?:    ChangeType;
    Source?:        null;
}

export interface HeavyAttributes {
    SlowTargets?: number;
    SlowAmount?:  number;
    Custom_4?:    number;
    Custom_5?:    number;
}

export interface HeavyAuras {
    e1?: E9Class;
}

export interface E9Class {
    Id:                  E1ID;
    ActiveIn:            ActiveIn;
    Action:              E9Action;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface E9Action {
    $type:         PurpleType;
    AttributeType: AttributeType;
    Operation:     Operation;
    Value:         ComparisonValue;
    Target:        ConditionsClass;
}

export interface Icy {
    Attributes:   IcyAttributes;
    Abilities:    IcyAbilities;
    Auras:        HeavyAuras;
    Tags:         any[];
    HiddenTags:   HiddenTag[];
    Localization: DeadlyLocalization;
    HasAbilities: boolean;
    HasAuras:     boolean;
}

export interface IcyAbilities {
    e1?:  AmbitiousE1;
    e2?:  IndecentE2;
    "3"?: The3;
}

export interface AmbitiousE1 {
    Id:                  string;
    Trigger:             AmbitiousTrigger;
    ActiveIn:            ActiveIn;
    Action:              MischievousAction;
    Prerequisites:       PurplePrerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: IndigoInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export type IndigoInternalDescription = "" | "Icy" | "Icy 2" | "If the item is not enchanted, enchant it with Icy if able.";

export interface AmbitiousTrigger {
    $type:          TriggerType;
    Subject?:       ActionSubject;
    AttributeType?: AttributeType;
    ChangeType?:    ChangeType;
    Source?:        null;
    Target?:        Source | null;
    CombatType?:    null;
}

export interface IndecentE2 {
    Id:                  E2ID;
    Trigger:             HilariousTrigger;
    ActiveIn:            ActiveIn;
    Action:              Action1;
    Prerequisites:       The3_Prerequisite[] | null;
    Priority:            Priority;
    InternalName:        PurpleInternalName;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface Action1 {
    $type:          PurpleType;
    Value:          ComparisonValue | null;
    AttributeType?: AttributeType;
    Operation?:     Operation;
    Duration?:      FluffyDuration;
    TargetCount:    null;
    Target:         TargetPlayer;
}

export type PurpleInternalName = "Counter Increment" | "Icy Hogwash Ability 2";

export interface IcyAttributes {
    FreezeTargets?: number;
    FreezeAmount?:  number;
    Custom_4?:      number;
    Custom_8?:      number;
    Custom_5?:      number;
}

export interface Obsidian {
    Attributes:   ObsidianAttributes;
    Abilities:    ObsidianAbilities;
    Auras:        ObsidianAuras;
    Tags:         Tag[];
    HiddenTags:   HiddenTag[];
    Localization: DeadlyLocalization;
    HasAbilities: boolean;
    HasAuras:     boolean;
}

export interface ObsidianAbilities {
    e1?: CunningE1;
    e2?: HilariousE2;
}

export interface CunningE1 {
    Id:                  string;
    Trigger:             TentacledTrigger;
    ActiveIn:            ActiveIn;
    Action:              Action2;
    Prerequisites:       PurplePrerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: IndecentInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface Action2 {
    $type:            PurpleType;
    ReferenceValue?:  null;
    Target:           ActionSubject;
    Value?:           ComparisonValue;
    AttributeType?:   AttributeType;
    Operation?:       Operation;
    Duration?:        FluffyDuration | null;
    TargetCount?:     null;
    Enchantment?:     ConditionEnchantment;
    PreventOverride?: boolean;
}

export type IndecentInternalDescription = "" | "Obsidian" | "Your Aquatic Weapons gain +5 damage for the fight." | "If the item is not enchanted, enchant it with Obsidian if able.";

export interface HilariousE2 {
    Id:                  E2ID;
    Trigger:             HilariousTrigger;
    ActiveIn:            ActiveIn;
    Action:              Action3;
    Prerequisites:       The3_Prerequisite[] | null;
    Priority:            Priority;
    InternalName:        FluffyInternalName;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface Action3 {
    $type:           PurpleType;
    Value?:          ComparisonValue;
    AttributeType?:  AttributeType;
    Operation?:      Operation;
    Duration?:       FluffyDuration | null;
    TargetCount?:    null;
    Target:          TargetPlayer;
    ReferenceValue?: null;
}

export type FluffyInternalName = "Counter Increment" | "Obsidian Hogwash Ability";

export interface ObsidianAttributes {
    DamageAmount?: number;
    Custom_4?:     number;
    Custom_5?:     number;
}

export interface ObsidianAuras {
    e2?: StickyE2;
    e1?: MagentaE1;
    e3?: FluffyE3;
}

export interface MagentaE1 {
    Id:                  E1ID;
    ActiveIn:            ActiveIn;
    Action:              Action4;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: HilariousInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface Action4 {
    $type:         PurpleType;
    AttributeType: AttributeType;
    Operation:     Operation;
    Value:         AmbitiousValue;
    Target:        ActionSubject;
}

export interface AmbitiousValue {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        AmbitiousTarget;
    AttributeType?: AttributeType;
    DefaultValue?:  number;
    Modifier?:      ComparisonValueModifier | null;
}

export type HilariousInternalDescription = "" | "Obsidian 2" | "Obsidian 1";

export interface FluffyE3 {
    Id:                  string;
    ActiveIn:            ActiveIn;
    Action:              Action5;
    Prerequisites:       E3Prerequisite[] | null;
    InternalName:        E3InternalName;
    InternalDescription: E3InternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      FluffyTranslationKey;
}

export interface Action5 {
    $type:         PurpleType;
    AttributeType: AttributeType;
    Operation:     Operation;
    Value:         Limit;
    Target:        ConditionsClass;
}

export type E3InternalDescription = "" | "Original Amount" | "Obsidian" | "Sets the value of Damage";

export type E3InternalName = "Tooltip Handling" | "Obsidian Luxury Tents Aura" | "Obsidian Ledger Aura" | "Obsidian Memento Mori Aura" | "Obsidian Hogwash Aura";

export interface E3Prerequisite {
    $type:      PrerequisiteType;
    Subject:    ConditionsClass;
    Comparison: Comparison;
    Amount:     number;
}

export type FluffyTranslationKey = "9ed8516049000a0e1a90054e0aab06ce" | "a193d872e6cb3a8dc2d05aedb98955c0" | "93911bec96cb67bfcc317e7f7665af7b" | "b7b4b93275c7490d6e2b0997872ba2e1" | "93826b7b7a154c7823629388e16a3823";

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
    e1?: FriskyE1;
    e2?: AmbitiousE2;
}

export interface FriskyE1 {
    Id:                  string;
    Trigger:             CunningTrigger;
    ActiveIn:            ActiveIn;
    Action:              MischievousAction;
    Prerequisites:       null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: AmbitiousInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export type AmbitiousInternalDescription = "When this item gains Freeze, remove Freeze from it." | "Radiant" | "When this item gains Haste, remove Haste from it." | "If the item is not enchanted, enchant it with Radiant if able.";

export interface CunningTrigger {
    $type:             TriggerType;
    Subject:           AmbitiousTarget;
    AttributeChanged?: AttributeType;
    ChangeType?:       ChangeType;
    PreviousValue?:    null;
    CurrentValue?:     null;
    Source?:           null;
}

export interface AmbitiousE2 {
    Id:                  E2ID;
    Trigger:             MagentaTrigger;
    ActiveIn:            ActiveIn;
    Action:              The3_Action;
    Prerequisites:       null;
    Priority:            Priority;
    InternalName:        TentacledInternalName;
    InternalDescription: CunningInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      E2TranslationKey;
}

export type CunningInternalDescription = "When this item gains Slow, remove Slow from it.";

export type TentacledInternalName = "Radiant Slow" | "Radiant Dooltron";

export type E2TranslationKey = "db02baf95ec3866b3bcf0761025fd005";

export interface MagentaTrigger {
    $type:            TriggerType;
    Subject:          ConditionsClass;
    AttributeChanged: AttributeType;
    ChangeType:       ChangeType;
    PreviousValue:    null;
    CurrentValue:     null;
    Source:           null;
}

export interface Restorative {
    Attributes:   RestorativeAttributes;
    Abilities:    FieryAbilities;
    Auras:        RestorativeAuras;
    Tags:         any[];
    HiddenTags:   HiddenTag[];
    Localization: DeadlyLocalization;
    HasAbilities: boolean;
    HasAuras:     boolean;
}

export interface RestorativeAttributes {
    HealAmount?:       number;
    Custom_4?:         number;
    Custom_5?:         number;
    RegenApplyAmount?: number;
}

export interface RestorativeAuras {
    e1?: StickyE1;
    e2?: CunningE2;
    e3?: TentacledE3;
}

export interface CunningE2 {
    Id:                  E2ID;
    ActiveIn:            ActiveIn;
    Action:              Action6;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: InternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface Action6 {
    $type:         PurpleType;
    AttributeType: AttributeType;
    Operation:     Operation;
    Value:         CunningValue;
    Target:        ConditionsClass;
}

export interface CunningValue {
    $type:          ComparisonValueType;
    Target:         TargetPlayer;
    AttributeType?: AttributeType;
    DefaultValue:   number;
    Modifier:       ComparisonValueModifier;
    Distinct?:      boolean;
}

export interface TentacledE3 {
    Id:                  E2ID;
    ActiveIn:            ActiveIn;
    Action:              Action7;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      PurpleTranslationKey;
}

export interface Action7 {
    $type:         PurpleType;
    AttributeType: AttributeType;
    Operation:     Operation;
    Value:         Limit;
    Target:        TargetPlayer;
}

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
    e2?: MagentaE2;
}

export interface MischievousE1 {
    Id:                  string;
    Trigger:             IndecentTrigger;
    ActiveIn:            ActiveIn;
    Action:              IndigoAction;
    Prerequisites:       PurplePrerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: MagentaInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export type MagentaInternalDescription = "" | "Shielded" | "set " | "Shielded 1" | "If the item is not enchanted, enchant it with Shielded if able.";

export interface MagentaE2 {
    Id:                  E2ID;
    Trigger:             HilariousTrigger;
    ActiveIn:            ActiveIn;
    Action:              IndecentAction;
    Prerequisites:       The3_Prerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: FriskyInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export type FriskyInternalDescription = "" | "Your other Shield items gain +9 Shield for the fight." | "Deal {ability.0} damage to the player with less health.";

export interface ShieldedAttributes {
    ShieldApplyAmount?: number;
    Custom_4?:          number;
    Custom_5?:          number;
}

export interface ShieldedAuras {
    e2?: StickyE2;
    e1?: StickyE1;
    e3?: TentacledE3;
}

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
}

export interface BraggadociousE1 {
    Id:                  string;
    Trigger:             FriskyTrigger;
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
    $type:            PurpleType;
    Enchantment?:     PurpleEnchantment;
    Duration?:        null;
    PreventOverride?: boolean;
    TargetCount?:     null;
    Target?:          ActionSubject;
    ReferenceValue?:  null;
    TargetPlayer?:    TargetPlayer;
    SpawnContext?:    FluffySpawnContext;
}

export interface FriskyTrigger {
    $type:       TriggerType;
    Subject?:    AmbitiousTarget;
    CombatType?: null;
    Source?:     null;
}

export interface ShinyAttributes {
    Multicast?:  number;
    Custom_1?:   number;
    CritChance?: number;
}

export interface ShinyAuras {
    e1?: E11;
    e2?: E3Class;
    e3?: E3Class;
    e9?: E9Class;
    e4?: E3Class;
    e5?: E3Class;
    e6?: E3Class;
}

export interface E11 {
    Id:                  E1ID;
    ActiveIn:            ActiveIn;
    Action:              Action9;
    Prerequisites:       TentacledPrerequisite[] | null;
    InternalName:        string;
    InternalDescription: MischievousInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface Action9 {
    $type:         TentacledType;
    AttributeType: AttributeType;
    Operation:     Operation;
    Value:         AmbitiousValue;
    Target:        BraggadociousTarget;
}

export interface BraggadociousTarget {
    $type:          SourceType;
    Conditions:     Conditions5 | null;
    TargetSection?: TargetSection;
    TargetMode?:    TargetMode;
    ExcludeSelf?:   boolean;
    Origin?:        TargetMode;
    IncludeOrigin?: boolean;
}

export interface Conditions5 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         BraggadociousCondition[];
    Sizes?:              Size[];
    IsNot?:              boolean;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
}

export type MischievousInternalDescription = "Shiny 1" | "Shiny" | "" | "Golden 1" | "Shiny 2" | "Sets the value of burn" | "Deadly 25" | "XP 2x" | "Icy 2" | "Shiny None";

export interface TentacledPrerequisite {
    $type:      PrerequisiteType;
    Subject:    Source;
    Comparison: Comparison;
    Amount:     number;
}

export interface E3Class {
    Id:                  E2ID;
    ActiveIn:            ActiveIn;
    Action:              E4Action;
    Prerequisites:       E3Prerequisite[] | null;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface E4Action {
    $type:         PurpleType;
    AttributeType: AttributeType;
    Operation:     Operation;
    Value:         MagentaValue;
    Target:        AmbitiousTarget;
}

export interface MagentaValue {
    $type:          ComparisonValueType;
    Target?:        AmbitiousTarget;
    AttributeType?: AttributeType;
    DefaultValue?:  number;
    Modifier?:      PurpleModifier | null;
    Value?:         number;
}

export interface Toxic {
    Attributes:   ToxicAttributes;
    Abilities:    FieryAbilities;
    Auras:        FieryAuras;
    Tags:         any[];
    HiddenTags:   HiddenTag[];
    Localization: DeadlyLocalization;
    HasAbilities: boolean;
    HasAuras:     boolean;
}

export interface ToxicAttributes {
    PoisonApplyAmount?: number;
    Custom_4?:          number;
    Custom_5?:          number;
}

export interface Turbo {
    Attributes:   TurboAttributes;
    Abilities:    HeavyAbilities;
    Auras:        HeavyAuras;
    Tags:         any[];
    HiddenTags:   HiddenTag[];
    Localization: DeadlyLocalization;
    HasAbilities: boolean;
    HasAuras:     boolean;
}

export interface TurboAttributes {
    HasteTargets?: number;
    HasteAmount?:  number;
    Custom_4?:     number;
    Custom_8?:     number;
    Custom_5?:     number;
}

export type Hero = "Pygmalien" | "Common" | "Vanessa" | "Dooley" | "Jules" | "Stelle" | "Mak";

export type The200_InternalDescription = "" | "Sells Items" | "Day 1" | "Keep the wallet for yourself." | "Any investment helps!" | "The creature hums with happiness and you feel at peace." | "Spend your time looking for spare change instead of investing." | "Gain a Diamond-tier item" | "The creature purrs with joy and you feel warm inside." | "Sells items" | "You own the circus! What do you want to do with it?" | "Close the circus down and free all the animals." | "You feed the creature and it leads you to an item!" | "Side with the merchant and shoo the customer away." | "Have a nice day :)";

export interface The200_Localization {
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
    Conditions?:  Condition10[];
}

export interface Condition10 {
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

export interface Transform {
    SpawnContext: null;
    Abilities:    TransformAbilities;
}

export interface TransformAbilities {
    t1: T1;
}

export interface T1 {
    Id:                  string;
    Trigger:             T1Trigger;
    ActiveIn:            ActiveIn;
    Action:              T1Action;
    Prerequisites:       null;
    Priority:            Size;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           null;
    TranslationKey:      string;
}

export interface T1Action {
    $type:            PurpleType;
    Enchantment?:     string;
    Duration?:        null;
    PreventOverride?: boolean;
    TargetCount?:     null;
    Target?:          ConditionsClass;
    TargetPlayer?:    TargetPlayer;
    SpawnContext?:    FluffySpawnContext;
}

export interface T1Trigger {
    $type: TriggerType;
}

export type Version = "2.0.0";
