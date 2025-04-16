// TODO: Some of QuickTypes outputs are less than ideal
// I think I can generate a better typedef by interfacing with quicktype-core rather than the CLI
// https://github.com/glideapps/quicktype?tab=readme-ov-file#calling-quicktype-from-javascript
import type { Entries } from "type-fest";
import type { ParsedCombatEncounterCard, ParsedItemCard, ParsedSkillCard } from "$lib/types";
import type { V2CardsD as Card, Bronze as Tier, Tiers, Tier as TierType, AbilityAction, AuraAction, Ability, Aura, Operation, Origin } from "./patches/latest/cards";
import { unifyTooltips } from "$lib/utils/tooltipUtils";
import type { CardsJson } from "./types.parser";
import invalidItemIds from "./invalidItemIds";
import invalidSkillIds from "./invalidSkillIds";
import monsterTemplateIdMapping from "./monsterTemplateIdMapping";

// Card packs that should be filtered out
const disallowedCardPacks = [
    //   "Vanessa_The_Gang",
    // Add more card packs to filter here as needed
] as string[];

// Keywords that indicate a card should be filtered out
const invalidKeywords = ["[", "]", "Debug", "Test"] as const;

const tierOrder: TierType[] = ["Bronze", "Silver", "Gold", "Diamond", "Legendary"];

type AttributeQualifier =
    | { isMod: true; isTargets: false }
    | { isMod: false; isTargets: true }
    | { isMod: false; isTargets: false };

// Determine the attribute name relevant to an aura/ability action by looking at its metadata.
// There might not be a relevant attribute name - might be able to skip directly to a fixed value.
// If there is an attribute name then look up the value by the name.
function getAttributeInfo(
    action: AbilityAction | AuraAction,
    tierAttributes: Tier["Attributes"],
    qualifier: AttributeQualifier
): {
    name: string | undefined;
    value: number | undefined;
    operation: Operation | undefined;
    targetMode: Origin | undefined;
} {
    let attributeValue: number | undefined;
    let attributeName = "MISSING";
    let operation: Operation | undefined;
    let targetMode: Origin | undefined;
    const actionType = action.$type;

    if (actionType.includes("ModifyAttribute")) {
        if (action.Value?.$type === "TFixedValue") {
            attributeName = action.AttributeType!;
            attributeValue = action.Value.Value;
            operation = action.Operation!;
            targetMode = action.Target?.TargetMode;
        } else if (
            (action.Value?.$type === "TReferenceValueCardAttribute" || action.Value?.$type === "TReferenceValueCardAttributeAggregate") &&
            action.Value?.Target?.$type !== "TTargetCardSelf"
        ) {
            if (qualifier.isMod) {
                attributeValue = action.Value.Modifier?.Value.Value ?? 0;

                // If there is no Action.Value.Modifier.Value.Value then look at AttributeType
                if (action.Value.Modifier?.Value.Value === undefined) {
                    let modifierAttributeName = action.Value.Modifier?.Value.AttributeType;
                    attributeValue = modifierAttributeName === undefined ? 0 : getAttributeValueFromTier(modifierAttributeName, tierAttributes, qualifier);
                }

            } else {
                // Some values require context based on game state beyond the current card which isn't known to this website.
                attributeValue = 0;
            }
        } else if (action.Value?.Modifier) {
            attributeName = action.AttributeType!;
            // If there's a modifier, and if modifier mode is multiply, then get the attribute type and multiply it by modifier rather than just using modifier.
            attributeValue = action.Value.Modifier.Value.Value ?? action.Value.Modifier.Value.DefaultValue!;
            operation = action.Operation!;
            targetMode = action.Target?.TargetMode;

            if (qualifier.isMod) {
                // If there is no Action.Value.Modifier.Value.Value then look at AttributeType
                if (action.Value.Modifier.Value.Value === undefined) {
                    let modifierAttributeName = action.Value.Modifier.Value.AttributeType;
                    attributeValue = modifierAttributeName === undefined ? 0 : getAttributeValueFromTier(modifierAttributeName, tierAttributes, qualifier);
                }

                // Freeze, Slow, and Haste deal with time and are expressed in milliseconds. Convert to seconds.
                if ((attributeName == "FreezeAmount" || attributeName == "SlowAmount" || attributeName == "HasteAmount") && attributeValue && attributeValue >= 100) {
                    attributeValue /= 1000;
                }

                return {
                    name: attributeName,
                    value: attributeValue,
                    operation,
                    targetMode
                };
            }

            if (action.Value.Modifier.ModifyMode === "Multiply") {
                let modifierAttributeName = action.Value.AttributeType;
                let modifierAttributeValue = modifierAttributeName === undefined ? 0 : getAttributeValueFromTier(modifierAttributeName, tierAttributes, qualifier);
                attributeValue *= modifierAttributeValue;
            }
        } else if (action.Value?.AttributeType) {
            attributeName = action.Value.AttributeType;
        }
    } else if (actionType === "TActionGameSpawnCards") {
        if (action.SpawnContext?.Limit.$type === "TFixedValue") {
            attributeValue = action.SpawnContext.Limit.Value;
        }
    } else {
        attributeName = actionType.replace(/^TAction(Card|Player)/, "");
    }

    if (attributeValue === undefined && attributeName) {
        attributeValue = getAttributeValueFromTier(attributeName, tierAttributes, qualifier);
        // Sometimes the value might be 0 and it would be more useful to include some information about a referential value
        // so that we can say stuff like "Heal equal to shield" rather than "Heal 0" when there's no shield in an out of game context.
    }

    // Freeze, Slow, and Haste deal with time and are expressed in milliseconds. Convert to seconds.
    if ((attributeName == "FreezeAmount" || attributeName == "SlowAmount" || attributeName == "HasteAmount") && attributeValue && attributeValue >= 100) {
        attributeValue /= 1000;
    }

    return {
        name: attributeName,
        value: attributeValue,
        operation,
        targetMode
    };
}


