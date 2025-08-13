export interface CardsD {
    "5.0.0": The500[];
}

export interface The500 {
    $type:                         The500_$Type;
    StartingTier:                  Tier;
    Tiers?:                        The500_Tiers;
    Type:                          Type;
    Id:                            string;
    Version:                       Version;
    InternalName:                  string;
    InternalDescription:           The500_InternalDescription | null;
    Size:                          Size;
    Heroes:                        Hero[];
    Tags:                          Tag[];
    HiddenTags:                    HiddenTag[];
    ArtKey:                        string;
    TranslationKey:                string;
    AudioKey:                      null | string;
    Localization:                  The500_Localization;
    Abilities:                     { [key: string]: Ability };
    Auras:                         { [key: string]: Aura };
    CombatantType?:                CombatantType;
    RewardCombatGold?:             number;
    RewardCombatXp?:               number;
    RewardVictory?:                RewardDefeatClass;
    RewardDefeat?:                 RewardDefeatClass;
    ExperienceAwardUponSelection?: number;
    Attributes?:                   The500_Attributes | null;
    Enchantments?:                 Enchantments | null;
    Transform?:                    Transform | null;
    Quests?:                       Quest[] | null;
    IsReselectable?:               boolean;
    SelectionContext?:             SelectionContext | null;
    SelectionRequirements?:        null;
    SelectionCriteria?:            SelectionCriteria;
}

export type The500_$Type = "TCardSkill" | "TCardEncounterCombat" | "TCardItem" | "TCardEncounterStep" | "TCardEncounterEvent" | "TCardEncounterPedestal";

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
    WorksIn:             WorksIn;
}

export interface AbilityAction {
    $type:            PurpleType;
    Value?:           FluffyValue | null;
    AttributeType?:   string;
    Operation?:       Operation;
    Duration?:        PurpleDuration | null;
    TargetCount?:     Limit | null;
    Target?:          PurpleTarget;
    ReferenceValue?:  null;
    SpawnContext?:    PurpleSpawnContext;
    UpgradeToTier?:   Tier | null;
    TargetPlayer?:    SourceClass;
    Enchantment?:     EnchantmentEnum;
    PreventOverride?: boolean;
    Abilities?:       null;
    Enchantments?:    EnchantmentElement[];
    Tags?:            Tag[];
    Source?:          Source;
}

export type PurpleType = "TActionCardModifyAttribute" | "TActionPlayerDamage" | "TActionCardFlyingStart" | "TActionGameDealCards" | "TActionCardUpgrade" | "TActionPlayerShieldApply" | "TActionPlayerModifyAttribute" | "TActionCardHaste" | "TActionCardFlyingToggle" | "TActionCardCharge" | "TActionPlayerPoisonApply" | "TActionPlayerJoyApply" | "TActionGameSpawnCards" | "TActionCardDisable" | "TActionPlayerBurnApply" | "TActionPlayerHeal" | "TActionCardEnchant" | "TActionCardTransform" | "TActionCardFreeze" | "TActionCardFlyingStop" | "TActionPlayerRegenApply" | "TActionExitReplacementSet" | "TActionCardSlow" | "TActionCardForceUse" | "TActionCardEnchantRandom" | "TActionPlayerPoisonRemove" | "TActionCardAddTagsList" | "TActionCardReload" | "TActionCardBeginSandstorm" | "TActionPlayerReviveHeal" | "TActionCardEnchantRemove" | "TActionPlayerBurnRemove" | "TActionCardAddTagsBySource" | "TActionCardDestroy" | "TAuraActionCardModifyAttribute";

export interface PurpleDuration {
    $type:         DurationType;
    DurationType?: DurationTypeEnum;
    DurationInMs?: number;
}

export type DurationType = "TDeterminantDuration" | "TCombatDuration";

export type DurationTypeEnum = "UntilEndOfCombat" | "UntilEndOfDay";

export type EnchantmentEnum = "Golden" | "Heavy" | "Icy" | "Turbo" | "Shielded" | "Restorative" | "Toxic" | "Fiery" | "Shiny" | "Deadly" | "Radiant" | "Obsidian" | "Mystical" | "Ethereal";

export interface EnchantmentElement {
    Enchantment: EnchantmentEnum;
    Weight:      number;
}

export type Operation = "Add" | "Subtract" | "Multiply";

export interface Source {
    $type:          SourceType;
    Origin?:        Origin;
    TargetMode?:    Origin;
    IncludeOrigin?: boolean;
    Conditions:     PurpleConditions | null;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
}

export type SourceType = "TTargetCardPositional" | "TTargetCardSelf" | "TTargetPlayerAbsolute" | "TTargetCardTriggerSource" | "TTargetPlayerRelative" | "TTargetCardSection" | "TTargetCardRandom" | "TTargetCardXMost" | "TTargetPlayer" | "TCardConditionalAnd" | "TCardConditionalOr";

export interface PurpleConditions {
    $type:               ConditionType;
    Conditions?:         PurpleCondition[];
    Tags?:               Tag[];
    Operator?:           Operator;
    Enchantment?:        null;
    IsNot?:              boolean;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    PurpleComparisonValue;
    Tiers?:              Tier[];
    Heroes?:             Hero[];
    CardType?:           Type;
    Sizes?:              Size[];
    AttributeType?:      AttributeChanged;
    Id?:                 string;
}

export type ConditionType = "TCardConditionalAnd" | "TCardConditionalTag" | "TCardConditionalHiddenTag" | "TCardConditionalHasEnchantment" | "TCardConditionalAttribute" | "TCardConditionalTier" | "TPlayerConditionalAttribute" | "TCardConditionalHero" | "TCardConditionalType" | "TCardConditionalSize" | "TCardConditionalAttributeLowest" | "TCardConditionalId" | "TCardConditionalEnchantmentEligible" | "TCardConditionalCanCrit" | "TCardConditionalAttributeHighest" | "TCardConditionalTriggerSource" | "TCardConditionalOr" | "TCardConditionalPlayerHero" | "TTargetCardSelf";

export type AttributeChanged = "Custom_1" | "HealthMax" | "Health" | "Custom_0" | "Poison" | "Burn" | "DamageAmount" | "Income" | "SellPrice" | "Level" | "Custom_2" | "Gold" | "AmmoMax" | "CooldownMax" | "RegenApplyAmount" | "BurnApplyAmount" | "Custom_4" | "PercentDamageReduction" | "PoisonApplyAmount" | "Custom_3" | "Multicast" | "EnchantTargets" | "Custom_8" | "Shield" | "Joy" | "CritChance" | "HealthRegen" | "Ammo" | "ShieldApplyAmount" | "HealAmount" | "Custom_5" | "Flying" | "Lifesteal" | "Haste" | "Freeze" | "Slow" | "Heal" | "Damage" | "Regeneration" | "FlatCooldownReduction";

export type Type = "Item" | "Skill" | "CombatEncounter" | "EncounterStep" | "EventEncounter" | "PedestalEncounter";

export type Comparison = "Equal" | "GreaterThan" | "LessThan" | "GreaterThanOrEqual" | "LessThanOrEqual" | "NotEqual";

export interface PurpleComparisonValue {
    $type:          ComparisonValueType;
    Target?:        ComparisonValueSubject;
    AttributeType?: AttributeChanged;
    DefaultValue?:  number;
    Modifier?:      PurpleModifier | null;
    Value?:         number;
}

export type ComparisonValueType = "TReferenceValueCardAttribute" | "TFixedValue" | "TReferenceValuePlayerAttribute" | "TReferenceValuePlayerAttributeChange" | "TReferenceValueCardCount" | "TRangeValue" | "TReferenceValueCardAttributeAggregate" | "TReferenceValueCardTagCount";

export interface PurpleModifier {
    ModifyMode:  Operation;
    Value:       ComparisonValue;
    ShouldRound: boolean;
}

export interface ComparisonValue {
    $type: ComparisonValueType;
    Value: number;
}

export interface ComparisonValueClass {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        ComparisonValueSubject;
    AttributeType?: AttributeChanged;
    DefaultValue?:  number;
    Modifier?:      PurpleModifier;
}

export interface FluffyConditions {
    $type:              ConditionType;
    Attribute:          AttributeChanged;
    ComparisonOperator: Comparison;
    ComparisonValue:    ComparisonValueClass;
}

export interface ComparisonValueSubject {
    $type:       SourceType;
    TargetMode?: Origin;
    Conditions:  FluffyConditions | null;
}

export type Origin = "Self" | "Opponent" | "LeftCard" | "Player" | "RightCard" | "Neighbor" | "LeftMostCard" | "RightMostCard" | "Both" | "AllRightCards" | "AllLeftCards";

export interface PurpleCondition {
    $type:               ConditionType;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Tiers?:              Tier[];
    Tags?:               Tag[];
    Operator?:           Operator;
    Heroes?:             Hero[];
    Enchantment?:        EnchantmentEnum;
    CardType?:           Type;
}

export type Hero = "Mak" | "Common" | "Vanessa" | "Jules" | "Pygmalien" | "Stelle" | "Dooley" | "Hero7";

export type Operator = "Any" | "None";

export type Size = "Small" | "Large" | "Medium";

