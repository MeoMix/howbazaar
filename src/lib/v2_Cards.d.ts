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

export type Attribute = "HealthMax" | "CritChance" | "Gold" | "DamageAmount" | "JoyApplyAmount" | "CooldownMax" | "HealthRegen" | "Experience" | "PoisonApplyAmount" | "BurnApplyAmount" | "ShieldApplyAmount" | "HealAmount" | "Prestige" | "Income" | "SellPrice" | "AmmoMax" | "Shield" | "Counter" | "FreezeAmount" | "Multicast" | "Custom_0" | "BuyPrice" | "Custom_1" | "Lifesteal" | "Custom_4" | "Freeze" | "HasteAmount" | "SlowAmount" | "Custom_2" | "Custom_3" | "Slow" | "Level" | "Health" | "Ammo" | "Burn" | "Haste" | "Poison" | "Joy" | "Custom_5" | "DamageCrit" | "ChargeAmount" | "SlowTargets" | "ReloadAmount" | "FreezeTargets" | "BurnRemoveAmount" | "PoisonRemoveAmount" | "ShieldRemoveAmount";

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

export type ConditionType = "TCardConditionalHasEnchantment" | "TCardConditionalEnchantmentEligible" | "TCardConditionalType" | "TCardConditionalOr" | "TCardConditionalAttribute" | "TCardConditionalAnd" | "TCardConditionalTag" | "TCardConditionalHiddenTag" | "TCardConditionalTier" | "TCardConditionalTriggerSource" | "TCardConditionalSize" | "TCardConditionalId" | "TCardConditionalAttributeHighest" | "TCardConditionalPlayerHero" | "TPlayerConditionalAttribute" | "TCardConditionalAttributeLowest";

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

export type HiddenTag = "HealthMax" | "Health" | "Income" | "Burn" | "Poison" | "Cooldown" | "Heal" | "Damage" | "Active" | "Value" | "EconomyReference" | "BurnReference" | "Slow" | "DamageReference" | "Shield" | "Passive" | "NonWeapon" | "FreezeReference" | "Freeze" | "CritReference" | "Gold" | "Toughness" | "Multicast" | "Haste" | "HealReference" | "ShieldReference" | "HasteReference" | "Crit" | "Ammo" | "JoyReference" | "Regen" | "PoisonReference" | "Joy" | "HealthReference" | "Charge" | "SlowReference" | "Lifesteal" | "AmmoReference" | "Experience" | "CooldownReference" | "RegenReference";

export type Size = "Small" | "Medium" | "Large";

export type Tag = "Merchant" | "Weapon" | "Shield" | "Heal" | "Joy" | "Burn" | "Poison" | "Core" | "Aquatic" | "Property" | "Friend" | "Freeze" | "Potion" | "Vehicle" | "Tool" | "Food" | "Slow" | "Damage" | "Haste" | "Unsellable";

export type SelectionMethod = "Random" | "Sequential";

export interface PurpleLimit {
    $type:          LimitType;
    Value?:         number;
    Target?:        LimitTarget;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      Modifier | null;
}

export type LimitType = "TFixedValue" | "TReferenceValueCardAttribute" | "TReferenceValuePlayerAttribute" | "TReferenceValueCardCount" | "TRangeValue" | "TReferenceValuePlayerAttributeChange" | "TReferenceValueCardAttributeAggregate";

export interface Modifier {
    ModifyMode: Operation;
    Value:      number;
}

export interface LimitTarget {
    $type:      TargetType;
    Conditions: FluffyCondition[] | TentacledCondition | null;
}

export type TargetType = "TTargetCardSelf" | "TCardConditionalAnd" | "TCardConditionalOr" | "TTargetPlayerAbsolute" | "TTargetPlayerRelative" | "TTargetCardRandom" | "TTargetCardXMost" | "TTargetCardTriggerSource" | "TTargetCardSection" | "TTargetCardPositional" | "TTargetPlayer";

