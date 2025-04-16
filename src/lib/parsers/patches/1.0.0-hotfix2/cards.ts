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

export type PurpleType = "TActionPlayerModifyAttribute" | "TActionPlayerHeal" | "TActionPlayerDamage" | "TActionCardSlow" | "TActionCardUpgrade" | "TActionPlayerShieldApply" | "TActionPlayerBurnApply" | "TActionGameSpawnCards" | "TActionCardModifyAttribute" | "TActionGameDealCards" | "TActionCardCharge" | "TActionCardFreeze" | "TActionCardEnchant" | "TActionPlayerPoisonApply" | "TActionCardForceUse" | "TActionCardHaste" | "TActionCardReload" | "TActionCardDisable" | "TActionPlayerJoyApply" | "TActionPlayerReviveHeal" | "TActionCardAddTagsBySource" | "TActionCardRemoveTagsList" | "TActionPlayerPoisonRemove" | "TActionCardBeginSandstorm" | "TActionCardRemoveTagsBySource" | "TActionCardAddTagsList" | "TActionPlayerShieldRemove" | "TActionPlayerBurnRemove" | "TActionCardDestroy" | "TAuraActionCardModifyAttribute";

export type AttributeType = "HealthMax" | "CritChance" | "Gold" | "BurnApplyAmount" | "DamageAmount" | "JoyApplyAmount" | "HealthRegen" | "CooldownMax" | "Experience" | "PoisonApplyAmount" | "Custom_1" | "ShieldApplyAmount" | "HealAmount" | "Prestige" | "Income" | "SellPrice" | "AmmoMax" | "Freeze" | "Shield" | "FreezeAmount" | "Multicast" | "Custom_0" | "BuyPrice" | "Lifesteal" | "Counter" | "Custom_4" | "Custom_5" | "Slow" | "HasteAmount" | "SlowAmount" | "Custom_3" | "Custom_2" | "Custom_8" | "Health" | "Burn" | "Poison" | "Haste" | "Level" | "Ammo" | "Joy" | "DamageCrit" | "FreezeTargets" | "ShieldRemoveAmount" | "BurnRemoveAmount" | "ChargeAmount" | "ReloadAmount";

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
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
}

export type SourceType = "TTargetCardPositional" | "TTargetCardSelf" | "TTargetPlayerRelative" | "TTargetCardTriggerSource" | "TTargetPlayerAbsolute" | "TTargetCardSection" | "TTargetCardRandom" | "TTargetCardXMost" | "TTargetPlayer" | "TCardConditionalAnd" | "TCardConditionalOr";

export interface SourceConditions {
    $type:               ConditionType;
    Conditions?:         PurpleCondition[];
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    PurpleValue;
}

export type ConditionType = "TCardConditionalAttribute" | "TPlayerConditionalAttribute" | "TCardConditionalAnd" | "TCardConditionalHiddenTag" | "TCardConditionalEnchantmentEligible" | "TCardConditionalTag" | "TCardConditionalTier" | "TCardConditionalSize" | "TCardConditionalTriggerSource" | "TCardConditionalId" | "TCardConditionalAttributeHighest" | "TCardConditionalOr" | "TCardConditionalHasEnchantment" | "TCardConditionalType" | "TCardConditionalAttributeLowest" | "TCardConditionalPlayerHero";

export type Comparison = "GreaterThan" | "Equal" | "LessThan" | "GreaterThanOrEqual" | "LessThanOrEqual";

export interface PurpleConditions {
    $type:              ConditionType;
    Attribute:          AttributeType;
    ComparisonOperator: Comparison;
    ComparisonValue:    PurpleValue;
}

export interface TargetPlayerClass {
    $type:       SourceType;
    TargetMode?: Origin;
    Conditions:  PurpleConditions | null;
}

export interface PurpleValue {
    $type:          ComparisonValueType;
    Target?:        TargetPlayerClass;
    AttributeType?: AttributeType;
    DefaultValue?:  number;
    Modifier?:      ComparisonValueModifier;
    Value?:         number;
}

export type Origin = "Player" | "Self" | "Opponent" | "LeftCard" | "RightCard" | "Neighbor" | "LeftMostCard" | "RightMostCard" | "Both" | "AllRightCards" | "AllLeftCards";

export type ComparisonValueType = "TReferenceValuePlayerAttribute" | "TFixedValue" | "TReferenceValueCardAttribute" | "TReferenceValuePlayerAttributeChange" | "TRangeValue" | "TReferenceValueCardCount" | "TReferenceValueCardAttributeAggregate" | "TReferenceValueCardTagCount";

export interface ComparisonValueModifier {
    ModifyMode: Operation;
    Value:      TargetCount;
}

export interface TargetCount {
    $type: ComparisonValueType;
    Value: number;
}

export interface PurpleCondition {
    $type:               ConditionType;
    Conditions?:         FluffyCondition[];
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    Tags?:               Tag[];
    Operator?:           Operator;
    Enchantment?:        string;
}

