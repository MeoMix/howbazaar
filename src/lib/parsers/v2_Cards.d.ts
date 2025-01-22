export interface V2CardsD {
    $type:                         V2CardsDType;
    IsReselectable?:               boolean;
    Type:                          Type;
    IsSingleSpawn?:                boolean;
    IsTakeover?:                   boolean;
    ShouldProgressHour?:           boolean;
    SpawningChance?:               number;
    SpawningChanceIncrement?:      number;
    ExperienceAwardUponSelection?: number;
    Attributes?:                   V2CardsDAttributes | null;
    Id:                            string;
    Version:                       Version;
    InternalName:                  string;
    InternalDescription:           V2CardsDInternalDescription | null;
    StartingTier:                  Tier;
    Size:                          Size;
    Heroes:                        Hero[];
    Tags:                          Tag[];
    HiddenTags:                    HiddenTag[];
    ArtKey:                        string;
    SpawningEligibility:           SpawningEligibility;
    CardPackId:                    CardPackID;
    TranslationKey:                string;
    AudioKey:                      null | string;
    Localization:                  V2CardsDLocalization;
    Abilities:                     { [key: string]: Ability };
    Auras:                         { [key: string]: Aura };
    Tiers?:                        Tiers;
    Enchantments?:                 Enchantments | null;
    CombatantType?:                CombatantType;
    RewardCombatGold?:             number;
    RewardVictory?:                Reward;
    RewardDefeat?:                 Reward;
    SelectionContext?:             SelectionContext | null;
    NextEncounterOnSelection?:     NextEncounterOnSelection[] | null;
    Behavior?:                     V2CardsDBehavior;
    SelectionCriteria?:            SelectionCriteria;
}

export type V2CardsDType = "TCardEncounterStep" | "TCardItem" | "TCardEncounterCombat" | "TCardSkill" | "TCardEncounterEvent" | "TCardEncounterPedestal";

export interface Ability {
    Id:                  string;
    InternalName:        string;
    InternalDescription: null | string;
    Action:              AbilityAction;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       AbilityPrerequisite[] | null;
    Priority:            Priority;
    TranslationKey:      string;
    Trigger:             AbilityTrigger;
    VFXConfig:           VFXConfig | null;
}

export interface AbilityAction {
    $type:                  PurpleType;
    AttributeType?:         Attribute;
    Value?:                 PurpleValue;
    Operation?:             Operation;
    Duration?:              Duration | null;
    Target?:                PurpleTarget;
    ReferenceValue?:        null;
    UpgradeToTier?:         null;
    TargetCount?:           TargetCountClass | null;
    SpawnContext?:          PurpleSpawnContext;
    SelectionContextRules?: Rules;
    SpawnMode?:             SpawnMode;
    Enchantment?:           string;
    TargetPlayer?:          TargetPlayer;
}

export type PurpleType = "TActionPlayerModifyAttribute" | "TActionPlayerDamage" | "TActionPlayerHeal" | "TActionCardSlow" | "TActionCardUpgrade" | "TActionPlayerShieldApply" | "TActionCardFreeze" | "TActionCardModifyAttribute" | "TActionPlayerBurnApply" | "TActionCardHaste" | "TActionGameDealCards" | "TActionCardEnchant" | "TActionPlayerPoisonApply" | "TActionGameSpawnCards" | "TActionCardForceUse" | "TActionCardReload" | "TActionCardDisable" | "TActionPlayerJoyApply" | "TActionCardCharge" | "TActionPlayerPoisonRemove" | "TActionPlayerShieldRemove" | "TActionPlayerBurnRemove" | "TAuraActionCardModifyAttribute";

export type Attribute = "HealthMax" | "CritChance" | "Gold" | "DamageAmount" | "JoyApplyAmount" | "CooldownMax" | "ShieldApplyAmount" | "HealthRegen" | "Experience" | "PoisonApplyAmount" | "BurnApplyAmount" | "HealAmount" | "Prestige" | "Income" | "SellPrice" | "AmmoMax" | "Freeze" | "Shield" | "FreezeAmount" | "Multicast" | "Custom_0" | "BuyPrice" | "Custom_1" | "Lifesteal" | "Counter" | "Custom_4" | "Slow" | "HasteAmount" | "SlowAmount" | "Custom_2" | "Custom_3" | "Ammo" | "Level" | "Burn" | "Health" | "Haste" | "Poison" | "DamageCrit" | "Joy" | "Custom_5";

export interface Duration {
    $type:        DurationType;
    DurationType: DurationTypeEnum;
}

export type DurationType = "TDeterminantDuration";

export type DurationTypeEnum = "UntilEndOfCombat" | "UntilEndOfDay";

export type Operation = "Add" | "Multiply" | "Subtract";

export interface Rules {
    CanExit:             boolean;
    CanSelectMultiple:   boolean;
    NextEncounterOnExit: null | string;
    RerollRules:         RerollRules | null;
    SelectionIsFree:     boolean;
    WillAutoSellOnExit:  boolean;
}

export interface RerollRules {
    CostIncrease:        number;
    CostMax:             null;
    StartingCost:        number;
    TotalAllowedRerolls: number | null;
}

export interface PurpleSpawnContext {
    $type:           SpawnContextType;
    Groups:          PurpleGroup[];
    SelectionMethod: SelectionMethod;
    Limit:           PurpleLimit;
    Behaviors:       PurpleBehavior[] | null;
}

export type SpawnContextType = "TSpawnContextQuery";

export interface PurpleBehavior {
    $type:            FluffyType;
    AllowDuplicates?: boolean;
    Tiers?:           Tier[];
    IsNot?:           boolean;
    IgnoreHero?:      boolean;
    IgnoreTierTable?: boolean;
    ForceNative?:     boolean;
}

export type FluffyType = "TSpawnBehaviorAllowDuplicates" | "TSpawnBehaviorTier" | "TSpawnBehaviorIgnoreHero" | "TSpawnBehaviorIgnoreTierTable" | "TSpawnBehaviorForceNative";

export type Tier = "Silver" | "Diamond" | "Bronze" | "Gold" | "Legendary";

export interface PurpleGroup {
    $type:           GroupType;
    Filters:         PurpleFilter[];
    SelectionMethod: SelectionMethod;
    Limit:           null;
    Prerequisites:   null;
    RandomWeight:    number;
    Behaviors:       GroupBehavior[] | null;
}

export type GroupType = "TSpawnGroup";

export interface GroupBehavior {
    $type:           FluffyType;
    AllowDuplicates: boolean;
}

export interface PurpleFilter {
    $type:        FilterType;
    Ids?:         string[];
    Constraints?: Constraints;
}

export type FilterType = "TSpawnFilterIdList" | "TSpawnFilterQuery" | "TSpawnFilterUpgrade";

export interface Constraints {
    $type:        ConstraintsType;
    Constraints?: PurpleConstraint[];
    Types?:       Type[];
    IsNot?:       boolean;
    Tiers?:       Tier[];
    IgnoreHero?:  boolean;
    Conditions?:  ConstraintsCondition[];
}

export type ConstraintsType = "ConstraintAnd" | "ConstraintCardType" | "ConstraintTier" | "TSpawnBehaviorIgnoreHero" | "TSpawnBehaviorTier" | "TCardConditionalTier" | "TCardConditionalAnd" | "ConstraintSize" | "ConstraintTag" | "ConstraintHiddenTag" | "ConstraintHero" | "ConstraintEnchantmentEligible" | "ConstraintIsOnlyHero";