export interface ConditionConditions {
    $type:        ConditionType;
    Tags?:        Tag[];
    Operator?:    Operator;
    Conditions?:  FluffyCondition[];
    Enchantment?: string;
}

export interface FluffyCondition {
    $type:               ConditionType;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         ConditionConditions[];
    Id?:                 string;
    IsNot?:              boolean;
    Enchantment?:        string;
}

export type Operator = "Any" | "None";

export type Comparison = "GreaterThan" | "GreaterThanOrEqual" | "Equal" | "LessThan" | "LessThanOrEqual";

export interface TargetCountClass {
    $type: LimitType;
    Value: number;
}

export interface TentacledCondition {
    $type:               ConditionType;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
    Conditions?:         ConditionConditions[];
}

export type SpawnMode = "Replace";

export interface PurpleTarget {
    $type:          TargetType;
    TargetMode?:    TargetMode;
    Conditions:     FluffyCondition[] | PurpleConditions | null;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
    Origin?:        Origin;
    IncludeOrigin?: boolean;
}

export interface PurpleConditions {
    $type:               ConditionType;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    Value;
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

export interface Value {
    $type:          LimitType;
    Value?:         number;
    Target?:        ComparisonValueTarget;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      Modifier;
}

export interface ComparisonValue {
    $type:          LimitType;
    Value?:         number;
    Target?:        ComparisonValueTarget;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      Modifier;
}

export interface FluffyConditions {
    $type:               ConditionType;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    ComparisonValue;
    Conditions?:         ConditionConditions[];
}

export interface ComparisonValueTarget {
    $type:       TargetType;
    TargetMode?: TargetMode;
    Conditions:  FluffyConditions | null;
}

export type TargetMode = "Self" | "Opponent" | "Player" | "LeftMostCard" | "RightCard" | "Neighbor" | "LeftCard" | "RightMostCard" | "AllLeftCards" | "Both" | "AllRightCards";

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
    Enchantment?:        string;
    AttributeType?:      Attribute;
    Id?:                 string;
    IsSameAsPlayerHero?: boolean;
    CardType?:           Type;
}

export interface IndigoCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
    Conditions?:         IndecentCondition[];
    Enchantment?:        string;
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
    Enchantment?:        string;
}

export type Origin = "Self" | "TriggerSource";

export type TargetSection = "OpponentHand" | "AbsolutePlayerHand" | "SelfHand" | "AbsolutePlayerHandAndStash" | "AllHands" | "SelfHandAndStash" | "SelfBoard";

export interface TargetPlayer {
    $type:          TargetType;
    TargetMode?:    TargetMode;
    Conditions:     TentacledConditions | null;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
}

export interface TentacledConditions {
    $type:               ConditionType;
    Conditions?:         HilariousCondition[];
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    Value;
    CardType?:           Type;
    IsNot?:              boolean;
    AttributeType?:      Attribute;
    Sizes?:              Size[];
    Enchantment?:        string;
    Tiers?:              Tier[];
}

export interface HilariousCondition {
    $type:               ConditionType;
    Id?:                 string;
    IsNot?:              boolean;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
    CardType?:           Type;
    Tags?:               Tag[];
    Operator?:           Operator;
    Enchantment?:        string;
    Sizes?:              Size[];
    Tiers?:              Tier[];
}

export interface PurpleValue {
    $type:          LimitType;
    Target?:        FluffyTarget;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      Modifier | null;
    Value?:         number;
    MinValue?:      number;
    MaxValue?:      number;
}

