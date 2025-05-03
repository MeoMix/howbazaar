export interface CardsD {
    "1.0.0": The100[];
}

export interface The100 {
    $type:                         The100_$Type;
    StartingTier:                  Tier;
    Tiers?:                        Tiers;
    Type:                          Type;
    Id:                            string;
    Version:                       Version;
    InternalName:                  string;
    InternalDescription:           The100_InternalDescription | null;
    Size:                          Size;
    Heroes:                        Hero[];
    Tags:                          Tag[];
    HiddenTags:                    HiddenTag[];
    ArtKey:                        string;
    CardPackId:                    CardPackID;
    TranslationKey:                string;
    AudioKey:                      null | string;
    Localization:                  The100_Localization;
    Abilities:                     { [key: string]: Ability };
    Auras:                         { [key: string]: Aura };
    CombatantType?:                CombatantType;
    RewardCombatGold?:             number;
    RewardVictory?:                Reward;
    RewardDefeat?:                 Reward;
    ExperienceAwardUponSelection?: number;
    Attributes?:                   The100_Attributes | null;
    Enchantments?:                 Enchantments | null;
    Transform?:                    Transform | null;
    IsReselectable?:               boolean;
    SelectionContext?:             SelectionContext | null;
    SelectionRequirements?:        null;
    SelectionCriteria?:            SelectionCriteria;
}

export type The100_$Type = "TCardSkill" | "TCardEncounterCombat" | "TCardItem" | "TCardEncounterStep" | "TCardEncounterEvent" | "TCardEncounterPedestal";

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
    Value?:           TentacledValue | null;
    AttributeType?:   Attribute;
    Operation?:       Operation;
    Duration?:        PurpleDuration | null;
    TargetCount?:     Limit | null;
    Target?:          PurpleTarget | null;
    ReferenceValue?:  null;
    SpawnContext?:    PurpleSpawnContext;
    UpgradeToTier?:   null;
    TargetPlayer?:    TargetPlayer;
    Enchantment?:     string;
    PreventOverride?: boolean;
    Abilities?:       null;
    Enchantments?:    EnchantmentElement[];
    Source?:          Source;
}

export type PurpleType = "TActionCardModifyAttribute" | "TActionPlayerDamage" | "TActionPlayerShieldApply" | "TActionGameDealCards" | "TActionCardUpgrade" | "TActionPlayerModifyAttribute" | "TActionCardHaste" | "TActionCardCharge" | "TActionPlayerPoisonApply" | "TActionPlayerJoyApply" | "TActionGameSpawnCards" | "TActionPlayerBurnApply" | "TActionPlayerHeal" | "TActionCardEnchant" | "TActionCardFreeze" | "TActionPlayerRegenApply" | "TActionCardTransform" | "TActionCardSlow" | "TActionCardForceUse" | "TActionCardEnchantRandom" | "TActionPlayerPoisonRemove" | "TActionCardDisable" | "TActionCardReload" | "TActionCardBeginSandstorm" | "TActionPlayerReviveHeal" | "TActionPlayerBurnRemove" | "TActionCardDestroy" | "TActionCardAddTagsBySource" | "TAuraActionCardModifyAttribute";

export type Attribute = "DamageAmount" | "CritChance" | "Multicast" | "SellPrice" | "HealthMax" | "JoyApplyAmount" | "Experience" | "ShieldApplyAmount" | "Gold" | "Income" | "CooldownMax" | "HealAmount" | "Custom_1" | "PoisonApplyAmount" | "BurnApplyAmount" | "PercentDamageReduction" | "Custom_0" | "Freeze" | "Prestige" | "HealthRegen" | "AmmoMax" | "Shield" | "RegenApplyAmount" | "FreezeAmount" | "BuyPrice" | "Lifesteal" | "Counter" | "HasteAmount" | "Custom_2" | "Custom_5" | "Custom_3" | "Slow" | "SlowAmount" | "Custom_4" | "Custom_8" | "Health" | "Ammo" | "Burn" | "Poison" | "Haste" | "Level" | "Joy" | "DamageCrit" | "FreezeTargets" | "ChargeAmount" | "RerollCostModifier" | "BurnRemoveAmount" | "PoisonRemoveAmount";

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

export type Operation = "Add" | "Subtract" | "Multiply";

