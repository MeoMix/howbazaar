import { tierOrder, type Ability, type Aura, type CardItem, type CardsJson, type Tier, type TierType } from "./types";

// JSON contains testing data which isn't shown in game during normal operations
// I didn't see a good flag for hiding these so I'm explicitly banning them.
// Originally I tried filtering out "GuidOnly" but there's many items which should be shown
// that fit this critera - such as Dooley's cores.
const explicitlyHiddenItemIds = [
    // "TEST ENCHANTMENT KATANA"
    "54f957f2-9522-486b-a7c6-bb234f74846e",
    // "[Community Team] Katana"
    "16e3ebba-d530-489c-8439-3b47a4182c09",
];

function getAbilityValueMap(
    abilities: Ability[],
    tierAttributes: Tier["Attributes"],
): {
    [key: string]: number | undefined;
} {
    return abilities.reduce(
        (acc, ability) => {
            let amountAbilityValue = getAbilityValue(
                ability,
                tierAttributes,
                "Amount",
            );
            if (amountAbilityValue !== undefined) {
                acc[ability.Id] = amountAbilityValue;
            }

            let targetsAbilityValue = getAbilityValue(
                ability,
                tierAttributes,
                "Targets",
            );
            if (targetsAbilityValue !== undefined) {
                acc[`${ability.Id}.targets`] = targetsAbilityValue;
            }

            // TODO: Support Ginger Bread Man
            // let modAbilityValue = getAbilityValue(ability, tierAttributes, "Amount");
            // if (modAbilityValue !== undefined) {
            //     acc[`${ability.Id}.mod`] = modAbilityValue;
            // }

            return acc;
        },
        {} as { [key: string]: number | undefined },
    );
}

// Determine the attribute name relevant to the ability by looking at its metadata.
// There might not be a relevant attribute name - might be able to skip directly to a fixed value.
// If there is an attribute name then look up the value by the name.
// If all else fails then can consider falling back to looking up by ability id and assuming its an index offset, but this isn't desirable.
function getAbilityValue(
    ability: Ability,
    tierAttributes: Tier["Attributes"],
    suffix: "Amount" | "Targets" | "Mod",
): number | undefined {
    let abilityValue: number | undefined;
    let abilityName = "";
    const actionType = ability.Action.$type;

    if (actionType === "TActionCardHaste") {
        abilityName = "Haste";
    } else if (actionType === "TActionPlayerDamage") {
        abilityName = "Damage";
    } else if (actionType === "TActionCardSlow") {
        abilityName = "Slow";
    } else if (actionType === "TActionPlayerBurnApply") {
        abilityName = "BurnApply";
    } else if (actionType === "TActionPlayerShieldApply") {
        abilityName = "ShieldApply";
    } else if (actionType === "TActionPlayerHeal") {
        abilityName = "Heal";
    } else if (actionType === "TActionPlayerPoisonApply") {
        abilityName = "PoisonApply";
    } else if (actionType === "TActionCardReload") {
        abilityName = "Reload";
    } else if (actionType === "TActionCardFreeze") {
        abilityName = "Freeze";
    } else if (actionType === "TActionCardCharge") {
        abilityName = "Charge";
    } else if (actionType === "TActionPlayerJoyApply") {
        abilityName = "JoyApply";
    } else if (actionType === "TActionCardModifyAttribute") {
        if (ability.Action.Value!.$type === "TFixedValue") {
            abilityValue = ability.Action.Value!.Value;
        } else if (
            ability.Action.Value!.$type ===
            "TReferenceValueCardAttribute" &&
            ability.Action.Value!.Target.$type !== "TTargetCardSelf"
        ) {
            // This isn't knowable outside of game context, so just default to 0.
            // TODO: console.warn?
            abilityValue = 0;
        } else {
            abilityName = ability.Action.Value!.AttributeType!;
        }
    } else if (actionType === "TActionPlayerModifyAttribute") {
        if (ability.Action.Value?.$type === "TFixedValue") {
            abilityValue = ability.Action.Value.Value;
        } else {
            abilityName = ability.Action.Value!.AttributeType!;
        }
    } else if (actionType === "TActionGameSpawnCards") {
        if (ability.Action.SpawnContext!.Limit.$type === "TFixedValue") {
            abilityValue = ability.Action.SpawnContext!.Limit.Value;
        }
    }

    if (abilityValue == undefined) {
        let attribute = "";
        if (abilityName) {
            // Check for existence of suffix because there's some dirty data.
            // As an example, Rocket Boots "AttributeType" is "HasteAmount" rather than the expected "Haste"
            if (abilityName.includes(suffix)) {
                attribute = abilityName;
            } else {
                attribute = `${abilityName}${abilityName.includes("Custom") ? "" : suffix}`;
            }
        }

        abilityValue = tierAttributes[attribute];
    }

    return abilityValue;
}