export interface FluffyTarget {
    $type:          TargetType;
    TargetMode?:    TargetMode;
    Conditions:     StickyConditions | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export interface StickyConditions {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    Value;
    AttributeType?:      Attribute;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Enchantment?:        string;
    Tiers?:              Tier[];
    Conditions?:         AmbitiousCondition[];
    Id?:                 string;
}

export interface AmbitiousCondition {
    $type:               ConditionType;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
    Enchantment?:        PurpleInternalDescription;
    Id?:                 string;
    Tiers?:              Tier[];
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         ConditionConditions[];
}

export type PurpleInternalDescription = "When this item gains Freeze, remove Freeze from it." | "Radiant";

export type ActiveIn = "HandOnly" | "HandAndStash";

export interface AbilityPrerequisite {
    $type:       PrerequisiteType;
    Subject:     PurpleSubject;
    Comparison?: Comparison;
    Amount?:     number;
}

export type PrerequisiteType = "TPrerequisiteCardCount" | "TPrerequisitePlayer";

export interface PurpleSubject {
    $type:          TargetType;
    Conditions:     FluffyCondition[] | IndigoConditions | null;
    TargetMode?:    TargetMode;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
}

export interface IndigoConditions {
    $type:               ConditionType;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    Value;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Tiers?:              Tier[];
    AttributeType?:      Attribute;
    Conditions?:         CunningCondition[];
    Id?:                 string;
    Enchantment?:        string;
}

export interface CunningCondition {
    $type:               ConditionType;
    Id?:                 string;
    IsNot?:              boolean;
    Tiers?:              Tier[];
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
    Conditions?:         IndecentCondition[];
    Sizes?:              Size[];
    Enchantment?:        string;
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
    Conditions?:       ConditionConditions;
}

export type TriggerType = "TTriggerOnCardSelected" | "TTriggerOnCardFired" | "TTriggerOnCardCritted" | "TTriggerOnCardPerformedHaste" | "TTriggerOnItemUsed" | "TTriggerOnCardPerformedBurn" | "TTriggerOnCardSold" | "TTriggerOnFightStarted" | "TTriggerOnPlayerAttributeChanged" | "TTriggerOnCardPurchased" | "TTriggerOnCardPerformedSlow" | "TTriggerOnPlayerDied" | "TTriggerOnHourStarted" | "TTriggerOnCardPerformedPoison" | "TTriggerOnCardPerformedHeal" | "TTriggerOnFightEnded" | "TTriggerOnCardPerformedDestruction" | "TTriggerOnCardPerformedFreeze" | "TTriggerOnCardAttributeChanged" | "TTriggerOnEncounterSelected" | "TTriggerOnDayStarted" | "TTriggerOnCardUpgraded" | "TTriggerOnCardPerformedShield" | "TTriggerOnPlayerAttributePercentChange";

export type ChangeType = "Loss" | "Gain";

export type CombatOutcome = "Win" | "Lose";

export interface FluffySubject {
    $type:          TargetType;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Conditions:     FluffyCondition[] | IndecentConditions | null;
    TargetMode?:    TargetMode;
    Origin?:        Origin;
    IncludeOrigin?: boolean;
}

export interface IndecentConditions {
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
    Enchantment?:        string;
    Id?:                 string;
    IsSameAsPlayerHero?: boolean;
    CardType?:           Type;
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
    Conditions?:         FriskyCondition[];
    Id?:                 string;
    Enchantment?:        string;
    IsSameAsPlayerHero?: boolean;
    Tiers?:              Tier[];
}

export interface FriskyCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         CunningCondition[];
    Enchantment?:        string;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
    AttributeType?:      Attribute;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Id?:                 string;
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
    AttributeType: Attribute;
    Operation:     Operation;
    Value:         FluffyValue;
    Target:        TentacledTarget;
}

export type TentacledType = "TAuraActionCardModifyAttribute" | "TAuraActionPlayerModifyAttribute";

export interface TentacledTarget {
    $type:          TargetType;
    Conditions:     FluffyCondition[] | HilariousConditions | null;
    TargetSection?: TargetSection;
    TargetMode?:    TargetMode;
    ExcludeSelf?:   boolean;
    Origin?:        TargetMode;
    IncludeOrigin?: boolean;
}

export interface HilariousConditions {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
    AttributeType?:      Attribute;
    Conditions?:         StickyCondition[];
    Sizes?:              Size[];
    IsNot?:              boolean;
    Enchantment?:        string;
    Tiers?:              Tier[];
    Id?:                 string;
    IsSameAsPlayerHero?: boolean;
}