export interface Source {
    $type:          SourceType;
    Conditions:     SourceConditions | null;
    TargetMode?:    TargetMode;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export type SourceType = "TTargetCardSelf" | "TTargetPlayerAbsolute" | "TTargetCardSection" | "TTargetPlayerRelative" | "TTargetCardXMost" | "TTargetCardTriggerSource" | "TTargetCardRandom" | "TTargetCardPositional" | "TTargetPlayer" | "TCardConditionalAnd" | "TCardConditionalOr";

export interface SourceConditions {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    AttributeType?:      Attribute;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    PurpleValue;
    Conditions?:         PurpleCondition[];
    CardType?:           Type;
    IsNot?:              boolean;
    Sizes?:              Size[];
    Tiers?:              Tier[];
}

export type ConditionType = "TCardConditionalTag" | "TCardConditionalAttributeLowest" | "TCardConditionalAttribute" | "TPlayerConditionalAttribute" | "TCardConditionalAnd" | "TCardConditionalType" | "TCardConditionalSize" | "TCardConditionalAttributeHighest" | "TCardConditionalTier" | "TCardConditionalHiddenTag" | "TCardConditionalOr" | "TCardConditionalEnchantmentEligible" | "TCardConditionalHasEnchantment" | "TCardConditionalId" | "TCardConditionalTriggerSource" | "TCardConditionalPlayerHero";

export type Type = "Item" | "Skill" | "CombatEncounter" | "EncounterStep" | "EventEncounter" | "PedestalEncounter";

export type Comparison = "GreaterThan" | "Equal" | "LessThan" | "GreaterThanOrEqual" | "LessThanOrEqual" | "NotEqual";

export interface PurpleValue {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        ComparisonValueSubject;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      ComparisonValueModifier | null;
}

export type ComparisonValueType = "TFixedValue" | "TReferenceValuePlayerAttribute" | "TReferenceValueCardAttribute" | "TReferenceValuePlayerAttributeChange" | "TReferenceValueCardCount" | "TRangeValue" | "TReferenceValueCardTagCount";

export interface ComparisonValueModifier {
    ModifyMode: Operation;
    Value:      ComparisonValue;
}

export interface ComparisonValue {
    $type: ComparisonValueType;
    Value: number;
}

export interface FluffyValue {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        ComparisonValueSubject;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      ComparisonValueModifier;
}

export interface PurpleConditions {
    $type:              ConditionType;
    Attribute:          Attribute;
    ComparisonOperator: Comparison;
    ComparisonValue:    FluffyValue;
}

export interface ComparisonValueSubject {
    $type:       SourceType;
    TargetMode?: TargetMode;
    Conditions:  PurpleConditions | null;
}

export type TargetMode = "Self" | "Opponent" | "Player" | "LeftMostCard" | "Neighbor" | "RightCard" | "LeftCard" | "Both" | "RightMostCard" | "AllRightCards" | "AllLeftCards";

export interface PurpleCondition {
    $type:               ConditionType;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Tags?:               Tag[];
    Operator?:           Operator;
    CardType?:           Type;
    IsNot?:              boolean;
}

export type Operator = "Any" | "None";

export type Tag = "Merchant" | "Weapon" | "Shield" | "Heal" | "Joy" | "Burn" | "Poison" | "Regen" | "Core" | "Friend" | "Aquatic" | "Toy" | "Tool" | "Dinosaur" | "Tech" | "Dragon" | "Food" | "Ray" | "Potion" | "Relic" | "Property" | "Vehicle" | "Slow" | "Reagent" | "Freeze" | "Damage" | "Haste" | "Apparel" | "Loot";

export type Size = "Large" | "Medium" | "Small";

export type Tier = "Silver" | "Gold" | "Diamond" | "Legendary" | "Bronze";

export type TargetSection = "AbsolutePlayerHandAndStash" | "SelfHand" | "SelfBoard" | "SelfHandAndStash" | "OpponentHand" | "SelfStash" | "AllHands" | "AbsolutePlayerHand" | "SelfNeighbors";

export interface PurpleSpawnContext {
    $type: SpawnContextType;
    Limit: Limit;
}

export type SpawnContextType = "TSpawnContextQuery";

export interface Limit {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        LimitTarget;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      ComparisonValueModifier | null;
}

export interface LimitTarget {
    $type:      SourceType;
    Conditions: FluffyCondition[] | FluffyConditions | null;
}

export interface FluffyCondition {
    $type:               ConditionType;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         TargetCondition[];
}

export interface TargetCondition {
    $type:    ConditionType;
    Tags:     Tag[];
    Operator: Operator;
}

export interface FluffyConditions {
    $type:               ConditionType;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Enchantment?:        string;
}

export interface PurpleTarget {
    $type:          SourceType;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Conditions:     FluffyCondition[] | TentacledConditions | null;
    TargetMode?:    TargetMode;
    Origin?:        Origin;
    IncludeOrigin?: boolean;
}

export interface TentacledConditions {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    PurpleComparisonValue;
    Conditions?:         TentacledCondition[];
    Enchantment?:        null | string;
    IsNot?:              boolean;
    Tiers?:              Tier[];
    AttributeType?:      Attribute;
    Id?:                 string;
    Sizes?:              Size[];
    IsSameAsPlayerHero?: boolean;
    CardType?:           Type;
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
    Conditions?:         StickyCondition[];
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Sizes?:              Size[];
    Enchantment?:        EnchantmentEnum | null;
    CardType?:           Type;
    Id?:                 string;
    IsSameAsPlayerHero?: boolean;
}

export interface StickyCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    AttributeType?:      Attribute;
    CardType?:           Type;
    IsNot?:              boolean;
    Sizes?:              Size[];
    Enchantment?:        null | string;
    Conditions?:         IndigoCondition[];
    IsSameAsPlayerHero?: boolean;
    Tiers?:              Tier[];
}

export interface IndigoCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Enchantment?:        EnchantmentEnum;
    IsNot?:              boolean;
    Conditions?:         TriggerConditions[];
}

export interface IndecentCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Enchantment?:        EnchantmentEnum;
    IsNot?:              boolean;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Conditions?:         TriggerConditions[];
}

export interface TriggerConditions {
    $type:        ConditionType;
    Tags?:        Tag[];
    Operator?:    Operator;
    Conditions?:  IndecentCondition[];
    Enchantment?: string;
}

export type EnchantmentEnum = "Radiant" | "Shiny" | "Toxic" | "Obsidian" | "Deadly";

export type Origin = "Self" | "TriggerSource";

export interface TargetPlayer {
    $type:          SourceType;
    TargetMode?:    TargetMode;
    Conditions:     StickyConditions | null;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
}

export interface StickyConditions {
    $type:               ConditionType;
    Conditions?:         PurpleCondition[];
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    PurpleValue;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    IsNot?:              boolean;
    AttributeType?:      Attribute;
    Tiers?:              Tier[];
    CardType?:           Type;
}

export interface TentacledValue {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        FluffyTarget;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      PurpleModifier | null;
    MinValue?:      number;
    MaxValue?:      number;
}

export interface PurpleModifier {
    ModifyMode: Operation;
    Value:      Limit;
}