export interface ConstraintsCondition {
    $type:        ConditionType;
    Enchantment?: string;
    IsNot?:       boolean;
    CardType?:    Type;
    Conditions?:  PurpleCondition[];
}

export type ConditionType = "TCardConditionalHasEnchantment" | "TCardConditionalEnchantmentEligible" | "TCardConditionalType" | "TCardConditionalOr" | "TCardConditionalAttribute" | "TCardConditionalAnd" | "TCardConditionalTag" | "TCardConditionalHiddenTag" | "TCardConditionalTier" | "TCardConditionalTriggerSource" | "TCardConditionalSize" | "TCardConditionalId" | "TCardConditionalAttributeHighest" | "TCardConditionalPlayerHero" | "TPlayerConditionalAttribute" | "TCardConditionalAttributeLowest" | "TTargetCardSelf";

export type Type = "Item" | "EventEncounter" | "Skill" | "EncounterStep" | "CombatEncounter" | "PedestalEncounter";

export interface PurpleCondition {
    $type:       ConditionType;
    Enchantment: string;
}

export interface PurpleConstraint {
    $type:         ConstraintsType;
    Sizes?:        Size[];
    IsNot?:        boolean;
    Types?:        Type[];
    Tags?:         Tag[];
    Tiers?:        Tier[];
    HiddenTags?:   HiddenTag[];
    Heroes?:       Hero[];
    Enchantments?: string[];
    Constraints?:  ConstraintConstraint[];
    IgnoreHero?:   boolean;
    Conditions?:   ConstraintsCondition[];
}

export interface ConstraintConstraint {
    $type:         ConstraintsType;
    Sizes?:        Size[];
    IsNot?:        boolean;
    Types?:        Type[];
    Tags?:         Tag[];
    Tiers?:        Tier[];
    HiddenTags?:   HiddenTag[];
    Heroes?:       Hero[];
    Enchantments?: string[];
}

export type Hero = "Pygmalien" | "Vanessa" | "Stelle" | "Jules" | "Dooley" | "Mak" | "Common";

export type HiddenTag = "Crit" | "EconomyReference" | "Damage" | "Cooldown" | "Heal" | "Active" | "Value" | "BurnReference" | "Slow" | "DamageReference" | "Shield" | "Passive" | "NonWeapon" | "FreezeReference" | "Freeze" | "CritReference" | "Gold" | "Burn" | "Toughness" | "Multicast" | "Haste" | "HealReference" | "ShieldReference" | "HasteReference" | "Poison" | "Ammo" | "JoyReference" | "Regen" | "PoisonReference" | "Health" | "Joy" | "Income" | "HealthReference" | "Charge" | "SlowReference" | "Lifesteal" | "AmmoReference" | "Experience" | "CooldownReference" | "RegenReference";

export type Size = "Small" | "Medium" | "Large";

export type Tag = "Merchant" | "Weapon" | "Shield" | "Heal" | "Joy" | "Burn" | "Poison" | "Core" | "Property" | "Aquatic" | "Friend" | "Freeze" | "Potion" | "Vehicle" | "Tool" | "Food" | "Slow" | "Haste" | "Damage" | "Unsellable";

export type SelectionMethod = "Random" | "Sequential";

export interface PurpleLimit {
    $type:          LimitType;
    Value?:         number;
    Target?:        ConditionsClass;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      Modifier | null;
}

export type LimitType = "TFixedValue" | "TReferenceValueCardAttribute" | "TReferenceValuePlayerAttribute" | "TReferenceValuePlayerAttributeChange" | "TReferenceValueCardCount" | "TReferenceValueCardAttributeAggregate" | "TRangeValue";

export interface Modifier {
    ModifyMode: Operation;
    Value:      { Value: number };
}

export interface ConditionsClass {
    $type:      ConditionType;
    Conditions: FluffyCondition[] | PurpleConditions | null;
}

export interface ConditionsConditions {
    $type:       ConditionType;
    Tags?:       Tag[];
    Operator?:   Operator;
    Conditions?: FluffyCondition[];
}

export interface FluffyCondition {
    $type:               ConditionType;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         ConditionsConditions[];
    Id?:                 string;
    IsNot?:              boolean;
}

export type Operator = "Any" | "None";

export type Comparison = "GreaterThan" | "GreaterThanOrEqual" | "Equal" | "LessThan" | "LessThanOrEqual";

export interface TargetCountClass {
    $type: LimitType;
    Value: number;
}

export interface PurpleConditions {
    $type:               ConditionType;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
    Conditions?:         ConditionsConditions[];
}

export type SpawnMode = "Replace";

export interface PurpleTarget {
    $type:          TargetPlayerType;
    TargetMode?:    TargetMode;
    Conditions:     FluffyCondition[] | FluffyConditions | null;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
    Origin?:        Origin;
    IncludeOrigin?: boolean;
}

export type TargetPlayerType = "TTargetCardSelf" | "TCardConditionalAnd" | "TCardConditionalOr" | "TTargetPlayerAbsolute" | "TTargetPlayerRelative" | "TTargetCardRandom" | "TTargetCardXMost" | "TTargetCardTriggerSource" | "TTargetCardSection" | "TTargetCardPositional" | "TTargetPlayer";

export interface FluffyConditions {
    $type:               ConditionType;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    PurpleComparisonValue;
    Conditions?:         StickyCondition[];
    Enchantment?:        string;
    Tags?:               Tag[];
    Operator?:           Operator;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Sizes?:              Size[];
    Id?:                 string;
    AttributeType?:      Attribute;
    CardType?:           Type;
    IsSameAsPlayerHero?: boolean;
}

export interface PurpleComparisonValue {
    $type:          LimitType;
    Value?:         number;
    Target?:        FluffyTarget;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      Modifier | null;
}

export interface FluffyComparisonValue {
    $type:          LimitType;
    Value?:         number;
    Target?:        FluffyTarget;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      Modifier | null;
}

export interface TentacledConditions {
    $type:               ConditionType;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    FluffyComparisonValue;
    Conditions?:         TentacledCondition[];
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Tiers?:              Tier[];
    AttributeType?:      Attribute;
}

export interface FluffyTarget {
    $type:          TargetPlayerType;
    TargetMode?:    TargetMode;
    Conditions:     TentacledConditions | null;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
}

export interface TentacledCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         FluffyCondition[];
    Id?:                 string;
    IsNot?:              boolean;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
}

export type TargetMode = "Self" | "Opponent" | "Player" | "LeftMostCard" | "RightCard" | "Neighbor" | "LeftCard" | "RightMostCard" | "AllLeftCards" | "Both" | "AllRightCards";

export type TargetSection = "SelfHand" | "SelfHandAndStash" | "OpponentHand" | "AbsolutePlayerHand" | "AbsolutePlayerHandAndStash" | "AllHands" | "SelfNeighbors" | "SelfBoard";

export interface StickyCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
    Conditions?:         IndigoCondition[];
    Sizes?:              Size[];
    Enchantment?:        EnchantmentEnum;
    AttributeType?:      Attribute;
    Id?:                 string;
    IsSameAsPlayerHero?: boolean;
}

export interface IndigoCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
    Conditions?:         IndecentCondition[];
    Id?:                 string;
    IsNot?:              boolean;
}

export interface IndecentCondition {
    $type:               ConditionType;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         IndecentCondition[];
    Id?:                 string;
    IsNot?:              boolean;
}

export type EnchantmentEnum = "Radiant" | "Shiny" | "Obsidian" | "Deadly" | "Golden";