export interface FluffyValue {
    $type:          LimitType;
    Target?:        StickyTarget;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      Modifier | null;
    Value?:         number;
}

export interface StickyTarget {
    $type:          TargetType;
    Conditions:     AmbitiousConditions | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    TargetMode?:    TargetMode;
    Origin?:        Origin;
    IncludeOrigin?: boolean;
}

export interface AmbitiousConditions {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    Value;
    Conditions?:         StickyCondition[];
    Sizes?:              Size[];
    Enchantment?:        string;
    AttributeType?:      Attribute;
    Id?:                 string;
    IsSameAsPlayerHero?: boolean;
    CardType?:           Type;
}

export interface AuraPrerequisite {
    $type:       PrerequisiteType;
    Subject:     TentacledSubject;
    Comparison?: Comparison;
    Amount?:     number;
}

export interface TentacledSubject {
    $type:          TargetType;
    Conditions:     CunningConditions | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    TargetMode?:    TargetMode;
    Origin?:        TargetMode;
    IncludeOrigin?: boolean;
}

export interface CunningConditions {
    $type:               ConditionType;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    Value;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Enchantment?:        string;
    Tiers?:              Tier[];
    AttributeType?:      Attribute;
    Conditions?:         MischievousCondition[];
    Id?:                 string;
}

export interface MischievousCondition {
    $type:               ConditionType;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
    Enchantment?:        string;
    Id?:                 string;
    Tiers?:              Tier[];
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         ConditionConditions[];
}

export interface V2CardsDBehavior {
    $type:         StickyType;
    TargetTier?:   Tier | null;
    Enchantment?:  string;
    Enchantments?: Enchantment[];
}

export type StickyType = "TPedestalBehaviorUpgrade" | "TPedestalBehaviorEnchant" | "TPedestalBehaviorEnchantRandom";

export interface Enchantment {
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
    Id:                  ID;
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
    $type:          PurpleType;
    Value?:         PurpleLimit;
    AttributeType?: Attribute;
    Operation?:     Operation;
    Duration?:      Duration | null;
    TargetCount?:   TargetCountClass | null;
    Target:         IndigoTarget;
    Enchantment?:   FluffyInternalDescription;
}

export type FluffyInternalDescription = "Deadly 2" | "Deadly 50" | "Deadly" | "Deadly 25" | "Deadly 2x" | "Deadly 10" | "" | "Deadly None";

export interface IndigoTarget {
    $type:          TargetType;
    Conditions:     MagentaConditions | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Origin?:        TargetMode;
    TargetMode?:    TargetMode;
    IncludeOrigin?: boolean;
}

export interface MagentaConditions {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Conditions?:         BraggadociousCondition[];
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
    CardType?:           Type;
    IsSameAsPlayerHero?: boolean;
}

export interface BraggadociousCondition {
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
    Conditions?:         Condition1[];
    Enchantment?:        FluffyInternalDescription;
}

export interface Condition1 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
    AttributeType?:      Attribute;
    Conditions?:         MischievousCondition[];
    Sizes?:              Size[];
    IsNot?:              boolean;
}

export type ID = "e1" | "e3" | "e2";

export interface PurplePrerequisite {
    $type:       PrerequisiteType;
    Subject:     ComparisonValueTarget;
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
    $type:          TargetType;
    TargetMode?:    TargetMode;
    Conditions:     FriskyConditions | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Origin?:        TargetMode;
    IncludeOrigin?: boolean;
}

export interface FriskyConditions {
    $type:               ConditionType;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    IsNot?:              boolean;
}

export interface PurpleE2 {
    Id:                  ID;
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
    Target:        IndecentTarget;
}

export interface IndecentTarget {
    $type:          TargetType;
    Conditions:     MischievousConditions | null;
    Origin?:        TargetMode;
    TargetMode?:    TargetMode;
    IncludeOrigin?: boolean;
}