export interface FluffyCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         FluffyCondition[];
    Enchantment?:        string;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
}

export type Operator = "Any" | "None";

export type Tag = "Weapon" | "Shield" | "Heal" | "Joy" | "Burn" | "Poison" | "Merchant" | "Core" | "Property" | "Friend" | "Apparel" | "Freeze" | "Aquatic" | "Toy" | "Dinosaur" | "Tool" | "Potion" | "Vehicle" | "Food" | "Dragon" | "Tech" | "Ray" | "Haste" | "Slow" | "Damage" | "Loot" | "Relic";

export type TargetSection = "OpponentHand" | "AbsolutePlayerHand" | "SelfHand" | "AbsolutePlayerHandAndStash" | "AllHands" | "SelfHandAndStash" | "SelfNeighbors" | "SelfBoard" | "OpponentBoard";

export interface PurpleSpawnContext {
    $type: SpawnContextType;
    Limit: Limit;
}

export type SpawnContextType = "TSpawnContextQuery";

export interface Limit {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        LimitTarget;
    AttributeType?: AttributeType;
    DefaultValue?:  number;
    Modifier?:      ComparisonValueModifier | null;
}

export interface LimitTarget {
    $type:      SourceType;
    Conditions: TentacledCondition[] | FluffyConditions | null;
}

export interface Condition {
    $type:        ConditionType;
    Tags?:        Tag[];
    Operator?:    Operator;
    Conditions?:  TentacledCondition[];
    Enchantment?: string;
}

export interface TentacledCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    Conditions?:         Condition[];
    Enchantment?:        string;
}

export interface FluffyConditions {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    Tiers?:              Tier[];
    IsNot?:              boolean;
}

export type Tier = "Bronze" | "Diamond" | "Legendary" | "Silver" | "Gold";

export interface PurpleTarget {
    $type:          SourceType;
    TargetMode?:    Origin;
    Conditions:     TentacledCondition[] | TentacledConditions | null;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
    Origin?:        PurpleOrigin;
    IncludeOrigin?: boolean;
}

export interface TentacledConditions {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    FluffyValue;
    Conditions?:         StickyCondition[];
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

export interface FluffyValue {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        TargetPlayerClass;
    AttributeType?: AttributeType;
    DefaultValue?:  number;
    Modifier?:      ComparisonValueModifier | null;
}

export interface StickyCondition {
    $type:               ConditionType;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    Conditions?:         IndigoCondition[];
    Tags?:               Tag[];
    Operator?:           Operator;
    Enchantment?:        string;
    Sizes?:              Size[];
    Id?:                 string;
    CardType?:           Type;
    AttributeType?:      AttributeType;
    IsSameAsPlayerHero?: boolean;
}

export interface IndigoCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         TentacledCondition[];
    Enchantment?:        string;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
}

export type Size = "Small" | "Medium" | "Large";

export type PurpleOrigin = "Self" | "TriggerSource";

export interface TargetPlayer {
    $type:          SourceType;
    TargetMode?:    Origin;
    Conditions:     StickyConditions | null;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
}