export type Origin = "Self" | "TriggerSource";

export interface TargetPlayer {
    $type:          TargetPlayerType;
    TargetMode?:    TargetMode;
    Conditions:     StickyConditions | null;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
}

export interface StickyConditions {
    $type:               ConditionType;
    Conditions?:         HilariousCondition[];
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Tiers?:              Tier[];
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    PurpleComparisonValue;
    AttributeType?:      Attribute;
    Enchantment?:        EnchantmentEnum;
    Id?:                 string;
}

export interface HilariousCondition {
    $type:               ConditionType;
    Id?:                 string;
    IsNot?:              boolean;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    Enchantment?:        EnchantmentEnum;
    Tiers?:              Tier[];
    Conditions?:         ConditionsConditions[];
}

export interface PurpleValue {
    $type:          LimitType;
    Target?:        TentacledTarget;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      Modifier | null;
    Value?:         number;
    MinValue?:      number;
    MaxValue?:      number;
}

export interface TentacledTarget {
    $type:          TargetPlayerType;
    TargetMode?:    TargetMode;
    Conditions:     IndigoConditions | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export interface IndigoConditions {
    $type:               ConditionType;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    Value;
    Tags?:               Tag[];
    Operator?:           Operator;
    AttributeType?:      Attribute;
    Conditions?:         AmbitiousCondition[];
    Sizes?:              Size[];
    IsNot?:              boolean;
    Enchantment?:        EnchantmentEnum;
    Tiers?:              Tier[];
    Id?:                 string;
    CardType?:           Type;
}

export interface Value {
    $type:          LimitType;
    Value?:         number;
    Target?:        ComparisonValueSubject;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      Modifier;
}

export interface TentacledComparisonValue {
    $type:          LimitType;
    Value?:         number;
    Target?:        ComparisonValueSubject;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      Modifier;
}

export interface IndecentConditions {
    $type:               ConditionType;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TentacledComparisonValue;
    Conditions?:         ConditionsConditions[];
}

export interface ComparisonValueSubject {
    $type:       TargetPlayerType;
    TargetMode?: TargetMode;
    Conditions:  IndecentConditions | null;
}

export interface AmbitiousCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
    Enchantment?:        EnchantmentEnum;
    Id?:                 string;
    Tiers?:              Tier[];
    Conditions?:         ConditionsConditions[];
    CardType?:           Type;
}

export type ActiveIn = "HandOnly" | "HandAndStash";

export interface AbilityPrerequisite {
    $type:       PrerequisiteType;
    Subject:     PurpleSubject;
    Comparison?: Comparison;
    Amount?:     number;
}

export type PrerequisiteType = "TPrerequisiteCardCount" | "TPrerequisitePlayer";

export interface PurpleSubject {
    $type:          TargetPlayerType;
    Conditions:     FluffyCondition[] | HilariousConditions | null;
    TargetMode?:    TargetMode;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
}

export interface HilariousConditions {
    $type:               ConditionType;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    Value;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    AttributeType?:      Attribute;
    Conditions?:         CunningCondition[];
    Enchantment?:        EnchantmentEnum;
    Tiers?:              Tier[];
    Id?:                 string;
}

export interface CunningCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
    Enchantment?:        EnchantmentEnum;
    Id?:                 string;
    Tiers?:              Tier[];
    Conditions?:         IndecentCondition[];
}

export type Priority = "Medium" | "Low" | "High" | "Lowest" | "Highest" | "Immediate";

export interface AbilityTrigger {
    $type:             TriggerType;
    Subject?:          FluffySubject;
    CombatType?:       null | string;
    AttributeType?:    Attribute;
    ChangeType?:       ChangeType;
    CombatOutcome?:    CombatOutcome | null;
    AttributeChanged?: Attribute;
    Conditions?:       ConditionsConditions;
}

export type TriggerType = "TTriggerOnCardSelected" | "TTriggerOnCardFired" | "TTriggerOnCardCritted" | "TTriggerOnCardPerformedHaste" | "TTriggerOnItemUsed" | "TTriggerOnCardPerformedBurn" | "TTriggerOnCardSold" | "TTriggerOnFightStarted" | "TTriggerOnPlayerAttributeChanged" | "TTriggerOnCardPurchased" | "TTriggerOnCardPerformedSlow" | "TTriggerOnPlayerDied" | "TTriggerOnHourStarted" | "TTriggerOnCardPerformedPoison" | "TTriggerOnCardPerformedHeal" | "TTriggerOnFightEnded" | "TTriggerOnCardPerformedDestruction" | "TTriggerOnCardPerformedFreeze" | "TTriggerOnCardAttributeChanged" | "TTriggerOnEncounterSelected" | "TTriggerOnDayStarted" | "TTriggerOnCardUpgraded" | "TTriggerOnCardPerformedShield" | "TTriggerOnPlayerAttributePercentChange";

export type ChangeType = "Loss" | "Gain";

export type CombatOutcome = "Win" | "Lose";

export interface FluffySubject {
    $type:          TargetPlayerType;
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
    Sizes?:              Size[];
    IsNot?:              boolean;
    Conditions?:         MagentaCondition[];
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    Value;
    Tiers?:              Tier[];
    AttributeType?:      Attribute;
    IsSameAsPlayerHero?: boolean;
    Id?:                 string;
    CardType?:           Type;
    Enchantment?:        EnchantmentEnum;
}

export interface MagentaCondition {
    $type:               ConditionType;
    CardType?:           Type;
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    AttributeType?:      Attribute;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
    Id?:                 string;
    Conditions?:         FriskyCondition[];
    IsSameAsPlayerHero?: boolean;
    Tiers?:              Tier[];
    Enchantment?:        EnchantmentEnum;
}

export interface FriskyCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
    AttributeType?:      Attribute;
    Conditions?:         CunningCondition[];
    Sizes?:              Size[];
    IsNot?:              boolean;
    Id?:                 string;
    IsSameAsPlayerHero?: boolean;
}

export interface VFXConfig {
    VFXIsTakeover:  boolean;
    VFXOverrideKey: null | string;
    VFXShouldPlay:  boolean;
}

export interface V2CardsDAttributes {
    BuyPrice?:  number;
    SellPrice?: number;
}

export interface Aura {
    Id:                  string;
    InternalName:        string;
    InternalDescription: string;
    Action:              AuraAction;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       AuraPrerequisite[] | null;
    TranslationKey:      string;
    VFXConfig:           VFXConfig | null;
}

export interface AuraAction {
    $type:         TentacledType;
    AttributeType: AttributeType;
    Operation:     Operation;
    Value:         FluffyValue;
    Target:        StickyTarget;
}

export type TentacledType = "TAuraActionCardModifyAttribute" | "TAuraActionPlayerModifyAttribute";

export type AttributeType = "HealAmount" | "DamageAmount" | "Custom_3" | "Custom_0" | "HealthMax" | "ShieldApplyAmount" | "AmmoMax" | "Multicast" | "CooldownMax" | "HealthRegen" | "Lifesteal" | "BurnApplyAmount" | "CritChance" | "BurnRemoveAmount" | "Income" | "PoisonApplyAmount" | "Custom_1" | "Custom_4" | "Custom_2" | "JoyApplyAmount" | "SellPrice" | "DamageCrit" | "SlowAmount" | "FreezeAmount" | "PoisonRemoveAmount" | "ShieldRemoveAmount" | "ChargeAmount" | "SlowTargets" | "ReloadAmount" | "FreezeTargets" | "HasteAmount" | "HasteTargets";