function getAttributeValueFromTier(attributeName: string, tierAttributes: Tier["Attributes"], qualifier: AttributeQualifier) {
    const noSuffixAttributeNames = [
        "BuyPrice",
        "SellPrice",
        "HealthMax",
        "CritChance",
        "Gold",
        "CooldownMax",
        "HealthRegen",
        "Experience",
        "Prestige",
        "Income",
        "AmmoMax",
        "Shield",
        "Counter",
        "Multicast",
        "Lifesteal",
        "Level",
        "Health",
        "Ammo",
        "DamageCrit"
    ];

    const suffix = qualifier.isTargets ? "Targets" : "Amount";

    let attributeValue;

    // Check for existence of suffix because there's some dirty data.
    // As an example, Rocket Boots "AttributeType" is "HasteAmount" rather than the expected "Haste"
    if (attributeName.includes(suffix) || attributeName.includes("Custom_") || noSuffixAttributeNames.includes(attributeName)) {
        attributeValue = tierAttributes[attributeName];
    } else {
        attributeValue = tierAttributes[`${attributeName}${suffix}`];
    }

    return attributeValue;
}

function getTierMap(card: (ValidItemCard | ValidSkillCard)) {
    // Tier Attributes in cards.json are represented with an implied inheritance hierarchy.
    // That is, all attributes declared in Bronze are inherited by Silver and then Silver can overwrite attributes
    // by declaring them again. This isn't an especially useful way of working with the data. So, manually
    // perform the merge operation such that looking at a given tier shows all the current values.
    return tierOrder.reduce(
        (acc, tier) => {
            const currentTier = card.Tiers[tier];
            const previousTier = acc[tierOrder[tierOrder.indexOf(tier) - 1]];

            // If Diamond exists, treat Legendary as nonexistent for inheritance purposes
            const shouldSkipMerge = tier === "Legendary" && acc["Diamond"];

            // Only merge with the previous tier if the current tier has attributes and it's not skipped
            acc[tier] = {
                Attributes: {
                    ...(previousTier?.Attributes ?? {}),
                    ...(shouldSkipMerge ? {} : currentTier?.Attributes ?? {}),
                },
                // TooltipIds should still inherit if necessary, but prioritize Diamond over Legendary
                TooltipIds: shouldSkipMerge
                    ? acc["Diamond"].TooltipIds
                    : (currentTier?.TooltipIds ?? (previousTier?.TooltipIds ?? [])),
            };

            return acc;
        },
        {} as Record<TierType, Pick<Tier, "Attributes" | "TooltipIds">>
    );
}

// NOTE: intentionally use a loose regex match because sometimes the JSON data contains typos.
// const abilityPattern = /\{a\w{0,5}y\.(\w+)(\s*\.targets)?\}/gi;
const abilityPattern = /\{a\w{0,5}y\.(\w+)(\.targets|\.?)\|?(%)?\}/gi;

// Unified pattern for {aura.<id>}, {aura.<id>.mod}, and {aura.<id>.}
// {aura<id>.} is a typo of {aura.<id>} and should be handled the same
const auraPattern = /\{a\w{0,3}a\.(\w+)(\.mod|\.?)\|?(%)?\}/gi;