export interface StickyConditions {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    PurpleValue;
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         Condition[];
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
    TargetMode?:    Origin;
    Conditions:     TentacledCondition[] | IndigoConditions | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export interface IndigoConditions {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    FluffyValue;
    Tags?:               Tag[];
    Operator?:           Operator;
    AttributeType?:      AttributeType;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Tiers?:              Tier[];
    Conditions?:         PurpleCondition[];
    Enchantment?:        string;
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
    Conditions:     TentacledCondition[] | IndecentConditions | null;
    TargetMode?:    Origin;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
}

export interface IndecentConditions {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    FluffyValue;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         IndecentCondition[];
    Tiers?:              Tier[];
    AttributeType?:      AttributeType;
    CardType?:           Type;
    Enchantment?:        string;
}

export interface IndecentCondition {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    Tags?:               Tag[];
    Operator?:           Operator;
    Enchantment?:        string;
    CardType?:           Type;
    IsNot?:              boolean;
    Sizes?:              Size[];
    Conditions?:         Condition[];
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

export type TriggerType = "TTriggerOnCardSelected" | "TTriggerOnCardFired" | "TTriggerOnCardCritted" | "TTriggerOnCardPerformedHaste" | "TTriggerOnItemUsed" | "TTriggerOnCardPerformedBurn" | "TTriggerOnCardSold" | "TTriggerOnFightStarted" | "TTriggerOnCardPurchased" | "TTriggerOnPlayerAttributeChanged" | "TTriggerOnCardPerformedSlow" | "TTriggerOnPlayerDied" | "TTriggerOnHourStarted" | "TTriggerOnCardPerformedShield" | "TTriggerOnCardPerformedPoison" | "TTriggerOnCardPerformedHeal" | "TTriggerOnFightEnded" | "TTriggerOnCardPerformedDestruction" | "TTriggerOnCardPerformedFreeze" | "TTriggerOnDayStarted" | "TTriggerOnCardAttributeChanged" | "TTriggerOnEncounterSelected" | "TTriggerOnCardUpgraded" | "TTriggerOnPlayerAttributePercentChange" | "TTriggerOnCardPerformedOverHeal";

export type ChangeType = "Loss" | "Gain";

export type CombatOutcome = "Win" | "Lose";

export interface FluffySubject {
    $type:          SourceType;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Conditions:     HilariousConditions | null;
    TargetMode?:    Origin;
    Origin?:        PurpleOrigin;
    IncludeOrigin?: boolean;
}

export interface HilariousConditions {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Conditions?:         HilariousCondition[];
    CardType?:           Type;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    FluffyValue;
    AttributeType?:      AttributeType;
    Enchantment?:        null | string;
    Id?:                 string;
    Tiers?:              Tier[];
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
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         CunningCondition[];
    Enchantment?:        string;
    AttributeType?:      AttributeType;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Id?:                 string;
    IsSameAsPlayerHero?: boolean;
}

export interface CunningCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    Conditions?:         IndigoCondition[];
    Enchantment?:        string;
    IsNot?:              boolean;
    Sizes?:              Size[];
    Tiers?:              Tier[];
    Id?:                 string;
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
    AttributeType: PurpleAttributeType;
    Operation:     Operation;
    Value:         StickyValue;
    Target:        TentacledTarget;
}

export type TentacledType = "TAuraActionCardModifyAttribute" | "TAuraActionPlayerModifyAttribute";

export type PurpleAttributeType = "HealAmount" | "DamageAmount" | "BurnApplyAmount" | "Custom_1" | "Custom_3" | "Custom_0" | "HealthMax" | "CooldownMax" | "ShieldApplyAmount" | "Multicast" | "HealthRegen" | "Lifesteal" | "AmmoMax" | "CritChance" | "BurnRemoveAmount" | "JoyApplyAmount" | "Income" | "PoisonApplyAmount" | "SellPrice" | "RerollCostModifier" | "PercentDamageReduction" | "DamageCrit" | "SlowAmount" | "Custom_2" | "FreezeAmount" | "Custom_4" | "PoisonRemoveAmount" | "ShieldRemoveAmount" | "ChargeAmount" | "ReloadAmount" | "HasteAmount";

export interface TentacledTarget {
    $type:          SourceType;
    Conditions:     TentacledCondition[] | AmbitiousConditions | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    TargetMode?:    Origin;
    Origin?:        PurpleOrigin;
    IncludeOrigin?: boolean;
}

export interface AmbitiousConditions {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    Tags?:               Tag[];
    Operator?:           Operator;
    AttributeType?:      AttributeType;
    Conditions?:         StickyCondition[];
    Sizes?:              Size[];
    IsNot?:              boolean;
    Enchantment?:        null | string;
    Id?:                 string;
    IsSameAsPlayerHero?: boolean;
    CardType?:           Type;
    Tiers?:              Tier[];
}

export interface StickyValue {
    $type:          ComparisonValueType;
    Target?:        StickyTarget;
    AttributeType?: AttributeType;
    DefaultValue?:  number;
    Modifier?:      PurpleModifier | null;
    Distinct?:      boolean;
    Value?:         number;
}

export interface StickyTarget {
    $type:          SourceType;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Conditions:     TentacledCondition[] | CunningConditions | null;
    TargetMode?:    Origin;
    Origin?:        Origin;
    IncludeOrigin?: boolean;
}

export interface CunningConditions {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    FluffyValue;
    Conditions?:         MagentaCondition[];
    Sizes?:              Size[];
    IsNot?:              boolean;
    Tiers?:              Tier[];
    Id?:                 string;
    Enchantment?:        string;
    CardType?:           Type;
    AttributeType?:      AttributeType;
}

export interface MagentaCondition {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    Conditions?:         Condition[];
    Enchantment?:        string;
    IsNot?:              boolean;
    Sizes?:              Size[];
    Tiers?:              Tier[];
    Id?:                 string;
    CardType?:           Type;
    AttributeType?:      AttributeType;
}

export interface AuraPrerequisite {
    $type:       PrerequisiteType;
    Subject:     TentacledSubject;
    Comparison?: Comparison;
    Amount?:     number;
}

export interface TentacledSubject {
    $type:          SourceType;
    Conditions:     MagentaConditions | null;
    TargetMode?:    Origin;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Origin?:        PurpleOrigin;
    IncludeOrigin?: boolean;
}

export interface MagentaConditions {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    FluffyValue;
    Tags?:               Tag[];
    Operator?:           Operator;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Sizes?:              Size[];
    Conditions?:         FriskyCondition[];
    AttributeType?:      AttributeType;
    Enchantment?:        string;
    Id?:                 string;
    IsSameAsPlayerHero?: boolean;
}

export interface FriskyCondition {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    Tags?:               Tag[];
    Operator?:           Operator;
    Enchantment?:        string;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Conditions?:         PurpleCondition[];
    Sizes?:              Size[];
    Id?:                 string;
}

export type CardPackID = "Pygmalien_Core" | "Core" | "Vanessa_Core" | "Stelle_Core" | "Dooley_Core" | "Pyg_Frozen_Assets" | "Jules_Core" | "Mak_Core" | "Vanessa_Mysteries_of_the_Deep";

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
    Target:         IndigoTarget;
    Enchantment?:   PurpleInternalDescription;
}