export interface StickyTarget {
    $type:          TargetPlayerType;
    Conditions:     FluffyCondition[] | CunningConditions | null;
    TargetSection?: TargetSection;
    TargetMode?:    TargetMode;
    ExcludeSelf?:   boolean;
    Origin?:        TargetMode;
    IncludeOrigin?: boolean;
}

export interface CunningConditions {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
    AttributeType?:      Attribute;
    Conditions?:         MischievousCondition[] | PurpleConditions | null;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Id?:                 string;
    IsSameAsPlayerHero?: boolean;
    Tiers?:              Tier[];
    Enchantment?:        EnchantmentEnum;
}

export interface MischievousCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
    Enchantment?:        EnchantmentEnum;
    Id?:                 string;
    Tiers?:              Tier[];
    Conditions?:         IndigoCondition[];
    CardType?:           Type;
    AttributeType?:      Attribute;
    IsSameAsPlayerHero?: boolean;
}

export interface FluffyValue {
    $type:          LimitType;
    Target?:        IndigoTarget;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      Modifier | null;
    Value?:         number;
}

export interface IndigoTarget {
    $type:          TargetPlayerType;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Conditions:     FluffyCondition[] | MagentaConditions | null;
    TargetMode?:    TargetMode;
    Origin?:        Origin;
    IncludeOrigin?: boolean;
}

export interface MagentaConditions {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Conditions?:         BraggadociousCondition[] | PurpleConditions | null;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    PurpleComparisonValue;
    Tiers?:              Tier[];
    AttributeType?:      Attribute;
    IsSameAsPlayerHero?: boolean;
    Id?:                 string;
    CardType?:           Type;
    Enchantment?:        string;
}

export interface BraggadociousCondition {
    $type:               ConditionType;
    CardType?:           Type;
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    AttributeType?:      Attribute;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
    Id?:                 string;
    Tiers?:              Tier[];
    Conditions?:         IndigoCondition[];
    Enchantment?:        EnchantmentEnum;
}

export interface AuraPrerequisite {
    $type:       PrerequisiteType;
    Subject:     TentacledSubject;
    Comparison?: Comparison;
    Amount?:     number;
}

export interface TentacledSubject {
    $type:          TargetPlayerType;
    Conditions:     FriskyConditions | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    TargetMode?:    TargetMode;
    Origin?:        TargetMode;
    IncludeOrigin?: boolean;
}

export interface FriskyConditions {
    $type:               ConditionType;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    Value;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    AttributeType?:      Attribute;
    Conditions?:         HilariousCondition[];
    Enchantment?:        EnchantmentEnum;
    Tiers?:              Tier[];
    Id?:                 string;
}

export interface V2CardsDBehavior {
    $type:         StickyType;
    TargetTier?:   Tier | null;
    Enchantment?:  string;
    Enchantments?: EnchantmentElement[];
}

export type StickyType = "TPedestalBehaviorUpgrade" | "TPedestalBehaviorEnchant" | "TPedestalBehaviorEnchantRandom";

export interface EnchantmentElement {
    Enchantment: string;
    Weight:      number;
}

export type CardPackID = "Pygmalien_Core" | "Core" | "Vanessa_Core" | "Stelle_Core" | "Dooley_Core" | "Jules_Core" | "Mak_Core";

export interface CombatantType {
    $type:             CombatantTypeType;
    MonsterTemplateId: string;
    Level:             number;
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
    Abilities:    DeadlyAbilities;
    Attributes:   Attributes;
    Auras:        DeadlyAuras;
    HasAbilities: boolean;
    HasAuras:     boolean;
    HiddenTags:   HiddenTag[];
    Localization: DeadlyLocalization;
    Tags:         Tag[];
}

export interface DeadlyAbilities {
    e1?: PurpleE1;
    e2?: PurpleE2;
}

export interface PurpleE1 {
    Id:                  E1ID;
    InternalName:        string;
    InternalDescription: string;
    Action:              PurpleAction;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       PurplePrerequisite[] | null;
    Priority:            Priority;
    TranslationKey:      string;
    Trigger:             PurpleTrigger;
    VFXConfig:           VFXConfig;
}

export interface PurpleAction {
    $type:         PurpleType;
    Value:         PurpleLimit;
    AttributeType: Attribute;
    Operation:     Operation;
    Duration:      Duration | null;
    TargetCount:   TargetCountClass | null;
    Target:        IndecentTarget;
}

export interface IndecentTarget {
    $type:          TargetPlayerType;
    Conditions:     MischievousConditions | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Origin?:        TargetMode;
    TargetMode?:    TargetMode;
    IncludeOrigin?: boolean;
}

export interface MischievousConditions {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Conditions?:         Condition1[];
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
    CardType?:           Type;
}

export interface Condition1 {
    $type:               ConditionType;
    CardType?:           Type;
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
    Id?:                 string;
    AttributeType?:      Attribute;
    Conditions?:         Condition2[];
}

export interface Condition2 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
    AttributeType?:      Attribute;
    Conditions?:         HilariousCondition[];
    Sizes?:              Size[];
    IsNot?:              boolean;
    Id?:                 string;
    IsSameAsPlayerHero?: boolean;
}

export type E1ID = "e1" | "e3";

export interface PurplePrerequisite {
    $type:       PrerequisiteType;
    Subject:     ComparisonValueSubject;
    Comparison?: Comparison;
    Amount?:     number;
}

export interface PurpleTrigger {
    $type:          TriggerType;
    Subject?:       StickySubject;
    AttributeType?: Attribute;
    ChangeType?:    ChangeType;
}

export interface StickySubject {
    $type:          TargetPlayerType;
    Conditions:     BraggadociousConditions | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    TargetMode?:    TargetMode;
    Origin?:        TargetMode;
    IncludeOrigin?: boolean;
}

export interface BraggadociousConditions {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
    Conditions?:         Condition3[];
    Sizes?:              Size[];
    Enchantment?:        EnchantmentEnum;
    AttributeType?:      Attribute;
    Id?:                 string;
    IsSameAsPlayerHero?: boolean;
}

export interface Condition3 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
    CardType?:           Type;
    IsNot?:              boolean;
    Sizes?:              Size[];
    Conditions?:         Condition4[];
    AttributeType?:      Attribute;
    IsSameAsPlayerHero?: boolean;
    Tiers?:              Tier[];
}

export interface Condition4 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
}

export interface PurpleE2 {
    Id:                  E2ID;
    InternalName:        string;
    InternalDescription: string;
    Action:              FluffyAction;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       null;
    Priority:            Size;
    TranslationKey:      string;
    Trigger:             FluffyTrigger;
    VFXConfig:           VFXConfig;
}

export interface FluffyAction {
    $type:         PurpleType;
    Value:         TargetCountClass;
    AttributeType: Attribute;
    Operation:     Operation;
    Duration:      Duration;
    TargetCount:   null;
    Target:        HilariousTarget;
}

export interface HilariousTarget {
    $type:          TargetPlayerType;
    Conditions:     ConditionsClass | null;
    Origin?:        TargetMode;
    TargetMode?:    TargetMode;
    IncludeOrigin?: boolean;
}

export type E2ID = "e2";

export interface FluffyTrigger {
    $type:   TriggerType;
    Subject: HilariousTarget;
}

export interface Attributes {
}

export interface DeadlyAuras {
    e1?: FluffyE1;
}

