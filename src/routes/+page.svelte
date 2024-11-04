<script lang="ts">
    import data from "$lib/v2_Cards.json";
    import { Tabs, TabItem } from "flowbite-svelte";

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

    const tierOrder = [
        "Bronze",
        "Silver",
        "Gold",
        "Diamond",
        "Legendary",
    ] as const;

    type TierType = (typeof tierOrder)[number];

    type Tier = {
        Attributes: { [key: string]: number };
    };

    type Tiers = Partial<Record<TierType, Tier>>;

    type AbilityActionType =
        | "TActionCardHaste"
        | "TActionPlayerDamage"
        | "TActionCardSlow"
        | "TActionPlayerBurnApply"
        | "TActionPlayerShieldApply"
        | "TActionPlayerHeal"
        | "TActionPlayerPoisonApply"
        | "TActionCardReload"
        | "TActionCardFreeze"
        | "TActionCardCharge"
        | "TActionCardModifyAttribute"
        | "TActionPlayerModifyAttribute"
        | "TActionGameSpawnCards";

    // TODO: tighten up the expectations here
    type AbilityAction =
        | {
              $type: AbilityActionType;
              Value: AbilityActionValue;
              SpawnContext?: never;
          }
        | {
              $type: AbilityActionType;
              SpawnContext: AbilitySpawnContext;
              Value?: never;
          };

    type AbilityActionValue =
        | { AttributeType: string; $type?: never; Value?: never }
        | { $type: "TFixedValue"; Value: number; AttributeType?: never }
        | {
              $type: "TReferenceValueCardAttribute";
              Target: { $type: "TTargetCardSelf" };
              AttributeType?: never;
          };

    type AbilitySpawnContext = {
        Limit: {
            $type: "TFixedValue";
            Value: number;
        };
    };

    type Ability = {
        Id: string;
        TranslationKey: string;
        Action: AbilityAction;
    };

    type Aura = {
        Id: string;
        TranslationKey: string;
        Action: {
            $type: "TAuraActionCardModifyAttribute";
            Value: {
                AttributeType: string;
                Modifier?: {
                    Value: number;
                };
            };
        };
    };

    interface TCardItem {
        $type: "TCardItem";
        Id: string;
        Tiers: Tiers;
        Localization: {
            Title: { Text: string };
            Tooltips: Array<{
                Key: string;
                Content: { Key: string; Text: string };
            }>;
        };
        Abilities: {
            [key: string]: Ability;
        };
        Auras: {
            [key: string]: Aura;
        };
        StartingTier: TierType;
        Tags: string[];
        HiddenTags: string[];
        Size: "Small" | "Medium" | "Large";
        Heroes: string[];
        SpawningEligibility: "Always" | "Never" | "GuidOnly";
    }

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
        suffix: "Amount" | "Targets",
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
            abilityName = ability.Action.Value!.AttributeType!;
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

        // Amount is often representing time in milliseconds, handle that here to represent as seconds.
        // There's some poor data quality in the input data that expects this even when not associated with the phrase "seconds"
        // because the formatted value is being used in other contexts.
        // As an example, Marbles would read "When you use an adjacent Small item, slow 1000 item for 1 seconds" if we're not careful.
        if (abilityValue >= 1000) {
            abilityValue /= 1000;
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
            attributeName = aura.Action.Value.AttributeType;

            // NOTE: It's kind of weird this isn't multiplied by some other value, but this looks correct at time of writing.
            if (modifierFlag === "Mod" && aura.Action.Value.Modifier) {
                auraValue = aura.Action.Value.Modifier.Value;
            }
        }

        if (auraValue == undefined) {
            auraValue = tierAttributes[attributeName];
        }

        return auraValue;
    }

    const isTCardItem = (entry: any): entry is TCardItem =>
        entry.$type === "TCardItem" && "Tiers" in entry;
    const allCardItems = Object.values(data).filter(isTCardItem) as TCardItem[];
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

    const cardItems = filteredCardItems.map((entry: TCardItem) => {
        const abilities = Object.values(entry.Abilities);
        const auras = Object.values(entry.Auras);

        // Filter duplicate localization entries, prioritize the last occurring entry.
        const uniqueTooltips = new Map<string, string>();
        [...entry.Localization.Tooltips]
            .reverse()
            .forEach(({ Content: { Key, Text } }) => {
                // Filter unused localization entries, rely on ability definitions, not localization, as source of truth for what is shown.
                if (
                    (abilities.some(
                        ({ TranslationKey }) => TranslationKey === Key,
                    ) ||
                        auras.some(
                            ({ TranslationKey }) => TranslationKey === Key,
                        )) &&
                    !uniqueTooltips.has(Key)
                ) {
                    uniqueTooltips.set(Key, Text);
                }
            });

        // Map to ordered tooltip texts based on abilities order.
        const rawAbilityTexts = Array.from(uniqueTooltips.entries())
            .sort(
                (a, b) =>
                    abilities.findIndex(
                        ({ TranslationKey }) => TranslationKey === a[0],
                    ) -
                    abilities.findIndex(
                        ({ TranslationKey }) => TranslationKey === b[0],
                    ),
            )
            // TODO: Don't double sort.. need to think of a better solution
            .sort(
                (a, b) =>
                    auras.findIndex(
                        ({ TranslationKey }) => TranslationKey === a[0],
                    ) -
                    auras.findIndex(
                        ({ TranslationKey }) => TranslationKey === b[0],
                    ),
            )
            .map(([, value]) => value);

        const tierAttributesMap = tierOrder.reduce(
            (acc, tier) => {
                const currentAttributes = entry.Tiers[tier]?.Attributes;

                // Only merge with the previous tier if current tier has attributes.
                acc[tier] = currentAttributes
                    ? {
                          ...(acc[tierOrder[tierOrder.indexOf(tier) - 1]] ||
                              {}),
                          ...currentAttributes,
                      }
                    : {}; // If no attributes, keep it as an empty object.

                return acc;
            },
            {} as Record<TierType, Tier["Attributes"]>,
        );
        
        // TODO: Instead of defaulting to starting tier - use whichever tier is being viewed so as to support information regarding all tiers.
        const startingTierAttributes = tierAttributesMap[entry.StartingTier];

        let abilityValueMap = getAbilityValueMap(
            abilities,
            startingTierAttributes,
        );

        let auraValueMap = getAuraValueMap(auras, startingTierAttributes);

        const abilityTexts = rawAbilityTexts.map((rawAbilityText) => {
            let abilityText = rawAbilityText;

            for (let [abilityId, abilityValue] of Object.entries(
                abilityValueMap,
            )) {
                if (abilityValue !== undefined) {
                    abilityText = abilityText.replace(
                        new RegExp(`\\{ability\\.${abilityId}\\}`, "g"),
                        `${abilityValue}`,
                    );
                }
            }

            for (let [auraId, auraValue] of Object.entries(auraValueMap)) {
                if (auraValue !== undefined) {
                    abilityText = abilityText.replace(
                        new RegExp(`\\{aura\\.${auraId}\\}`, "g"),
                        `${auraValue}`,
                    );
                }
            }

            return abilityText;
        });

        const tiers = Object.entries(tierAttributesMap).map(
            ([tierName, tierAttributes]) => {
                let displayedTierAttributes = Object.entries(tierAttributes)
                    .filter(([tierAttributeName, tierAttributeValue]) => {
                        // Exclude "BuyPrice" and "SellPrice"
                        if (
                            tierAttributeName === "BuyPrice" ||
                            tierAttributeName === "SellPrice"
                        ) {
                            return false;
                        }
                        // Exclude "Multicast" if its value is 1
                        if (
                            tierAttributeName === "Multicast" &&
                            tierAttributeValue === 1
                        ) {
                            return false;
                        }

                        return true;
                    })
                    .map(([tierAttributeName, tierAttributeValue]) => {
                        // Add spaces between words for TitleCased attribute names
                        let formattedName = tierAttributeName
                            .replace(/([a-z])([A-Z])/g, "$1 $2") // Add spaces for TitleCase
                            .replace(/\b(Amount|Apply)\b/g, "") // Remove "Amount" and "Apply"
                            .trim(); // Trim extra spaces from replacements

                        // Rename "CooldownMax" specifically to "Cooldown"
                        if (tierAttributeName === "CooldownMax") {
                            formattedName = "Cooldown";
                        }

                        // Initialize valueDescriptor and adjust tierAttributeValue if >= 1000
                        let valueDescriptor = null;
                        if (tierAttributeValue >= 1000) {
                            tierAttributeValue = tierAttributeValue / 1000;
                            valueDescriptor = "seconds";
                        }

                        return {
                            name: formattedName,
                            value: tierAttributeValue,
                            valueDescriptor: valueDescriptor,
                        };
                    });

                return { name: tierName, attributes: displayedTierAttributes };
            },
        );

        return {
            name: entry.Localization.Title.Text,
            abilityTexts,
            startingTier: entry.StartingTier,
            tiers,
            tags: entry.Tags,
            hiddenTags: entry.HiddenTags,
            size: entry.Size,
            heroes: entry.Heroes,
        };
    });

    // Set of predefined hero names for the filter
    const heroOptions = ["Vanessa", "Dooley", "Pygmalien", "Common"];
    let selectedHero = ""; // Holds the current hero filter selection

    // Derived array to display entries based on the selected hero
    $: displayedEntries = selectedHero
        ? cardItems.filter((cardItem) => cardItem.heroes.includes(selectedHero))
        : cardItems;