export interface MischievousConditions {
    $type:       ConditionType;
    Conditions?: TentacledCondition[];
    Tags?:       Tag[];
    Operator?:   Operator;
}

export interface FluffyTrigger {
    $type:   TriggerType;
    Subject: IndecentTarget;
}

export interface Attributes {
}

export interface DeadlyAuras {
    e1?: FluffyE1;
}

export interface FluffyE1 {
    Id:                  ID;
    InternalName:        string;
    InternalDescription: FluffyInternalDescription;
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
    Target:        HilariousTarget;
}

export interface HilariousTarget {
    $type:          TargetType;
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
    Conditions?:         Condition2[];
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
    Tiers?:              Tier[];
    AttributeType?:      Attribute;
    Enchantment?:        string;
    Id?:                 string;
    IsSameAsPlayerHero?: boolean;
}

export interface Condition2 {
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
    Conditions?:         ConditionConditions[];
    Id?:                 string;
    Enchantment?:        string;
}

export interface TentacledValue {
    $type:          LimitType;
    Value?:         number;
    Target?:        AmbitiousTarget;
    DefaultValue?:  number;
    Modifier?:      Modifier;
    AttributeType?: Attribute;
}

export interface AmbitiousTarget {
    $type:          TargetType;
    TargetMode?:    TargetMode;
    Conditions:     Conditions1 | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export interface Conditions1 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    Value;
    AttributeType?:      Attribute;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Enchantment?:        string;
    Tiers?:              Tier[];
    Conditions?:         Condition3[];
}

export interface Condition3 {
    $type:               ConditionType;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
    Enchantment?:        PurpleInternalDescription;
    Id?:                 string;
    Tiers?:              Tier[];
}

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
    Target:         ComparisonValueTarget;
}

export interface E1Trigger {
    $type: TriggerType;
}

export interface TentacledE1 {
    Id:                  ID;
    InternalName:        string;
    InternalDescription: TentacledInternalDescription;
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
    Target:          CunningTarget;
    Value?:          StickyValue;
    AttributeType?:  Attribute;
    Operation?:      Operation;
    Duration?:       Duration;
    TargetCount?:    null;
    Enchantment?:    TentacledInternalDescription;
}

export type TentacledInternalDescription = "" | "Shielded 1" | "Fiery" | "Burn equal to your Regeneration." | "Shielded" | "set " | "Restorative" | "Restorative 1" | "Toxic";

export interface CunningTarget {
    $type:          TargetType;
    Conditions:     ConditionConditions | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Origin?:        TargetMode;
    TargetMode?:    TargetMode;
    IncludeOrigin?: boolean;
}

export interface StickyValue {
    $type:          LimitType;
    Value?:         number;
    Target?:        MagentaTarget;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      Modifier | null;
}