function replaceTemplatingWithValues(tooltip: string, abilities: Ability[], auras: Aura[], attributes: Tier["Attributes"]) {
    tooltip = tooltip.replace(abilityPattern, (match, id, suffix, percentSuffix) => {
        const ability = abilities.find(a => a.Id === id);

        let abilityValue;
        if (ability) {
            const attributeInfo = getAttributeInfo(ability.Action, attributes, { isMod: false, isTargets: suffix === ".targets" });
            abilityValue = attributeInfo?.value;
        }

        return abilityValue === undefined ? match : `${abilityValue}${percentSuffix ? '%' : ''}`;
    });

    tooltip = tooltip.replace(auraPattern, (match, id, suffix, percentSuffix) => {
        const aura = auras.find(a => a.Id.toLowerCase() === id.toLowerCase());

        let auraValue;
        if (aura) {
            const attributeInfo = getAttributeInfo(aura.Action, attributes, { isMod: suffix === ".mod", isTargets: false })
            auraValue = attributeInfo?.value;
        }

        return auraValue === undefined ? match : `${auraValue}${percentSuffix ? '%' : ''}`;
    });

    // TODO: THIS IS SHIT.
    // Sometimes they say {ability.e1} when they mean {aura.e1} so after doing the correct swaps, do a second sweep but using auras rather than abilities.
    tooltip = tooltip.replace(abilityPattern, (match, id, suffix, percentSuffix) => {
        const aura = auras.find(a => a.Id === id);

        let auraValue;
        if (aura) {
            const attributeInfo = getAttributeInfo(aura.Action, attributes, { isMod: false, isTargets: suffix === ".targets" });
            auraValue = attributeInfo?.value;
        }

        return auraValue === undefined ? match : `${auraValue}${percentSuffix ? '%' : ''}`;
    });

    return tooltip;
}

function prettyPrintTooltip(tooltip: string) {
    // Remove bracketed content at the end of tooltips
    tooltip = tooltip.replace(/\s*(?:\[[^\]]*\])+\s*$/, '');

    // Generally format milliseconds -> seconds
    // Don't be too greedy with the matching to avoid converting Life Preserver HP or Gavel Damage
    tooltip = tooltip.replace(/\b(\d{3,})\b(?=\s+second[s]?\b)/g, (match) => {
        const milliseconds = parseInt(match, 10);
        return `${milliseconds / 1000}`;
    });

    // Fixes Rocket Boots which display with +4000 Haste.
    tooltip = tooltip.replace(/\b(\d{3,})\b(?=\s+Haste[s]?\b)/g, (match) => {
        const hasteLarge = parseInt(match, 10);
        return `${hasteLarge / 1000}`;
    });

    // Fixes Amber which display with "+1000 Slow"
    tooltip = tooltip.replace(/\b(\d{3,})\b(?=\s+Slow[s]?\b)/g, (match) => {
        const slowLarge = parseInt(match, 10);
        return `${slowLarge / 1000}`;
    });

    // Fixes Marbles which displays with "slow 1000 item"
    tooltip = tooltip.replace(/(?<=\bslow\s+)(\d{3,})\b/g, (match) => {
        const slowLarge = parseInt(match, 10);
        return `${slowLarge / 1000}`;
    });

    // Fixes Chronobarrier and Fort which displays with "cooldowns are increase by 2000"
    tooltip = tooltip.replace(/(?<=cooldowns are increased by\s+)(\d{3,})\b/g, (match) => {
        const cooldownLarge = parseInt(match, 10);
        return `${cooldownLarge / 1000}`;
    });

    return tooltip;
}

function getDisplayedAttributes(attributes: Tier["Attributes"]) {
    // Filter and format tier attributes for display
    let displayedAttributes = Object.entries(attributes)
        .filter(([attributeName, attributeValue]) => {
            // Exclude unuseful data that is implicit and/or not readable by the user.
            if (
                attributeName.includes("Price") ||
                attributeName.includes("Amount") ||
                attributeName.includes("Targets") ||
                attributeName.includes("Custom_")
            ) {
                return false;
            }
            // Exclude "Multicast" if its value is 1 because that's an implicit default
            if (
                attributeName === "Multicast" &&
                attributeValue === 1
            ) {
                return false;
            }

            return true;
        })
        .map(([attributeName, attributeValue]) => {
            // TODO: Stop copy/pasting this - want to reuse with the other location
            // Add spaces between words for TitleCased attribute names
            let formattedName = attributeName
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .trim();

            // Rename "CooldownMax" specifically to "Cooldown"
            if (attributeName === "CooldownMax") {
                formattedName = "Cooldown";
            }

            if (attributeName === "AmmoMax") {
                formattedName = "Ammo";
            }

            // Initialize valueDescriptor and adjust tierAttributeValue if >= 1000
            let valueDescriptor = null;
            if (attributeValue >= 1000) {
                attributeValue = attributeValue / 1000;
                valueDescriptor = " seconds";
            }

            if (attributeName.includes("Chance")) {
                valueDescriptor = "%";
            }

            return {
                name: formattedName,
                value: attributeValue,
                valueDescriptor: valueDescriptor,
            };
        });

    return displayedAttributes;
}