export interface FluffyTarget {
    $type:          SourceType;
    Conditions:     FluffyCondition[] | IndigoConditions | null;
    TargetMode?:    TargetMode;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export interface IndigoConditions {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    AttributeType?:      Attribute;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    PurpleComparisonValue;
    Conditions?:         PurpleCondition[];
    CardType?:           Type;
    IsNot?:              boolean;
    Sizes?:              Size[];
    Tiers?:              Tier[];
    Enchantment?:        string;
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
    Conditions:     FluffyCondition[] | IndecentConditions | null;
    TargetMode?:    TargetMode;
    Origin?:        TargetMode;
    IncludeOrigin?: boolean;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export interface IndecentConditions {
    $type:               ConditionType;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    PurpleComparisonValue;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         HilariousCondition[];
    Tiers?:              Tier[];
    AttributeType?:      Attribute;
    CardType?:           Type;
    Enchantment?:        string;
}

export interface HilariousCondition {
    $type:               ConditionType;
    Id?:                 string;
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    AttributeType?:      Attribute;
    Conditions?:         AmbitiousCondition[];
    IsSameAsPlayerHero?: boolean;
    CardType?:           Type;
}

export interface AmbitiousCondition {
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
    Conditions?:         TriggerConditions[];
    Id?:                 string;
}

export type Priority = "Low" | "Medium" | "High" | "Highest" | "Immediate" | "Lowest";

export interface AbilityTrigger {
    $type:             TriggerType;
    Subject?:          FluffySubject;
    CombatType?:       null | string;
    Conditions?:       TriggerConditions;
    AttributeType?:    Attribute;
    ChangeType?:       ChangeType;
    CombatOutcome?:    CombatOutcome | null;
    AttributeChanged?: Attribute;
    PreviousValue?:    PreviousValue | null;
    CurrentValue?:     null;
}

export type TriggerType = "TTriggerOnItemUsed" | "TTriggerOnCardFired" | "TTriggerOnFightStarted" | "TTriggerOnCardSelected" | "TTriggerOnEncounterSelected" | "TTriggerOnCardPerformedBurn" | "TTriggerOnCardCritted" | "TTriggerOnCardPerformedSlow" | "TTriggerOnPlayerAttributeChanged" | "TTriggerOnCardPerformedOverHeal" | "TTriggerOnCardPerformedPoison" | "TTriggerOnCardUpgraded" | "TTriggerOnDayStarted" | "TTriggerOnCardPurchased" | "TTriggerOnCardSold" | "TTriggerOnPlayerDied" | "TTriggerOnCardPerformedFreeze" | "TTriggerOnCardPerformedDestruction" | "TTriggerOnFightEnded" | "TTriggerOnCardPerformedShield" | "TTriggerOnCardPerformedHaste" | "TTriggerOnCardAttributeChanged" | "TTriggerOnCardPerformedHeal" | "TTriggerOnHourStarted" | "TTriggerOnCardTransformed" | "TTriggerOnCardPerformedRegen" | "TTriggerOnCardPerformedReload" | "TTriggerOnCardReloaded" | "TTriggerOnBeforeCardTransformed";

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
    Conditions:     HilariousConditions | null;
    TargetMode?:    TargetMode;
    Origin?:        Origin;
    IncludeOrigin?: boolean;
}

export interface HilariousConditions {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    PurpleComparisonValue;
    Conditions?:         CunningCondition[];
    Sizes?:              Size[];
    IsNot?:              boolean;
    CardType?:           Type;
    Enchantment?:        EnchantmentEnum | null;
    Tiers?:              Tier[];
    Id?:                 string;
    IsSameAsPlayerHero?: boolean;
    AttributeType?:      Attribute;
}

export interface CunningCondition {
    $type:               ConditionType;
    CardType?:           Type;
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Conditions?:         MagentaCondition[];
    Enchantment?:        null | string;
    AttributeType?:      Attribute;
    IsSameAsPlayerHero?: boolean;
    Tiers?:              Tier[];
}

export interface MagentaCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Id?:                 string;
    IsNot?:              boolean;
    Enchantment?:        ConditionInternalDescription;
}

export type ConditionInternalDescription = "Sets the value of burn" | "Sets the value of Burn" | "" | "Burn 1 for each non-Weapon item you have." | "Sets the value of poison" | "Burn 1 for each Aquatic or Toy item you have." | "Sets shield" | "Sets the value of heal" | "Sets the value of Heal" | "Sets the value of shield" | "Restorative" | "Sets the value of Restorative Dragon Whelp" | "Sets the value of Restorative Submarine Ability" | "Sets the value of Restorative The Boulder" | "Heal 12 for each non-Weapon item you have." | "Heal 15 for each Aquatic or Toy item you have." | "Sets the value of ShieldApplyAmount" | "Sets the value of Restorative Submersible" | "Sets the value of Shield" | "Sets the value of Shielded The Boulder" | "Sets Shield" | "Shield 8 for each non-Weapon item you have." | "Shield 10 for each Aquatic or Toy item you have." | "Sets the value of Poison" | "Poison 1 for each non-Weapon item you have." | "Poison 1 for each Aquatic or Toy item you have.";

export interface VFXConfig {
    VFXOverrideKey: null | string;
    VFXShouldPlay:  boolean;
    VFXIsTakeover:  boolean;
}

export interface The100_Attributes {
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
    AttributeType?: Attribute;
    Operation?:     Operation;
    Value?:         StickyValue;
    Target:         TentacledTarget;
    Tags?:          Tag[];
    Source?:        Source;
}

export type TentacledType = "TAuraActionCardModifyAttribute" | "TAuraActionPlayerModifyAttribute" | "TAuraActionCardAddTagsList" | "TAuraActionCardAddTagsBySource";

export interface TentacledTarget {
    $type:          SourceType;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Conditions:     FluffyCondition[] | AmbitiousConditions | null;
    TargetMode?:    TargetMode;
    Origin?:        Origin;
    IncludeOrigin?: boolean;
}

