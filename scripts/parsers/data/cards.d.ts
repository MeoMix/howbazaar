export interface CardsD {
    "4.0.0": The400[];
}

export interface The400 {
    $type:                         The400_$Type;
    StartingTier:                  Tier;
    Tiers?:                        The400_Tiers;
    Type:                          Type;
    Id:                            string;
    Version:                       Version;
    InternalName:                  string;
    InternalDescription:           The400_InternalDescription | null;
    Size:                          Size;
    Heroes:                        Hero[];
    Tags:                          Tag[];
    HiddenTags:                    HiddenTag[];
    ArtKey:                        string;
    CardPackId:                    CardPackID;
    TranslationKey:                string;
    AudioKey:                      null | string;
    Localization:                  The400_Localization;
    Abilities:                     { [key: string]: Ability };
    Auras:                         { [key: string]: Aura };
    CombatantType?:                CombatantType;
    RewardCombatGold?:             number;
    RewardCombatXp?:               number;
    RewardVictory?:                RewardDefeatClass;
    RewardDefeat?:                 RewardDefeatClass;
    ExperienceAwardUponSelection?: number;
    Attributes?:                   The400_Attributes | null;
    Enchantments?:                 Enchantments | null;
    Transform?:                    Transform | null;
    Quests?:                       Quest[] | null;
    IsReselectable?:               boolean;
    SelectionContext?:             SelectionContext | null;
    SelectionRequirements?:        null;
    SelectionCriteria?:            SelectionCriteria;
}

export type The400_$Type = "TCardSkill" | "TCardEncounterCombat" | "TCardItem" | "TCardEncounterStep" | "TCardEncounterEvent" | "TCardEncounterPedestal";

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
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface AbilityAction {
    $type:            PurpleType;
    Value?:           StickyValue | null;
    AttributeType?:   string;
    Operation?:       Operation;
    Duration?:        PurpleDuration | null;
    TargetCount?:     Limit | null;
    Target?:          PurpleTarget;
    ReferenceValue?:  null;
    SpawnContext?:    PurpleSpawnContext;
    UpgradeToTier?:   Tier | null;
    TargetPlayer?:    TargetPlayerClass;
    Enchantment?:     EnchantmentEnum;
    PreventOverride?: boolean;
    Abilities?:       null;
    Enchantments?:    EnchantmentElement[];
    Tags?:            Tag[];
    Source?:          Source;
}

export type PurpleType = "TActionCardModifyAttribute" | "TActionPlayerDamage" | "TActionPlayerShieldApply" | "TActionGameDealCards" | "TActionCardUpgrade" | "TActionPlayerModifyAttribute" | "TActionCardHaste" | "TActionCardCharge" | "TActionPlayerPoisonApply" | "TActionPlayerJoyApply" | "TActionGameSpawnCards" | "TActionPlayerBurnApply" | "TActionPlayerHeal" | "TActionCardEnchant" | "TActionCardTransform" | "TActionCardFreeze" | "TActionPlayerRegenApply" | "TActionExitReplacementSet" | "TActionCardSlow" | "TActionCardForceUse" | "TActionCardEnchantRandom" | "TActionPlayerPoisonRemove" | "TActionCardAddTagsList" | "TActionCardDisable" | "TActionCardReload" | "TActionCardBeginSandstorm" | "TActionPlayerReviveHeal" | "TActionCardEnchantRemove" | "TActionPlayerBurnRemove" | "TActionCardAddTagsBySource" | "TActionCardDestroy" | "TAuraActionCardModifyAttribute";

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

export type SourceType = "TTargetCardPositional" | "TTargetPlayerRelative" | "TTargetCardSelf" | "TTargetCardTriggerSource" | "TTargetPlayerAbsolute" | "TTargetCardRandom" | "TTargetCardSection" | "TTargetCardXMost" | "TTargetPlayer" | "TCardConditionalAnd" | "TCardConditionalOr" | "TCardConditionalHasEnchantment";

export interface PurpleConditions {
    $type:               ConditionType;
    Enchantment?:        EnchantmentEnum;
    IsNot?:              boolean;
    Conditions?:         PurpleCondition[] | TentacledConditions | null;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    PurpleValue;
    Heroes?:             Hero[];
    Operator?:           Operator;
    Tags?:               Tag[];
    CardType?:           Type;
    Sizes?:              Size[];
    AttributeType?:      Attribute;
    Tiers?:              Tier[];
    Id?:                 string;
}

export type ConditionType = "TCardConditionalHasEnchantment" | "TCardConditionalAnd" | "TTargetCardSelf" | "TCardConditionalOr" | "TCardConditionalAttribute" | "TPlayerConditionalAttribute" | "TCardConditionalHero" | "TCardConditionalTag" | "TCardConditionalType" | "TCardConditionalSize" | "TCardConditionalAttributeHighest" | "TCardConditionalTier" | "TCardConditionalHiddenTag" | "TCardConditionalAttributeLowest" | "TCardConditionalId" | "TCardConditionalCanCrit" | "TCardConditionalEnchantmentEligible" | "TCardConditionalTriggerSource" | "TCardConditionalPlayerHero";

export type Attribute = "AmmoMax" | "Health" | "Custom_0" | "Freeze" | "Shield" | "Slow" | "Custom_4" | "Ammo" | "Custom_8" | "Custom_5" | "CooldownMax" | "DamageAmount" | "CritChance" | "ShieldApplyAmount" | "Lifesteal" | "SellPrice" | "Burn" | "Haste" | "Custom_1" | "Custom_2" | "Custom_3" | "BurnApplyAmount" | "PoisonApplyAmount" | "RegenApplyAmount" | "DamageCrit" | "HealAmount" | "HealthRegen" | "HealthMax" | "Income" | "Poison";

export type Type = "Item" | "Skill" | "CombatEncounter" | "EncounterStep" | "EventEncounter" | "PedestalEncounter";

export type Comparison = "LessThanOrEqual" | "LessThan" | "GreaterThanOrEqual" | "GreaterThan" | "Equal" | "NotEqual";

export interface PurpleValue {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        ComparisonValueSubject;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      ComparisonValueModifier | null;
}

export type ComparisonValueType = "TFixedValue" | "TReferenceValuePlayerAttribute" | "TReferenceValueCardAttribute" | "TReferenceValueCardCount" | "TRangeValue" | "TReferenceValuePlayerAttributeChange" | "TReferenceValueCardAttributeAggregate" | "TReferenceValueCardTagCount";

export interface ComparisonValueModifier {
    ModifyMode:  Operation;
    Value:       ComparisonValue;
    ShouldRound: boolean;
}

export interface ComparisonValue {
    $type: ComparisonValueType;
    Value: number;
}

export interface FluffyValue {
    $type:          ComparisonValueType;
    Target?:        ComparisonValueSubject;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      ComparisonValueModifier;
    Value?:         number;
}

export interface FluffyConditions {
    $type:              ConditionType;
    Attribute:          Attribute;
    ComparisonOperator: Comparison;
    ComparisonValue:    FluffyValue;
}

export interface ComparisonValueSubject {
    $type:       SourceType;
    TargetMode?: Origin;
    Conditions:  FluffyConditions | null;
}

export type Origin = "Self" | "Opponent" | "LeftCard" | "RightCard" | "Player" | "LeftMostCard" | "Neighbor" | "RightMostCard" | "Both" | "AllLeftCards" | "AllRightCards";

export interface PurpleCondition {
    $type:               ConditionType;
    Conditions?:         FluffyCondition[] | TentacledConditions | null;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Heroes?:             Hero[];
    Operator?:           Operator;
    Tags?:               Tag[];
}

export interface FluffyCondition {
    $type:               ConditionType;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Heroes?:             Hero[];
    Operator?:           Operator;
    Tags?:               Tag[];
    Conditions?:         SubjectCondition[];
}

export interface SubjectCondition {
    $type:    ConditionType;
    Tags:     Tag[];
    Operator: Operator;
}