function getDisplayedTooltips(tooltips: string[], abilities: Ability[], auras: Aura[], attributes: Tier["Attributes"]) {
    const displayedTooltips = tooltips.map((rawTooltip) => {
        let tooltip = replaceTemplatingWithValues(rawTooltip, abilities, auras, attributes);
        let prettyTooltip = prettyPrintTooltip(tooltip);

        return prettyTooltip;
    });

    return displayedTooltips;
}

// Sometimes data gets left behind in tiers (i.e. an items starting tier is changed to Gold and the underlying data retains info regarding Silver)
// Drop this data as to not confuse unifyTooltips.
// Also, Legendary data only applies to Legendary items not to all items, so drop Legendary from non-Legendary items even though it's a "tier above"
function filterTooltipsByStartingTier(
    startingTier: TierType,
    tiers: Record<TierType, { tooltips: string[] }>
): Record<TierType, { tooltips: string[] }> {
    const startingIndex = tierOrder.indexOf(startingTier);

    return Object.fromEntries(
        Object.entries(tiers).map(([tierType, tier]) => {
            // Check if the tier is "Legendary"
            if (tierType === "Legendary") {
                // Only keep tooltips if the startingTier is "Legendary"
                return [
                    tierType,
                    startingTier === "Legendary" ? tier : { tooltips: [] as string[] },
                ];
            }

            // For non-Legendary tiers, filter out tooltips that belong to "Legendary"
            // Empty tooltips for tiers preceding the startingTier
            return [
                tierType,
                (tierOrder.indexOf(tierType as TierType) >= startingIndex && tierType !== "Legendary")
                    ? { tooltips: tier.tooltips }
                    : { tooltips: [] as string[] },
            ];
        })
    ) as Record<TierType, { tooltips: string[] }>;
}

type ValidItemCard = Card & { Tiers: Tiers, Type: "Item", Localization: { Title: { Text: string } } };
type ValidSkillCard = Card & { Tiers: Tiers, Type: "Skill", Localization: { Title: { Text: string } } };
type ValidCombatEncounterCard = Card & { Type: "CombatEncounter", Localization: { Title: { Text: string } }, CombatantType: { MonsterTemplateId: string; } };

// Helper function to check for invalid keywords in a string
function hasInvalidKeywords(text: string): boolean {
    // Convert text to lowercase for case-insensitive comparison
    const lowerText = text.toLowerCase();

    // Check for each invalid keyword
    return invalidKeywords.some(keyword => {
        // For square brackets, check for exact matches
        if (keyword === "[" || keyword === "]") {
            return text.includes(keyword);
        }
        // For "Debug" and "Test", check for word boundaries to avoid matching substrings
        return new RegExp(`\\b${keyword.toLowerCase()}\\b`).test(lowerText);
    });
}