export interface MagentaTarget {
    $type:          TargetType;
    Conditions:     Conditions2 | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export interface Conditions2 {
    $type:         ConditionType;
    AttributeType: Attribute;
}

export interface TentacledTrigger {
    $type:             TriggerType;
    Subject?:          IndigoSubject;
    CombatType?:       null;
    AttributeType?:    Attribute;
    ChangeType?:       ChangeType;
    AttributeChanged?: Attribute;
}

export interface IndigoSubject {
    $type:          TargetType;
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
    Id:                  ID;
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
    Target:          ComparisonValueTarget;
    ReferenceValue?: null;
}

export interface E2Prerequisite {
    $type:   PrerequisiteType;
    Subject: ComparisonValueTarget;
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
    Target:        PrerequisiteTargetPlayer;
}

export interface PrerequisiteTargetPlayer {
    $type:          TargetType;
    Conditions:     Conditions4 | null;
    TargetMode?:    TargetMode;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
}

export interface Conditions4 {
    $type:               ConditionType;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    Value;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Tiers?:              Tier[];
    AttributeType?:      Attribute;
    Conditions?:         Condition4[];
    Id?:                 string;
}

export interface Condition4 {
    $type:               ConditionType;
    Id?:                 string;
    IsNot?:              boolean;
    Tiers?:              Tier[];
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
    Conditions?:         ConditionConditions[];
}

export interface StickyE1 {
    Id:                  ID;
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
    Target:        CunningTarget;
}

export interface IndigoValue {
    $type:          LimitType;
    Target?:        PrerequisiteTargetPlayer;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      Modifier | null;
    Value?:         number;
}

export interface TentacledE2 {
    Id:                  ID;
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
    Target:        LimitTarget;
}

export interface IndecentValue {
    $type:          LimitType;
    Target:         FriskyTarget;
    AttributeType?: Attribute;
    DefaultValue:   number;
    Modifier:       Modifier;
}

export interface FriskyTarget {
    $type:          TargetType;
    TargetMode?:    TargetMode;
    Conditions:     ConditionConditions | null;
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
    e2?:  StickyE2;
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
    Target:        AmbitiousTarget;
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
    Target:        ComparisonValueTarget;
}

export interface IndigoE1 {
    Id:                  ID;
    InternalName:        string;
    InternalDescription: StickyInternalDescription;
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
    Target?:        PrerequisiteTargetPlayer;
    Duration?:      null;
    TargetPlayer?:  PrerequisiteTargetPlayer;
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

export type StickyInternalDescription = "Golden 1" | "" | "Golden 100" | "Shiny 1" | "Golden 0" | "Shiny";

export interface StickyTrigger {
    $type:          TriggerType;
    Subject?:       Subject;
    AttributeType?: Attribute;
    ChangeType?:    ChangeType;
}

export interface Subject {
    $type:          TargetType;
    TargetMode?:    TargetMode;
    Conditions:     Conditions5 | null;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
}

export interface Conditions5 {
    $type:               ConditionType;
    Conditions?:         Condition5[];
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    Value;
    CardType?:           Type;
    IsNot?:              boolean;
    AttributeType?:      Attribute;
}

export interface Condition5 {
    $type:               ConditionType;
    Id?:                 string;
    IsNot?:              boolean;
    Attribute?:          Attribute;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCountClass;
    CardType?:           Type;
    Tags?:               Tag[];
    Operator?:           Operator;
    Enchantment?:        string;
    Sizes?:              Size[];
}

export interface StickyE2 {
    Id:                  ID;
    InternalName:        string;
    InternalDescription: string;
    Action:              CunningAction;
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
    TargetPlayer: AmbitiousTarget;
    SpawnContext: RewardDefeatSpawnContext;
}

export interface IndigoTrigger {
    $type:    TriggerType;
    Subject?: LimitTarget;
}

export interface GoldenAuras {
    e1?: IndecentE1;
    e3?: E1Class;
}

export interface IndecentE1 {
    Id:                  ID;
    InternalName:        string;
    InternalDescription: StickyInternalDescription;
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
    Target:        MischievousTarget;
}

export interface MischievousTarget {
    $type:          TargetType;
    Conditions:     Conditions6 | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Origin?:        TargetMode;
    TargetMode?:    TargetMode;
    IncludeOrigin?: boolean;
}

export interface Conditions6 {
    $type:       ConditionType;
    CardType?:   Type;
    IsNot?:      boolean;
    Tags?:       Tag[];
    Operator?:   Operator;
    Sizes?:      Size[];
    Conditions?: Condition6[];
}

export interface Condition6 {
    $type: ConditionType;
    Id:    string;
    IsNot: boolean;
}

export interface E1Class {
    Id:                  ID;
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
    Target:        LimitTarget;
}

export type AttributeType = "Custom_1" | "SlowAmount" | "SlowTargets" | "FreezeTargets" | "FreezeAmount" | "HasteAmount" | "Custom_0" | "ShieldApplyAmount" | "Custom_2" | "HasteTargets";

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
    e2?: IndigoE2;
}

export interface HilariousE1 {
    Id:                  ID;
    InternalName:        string;
    InternalDescription: IndigoInternalDescription;
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
    $type:        PurpleType;
    Target:       Subject;
    Enchantment?: string;
}

export type IndigoInternalDescription = "" | "Heavy" | "Heavy 2";

export interface IndecentTrigger {
    $type:          TriggerType;
    CombatType?:    null;
    Subject?:       IndigoTarget;
    AttributeType?: Attribute;
    ChangeType?:    ChangeType;
}

export interface IndigoE2 {
    Id:                  ID;
    InternalName:        string;
    InternalDescription: string;
    Action:              BraggadociousAction;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       null;
    Priority:            Size;
    TranslationKey:      string;
    Trigger:             E1Trigger;
    VFXConfig:           VFXConfig;
}

export interface BraggadociousAction {
    $type:  PurpleType;
    Target: BraggadociousTarget;
}

export interface BraggadociousTarget {
    $type:         TargetType;
    TargetSection: TargetSection;
    ExcludeSelf:   boolean;
    Conditions:    ConditionConditions | null;
}

export interface HeavyAttributes {
    SlowTargets?: number;
    SlowAmount?:  number;
}

export interface HeavyAuras {
    e1?: E1Class;
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
    Id:                  ID;
    InternalName:        string;
    InternalDescription: IndecentInternalDescription;
    Action:              MischievousAction;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       PurplePrerequisite[] | null;
    Priority:            Priority;
    TranslationKey:      string;
    Trigger:             TentacledTrigger;
    VFXConfig:           VFXConfig;
}

export type IndecentInternalDescription = "" | "Icy" | "Icy 1";

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
    Tags:         Tag[];
}