export type Operator = "Any" | "None";

export type Tag = "Heal" | "Weapon" | "Shield" | "Potion" | "Core" | "Food" | "Poison" | "Burn" | "Tech" | "Friend" | "Regen" | "Property" | "Tool" | "Relic" | "Freeze" | "Dinosaur" | "Aquatic" | "Reagent" | "Toy" | "Joy" | "Vehicle" | "Apparel" | "Damage" | "Haste" | "Slow" | "Dragon" | "Ray" | "Merchant" | "Loot" | "Quest";

export type Hero = "Mak" | "Common" | "Vanessa" | "Jules" | "Pygmalien" | "Stelle" | "Dooley" | "Hero7";

export type Size = "Small" | "Large" | "Medium";

export interface ValueSubject {
    $type:      SourceType;
    Conditions: FluffyCondition[] | TentacledConditions | null;
}

export interface TentacledValue {
    $type:          ComparisonValueType;
    Value?:         number | number;
    Target?:        ValueSubject;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      ComparisonValueModifier | null;
}

export interface TentacledConditions {
    $type:               ConditionType;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TentacledValue;
    Enchantment?:        EnchantmentEnum;
}

export type Tier = "Diamond" | "Legendary" | "Bronze" | "Silver" | "Gold";

export type TargetSection = "SelfHand" | "SelfBoard" | "SelfHandAndStash" | "OpponentHand" | "SelfStash" | "AllHands" | "AbsolutePlayerHandAndStash" | "AbsolutePlayerHand" | "AbsoluteOpponentHand" | "SelfNeighbors";

export interface PurpleSpawnContext {
    $type: SpawnContextType;
    Limit: Limit;
}

export type SpawnContextType = "TSpawnContextQuery";

export interface Limit {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        ValueSubject;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      ComparisonValueModifier | null;
}

export interface PurpleTarget {
    $type:          SourceType;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Conditions:     StickyConditions | null;
    TargetMode?:    Origin;
    Origin?:        PurpleOrigin;
    IncludeOrigin?: boolean;
}

export interface StickyConditions {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    PurpleComparisonValue;
    Conditions?:         TentacledCondition[];
    IsNot?:              boolean;
    Enchantment?:        EnchantmentEnum | null;
    Tiers?:              Tier[];
    AttributeType?:      Attribute;
    Id?:                 string;
    Sizes?:              Size[];
    Heroes?:             Hero[];
    CardType?:           Type;
    IsSameAsPlayerHero?: boolean;
}

export interface PurpleComparisonValue {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        ComparisonValueSubject;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      ComparisonValueModifier | null;
}

export interface TentacledCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Sizes?:              Size[];
    Enchantment?:        EnchantmentEnum | null;
    Conditions?:         StickyCondition[];
    CardType?:           Type;
    Heroes?:             Hero[];
    AttributeType?:      Attribute;
    IsSameAsPlayerHero?: boolean;
    Id?:                 string;
}

export interface StickyCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    AttributeType?:      Attribute;
    IsNot?:              boolean;
    Conditions?:         IndigoCondition[];
    Heroes?:             Hero[];
    Enchantment?:        EnchantmentEnum | null;
    Tiers?:              Tier[];
    Id?:                 string;
    Sizes?:              Size[];
    CardType?:           Type;
    IsSameAsPlayerHero?: boolean;
}

export interface IndigoCondition {
    $type:               ConditionType;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Enchantment?:        EnchantmentEnum | null;
    IsNot?:              boolean;
    Heroes?:             Hero[];
    Operator?:           Operator;
    Conditions?:         IndecentCondition[];
    Tags?:               Tag[];
    CardType?:           Type;
    Tiers?:              Tier[];
    Sizes?:              Size[];
    AttributeType?:      Attribute;
    IsSameAsPlayerHero?: boolean;
}

export interface IndecentCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         HilariousCondition[];
    Heroes?:             Hero[];
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    AttributeType?:      Attribute;
}

export interface TriggerConditions {
    $type:       ConditionType;
    Tags?:       Tag[];
    Operator?:   Operator;
    Conditions?: HilariousCondition[];
    Heroes?:     Hero[];
}

export interface HilariousCondition {
    $type:               ConditionType;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Enchantment?:        EnchantmentEnum;
    IsNot?:              boolean;
    Heroes?:             Hero[];
    Operator?:           Operator;
    Conditions?:         TriggerConditions[];
    Tags?:               Tag[];
    CardType?:           Type;
}

export type PurpleOrigin = "Self" | "TriggerSource";

export interface TargetPlayerClass {
    $type:          SourceType;
    TargetMode?:    Origin;
    Conditions:     IndigoConditions | null;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
}

export interface IndigoConditions {
    $type:               ConditionType;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    PurpleValue;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    CardType?:           Type;
    Conditions?:         AmbitiousCondition[];
    Tags?:               Tag[];
    Operator?:           Operator;
    Heroes?:             Hero[];
    Sizes?:              Size[];
    AttributeType?:      Attribute;
    Id?:                 string;
}

export interface AmbitiousCondition {
    $type:               ConditionType;
    Conditions?:         CunningCondition[];
    Tags?:               Tag[];
    Operator?:           Operator;
    Id?:                 string;
    IsNot?:              boolean;
    CardType?:           Type;
    Heroes?:             Hero[];
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
}

export interface CunningCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Conditions?:         MagentaCondition[];
    IsNot?:              boolean;
    Enchantment?:        EnchantmentEnum | null;
    Tiers?:              Tier[];
    AttributeType?:      Attribute;
    Id?:                 string;
    Sizes?:              Size[];
    Heroes?:             Hero[];
    CardType?:           Type;
    IsSameAsPlayerHero?: boolean;
}

export interface MagentaCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Sizes?:              Size[];
    Enchantment?:        EnchantmentEnum | null;
    Conditions?:         FriskyCondition[];
    CardType?:           Type;
    Heroes?:             Hero[];
    AttributeType?:      Attribute;
    IsSameAsPlayerHero?: boolean;
}

export interface FriskyCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    AttributeType?:      Attribute;
}

export interface StickyValue {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        FluffyTarget;
    AttributeType?: PurpleAttributeType;
    DefaultValue?:  number;
    Modifier?:      PurpleModifier | null;
    MinValue?:      number;
    MaxValue?:      number;
}

export type PurpleAttributeType = "SellPrice" | "Custom_0" | "Custom_2" | "Custom_1" | "Custom_3" | "Custom_4" | "RegenApplyAmount" | "HealAmount" | "DamageAmount" | "HealthMax" | "Level" | "Gold" | "Income" | "AmmoMax" | "CooldownMax" | "BurnApplyAmount" | "ChargeAmount" | "Burn" | "PercentDamageReduction" | "PoisonApplyAmount";

export interface PurpleModifier {
    ModifyMode:  Operation;
    Value:       Limit;
    ShouldRound: boolean;
}

export interface FluffyTarget {
    $type:          SourceType;
    Conditions:     FluffyCondition[] | IndecentConditions | null;
    TargetMode?:    Origin;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Origin?:        Origin;
    IncludeOrigin?: boolean;
}

export interface IndecentConditions {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    FluffyComparisonValue;
    AttributeType?:      Attribute;
    Conditions?:         MischievousCondition[];
    Heroes?:             Hero[];
    IsNot?:              boolean;
    Id?:                 string;
    CardType?:           Type;
    Sizes?:              Size[];
    Tiers?:              Tier[];
    Enchantment?:        EnchantmentEnum;
}

export interface FluffyComparisonValue {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        TentacledTarget;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      ComparisonValueModifier | null;
}

export interface TentacledComparisonValue {
    $type:          ComparisonValueType;
    Target?:        TentacledTarget;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      ComparisonValueModifier | null;
    Value?:         number;
}

export interface HilariousConditions {
    $type:               ConditionType;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TentacledComparisonValue;
    Enchantment?:        EnchantmentEnum;
}