export interface AmbitiousConditions {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Conditions?:         FriskyCondition[];
    Sizes?:              Size[];
    IsNot?:              boolean;
    CardType?:           Type;
    Enchantment?:        null | string;
    Tiers?:              Tier[];
    Id?:                 string;
    IsSameAsPlayerHero?: boolean;
    AttributeType?:      Attribute;
}

export interface FriskyCondition {
    $type:               ConditionType;
    CardType?:           Type;
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Conditions?:         MischievousCondition[];
    Enchantment?:        null | string;
    AttributeType?:      Attribute;
    IsSameAsPlayerHero?: boolean;
    Tiers?:              Tier[];
    Id?:                 string;
}

export interface MischievousCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Conditions?:         IndecentCondition[];
    Enchantment?:        string;
}

export interface StickyValue {
    $type:          StickyType;
    Target?:        StickyTarget;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      PurpleModifier | null;
    Value?:         number;
    Distinct?:      boolean;
}

export type StickyType = "TReferenceValueCardAttribute" | "TReferenceValueCardAttributeAggregate" | "TReferenceValueCardCount" | "TFixedValue" | "TReferenceValuePlayerAttribute" | "TReferenceValueCardTagCount";

export interface StickyTarget {
    $type:          SourceType;
    Conditions:     FluffyCondition[] | CunningConditions | null;
    Origin?:        TargetMode;
    TargetMode?:    TargetMode;
    IncludeOrigin?: boolean;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export interface CunningConditions {
    $type:               ConditionType;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         BraggadociousCondition[];
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    PurpleComparisonValue;
    Id?:                 string;
    AttributeType?:      Attribute;
    Tiers?:              Tier[];
    CardType?:           Type;
    Enchantment?:        null | string;
}

export interface BraggadociousCondition {
    $type:               ConditionType;
    CardType?:           Type;
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    Enchantment?:        null | string;
    Conditions?:         Condition1[];
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Id?:                 string;
}

export interface Condition1 {
    $type:        ConditionType;
    Id?:          string;
    IsNot?:       boolean;
    Tags?:        Tag[];
    Operator?:    Operator;
    Enchantment?: ConditionInternalDescription;
}

export interface AuraPrerequisite {
    $type:       PrerequisiteType;
    Subject:     TentacledSubject;
    Comparison?: Comparison;
    Amount?:     number;
}

export interface TentacledSubject {
    $type:          SourceType;
    Origin?:        TargetMode;
    TargetMode?:    TargetMode;
    IncludeOrigin?: boolean;
    Conditions:     FluffyCondition[] | MagentaConditions | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export interface MagentaConditions {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    PurpleComparisonValue;
    Conditions?:         Condition2[];
    AttributeType?:      Attribute;
    CardType?:           Type;
    Tiers?:              Tier[];
    Id?:                 string;
    Enchantment?:        string;
}

export interface Condition2 {
    $type:               ConditionType;
    CardType?:           Type;
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    Enchantment?:        ConditionInternalDescription | null;
    Conditions?:         Condition1[];
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
}

export type CardPackID = "Mak_Core" | "Core" | "Vanessa_Core" | "Jules_Core" | "Pygmalien_Core" | "Stelle_Core" | "Dooley_Core" | "Pyg_Frozen_Assets" | "Vanessa_Mysteries_of_the_Deep" | "Vanessa_The_Gang" | "Dooley_Dooltron";

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
    AttributeType?:   Attribute;
    Operation?:       Operation;
    Duration:         FluffyDuration | null;
    TargetCount:      ComparisonValue | null;
    Target:           IndigoTarget;
    Enchantment?:     EnchantmentEnum;
    PreventOverride?: boolean;
}

export interface FluffyDuration {
    $type:        DurationType;
    DurationType: DurationTypeEnum;
}

export interface IndigoTarget {
    $type:          SourceType;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Conditions:     FriskyConditions | null;
    TargetMode?:    TargetMode;
    Origin?:        TargetMode;
    IncludeOrigin?: boolean;
}

export interface FriskyConditions {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Conditions?:         Condition3[];
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Sizes?:              Size[];
    Enchantment?:        EnchantmentEnum | null;
    CardType?:           Type;
    Id?:                 string;
}

export interface Condition3 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    AttributeType?:      Attribute;
    CardType?:           Type;
    IsNot?:              boolean;
    Sizes?:              Size[];
    Enchantment?:        null | string;
    Conditions?:         Condition4[];
    IsSameAsPlayerHero?: boolean;
    Tiers?:              Tier[];
}

export interface Condition4 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
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
    AttributeChanged?: Attribute;
    ChangeType?:       ChangeType;
    PreviousValue?:    null;
    CurrentValue?:     null;
    AttributeType?:    Attribute;
}

export interface StickySubject {
    $type:          SourceType;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Conditions:     MischievousConditions | null;
    TargetMode?:    TargetMode;
    Origin?:        Origin;
    IncludeOrigin?: boolean;
}

export interface MischievousConditions {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Conditions?:         Condition5[];
    Sizes?:              Size[];
    IsNot?:              boolean;
    CardType?:           Type;
    Enchantment?:        EnchantmentEnum | null;
    Tiers?:              Tier[];
    Id?:                 string;
    IsSameAsPlayerHero?: boolean;
}

export interface Condition5 {
    $type:               ConditionType;
    CardType?:           Type;
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Conditions?:         Condition4[];
    Enchantment?:        null;
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
    Value:         ComparisonValue;
    AttributeType: Attribute;
    Operation:     Operation;
    Duration:      FluffyDuration;
    TargetCount:   null;
    Target:        IndecentTarget;
}

export interface IndecentTarget {
    $type:          SourceType;
    Origin?:        TargetMode;
    TargetMode?:    TargetMode;
    IncludeOrigin?: boolean;
    Conditions:     BraggadociousConditions | null;
}