export interface RadiantAbilities {
    e1?: CunningE1;
    e2?: IndecentE2;
}

export interface CunningE1 {
    Id:                  ID;
    InternalName:        E1InternalName;
    InternalDescription: PurpleInternalDescription;
    Action:              Action1;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       null;
    Priority:            Priority;
    TranslationKey:      string;
    Trigger:             HilariousTrigger;
    VFXConfig:           VFXConfig;
}

export interface Action1 {
    $type:          PurpleType;
    Value?:         TargetCountClass;
    AttributeType?: Attribute;
    Operation?:     Operation;
    Duration?:      null;
    TargetCount?:   null;
    Target:         Subject;
    Enchantment?:   PurpleInternalDescription;
}

export type E1InternalName = "Radiant " | "Radiant Scrap Metal Aura";

export interface HilariousTrigger {
    $type:             TriggerType;
    Subject:           LimitTarget;
    AttributeChanged?: Attribute;
    ChangeType?:       ChangeType;
}

export interface IndecentE2 {
    Id:                  string;
    InternalName:        E2InternalName;
    InternalDescription: E2InternalDescription;
    Action:              E4Action;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       null;
    Priority:            Priority;
    TranslationKey:      TranslationKey;
    Trigger:             HilariousTrigger;
    VFXConfig:           VFXConfig;
}

export interface E4Action {
    $type:         PurpleType;
    Value:         TargetCountClass;
    AttributeType: Attribute;
    Operation:     Operation;
    Duration:      Duration | null;
    TargetCount:   null;
    Target:        LimitTarget;
}

export type E2InternalDescription = "" | "When this item gains Slow, remove Slow from it.";

export type E2InternalName = "Neophiliac 6 - Slow Counter Increment" | "Neophiliac 10 - Haste Counter Increment" | "Radiant Slow";

export type TranslationKey = "a67517b9040ee047750cb0e9bc411e05" | "5e982200e255519d0b255686771ca639" | "db02baf95ec3866b3bcf0761025fd005";

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
    e2?: HilariousE2;
    e3?: AbilitiesE3;
    e4?: E4;
}

export interface HilariousE2 {
    Id:                  ID;
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
    Subject?: ComparisonValueTarget;
}

export interface AbilitiesE3 {
    Id:                  ID;
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
    Action:              E4Action;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       null;
    Priority:            Priority;
    TranslationKey:      string;
    Trigger:             E3Trigger;
    VFXConfig:           VFXConfig;
}