function parseItemCards(cardsJson: CardsJson): ParsedItemCard[] {
    const isValidItemCard = (entry: Card): entry is ValidItemCard =>
        entry.Type === "Item" &&
        // entry.SpawningEligibility !== "Never" &&
        entry.Tiers !== undefined &&
        entry.Localization.Title.Text !== null &&
        !hasInvalidKeywords(entry.Localization.Title.Text) &&
        !hasInvalidKeywords(entry.InternalName) &&
        !(entry.Id in invalidItemIds) &&
        !(entry.CardPackId && disallowedCardPacks.includes(entry.CardPackId));

    const validCards = Object.values(cardsJson).flat().filter(isValidItemCard);

    // TODO: I think I could avoid having to do this if I relied on key rather than converting to values and relying on Id.
    // Sanity check on Abilities and Aura IDs before proceeding.
    // This fixes "Wanted Poster" and ...
    for (let card of validCards) {
        for (let [abilityKey, ability] of Object.entries(card.Abilities)) {
            if (ability.Id !== abilityKey) {
                console.warn(
                    `WARNING: ${card.Localization.Title.Text} - ability key/id mismatch for  ${abilityKey} / ${ability.Id}. Changing id to match key.`,
                );
                ability.Id = abilityKey;
            }
        }

        for (let [auraKey, aura] of Object.entries(card.Auras)) {
            if (aura.Id !== auraKey) {
                console.warn(
                    `WARNING: ${card.Localization.Title.Text} - aura key/id mismatch ${auraKey} / ${aura.Id}. Changing id to match key.`,
                );
                aura.Id = auraKey;
            }
        }

        if (card.Enchantments) {
            for (let [_enchantmentType, enchantment] of Object.entries(card.Enchantments)) {
                for (let [abilityKey, ability] of Object.entries(enchantment.Abilities as { [key: string]: Ability })) {
                    if (ability.Id !== abilityKey) {
                        console.warn(
                            `WARNING: ${card.Localization.Title.Text} - ability key/id mismatch for  ${abilityKey} / ${ability.Id}. Changing id to match key.`,
                        );
                        ability.Id = abilityKey;
                    }
                }

                for (let [auraKey, aura] of Object.entries(enchantment.Auras as { [key: string]: Aura })) {
                    if (aura.Id !== auraKey) {
                        console.warn(
                            `WARNING: ${card.Localization.Title.Text} - aura key/id mismatch ${auraKey} / ${aura.Id}. Changing id to match key.`,
                        );
                        aura.Id = auraKey;
                    }
                }
            }
        }
    }

    const cards = validCards.map(card => {
        const abilities = Object.values(card.Abilities);
        const auras = Object.values(card.Auras);
        const tierMap = getTierMap(card);
        const remarks = [] as string[];

        if (card.Localization.Title.Text === "Snowflake") {
            console.log(card);
            debugger;
        }


        let tiers = Object.fromEntries((Object.entries(tierMap) as Entries<typeof tierMap>).map(
            ([tierName, tier]) => {
                let rawTooltips = tier.TooltipIds
                    .map(tooltipId => card.Localization.Tooltips[tooltipId]?.Content.Text)
                    .filter((tooltip): tooltip is string => tooltip !== undefined && tooltip !== null);

                // TODO: It's weird this can miss when looking up by tooltipId which should be a key
                if (rawTooltips.length !== tier.TooltipIds.length) {
                    console.warn(card.Localization.Title.Text + ': Failed to match on tooltip');
                }

                if (card.Localization.Title.Text === "Upgrade Hammer") {
                    if (tierName === "Silver" && rawTooltips[0] === "When you sell this, upgrade your leftmost Bronzer-tier item.") {
                        rawTooltips[0] = "When you sell this, upgrade your leftmost Bronze (or lower)-tier item.";
                    }

                    if (tierName === "Gold" && rawTooltips[0] === "When you sell this, upgrade your leftmost Silver or lower tier item.") {
                        rawTooltips[0] = "When you sell this, upgrade your leftmost Silver (or lower)-tier item.";
                    }

                    if (tierName === "Diamond" && rawTooltips[0] === "When you sell this, upgrade your leftmost item.") {
                        rawTooltips[0] = "When you sell this, upgrade your leftmost Gold (or lower)-tier item.";
                    }
                }

                let tooltips = getDisplayedTooltips(rawTooltips, abilities, auras, tier.Attributes);
                let attributes = getDisplayedAttributes(tier.Attributes);
                let attributeTooltips = attributes.map(attribute => `${attribute.name} ${attribute.name === "Lifesteal" ? "" : Math.round(attribute.value)}${attribute.valueDescriptor ?? ""}`.trim());

                return [tierName, {
                    tooltips: [...attributeTooltips, ...tooltips],
                }]
            },
        )) as Record<TierType, { tooltips: string[] }>;

        const enchantments = card.Enchantments ? (Object.entries(card.Enchantments) as Entries<typeof card.Enchantments>).map(([enchantmentType, enchantment]) => {
            if (!enchantment) {
                return {
                    type: enchantmentType,
                    tooltips: []
                };
            }

            const enchantmentAbilities = Object.values(enchantment.Abilities).filter(item => item.Action) as Ability[];
            const enchantmentAuras = Object.values(enchantment.Auras).filter(item => item.Action) as Aura[];

            // Exit early if there are abilities or auras, but none of them contain an Action
            // This handles improper JSON data where a tooltip exists for an enchantment that isn't valid.
            // Data lingers, but isn't valid as made evident by existing but lacking the Action attribute.
            if (Object.values(enchantment.Abilities).length > 0 && enchantmentAbilities.length === 0 ||
                Object.values(enchantment.Auras).length > 0 && enchantmentAuras.length === 0) {
                return {
                    type: enchantmentType,
                    tooltips: []
                };
            }

            let enchantmentAttributes = enchantment.Attributes as { [key: string]: number; };

            let rawTooltips = enchantment.Localization.Tooltips
                .map(tooltip => tooltip.Content.Text).filter((tooltip): tooltip is string => tooltip !== undefined && tooltip !== null) ?? [];

            // Sometimes enchantments contain tooltips which aren't valid, but we can construct valid tooltips from the underlying data.
            // Detect this by finding tooltips which rely on looking up enchantment attributes by detecting enchantment attribute templating
            // in the tooltip string. Then, if the corresponding aura would modify the card itself, we know it's weird there's a tooltip
            // because the information can be constructed from already existing attributes.
            rawTooltips = rawTooltips.filter((tooltip) => {
                const matches = [...tooltip.matchAll(auraPattern)]; // Convert matchAll iterator to an array
                if (matches.length === 0) return true;

                const hasEnchantmentAura = matches.some(match => /\.e/.test(match[0]));
                if (!hasEnchantmentAura) return false;

                // Iterate over matches to look up the aura by id
                for (const match of matches) {
                    const [fullMatch, id, suffix] = match; // Destructure the match array to get id and suffix
                    const aura = enchantmentAuras.find(a => a.Id.toLowerCase() === id.toLowerCase());

                    if (aura) {
                        // Perform actions with `aura` and `suffix` as needed
                        // Example condition: check if `aura` has the required properties
                        if (aura.Action.$type === "TAuraActionCardModifyAttribute" && aura.Action.Target?.$type === "TTargetCardSelf") {
                            // TODO: Why do I need exceptions here?
                            if (
                                (card.Localization.Title.Text === "Flamethrower" && enchantmentType === "Toxic") ||
                                (card.Localization.Title.Text === "Beach Ball" && (enchantmentType === "Restorative" || enchantmentType === "Shielded" || enchantmentType === "Toxic" || enchantmentType === "Fiery" || enchantmentType === "Obsidian")) ||
                                (card.Localization.Title.Text === "Astrolabe" && (enchantmentType === "Restorative" || enchantmentType === "Shielded" || enchantmentType === "Toxic" || enchantmentType === "Fiery" || enchantmentType === "Obsidian")) ||
                                (card.Localization.Title.Text === "Forklift" && (enchantmentType === "Restorative" || enchantmentType === "Shielded" || enchantmentType === "Toxic" || enchantmentType === "Fiery")) ||
                                (card.Localization.Title.Text === "Rowboat" && (enchantmentType === "Restorative" || enchantmentType === "Shielded" || enchantmentType === "Toxic" || enchantmentType === "Fiery" || enchantmentType === "Obsidian"))
                            ) {
                                return true;
                            }

                            return false;
                        }
                    }
                }

                return true;
            });

            // In scenarios involving enchantment tooltips, we might need to (rarely) rely on attribute values from the item itself.
            // This occurs with Restorative Security Camera.
            // Can't always merge starting attributes, though, because in other scenarios we need to manually construct tooltips 
            // from enchantment attributes and *only* enchantment attributes not starting tier attributes.
            if (rawTooltips.length > 0) {
                const tierAttributes = tierMap[card.StartingTier]?.Attributes ?? {};
                for (const [key, value] of Object.entries(tierAttributes)) {
                    if (value !== 0 || !(key in enchantmentAttributes)) {
                        enchantmentAttributes[key] = value;
                    }
                }
            }

            let tooltips = [];
            if (rawTooltips.length === 0) {
                let actions = [...enchantmentAuras, ...enchantmentAbilities].map(item => item.Action);

                for (let action of actions) {
                    const result = getAttributeInfo(action, enchantmentAttributes, { isMod: false, isTargets: false });

                    if (result.name?.includes("Custom_")) {
                        // Replace Custom with correct attribute name.
                        // Need to search through Auras and Abilities looking for Action.Value.AttributeType which matches
                        let matchingAction = [
                            ...abilities.filter(ability => ability.Action).map(ability => ability.Action),
                            ...auras.filter(aura => aura.Action).map(aura => aura.Action)
                        ].find(action => action.Value?.AttributeType === result.name);

                        if (matchingAction?.AttributeType) {
                            // Sometimes this can still match to Custom which indicates bad data.
                            result.name = matchingAction.AttributeType;
                        }
                    }

                    if (!result.name || result.name.includes("Custom")) {
                        continue;
                    }

                    let sign = '';
                    if (result.operation === "Add") {
                        sign = "+";
                    } else if (result.operation === "Subtract") {
                        sign = "-";
                    } else if (result.operation === "Multiply") {
                        if (result.value === 2 || (result.value === 0.5 && result.name === "CooldownMax")) {
                            sign = "Double";
                        } else {
                            sign = "x";
                        }
                    }

                    let value = result.value ?? 0;
                    value = value >= 1000 ? value / 1000 : value;

                    let name = result.name?.replace('Amount', '').replace('Apply', '') ?? '';

                    // TODO: Some of this was copied from getDisplayedAttributes
                    // Rename "CooldownMax" specifically to "Cooldown"
                    if (name === "CooldownMax") {
                        name = `Cooldown${sign === "Double" ? " Reduction" : ''}`;
                    }

                    if (name === "SellPrice") {
                        name = "Value";
                    }

                    name = name
                        .replace(/([a-z])([A-Z])/g, "$1 $2")
                        .trim();

                    let chance = (sign !== "Double" && name?.includes('Chance')) ? '%' : '';
                    let prefixString = result.targetMode === "Neighbor" ? "Adjacent items have an additional " : "";

                    let tooltip = `${prefixString}${sign}${sign === "Double" ? '' : value}${chance} ${name}`;

                    tooltips.push(tooltip);
                }

                if (actions.length === 0) {
                    for (let [attributeName, attributeValue] of Object.entries(enchantmentAttributes)) {
                        tooltips.push(`${attributeName}${attributeName === "Lifesteal" ? "" : Math.round(attributeValue)}`.trim());
                    }
                }
            } else {
                // NOTE: Needed to merge abilities into enchantmentAbilities to support Obsidian Astrolabe
                tooltips = getDisplayedTooltips(rawTooltips, [...enchantmentAbilities, ...abilities], enchantmentAuras, enchantmentAttributes);
            }

            if (card.Localization.Title.Text === "Uwashiwali Bird" && enchantmentType === "Shiny") {
                tooltips = ["This has +1 Multicast for each Property you have."]
            }

            return {
                type: enchantmentType,
                tooltips,
            };
        }).filter(enchantment => enchantment.tooltips.length > 0) : [];

        let hiddenTags = card.HiddenTags;
        const name = card.Localization.Title.Text;

        // Generally sanitisize each tier of tooltips and ensure there's no duplicates.
        // This occurs on Dooley's Scarf as well as Gearnola Bar at time of writing.
        tiers = Object.fromEntries(
            Object.entries(tiers).map(([tierType, tier]) => {
                tier.tooltips = [...new Set(tier.tooltips)];
                return [tierType, tier];
            })
        ) as typeof tiers;

        // Fix bad data related to starting tiers. These are all Legendary.
        let startingTier = card.StartingTier;
        const invalidLegendaries = ["Eye of the Colossus", "Infernal Greatsword", "Octopus", "Necronomicon", "Scythe", "Singularity", "Soul of the District", "Teddy", "The Eclipse"];
        if (invalidLegendaries.includes(name)) {
            startingTier = "Legendary";
        }

        // Sometimes data gets left behind in tiers (i.e. an items starting tier is changed to Gold and the underlying data retains info regarding Silver)
        // Drop this data as to not confuse unifyTooltips.
        tiers = filterTooltipsByStartingTier(startingTier, tiers);

        const unifiedTooltips = unifyTooltips(Object.entries(tiers).map(([, tier]) => tier.tooltips));

        return {
            id: card.Id,
            name,
            startingTier,
            tiers,
            tags: card.Tags,
            hiddenTags,
            size: card.Size,
            heroes: card.Heroes,
            enchantments,
            unifiedTooltips,
            remarks,
            packId: card.CardPackId
        };
    });

    return cards;
}