export interface TentacledTarget {
    $type:       SourceType;
    TargetMode?: Origin;
    Conditions:  FluffyCondition[] | HilariousConditions | null;
}

export interface MischievousCondition {
    $type:               ConditionType;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Tags?:               Tag[];
    Operator?:           Operator;
    Tiers?:              Tier[];
    Enchantment?:        EnchantmentEnum;
    Heroes?:             Hero[];
    Conditions?:         TriggerConditions[];
    Id?:                 string;
}

export type ActiveIn = "HandOnly" | "HandAndStash";

export interface AbilityPrerequisite {
    $type:           PrerequisiteType;
    Subject?:        PurpleSubject;
    Comparison?:     Comparison;
    Amount?:         number;
    Conditions?:     PrerequisiteConditions;
    SubjectOther?:   null;
    Attribute?:      Attribute;
    AttributeOther?: Attribute;
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
    Conditions:     FluffyCondition[] | AmbitiousConditions | null;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
    TargetMode?:    Origin;
    Origin?:        Origin;
    IncludeOrigin?: boolean;
}

export interface AmbitiousConditions {
    $type:               ConditionType;
    Attribute?:          PurpleAttribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    FluffyComparisonValue;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         BraggadociousCondition[];
    Tiers?:              Tier[];
    CardType?:           Type;
    Heroes?:             Hero[];
    AttributeType?:      Attribute;
    Id?:                 string;
    Enchantment?:        EnchantmentEnum;
}

export type PurpleAttribute = "Custom_0" | "Health" | "Custom_5" | "Custom_4" | "Ammo" | "Custom_8" | "AmmoMax" | "Custom_1" | "Custom_3" | "BurnApplyAmount" | "PoisonApplyAmount" | "RegenApplyAmount" | "Gold" | "Custom_2" | "SellPrice" | "CooldownMax" | "Freeze" | "Shield" | "Slow";

export interface BraggadociousCondition {
    $type:               ConditionType;
    Id?:                 string;
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    AttributeType?:      Attribute;
    Conditions?:         Condition1[];
    Heroes?:             Hero[];
    CardType?:           Type;
}

export interface Condition1 {
    $type:               ConditionType;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Tags?:               Tag[];
    Operator?:           Operator;
    Tiers?:              Tier[];
    Enchantment?:        EnchantmentEnum | null;
    Heroes?:             Hero[];
    Conditions?:         Condition2[];
    Id?:                 string;
    AttributeType?:      Attribute;
    CardType?:           Type;
    IsSameAsPlayerHero?: boolean;
}

export interface Condition2 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         Condition3[];
    Heroes?:             Hero[];
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Sizes?:              Size[];
    Enchantment?:        EnchantmentEnum | null;
    CardType?:           Type;
    AttributeType?:      Attribute;
    IsSameAsPlayerHero?: boolean;
}

export interface Condition3 {
    $type:               ConditionType;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Enchantment?:        EnchantmentEnum;
    IsNot?:              boolean;
    Heroes?:             Hero[];
    Operator?:           Operator;
    Conditions?:         TriggerConditions[];
    Tags?:               Tag[];
    CardType?:           Type;
    AttributeType?:      Attribute;
}

export type Priority = "Low" | "Medium" | "High" | "Highest" | "Immediate" | "Lowest";

export interface AbilityTrigger {
    $type:             TriggerType;
    Subject?:          FluffySubject;
    CombatType?:       null | string;
    Conditions?:       TriggerConditions;
    Target?:           TargetPlayerClass | null;
    Source?:           null;
    AttributeType?:    TriggerAttributeType;
    ChangeType?:       ChangeType;
    AttributeChanged?: Attribute;
    PreviousValue?:    PreviousValue | null;
    CurrentValue?:     null;
    CombatOutcome?:    CombatOutcome | null;
}

export type TriggerType = "TTriggerOnItemUsed" | "TTriggerOnCardFired" | "TTriggerOnFightStarted" | "TTriggerOnCardSelected" | "TTriggerOnEncounterSelected" | "TTriggerOnCardPerformedBurn" | "TTriggerOnCardCritted" | "TTriggerOnCardPerformedSlow" | "TTriggerOnSandstorm" | "TTriggerOnCardPerformedOverHeal" | "TTriggerOnCardPerformedPoison" | "TTriggerOnCardUpgraded" | "TTriggerOnPlayerAttributeChanged" | "TTriggerOnCardAttributeChanged" | "TTriggerOnDayStarted" | "TTriggerOnCardPurchased" | "TTriggerOnCardSold" | "TTriggerOnPlayerDied" | "TTriggerOnCardPerformedFreeze" | "TTriggerOnCardPerformedDestruction" | "TTriggerOnFightEnded" | "TTriggerOnCardPerformedShield" | "TTriggerOnCardPerformedHaste" | "TTriggerOnCardPerformedHeal" | "TTriggerOnHourStarted" | "TTriggerOnCardPerformedRegen" | "TTriggerOnCardTransformed" | "TTriggerOnBeforeCardDestroyed" | "TTriggerOnCardPerformedReload" | "TTriggerOnCardPerformedDamage" | "TTriggerOnCardReloaded" | "TTriggerOnCardPerformedCharge" | "TTriggerOnBeforeCardTransformed" | "TTriggerOnCardQuestCompleted";

export type TriggerAttributeType = "HealthMax" | "Custom_0" | "Custom_1" | "Health" | "Custom_4" | "Poison" | "Burn" | "DamageAmount" | "ShieldApplyAmount" | "HealAmount" | "SellPrice" | "Custom_2" | "Custom_3" | "RegenApplyAmount" | "Income" | "Joy" | "CritChance" | "HealthRegen" | "Shield" | "Ammo" | "BurnApplyAmount" | "Level" | "Gold" | "AmmoMax" | "PoisonApplyAmount";

export type ChangeType = "Loss" | "Gain";

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
    Conditions:     CunningConditions | null;
    Origin?:        PurpleOrigin;
    TargetMode?:    Origin;
    IncludeOrigin?: boolean;
}

export interface CunningConditions {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    PurpleComparisonValue;
    Conditions?:         Condition4[];
    Sizes?:              Size[];
    IsNot?:              boolean;
    CardType?:           Type;
    Heroes?:             Hero[];
    Enchantment?:        EnchantmentEnum | null;
    Tiers?:              Tier[];
    Id?:                 string;
    AttributeType?:      Attribute;
    IsSameAsPlayerHero?: boolean;
}

export interface Condition4 {
    $type:               ConditionType;
    CardType?:           Type;
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Conditions?:         Condition1[];
    Enchantment?:        EnchantmentEnum | null;
    Tiers?:              Tier[];
    Heroes?:             Hero[];
    AttributeType?:      Attribute;
    IsSameAsPlayerHero?: boolean;
    Id?:                 string;
}

export interface VFXConfig {
    VFXOverrideKey: null | string;
    VFXShouldPlay:  boolean;
    VFXIsTakeover:  boolean;
}

export type WorksIn = "Anywhere" | "CombatOnly" | "OutOfCombatOnly";

export interface The400_Attributes {
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
    Value?:         IndigoValue;
    Target:         StickyTarget;
    Tags?:          Tag[];
    Source?:        SubjectClass;
}

export type TentacledType = "TAuraActionCardModifyAttribute" | "TAuraActionPlayerModifyAttribute" | "TAuraActionCardAddTagsList" | "TAuraActionCardAddTagsBySource";

export interface SubjectClass {
    $type:          SourceType;
    ExcludeSelf?:   boolean;
    Conditions:     MagentaConditions | null;
    TargetMode?:    Origin;
    TargetSection?: TargetSection;
}