export interface RestorativeAttributes {
    HealAmount?: number;
}

export interface RestorativeAuras {
    e1?: StickyE1;
    e2?: AmbitiousE2;
    e5?: E5;
    e6?: E5;
}

export interface AmbitiousE2 {
    Id:                  ID;
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
    AttributeType: Attribute;
    Operation:     Operation;
    Value:         HilariousValue;
    Target:        LimitTarget;
}

export interface HilariousValue {
    $type:          LimitType;
    Target?:        CunningTarget;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      Modifier | null;
    Value?:         number;
}

export interface E5 {
    Id:                  string;
    InternalName:        string;
    InternalDescription: string;
    Action:              E5Action;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       null;
    TranslationKey:      string;
    VFXConfig:           VFXConfig;
}

export interface E5Action {
    $type:         PurpleType;
    AttributeType: Attribute;
    Operation:     Operation;
    Value:         Value;
    Target:        LimitTarget;
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
    e2?: CunningE2;
    e1?: StickyE1;
}

export interface CunningE2 {
    Id:                  ID;
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
    Target:        LimitTarget;
}

export interface AmbitiousValue {
    $type:         LimitType;
    Target:        Subject;
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
    e1?: MagentaE1;
    e2?: StickyE2;
}

export interface MagentaE1 {
    Id:                  ID;
    InternalName:        string;
    InternalDescription: StickyInternalDescription;
    Action:              Action4 | null;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       null;
    Priority:            Priority;
    TranslationKey:      string;
    Trigger:             IndigoTrigger;
    VFXConfig:           VFXConfig;
}

export interface Action4 {
    $type:         PurpleType;
    Enchantment?:  StickyInternalDescription;
    Target?:       Subject;
    TargetPlayer?: AmbitiousTarget;
    SpawnContext?: RewardDefeatSpawnContext;
}

export interface ShinyAttributes {
    CritChance?:        number;
    Multicast?:         number;
    Custom_1?:          number;
    PoisonApplyAmount?: number;
    DamageAmount?:      number;
}

export interface ShinyAuras {
    e1?: FriskyE1;
    e2?: E1Class;
    e3?: E1Class;
}

export interface FriskyE1 {
    Id:                  ID;
    InternalName:        string;
    InternalDescription: HilariousInternalDescription;
    Action:              Action5;
    ActiveIn:            ActiveIn;
    MigrationData:       string;
    Prerequisites:       FluffyPrerequisite[] | null;
    TranslationKey:      string;
    VFXConfig:           VFXConfig;
}

export interface Action5 {
    $type:         TentacledType;
    AttributeType: Attribute;
    Operation:     Operation;
    Value:         CunningValue;
    Target:        CunningTarget;
}

export interface CunningValue {
    $type:          LimitType;
    Value?:         number;
    Target?:        IndecentTarget;
    AttributeType?: Attribute;
    DefaultValue?:  number;
    Modifier?:      Modifier;
}

export type HilariousInternalDescription = "Shiny 1" | "Shiny 2" | "Shiny" | "" | "Shiny None" | "XP 2x" | "Golden 1" | "Fiery 2" | "Icy 2";

export interface FluffyPrerequisite {
    $type:      PrerequisiteType;
    Subject:    BraggadociousTarget;
    Comparison: Comparison;
    Amount:     number;
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
    e1?: MischievousE1;
    e2?: IndigoE2;
}

export interface MischievousE1 {
    Id:                  ID;
    InternalName:        string;
    InternalDescription: AmbitiousInternalDescription;
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
    $type:        PurpleType;
    Target:       HilariousTarget;
    Enchantment?: AmbitiousInternalDescription;
}

export type AmbitiousInternalDescription = "" | "Turbo" | "Turbo 3" | "Turbo 2";

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
    SelectionContextRules: null;
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
    Subject:     PrerequisiteTargetPlayer;
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