function parseSkillCards(cardsJson: CardsJson): ParsedSkillCard[] {
    const isValidSkillCard = (entry: Card): entry is ValidSkillCard =>
        entry.Type === "Skill" &&
        // entry.SpawningEligibility !== "Never" &&
        entry.Tiers !== undefined &&
        entry.Localization.Title.Text !== null &&
        !hasInvalidKeywords(entry.Localization.Title.Text) &&
        !hasInvalidKeywords(entry.InternalName) &&
        !(entry.Id in invalidSkillIds) &&
        !!entry.ArtKey;

    const validSkillCards = Object.values(cardsJson).flat().filter(isValidSkillCard);

    // Sanity check on Abilities and Aura IDs before proceeding.
    // This fixes "Wanted Poster" and ...
    for (let card of validSkillCards) {
        for (let [abilityKey, ability] of Object.entries(card.Abilities)) {
            if (ability.Id !== abilityKey) {
                console.warn(
                    `WARNING: ${card.Localization.Title.Text} - ability key/id mismatch for  ${abilityKey} / ${ability.Id}. Changing id to match key.`,
                );
                ability.Id = abilityKey;
            }
        }

        for (let [auraKey, aura] of Object.entries(card.Auras)) {
            if (aura.Id !== auraKey) {
                console.warn(
                    `WARNING: ${card.Localization.Title.Text} - aura key/id mismatch ${auraKey} / ${aura.Id}. Changing id to match key.`,
                );
                aura.Id = auraKey;
            }
        }
    }

    const skillCards = validSkillCards.map(card => {
        const abilities = Object.values(card.Abilities);
        const auras = Object.values(card.Auras);
        const tierMap = getTierMap(card);
        const remarks = [] as string[];

        let tiers = Object.fromEntries((Object.entries(tierMap) as Entries<typeof tierMap>).map(
            ([tierName, tier]) => {
                let rawTooltips = tier.TooltipIds
                    .map(tooltipId => card.Localization.Tooltips[tooltipId]?.Content.Text)
                    .filter((tooltip): tooltip is string => tooltip !== undefined && tooltip !== null);

                // TODO: It's weird this can miss when looking up by tooltipId which should be a key
                if (rawTooltips.length !== tier.TooltipIds.length) {
                    console.warn(card.Localization.Title.Text + ': Failed to match on tooltip');
                }

                let tooltips = getDisplayedTooltips(rawTooltips, abilities, auras, tier.Attributes);

                return [tierName, {
                    tooltips,
                }]
            },
        )) as Record<TierType, { tooltips: string[] }>;

        let hiddenTags = card.HiddenTags;
        const name = card.Localization.Title.Text;

        // Generally sanitisize each tier of tooltips and ensure there's no duplicates.
        // This occurs on Dooley's Scarf as well as Gearnola Bar at time of writing.
        tiers = Object.fromEntries(
            Object.entries(tiers).map(([tierType, tier]) => {
                tier.tooltips = [...new Set(tier.tooltips)];
                return [tierType, tier];
            })
        ) as typeof tiers;

        // Fix bad data related to starting tiers. These are all Legendary.
        let startingTier = card.StartingTier;

        tiers = filterTooltipsByStartingTier(startingTier, tiers);

        const unifiedTooltips = unifyTooltips(Object.entries(tiers).map(([, tier]) => tier.tooltips));

        return {
            id: card.Id,
            name,
            startingTier,
            tiers,
            tags: card.Tags,
            hiddenTags,
            size: card.Size,
            heroes: card.Heroes,
            artKey: card.ArtKey,
            unifiedTooltips,
            remarks,
            packId: card.CardPackId
        };
    });

    return skillCards;
}

