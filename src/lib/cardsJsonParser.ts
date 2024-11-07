// TODO: Some of QuickTypes outputs are less than ideal
// I think I can generate a better typedef by interfacing with quicktype-core rather than the CLI
// https://github.com/glideapps/quicktype?tab=readme-ov-file#calling-quicktype-from-javascript
import type { Entries } from "type-fest";
import type { CardsJson, ClientSideCard, ClientSideTier } from "./types";
import type { V2CardsD as Card, Bronze as Tier, Tiers, Tier as TierType, AbilityAction, AuraAction, Ability, Aura, Attributes, Operation, TargetMode } from "./v2_Cards";

// JSON contains testing data which isn't shown in game during normal operations
// I didn't see a good flag for hiding these so I'm explicitly banning them.
// Originally I tried filtering out "GuidOnly" but there's many items which should be shown
// that fit this critera - such as Dooley's cores.
const explicitlyHiddenItemIds = [
    // "TEST ENCHANTMENT KATANA"
    "54f957f2-9522-486b-a7c6-bb234f74846e",
    // "[Community Team] Katana"
    "16e3ebba-d530-489c-8439-3b47a4182c09",
    // "Gingerbread Man" (Joy isn't enabled currently),
    "8b2ce029-7f69-401c-9811-3a6398237a90"
];

type AttributeQualifier =
    | { isMod: true; isTargets: false }
    | { isMod: false; isTargets: true }
    | { isMod: false; isTargets: false };

// Determine the attribute name relevant to an aura/ability action by looking at its metadata.
// There might not be a relevant attribute name - might be able to skip directly to a fixed value.
// If there is an attribute name then look up the value by the name.
function getAttributeValue(
    action: AbilityAction | AuraAction,
    tierAttributes: Tier["Attributes"],
    qualifier: AttributeQualifier
): number | undefined {
    let attributeValue: number | undefined;
    let attributeName = "";
    const actionType = action.$type;

    if (actionType.includes("ModifyAttribute")) {
        if (action.Value?.$type === "TFixedValue") {
            attributeValue = action.Value.Value;
        } else if (
            (action.Value?.$type === "TReferenceValueCardAttribute" || action.Value?.$type === "TReferenceValueCardAttributeAggregate") &&
            action.Value?.Target?.$type !== "TTargetCardSelf"
        ) {
            // Some values require context based on game state beyond the current card which isn't known to this website.
            attributeValue = 0;
        } else if (action.Value?.Modifier) {
            // If there's a modifier, and if modifier mode is multiply, then get the attribute type and multiply it by modifier rather than just using modifier.
            attributeValue = action.Value.Modifier.Value;

            if (qualifier.isMod) {
                return attributeValue;
            }

            if (action.Value.Modifier.ModifyMode === "Multiply") {
                let modifierAttributeName = action.Value.AttributeType;
                let modifierAttributeValue = modifierAttributeName === undefined ? 0 : getAttributeValueFromTier(modifierAttributeName, tierAttributes, qualifier);
                attributeValue *= modifierAttributeValue;
            }
        } else if (action.Value?.AttributeType) {
            attributeName = action.Value?.AttributeType;
        }
    } else if (actionType === "TActionGameSpawnCards") {
        if (action.SpawnContext?.Limit.$type === "TFixedValue") {
            attributeValue = action.SpawnContext.Limit.Value;
        }
    } else {
        attributeName = actionType.replace(/^TAction(Card|Player)/, "");
    }

    if (attributeValue == undefined && attributeName) {
        attributeValue = getAttributeValueFromTier(attributeName, tierAttributes, qualifier);
    }

    return attributeValue;
}