export interface BraggadociousConditions {
    $type:       ConditionType;
    Conditions?: FluffyCondition[];
    Tags?:       Tag[];
    Operator?:   Operator;
}

export type E2ID = "e2" | "e3" | "e4" | "e5" | "e6";

export interface FluffyTrigger {
    $type:             TriggerType;
    Subject:           IndecentTarget;
    AttributeChanged?: Attribute;
    ChangeType?:       ChangeType;
    PreviousValue?:    null;
    CurrentValue?:     null;
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
    AttributeType: Attribute;
    Operation:     Operation;
    Value:         IndigoValue;
    Target:        StickySubject;
}

export interface IndigoValue {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        TargetPlayerClass;
    DefaultValue?:  number;
    Modifier?:      ComparisonValueModifier;
    AttributeType?: Attribute;
}

export interface TargetPlayerClass {
    $type:          SourceType;
    TargetMode?:    TargetMode;
    Conditions:     Conditions1 | null;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
}

export interface Conditions1 {
    $type:               ConditionType;
    Conditions?:         Condition4[];
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    FluffyValue;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    IsNot?:              boolean;
    AttributeType?:      Attribute;
    Tiers?:              Tier[];
}

export type E1ID = "e1" | "e9";

export type PurpleInternalDescription = "Deadly 50" | "Deadly" | "" | "Deadly 25" | "Deadly 20" | "Deadly 2" | "Deadly 30" | "Shiny 1" | "Deadly 1" | "Deadly 10" | "Deadly 2x";

export interface FluffyPrerequisite {
    $type:      PrerequisiteType;
    Subject:    IndecentTarget;
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
}

export interface StickyAction {
    $type:         PurpleType;
    AttributeType: Attribute;
    Operation:     Operation;
    Value:         ComparisonValue;
    Target:        IndecentTarget;
}

export type HiddenTag = "Health" | "Poison" | "Burn" | "Income" | "DamageReference" | "Regen" | "Damage" | "Active" | "Haste" | "Gold" | "Cooldown" | "Crit" | "Ammo" | "Shield" | "EconomyReference" | "Value" | "Charge" | "Multicast" | "RegenReference" | "JoyReference" | "Heal" | "BurnReference" | "NonWeapon" | "Slow" | "ShieldReference" | "CritReference" | "SlowReference" | "Freeze" | "HealthReference" | "HealReference" | "PoisonReference" | "Joy" | "Toughness" | "HasteReference" | "Lifesteal" | "FreezeReference" | "AmmoReference" | "Passive" | "Experience" | "Unsellable";

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
    Action:              IndigoAction | null;
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
    Target:           HilariousTarget;
    Value?:           IndecentValue;
    AttributeType?:   Attribute;
    Operation?:       Operation;
    Duration?:        FluffyDuration | null;
    TargetCount?:     null;
    Enchantment?:     string;
    PreventOverride?: boolean;
}

export interface HilariousTarget {
    $type:          SourceType;
    TargetMode?:    TargetMode;
    Conditions:     Conditions2 | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Origin?:        TargetMode;
    IncludeOrigin?: boolean;
}

export interface Conditions2 {
    $type:        ConditionType;
    Tags?:        Tag[];
    Operator?:    Operator;
    Conditions?:  Condition6[];
    Enchantment?: null;
    IsNot?:       boolean;
}

export interface Condition6 {
    $type:        ConditionType;
    Tags?:        Tag[];
    Operator?:    Operator;
    Enchantment?: string;
}

export interface IndecentValue {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        AmbitiousTarget;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      ComparisonValueModifier | null;
}

export interface AmbitiousTarget {
    $type:          SourceType;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Conditions:     Conditions3 | null;
}

export interface Conditions3 {
    $type:         ConditionType;
    AttributeType: Attribute;
}

export interface TentacledTrigger {
    $type:             TriggerType;
    Subject?:          IndigoSubject;
    AttributeType?:    Attribute;
    ChangeType?:       ChangeType;
    CombatType?:       null;
    AttributeChanged?: Attribute;
    PreviousValue?:    null;
    CurrentValue?:     null;
}

export interface IndigoSubject {
    $type:          SourceType;
    TargetMode?:    TargetMode;
    Conditions:     Conditions4 | null;
    Origin?:        TargetMode;
    IncludeOrigin?: boolean;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export interface Conditions4 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Conditions?:         Condition7[];
    IsSameAsPlayerHero?: boolean;
}

export interface Condition7 {
    $type:        ConditionType;
    Enchantment?: null;
    IsNot?:       boolean;
    Tags?:        Tag[];
    Operator?:    Operator;
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
    TranslationKey:      The3_TranslationKey;
}

export interface IndecentAction {
    $type:           PurpleType;
    Value?:          ComparisonValue;
    AttributeType?:  Attribute;
    Operation?:      Operation;
    Duration?:       FluffyDuration;
    TargetCount?:    null;
    Target:          CunningTarget;
    ReferenceValue?: null;
}

export interface CunningTarget {
    $type:          SourceType;
    Conditions:     TargetCondition | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    TargetMode?:    TargetMode;
}

export interface The3_Prerequisite {
    $type:   PrerequisiteType;
    Subject: ComparisonValueSubject;
}

export type The3_TranslationKey = "1765d39b625142ba0ad0f322f5e114ca" | "0a412ade517ebd34dbe653b1f9a26939" | "94b6b97fa820b28535181c40302b5363" | "ceb404457a31d093fa13dcaad2f31236";

export interface StickyTrigger {
    $type:             TriggerType;
    Subject?:          TargetPlayerClass;
    AttributeType?:    Attribute;
    ChangeType?:       ChangeType;
    AttributeChanged?: Attribute;
    PreviousValue?:    null;
    CurrentValue?:     null;
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
}