function parseCombatEncounterCards(cardsJson: CardsJson) {
    const isEncounter = (entry: Card): entry is ValidCombatEncounterCard =>
        entry.Type === "CombatEncounter" &&
        // entry.SpawningEligibility !== "Never" &&
        entry.CombatantType !== undefined &&
        (monsterTemplateIdMapping as any)[entry.Id] &&
        entry.Localization.Title.Text !== null &&
        !hasInvalidKeywords(entry.Localization.Title.Text) &&
        !hasInvalidKeywords(entry.InternalName);

    const validCards = Object.values(cardsJson).flat().filter(isEncounter);

    const cards = validCards.map((card) => {
        return {
            id: card.Id,
            name: card.Localization.Title.Text,
            monsterTemplateId: (monsterTemplateIdMapping as any)[card.Id].monsterTemplateId
        };
    });

    return cards;
}

export function parseJson(cardsJson: CardsJson): {
    itemCards: ParsedItemCard[],
    skillCards: ParsedSkillCard[],
    combatEncounterCards: ParsedCombatEncounterCard[],
} {
    const itemCards = parseItemCards(cardsJson);
    const skillCards = parseSkillCards(cardsJson);
    const combatEncounterCards = parseCombatEncounterCards(cardsJson);

    return {
        itemCards,
        skillCards,
        combatEncounterCards,
    };
}
