// TODO: Some of QuickTypes outputs are less than ideal
// I think I can generate a better typedef by interfacing with quicktype-core rather than the CLI
// https://github.com/glideapps/quicktype?tab=readme-ov-file#calling-quicktype-from-javascript
import type { CardsJson, ClientSideCard } from "./types";
import type { V2CardsD as Card, Ability, Bronze as Tier, Aura, Tiers, Tier as TierType, AbilityAction, AuraAction } from "./v2_Cards";

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

function getAbilityValueMap(
    abilities: Ability[],
    tierAttributes: Tier["Attributes"],
): {
    [key: string]: number | undefined;
} {
    return abilities.reduce(
        (acc, ability) => {
            let amountAbilityValue = getAttributeValue(
                ability.Action,
                tierAttributes,
                "Amount",
            );
            if (amountAbilityValue !== undefined) {
                acc[ability.Id] = amountAbilityValue;
            }

            let targetsAbilityValue = getAttributeValue(
                ability.Action,
                tierAttributes,
                "Targets",
            );
            if (targetsAbilityValue !== undefined) {
                acc[`${ability.Id}.targets`] = targetsAbilityValue;
            }

            return acc;
        },
        {} as { [key: string]: number | undefined },
    );
}

function getAuraValueMap(
    auras: Aura[],
    tierAttributes: Tier["Attributes"],
): {
    [key: string]: number | undefined;
} {
    return auras.reduce(
        (acc, aura) => {
            let amountAuraValue = getAttributeValue(aura.Action, tierAttributes, "Amount");

            if (amountAuraValue !== undefined) {
                acc[aura.Id] = amountAuraValue;
            }

            // Support Dooley's "Fork Lift" which uses `aura2.mod`
            let modAuraValue = getAttributeValue(aura.Action, tierAttributes, "Amount");
            if (modAuraValue !== undefined) {
                acc[`${aura.Id}.mod`] = modAuraValue;
            }

            return acc;
        },
        {} as { [key: string]: number | undefined },
    );
}