export type Tag = "Potion" | "Core" | "Food" | "Shield" | "Heal" | "Weapon" | "Poison" | "Burn" | "Property" | "Tech" | "Friend" | "Regen" | "Tool" | "Relic" | "Freeze" | "Drone" | "Vehicle" | "Dinosaur" | "Aquatic" | "Reagent" | "Toy" | "Dragon" | "Slow" | "Apparel" | "Ray" | "Haste" | "Joy" | "Damage" | "Merchant" | "Loot" | "Key" | "Map" | "Quest";

export type Tier = "Diamond" | "Legendary" | "Bronze" | "Silver" | "Gold";

export type TargetSection = "SelfBoard" | "SelfHand" | "SelfHandAndStash" | "OpponentHand" | "OpponentBoard" | "AbsolutePlayerHand" | "AllHands" | "AbsolutePlayerHandAndStash" | "AbsoluteOpponentHand" | "SelfNeighbors" | "AbsolutePlayerSkills" | "SelfStash";

export interface PurpleSpawnContext {
    $type: SpawnContextType;
    Limit: Limit;
}

export type SpawnContextType = "TSpawnContextQuery";

export interface Limit {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        TargetClass;
    AttributeType?: AttributeChanged;
    DefaultValue?:  number;
    Modifier?:      LimitModifier | null;
}

export interface TargetCountClass {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        TargetClass;
    AttributeType?: AttributeChanged;
    DefaultValue?:  number;
    Modifier?:      LimitModifier | null;
}

export interface FluffyModifier {
    ModifyMode:  Operation;
    Value:       TargetCountClass;
    ShouldRound: boolean;
}

export interface FluffyComparisonValue {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        TargetClass;
    AttributeType?: AttributeChanged;
    DefaultValue?:  number;
    Modifier?:      FluffyModifier | null;
}

export interface TentacledConditions {
    $type:               ConditionType;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    FluffyComparisonValue;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Enchantment?:        EnchantmentEnum;
}

export interface TargetClass {
    $type:      SourceType;
    Conditions: FluffyCondition[] | TentacledConditions | null;
}

export interface PurpleValue {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        TargetClass;
    AttributeType?: AttributeChanged;
    DefaultValue?:  number;
    Modifier?:      PurpleModifier;
}

export interface LimitModifier {
    ModifyMode:  Operation;
    Value:       PurpleValue;
    ShouldRound: boolean;
}

export interface FluffyCondition {
    $type:               ConditionType;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Tags?:               Tag[];
    Operator?:           Operator;
    Tiers?:              Tier[];
    Heroes?:             Hero[];
    Enchantment?:        EnchantmentEnum;
}

export interface PurpleTarget {
    $type:          SourceType;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Conditions:     FluffyCondition[] | StickyConditions | null;
    TargetMode?:    Origin;
    Origin?:        PurpleOrigin;
    IncludeOrigin?: boolean;
}

export interface StickyConditions {
    $type:               ConditionType;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TentacledComparisonValue;
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         TentacledCondition[];
    IsNot?:              boolean;
    Enchantment?:        EnchantmentEnum | null;
    Tiers?:              Tier[];
    AttributeType?:      AttributeChanged;
    Id?:                 string;
    Sizes?:              Size[];
    Heroes?:             Hero[];
    CardType?:           Type;
    IsSameAsPlayerHero?: boolean;
}

export interface TentacledComparisonValue {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        ComparisonValueTarget;
    AttributeType?: AttributeChanged;
    DefaultValue?:  number;
    Modifier?:      TentacledModifier | null;
}

export interface TentacledModifier {
    ModifyMode:  Operation;
    Value:       Limit;
    ShouldRound: boolean;
}

export interface StickyComparisonValue {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        ComparisonValueTarget;
    AttributeType?: AttributeChanged;
    DefaultValue?:  number;
    Modifier?:      TentacledModifier | null;
}

export interface IndigoConditions {
    $type:               ConditionType;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    StickyComparisonValue;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Enchantment?:        EnchantmentEnum;
}

export interface ComparisonValueTarget {
    $type:       SourceType;
    TargetMode?: Origin;
    Conditions:  FluffyCondition[] | IndigoConditions | null;
}

export interface TentacledCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Sizes?:              Size[];
    Conditions?:         StickyCondition[];
    CardType?:           Type;
    Enchantment?:        EnchantmentEnum | null;
    Heroes?:             Hero[];
    Id?:                 string;
    AttributeType?:      AttributeChanged;
}

export interface StickyCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    AttributeType?:      AttributeChanged;
    IsNot?:              boolean;
    Enchantment?:        null;
    Conditions?:         IndigoCondition[];
}

export interface IndigoCondition {
    $type:               ConditionType;
    Conditions?:         IndecentCondition[];
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    IsNot?:              boolean;
    AttributeType?:      AttributeChanged;
    Enchantment?:        null;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
}

export interface IndecentCondition {
    $type:               ConditionType;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Heroes?:             Hero[];
    CardType?:           Type;
    Sizes?:              Size[];
    Conditions?:         HilariousCondition[];
    AttributeType?:      AttributeChanged;
}

export interface Condition {
    $type:          ConditionType;
    Tags?:          Tag[];
    Operator?:      Operator;
    Conditions?:    HilariousCondition[];
    AttributeType?: AttributeChanged;
}

export interface HilariousCondition {
    $type:               ConditionType;
    Conditions?:         Condition[];
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
}

export type PurpleOrigin = "Self" | "TriggerSource";

export interface SourceClass {
    $type:          SourceType;
    TargetMode?:    Origin;
    Conditions:     IndecentConditions | null;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
}

export interface IndecentConditions {
    $type:               ConditionType;
    Conditions?:         PurpleCondition[];
    Heroes?:             Hero[];
    Operator?:           Operator;
    Tags?:               Tag[];
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    IndigoComparisonValue;
    AttributeType?:      AttributeChanged;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Id?:                 string;
    Tiers?:              Tier[];
    CardType?:           Type;
}

export interface IndigoComparisonValue {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        ComparisonValueSubject;
    AttributeType?: AttributeChanged;
    DefaultValue?:  number;
    Modifier?:      PurpleModifier | null;
}

export interface FluffyValue {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        TentacledTarget;
    AttributeType?: AttributeChanged;
    DefaultValue?:  number;
    Modifier?:      StickyModifier | null;
    MinValue?:      number;
    MaxValue?:      number;
}

export interface StickyModifier {
    ModifyMode:  Operation;
    Value:       TentacledValue;
    ShouldRound: boolean;
}

export interface TentacledValue {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        FluffyTarget;
    AttributeType?: AttributeChanged;
    DefaultValue?:  number;
    Modifier?:      LimitModifier | null;
}

export interface FluffyTarget {
    $type:          SourceType;
    Conditions:     FluffyCondition[] | HilariousConditions | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    TargetMode?:    Origin;
}

export interface HilariousConditions {
    $type:               ConditionType;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    StickyComparisonValue;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Enchantment?:        EnchantmentEnum;
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         PurpleCondition[];
    Heroes?:             Hero[];
    CardType?:           Type;
    Sizes?:              Size[];
    AttributeType?:      AttributeChanged;
    Id?:                 string;
}

export interface TentacledTarget {
    $type:          SourceType;
    Conditions:     FluffyCondition[] | AmbitiousConditions | null;
    TargetMode?:    Origin;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Origin?:        Origin;
    IncludeOrigin?: boolean;
}

export interface AmbitiousConditions {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TentacledComparisonValue;
    AttributeType?:      AttributeChanged;
    Conditions?:         AmbitiousCondition[];
    Heroes?:             Hero[];
    IsNot?:              boolean;
    Enchantment?:        EnchantmentEnum | null;
    Tiers?:              Tier[];
    CardType?:           Type;
    Sizes?:              Size[];
    Id?:                 string;
}

export interface AmbitiousCondition {
    $type:               ConditionType;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Tags?:               Tag[];
    Operator?:           Operator;
    Tiers?:              Tier[];
    Heroes?:             Hero[];
    Conditions?:         Condition[];
    Id?:                 string;
    Enchantment?:        EnchantmentEnum;
    CardType?:           Type;
}

export type ActiveIn = "HandOnly" | "HandAndStash";

export interface AbilityPrerequisite {
    $type:           PrerequisiteType;
    Subject?:        PurpleSubject;
    Comparison?:     Comparison;
    Amount?:         number;
    Conditions?:     PrerequisiteConditions;
    SubjectOther?:   null;
    Attribute?:      AttributeChanged;
    AttributeOther?: AttributeChanged;
}

export type PrerequisiteType = "TPrerequisiteCardCount" | "TPrerequisiteRun" | "TPrerequisitePlayer" | "TPrerequisiteCardAttributeComparator";

export interface PrerequisiteConditions {
    $type:              FluffyType;
    CurrentDay:         number;
    ComparisonOperator: Comparison;
}

export type FluffyType = "TRunConditionalCurrentDay";

export interface PurpleSubject {
    $type:          SourceType;
    Conditions:     FluffyCondition[] | CunningConditions | null;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
    TargetMode?:    Origin;
    Origin?:        Origin;
    IncludeOrigin?: boolean;
}