export type PurpleInternalDescription = "Deadly 50" | "Deadly 2" | "Deadly" | "Deadly 25" | "" | "Deadly 2x" | "Deadly 1" | "Deadly 10";

export interface IndigoTarget {
    $type:          SourceType;
    Conditions:     FriskyConditions | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    TargetMode?:    Origin;
    Origin?:        Origin;
    IncludeOrigin?: boolean;
}

export interface FriskyConditions {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    Tags?:               Tag[];
    Operator?:           Operator;
    AttributeType?:      AttributeType;
    Conditions?:         MischievousCondition[];
    Sizes?:              Size[];
    IsNot?:              boolean;
    Enchantment?:        string;
    Id?:                 string;
    IsSameAsPlayerHero?: boolean;
}

export interface MischievousCondition {
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
    Conditions?:         BraggadociousCondition[];
    Id?:                 string;
}

export interface BraggadociousCondition {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    Tags?:               Tag[];
    Operator?:           Operator;
}

export type E1ID = "e1" | "e3";

export interface PurplePrerequisite {
    $type:       PrerequisiteType;
    Subject?:    TargetPlayerClass;
    Conditions?: PrerequisiteConditions;
    Comparison?: Comparison;
    Amount?:     number;
}

export interface PurpleTrigger {
    $type:             TriggerType;
    Subject?:          IndigoTarget;
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
    Target:        IndecentTarget;
}

export interface IndecentTarget {
    $type:          SourceType;
    Origin?:        Origin;
    TargetMode?:    Origin;
    IncludeOrigin?: boolean;
    Conditions:     MischievousConditions | null;
}

export interface MischievousConditions {
    $type:       ConditionType;
    Conditions?: Condition1[];
    Tags?:       Tag[];
    Operator?:   Operator;
}

export interface Condition1 {
    $type:               ConditionType;
    Conditions?:         Condition[];
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    Tags?:               Tag[];
    Operator?:           Operator;
}

export type E2ID = "e2" | "e3" | "e4" | "e5" | "e6";

export interface FluffyTrigger {
    $type:             TriggerType;
    Subject:           IndecentTarget;
    AttributeChanged?: AttributeType;
    ChangeType?:       ChangeType;
}

export interface Attributes {
}

export interface DeadlyAuras {
    e1?: FluffyE1;
    e?:  E;
    e2?: FluffyE2;
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
    Target:        HilariousTarget;
}

export interface HilariousTarget {
    $type:          SourceType;
    ExcludeSelf?:   boolean;
    Conditions:     BraggadociousConditions | null;
    TargetMode?:    Origin;
    TargetSection?: TargetSection;
}

export interface BraggadociousConditions {
    $type:               ConditionType;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    FluffyValue;
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         Condition2[];
    Tiers?:              Tier[];
    CardType?:           Type;
    AttributeType?:      AttributeType;
}

export interface Condition2 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    CardType?:           Type;
    IsNot?:              boolean;
    Enchantment?:        string;
    Sizes?:              Size[];
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
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
    Target:        IndigoTarget;
}

export interface IndigoValue {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        AmbitiousTarget;
    AttributeType?: AttributeType;
    DefaultValue?:  number;
    Modifier?:      PurpleModifier | null;
}

export interface AmbitiousTarget {
    $type:          SourceType;
    Conditions:     Conditions1 | null;
    TargetMode?:    Origin;
    ExcludeSelf?:   boolean;
    TargetSection?: TargetSection;
}

export interface Conditions1 {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    FluffyValue;
    Sizes?:              Size[];
    IsNot?:              boolean;
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         Condition3[];
    Tiers?:              Tier[];
    AttributeType?:      AttributeType;
}

export interface Condition3 {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    Tags?:               Tag[];
    Operator?:           Operator;
    Enchantment?:        string;
}

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
    AttributeType: AttributeType;
    Operation:     Operation;
    Value:         TargetCount;
    Target:        IndecentTarget;
}