function getAuraValueMap(
    auras: Aura[],
    tierAttributes: Tier["Attributes"],
): {
    [key: string]: number | undefined;
} {
    return auras.reduce(
        (acc, aura) => {
            let amountAuraValue = getAuraValue(aura, tierAttributes);

            if (amountAuraValue !== undefined) {
                acc[aura.Id] = amountAuraValue;
            }

            // Support Pyg's "Fork Lift" which uses `aura2.mod`
            let modAuraValue = getAuraValue(aura, tierAttributes, "Mod");
            if (modAuraValue !== undefined) {
                acc[`${aura.Id}.mod`] = modAuraValue;
            }

            return acc;
        },
        {} as { [key: string]: number | undefined },
    );
}

function getAuraValue(
    aura: Aura,
    tierAttributes: Tier["Attributes"],
    modifierFlag?: "Mod",
): number | undefined {
    let auraValue: number | undefined;
    let attributeName = "";

    const actionType = aura.Action.$type;

    if (actionType === "TAuraActionCardModifyAttribute") {
        if (aura.Action.Value!.$type === "TFixedValue") {
            auraValue = aura.Action.Value!.Value;
        } else if (aura.Action.Value!.$type === "TReferenceValueCardCount") {
            auraValue = aura.Action.Value!.Modifier.Value;
        } else {
            attributeName = aura.Action.Value.AttributeType;

            // NOTE: It's kind of weird this isn't multiplied by some other value, but this looks correct at time of writing.
            if (modifierFlag === "Mod" && aura.Action.Value.Modifier) {
                auraValue = aura.Action.Value.Modifier.Value;
            }
        }
    } else if (actionType === "TAuraActionPlayerModifyAttribute") {
        attributeName = aura.Action.Value.AttributeType;
    }

    if (auraValue == undefined) {
        auraValue = tierAttributes[attributeName];
    }

    return auraValue;
}

export function parseJson(cardsJson: CardsJson) {
    const isTCardItem = (entry: any): entry is CardItem =>
        entry.$type === "TCardItem" && "Tiers" in entry;
    const allCardItems = Object.values(cardsJson).filter(isTCardItem) as CardItem[];
    const filteredCardItems = allCardItems.filter(
        ({ SpawningEligibility, Id }) =>
            SpawningEligibility !== "Never" &&
            !explicitlyHiddenItemIds.includes(Id),
    );

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

    const cardItems = filteredCardItems.map((entry: CardItem) => {
        const abilities = Object.values(entry.Abilities);
        const auras = Object.values(entry.Auras);

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
                // TODO: It's fucking weird this can miss when looking up by tooltipId which should be a key
                let rawTooltips = tier.TooltipIds.map(tooltipId => entry.Localization.Tooltips[tooltipId]?.Content.Text);

                if (rawTooltips.some(tooltip => tooltip === undefined)) {
                    console.warn(entry.Localization.Title.Text + ': Failed to match on tooltip');
                    rawTooltips = rawTooltips.filter(Boolean);
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

        if (entry.Localization.Title.Text === "Bag of Jewels") {
            console.log('tiers:', tiers);
        }

        return {
            name: entry.Localization.Title.Text,
            tiers,
            tags: entry.Tags.map(tag => tag),
            hiddenTags: entry.HiddenTags.map(hiddenTag => hiddenTag),
            size: entry.Size,
            heroes: entry.Heroes.map(hero => hero),
        };
    });

    return cardItems;
}