export interface CunningConditions {
    $type:               ConditionType;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    StickyComparisonValue;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         CunningCondition[];
    Tiers?:              Tier[];
    Id?:                 string;
    Heroes?:             Hero[];
    CardType?:           Type;
    AttributeType?:      AttributeChanged;
    Enchantment?:        EnchantmentEnum;
}

export interface CunningCondition {
    $type:               ConditionType;
    Id?:                 string;
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         HilariousCondition[];
    AttributeType?:      AttributeChanged;
    Tiers?:              Tier[];
    Heroes?:             Hero[];
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Enchantment?:        EnchantmentEnum;
    Sizes?:              Size[];
    CardType?:           Type;
}

export type Priority = "Low" | "Medium" | "High" | "Immediate" | "Highest" | "Lowest";

export interface AbilityTrigger {
    $type:             TriggerType;
    Subject?:          FluffySubject;
    Source?:           TargetClass | null;
    CombatType?:       null | string;
    Conditions?:       Condition;
    Target?:           SourceClass | null;
    AttributeChanged?: AttributeChanged;
    ChangeType?:       ChangeType;
    PreviousValue?:    PreviousValue | null;
    CurrentValue?:     null;
    ExcludeFusion?:    boolean;
    AttributeType?:    AttributeChanged;
    CombatOutcome?:    CombatOutcome | null;
    Triggers?:         PurpleTrigger[];
}

export type TriggerType = "TTriggerOnItemUsed" | "TTriggerOnCardFired" | "TTriggerOnCardStartedFlying" | "TTriggerOnFightStarted" | "TTriggerOnCardSelected" | "TTriggerOnEncounterSelected" | "TTriggerOnCardPerformedBurn" | "TTriggerOnCardCritted" | "TTriggerOnCardPerformedSlow" | "TTriggerOnCardAttributeChanged" | "TTriggerOnPlayerDied" | "TTriggerOnSandstorm" | "TTriggerOnCardPerformedOverHeal" | "TTriggerOnCardPerformedPoison" | "TTriggerOnCardUpgraded" | "TTriggerOnPlayerAttributeChanged" | "TTriggerOnDayStarted" | "TTriggerOnCardPurchased" | "TTriggerOnCardSold" | "TTriggerOnCardPerformedHeal" | "TTriggerOnCardPerformedFreeze" | "TTriggerOnCardPerformedDestruction" | "TTriggerOnFightEnded" | "TTriggerOnCardPerformedShield" | "TTriggerOnCardPerformedHaste" | "TTriggerOr" | "TTriggerOnHourStarted" | "TTriggerOnCardPerformedRegen" | "TTriggerOnCardTransformed" | "TTriggerOnCardStoppedFlying" | "TTriggerOnBeforeCardDestroyed" | "TTriggerOnBeforeItemUsed" | "TTriggerOnCardPerformedReload" | "TTriggerOnCardPerformedDamage" | "TTriggerOnCardReloaded" | "TTriggerOnCardStartsFlying" | "TTriggerOnCardQuestCompleted";

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
    Conditions:     FluffyCondition[] | MagentaConditions | null;
    Origin?:        PurpleOrigin;
    TargetMode?:    Origin;
    IncludeOrigin?: boolean;
}

export interface MagentaConditions {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TentacledComparisonValue;
    Conditions?:         MagentaCondition[];
    Sizes?:              Size[];
    IsNot?:              boolean;
    CardType?:           Type;
    Heroes?:             Hero[];
    Enchantment?:        EnchantmentEnum | null;
    Tiers?:              Tier[];
    Id?:                 string;
    AttributeType?:      AttributeChanged;
    IsSameAsPlayerHero?: boolean;
}

export interface MagentaCondition {
    $type:               ConditionType;
    CardType?:           Type;
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Sizes?:              Size[];
    Enchantment?:        EnchantmentEnum | null;
    Conditions?:         FriskyCondition[];
    AttributeType?:      AttributeChanged;
    IsSameAsPlayerHero?: boolean;
    Tiers?:              Tier[];
    Id?:                 string;
    Heroes?:             Hero[];
}

export interface FriskyCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Conditions?:         MischievousCondition[];
    Sizes?:              Size[];
    IsNot?:              boolean;
    CardType?:           Type;
    Heroes?:             Hero[];
    Enchantment?:        EnchantmentEnum | null;
    Tiers?:              Tier[];
    Id?:                 string;
    AttributeType?:      AttributeChanged;
    IsSameAsPlayerHero?: boolean;
}

export interface MischievousCondition {
    $type:               ConditionType;
    CardType?:           Type;
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Sizes?:              Size[];
    Enchantment?:        null;
    Conditions?:         BraggadociousCondition[];
    AttributeType?:      AttributeChanged;
    IsSameAsPlayerHero?: boolean;
    Tiers?:              Tier[];
}

export interface BraggadociousCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Heroes?:             Hero[];
    CardType?:           Type;
    Sizes?:              Size[];
    Conditions?:         Condition[];
}

export interface PurpleTrigger {
    $type:          TriggerType;
    Subject?:       TentacledSubject;
    Target?:        null;
    Source?:        null;
    ExcludeFusion?: boolean;
}

export interface TentacledSubject {
    $type:          SourceType;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Conditions:     FriskyConditions | null;
    TargetMode?:    Origin;
    Origin?:        Origin;
    IncludeOrigin?: boolean;
}

export interface FriskyConditions {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    PurpleComparisonValue;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Conditions?:         PurpleCondition[] | TentacledConditions | null;
    Heroes?:             Hero[];
    CardType?:           Type;
    Sizes?:              Size[];
    AttributeType?:      AttributeChanged;
    Id?:                 string;
    Enchantment?:        null;
}

export interface VFXConfig {
    VFXOverrideKey: null | string;
    VFXShouldPlay:  boolean;
    VFXIsTakeover:  boolean;
}

export type WorksIn = "Anywhere" | "CombatOnly" | "OutOfCombatOnly";

export interface The500_Attributes {
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
    VFXConfig:           VFXConfig | null;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface AuraAction {
    $type:          TentacledType;
    AttributeType?: string;
    Operation?:     Operation;
    Value?:         StickyValue;
    Target:         StickyTarget;
    Tags?:          Tag[];
    Source?:        SourceClass;
}

export type TentacledType = "TAuraActionCardModifyAttribute" | "TAuraActionPlayerModifyAttribute" | "TAuraActionCardAddTagsList" | "TAuraActionCardAddTagsBySource";

export interface StickyTarget {
    $type:          SourceType;
    TargetMode?:    Origin;
    Conditions:     FluffyCondition[] | MischievousConditions | null;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
    Origin?:        PurpleOrigin;
    IncludeOrigin?: boolean;
}

export interface MischievousConditions {
    $type:               ConditionType;
    Conditions?:         Condition1[];
    Heroes?:             Hero[];
    Operator?:           Operator;
    Tags?:               Tag[];
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TentacledComparisonValue;
    AttributeType?:      AttributeChanged;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Id?:                 string;
    Tiers?:              Tier[];
    CardType?:           Type;
    Enchantment?:        EnchantmentEnum | null;
    IsSameAsPlayerHero?: boolean;
}

export interface Condition1 {
    $type:               ConditionType;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Heroes?:             Hero[];
    Operator?:           Operator;
    Tags?:               Tag[];
    Sizes?:              Size[];
    IsNot?:              boolean;
    Enchantment?:        EnchantmentEnum | null;
    Tiers?:              Tier[];
    AttributeType?:      AttributeChanged;
    Id?:                 string;
    CardType?:           Type;
    Conditions?:         StickyCondition[];
    IsSameAsPlayerHero?: boolean;
}

export interface StickyValue {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        IndigoTarget;
    AttributeType?: AttributeChanged;
    DefaultValue?:  number;
    Modifier?:      IndigoModifier | null;
    Distinct?:      boolean;
}

export interface IndigoModifier {
    ModifyMode:  Operation;
    Value:       Limit;
    ShouldRound: boolean;
}

export interface IndigoTarget {
    $type:          SourceType;
    Conditions:     FluffyCondition[] | BraggadociousConditions | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    TargetMode?:    Origin;
    Origin?:        PurpleOrigin;
    IncludeOrigin?: boolean;
}

export interface BraggadociousConditions {
    $type:               ConditionType;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TentacledComparisonValue;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Enchantment?:        EnchantmentEnum | null;
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         Condition2[];
    AttributeType?:      AttributeChanged;
    Id?:                 string;
    Sizes?:              Size[];
    Heroes?:             Hero[];
    CardType?:           Type;
    IsSameAsPlayerHero?: boolean;
}

export interface Condition2 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Sizes?:              Size[];
    Conditions?:         Condition3[];
    CardType?:           Type;
    Enchantment?:        EnchantmentEnum | null;
    Heroes?:             Hero[];
    Id?:                 string;
    AttributeType?:      AttributeChanged;
    IsSameAsPlayerHero?: boolean;
}

export interface Condition3 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    AttributeType?:      AttributeChanged;
    IsNot?:              boolean;
    Enchantment?:        null;
    Conditions?:         IndigoCondition[];
    Id?:                 string;
}