export type HiddenTag = "HealthMax" | "Health" | "Poison" | "Income" | "Cooldown" | "Heal" | "Value" | "EconomyReference" | "Damage" | "BurnReference" | "Slow" | "Active" | "Shield" | "Burn" | "DamageReference" | "CritReference" | "Gold" | "Passive" | "NonWeapon" | "Multicast" | "Haste" | "HealReference" | "ShieldReference" | "HasteReference" | "Freeze" | "Crit" | "Ammo" | "Charge" | "JoyReference" | "Regen" | "PoisonReference" | "Joy" | "HealthReference" | "FreezeReference" | "SlowReference" | "AmmoReference" | "Toughness" | "Lifesteal" | "Experience" | "RegenReference" | "Unsellable";

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
    Target:         AmbitiousTarget;
}

export interface E1Trigger {
    $type: TriggerType;
}

export interface TentacledE1 {
    Id:                  E1ID;
    Trigger:             TentacledTrigger;
    ActiveIn:            ActiveIn;
    Action:              IndigoAction | null;
    Prerequisites:       PurplePrerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: ConditionInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface IndigoAction {
    $type:           PurpleType;
    ReferenceValue?: null;
    Target:          CunningTarget;
    Value?:          IndecentValue;
    AttributeType?:  AttributeType;
    Operation?:      Operation;
    Duration?:       Duration;
    TargetCount?:    null;
    Enchantment?:    ConditionInternalDescription;
}

export type ConditionInternalDescription = "" | "Fiery" | "Burn" | "Burn equal to your Regeneration." | "Shielded" | "set " | "Shielded 1" | "Restorative" | "Restorative 1" | "Toxic";

export interface CunningTarget {
    $type:          SourceType;
    Conditions:     Condition | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    TargetMode?:    Origin;
    Origin?:        Origin;
    IncludeOrigin?: boolean;
}

export interface IndecentValue {
    $type:          ComparisonValueType;
    Value?:         number;
    Target?:        MagentaTarget;
    AttributeType?: AttributeType;
    DefaultValue?:  number;
    Modifier?:      ComparisonValueModifier | null;
}

export interface MagentaTarget {
    $type:          SourceType;
    Conditions:     Conditions2 | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
}

export interface Conditions2 {
    $type:          ConditionType;
    Tags?:          Tag[];
    Operator?:      Operator;
    Conditions?:    TentacledCondition[];
    Enchantment?:   string;
    AttributeType?: AttributeType;
}

export interface TentacledTrigger {
    $type:             TriggerType;
    Subject?:          StickySubject;
    AttributeType?:    AttributeType;
    ChangeType?:       ChangeType;
    CombatType?:       null;
    AttributeChanged?: AttributeType;
}

export interface StickySubject {
    $type:          SourceType;
    TargetMode?:    Origin;
    Conditions:     Conditions3 | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Origin?:        Origin;
    IncludeOrigin?: boolean;
}

export interface Conditions3 {
    $type:               ConditionType;
    Tags?:               Tag[];
    Operator?:           Operator;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    IsSameAsPlayerHero?: boolean;
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
    Value?:          Limit;
    AttributeType?:  AttributeType;
    Operation?:      Operation;
    Duration?:       Duration;
    TargetCount?:    null;
    Target:          FriskyTarget;
    ReferenceValue?: null;
}

export interface FriskyTarget {
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
    Tiers?:              Tier[];
    Conditions?:         Condition4[];
    Enchantment?:        string;
}

export interface Condition4 {
    $type:               ConditionType;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    Tags?:               Tag[];
    Operator?:           Operator;
    Conditions?:         Condition[];
    Enchantment?:        ConditionInternalDescription;
}

export interface The3_Prerequisite {
    $type:   PrerequisiteType;
    Subject: TargetPlayerClass;
}

export interface StickyTrigger {
    $type:             TriggerType;
    Subject?:          FriskyTarget;
    AttributeType?:    AttributeType;
    ChangeType?:       ChangeType;
    AttributeChanged?: AttributeType;
}

export interface FieryAttributes {
    BurnApplyAmount?: number;
    Custom_4?:        number;
    Custom_0?:        number;
    Custom_1?:        number;
}

export interface FieryAuras {
    e2?: StickyE2;
    e1?: StickyE1;
    e3?: E2Class;
    E2?: E2Class;
}

export interface E2Class {
    Id:                  E2IDEnum;
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
    Target:        FriskyTarget;
}

export type E2IDEnum = "E2" | "e3";

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
    Target:        CunningTarget;
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
    Target:        LimitTarget;
}

export interface HilariousValue {
    $type:          ComparisonValueType;
    Target?:        CunningTarget;
    AttributeType?: AttributeType;
    DefaultValue?:  number;
    Modifier?:      ComparisonValueModifier | null;
    Value?:         number;
    Distinct?:      boolean;
}