export interface MagentaConditions {
    $type:               ConditionType;
    Conditions?:         Condition5[];
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    PurpleValue;
    Heroes?:             Hero[];
    Operator?:           Operator;
    Tags?:               Tag[];
    CardType?:           Type;
    IsNot?:              boolean;
    Sizes?:              Size[];
    AttributeType?:      Attribute;
    Tiers?:              Tier[];
    Id?:                 string;
}

export interface Condition5 {
    $type:               ConditionType;
    Heroes?:             Hero[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Tags?:               Tag[];
}

export interface StickyTarget {
    $type:          SourceType;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Conditions:     FluffyCondition[] | FriskyConditions | null;
    Origin?:        PurpleOrigin;
    TargetMode?:    Origin;
    IncludeOrigin?: boolean;
}

export interface FriskyConditions {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    Limit;
    IsNot?:              boolean;
    Conditions?:         Condition6[];
    Sizes?:              Size[];
    Id?:                 string;
    Enchantment?:        EnchantmentEnum | null;
    Tiers?:              Tier[];
    AttributeType?:      Attribute;
    Heroes?:             Hero[];
    CardType?:           Type;
    IsSameAsPlayerHero?: boolean;
}

export interface Condition6 {
    $type:               ConditionType;
    Conditions?:         IndecentCondition[];
    Tags?:               Tag[];
    Operator?:           Operator;
    IsNot?:              boolean;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Tiers?:              Tier[];
    Sizes?:              Size[];
    Enchantment?:        EnchantmentEnum | null;
    CardType?:           Type;
    Heroes?:             Hero[];
    AttributeType?:      Attribute;
    IsSameAsPlayerHero?: boolean;
    Id?:                 string;
}

export interface IndigoValue {
    $type:          ComparisonValueType;
    Target?:        IndigoTarget;
    AttributeType?: TriggerAttributeType;
    DefaultValue?:  number;
    Modifier?:      PurpleModifier | null;
    Value?:         number;
    Distinct?:      boolean;
}

export interface IndigoTarget {
    $type:          SourceType;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Conditions:     FluffyCondition[] | MischievousConditions | null;
    Origin?:        PurpleOrigin;
    TargetMode?:    Origin;
    IncludeOrigin?: boolean;
}

export interface MischievousConditions {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    FluffyComparisonValue;
    Conditions?:         Condition7[];
    Sizes?:              Size[];
    IsNot?:              boolean;
    CardType?:           Type;
    Heroes?:             Hero[];
    Enchantment?:        EnchantmentEnum | null;
    Tiers?:              Tier[];
    Id?:                 string;
    AttributeType?:      Attribute;
    IsSameAsPlayerHero?: boolean;
}

export interface Condition7 {
    $type:               ConditionType;
    CardType?:           Type;
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Conditions?:         Condition8[];
    Enchantment?:        EnchantmentEnum | null;
    Heroes?:             Hero[];
    Id?:                 string;
}

export interface Condition8 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Id?:                 string;
    IsNot?:              boolean;
    Enchantment?:        EnchantmentEnum;
}

export interface AuraPrerequisite {
    $type:       PrerequisiteType;
    Subject:     TentacledSubject;
    Comparison?: Comparison;
    Amount?:     number;
}

export interface TentacledSubject {
    $type:          SourceType;
    Origin?:        Origin;
    TargetMode?:    Origin;
    IncludeOrigin?: boolean;
    Conditions:     FluffyCondition[] | BraggadociousConditions | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export interface BraggadociousConditions {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    FluffyComparisonValue;
    Conditions?:         Condition9[];
    Enchantment?:        EnchantmentEnum | null;
    Heroes?:             Hero[];
    CardType?:           Type;
    AttributeType?:      Attribute;
    Tiers?:              Tier[];
    Id?:                 string;
    IsSameAsPlayerHero?: boolean;
}

export interface Condition9 {
    $type:               ConditionType;
    CardType?:           Type;
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    Enchantment?:        EnchantmentEnum | null;
    Conditions?:         Condition8[];
    Heroes?:             Hero[];
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Tiers?:              Tier[];
    Id?:                 string;
}

export type CardPackID = "Mak_Core" | "Core" | "Vanessa_Core" | "Jules_Core" | "Vanessa_From_the_Shadows" | "Pygmalien_Core" | "Stelle_Core" | "Dooley_Core" | "Dooley_Primal_Dooley" | "Mak_Dangerous_Experiments" | "Pyg_Frozen_Assets" | "Vanessa_Mysteries_of_the_Deep" | "Vanessa_The_Gang" | "Pyg_Pigglestorm" | "Pyg_Investment_Opportunities" | "Mak_Lost_Treasures" | "Dooley_Dooltron";

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
    Toxic?:       Toxic;
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
    e3?: AbilitiesE3;
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
    WorksIn:             WorksIn;
}

export interface PurpleAction {
    $type:            PurpleType;
    Value?:           TentacledValue;
    AttributeType?:   Attribute;
    Operation?:       Operation;
    Duration:         FluffyDuration | null;
    TargetCount:      ComparisonValue | null;
    Target:           IndecentTarget;
    Enchantment?:     EnchantmentEnum;
    PreventOverride?: boolean;
}

export interface FluffyDuration {
    $type:        DurationType;
    DurationType: DurationTypeEnum;
}

export interface IndecentTarget {
    $type:          SourceType;
    Conditions:     Conditions1 | null;
    TargetMode?:    Origin;
    Origin?:        Origin;
    IncludeOrigin?: boolean;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export interface Conditions1 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Sizes?:              Size[];
    Enchantment?:        EnchantmentEnum | null;
    Conditions?:         Condition10[];
    CardType?:           Type;
    Heroes?:             Hero[];
    Id?:                 string;
}

export interface Condition10 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    AttributeType?:      Attribute;
    IsNot?:              boolean;
    Enchantment?:        EnchantmentEnum;
    Sizes?:              Size[];
    Tiers?:              Tier[];
    Id?:                 string;
    Heroes?:             Hero[];
    Conditions?:         Condition11[];
}

export interface Condition11 {
    $type:     ConditionType;
    Tags?:     Tag[];
    Operator?: Operator;
    IsNot?:    boolean;
}

export interface PurplePrerequisite {
    $type:       PrerequisiteType;
    Subject:     TargetPlayer;
    Comparison?: Comparison;
    Amount?:     number;
}

export interface TargetPlayer {
    $type:          SourceType;
    TargetMode?:    Origin;
    Conditions:     Conditions2 | null;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
}

export interface Conditions2 {
    $type:               ConditionType;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    PurpleValue;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    CardType?:           Type;
    Conditions?:         Condition12[];
    Tags?:               Tag[];
    Operator?:           Operator;
}

export interface Condition12 {
    $type:       ConditionType;
    Conditions?: CunningCondition[];
    Tags?:       Tag[];
    Operator?:   Operator;
    Id?:         string;
    IsNot?:      boolean;
    CardType?:   Type;
}

export interface PurpleTrigger {
    $type:             TriggerType;
    Subject?:          StickySubject;
    AttributeChanged?: Attribute;
    ChangeType?:       ChangeType;
    PreviousValue?:    null;
    CurrentValue?:     null;
    Source?:           null;
    AttributeType?:    Attribute;
    Target?:           null;
}

export interface StickySubject {
    $type:          SourceType;
    Conditions:     Conditions3 | null;
    TargetMode?:    Origin;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Origin?:        Origin;
    IncludeOrigin?: boolean;
}

export interface Conditions3 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    AttributeType?:      Attribute;
    Conditions?:         MischievousCondition[];
    Heroes?:             Hero[];
    IsNot?:              boolean;
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
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface FluffyAction {
    $type:         PurpleType;
    Value:         ComparisonValue;
    AttributeType: Attribute;
    Operation:     Operation;
    Duration:      FluffyDuration;
    TargetCount:   null;
    Target:        HilariousTarget;
}

export interface HilariousTarget {
    $type:          SourceType;
    Conditions:     Conditions4 | null;
    TargetMode?:    Origin;
    ExcludeSelf?:   boolean;
    Origin?:        Origin;
    IncludeOrigin?: boolean;
}