// TODO: Evaluate merging this with getAttributeValue
function getEnchantmentAttributeNameAndValue(
    action: AbilityAction | AuraAction,
    tierAttributes: Tier["Attributes"],
    qualifier: AttributeQualifier
): { name: string | undefined; value: number | undefined, operation: Operation | undefined, targetMode: TargetMode | undefined } {
    let attributeValue: number | undefined;
    let attributeName = "MISSING";
    let operation: Operation | undefined;
    let targetMode: TargetMode | undefined;
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
            // Some values require context based on game state beyond the current card which isn't known to this website.
            attributeValue = 0;
        } else if (action.Value?.Modifier) {
            // If there's a modifier, and if modifier mode is multiply, then get the attribute type and multiply it by modifier rather than just using modifier.
            attributeValue = action.Value.Modifier.Value;
            operation = action.Operation!;
            targetMode = action.Target?.TargetMode;

            if (qualifier.isMod) {
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
            attributeName = action.Value?.AttributeType;
        }
    } else if (actionType === "TActionGameSpawnCards") {
        if (action.SpawnContext?.Limit.$type === "TFixedValue") {
            attributeValue = action.SpawnContext.Limit.Value;
        }
    } else {
        attributeName = actionType.replace(/^TAction(Card|Player)/, "");
    }

    if (attributeValue == undefined && attributeName) {
        attributeValue = getAttributeValueFromTier(attributeName, tierAttributes, qualifier);
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

function getTierMap(card: ValidCard) {
    const tierOrder: TierType[] = ["Bronze", "Silver", "Gold", "Diamond", "Legendary"];

    // Tier Attributes in v2_Cards.json are represented with an implied inheritance hierarchy.
    // That is, all attributes declared in Bronze are inherited by Silver and then Silver can overwrite attributes
    // by declaring them again. This isn't an especially useful way of working with the data. So, manually
    // perform the merge operation such that looking at a given tier shows all the current values.
    return tierOrder.reduce(
        (acc, tier) => {
            const currentTier = card.Tiers[tier];
            const previousTier = acc[tierOrder[tierOrder.indexOf(tier) - 1]];

            // Only merge with the previous tier if the current tier has attributes.
            acc[tier] = {
                Attributes: currentTier?.Attributes
                    ? {
                        ...(previousTier?.Attributes || {}),
                        ...currentTier.Attributes,
                    }
                    : {}, // If no attributes, keep it as an empty object.
                TooltipIds: currentTier?.TooltipIds || [], // Retain TooltipIds without merging.
            };

            return acc;
        },
        {} as Record<TierType, Pick<Tier, "Attributes" | "TooltipIds">>
    );
}

// NOTE: intentionally use a loose regex match because sometimes the JSON data contains typos.
// const abilityPattern = /\{a\w{0,5}y\.(\w+)(\s*\.targets)?\}/gi;
const abilityPattern = /\{a\w{0,5}y\.(\w+)(\.targets|\.?)\}/gi;

// Unified pattern for {aura.<id>}, {aura.<id>.mod}, and {aura.<id>.}
// {aura<id>.} is a typo of {aura.<id>} and should be handled the same
const auraPattern = /\{a\w{0,3}a\.(\w+)(\.mod|\.?)\}/gi;

function replaceTemplatingWithValues(tooltip: string, abilities: Ability[], auras: Aura[], attributes: Tier["Attributes"]) {
    tooltip = tooltip.replace(abilityPattern, (match, id, suffix) => {
        const ability = abilities.find(a => a.Id === id);

        if (!ability) {
            return match;
        }

        // Determine behavior based on the suffix
        let abilityValue;
        if (suffix === ".targets") {
            // Handle {ability.<id>.targets}
            abilityValue = getAttributeValue(ability.Action, attributes, { isMod: false, isTargets: true });
        } else {
            // Handle {ability.<id>.} (extra period case)
            // Handle {ability.<id>} (default case)
            abilityValue = getAttributeValue(ability.Action, attributes, { isMod: false, isTargets: false });
        }

        // If the value is undefined, return the original match, otherwise replace it
        return abilityValue !== undefined ? `${abilityValue}` : match;
    });

    tooltip = tooltip.replace(auraPattern, (match, id, suffix) => {
        const aura = auras.find(a => a.Id.toLowerCase() === id.toLowerCase());

        if (!aura) {
            return match;
        }

        // Determine behavior based on the suffix
        let auraValue;
        if (suffix === ".mod") {
            // Handle {aura.<id>.mod}
            auraValue = getAttributeValue(aura.Action, attributes, { isMod: true, isTargets: false });
        } else {
            // Handle {aura.<id>.} (extra period case)
            // Handle {aura.<id>} (default case)
            auraValue = getAttributeValue(aura.Action, attributes, { isMod: false, isTargets: false });
        }

        // If the value is undefined, return the original match; otherwise, replace it
        return auraValue !== undefined ? `${auraValue}` : match;
    });

    return tooltip;
}

function prettyPrintTooltip(tooltip: string) {
    // Generally format milliseconds -> seconds
    // Don't be too greedy with the matching to avoid converting Life Preserver HP or Gavel Damage
    tooltip = tooltip.replace(/\b(\d{4,})\b(?=\s+second[s]?\b)/g, (match) => {
        const milliseconds = parseInt(match, 10);
        return `${milliseconds / 1000}`;
    });

    // Fixes Rocket Boots which display with +4000 Haste.
    tooltip = tooltip.replace(/\b(\d{4,})\b(?=\s+Haste[s]?\b)/g, (match) => {
        const hasteLarge = parseInt(match, 10);
        return `${hasteLarge / 1000}`;
    });

    // Fixes Amber which display with "+1000 Slow"
    tooltip = tooltip.replace(/\b(\d{4,})\b(?=\s+Slow[s]?\b)/g, (match) => {
        const slowLarge = parseInt(match, 10);
        return `${slowLarge / 1000}`;
    });

    // Fixes Marbles which displays with "slow 1000 item"
    tooltip = tooltip.replace(/(?<=\bslow\s+)(\d{4,})\b/g, (match) => {
        const slowLarge = parseInt(match, 10);
        return `${slowLarge / 1000}`;
    });

    // Fixes Chronobarrier and Fort which displays with "cooldowns are increase by 2000"
    tooltip = tooltip.replace(/(?<=cooldowns are increased by\s+)(\d{4,})\b/g, (match) => {
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
            // Add spaces between words for TitleCased attribute names
            let formattedName = attributeName
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .trim();

            // Rename "CooldownMax" specifically to "Cooldown"
            if (attributeName === "CooldownMax") {
                formattedName = "Cooldown";
            }

            // Initialize valueDescriptor and adjust tierAttributeValue if >= 1000
            let valueDescriptor = null;
            if (attributeValue >= 1000) {
                attributeValue = attributeValue / 1000;
                valueDescriptor = "seconds";
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

type ValidCard = Card & { Tiers: Tiers, Type: "Item" | "Skill", Localization: { Title: { Text: string } } };

export function parseJson(cardsJson: CardsJson): ClientSideCard[] {
    const isItemOrSkill = (entry: Card): entry is ValidCard =>
        (entry.Type === "Item" || entry.Type === "Skill") &&
        entry.SpawningEligibility !== "Never" &&
        entry.Tiers !== undefined &&
        entry.Localization.Title.Text !== null &&
        !explicitlyHiddenItemIds.includes(entry.Id);

    const validCards = Object.values(cardsJson).filter(isItemOrSkill);

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
    }

    const cards = validCards.map(card => {
        const abilities = Object.values(card.Abilities);
        const auras = Object.values(card.Auras);
        const tierMap = getTierMap(card);

        const tiers = Object.fromEntries((Object.entries(tierMap) as Entries<typeof tierMap>).map(
            ([tierName, tier]) => {
                const rawTooltips = tier.TooltipIds
                    .map(tooltipId => card.Localization.Tooltips[tooltipId]?.Content.Text)
                    .filter((tooltip): tooltip is string => tooltip !== undefined && tooltip !== null);

                // TODO: It's weird this can miss when looking up by tooltipId which should be a key
                if (rawTooltips.length !== tier.TooltipIds.length) {
                    console.warn(card.Localization.Title.Text + ': Failed to match on tooltip');
                }

                let tooltips = getDisplayedTooltips(rawTooltips, abilities, auras, tier.Attributes);
                let attributes = getDisplayedAttributes(tier.Attributes);

                return [tierName, {
                    tooltips,
                    attributes,
                }]
            },
        )) as Record<TierType, ClientSideTier>;

        const enchantments = card.Enchantments ? (Object.entries(card.Enchantments) as Entries<typeof card.Enchantments>).map(([enchantmentName, enchantment]) => {
            if (!enchantment) {
                return {
                    name: enchantmentName,
                    tooltips: []
                };
            }

            // if (card.Localization.Title.Text === "Sextant" && enchantmentName === 'Deadly') {
            //     console.log('yo');
            // }

            const enchantmentAbilities = Object.values(enchantment.Abilities).filter(item => item.Action) as Ability[];
            const enchantmentAuras = Object.values(enchantment.Auras).filter(item => item.Action) as Aura[];

            // Exit early if there are abilities or auras, but none of them contain an Action
            // This handles improper JSON data where a tooltip exists for an enchantment that isn't valid.
            // Data lingers, but isn't valid as made evident by existing but lacking the Action attribute.
            if (Object.values(enchantment.Abilities).length > 0 && enchantmentAbilities.length === 0 ||
                Object.values(enchantment.Auras).length > 0 && enchantmentAuras.length === 0) {
                return {
                    name: enchantmentName,
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
                            return false;
                        }
                    }
                }

                return true;
            });

            // In scenarios involving enchantment tooltips, we might need to (rarely) rely on attribute values from the item itself.
            // This occurs with Heavy Induction Aegis.
            // Can't always merge starting attributes, though, because in other scenarios we need to manually construct tooltips 
            // from enchantment attributes and *only* enchantment attributes not starting tier attributes.
            if (rawTooltips.length > 0) {
                enchantmentAttributes = { ...enchantmentAttributes, ...tierMap[card.StartingTier].Attributes ?? {} };
            }

            let tooltips = [];
            if (rawTooltips.length === 0) {
                let actions = [...enchantmentAuras, ...enchantmentAbilities].map(item => item.Action);

                for (let action of actions) {
                    const result = getEnchantmentAttributeNameAndValue(action, enchantmentAttributes, { isMod: false, isTargets: false });
                    let sign = '';

                    if (result.operation === "Add") {
                        sign = "+";
                    } else if (result.operation === "Subtract") {
                        sign = "-";
                    } else if (result.operation === "Multiply") {
                        sign = "x"
                    }

                    let value = result.value ?? 0;
                    value = value >= 1000 ? value / 1000 : value;

                    let name = result.name?.replace('Amount', '').replace('Apply', '') ?? '';

                    name = name
                        .replace(/([a-z])([A-Z])/g, "$1 $2")
                        .trim();

                    let chance = name?.includes('Chance') ? '%' : '';
                    let prefixString = result.targetMode === "Neighbor" ? "Adjacent items have an additional " : "";

                    tooltips.push(`${prefixString}${sign}${value}${chance} ${name}`);
                }

                if (actions.length === 0) {
                    for (let [attributeName, attributeValue] of Object.entries(enchantmentAttributes)) {
                        tooltips.push(`${attributeName} ${attributeValue}`);
                    }
                }
            } else {
                tooltips = getDisplayedTooltips(rawTooltips, enchantmentAbilities, enchantmentAuras, enchantmentAttributes);
            }

            return {
                name: enchantmentName,
                tooltips,
            };
        }).filter(enchantment => enchantment.tooltips.length > 0) : [];

        return {
            name: card.Localization.Title.Text,
            type: card.Type,
            tiers,
            tags: card.Tags,
            hiddenTags: card.HiddenTags,
            size: card.Size,
            heroes: card.Heroes,
            enchantments,
        };
    });

    return cards;
}