export type FluffyInternalDescription = "Sets the value of burn" | "" | "Sets the heal of the item" | "Sets the value of Burn" | "Burn 1 for each non-Weapon item you have." | "Sets the value of Poison" | "Burn 1 for each Aquatic or Toy item you have." | "Sets the value of poison" | "Sets the value of heal" | "Sets the value of Heal" | "Sets the value of shield" | "Sets shield" | "Sets the value of ShieldApplyAmount" | "Heal 12 for each non-Weapon item you have." | "Sets the value of Restorative Submersible" | "Heal 15 for each Aquatic or Toy item you have." | "Sets the value of Restorative Submarine Ability" | "Restorative" | "Sets the value of Ability 1" | "Sets the value of Restorative The Boulder" | "Sets the value of Restorative Dragon Whelp" | "Sets the value of Shield" | "Shield 8 for each non-Weapon item you have." | "Sets Shield" | "Shield 10 for each Aquatic or Toy item you have." | "Sets the value of Shielded The Boulder" | "Poison 1 for each non-Weapon item you have." | "Poison 1 for each Aquatic or Toy item you have.";

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
    e2?: IndigoE2;
}

export interface IndigoE1 {
    Id:                  E1ID;
    Trigger:             IndigoTrigger;
    ActiveIn:            ActiveIn;
    Action:              CunningAction;
    Prerequisites:       null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: TentacledInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface CunningAction {
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

export type TentacledInternalDescription = "Golden 1" | "" | "Golden 100" | "Shiny 1" | "Golden 0" | "When you buy a Property, this item gains [1/2/3/4] value." | "Shiny";

export interface IndigoTrigger {
    $type:          TriggerType;
    Subject:        HilariousTarget;
    AttributeType?: AttributeType;
    ChangeType?:    ChangeType;
}

export interface IndigoE2 {
    Id:                  E2ID;
    Trigger:             IndecentTrigger;
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
    $type:        PurpleType;
    TargetPlayer: TargetPlayerClass;
    SpawnContext: FluffySpawnContext;
}

export interface IndecentTrigger {
    $type:   TriggerType;
    Subject: LimitTarget;
}

export interface GoldenAuras {
    e1?: IndecentE1;
    e3?: E1Class;
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
    Conditions?: Condition5[];
}

export interface Condition5 {
    $type: ConditionType;
    Id:    string;
    IsNot: boolean;
}

export interface E1Class {
    Id:                  E1ID;
    ActiveIn:            ActiveIn;
    Action:              MischievousAction;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface MischievousAction {
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
    e1?:  HilariousE1;
    e2?:  IndecentE2;
    "3"?: The3;
}

export interface The3 {
    Id:                  string;
    Trigger:             The3_Trigger;
    ActiveIn:            ActiveIn;
    Action:              The3_Action;
    Prerequisites:       The3_Prerequisite[];
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface The3_Action {
    $type:         PurpleType;
    Value:         TargetCount;
    AttributeType: AttributeType;
    Operation:     Operation;
    Duration:      Duration | null;
    TargetCount:   null;
    Target:        LimitTarget;
}

export interface The3_Trigger {
    $type:          TriggerType;
    Subject?:       TargetPlayerClass;
    AttributeType?: AttributeType;
    ChangeType?:    ChangeType;
}

export interface HilariousE1 {
    Id:                  E1ID;
    Trigger:             TentacledTrigger;
    ActiveIn:            ActiveIn;
    Action:              BraggadociousAction;
    Prerequisites:       PurplePrerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: StickyInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface BraggadociousAction {
    $type:        PurpleType;
    Target:       HilariousTarget;
    Enchantment?: string;
}

export type StickyInternalDescription = "" | "Heavy" | "Heavy 3";

export interface IndecentE2 {
    Id:                  E2ID;
    Trigger:             The3_Trigger;
    ActiveIn:            ActiveIn;
    Action:              Action1;
    Prerequisites:       The3_Prerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface Action1 {
    $type:          PurpleType;
    Value?:         TargetCount;
    AttributeType?: AttributeType;
    Operation?:     Operation;
    Duration?:      Duration;
    TargetCount?:   null;
    Target:         MagentaTarget;
}

export interface HeavyAttributes {
    SlowTargets?: number;
    SlowAmount?:  number;
    Custom_4?:    number;
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
    e1?:  AmbitiousE1;
    e2?:  The3;
    "3"?: The3;
}

export interface AmbitiousE1 {
    Id:                  E1ID;
    Trigger:             HilariousTrigger;
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
    $type:        PurpleType;
    Target:       AmbitiousTarget;
    Enchantment?: IndigoInternalDescription;
}

export type IndigoInternalDescription = "" | "Icy" | "Icy 2";

export interface HilariousTrigger {
    $type:          TriggerType;
    Subject?:       IndigoSubject;
    AttributeType?: AttributeType;
    ChangeType?:    ChangeType;
    CombatType?:    null;
}

export interface IndigoSubject {
    $type:          SourceType;
    TargetMode?:    Origin;
    Conditions:     Conditions6 | null;
    TargetSection?: TargetSection;
    ExcludeSelf?:   boolean;
    Origin?:        Origin;
    IncludeOrigin?: boolean;
}

export interface Conditions6 {
    $type:               ConditionType;
    Tiers?:              Tier[];
    IsNot?:              boolean;
    Attribute?:          AttributeType;
    ComparisonOperator?: Comparison;
    ComparisonValue?:    TargetCount;
    Conditions?:         Condition[];
    Tags?:               Tag[];
    Operator?:           Operator;
    Enchantment?:        string;
    Sizes?:              Size[];
    Id?:                 string;
    AttributeType?:      AttributeType;
    IsSameAsPlayerHero?: boolean;
}

export interface IcyAttributes {
    FreezeTargets?: number;
    FreezeAmount?:  number;
    Custom_4?:      number;
    Custom_8?:      number;
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
    Trigger:             E3Trigger;
    ActiveIn:            ActiveIn;
    Action:              BraggadociousAction;
    Prerequisites:       E3Prerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface E3Prerequisite {
    $type:      PrerequisiteType;
    Subject:    LimitTarget;
    Comparison: Comparison;
    Amount:     number;
}

export interface E3Trigger {
    $type:    TriggerType;
    Subject?: MagentaTarget;
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
    e2?: HilariousE2;
}

export interface MagentaE1 {
    Id:                  E1ID;
    Trigger:             AmbitiousTrigger;
    ActiveIn:            ActiveIn;
    Action:              Action3;
    Prerequisites:       E3Prerequisite[] | null;
    Priority:            Priority;
    InternalName:        E1InternalName;
    InternalDescription: IndecentInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface Action3 {
    $type:          PurpleType;
    Value?:         TargetCount;
    AttributeType?: AttributeType;
    Operation?:     Operation;
    Duration?:      null;
    TargetCount?:   null;
    Target:         TargetPlayer;
    Enchantment?:   IndecentInternalDescription;
}

export type IndecentInternalDescription = "When this item gains Freeze, remove Freeze from it." | "Radiant" | "";

export type E1InternalName = "Radiant " | "Radiant Scrap Metal Ability" | "Radiant" | "Radiant Upgrade Hammer Ability";

export interface AmbitiousTrigger {
    $type:             TriggerType;
    Subject:           TargetPlayer;
    AttributeChanged?: AttributeType;
    ChangeType?:       ChangeType;
}

export interface HilariousE2 {
    Id:                  E2ID;
    Trigger:             CunningTrigger;
    ActiveIn:            ActiveIn;
    Action:              The3_Action;
    Prerequisites:       null;
    Priority:            Priority;
    InternalName:        E2InternalName;
    InternalDescription: HilariousInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      E2TranslationKey;
}

export type HilariousInternalDescription = "When this item gains Slow, remove Slow from it.";

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
    e1?: TentacledE1;
    e3?: PurpleE3;
    e2?: TentacledE2;
}

export interface PurpleE3 {
    Id:                  E1ID;
    Trigger:             E3Trigger;
    ActiveIn:            ActiveIn;
    Action:              Action4;
    Prerequisites:       null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface Action4 {
    $type:         PurpleType;
    Value:         TargetCount;
    AttributeType: AttributeType;
    Operation:     Operation;
    Duration:      Duration | null;
    TargetCount:   null;
    Target:        FriskyTarget;
}

export interface RestorativeAttributes {
    HealAmount?: number;
    Custom_4?:   number;
    Custom_1?:   number;
}

export interface RestorativeAuras {
    e1?: StickyE1;
    e2?: StickyE2;
    e3?: FluffyE3;
}

export interface FluffyE3 {
    Id:                  E1ID;
    ActiveIn:            ActiveIn;
    Action:              Action5;
    Prerequisites:       null;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface Action5 {
    $type:         PurpleType;
    AttributeType: AttributeType;
    Operation:     Operation;
    Value:         Limit;
    Target:        HilariousTarget;
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
    e3?: TentacledE3;
    e2?: TentacledE2;
}

export interface TentacledE3 {
    Id:                  E1ID;
    Trigger:             E3Trigger;
    ActiveIn:            ActiveIn;
    Action:              Action6;
    Prerequisites:       null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface Action6 {
    $type:         PurpleType;
    Value:         TargetCount;
    AttributeType: AttributeType;
    Operation:     Operation;
    Duration:      Duration | null;
    TargetCount:   null;
    Target:        HilariousTarget;
}

export interface ShieldedAttributes {
    ShieldApplyAmount?: number;
    Custom_4?:          number;
    Custom_1?:          number;
}

export interface ShieldedAuras {
    e2?: StickyE2;
    e1?: StickyE1;
    e3?: StickyE3;
}

export interface StickyE3 {
    Id:                  string;
    ActiveIn:            ActiveIn;
    Action:              Action7;
    Prerequisites:       null;
    InternalName:        E3InternalName;
    InternalDescription: FluffyInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      E3TranslationKey;
}

export interface Action7 {
    $type:         PurpleType;
    AttributeType: AttributeType;
    Operation:     Operation;
    Value:         Limit;
    Target:        LimitTarget;
}

export type E3InternalName = "Tooltip Handling" | "Shielded Sharkclaws Aura" | "Shielded Handaxe Aura";

export type E3TranslationKey = "9ed8516049000a0e1a90054e0aab06ce" | "a193d872e6cb3a8dc2d05aedb98955c0" | "b7b4b93275c7490d6e2b0997872ba2e1";

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
    e1?: FriskyE1;
    e2?: IndigoE2;
}

export interface FriskyE1 {
    Id:                  E1ID;
    Trigger:             E3Trigger;
    ActiveIn:            ActiveIn;
    Action:              Action8 | null;
    Prerequisites:       E3Prerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: TentacledInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface Action8 {
    $type:         PurpleType;
    Enchantment?:  TentacledInternalDescription;
    Target?:       AmbitiousTarget;
    TargetPlayer?: TargetPlayerClass;
    SpawnContext?: FluffySpawnContext;
}

export interface ShinyAttributes {
    CritChance?: number;
    Multicast?:  number;
    Custom_1?:   number;
}

export interface ShinyAuras {
    e1?: MischievousE1;
    e2?: E4Class;
    e3?: E4Class;
    e4?: E4Class;
    e5?: E4Class;
    e6?: E4Class;
}

export interface MischievousE1 {
    Id:                  E1ID;
    ActiveIn:            ActiveIn;
    Action:              Action9;
    Prerequisites:       TentacledPrerequisite[] | null;
    InternalName:        string;
    InternalDescription: E4InternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface Action9 {
    $type:         TentacledType;
    AttributeType: AttributeType;
    Operation:     Operation;
    Value:         HilariousValue;
    Target:        CunningTarget;
}

export type E4InternalDescription = "Shiny 1" | "Shiny" | "" | "Shiny 2" | "Deadly 25" | "XP 2x" | "Golden 1" | "This has +{aura.1} Multicast for each Property you have." | "Icy 2" | "Shiny None" | "Tooltip Handling";

export interface TentacledPrerequisite {
    $type:       PrerequisiteType;
    Subject:     AmbitiousTarget;
    Comparison?: Comparison;
    Amount?:     number;
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
    AttributeType: AttributeType;
    Operation:     Operation;
    Value:         AmbitiousValue;
    Target:        IndecentTarget;
}

export interface AmbitiousValue {
    $type:          ComparisonValueType;
    Target?:        IndecentTarget;
    AttributeType?: AttributeType;
    DefaultValue?:  number;
    Modifier?:      ComparisonValueModifier | null;
    Value?:         number;
}

export interface Toxic {
    Attributes:   ToxicAttributes;
    Abilities:    ToxicAbilities;
    Auras:        FieryAuras;
    Tags:         any[];
    HiddenTags:   HiddenTag[];
    Localization: DeadlyLocalization;
    HasAbilities: boolean;
    HasAuras:     boolean;
}

export interface ToxicAbilities {
    e1?: TentacledE1;
    e2?: AmbitiousE2;
    E1?: E1;
}

export interface AmbitiousE2 {
    Id:                  E2ID;
    Trigger:             StickyTrigger;
    ActiveIn:            ActiveIn;
    Action:              Action10;
    Prerequisites:       The3_Prerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: string;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface Action10 {
    $type:           PurpleType;
    Value?:          TargetCount;
    AttributeType?:  AttributeType;
    Operation?:      Operation;
    Duration?:       Duration;
    TargetCount?:    null;
    Target:          AmbitiousTarget;
    ReferenceValue?: null;
}

export interface ToxicAttributes {
    PoisonApplyAmount?: number;
    Custom_4?:          number;
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
    e1?:  BraggadociousE1;
    e2?:  IndecentE2;
    "3"?: The3;
}

export interface BraggadociousE1 {
    Id:                  E1ID;
    Trigger:             TentacledTrigger;
    ActiveIn:            ActiveIn;
    Action:              Action11;
    Prerequisites:       PurplePrerequisite[] | null;
    Priority:            Priority;
    InternalName:        string;
    InternalDescription: AmbitiousInternalDescription;
    MigrationData:       string;
    VFXConfig:           VFXConfig;
    TranslationKey:      string;
}

export interface Action11 {
    $type:        PurpleType;
    Target:       IndigoTarget;
    Enchantment?: AmbitiousInternalDescription;
}

export type AmbitiousInternalDescription = "" | "Turbo" | "Turbo 2" | "Turbo 3";

export interface TurboAttributes {
    HasteTargets?: number;
    HasteAmount?:  number;
    Custom_4?:     number;
    Custom_8?:     number;
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
    Conditions?:  Condition6[];
}

export interface Condition6 {
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

export type Version = "1.0.0" | "0.0.0" | "0.1.7" | "0.1.8" | "0.1.9";