export interface FluffyE1 {
    Id:                  E1ID;
    InternalName:        string;
    InternalDescription: PurpleInternalDescription;
    Action:              TentacledAction;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       null;
    TranslationKey:      string;
    VFXConfig:           VFXConfig;
}

export interface TentacledAction {
    $type:         PurpleType;
    AttributeType: Attribute;
    Operation:     Operation;
    Value:         TentacledValue;
    Target:        AmbitiousTarget;
}

export interface AmbitiousTarget {
    $type:          TargetPlayerType;
    Conditions:     Condition2 | null;
    TargetSection?: TargetSection;
    TargetMode?:    TargetMode;
    ExcludeSelf?:   boolean;
    Origin?:        TargetMode;
    IncludeOrigin?: boolean;
}

export interface TentacledValue {
    $type:          LimitType;
    Value?:         number;
    Target?:        CunningTarget;
    DefaultValue?:  number;
    Modifier?:      Modifier;
    AttributeType?: Attribute;
}

export interface CunningTarget {
    $type:          TargetPlayerType;
    TargetMode?:    TargetMode;
    Conditions:     FriskyConditions | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export type PurpleInternalDescription = "Deadly 2" | "Deadly 50" | "Deadly" | "Deadly 25" | "" | "Deadly 2x" | "Deadly 10" | "Deadly None";

export interface DeadlyLocalization {
    Tooltips: Tooltip[];
}

export interface Tooltip {
    Content:     Title;
    TooltipType: HiddenTag;
}

export interface Title {
    Key:  string;
    Text: null | string;
}

export interface Fiery {
    Abilities:    FieryAbilities;
    Attributes:   FieryAttributes;
    Auras:        FieryAuras;
    HasAbilities: boolean;
    HasAuras:     boolean;
    HiddenTags:   HiddenTag[];
    Localization: DeadlyLocalization;
    Tags:         Tag[];
}

export interface FieryAbilities {
    e1?: TentacledE1;
    E1?: E1;
    e2?: FluffyE2;
}

export interface E1 {
    Id:                  string;
    InternalName:        string;
    InternalDescription: string;
    Action:              E1Action;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       null;
    Priority:            Size;
    TranslationKey:      string;
    Trigger:             E1Trigger;
    VFXConfig:           VFXConfig;
}

export interface E1Action {
    $type:          PurpleType;
    ReferenceValue: null;
    Target:         MagentaTarget;
}

export interface MagentaTarget {
    $type:          TargetPlayerType;
    Conditions:     Conditions1 | null;
    TargetMode?:    TargetMode;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
}

export interface Conditions1 {
    $type:               ConditionType;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    Value;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    CardType?:           Type;
    Conditions?:         Condition5[];
    AttributeType?:      Attribute;
}

export interface Condition5 {
    $type:               ConditionType;
    CardType?:           Type;
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
    Sizes?:              Size[];
}

export interface E1Trigger {
    $type: TriggerType;
}

export interface TentacledE1 {
    Id:                  E1ID;
    InternalName:        string;
    InternalDescription: FluffyInternalDescription;
    Action:              StickyAction | null;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       PurplePrerequisite[] | null;
    Priority:            Priority;
    TranslationKey:      string;
    Trigger:             TentacledTrigger;
    VFXConfig:           VFXConfig;
}

export interface StickyAction {
    $type:           PurpleType;
    ReferenceValue?: null;
    Target:          FriskyTarget;
    Value?:          StickyValue;
    AttributeType?:  Attribute;
    Operation?:      Operation;
    Duration?:       Duration;
    TargetCount?:    null;
}

export interface FriskyTarget {
    $type:          TargetPlayerType;
    Conditions:     ConditionsConditions | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Origin?:        TargetMode;
    TargetMode?:    TargetMode;
    IncludeOrigin?: boolean;
}

export interface StickyValue {
    $type:          LimitType;
    Value?:         number;
    Target?:        MischievousTarget;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      Modifier | null;
}

export interface MischievousTarget {
    $type:          TargetPlayerType;
    Conditions:     Conditions2 | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export interface Conditions2 {
    $type:         ConditionType;
    AttributeType: Attribute;
}

export type FluffyInternalDescription = "" | "Shielded 1" | "Burn equal to your Regeneration." | "set " | "Restorative 1";

export interface TentacledTrigger {
    $type:             TriggerType;
    Subject?:          IndigoSubject;
    CombatType?:       null;
    AttributeType?:    Attribute;
    ChangeType?:       ChangeType;
    AttributeChanged?: Attribute;
}

export interface IndigoSubject {
    $type:          TargetPlayerType;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Conditions:     Conditions3 | null;
    Origin?:        TargetMode;
    TargetMode?:    TargetMode;
    IncludeOrigin?: boolean;
}

export interface Conditions3 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
    Sizes?:              Size[];
    IsNot?:              boolean;
    IsSameAsPlayerHero?: boolean;
}

export interface FluffyE2 {
    Id:                  E2ID;
    InternalName:        string;
    InternalDescription: string;
    Action:              IndigoAction;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       E2Prerequisite[] | null;
    Priority:            Priority;
    TranslationKey:      string;
    Trigger:             E1Trigger;
    VFXConfig:           VFXConfig;
}

export interface IndigoAction {
    $type:           PurpleType;
    Value?:          PurpleLimit;
    AttributeType?:  Attribute;
    Operation?:      Operation;
    Duration?:       Duration;
    TargetCount?:    null;
    Target:          ComparisonValueSubject;
    ReferenceValue?: null;
}

export interface E2Prerequisite {
    $type:   PrerequisiteType;
    Subject: ComparisonValueSubject;
}

export interface FieryAttributes {
    BurnApplyAmount?: number;
    Custom_0?:        number;
}

export interface FieryAuras {
    e1?: StickyE1;
    e2?: TentacledE2;
    E2?: E2;
}

export interface E2 {
    Id:                  string;
    InternalName:        string;
    InternalDescription: string;
    Action:              E2Action;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       null;
    TranslationKey:      string;
    VFXConfig:           VFXConfig;
}

export interface E2Action {
    $type:         PurpleType;
    AttributeType: Attribute;
    Operation:     Operation;
    Value:         PurpleLimit;
    Target:        BraggadociousTarget;
}

export interface StickyComparisonValue {
    $type:          LimitType;
    Value?:         number;
    Target?:        BraggadociousTarget;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      Modifier | null;
}

export interface Conditions4 {
    $type:               ConditionType;
    Conditions?:         Condition6[];
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Tiers?:              Tier[];
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    StickyComparisonValue;
    AttributeType?:      Attribute;
}

export interface BraggadociousTarget {
    $type:          TargetPlayerType;
    TargetMode?:    TargetMode;
    Conditions:     Conditions4 | null;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
}

export interface Condition6 {
    $type:               ConditionType;
    Id?:                 string;
    IsNot?:              boolean;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
}

export interface StickyE1 {
    Id:                  E1ID;
    InternalName:        string;
    InternalDescription: string;
    Action:              IndecentAction;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       null;
    TranslationKey:      string;
    VFXConfig:           VFXConfig;
}

export interface IndecentAction {
    $type:         TentacledType;
    AttributeType: Attribute;
    Operation:     Operation;
    Value:         IndigoValue;
    Target:        FriskyTarget;
}

export interface IndigoValue {
    $type:          LimitType;
    Value?:         number;
    Target?:        Target1;
    DefaultValue?:  number;
    Modifier?:      Modifier;
    AttributeType?: Attribute;
}

export interface Target1 {
    $type:          TargetPlayerType;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Conditions:     Conditions5 | null;
}

export interface Conditions5 {
    $type:          ConditionType;
    Sizes?:         Size[];
    IsNot?:         boolean;
    AttributeType?: Attribute;
}

export interface TentacledE2 {
    Id:                  E2ID;
    InternalName:        string;
    InternalDescription: string;
    Action:              HilariousAction;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       null;
    TranslationKey:      string;
    VFXConfig:           VFXConfig;
}

export interface HilariousAction {
    $type:         PurpleType;
    AttributeType: Attribute;
    Operation:     Operation;
    Value:         IndecentValue;
    Target:        ConditionsClass;
}

export interface IndecentValue {
    $type:          LimitType;
    Target:         Target2;
    AttributeType?: Attribute;
    DefaultValue:   number;
    Modifier:       Modifier;
}

export interface Target2 {
    $type:          TargetPlayerType;
    TargetMode?:    TargetMode;
    Conditions:     ConditionsConditions | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export interface Golden {
    Abilities:    GoldenAbilities;
    Attributes:   Attributes;
    Auras:        GoldenAuras;
    HasAbilities: boolean;
    HasAuras:     boolean;
    HiddenTags:   HiddenTag[];
    Localization: DeadlyLocalization;
    Tags:         Tag[];
}

export interface GoldenAbilities {
    e1?:  IndigoE1;
    e2?:  E1Class;
    "1"?: The1;
    "2"?: The2;
}

export interface The1 {
    Id:                  string;
    InternalName:        string;
    InternalDescription: string;
    Action:              The1_Action;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       E2Prerequisite[];
    Priority:            Priority;
    TranslationKey:      string;
    Trigger:             The1_Trigger;
    VFXConfig:           VFXConfig;
}

export interface The1_Action {
    $type:         PurpleType;
    Value:         TargetCountClass;
    AttributeType: Attribute;
    Operation:     Operation;
    Duration:      null;
    TargetCount:   null;
    Target:        CunningTarget;
}

export interface The1_Trigger {
    $type:      TriggerType;
    CombatType: null;
}

export interface The2 {
    Id:                  string;
    InternalName:        string;
    InternalDescription: string;
    Action:              The2_Action;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       E2Prerequisite[];
    Priority:            Priority;
    TranslationKey:      string;
    Trigger:             The1_Trigger;
    VFXConfig:           VFXConfig;
}

export interface The2_Action {
    $type:         PurpleType;
    AttributeType: Attribute;
    Value:         TargetCountClass;
    Operation:     Operation;
    Duration:      Duration | null;
    Target:        ComparisonValueSubject;
}

export interface IndigoE1 {
    Id:                  E1ID;
    InternalName:        string;
    InternalDescription: TentacledInternalDescription;
    Action:              AmbitiousAction;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       null;
    Priority:            Priority;
    TranslationKey:      string;
    Trigger:             StickyTrigger;
    VFXConfig:           VFXConfig;
}

export interface AmbitiousAction {
    $type:          PurpleType;
    AttributeType?: Attribute;
    Operation?:     Operation;
    Value?:         Value;
    Target?:        BraggadociousTarget;
    Duration?:      null;
    TargetPlayer?:  BraggadociousTarget;
    SpawnContext?:  RewardDefeatSpawnContext;
    TargetCount?:   null;
}

export interface RewardDefeatSpawnContext {
    $type:           SpawnContextType;
    Groups:          FluffyGroup[];
    SelectionMethod: SelectionMethod;
    Limit:           TargetCountClass;
    Behaviors:       GroupBehavior[] | null;
}

export interface FluffyGroup {
    $type:           GroupType;
    Filters:         FluffyFilter[];
    SelectionMethod: SelectionMethod;
    Limit:           null;
    Prerequisites:   null;
    RandomWeight:    number;
    Behaviors:       null;
}

export interface FluffyFilter {
    $type: FilterType;
    Ids:   string[];
}

export type TentacledInternalDescription = "Golden 1" | "" | "Golden 100" | "Shiny 1" | "Golden 0" | "Spawn get 1 Spare Change.";

export interface StickyTrigger {
    $type:          TriggerType;
    Subject?:       MagentaTarget;
    AttributeType?: Attribute;
    ChangeType?:    ChangeType;
}

export interface E1Class {
    Id:                  string;
    InternalName:        string;
    InternalDescription: TentacledInternalDescription;
    Action:              CunningAction | null;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       null;
    Priority:            Priority;
    TranslationKey:      string;
    Trigger:             IndigoTrigger;
    VFXConfig:           VFXConfig;
}

export interface CunningAction {
    $type:        PurpleType;
    TargetPlayer: ComparisonValueSubject;
    SpawnContext: RewardDefeatSpawnContext;
}

export interface IndigoTrigger {
    $type:    TriggerType;
    Subject?: ConditionsClass;
}

export interface GoldenAuras {
    e1?: IndecentE1;
    e3?: AurasE3;
}

export interface IndecentE1 {
    Id:                  E1ID;
    InternalName:        string;
    InternalDescription: TentacledInternalDescription;
    Action:              MagentaAction;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       null;
    TranslationKey:      string;
    VFXConfig:           VFXConfig;
}

export interface MagentaAction {
    $type:         TentacledType;
    AttributeType: Attribute;
    Operation:     Operation;
    Value:         Value;
    Target:        Target3;
}

export interface Target3 {
    $type:          TargetPlayerType;
    Conditions:     Conditions6 | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    TargetMode?:    TargetMode;
    Origin?:        TargetMode;
    IncludeOrigin?: boolean;
}

export interface Conditions6 {
    $type:       ConditionType;
    CardType?:   Type;
    IsNot?:      boolean;
    Tags?:       Tag[];
    Operator?:   Operator;
    Sizes?:      Size[];
    Conditions?: Condition7[];
}

export interface Condition7 {
    $type: ConditionType;
    Id:    string;
    IsNot: boolean;
}

export interface AurasE3 {
    Id:                  E1ID;
    InternalName:        string;
    InternalDescription: string;
    Action:              FriskyAction;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       null;
    TranslationKey:      string;
    VFXConfig:           VFXConfig;
}

export interface FriskyAction {
    $type:         PurpleType;
    AttributeType: AttributeType;
    Operation:     Operation;
    Value:         TargetCountClass;
    Target:        ConditionsClass;
}

export interface Heavy {
    Abilities:    HeavyAbilities;
    Attributes:   HeavyAttributes;
    Auras:        HeavyAuras;
    HasAbilities: boolean;
    HasAuras:     boolean;
    HiddenTags:   HiddenTag[];
    Localization: DeadlyLocalization;
    Tags:         Tag[];
}

export interface HeavyAbilities {
    e1?: HilariousE1;
    e2?: StickyE2;
}

export interface HilariousE1 {
    Id:                  E1ID;
    InternalName:        string;
    InternalDescription: StickyInternalDescription;
    Action:              MischievousAction;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       null;
    Priority:            Priority;
    TranslationKey:      string;
    Trigger:             IndecentTrigger;
    VFXConfig:           VFXConfig;
}

export interface MischievousAction {
    $type:  PurpleType;
    Target: MagentaTarget;
}

export type StickyInternalDescription = "" | "Heavy 2";

export interface IndecentTrigger {
    $type:          TriggerType;
    CombatType?:    null;
    Subject?:       IndecentSubject;
    AttributeType?: Attribute;
    ChangeType?:    ChangeType;
}

export interface IndecentSubject {
    $type:          TargetPlayerType;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Conditions:     Conditions7 | null;
    Origin?:        TargetMode;
    TargetMode?:    TargetMode;
    IncludeOrigin?: boolean;
}

export interface Conditions7 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
    Conditions?:         ConditionsConditions[];
    Enchantment?:        EnchantmentEnum;
    IsNot?:              boolean;
    Sizes?:              Size[];
    Id?:                 string;
    Tiers?:              Tier[];
    AttributeType?:      Attribute;
    IsSameAsPlayerHero?: boolean;
}

export interface StickyE2 {
    Id:                  E2ID;
    InternalName:        string;
    InternalDescription: string;
    Action:              MischievousAction;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       null;
    Priority:            Size;
    TranslationKey:      string;
    Trigger:             E1Trigger;
    VFXConfig:           VFXConfig;
}

export interface HeavyAttributes {
    SlowTargets?: number;
    SlowAmount?:  number;
}

export interface HeavyAuras {
    e1?: AurasE3;
}

export interface Icy {
    Abilities:    IcyAbilities;
    Attributes:   IcyAttributes;
    Auras:        HeavyAuras;
    HasAbilities: boolean;
    HasAuras:     boolean;
    HiddenTags:   HiddenTag[];
    Localization: DeadlyLocalization;
    Tags:         Tag[];
}

export interface IcyAbilities {
    e1?: AmbitiousE1;
}

export interface AmbitiousE1 {
    Id:                  E1ID;
    InternalName:        string;
    InternalDescription: IndigoInternalDescription;
    Action:              MischievousAction;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       PurplePrerequisite[] | null;
    Priority:            Priority;
    TranslationKey:      string;
    Trigger:             TentacledTrigger;
    VFXConfig:           VFXConfig;
}

export type IndigoInternalDescription = "" | "Icy 1";

export interface IcyAttributes {
    FreezeTargets?: number;
    FreezeAmount?:  number;
}

export interface Obsidian {
    Abilities:    Attributes;
    Attributes:   PurpleAttributes;
    Auras:        Attributes;
    HasAbilities: boolean;
    HasAuras:     boolean;
    HiddenTags:   HiddenTag[];
    Localization: DeadlyLocalization;
    Tags:         Tag[];
}

export interface PurpleAttributes {
    Lifesteal?: number;
}

export interface Radiant {
    Abilities:    RadiantAbilities;
    Attributes:   Attributes;
    Auras:        Attributes;
    HasAbilities: boolean;
    HasAuras:     boolean;
    HiddenTags:   HiddenTag[];
    Localization: DeadlyLocalization;
    Tags:         any[];
}

export interface RadiantAbilities {
    e1?: E2Class;
    e2?: E2Class;
}

export interface E2Class {
    Id:                  string;
    InternalName:        InternalName;
    InternalDescription: IndecentInternalDescription;
    Action:              BraggadociousAction;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       null;
    Priority:            Priority;
    TranslationKey:      TranslationKey;
    Trigger:             HilariousTrigger;
    VFXConfig:           VFXConfig;
}

export interface BraggadociousAction {
    $type:          PurpleType;
    Value?:         TargetCountClass;
    AttributeType?: Attribute;
    Operation?:     Operation;
    Duration?:      Duration | null;
    TargetCount?:   null;
    Target:         ConditionsClass;
}

export type IndecentInternalDescription = "" | "When this item gains Freeze, remove Freeze from it." | "When this item gains Slow, remove Slow from it.";

export type InternalName = "Neophiliac 10 - Haste Counter Increment" | "Radiant " | "Radiant Slow";

export type TranslationKey = "5e982200e255519d0b255686771ca639" | "db02baf95ec3866b3bcf0761025fd005";

export interface HilariousTrigger {
    $type:            TriggerType;
    Subject:          ConditionsClass;
    AttributeChanged: Attribute;
    ChangeType:       ChangeType;
}

export interface Restorative {
    Abilities:    RestorativeAbilities;
    Attributes:   RestorativeAttributes;
    Auras:        RestorativeAuras;
    HasAbilities: boolean;
    HasAuras:     boolean;
    HiddenTags:   HiddenTag[];
    Localization: DeadlyLocalization;
    Tags:         Tag[];
}

export interface RestorativeAbilities {
    e1?: TentacledE1;
    e2?: IndigoE2;
    e3?: AbilitiesE3;
    e4?: E4;
}

export interface IndigoE2 {
    Id:                  E2ID;
    InternalName:        string;
    InternalDescription: string;
    Action:              IndigoAction;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       E2Prerequisite[] | null;
    Priority:            Priority;
    TranslationKey:      string;
    Trigger:             E3Trigger;
    VFXConfig:           VFXConfig;
}

export interface E3Trigger {
    $type:    TriggerType;
    Subject?: ComparisonValueSubject;
}

export interface AbilitiesE3 {
    Id:                  E1ID;
    InternalName:        string;
    InternalDescription: string;
    Action:              The2_Action;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       null;
    Priority:            Priority;
    TranslationKey:      string;
    Trigger:             E3Trigger;
    VFXConfig:           VFXConfig;
}

export interface E4 {
    Id:                  string;
    InternalName:        string;
    InternalDescription: string;
    Action:              BraggadociousAction;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       null;
    Priority:            Priority;
    TranslationKey:      string;
    Trigger:             E3Trigger;
    VFXConfig:           VFXConfig;
}

export interface RestorativeAttributes {
    HealAmount?:         number;
    PoisonRemoveAmount?: number;
    BurnRemoveAmount?:   number;
}

export interface RestorativeAuras {
    e1?: StickyE1;
    e2?: IndecentE2;
    e5?: E5;
    e6?: E5;
}

export interface IndecentE2 {
    Id:                  E2ID;
    InternalName:        string;
    InternalDescription: string;
    Action:              Action1;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       null;
    TranslationKey:      string;
    VFXConfig:           VFXConfig;
}

export interface Action1 {
    $type:         PurpleType;
    AttributeType: Attribute;
    Operation:     Operation;
    Value:         HilariousValue;
    Target:        ConditionsClass;
}

export interface HilariousValue {
    $type:          LimitType;
    Target?:        FriskyTarget;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      Modifier | null;
    Value?:         number;
}

export interface E5 {
    Id:                  string;
    InternalName:        string;
    InternalDescription: string;
    Action:              Action2;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       null;
    TranslationKey:      string;
    VFXConfig:           VFXConfig;
}

export interface Action2 {
    $type:         PurpleType;
    AttributeType: AttributeType;
    Operation:     Operation;
    Value:         Value;
    Target:        ConditionsClass;
}

export interface Shielded {
    Abilities:    ShieldedAbilities;
    Attributes:   ShieldedAttributes;
    Auras:        ShieldedAuras;
    HasAbilities: boolean;
    HasAuras:     boolean;
    HiddenTags:   HiddenTag[];
    Localization: DeadlyLocalization;
    Tags:         Tag[];
}

export interface ShieldedAbilities {
    e1?: TentacledE1;
    e2?: FluffyE2;
}

export interface ShieldedAttributes {
    ShieldApplyAmount?: number;
}

export interface ShieldedAuras {
    e2?: HilariousE2;
    e1?: StickyE1;
}

export interface HilariousE2 {
    Id:                  E2ID;
    InternalName:        string;
    InternalDescription: string;
    Action:              Action3;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       null;
    TranslationKey:      string;
    VFXConfig:           VFXConfig;
}

export interface Action3 {
    $type:         PurpleType;
    AttributeType: Attribute;
    Operation:     Operation;
    Value:         AmbitiousValue;
    Target:        ConditionsClass;
}

export interface AmbitiousValue {
    $type:         LimitType;
    Target:        BraggadociousTarget;
    AttributeType: Attribute;
    DefaultValue:  number;
    Modifier:      Modifier;
}

export interface Shiny {
    Abilities:    ShinyAbilities;
    Attributes:   ShinyAttributes;
    Auras:        ShinyAuras;
    HasAbilities: boolean;
    HasAuras:     boolean;
    HiddenTags:   HiddenTag[];
    Localization: DeadlyLocalization;
    Tags:         Tag[];
}

export interface ShinyAbilities {
    e1?: E1Class;
    e2?: E1Class;
}

export interface ShinyAttributes {
    CritChance?:        number;
    Multicast?:         number;
    Custom_1?:          number;
    PoisonApplyAmount?: number;
    DamageAmount?:      number;
}

export interface ShinyAuras {
    e1?: CunningE1;
    e2?: E3Class;
    e3?: E3Class;
    e4?: E3Class;
    e5?: E3Class;
    e6?: E3Class;
}

export interface CunningE1 {
    Id:                  string;
    InternalName:        string;
    InternalDescription: E3InternalDescription;
    Action:              Action4;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       FluffyPrerequisite[] | null;
    TranslationKey:      string;
    VFXConfig:           VFXConfig;
}

export interface Action4 {
    $type:         TentacledType;
    AttributeType: AttributeType;
    Operation:     Operation;
    Value:         HilariousValue;
    Target:        FriskyTarget;
}

export type E3InternalDescription = "Sets the value of heal" | "Sets value of Defense Grid Shield Remove" | "" | "Sets the value of shield" | "Sets the value of Shield" | "Sets the value of Hard Shell" | "Sets the value of Burn Remove" | "Your Shield items have +6 shield for each friend you have." | "Sets the value of Truffles 1." | "Original Amount" | "Shiny 1" | "Shiny 2" | "Shiny" | "Shiny None" | "XP 2x" | "Golden 1" | "This has +{aura.1} Multicast for each Property you have." | "Fiery 2" | "Icy 2" | "Tooltip Handling";

export interface FluffyPrerequisite {
    $type:      PrerequisiteType;
    Subject:    HilariousSubject;
    Comparison: Comparison;
    Amount:     number;
}

export interface HilariousSubject {
    $type:         TargetPlayerType;
    TargetSection: TargetSection;
    ExcludeSelf:   boolean;
    Conditions:    ConditionsConditions;
}

export interface E3Class {
    Id:                  string;
    InternalName:        string;
    InternalDescription: E3InternalDescription;
    Action:              Action5;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       null;
    TranslationKey:      string;
    VFXConfig:           VFXConfig;
}

export interface Action5 {
    $type:         PurpleType;
    AttributeType: Attribute;
    Operation:     Operation;
    Value:         CunningValue;
    Target:        HilariousTarget;
}

export interface CunningValue {
    $type:          LimitType;
    Value?:         number;
    Target?:        HilariousTarget;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      null;
}

export interface Toxic {
    Abilities:    FieryAbilities;
    Attributes:   ToxicAttributes;
    Auras:        ToxicAuras;
    HasAbilities: boolean;
    HasAuras:     boolean;
    HiddenTags:   HiddenTag[];
    Localization: DeadlyLocalization;
    Tags:         Tag[];
}

export interface ToxicAttributes {
    PoisonApplyAmount?: number;
}

export interface ToxicAuras {
    e1?: StickyE1;
    e2?: TentacledE2;
}

export interface Turbo {
    Abilities:    TurboAbilities;
    Attributes:   TurboAttributes;
    Auras:        HeavyAuras;
    HasAbilities: boolean;
    HasAuras:     boolean;
    HiddenTags:   HiddenTag[];
    Localization: DeadlyLocalization;
    Tags:         Tag[];
}

export interface TurboAbilities {
    e1?: MagentaE1;
    e2?: StickyE2;
}

export interface MagentaE1 {
    Id:                  E1ID;
    InternalName:        string;
    InternalDescription: HilariousInternalDescription;
    Action:              Action6;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       PurplePrerequisite[] | null;
    Priority:            Priority;
    TranslationKey:      string;
    Trigger:             TentacledTrigger;
    VFXConfig:           VFXConfig;
}

export interface Action6 {
    $type:  PurpleType;
    Target: AmbitiousTarget;
}

export type HilariousInternalDescription = "" | "Turbo 3" | "Turbo 2";

export interface TurboAttributes {
    HasteTargets?: number;
    HasteAmount?:  number;
}

export type V2CardsDInternalDescription = "" | "Sells Items" | "Day 1" | "Keep the wallet for yourself." | "Any investment helps!" | "The creature hums with happiness and you feel at peace." | "Spend your time looking for spare change instead of investing." | "Gain a Diamond-tier item" | "The creature purrs with joy and you feel warm inside." | "Sells items" | "You own the circus! What do you want to do with it?" | "Close the circus down and free all the animals." | "You feed the creature and it leads you to an item!" | "Side with the merchant and shoo the customer away." | "Have a nice day :)";

export interface V2CardsDLocalization {
    Description: Title | null;
    FlavorText:  null;
    Title:       Title;
    Tooltips:    Tooltip[];
}

export interface NextEncounterOnSelection {
    Id:            string;
    Prerequisites: null;
    Weight:        number;
}

export interface Reward {
    ExperienceReward:      number;
    GoldReward:            number;
    SelectionContextRules: Rules | null;
    SpawnContext:          RewardDefeatSpawnContext | null;
}

export interface SelectionContext {
    Rules:        Rules;
    SpawnContext: SelectionContextSpawnContext;
}

export interface SelectionContextSpawnContext {
    $type:           SpawnContextType;
    Groups:          TentacledGroup[];
    SelectionMethod: SelectionMethod;
    Limit:           TargetCountClass;
    Behaviors:       PurpleBehavior[] | null;
}

export interface TentacledGroup {
    $type:           GroupType;
    Filters:         TentacledFilter[];
    SelectionMethod: SelectionMethod;
    Limit:           TargetCountClass | null;
    Prerequisites:   GroupPrerequisite[] | null;
    RandomWeight:    number;
    Behaviors:       SelectionCriteria[] | null;
}

export interface SelectionCriteria {
    $type:        ConstraintsType;
    Constraints?: ConstraintConstraint[];
    Types?:       Type[];
    IsNot?:       boolean;
    Tiers?:       Tier[];
    IgnoreHero?:  boolean;
    Conditions?:  ConstraintsCondition[];
}

export interface TentacledFilter {
    $type:          FilterType;
    Ids?:           string[];
    Constraints?:   SelectionCriteria;
    UpgradeChance?: number;
    CardType?:      Type;
}

export interface GroupPrerequisite {
    $type:       PrerequisiteType;
    Subject:     CunningTarget;
    Comparison?: Comparison;
    Amount?:     number;
}

export type SpawningEligibility = "Always" | "Never" | "GuidOnly";

export interface Tiers {
    Bronze?:    Bronze;
    Silver?:    Bronze;
    Gold?:      Bronze;
    Diamond:    Bronze;
    Legendary?: Bronze;
}

export interface Bronze {
    AbilityIds: string[];
    Attributes: { [key: string]: number };
    AuraIds:    string[];
    TooltipIds: number[];
}

export type Version = "1.0.0" | "0.0.0";