export interface HilariousAction {
    $type:         TentacledType;
    AttributeType: Attribute;
    Operation:     Operation;
    Value:         Limit;
    Target:        MagentaTarget;
}

export interface MagentaTarget {
    $type:          SourceType;
    Conditions:     TargetCondition | null;
    Origin?:        TargetMode;
    TargetMode?:    TargetMode;
    IncludeOrigin?: boolean;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export interface StickyE2 {
    Id:                  E2ID;
    ActiveIn:            ActiveIn;
    Action:              AmbitiousAction;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: ConditionInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface AmbitiousAction {
    $type:         PurpleType;
    AttributeType: Attribute;
    Operation:     Operation;
    Value:         HilariousValue;
    Target:        LimitTarget;
}

export interface HilariousValue {
    $type:          StickyType;
    Target?:        MagentaTarget;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      ComparisonValueModifier | null;
    Value?:         number;
    Distinct?:      boolean;
}

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
    AttributeType: Attribute;
    Operation:     Operation;
    Value:         PurpleValue;
    Target:        Source;
}

export type PurpleTranslationKey = "979608f87a0c2ed7baf5d05e4ee935f1" | "e45684454d745b0e77f71face9b2ebb6" | "b7b4b93275c7490d6e2b0997872ba2e1";

export interface Golden {
    Attributes:   Attributes;
    Abilities:    GoldenAbilities;
    Auras:        GoldenAuras;
    Tags:         Tag[];
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
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface MagentaAction {
    $type:          PurpleType;
    Value?:         PurpleValue;
    AttributeType?: Attribute;
    Operation?:     Operation;
    Duration?:      null;
    TargetCount?:   null;
    Target?:        TargetPlayerClass;
    TargetPlayer?:  TargetPlayerClass;
    SpawnContext?:  FluffySpawnContext;
}

export interface FluffySpawnContext {
    $type: SpawnContextType;
    Limit: ComparisonValue;
}

export interface IndigoTrigger {
    $type:          TriggerType;
    Subject?:       Source;
    AttributeType?: Attribute;
    ChangeType?:    ChangeType;
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
    TargetMode?:    TargetMode;
    Conditions:     Conditions5 | null;
    Origin?:        TargetMode;
    IncludeOrigin?: boolean;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export interface Conditions5 {
    $type:        ConditionType;
    CardType?:    Type;
    IsNot?:       boolean;
    Tags?:        Tag[];
    Operator?:    Operator;
    Sizes?:       Size[];
    Enchantment?: ConditionInternalDescription | null;
    Conditions?:  Condition1[];
}

export type FluffyInternalDescription = "Golden 0" | "" | "Golden 1" | "Shiny 1" | "Golden 100" | "At the start of each fight double value";

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
    Prerequisites:       The3_Prerequisite[] | null;
    Priority:            Priority;
    InternalName:        The3_InternalName;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      The3_TranslationKey;
}

export interface The3_Action {
    $type:          PurpleType;
    TargetCount?:   null;
    Target?:        LimitTarget;
    Value?:         ComparisonValue | null;
    AttributeType?: Attribute;
    Operation?:     Operation;
    Duration?:      FluffyDuration | null;
    TargetPlayer?:  Source;
    SpawnContext?:  FluffySpawnContext;
}

export type The3_InternalName = "Counter Increment" | "";

export interface The3_Trigger {
    $type:          TriggerType;
    Subject?:       ComparisonValueSubject;
    AttributeType?: Attribute;
    ChangeType?:    ChangeType;
}

export interface HilariousE1 {
    Id:                  string;
    Trigger:             IndecentTrigger;
    ActiveIn:            ActiveIn;
    Action:              MischievousAction;
    Prerequisites:       PurplePrerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: TentacledInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface MischievousAction {
    $type:            PurpleType;
    Value?:           ComparisonValue | null;
    TargetCount:      null;
    Target:           IndigoTarget;
    AttributeType?:   Attribute;
    Operation?:       Operation;
    Duration?:        null;
    Enchantment?:     TentacledInternalDescription;
    PreventOverride?: boolean;
}

export type TentacledInternalDescription = "" | "Heavy" | "If the item is not enchanted, enchant it with Heavy if able." | "Turbo" | "Turbo 3" | "Turbo 2" | "If the item is not enchanted, enchant it with Turbo if able.";

export interface IndecentTrigger {
    $type:          TriggerType;
    Subject?:       IndigoSubject;
    AttributeType?: Attribute;
    ChangeType?:    ChangeType;
    CombatType?:    null;
}

export interface IndigoE2 {
    Id:                  E2ID;
    Trigger:             The3_Trigger;
    ActiveIn:            ActiveIn;
    Action:              BraggadociousAction;
    Prerequisites:       The3_Prerequisite[] | null;
    Priority:            Priority;
    InternalName:        The3_InternalName;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      FluffyTranslationKey;
}

export interface BraggadociousAction {
    $type:          PurpleType;
    Value:          ComparisonValue | null;
    AttributeType?: Attribute;
    Operation?:     Operation;
    Duration?:      FluffyDuration;
    TargetCount:    null;
    Target:         TargetPlayerClass;
}

export type FluffyTranslationKey = "1765d39b625142ba0ad0f322f5e114ca" | "286b0e5fdfb97664b0b52b7612c183bf";

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
    AttributeType: Attribute;
    Operation:     Operation;
    Value:         ComparisonValue;
    Target:        LimitTarget;
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
    "3"?: The3;
}

export interface AmbitiousE1 {
    Id:                  string;
    Trigger:             HilariousTrigger;
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
    $type:            PurpleType;
    Value?:           ComparisonValue | null;
    TargetCount:      null;
    Target:           MischievousTarget;
    AttributeType?:   Attribute;
    Operation?:       Operation;
    Duration?:        null;
    Enchantment?:     StickyInternalDescription;
    PreventOverride?: boolean;
}

export type StickyInternalDescription = "" | "Icy" | "Icy 2" | "If the item is not enchanted, enchant it with Icy if able.";

export interface MischievousTarget {
    $type:          SourceType;
    Conditions:     Conditions6 | null;
    Origin?:        TargetMode;
    TargetMode?:    TargetMode;
    IncludeOrigin?: boolean;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export interface Conditions6 {
    $type:          ConditionType;
    Enchantment?:   null | string;
    IsNot?:         boolean;
    Sizes?:         Size[];
    Tiers?:         Tier[];
    Tags?:          Tag[];
    Operator?:      Operator;
    AttributeType?: Attribute;
    Conditions?:    Condition8[];
}

export interface Condition8 {
    $type:        ConditionType;
    Tags?:        Tag[];
    Operator?:    Operator;
    Sizes?:       Size[];
    IsNot?:       boolean;
    Enchantment?: string;
}

export interface HilariousTrigger {
    $type:          TriggerType;
    Subject?:       IndecentSubject;
    AttributeType?: Attribute;
    ChangeType?:    ChangeType;
    CombatType?:    null;
}

export interface IndecentSubject {
    $type:          SourceType;
    TargetMode?:    TargetMode;
    Conditions:     Conditions7 | null;
    Origin?:        TargetMode;
    IncludeOrigin?: boolean;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export interface Conditions7 {
    $type:               ConditionType;
    Conditions?:         AmbitiousCondition[];
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Id?:                 string;
    IsNot?:              boolean;
    Sizes?:              Size[];
    Tiers?:              Tier[];
    Enchantment?:        TentacledInternalDescription | null;
    IsSameAsPlayerHero?: boolean;
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
}

export interface CunningE1 {
    Id:                  string;
    Trigger:             TentacledTrigger;
    ActiveIn:            ActiveIn;
    Action:              Action2;
    Prerequisites:       PurplePrerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: IndigoInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface Action2 {
    $type:            PurpleType;
    ReferenceValue?:  null;
    Target:           HilariousTarget;
    Value?:           ComparisonValue;
    AttributeType?:   Attribute;
    Operation?:       Operation;
    Duration?:        FluffyDuration | null;
    TargetCount?:     null;
    Enchantment?:     EnchantmentEnum;
    PreventOverride?: boolean;
}

export type IndigoInternalDescription = "" | "Obsidian" | "Your Aquatic Weapons gain +5 damage for the fight." | "If the item is not enchanted, enchant it with Obsidian if able.";

export interface ObsidianAttributes {
    DamageAmount?: number;
    Custom_4?:     number;
    Custom_5?:     number;
}

export interface ObsidianAuras {
    e1?: StickyE1;
    e2?: IndecentE2;
    e3?: FluffyE3;
}

export interface IndecentE2 {
    Id:                  E2ID;
    ActiveIn:            ActiveIn;
    Action:              Action3;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: IndecentInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface Action3 {
    $type:         PurpleType;
    AttributeType: Attribute;
    Operation:     Operation;
    Value:         AmbitiousValue;
    Target:        LimitTarget;
}

export interface AmbitiousValue {
    $type:          ComparisonValueType;
    Target?:        Source;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      ComparisonValueModifier;
    Value?:         number;
    Distinct?:      boolean;
}

export type IndecentInternalDescription = "" | "Obsidian 2" | "Deal 10 damage for each Unique type you have." | "Deal 8 damage for each non-Weapon item you have." | "Deal 10 Damage for each Aquatic or Toy item you have.";

export interface FluffyE3 {
    Id:                  string;
    ActiveIn:            ActiveIn;
    Action:              Action4;
    Prerequisites:       E3Prerequisite[] | null;
    InternalName:        PurpleInternalName;
    InternalDescription: HilariousInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      TentacledTranslationKey;
}

export interface Action4 {
    $type:         PurpleType;
    AttributeType: Attribute;
    Operation:     Operation;
    Value:         Limit;
    Target:        LimitTarget;
}

export type HilariousInternalDescription = "" | "Obsidian" | "Sets the value of shield" | "Sets the Shield of the item";

export type PurpleInternalName = "Tooltip Handling" | "Obsidian Luxury Tents Aura" | "Obsidian Memento Mori Aura" | "Shielded Handaxe Aura" | "Shielded Luxury Tents Aura" | "Shielded Memento Mori Aura" | "Shielded Sharkclaws Aura";

export interface E3Prerequisite {
    $type:      PrerequisiteType;
    Subject:    LimitTarget;
    Comparison: Comparison;
    Amount:     number;
}

export type TentacledTranslationKey = "9ed8516049000a0e1a90054e0aab06ce" | "a193d872e6cb3a8dc2d05aedb98955c0" | "93911bec96cb67bfcc317e7f7665af7b" | "b7b4b93275c7490d6e2b0997872ba2e1";

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
    e2?: AbilitiesE3;
    e3?: AbilitiesE3;
}

export interface MagentaE1 {
    Id:                  string;
    Trigger:             FluffyTrigger;
    ActiveIn:            ActiveIn;
    Action:              Action5;
    Prerequisites:       null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: AmbitiousInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface Action5 {
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
    Conditions:     Conditions8 | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Origin?:        TargetMode;
    TargetMode?:    TargetMode;
    IncludeOrigin?: boolean;
}

export interface Conditions8 {
    $type:        ConditionType;
    Conditions?:  Condition6[];
    Enchantment?: null;
    IsNot?:       boolean;
}

export type AmbitiousInternalDescription = "When this item gains Freeze, remove Freeze from it." | "When this item gains Haste, remove Haste from it." | "Radiant" | "If the item is not enchanted, enchant it with Radiant if able.";

export interface AbilitiesE3 {
    Id:                  E2ID;
    Trigger:             E3Trigger;
    ActiveIn:            ActiveIn;
    Action:              The3_Action;
    Prerequisites:       null;
    Priority:            Priority;
    InternalName:        FluffyInternalName;
    InternalDescription: CunningInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      StickyTranslationKey;
}

export type CunningInternalDescription = "When this item gains Slow, remove Slow from it.";

export type FluffyInternalName = "Radiant Slow";

export type StickyTranslationKey = "db02baf95ec3866b3bcf0761025fd005";

export interface E3Trigger {
    $type:            TriggerType;
    Subject:          LimitTarget;
    AttributeChanged: Attribute;
    ChangeType:       ChangeType;
    PreviousValue:    null;
    CurrentValue:     null;
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
    RegenApplyAmount?: number;
}

export interface RestorativeAuras {
    e3?: TentacledE3;
    e2?: StickyE2;
    e1?: StickyE1;
}

export interface TentacledE3 {
    Id:                  E2ID;
    ActiveIn:            ActiveIn;
    Action:              Action6;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      PurpleTranslationKey;
}

export interface Action6 {
    $type:         PurpleType;
    AttributeType: Attribute;
    Operation:     Operation;
    Value:         Limit;
    Target:        TargetPlayerClass;
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
    e1?: FriskyE1;
    e2?: HilariousE2;
}

export interface FriskyE1 {
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

export interface HilariousE2 {
    Id:                  E2ID;
    Trigger:             The3_Trigger;
    ActiveIn:            ActiveIn;
    Action:              IndecentAction;
    Prerequisites:       The3_Prerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: FriskyInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      The3_TranslationKey;
}

export type FriskyInternalDescription = "Your other Shield items gain +9 Shield for the fight." | "" | "Deal {ability.0} damage to the player with less health.";

export interface ShieldedAttributes {
    ShieldApplyAmount?: number;
    Custom_4?:          number;
    Custom_5?:          number;
}

export interface ShieldedAuras {
    e3?: FluffyE3;
    e1?: StickyE1;
    e2?: StickyE2;
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
    Trigger:             AmbitiousTrigger;
    ActiveIn:            ActiveIn;
    Action:              Action7 | null;
    Prerequisites:       null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface Action7 {
    $type:            PurpleType;
    TargetPlayer?:    Source;
    SpawnContext?:    FluffySpawnContext;
    Enchantment?:     EnchantmentEnum;
    Duration?:        null;
    PreventOverride?: boolean;
    TargetCount?:     null;
    Target?:          BraggadociousTarget;
}

export interface AmbitiousTrigger {
    $type:    TriggerType;
    Subject?: IndecentTarget;
}

export interface ShinyAttributes {
    Multicast?:  number;
    Custom_1?:   number;
    CritChance?: number;
}

export interface ShinyAuras {
    e1?: BraggadociousE1;
    e2?: E4Class;
    e3?: E4Class;
    e4?: E4Class;
    e5?: E4Class;
    e6?: E4Class;
    e9?: E9Class;
}

export interface BraggadociousE1 {
    Id:                  E1ID;
    ActiveIn:            ActiveIn;
    Action:              Action8;
    Prerequisites:       TentacledPrerequisite[] | null;
    InternalName:        string;
    InternalDescription: MischievousInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface Action8 {
    $type:         TentacledType;
    AttributeType: Attribute;
    Operation:     Operation;
    Value:         CunningValue;
    Target:        Target1;
}

export interface Target1 {
    $type:          SourceType;
    Conditions:     Conditions9 | null;
    TargetMode?:    TargetMode;
    Origin?:        TargetMode;
    IncludeOrigin?: boolean;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export interface Conditions9 {
    $type:               ConditionType;
    Conditions?:         FluffyCondition[];
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
}

export interface CunningValue {
    $type:          ComparisonValueType;
    Target?:        IndecentTarget;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      ComparisonValueModifier | null;
    Value?:         number;
}

export type MischievousInternalDescription = "Shiny 1" | "Shiny" | "" | "Sets the value of burn" | "Shiny 2" | "Golden 1" | "Shiny None" | "Icy 2" | "XP 2x" | "Deadly 25";

export interface TentacledPrerequisite {
    $type:      PrerequisiteType;
    Subject:    TargetPlayerClass;
    Comparison: Comparison;
    Amount:     number;
}

export interface E4Class {
    Id:                  E2ID;
    ActiveIn:            ActiveIn;
    Action:              E4Action;
    Prerequisites:       E3Prerequisite[] | null;
    InternalName:        string;
    InternalDescription: E4InternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface E4Action {
    $type:         PurpleType;
    AttributeType: Attribute;
    Operation:     Operation;
    Value:         CunningValue;
    Target:        IndecentTarget;
}

export type E4InternalDescription = "" | "Shiny 2" | "Sets the value of poison" | "Shiny" | "Tooltip Handling";

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

export type Hero = "Mak" | "Common" | "Vanessa" | "Jules" | "Pygmalien" | "Stelle" | "Dooley";

export type The100_InternalDescription = "" | "Side with the merchant and shoo the customer away." | "Sells items" | "You feed the creature and it leads you to an item!" | "The creature hums with happiness and you feel at peace." | "Day 1" | "The creature purrs with joy and you feel warm inside." | "Sells Items" | "Spend your time looking for spare change instead of investing." | "Close the circus down and free all the animals." | "Gain a Diamond-tier item" | "You own the circus! What do you want to do with it?" | "Have a nice day :)" | "Any investment helps!" | "Keep the wallet for yourself.";

export interface The100_Localization {
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
    Conditions?:  Condition9[];
}

export interface Condition9 {
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
    Target?:          LimitTarget;
    TargetPlayer?:    Source;
    SpawnContext?:    FluffySpawnContext;
}

export interface T1Trigger {
    $type: TriggerType;
}

export type Version = "1.0.0";