export interface Conditions4 {
    $type:       ConditionType;
    Conditions?: Condition13[];
    Tags?:       Tag[];
    Operator?:   Operator;
}

export interface Condition13 {
    $type:               ConditionType;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         SubjectCondition[];
}

export type E2ID = "e2";

export interface FluffyTrigger {
    $type:             TriggerType;
    Subject:           ActionSubject;
    AttributeChanged?: Attribute;
    ChangeType?:       ChangeType;
    PreviousValue?:    null;
    CurrentValue?:     null;
    Source?:           null;
}

export interface ActionSubject {
    $type:          SourceType;
    Origin?:        Origin;
    TargetMode?:    Origin;
    IncludeOrigin?: boolean;
    Conditions:     Conditions5 | null;
}

export interface Conditions5 {
    $type:        SourceType;
    Enchantment?: EnchantmentEnum;
    IsNot?:       boolean;
    Conditions?:  PurpleCondition[] | TentacledConditions | null;
}

export interface AbilitiesE3 {
    Id:                  E3ID;
    Trigger:             E3Trigger;
    ActiveIn:            ActiveIn;
    Action:              The3_Action;
    Prerequisites:       null;
    Priority:            Priority;
    InternalName:        The3_InternalName;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface The3_Action {
    $type:         PurpleType;
    Value:         ComparisonValue;
    AttributeType: Attribute;
    Operation:     Operation;
    Duration:      FluffyDuration | null;
    TargetCount:   null;
    Target:        ValueSubject;
}

export type E3ID = "e3";

export type The3_InternalName = "Counter Increment" | "";

export interface E3Trigger {
    $type:   TriggerType;
    Subject: SubjectClass;
}

export interface DeadlyAttributes {
    Custom_5?: number;
    Custom_4?: number;
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
    WorksIn:             WorksIn;
}

export interface TentacledAction {
    $type:         PurpleType;
    AttributeType: Attribute;
    Operation:     Operation;
    Value:         IndecentValue;
    Target:        AmbitiousTarget;
}

export interface AmbitiousTarget {
    $type:          SourceType;
    Conditions:     Condition12 | null;
    Origin?:        Origin;
    TargetMode?:    Origin;
    IncludeOrigin?: boolean;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export interface IndecentValue {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        SubjectClass;
    DefaultValue?:  number;
    Modifier?:      ComparisonValueModifier | null;
    AttributeType?: Attribute;
}

export type E1ID = "e1" | "q2";

export type PurpleInternalDescription = "Deadly 50" | "Deadly" | "Deadly 25" | "Deadly 2" | "Crit Chance 25%" | "" | "Deadly 2x" | "Deadly 20" | "Deadly 30" | "Shiny 1" | "Deadly 1" | "Deadly 10";

export interface FluffyPrerequisite {
    $type:      PrerequisiteType;
    Subject:    HilariousTarget;
    Comparison: Comparison;
    Amount:     number;
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
    WorksIn:             WorksIn;
}

export interface StickyAction {
    $type:         PurpleType;
    AttributeType: Attribute;
    Operation:     Operation;
    Value:         ComparisonValue;
    Target:        HilariousTarget;
}

export type HiddenTag = "Health" | "Level" | "Gold" | "Burn" | "Shield" | "DamageReference" | "Regen" | "Damage" | "Active" | "Haste" | "Crit" | "Cooldown" | "Ammo" | "EconomyReference" | "PotionReference" | "Value" | "Charge" | "Multicast" | "RegenReference" | "JoyReference" | "Heal" | "BurnReference" | "NonWeapon" | "Slow" | "ShieldReference" | "CritReference" | "Poison" | "SlowReference" | "HealReference" | "TechReference" | "Freeze" | "PoisonReference" | "Joy" | "Toughness" | "HasteReference" | "Lifesteal" | "Income" | "FreezeReference" | "Quest" | "AmmoReference" | "Passive" | "HealthReference" | "Experience" | "Regeneration";

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
    e3?: AbilitiesE3;
}

export interface TentacledE1 {
    Id:                  string;
    Trigger:             TentacledTrigger;
    ActiveIn:            ActiveIn;
    Action:              IndigoAction;
    Prerequisites:       TentacledPrerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface IndigoAction {
    $type:            PurpleType;
    ReferenceValue?:  null;
    Target:           CunningTarget;
    Value?:           IndecentValue;
    AttributeType?:   Attribute;
    Operation?:       Operation;
    Duration?:        PurpleDuration | null;
    TargetCount?:     null;
    Enchantment?:     EnchantmentEnum;
    PreventOverride?: boolean;
}

export interface CunningTarget {
    $type:          SourceType;
    TargetMode?:    Origin;
    Conditions:     Conditions6 | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Origin?:        Origin;
    IncludeOrigin?: boolean;
}

export interface Conditions6 {
    $type:        ConditionType;
    Tags?:        Tag[];
    Operator?:    Operator;
    Conditions?:  Condition14[];
    Enchantment?: null;
    IsNot?:       boolean;
}

export interface Condition14 {
    $type:        ConditionType;
    Tags?:        Tag[];
    Operator?:    Operator;
    Enchantment?: EnchantmentEnum;
}

export interface TentacledPrerequisite {
    $type:       PrerequisiteType;
    Subject:     IndigoSubject;
    Comparison?: Comparison;
    Amount?:     number;
}

export interface IndigoSubject {
    $type:        SourceType;
    Conditions:   FluffyConditions;
    TargetMode?:  Origin;
    ExcludeSelf?: boolean;
}

export interface TentacledTrigger {
    $type:             TriggerType;
    Subject?:          IndecentSubject;
    AttributeType?:    Attribute;
    ChangeType?:       ChangeType;
    Source?:           null;
    AttributeChanged?: Attribute;
    PreviousValue?:    null;
    CurrentValue?:     null;
    CombatType?:       null;
    Target?:           ComparisonValueSubject | null;
}

export interface IndecentSubject {
    $type:          SourceType;
    TargetMode?:    Origin;
    Conditions:     Conditions7 | null;
    Origin?:        Origin;
    IncludeOrigin?: boolean;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export interface Conditions7 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         Condition15[];
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Enchantment?:        null;
    IsNot?:              boolean;
    IsSameAsPlayerHero?: boolean;
    Id?:                 string;
}

export interface Condition15 {
    $type:        ConditionType;
    Tags?:        Tag[];
    Operator?:    Operator;
    Enchantment?: null;
    IsNot?:       boolean;
}

export interface TentacledE2 {
    Id:                  E2ID;
    Trigger:             StickyTrigger;
    ActiveIn:            ActiveIn;
    Action:              IndecentAction;
    Prerequisites:       E2Prerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface IndecentAction {
    $type:           PurpleType;
    Value?:          ComparisonValue | null;
    AttributeType?:  Attribute;
    Operation?:      Operation;
    Duration?:       FluffyDuration | null;
    TargetCount?:    null;
    Target:          SubjectClass;
    ReferenceValue?: null;
}

export interface E2Prerequisite {
    $type:   PrerequisiteType;
    Subject: ComparisonValueSubject;
}

export interface StickyTrigger {
    $type:             TriggerType;
    Subject?:          SubjectClass;
    AttributeType?:    Attribute;
    ChangeType?:       ChangeType;
    Source?:           null;
    AttributeChanged?: Attribute;
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
    e3?: PurpleE3;
    e1?: StickyE1;
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
    WorksIn:             WorksIn;
}

export interface HilariousAction {
    $type:         TentacledType;
    AttributeType: Attribute;
    Operation:     Operation;
    Value:         TentacledValue;
    Target:        MagentaTarget;
}

export interface MagentaTarget {
    $type:          SourceType;
    Origin?:        Origin;
    TargetMode?:    Origin;
    IncludeOrigin?: boolean;
    Conditions:     SubjectCondition | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export interface StickyE2 {
    Id:                  E2ID;
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
    AttributeType: Attribute;
    Operation:     Operation;
    Value:         HilariousValue;
    Target:        ValueSubject;
}

export interface HilariousValue {
    $type:          ComparisonValueType;
    Target?:        SubjectClass;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      ComparisonValueModifier;
    Distinct?:      boolean;
    Value?:         number;
}

export interface PurpleE3 {
    Id:                  E3ID;
    ActiveIn:            ActiveIn;
    Action:              CunningAction;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface CunningAction {
    $type:         PurpleType;
    AttributeType: Attribute;
    Operation:     Operation;
    Value:         PurpleValue;
    Target:        SubjectClass;
}

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
    InternalDescription: FluffyInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface MagentaAction {
    $type:          PurpleType;
    AttributeType?: TriggerAttributeType;
    Value?:         FluffyValue;
    Operation?:     Operation;
    Duration?:      null;
    Target?:        SubjectClass;
    TargetPlayer?:  SubjectClass;
    SpawnContext?:  FluffySpawnContext;
    TargetCount?:   null;
}

export interface FluffySpawnContext {
    $type: SpawnContextType;
    Limit: ComparisonValue;
}

export type FluffyInternalDescription = "Golden 0" | "" | "Golden 1" | "Shiny 1" | "Golden 100" | "At the start of each fight double value";

export interface IndigoTrigger {
    $type:          TriggerType;
    Subject:        TargetPlayer;
    AttributeType?: TriggerAttributeType;
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
    InternalDescription: FluffyInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface FriskyAction {
    $type:         TentacledType;
    AttributeType: Attribute;
    Operation:     Operation;
    Value:         FluffyValue;
    Target:        FriskyTarget;
}

export interface FriskyTarget {
    $type:          SourceType;
    Origin?:        Origin;
    TargetMode?:    Origin;
    IncludeOrigin?: boolean;
    Conditions:     Conditions8 | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export interface Conditions8 {
    $type:        ConditionType;
    CardType?:    Type;
    IsNot?:       boolean;
    Tags?:        Tag[];
    Operator?:    Operator;
    Sizes?:       Size[];
    Enchantment?: EnchantmentEnum | null;
    Conditions?:  Condition8[];
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
    e3?:  AbilitiesE3;
    "3"?: The3;
}

export interface The3 {
    Id:                  string;
    Trigger:             The3_Trigger;
    ActiveIn:            ActiveIn;
    Action:              The3_Action;
    Prerequisites:       E2Prerequisite[] | null;
    Priority:            Priority;
    InternalName:        The3_InternalName;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      The3_TranslationKey;
    WorksIn:             WorksIn;
}

export type The3_TranslationKey = "1765d39b625142ba0ad0f322f5e114ca" | "286b0e5fdfb97664b0b52b7612c183bf";

export interface The3_Trigger {
    $type:          TriggerType;
    Subject?:       ComparisonValueSubject;
    AttributeType?: Attribute;
    ChangeType?:    ChangeType;
    Source?:        null;
}

export interface HilariousE1 {
    Id:                  string;
    Trigger:             TentacledTrigger;
    ActiveIn:            ActiveIn;
    Action:              MischievousAction;
    Prerequisites:       TentacledPrerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: TentacledInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface MischievousAction {
    $type:            PurpleType;
    Value?:           ComparisonValue | null;
    TargetCount:      null;
    Target:           IndecentTarget;
    AttributeType?:   FluffyAttributeType;
    Operation?:       Operation;
    Duration?:        null;
    Enchantment?:     EnchantmentEnum;
    PreventOverride?: boolean;
}

export type FluffyAttributeType = "SlowAmount" | "HasteAmount" | "FreezeAmount" | "Custom_0" | "FreezeTargets" | "Multicast" | "DamageAmount" | "ChargeAmount" | "PoisonApplyAmount" | "RegenApplyAmount" | "Custom_1" | "SellPrice" | "ShieldApplyAmount" | "AmmoMax" | "Lifesteal" | "Custom_4" | "HealthMax" | "PercentCooldownReduction" | "CritChance";

export type TentacledInternalDescription = "" | "Heavy" | "If the item is not enchanted, enchant it with Heavy if able." | "Turbo" | "Turbo 3" | "Turbo 2" | "If the item is not enchanted, enchant it with Turbo if able.";

export interface IndigoE2 {
    Id:                  E2ID;
    Trigger:             The3_Trigger;
    ActiveIn:            ActiveIn;
    Action:              BraggadociousAction;
    Prerequisites:       E2Prerequisite[] | null;
    Priority:            Priority;
    InternalName:        The3_InternalName;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      The3_TranslationKey;
    WorksIn:             WorksIn;
}

export interface BraggadociousAction {
    $type:          PurpleType;
    Value:          ComparisonValue | null;
    AttributeType?: Attribute;
    Operation?:     Operation;
    Duration?:      FluffyDuration;
    TargetCount:    null;
    Target:         SubjectClass;
}

export interface HeavyAttributes {
    SlowTargets?: number;
    SlowAmount?:  number;
    Custom_4?:    number;
    SellPrice?:   number;
    Custom_5?:    number;
}

export interface HeavyAuras {
    e1?: Q2Class;
}

export interface Q2Class {
    Id:                  E1ID;
    ActiveIn:            ActiveIn;
    Action:              Action1;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface Action1 {
    $type:         PurpleType;
    AttributeType: FluffyAttributeType;
    Operation:     Operation;
    Value:         ComparisonValue;
    Target:        ValueSubject;
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
    e2?:  The3;
    e3?:  AbilitiesE3;
    "3"?: The3;
}

export interface AmbitiousE1 {
    Id:                  string;
    Trigger:             IndecentTrigger;
    ActiveIn:            ActiveIn;
    Action:              Action2;
    Prerequisites:       TentacledPrerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: StickyInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface Action2 {
    $type:            PurpleType;
    Value?:           ComparisonValue | null;
    TargetCount:      null;
    Target:           MischievousTarget;
    AttributeType?:   FluffyAttributeType;
    Operation?:       Operation;
    Duration?:        null;
    Enchantment?:     EnchantmentEnum;
    PreventOverride?: boolean;
}

export interface MischievousTarget {
    $type:          SourceType;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
    Conditions:     Condition16 | null;
    TargetMode?:    Origin;
    Origin?:        Origin;
    IncludeOrigin?: boolean;
}

export interface Condition16 {
    $type:        ConditionType;
    Tags?:        Tag[];
    Operator?:    Operator;
    Conditions?:  Condition17[];
    Enchantment?: EnchantmentEnum | null;
    IsNot?:       boolean;
    Sizes?:       Size[];
}

export interface Condition17 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Enchantment?:        EnchantmentEnum;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
}

export type StickyInternalDescription = "" | "Icy" | "Icy 2" | "If the item is not enchanted, enchant it with Icy if able.";

export interface IndecentTrigger {
    $type:             TriggerType;
    Subject?:          HilariousSubject;
    AttributeType?:    Attribute;
    ChangeType?:       ChangeType;
    Source?:           null;
    AttributeChanged?: Attribute;
    PreviousValue?:    null;
    CurrentValue?:     null;
    CombatType?:       null;
    Target?:           TargetPlayer | null;
}

export interface HilariousSubject {
    $type:          SourceType;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Conditions:     Conditions9 | null;
    Origin?:        PurpleOrigin;
    TargetMode?:    Origin;
    IncludeOrigin?: boolean;
}

export interface Conditions9 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Conditions?:         Condition18[];
    Sizes?:              Size[];
    IsNot?:              boolean;
    CardType?:           Type;
    Heroes?:             Hero[];
    Enchantment?:        EnchantmentEnum | null;
    Tiers?:              Tier[];
    Id?:                 string;
    AttributeType?:      Attribute;
    IsSameAsPlayerHero?: boolean;
}

export interface Condition18 {
    $type:               ConditionType;
    CardType?:           Type;
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Conditions?:         Condition19[];
    Enchantment?:        null;
}

export interface Condition19 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
}

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
    e2?: The3;
    e3?: AbilitiesE3;
}

export interface CunningE1 {
    Id:                  string;
    Trigger:             HilariousTrigger;
    ActiveIn:            ActiveIn;
    Action:              Action3;
    Prerequisites:       PurplePrerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: IndigoInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface Action3 {
    $type:            PurpleType;
    ReferenceValue?:  null;
    Target:           CunningTarget;
    Value?:           ComparisonValue;
    AttributeType?:   Attribute;
    Operation?:       Operation;
    Duration?:        FluffyDuration | null;
    TargetCount?:     null;
    Enchantment?:     EnchantmentEnum;
    PreventOverride?: boolean;
}

export type IndigoInternalDescription = "" | "Obsidian" | "Your Aquatic Weapons gain +5 damage for the fight." | "If the item is not enchanted, enchant it with Obsidian if able.";

export interface HilariousTrigger {
    $type:             TriggerType;
    Subject?:          AmbitiousSubject;
    AttributeType?:    Attribute;
    ChangeType?:       ChangeType;
    Source?:           null;
    CombatType?:       null;
    Target?:           SubjectClass | null;
    AttributeChanged?: Attribute;
    PreviousValue?:    null;
    CurrentValue?:     null;
}

export interface AmbitiousSubject {
    $type:          SourceType;
    TargetMode?:    Origin;
    Conditions:     Conditions10 | null;
    Origin?:        Origin;
    IncludeOrigin?: boolean;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export interface Conditions10 {
    $type:               ConditionType;
    Conditions?:         Condition20[];
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    IsNot?:              boolean;
    Enchantment?:        EnchantmentEnum | null;
    Id?:                 string;
    Sizes?:              Size[];
    Tiers?:              Tier[];
    Heroes?:             Hero[];
    CardType?:           Type;
    IsSameAsPlayerHero?: boolean;
}

export interface Condition20 {
    $type:               ConditionType;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Tags?:               Tag[];
    Operator?:           Operator;
    Enchantment?:        EnchantmentEnum | null;
    IsNot?:              boolean;
    Sizes?:              Size[];
    Tiers?:              Tier[];
    Id?:                 string;
    Heroes?:             Hero[];
    CardType?:           Type;
}

export interface ObsidianAttributes {
    DamageAmount?: number;
    Custom_4?:     number;
    Custom_5?:     number;
}

export interface ObsidianAuras {
    e1?: MagentaE1;
    e2?: StickyE2;
    e3?: FluffyE3;
}

export interface MagentaE1 {
    Id:                  E1ID;
    ActiveIn:            ActiveIn;
    Action:              Action4;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: IndecentInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface Action4 {
    $type:         PurpleType;
    AttributeType: Attribute;
    Operation:     Operation;
    Value:         AmbitiousValue;
    Target:        AmbitiousTarget;
}

export interface AmbitiousValue {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        ActionSubject;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      ComparisonValueModifier | null;
}

export type IndecentInternalDescription = "" | "Obsidian 2" | "Obsidian 1";

export interface FluffyE3 {
    Id:                  string;
    ActiveIn:            ActiveIn;
    Action:              Action5;
    Prerequisites:       E3Prerequisite[] | null;
    InternalName:        PurpleInternalName;
    InternalDescription: E3InternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      E3TranslationKey;
    WorksIn:             WorksIn;
}

export interface Action5 {
    $type:         PurpleType;
    AttributeType: Attribute;
    Operation:     Operation;
    Value:         TentacledValue;
    Target:        ValueSubject;
}

export type E3InternalDescription = "" | "Original Amount" | "Obsidian" | "Sets the value of Damage";

export type PurpleInternalName = "Tooltip Handling" | "Obsidian Luxury Tents Aura" | "Obsidian Memento Mori Aura" | "Obsidian Ledger Aura";

export interface E3Prerequisite {
    $type:      PrerequisiteType;
    Subject:    ValueSubject;
    Comparison: Comparison;
    Amount:     number;
}

export type E3TranslationKey = "9ed8516049000a0e1a90054e0aab06ce" | "a193d872e6cb3a8dc2d05aedb98955c0" | "93911bec96cb67bfcc317e7f7665af7b" | "106d47e56a8a3813026e1611617d058d" | "b7b4b93275c7490d6e2b0997872ba2e1" | "93826b7b7a154c7823629388e16a3823";

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
    e2?: IndecentE2;
}

export interface FriskyE1 {
    Id:                  string;
    Trigger:             FluffyTrigger;
    ActiveIn:            ActiveIn;
    Action:              Action6;
    Prerequisites:       null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: HilariousInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface Action6 {
    $type:            PurpleType;
    Value?:           ComparisonValue;
    AttributeType?:   Attribute;
    Operation?:       Operation;
    Duration:         null;
    TargetCount:      null;
    Target:           BraggadociousTarget;
    Enchantment?:     EnchantmentEnum;
    PreventOverride?: boolean;
}

export interface BraggadociousTarget {
    $type:          SourceType;
    Conditions:     Conditions11 | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Origin?:        Origin;
    TargetMode?:    Origin;
    IncludeOrigin?: boolean;
}

export interface Conditions11 {
    $type:        SourceType;
    Enchantment?: EnchantmentEnum | null;
    IsNot?:       boolean;
    Conditions?:  Condition16[];
}

export type HilariousInternalDescription = "When this item gains Freeze, remove Freeze from it." | "When this item gains Haste, remove Haste from it." | "Radiant" | "If the item is not enchanted, enchant it with Radiant if able.";

export interface IndecentE2 {
    Id:                  E2ID;
    Trigger:             AmbitiousTrigger;
    ActiveIn:            ActiveIn;
    Action:              The3_Action;
    Prerequisites:       null;
    Priority:            Priority;
    InternalName:        FluffyInternalName;
    InternalDescription: AmbitiousInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      PurpleTranslationKey;
    WorksIn:             WorksIn;
}

export type AmbitiousInternalDescription = "When this item gains Slow, remove Slow from it.";

export type FluffyInternalName = "Radiant Slow" | "Radiant Dooltron";

export type PurpleTranslationKey = "db02baf95ec3866b3bcf0761025fd005";

export interface AmbitiousTrigger {
    $type:            TriggerType;
    Subject:          ValueSubject;
    AttributeChanged: Attribute;
    ChangeType:       ChangeType;
    PreviousValue:    null;
    CurrentValue:     null;
    Source:           null;
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
    Custom_4?:         number;
    RegenApplyAmount?: number;
    Custom_5?:         number;
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
    e1?: TentacledE1;
    e2?: HilariousE2;
    e3?: AbilitiesE3;
}

export interface HilariousE2 {
    Id:                  E2ID;
    Trigger:             CunningTrigger;
    ActiveIn:            ActiveIn;
    Action:              IndecentAction;
    Prerequisites:       E2Prerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: CunningInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export type CunningInternalDescription = "" | "Your other Shield items gain +9 Shield for the fight." | "Deal {ability.0} damage to the player with less health.";

export interface CunningTrigger {
    $type:          TriggerType;
    Subject?:       SubjectClass;
    AttributeType?: TriggerAttributeType;
    ChangeType?:    ChangeType;
    Source?:        null;
    Target?:        null;
}

export interface ShieldedAttributes {
    ShieldApplyAmount?: number;
    Custom_4?:          number;
    Custom_5?:          number;
}

export interface ShieldedAuras {
    e2?: StickyE2;
    e3?: TentacledE3;
    e1?: StickyE1;
}

export interface TentacledE3 {
    Id:                  E3ID;
    ActiveIn:            ActiveIn;
    Action:              Action7;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface Action7 {
    $type:         PurpleType;
    AttributeType: Attribute;
    Operation:     Operation;
    Value:         TentacledValue;
    Target:        SubjectClass;
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
    e1?: MischievousE1;
}

export interface MischievousE1 {
    Id:                  string;
    Trigger:             MagentaTrigger;
    ActiveIn:            ActiveIn;
    Action:              Action8;
    Prerequisites:       null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface Action8 {
    $type:            PurpleType;
    ReferenceValue?:  null;
    Target?:          BraggadociousTarget;
    TargetPlayer?:    SubjectClass;
    SpawnContext?:    FluffySpawnContext;
    Enchantment?:     EnchantmentEnum;
    Duration?:        null;
    PreventOverride?: boolean;
    TargetCount?:     null;
}

export interface MagentaTrigger {
    $type:       TriggerType;
    CombatType?: null;
    Subject?:    HilariousTarget;
    Source?:     null;
}

export interface ShinyAttributes {
    Multicast?:  number;
    Custom_1?:   number;
    CritChance?: number;
}

export interface ShinyAuras {
    e1?: BraggadociousE1;
    e2?: AmbitiousE2;
    e3?: E4Class;
    e4?: E4Class;
    e5?: E4Class;
    e6?: E4Class;
}

export interface BraggadociousE1 {
    Id:                  E1ID;
    ActiveIn:            ActiveIn;
    Action:              Action9;
    Prerequisites:       StickyPrerequisite[] | null;
    InternalName:        string;
    InternalDescription: MagentaInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface Action9 {
    $type:         TentacledType;
    AttributeType: FluffyAttributeType;
    Operation:     Operation;
    Value:         AmbitiousValue;
    Target:        Target1;
}

export interface Target1 {
    $type:          SourceType;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Conditions:     Conditions12 | null;
    Origin?:        Origin;
    TargetMode?:    Origin;
    IncludeOrigin?: boolean;
}

export interface Conditions12 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    IsNot?:              boolean;
    Conditions?:         Condition21[];
    Sizes?:              Size[];
    Id?:                 string;
}

export interface Condition21 {
    $type:               ConditionType;
    Conditions?:         SubjectCondition[];
    Tags?:               Tag[];
    Operator?:           Operator;
    IsNot?:              boolean;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
}

export type MagentaInternalDescription = "Shiny 1" | "Shiny" | "" | "Shiny 2" | "Sets the value of burn" | "Golden 1" | "Shiny None" | "Icy 2" | "XP 2x" | "Deadly 25" | "Sets the value of poison";

export interface StickyPrerequisite {
    $type:       PrerequisiteType;
    Subject:     SubjectClass;
    Comparison?: Comparison;
    Amount?:     number;
}

export interface AmbitiousE2 {
    Id:                  E2ID;
    ActiveIn:            ActiveIn;
    Action:              Action10;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: MagentaInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface Action10 {
    $type:         PurpleType;
    AttributeType: FluffyAttributeType;
    Operation:     Operation;
    Value:         CunningValue;
    Target:        HilariousTarget;
}

export interface CunningValue {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        ActionSubject;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      null;
}

export interface E4Class {
    Id:                  string;
    ActiveIn:            ActiveIn;
    Action:              E4Action;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface E4Action {
    $type:         PurpleType;
    AttributeType: Attribute;
    Operation:     Operation;
    Value:         CunningValue;
    Target:        ActionSubject;
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

export type The400_InternalDescription = "" | "Side with the merchant and shoo the customer away." | "Sells items" | "You feed the creature and it leads you to an item!" | "The creature hums with happiness and you feel at peace." | "Day 1" | "The creature purrs with joy and you feel warm inside." | "Sells Items" | "Spend your time looking for spare change instead of investing." | "Close the circus down and free all the animals." | "Gain a Diamond-tier item" | "You own the circus! What do you want to do with it?" | "Have a nice day :)" | "Oni Mask" | "Any investment helps!" | "Shuriken" | "Keep the wallet for yourself.";

export interface The400_Localization {
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
    IconKeyOverride:   HiddenTag | null;
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
    $type:         PurpleType;
    Value:         TentacledValue;
    AttributeType: TriggerAttributeType;
    Operation:     Operation;
    Duration:      null;
    TargetCount?:  null;
    Target:        TargetPlayer;
}

export interface Ce1Trigger {
    $type: TriggerType;
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
    q2?: Q2;
    q3?: Q3;
    q4?: Q4;
    q5?: Q5;
}

export interface AbilitiesQ1 {
    Id:                  string;
    Trigger:             Q1Trigger;
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
    $type:           PurpleType;
    Value?:          TentacledValue | null;
    AttributeType?:  Attribute;
    Operation?:      Operation;
    Duration?:       FluffyDuration;
    TargetCount?:    null;
    Target:          TargetPlayer;
    ReferenceValue?: null;
}

export interface Q1Trigger {
    $type:    TriggerType;
    Subject?: SubjectClass;
    Target?:  null;
}

export interface Q2 {
    Id:                  E1ID;
    Trigger:             Q2Trigger;
    ActiveIn:            ActiveIn;
    Action:              Q3Action;
    Prerequisites:       null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface Q3Action {
    $type:           PurpleType;
    Value?:          TentacledValue | null;
    AttributeType?:  Attribute;
    Operation?:      Operation;
    Duration?:       FluffyDuration;
    TargetCount?:    null;
    Target:          SubjectClass;
    ReferenceValue?: null;
}

export interface Q2Trigger {
    $type:    TriggerType;
    Subject?: MagentaTarget;
    Target?:  null;
}

export interface Q3 {
    Id:                  string;
    Trigger:             Q3Trigger;
    ActiveIn:            ActiveIn;
    Action:              Q3Action;
    Prerequisites:       null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface Q3Trigger {
    $type:    TriggerType;
    Subject?: CunningSubject;
    Target?:  null;
}

export interface CunningSubject {
    $type:         SourceType;
    TargetSection: TargetSection;
    ExcludeSelf:   boolean;
    Conditions:    null;
}

export interface Q4 {
    Id:                  string;
    Trigger:             Q3Trigger;
    ActiveIn:            ActiveIn;
    Action:              Q4Action;
    Prerequisites:       null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface Q4Action {
    $type:          PurpleType;
    TargetCount:    null;
    Target:         SubjectClass;
    Value?:         TentacledValue | null;
    AttributeType?: Attribute;
    Operation?:     Operation;
    Duration?:      FluffyDuration | null;
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
    Target:      TargetPlayer;
}

export interface RewardAttributes {
    ChargeAmount?:   number;
    ChargeTargets?:  number;
    EnchantTargets?: number;
}

export interface RewardAuras {
    q1?: AurasQ1;
    q2?: Q2Class;
}

export interface AurasQ1 {
    Id:                  string;
    ActiveIn:            ActiveIn;
    Action:              Action12;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface Action12 {
    $type:         TentacledType;
    AttributeType: HiddenTag;
    Operation:     Operation;
    Value:         ComparisonValue;
    Target:        TargetPlayer;
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
    Subject:           TargetPlayer;
    Target?:           null;
    AttributeChanged?: Attribute;
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
    Conditions?:  Condition22[];
}

export interface Condition22 {
    $type:       ConditionType;
    Enchantment: EnchantmentEnum;
}

export interface The400_Tiers {
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
    Id:                  string;
    Trigger:             Ce1Trigger;
    ActiveIn:            ActiveIn;
    Action:              T1Action;
    Prerequisites:       null;
    Priority:            Size;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           null;
    TranslationKey:      string;
    WorksIn:             WorksIn;
}

export interface T1Action {
    $type:            PurpleType;
    Enchantment?:     EnchantmentEnum;
    Duration?:        null;
    PreventOverride?: boolean;
    TargetCount?:     null;
    Target?:          ValueSubject;
    TargetPlayer?:    TargetPlayer;
    SpawnContext?:    FluffySpawnContext;
}

export type Version = "4.0.0";