export interface AuraPrerequisite {
    $type:       PrerequisiteType;
    Subject:     StickySubject;
    Comparison?: Comparison;
    Amount?:     number;
}

export interface StickySubject {
    $type:          SourceType;
    Origin?:        PurpleOrigin;
    TargetMode?:    Origin;
    IncludeOrigin?: boolean;
    Conditions:     Conditions1 | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export interface Conditions1 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    IndigoComparisonValue;
    Conditions?:         Condition4[];
    Tiers?:              Tier[];
    Heroes?:             Hero[];
    CardType?:           Type;
    AttributeType?:      AttributeChanged;
    Id?:                 string;
    Enchantment?:        EnchantmentEnum | null;
    IsSameAsPlayerHero?: boolean;
}

export interface Condition4 {
    $type:               ConditionType;
    CardType?:           Type;
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    Enchantment?:        EnchantmentEnum | null;
    Conditions?:         Condition5[];
    Id?:                 string;
    Tiers?:              Tier[];
    Heroes?:             Hero[];
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
}

export interface Condition5 {
    $type:               ConditionType;
    Id?:                 string;
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    AttributeType?:      AttributeChanged;
    Conditions?:         HilariousCondition[];
}

export interface CombatantType {
    $type: CombatantTypeType;
    Level: number;
}

export type CombatantTypeType = "TCombatantMonster";

export interface Enchantments {
    Heavy?:       Heavy;
    Icy?:         Icy;
    Turbo?:       Turbo;
    Shielded?:    Shielded;
    Restorative?: Restorative;
    Toxic?:       Fiery;
    Fiery?:       Fiery;
    Shiny?:       Shiny;
    Deadly?:      Deadly;
    Radiant?:     Radiant;
    Obsidian?:    Obsidian;
    Golden?:      Golden;
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
    e3?: PurpleE3;
}

export interface PurpleE1 {
    Id:                  string;
    Trigger:             FluffyTrigger;
    ActiveIn:            ActiveIn;
    Action:              PurpleAction;
    Prerequisites:       E3Prerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: PurpleInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface PurpleAction {
    $type:            PurpleType;
    Value?:           TargetCountClass;
    AttributeType?:   AttributeChanged;
    Operation?:       Operation;
    Duration?:        FluffyDuration | null;
    TargetCount?:     TargetCountClass | null;
    Target?:          IndecentTarget;
    TargetPlayer?:    PurpleTargetPlayer;
    SpawnContext?:    FluffySpawnContext;
    Enchantment?:     EnchantmentEnum;
    PreventOverride?: boolean;
}

export interface FluffyDuration {
    $type:        DurationType;
    DurationType: DurationTypeEnum;
}

export interface FluffySpawnContext {
    $type: SpawnContextType;
    Limit: ComparisonValue;
}

export interface IndecentTarget {
    $type:          SourceType;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Conditions:     Conditions2 | null;
    TargetMode?:    Origin;
    Origin?:        PurpleOrigin;
    IncludeOrigin?: boolean;
}

export interface Conditions2 {
    $type:               ConditionType;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         Condition6[];
    IsNot?:              boolean;
    Enchantment?:        EnchantmentEnum | null;
    Tiers?:              Tier[];
    AttributeType?:      AttributeChanged;
    Id?:                 string;
    Sizes?:              Size[];
    Heroes?:             Hero[];
    CardType?:           Type;
    IsSameAsPlayerHero?: boolean;
}

export interface Condition6 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Sizes?:              Size[];
    Conditions?:         Condition7[];
    CardType?:           Type;
    Enchantment?:        EnchantmentEnum | null;
    Heroes?:             Hero[];
    Id?:                 string;
}

export interface Condition7 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    AttributeType?:      AttributeChanged;
    IsNot?:              boolean;
}

export interface PurpleTargetPlayer {
    $type:          SourceType;
    TargetMode?:    Origin;
    Conditions:     Conditions3 | null;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
}

export interface Conditions3 {
    $type:               ConditionType;
    Conditions?:         FluffyCondition[];
    Heroes?:             Hero[];
    Operator?:           Operator;
    Tags?:               Tag[];
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    IndecentComparisonValue;
    AttributeType?:      AttributeChanged;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Id?:                 string;
}

export interface IndecentComparisonValue {
    $type:          ComparisonValueType;
    Value?:         number | number;
    Target?:        ComparisonValueSubject;
    AttributeType?: AttributeChanged;
    DefaultValue?:  number;
    Modifier?:      PurpleModifier;
}

export type PurpleInternalDescription = "Deadly 5" | "" | "Deadly 50" | "At the start of each day, get a " | "Deadly" | "Deadly 10" | "an enemy's items lose {ability.1} Shield for the fight." | "If the item is not Enchanted, Enchant it with Deadly if able.";

export interface E3Prerequisite {
    $type:      PrerequisiteType;
    Subject:    TargetClass;
    Comparison: Comparison;
    Amount:     number;
}

export interface FluffyTrigger {
    $type:             TriggerType;
    Subject?:          IndigoSubject;
    AttributeType?:    AttributeChanged;
    ChangeType?:       ChangeType;
    Source?:           null;
    AttributeChanged?: AttributeChanged;
    PreviousValue?:    null;
    CurrentValue?:     null;
    Target?:           null;
}

export interface IndigoSubject {
    $type:          SourceType;
    Conditions:     Conditions4 | null;
    TargetMode?:    Origin;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Origin?:        Origin;
    IncludeOrigin?: boolean;
}

export interface Conditions4 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    AttributeType?:      AttributeChanged;
    Conditions?:         Condition8[];
    Heroes?:             Hero[];
    IsNot?:              boolean;
    Enchantment?:        null;
}

export interface Condition8 {
    $type:               ConditionType;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Tags?:               Tag[];
    Operator?:           Operator;
    Tiers?:              Tier[];
    Heroes?:             Hero[];
    Conditions?:         Condition[];
    Id?:                 string;
}

export interface PurpleE2 {
    Id:                  E2ID;
    Trigger:             TentacledTrigger;
    ActiveIn:            ActiveIn;
    Action:              FluffyAction;
    Prerequisites:       null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: PurpleInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface FluffyAction {
    $type:         PurpleType;
    Value:         ComparisonValue;
    AttributeType: AttributeChanged;
    Operation:     Operation;
    Duration:      FluffyDuration;
    TargetCount:   null;
    Target:        HilariousTarget;
}

export interface HilariousTarget {
    $type:          SourceType;
    Origin?:        Origin;
    TargetMode?:    Origin;
    IncludeOrigin?: boolean;
    Conditions:     Conditions5 | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export interface Conditions5 {
    $type:       ConditionType;
    Conditions?: Condition9[];
    IsNot?:      boolean;
}

export interface Condition9 {
    $type: ConditionType;
    IsNot: boolean;
}

export type E2ID = "e1" | "e2";

export interface TentacledTrigger {
    $type:             TriggerType;
    Subject:           IndecentSubject;
    AttributeChanged?: AttributeChanged;
    ChangeType?:       ChangeType;
    PreviousValue?:    null;
    CurrentValue?:     null;
    Source?:           null;
}

export interface IndecentSubject {
    $type:          SourceType;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Conditions:     Conditions6 | null;
    TargetMode?:    Origin;
    Origin?:        Origin;
    IncludeOrigin?: boolean;
}

export interface Conditions6 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Conditions?:         Condition10[];
    Id?:                 string;
    IsNot?:              boolean;
    Sizes?:              Size[];
    CardType?:           Type;
    Heroes?:             Hero[];
    Enchantment?:        null;
    IsSameAsPlayerHero?: boolean;
    AttributeType?:      AttributeChanged;
}

export interface Condition10 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    CardType?:           Type;
    IsNot?:              boolean;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Sizes?:              Size[];
    Enchantment?:        null;
    Conditions?:         Condition11[];
    Id?:                 string;
}

export interface Condition11 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Conditions?:         Condition12[];
    Sizes?:              Size[];
    IsNot?:              boolean;
    CardType?:           Type;
    Heroes?:             Hero[];
    Enchantment?:        EnchantmentEnum | null;
    Tiers?:              Tier[];
    Id?:                 string;
    AttributeType?:      AttributeChanged;
    IsSameAsPlayerHero?: boolean;
}

export interface Condition12 {
    $type:               ConditionType;
    CardType?:           Type;
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Sizes?:              Size[];
    Enchantment?:        null;
    Conditions?:         Condition13[];
    AttributeType?:      AttributeChanged;
    IsSameAsPlayerHero?: boolean;
    Tiers?:              Tier[];
}

export interface Condition13 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
}