</script>

<div class="text-center mb-6">
    <h1 class="text-3xl font-bold">Hello, World! Welcome to How Bazaar!</h1>
</div>

<Tabs>
    <TabItem title="Items" open={true}>
        <!-- Items Tab Content -->
        <div class="mb-4">
            <label class="block font-semibold text-lg">
                Filter Items:
                <select
                    bind:value={selectedHero}
                    class="border border-gray-300 rounded-md p-2 ml-2 focus:outline-none focus:ring focus:border-blue-300"
                >
                    <option value="">All</option>
                    {#each heroOptions as hero}
                        <option value={hero}>{hero}</option>
                    {/each}
                </select>
            </label>
        </div>

        <ul class="space-y-4">
            {#each displayedEntries as entry}
                <li class="p-4 border border-gray-200 rounded-lg shadow-sm">
                    <div class="font-bold text-xl mb-2">{entry.name}</div>
                    <div class="text-gray-700 mb-1">
                        Heroes: {entry.heroes.join(", ")}
                    </div>
                    <div class="text-gray-700 mb-1">Size: {entry.size}</div>
                    <div class="text-gray-700 mb-1">
                        Tags: {entry.tags.join(", ")}
                    </div>
                    <div class="text-gray-500 mb-1 text-sm">
                        Hidden Tags: {entry.hiddenTags.join(", ")}
                    </div>
                    <div class="text-gray-700 mb-3">
                        Starting Tier: {entry.startingTier}
                    </div>

                    <div class="mb-3">
                        <ul class="list-disc list-inside space-y-1">
                            {#each entry.abilityTexts as abilityText}
                                <li class="text-gray-600">{abilityText}</li>
                            {/each}
                        </ul>
                    </div>

                    <!-- Fixed 5-column layout for Tiers -->
                    <div class="grid grid-cols-5 gap-4">
                        {#each entry.tiers as tier}
                            <div class="p-2 rounded-lg bg-gray-100">
                                <div class="font-semibold">{tier.name}</div>
                                <ul
                                    class="ml-4 list-inside list-disc space-y-1"
                                >
                                    {#each tier.attributes as attribute}
                                        <li class="text-gray-600">
                                            <span class="font-medium"
                                                >{attribute.name}:</span
                                            >
                                            {attribute.value}
                                            {attribute.valueDescriptor}
                                        </li>
                                    {/each}
                                </ul>
                            </div>
                        {/each}
                    </div>
                </li>
            {/each}
        </ul>
    </TabItem>

    <TabItem title="Skills">
        <!-- Skills Tab Content (Placeholder) -->
        <p class="text-gray-700">Skills content goes here.</p>
    </TabItem>
</Tabs>