// Determine the attribute name relevant to an aura/ability action by looking at its metadata.
// There might not be a relevant attribute name - might be able to skip directly to a fixed value.
// If there is an attribute name then look up the value by the name.
function getAttributeValue(
    action: AbilityAction | AuraAction,
    tierAttributes: Tier["Attributes"],
    suffix: "Amount" | "Targets",
): number | undefined {
    let attributeValue: number | undefined;
    let attributeName = "";
    const actionType = action.$type;

    if (actionType.includes("ModifyAttribute")) {
        if (action.Value?.$type === "TFixedValue") {
            attributeValue = action.Value.Value;
        } else if (action.Value?.$type === "TReferenceValueCardCount") {
            attributeValue = action.Value.Modifier?.Value;
        } else if (
            action.Value?.$type === "TReferenceValueCardAttribute" &&
            action.Value?.Target?.$type !== "TTargetCardSelf"
        ) {
            // Some values require context based on game state beyond the current card which isn't known to this website.
            attributeValue = 0;
        } else if (action.Value?.Modifier) {
            attributeValue = action.Value.Modifier.Value;
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

        // Check for existence of suffix because there's some dirty data.
        // As an example, Rocket Boots "AttributeType" is "HasteAmount" rather than the expected "Haste"
        if (attributeName.includes(suffix) || attributeName.includes("Custom_") || noSuffixAttributeNames.includes(attributeName)) {
            attributeValue = tierAttributes[attributeName];
        } else {
            attributeValue = tierAttributes[`${attributeName}${suffix}`];
        }
    }

    return attributeValue;
}

export function parseJson(cardsJson: CardsJson): ClientSideCard[] {
    const isItemOrSkill = (entry: Card): entry is Card & { Tiers: Tiers, Type: "Item" | "Skill", Localization: { Title: { Text: string } } } =>
        (entry.Type === "Item" || entry.Type === "Skill") &&
        entry.SpawningEligibility !== "Never" &&
        entry.Tiers !== undefined &&
        entry.Localization.Title.Text !== null &&
        !explicitlyHiddenItemIds.includes(entry.Id);

    const filteredCardItems = Object.values(cardsJson).filter(isItemOrSkill);

    // Sanity check on Abilities and Aura IDs before proceeding.
    // This fixes "Wanted Poster" and ...
    for (let entry of filteredCardItems) {
        for (let [abilityKey, ability] of Object.entries(entry.Abilities)) {
            if (ability.Id !== abilityKey) {
                console.warn(
                    `WARNING: ${entry.Localization.Title.Text} - ability key/id mismatch for  ${abilityKey} / ${ability.Id}. Changing id to match key.`,
                );
                ability.Id = abilityKey;
            }
        }

        for (let [auraKey, aura] of Object.entries(entry.Auras)) {
            if (aura.Id !== auraKey) {
                console.warn(
                    `WARNING: ${entry.Localization.Title.Text} - aura key/id mismatch ${auraKey} / ${aura.Id}. Changing id to match key.`,
                );
                aura.Id = auraKey;
            }
        }
    }

    const cardItems = filteredCardItems.map(entry => {
        const abilities = Object.values(entry.Abilities);
        const auras = Object.values(entry.Auras);

        // TODO: Do I want Legendary here?
        const tierOrder: TierType[] = ["Bronze", "Silver", "Gold", "Diamond", "Legendary"];

        const tierMap = tierOrder.reduce(
            (acc, tier) => {
                const currentTier = entry.Tiers[tier];
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

        // Map each tier to its attributes and ability texts
        const tiers = Object.fromEntries(Object.entries(tierMap).map(
            ([tierName, tier]) => {
                const rawTooltips = tier.TooltipIds
                    .map(tooltipId => entry.Localization.Tooltips[tooltipId]?.Content.Text)
                    .filter((tooltip): tooltip is string => tooltip !== undefined && tooltip !== null);

                // TODO: It's weird this can miss when looking up by tooltipId which should be a key
                if (rawTooltips.length !== tier.TooltipIds.length) {
                    console.warn(entry.Localization.Title.Text + ': Failed to match on tooltip');
                }

                const rawAttributes = tier.Attributes;

                let abilityValueMap = getAbilityValueMap(abilities, rawAttributes);

                let auraValueMap = getAuraValueMap(auras, rawAttributes);

                // Filter and format tier attributes for display
                let attributes = Object.entries(rawAttributes)
                    .filter(([attributeName, attributeValue]) => {
                        // Exclude "BuyPrice" and "SellPrice"
                        if (
                            attributeName.includes("Price") ||
                            attributeName.includes("Amount") ||
                            attributeName.includes("Targets") ||
                            attributeName.includes("Custom_")
                        ) {
                            return false;
                        }
                        // Exclude "Multicast" if its value is 1
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
                            .replace(/([a-z])([A-Z])/g, "$1 $2") // Add spaces for TitleCase
                            .trim(); // Trim extra spaces from replacements

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

                // Generate ability texts for the current tier
                const tooltips = rawTooltips.map((rawTooltip) => {
                    let tooltip = rawTooltip;

                    // Remove [{}] from the tooltip text as it indicates a value which is reliant on game state to compute properly.
                    tooltip = tooltip.replace(/\[\{.*?\}\]/g, "").trim();

                    // Replace ability placeholders with tier-specific values
                    for (let [
                        abilityId,
                        abilityValue,
                    ] of Object.entries(abilityValueMap)) {
                        if (abilityValue !== undefined) {
                            tooltip = tooltip.replace(
                                new RegExp(
                                    `\\{ability\\.${abilityId}\\}`,
                                    "g",
                                ),
                                `${abilityValue}`,
                            );
                        }
                    }

                    // Replace aura placeholders with tier-specific values
                    for (let [auraId, auraValue] of Object.entries(
                        auraValueMap,
                    )) {
                        if (auraValue !== undefined) {
                            tooltip = tooltip.replace(
                                new RegExp(
                                    `\\{aura\\.${auraId}\\}`,
                                    "g",
                                ),
                                `${auraValue}`,
                            );
                        }
                    }

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
                });

                // Return tier data, including attributes and calculated ability texts
                return [tierName, {
                    attributes,
                    tooltips,
                }]
            },
        ));

        return {
            name: entry.Localization.Title.Text,
            type: entry.Type,
            tiers,
            tags: entry.Tags,
            hiddenTags: entry.HiddenTags,
            size: entry.Size,
            heroes: entry.Heroes,
        };
    });

    return cardItems;
}