export interface PurpleE3 {
    Id:                  E3ID;
    Trigger:             StickyTrigger;
    ActiveIn:            ActiveIn;
    Action:              The3_Action;
    Prerequisites:       null;
    Priority:            Priority;
    InternalName:        E3InternalName;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface The3_Action {
    $type:         PurpleType;
    Value:         ComparisonValue;
    AttributeType: AttributeChanged;
    Operation:     Operation;
    Duration:      FluffyDuration;
    TargetCount:   null;
    Target:        TargetClass;
}

export type E3ID = "e3";

export type E3InternalName = "" | "Counter Increment" | "Heavy Headset Ability" | "Icy Headset Ability";

export interface StickyTrigger {
    $type:   TriggerType;
    Subject: HilariousSubject;
}

export interface HilariousSubject {
    $type:          SourceType;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Conditions:     Conditions7 | null;
}

export interface Conditions7 {
    $type:          ConditionType;
    AttributeType?: AttributeChanged;
    Conditions?:    Condition14[];
    Tags?:          Tag[];
    Operator?:      Operator;
    Sizes?:         Size[];
    IsNot?:         boolean;
    Enchantment?:   null;
}

export interface Condition14 {
    $type:               ConditionType;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Heroes?:             Hero[];
    CardType?:           Type;
    Sizes?:              Size[];
}

export interface DeadlyAttributes {
    Custom_1?:          number;
    Custom_8?:          number;
    Custom_5?:          number;
    Custom_4?:          number;
    BurnApplyAmount?:   number;
    DamageAmount?:      number;
    ShieldApplyAmount?: number;
    PoisonApplyAmount?: number;
}

export interface DeadlyAuras {
    e1?: FluffyE1;
}

export interface FluffyE1 {
    Id:                  E2ID;
    ActiveIn:            ActiveIn;
    Action:              TentacledAction;
    Prerequisites:       PurplePrerequisite[] | null;
    InternalName:        string;
    InternalDescription: FluffyInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface TentacledAction {
    $type:         PurpleType;
    AttributeType: PurpleAttributeType;
    Operation:     Operation;
    Value:         IndigoValue;
    Target:        IndecentSubject;
}

export type PurpleAttributeType = "CritChance" | "Custom_0" | "DamageCrit";

export interface IndigoValue {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        PurpleTargetPlayer;
    AttributeType?: AttributeChanged;
    DefaultValue?:  number;
    Modifier?:      PurpleModifier;
    Distinct?:      boolean;
}

export type FluffyInternalDescription = "Deadly 50" | "Deadly 25" | "Deadly 2" | "Crit Chance 25%" | "Deadly" | "" | "Deadly 2x" | "Deadly 20" | "Deadly 30" | "Shiny 1" | "Deadly 1" | "Deadly 10";

export interface PurplePrerequisite {
    $type:      PrerequisiteType;
    Subject:    AmbitiousSubject;
    Comparison: Comparison;
    Amount:     number;
}

export interface AmbitiousSubject {
    $type:          SourceType;
    Origin?:        Origin;
    TargetMode?:    Origin;
    IncludeOrigin?: boolean;
    Conditions:     Conditions8 | null;
    ExcludeSelf?:   boolean;
}

export interface Conditions8 {
    $type:        ConditionType;
    Conditions?:  Condition15[];
    Tags?:        Tag[];
    Operator?:    Operator;
    Enchantment?: null;
    IsNot?:       boolean;
}

export interface Condition15 {
    $type:               ConditionType;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
}

export type HiddenTag = "Crit" | "CritReference" | "DamageReference" | "Regen" | "Damage" | "Active" | "Haste" | "Cooldown" | "Gold" | "FlyingReference" | "EconomyReference" | "PotionReference" | "Value" | "Charge" | "Health" | "Burn" | "Multicast" | "RegenReference" | "Shield" | "JoyReference" | "Heal" | "BurnReference" | "Flying" | "Slow" | "NonWeapon" | "ShieldReference" | "Ammo" | "Poison" | "SlowReference" | "HasteReference" | "HealthReference" | "HealReference" | "TechReference" | "Freeze" | "PoisonReference" | "Joy" | "Toughness" | "Lifesteal" | "Income" | "FreezeReference" | "Quest" | "AmmoReference" | "Passive" | "AbsorbDestroy" | "AbsorbSlow" | "AbsorbFreeze" | "Experience";

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
    Attributes:   DeadlyAttributes;
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
    e3?: PurpleE3;
}

export interface TentacledE1 {
    Id:                  string;
    Trigger:             IndigoTrigger;
    ActiveIn:            ActiveIn;
    Action:              StickyAction;
    Prerequisites:       FluffyPrerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface StickyAction {
    $type:            PurpleType;
    ReferenceValue?:  null;
    Target?:          IndecentSubject;
    TargetPlayer?:    PrerequisiteTargetPlayer;
    SpawnContext?:    FluffySpawnContext;
    Value?:           IndecentValue;
    AttributeType?:   AttributeChanged;
    Operation?:       Operation;
    Duration?:        PurpleDuration | null;
    TargetCount?:     TargetCountClass | null;
    Enchantment?:     EnchantmentEnum;
    PreventOverride?: boolean;
}

export interface PrerequisiteTargetPlayer {
    $type:          SourceType;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Conditions:     Conditions9 | null;
    TargetMode?:    Origin;
}

export interface Conditions9 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeChanged;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    PurpleComparisonValue;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Conditions?:         PurpleCondition[];
    Heroes?:             Hero[];
    CardType?:           Type;
    Sizes?:              Size[];
    AttributeType?:      AttributeChanged;
    Id?:                 string;
}

export interface IndecentValue {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        HilariousSubject;
    AttributeType?: AttributeChanged;
    DefaultValue?:  number;
    Modifier?:      PurpleModifier | null;
}

export interface FluffyPrerequisite {
    $type:       PrerequisiteType;
    Subject:     CunningSubject;
    Comparison?: Comparison;
    Amount?:     number;
}

export interface CunningSubject {
    $type:        SourceType;
    ExcludeSelf?: boolean;
    Conditions:   FluffyConditions;
    TargetMode?:  Origin;
}

export interface IndigoTrigger {
    $type:             TriggerType;
    Subject?:          IndecentSubject;
    Source?:           null;
    AttributeType?:    AttributeChanged;
    ChangeType?:       ChangeType;
    AttributeChanged?: AttributeChanged;
    PreviousValue?:    null;
    CurrentValue?:     null;
    CombatType?:       null;
    Target?:           ComparisonValueSubject | null;
    Triggers?:         IndecentTrigger[];
}

export interface IndecentTrigger {
    $type:   TriggerType;
    Subject: HilariousSubject;
    Target:  null;
}

export interface FluffyE2 {
    Id:                  E2ID;
    Trigger:             HilariousTrigger;
    ActiveIn:            ActiveIn;
    Action:              IndigoAction;
    Prerequisites:       E2Prerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: TentacledInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface IndigoAction {
    $type:           PurpleType;
    Value?:          ComparisonValue;
    AttributeType?:  AttributeChanged;
    Operation?:      Operation;
    Duration?:       FluffyDuration;
    TargetCount?:    null;
    Target:          AmbitiousTarget;
    ReferenceValue?: null;
}

export interface AmbitiousTarget {
    $type:          SourceType;
    Conditions:     Conditions7 | null;
    TargetMode?:    Origin;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export type TentacledInternalDescription = "" | "Your other Burn items gain +3 Burn for the fight." | "Deal {ability.0} Damage to the Player with less Health." | "Your other Heal items gain +9 Heal for the fight." | "Your other Shield items gain +9 Shield for the fight." | "Your other Poison items gain +3 Poison for the fight.";

export interface E2Prerequisite {
    $type:   PrerequisiteType;
    Subject: ComparisonValueSubject;
}

export interface HilariousTrigger {
    $type:             TriggerType;
    Subject?:          MagentaSubject;
    AttributeType?:    AttributeChanged;
    ChangeType?:       ChangeType;
    Source?:           null;
    Triggers?:         IndecentTrigger[];
    Target?:           null;
    AttributeChanged?: AttributeChanged;
    PreviousValue?:    null;
    CurrentValue?:     null;
}

export interface MagentaSubject {
    $type:          SourceType;
    TargetMode?:    Origin;
    Conditions:     Conditions10 | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export interface Conditions10 {
    $type: ConditionType;
    Id:    string;
    IsNot: boolean;
}

export interface FieryAuras {
    e2?: AurasE2;
    e3?: FluffyE3;
    e1?: StickyE1;
}

export interface StickyE1 {
    Id:                  E2ID;
    ActiveIn:            ActiveIn;
    Action:              IndecentAction;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface IndecentAction {
    $type:         PurpleType;
    AttributeType: AttributeChanged;
    Operation:     Operation;
    Value:         TargetCountClass;
    Target:        CunningTarget;
}

export interface CunningTarget {
    $type:          SourceType;
    Conditions:     Conditions11 | null;
    Origin?:        Origin;
    TargetMode?:    Origin;
    IncludeOrigin?: boolean;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export interface Conditions11 {
    $type:    ConditionType;
    Tags:     AttributeChanged[];
    Operator: Operator;
}

export interface AurasE2 {
    Id:                  E2ID;
    ActiveIn:            ActiveIn;
    Action:              HilariousAction;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface HilariousAction {
    $type:         PurpleType;
    AttributeType: AttributeChanged;
    Operation:     Operation;
    Value:         HilariousValue;
    Target:        TargetClass;
}

export interface HilariousValue {
    $type:          ComparisonValueType;
    Target?:        IndecentSubject;
    AttributeType?: AttributeChanged;
    DefaultValue?:  number;
    Modifier?:      PurpleModifier;
    Distinct?:      boolean;
    Value?:         number;
}

export interface FluffyE3 {
    Id:                  E3ID;
    ActiveIn:            ActiveIn;
    Action:              AmbitiousAction;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface AmbitiousAction {
    $type:         PurpleType;
    AttributeType: AttributeChanged;
    Operation:     Operation;
    Value:         AmbitiousValue;
    Target:        HilariousSubject;
}

export interface AmbitiousValue {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        AmbitiousSubject;
    AttributeType?: AttributeChanged;
    DefaultValue?:  number;
    Modifier?:      PurpleModifier | null;
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
}

export interface IndigoE1 {
    Id:                  E2ID;
    Trigger:             AmbitiousTrigger;
    ActiveIn:            ActiveIn;
    Action:              CunningAction;
    Prerequisites:       null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: StickyInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface CunningAction {
    $type:          PurpleType;
    Value?:         ComparisonValueClass;
    AttributeType?: AttributeChanged;
    Operation?:     Operation;
    Duration?:      null;
    TargetCount?:   TargetCountClass | null;
    Target?:        PurpleTargetPlayer;
    TargetPlayer?:  PurpleTargetPlayer;
    SpawnContext?:  FluffySpawnContext;
}

export type StickyInternalDescription = "Golden 0" | "Golden 1" | "Shiny 1" | "" | "Golden 100" | "At the start of each fight double value";

export interface AmbitiousTrigger {
    $type:          TriggerType;
    Subject?:       PrerequisiteTargetPlayer;
    AttributeType?: AttributeChanged;
    ChangeType?:    ChangeType;
    Source?:        null;
}

export interface GoldenAttributes {
    Custom_1?: number;
}

export interface GoldenAuras {
    e1?: IndecentE1;
}

export interface IndecentE1 {
    Id:                  E2ID;
    ActiveIn:            ActiveIn;
    Action:              MagentaAction;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: StickyInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface MagentaAction {
    $type:         TentacledType;
    AttributeType: AttributeChanged;
    Operation:     Operation;
    Value:         ComparisonValueClass;
    Target:        IndecentSubject;
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
    e2?:  TentacledE2;
    e3?:  PurpleE3;
    "3"?: The3;
}

export interface The3 {
    Id:                  string;
    Trigger:             The3_Trigger;
    ActiveIn:            ActiveIn;
    Action:              The3_Action;
    Prerequisites:       E2Prerequisite[];
    Priority:            Priority;
    InternalName:        E3InternalName;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface The3_Trigger {
    $type:          TriggerType;
    Subject?:       ComparisonValueSubject;
    AttributeType?: AttributeChanged;
    ChangeType?:    ChangeType;
    Source?:        null;
    Triggers?:      IndecentTrigger[];
}

export interface HilariousE1 {
    Id:                  string;
    Trigger:             IndigoTrigger;
    ActiveIn:            ActiveIn;
    Action:              FriskyAction;
    Prerequisites:       FluffyPrerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: IndigoInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface FriskyAction {
    $type:            PurpleType;
    Value?:           ComparisonValue | null;
    TargetCount?:     TargetCountClass | null;
    Target?:          IndecentSubject;
    TargetPlayer?:    PrerequisiteTargetPlayer;
    SpawnContext?:    FluffySpawnContext;
    AttributeType?:   FluffyAttributeType;
    Operation?:       Operation;
    Duration?:        null;
    Enchantment?:     EnchantmentEnum;
    PreventOverride?: boolean;
}

export type FluffyAttributeType = "SlowAmount" | "HasteAmount" | "FreezeAmount" | "Custom_0" | "FreezeTargets" | "DamageAmount" | "ShieldApplyAmount" | "ChargeAmount" | "RegenApplyAmount" | "Custom_1" | "PoisonApplyAmount" | "Multicast" | "EnchantTargets" | "SellPrice" | "AmmoMax" | "Lifesteal" | "HealthMax" | "PercentCooldownReduction";

export type IndigoInternalDescription = "" | "At the start of each day, get a " | "Heavy" | "If the item is not Enchanted, Enchant it with Heavy if able." | "Turbo" | "Turbo 3" | "Turbo 2" | "If the item is not Enchanted, Enchant it with Turbo if able.";

export interface TentacledE2 {
    Id:                  E2ID;
    Trigger:             CunningTrigger;
    ActiveIn:            ActiveIn;
    Action:              MischievousAction;
    Prerequisites:       E2Prerequisite[] | null;
    Priority:            Priority;
    InternalName:        E3InternalName;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface MischievousAction {
    $type:          PurpleType;
    Value:          ComparisonValue | null;
    TargetCount:    null;
    Target:         PurpleTargetPlayer;
    AttributeType?: AttributeChanged;
    Operation?:     Operation;
    Duration?:      FluffyDuration;
}

export interface CunningTrigger {
    $type:          TriggerType;
    Subject?:       PurpleTargetPlayer;
    AttributeType?: AttributeChanged;
    ChangeType?:    ChangeType;
    Source?:        null;
}

export interface HeavyAttributes {
    SlowTargets?: number;
    SlowAmount?:  number;
    SellPrice?:   number;
    Custom_4?:    number;
    Custom_1?:    number;
    Custom_5?:    number;
}

export interface HeavyAuras {
    e1?: AmbitiousE1;
}

export interface AmbitiousE1 {
    Id:                  E2ID;
    ActiveIn:            ActiveIn;
    Action:              BraggadociousAction;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface BraggadociousAction {
    $type:         PurpleType;
    AttributeType: FluffyAttributeType;
    Operation:     Operation;
    Value:         ComparisonValue;
    Target:        TargetClass;
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
    e1?:  CunningE1;
    e2?:  TentacledE2;
    e3?:  PurpleE3;
    "3"?: The3;
}

export interface CunningE1 {
    Id:                  string;
    Trigger:             IndigoTrigger;
    ActiveIn:            ActiveIn;
    Action:              Action1;
    Prerequisites:       FluffyPrerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: IndecentInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface Action1 {
    $type:            PurpleType;
    Value?:           ComparisonValue | null;
    TargetCount:      TargetCountClass | null;
    Target:           IndecentSubject;
    AttributeType?:   TentacledAttributeType;
    Operation?:       Operation;
    Duration?:        PurpleDuration | null;
    Enchantment?:     EnchantmentEnum;
    PreventOverride?: boolean;
}

export type TentacledAttributeType = "FreezeAmount" | "PercentFreezeReduction" | "PercentSlowReduction";

export type IndecentInternalDescription = "" | "Icy" | "Icy 2" | "If the item is not Enchanted, Enchant it with Icy if able.";

export interface IcyAttributes {
    FreezeTargets?: number;
    FreezeAmount?:  number;
    Custom_4?:      number;
    Custom_1?:      number;
    Custom_5?:      number;
}

export interface Obsidian {
    Attributes:   DeadlyAttributes;
    Abilities:    ObsidianAbilities;
    Auras:        ObsidianAuras;
    Tags:         Tag[];
    HiddenTags:   HiddenTag[];
    Localization: DeadlyLocalization;
    HasAbilities: boolean;
    HasAuras:     boolean;
}

export interface ObsidianAbilities {
    e1?: MagentaE1;
    e2?: StickyE2;
    e3?: PurpleE3;
}

export interface MagentaE1 {
    Id:                  string;
    Trigger:             MagentaTrigger;
    ActiveIn:            ActiveIn;
    Action:              Action2;
    Prerequisites:       TentacledPrerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: HilariousInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface Action2 {
    $type:            PurpleType;
    ReferenceValue?:  null;
    Target?:          IndecentSubject;
    TargetPlayer?:    PrerequisiteTargetPlayer;
    SpawnContext?:    FluffySpawnContext;
    Value?:           ComparisonValue;
    AttributeType?:   AttributeChanged;
    Operation?:       Operation;
    Duration?:        FluffyDuration | null;
    TargetCount?:     TargetCountClass | null;
    Enchantment?:     EnchantmentEnum;
    PreventOverride?: boolean;
}

export type HilariousInternalDescription = "" | "At the start of each day, get a " | "Obsidian" | "Your Aquatic Weapons gain +5 Damage for the fight." | "If the item is not Enchanted, Enchant it with Obsidian if able.";

export interface TentacledPrerequisite {
    $type:       PrerequisiteType;
    Subject:     PrerequisiteTargetPlayer;
    Comparison?: Comparison;
    Amount?:     number;
}

export interface MagentaTrigger {
    $type:             TriggerType;
    Subject?:          IndecentSubject;
    AttributeType?:    AttributeChanged;
    ChangeType?:       ChangeType;
    Source?:           null;
    CombatType?:       null;
    Target?:           PurpleTargetPlayer | null;
    AttributeChanged?: AttributeChanged;
    PreviousValue?:    null;
    CurrentValue?:     null;
}

export interface StickyE2 {
    Id:                  E2ID;
    Trigger:             FriskyTrigger;
    ActiveIn:            ActiveIn;
    Action:              Action3;
    Prerequisites:       E2Prerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface Action3 {
    $type:           PurpleType;
    Value?:          ComparisonValue;
    AttributeType?:  AttributeChanged;
    Operation?:      Operation;
    Duration?:       FluffyDuration;
    TargetCount?:    null;
    Target:          PrerequisiteTargetPlayer;
    ReferenceValue?: null;
}

export interface FriskyTrigger {
    $type:             TriggerType;
    Subject:           PurpleTargetPlayer;
    AttributeType?:    AttributeChanged;
    ChangeType?:       ChangeType;
    Source?:           null;
    AttributeChanged?: AttributeChanged;
    PreviousValue?:    null;
    CurrentValue?:     null;
}

export interface ObsidianAuras {
    e1?: FriskyE1;
    e2?: AurasE2;
    e3?: TentacledE3;
}

export interface FriskyE1 {
    Id:                  E2ID;
    ActiveIn:            ActiveIn;
    Action:              Action4;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: AmbitiousInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface Action4 {
    $type:         PurpleType;
    AttributeType: AttributeChanged;
    Operation:     Operation;
    Value:         AmbitiousValue;
    Target:        IndecentSubject;
}

export type AmbitiousInternalDescription = "" | "Obsidian 2" | "Obsidian 1";

export interface TentacledE3 {
    Id:                  E3ID;
    ActiveIn:            ActiveIn;
    Action:              Action5;
    Prerequisites:       E3Prerequisite[] | null;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface Action5 {
    $type:         PurpleType;
    AttributeType: AttributeChanged;
    Operation:     Operation;
    Value:         CunningValue;
    Target:        TargetClass;
}

export interface CunningValue {
    $type:         ComparisonValueType;
    Target:        AmbitiousSubject;
    AttributeType: AttributeChanged;
    DefaultValue:  number;
    Modifier:      PurpleModifier;
}

export interface Radiant {
    Attributes:   RadiantAttributes;
    Abilities:    RadiantAbilities;
    Auras:        RadiantAuras;
    Tags:         any[];
    HiddenTags:   HiddenTag[];
    Localization: DeadlyLocalization;
    HasAbilities: boolean;
    HasAuras:     boolean;
}

export interface RadiantAbilities {
    e1?: MischievousE1;
    e2?: IndigoE2;
    e3?: StickyE3;
}

export interface MischievousE1 {
    Id:                  string;
    Trigger:             MischievousTrigger;
    ActiveIn:            ActiveIn;
    Action:              Action1;
    Prerequisites:       null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface MischievousTrigger {
    $type:       TriggerType;
    CombatType?: null;
    Subject?:    AmbitiousSubject;
    Source?:     null;
}

export interface IndigoE2 {
    Id:                  E2ID;
    Trigger:             BraggadociousTrigger;
    ActiveIn:            ActiveIn;
    Action:              Action6;
    Prerequisites:       null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: PurpleInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface Action6 {
    $type:         PurpleType;
    Value:         ComparisonValue;
    AttributeType: TentacledAttributeType;
    Operation:     Operation;
    Duration:      PurpleDuration;
    TargetCount:   null;
    Target:        PurpleTargetPlayer;
}

export interface BraggadociousTrigger {
    $type:       TriggerType;
    Subject?:    TargetClass;
    Source?:     null;
    CombatType?: null;
}

export interface StickyE3 {
    Id:                  E3ID;
    Trigger:             Trigger1;
    ActiveIn:            ActiveIn;
    Action:              Action7;
    Prerequisites:       null;
    Priority:            Size;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface Action7 {
    $type:         PurpleType;
    Value:         ComparisonValue;
    AttributeType: string;
    Operation:     Operation;
    Duration:      TentacledDuration;
    TargetCount:   null;
    Target:        PurpleTargetPlayer;
}

export interface TentacledDuration {
    $type:        DurationType;
    DurationInMs: number;
}

export interface Trigger1 {
    $type:      TriggerType;
    CombatType: null;
}

export interface RadiantAttributes {
    PercentSlowReduction?:   number;
    PercentFreezeReduction?: number;
    DestroyImmunity?:        number;
}

export interface RadiantAuras {
    e1?: BraggadociousE1;
    e2?: BraggadociousE1;
    e3?: IndigoE3;
}

export interface BraggadociousE1 {
    Id:                  E2ID;
    ActiveIn:            ActiveIn;
    Action:              Action8;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: E3InternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface Action8 {
    $type:         PurpleType;
    AttributeType: TentacledAttributeType;
    Operation:     Operation;
    Value:         ComparisonValue;
    Target:        IndecentSubject;
}

export type E3InternalDescription = "Radiant 50";

export interface IndigoE3 {
    Id:                  E3ID;
    ActiveIn:            ActiveIn;
    Action:              Action9;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: E3InternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface Action9 {
    $type:         PurpleType;
    AttributeType: string;
    Operation:     Operation;
    Value:         ComparisonValue;
    Target:        MagentaTarget;
}

export interface MagentaTarget {
    $type:          SourceType;
    Conditions:     Condition | null;
    Origin?:        Origin;
    TargetMode?:    Origin;
    IncludeOrigin?: boolean;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export interface Restorative {
    Attributes:   RestorativeAttributes;
    Abilities:    FieryAbilities;
    Auras:        FieryAuras;
    Tags:         any[];
    HiddenTags:   HiddenTag[];
    Localization: DeadlyLocalization;
    HasAbilities: boolean;
    HasAuras:     boolean;
}

export interface RestorativeAttributes {
    HealAmount?:       number;
    RegenApplyAmount?: number;
    Custom_4?:         number;
    Custom_1?:         number;
}

export interface Shielded {
    Attributes:   DeadlyAttributes;
    Abilities:    FieryAbilities;
    Auras:        ShieldedAuras;
    Tags:         any[];
    HiddenTags:   HiddenTag[];
    Localization: DeadlyLocalization;
    HasAbilities: boolean;
    HasAuras:     boolean;
}

export interface ShieldedAuras {
    e2?: AurasE2;
    e3?: IndecentE3;
    e1?: StickyE1;
}

export interface IndecentE3 {
    Id:                  E3ID;
    ActiveIn:            ActiveIn;
    Action:              Action10;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface Action10 {
    $type:         PurpleType;
    AttributeType: AttributeChanged;
    Operation:     Operation;
    Value:         AmbitiousValue;
    Target:        PurpleTargetPlayer;
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
    e1?: E11;
    e2?: IndecentE2;
}

export interface E11 {
    Id:                  string;
    Trigger:             MischievousTrigger;
    ActiveIn:            ActiveIn;
    Action:              Action11;
    Prerequisites:       null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface Action11 {
    $type:            PurpleType;
    ReferenceValue?:  null;
    Target?:          AmbitiousSubject;
    TargetPlayer?:    PurpleTargetPlayer;
    SpawnContext?:    FluffySpawnContext;
    Enchantment?:     EnchantmentEnum;
    Duration?:        null;
    PreventOverride?: boolean;
    TargetCount?:     null;
}

export interface IndecentE2 {
    Id:                  E2ID;
    Trigger:             Ce1Trigger;
    ActiveIn:            ActiveIn;
    Action:              Action12;
    Prerequisites:       null;
    Priority:            Size;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface Action12 {
    $type:        PurpleType;
    TargetPlayer: PrerequisiteTargetPlayer;
    SpawnContext: FluffySpawnContext;
}

export interface Ce1Trigger {
    $type: TriggerType;
}

export interface ShinyAttributes {
    CritChance?: number;
    Multicast?:  number;
    Custom_1?:   number;
}

export interface ShinyAuras {
    e1?: E12;
    e2?: AmbitiousE1;
}

export interface E12 {
    Id:                  E2ID;
    ActiveIn:            ActiveIn;
    Action:              Action13;
    Prerequisites:       TentacledPrerequisite[] | null;
    InternalName:        string;
    InternalDescription: CunningInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface Action13 {
    $type:         TentacledType;
    AttributeType: FluffyAttributeType;
    Operation:     Operation;
    Value:         TargetCountClass;
    Target:        IndecentSubject;
}

export type CunningInternalDescription = "Shiny 1" | "" | "Shiny 2" | "Turbo 3" | "Shiny" | "Sets the value of Burn" | "Golden 1" | "Shiny None" | "Deadly 2" | "Icy 2" | "Shielded" | "Heavy 1";

export interface Turbo {
    Attributes:   TurboAttributes;
    Abilities:    TurboAbilities;
    Auras:        HeavyAuras;
    Tags:         any[];
    HiddenTags:   HiddenTag[];
    Localization: DeadlyLocalization;
    HasAbilities: boolean;
    HasAuras:     boolean;
}

export interface TurboAbilities {
    e1?:  HilariousE1;
    e2?:  HilariousE2;
    e3?:  PurpleE3;
    "3"?: The3;
}

export interface HilariousE2 {
    Id:                  E2ID;
    Trigger:             The3_Trigger;
    ActiveIn:            ActiveIn;
    Action:              MischievousAction;
    Prerequisites:       E2Prerequisite[] | null;
    Priority:            Priority;
    InternalName:        PurpleInternalName;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export type PurpleInternalName = "" | "Counter Increment" | "Turbo Lightning Rod Ability Enemy";

export interface TurboAttributes {
    HasteTargets?: number;
    HasteAmount?:  number;
    Custom_4?:     number;
    Custom_1?:     number;
    Custom_5?:     number;
}

export type The500_InternalDescription = "" | "Side with the Merchant and shoo the customer away." | "Sells items" | "You feed the creature and it leads you to an item!" | "The creature hums with happiness and you feel at peace." | "Day 1" | "The creature purrs with joy and you feel warm inside." | "Spend your time looking for spare change instead of investing." | "Close the circus down and free all the animals." | "Gain a Diamond-tier item" | "You own the circus! What do you want to do with it?" | "Have a nice day :)" | "Oni Mask" | "Any investment helps!" | "Shuriken" | "Keep the wallet for yourself.";

export interface The500_Localization {
    Title:       Title;
    Description: Title | null;
    FlavorText:  null;
    Tooltips:    Tooltip[];
}

export interface Quest {
    Prerequisites: any[];
    Repeatable:    Repeatable | null;
    Entries:       Entry[];
    IsRepeatable:  boolean;
}

export interface Entry {
    AttributeType:     EntryAttributeType;
    Prerequisites:     E3Prerequisite[] | null;
    Trigger:           EntryTrigger;
    Target:            number;
    Update:            Update;
    Reward:            Reward;
    CompletionEffects: CompletionEffects | null;
    Localization:      DeadlyLocalization;
    IconKeyOverride:   AttributeChanged | null;
}

export type EntryAttributeType = "Quest_1" | "Quest_2" | "Quest_3" | "Quest_4" | "Quest_5";

export interface CompletionEffects {
    ce1: Ce1;
}

export interface Ce1 {
    Id:                  string;
    Trigger:             Ce1Trigger;
    ActiveIn:            ActiveIn;
    Action:              Ce1Action;
    Prerequisites:       null;
    Priority:            Size;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface Ce1Action {
    $type:          PurpleType;
    Value?:         TargetCountClass | null;
    AttributeType?: AttributeChanged;
    Operation?:     Operation;
    Duration?:      FluffyDuration | null;
    TargetCount?:   null;
    Target:         PrerequisiteTargetPlayer;
}

export interface Reward {
    Tiers:        RewardTiers | null;
    Attributes:   RewardAttributes | null;
    Abilities:    RewardAbilities;
    Auras:        RewardAuras;
    Tags:         any[];
    HiddenTags:   HiddenTag[];
    Localization: DeadlyLocalization;
    HasAbilities: boolean;
    HasAuras:     boolean;
}

export interface RewardAbilities {
    q1?: AbilitiesQ1;
    q2?: AbilitiesQ2;
    q3?: Q4Class;
    q4?: Q4Class;
    q5?: Q5;
}

export interface AbilitiesQ1 {
    Id:                  string;
    Trigger:             Q1Trigger;
    ActiveIn:            ActiveIn;
    Action:              Action14;
    Prerequisites:       E3Prerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface Action14 {
    $type:            PurpleType;
    Value?:           TargetCountClass | null;
    AttributeType?:   AttributeChanged;
    Operation?:       Operation;
    Duration?:        FluffyDuration | null;
    TargetCount?:     null;
    Target:           PrerequisiteTargetPlayer;
    ReferenceValue?:  null;
    Enchantment?:     EnchantmentEnum;
    PreventOverride?: boolean;
}

export interface Q1Trigger {
    $type:    TriggerType;
    Subject?: PrerequisiteTargetPlayer;
    Target?:  null;
}

export interface AbilitiesQ2 {
    Id:                  string;
    Trigger:             Q2Trigger;
    ActiveIn:            ActiveIn;
    Action:              Action15;
    Prerequisites:       E3Prerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface Action15 {
    $type:            PurpleType;
    Value?:           TargetCountClass | null;
    AttributeType?:   AttributeChanged;
    Operation?:       Operation;
    Duration?:        FluffyDuration | null;
    TargetCount?:     null;
    Target:           PrerequisiteTargetPlayer;
    UpgradeToTier?:   null;
    ReferenceValue?:  null;
    Enchantment?:     EnchantmentEnum;
    PreventOverride?: boolean;
}

export interface Q2Trigger {
    $type:    TriggerType;
    Subject?: IndecentSubject;
    Target?:  null;
}

export interface Q4Class {
    Id:                  string;
    Trigger:             Q3Trigger;
    ActiveIn:            ActiveIn;
    Action:              Q4Action;
    Prerequisites:       E3Prerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface Q4Action {
    $type:            PurpleType;
    Value?:           TargetCountClass | null;
    AttributeType?:   AttributeChanged;
    Operation?:       Operation;
    Duration?:        FluffyDuration | null;
    TargetCount?:     null;
    Target:           PurpleTargetPlayer;
    ReferenceValue?:  null;
    Enchantment?:     EnchantmentEnum;
    PreventOverride?: boolean;
}

export interface Q3Trigger {
    $type:    TriggerType;
    Subject?: HilariousSubject;
    Target?:  null;
}

export interface Q5 {
    Id:                  string;
    Trigger:             Ce1Trigger;
    ActiveIn:            ActiveIn;
    Action:              Q5Action;
    Prerequisites:       null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface Q5Action {
    $type:       PurpleType;
    Value:       null;
    TargetCount: null;
    Target:      PurpleTargetPlayer;
}

export interface RewardAttributes {
    ChargeAmount?:   number;
    ChargeTargets?:  number;
    EnchantTargets?: number;
}

export interface RewardAuras {
    q1?: AurasQ1;
    q2?: AurasQ2;
    q3?: AurasQ3;
}

export interface AurasQ1 {
    Id:                  string;
    ActiveIn:            ActiveIn;
    Action:              Action16;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface Action16 {
    $type:         TentacledType;
    AttributeType: AttributeChanged;
    Operation:     Operation;
    Value:         ComparisonValue;
    Target:        PurpleTargetPlayer;
}

export interface AurasQ2 {
    Id:                  string;
    ActiveIn:            ActiveIn;
    Action:              Action17;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface Action17 {
    $type:         PurpleType;
    AttributeType: AttributeChanged;
    Operation:     Operation;
    Value:         ComparisonValueClass;
    Target:        PurpleTargetPlayer;
}

export interface AurasQ3 {
    Id:                  string;
    ActiveIn:            ActiveIn;
    Action:              Action18;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface Action18 {
    $type:         PurpleType;
    AttributeType: AttributeChanged;
    Operation:     Operation;
    Value:         MagentaValue;
    Target:        PrerequisiteTargetPlayer;
}

export interface MagentaValue {
    $type:          ComparisonValueType;
    Value?:         number | number;
    Target?:        PrerequisiteTargetPlayer;
    DefaultValue?:  number;
    Modifier?:      PurpleModifier | null;
    AttributeType?: AttributeChanged;
}

export interface RewardTiers {
    Silver:  PurpleBronze;
    Gold:    PurpleBronze;
    Diamond: PurpleBronze;
    Bronze?: PurpleBronze;
}

export interface PurpleBronze {
    Attributes: BronzeAttributes;
}

export interface BronzeAttributes {
    PoisonApplyAmount?: number;
    RegenApplyAmount?:  number;
    BurnApplyAmount?:   number;
    SlowAmount?:        number;
    SlowTargets?:       number;
    FreezeAmount?:      number;
    FreezeTargets?:     number;
    Custom_0?:          number;
}

export interface EntryTrigger {
    $type:             TriggerType;
    Subject:           PrerequisiteTargetPlayer;
    Target?:           null;
    AttributeChanged?: AttributeChanged;
    ChangeType?:       ChangeType;
    PreviousValue?:    null;
    CurrentValue?:     null;
    Source?:           null;
}

export interface Update {
    Value:    ComparisonValue;
    Duration: null;
}

export interface Repeatable {
    Prerequisites: null;
}

export interface RewardDefeatClass {
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
    Enchantment?: EnchantmentEnum;
    IsNot?:       boolean;
    CardType?:    Type;
    Conditions?:  Condition16[];
}

export interface Condition16 {
    $type:       ConditionType;
    Enchantment: EnchantmentEnum;
}

export interface The500_Tiers {
    Gold?:      LegendaryClass;
    Diamond:    LegendaryClass;
    Bronze?:    LegendaryClass;
    Silver?:    LegendaryClass;
    Legendary?: LegendaryClass;
}

export interface LegendaryClass {
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
    Id:                  T1ID;
    Trigger:             Ce1Trigger;
    ActiveIn:            ActiveIn;
    Action:              T1Action;
    Prerequisites:       null;
    Priority:            Size;
    InternalName:        string;
    InternalDescription: T1InternalDescription;
    MigrationData:       string;
    VFXConfig:           null;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface T1Action {
    $type:            PurpleType;
    Enchantments?:    EnchantmentElement[];
    Duration?:        null;
    PreventOverride?: boolean;
    TargetCount?:     null;
    Target?:          TargetClass;
    Enchantment?:     EnchantmentEnum;
    TargetPlayer?:    PrerequisiteTargetPlayer;
    SpawnContext?:    FluffySpawnContext;
}

export type T1ID = "t1";

export type T1InternalDescription = "When this is transformed, Enchant it." | "" | "When this is transformed, gain a Chunk of Gold.";

export type Version = "5.0.0";
