<script lang="ts">
    import data from "$lib/v2_Cards.json";

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

    // TODO: build this up
    type AbilityActionType = "TActionCardHaste" | unknown;

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
        | { $type: "TFixedValue"; Value: number; AttributeType?: never };

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

    interface TCardItem {
        $type: "TCardItem";
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
            [key: string]: {
                Action: {
                    // AttributeType: string;
                    Value: {
                        AttributeType: string;
                    };
                };
            };
        };
        StartingTier: TierType;
        Tags: string[];
        HiddenTags: string[];
        Heroes: string[];
        SpawningEligibility: "Always" | "Never" | "GuidOnly";
    }

    interface TCardEncounterStep {
        $type: "TCardEncounterStep";
    }

    function isTCardItem(entry: any): entry is TCardItem {
        return entry.$type === "TCardItem" && "Tiers" in entry;
    }

    function isSpawningEligibleCard(cardItem: TCardItem): boolean {
        return cardItem.SpawningEligibility === "Always";
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
        suffix: "Amount" | "Targets" | "",
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
            } else if (ability.Action.Value!.$type === "TReferenceValueCardAttribute") {
                // This isn't knowable outside of game context, so just default to 0.
                abilityValue = 0;
            } else {
                abilityName = ability.Action.Value!.AttributeType!;
                suffix = "";
            }
        } else if (actionType === "TActionPlayerModifyAttribute") {
            abilityName = ability.Action.Value!.AttributeType!;
            suffix = "";
        } else if (actionType === "TActionGameSpawnCards") {
            if (ability.Action.SpawnContext!.Limit.$type === "TFixedValue") {
                abilityValue = ability.Action.SpawnContext!.Limit.Value;
            }
        }

        if (abilityValue == undefined) {
            let attribute = "";
            if (abilityName) {
                attribute = `${abilityName}${suffix}`;
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

    const filteredEntries = Object.values(data).filter(
        isTCardItem,
    ) as TCardItem[];

    const filteredCardItems = filteredEntries.filter(isSpawningEligibleCard);

    const cardItems = filteredCardItems.map((entry: TCardItem) => {
        const tierAttributesMap = Object.fromEntries(
            tierOrder.map((tier) => [tier, {}]),
        ) as Record<TierType, Tier["Attributes"]>;

        let accumulatedAttributes = {};

        for (const tier of tierOrder) {
            const currentTier = entry.Tiers[tier];
            if (currentTier && currentTier.Attributes) {
                const currentAttributes = currentTier.Attributes;

                accumulatedAttributes = {
                    ...accumulatedAttributes,
                    ...currentAttributes,
                };

                tierAttributesMap[tier] = { ...accumulatedAttributes };
            } else {
                tierAttributesMap[tier] = { ...accumulatedAttributes };
            }
        }

        const startingTier = entry.StartingTier;

        let hiddenTags = entry.HiddenTags;

        const startingTierAttributes = tierAttributesMap[startingTier];
  
        // There are localization entries which aren't used - filter out the unused entries rather than relying on localization as a single source of truth
        const abilities = Object.values(entry.Abilities);

        // Sadly, there are also duplicate keys! Need to take just the last instance when duplicates exist.
        // Create a Map to store only the last occurrence of each Content.Key
        const uniqueTooltips = new Map<string, string>();

        // Loop through Tooltips in reverse to ensure only the last occurrence is stored
        for (let i = entry.Localization.Tooltips.length - 1; i >= 0; i--) {
            const tooltip = entry.Localization.Tooltips[i];
            const key = tooltip.Content.Key;

            // Only add to the Map if the key is in abilityLocalizationKeys and hasn't been added yet
            let ability = abilities.find(
                (entry) => entry.TranslationKey === key,
            );

            if (ability && !uniqueTooltips.has(key)) {
                uniqueTooltips.set(key, tooltip.Content.Text);
            }
        }

        const rawAbilityTexts = Array.from(uniqueTooltips.entries())
            .filter(([key]) =>
                abilities.some((entry) => entry.TranslationKey === key),
            )
            .sort(
                (a, b) =>
                    abilities.findIndex(
                        (entry) => entry.TranslationKey === a[0],
                    ) -
                    abilities.findIndex(
                        (entry) => entry.TranslationKey === b[0],
                    ),
            )
            .map(([, value]) => value);

        let abilityValueMap = getAbilityValueMap(
            abilities,
            // TODO: Instead of defaulting to starting tier - use whichever tier is being viewed so as to support information regarding all tiers.
            startingTierAttributes,
        );

        // TODO: Wanted Poster is broken because they're reusing the same ID for two abilities unintentionally
        // if (entry.Localization.Title.Text === "Wanted Poster") {
        //     debugger;
        // }

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

            // TODO: not sure max auras
            // for (let auraIndex = 0; auraIndex < 10; auraIndex++) {
            //     const placeholder = `{aura.${auraIndex}}`;

            //     if (modifiedText?.includes(placeholder)) {
            //         let attribute =
            //             entry.Auras[auraIndex].Action.Value.AttributeType;

            //         let abilityValue = tierAttribute[attribute];

            //         // Replace the placeholder in the modified text if the value exists
            //         if (abilityValue !== undefined) {
            //             modifiedText = modifiedText.replace(placeholder, abilityValue);
            //         }
            //     }
            // }

            return abilityText;
        });

        return {
            name: entry.Localization.Title.Text,
            abilityTexts,
            startingTier: entry.StartingTier,
            tiers: tierAttributesMap,
            tags: entry.Tags,
            hiddenTags,
            heroes: entry.Heroes,
        };
    });

    // Set of predefined hero names for the filter
    const heroOptions = ["Vanessa", "Dooley", "Pygmalien"];
    let selectedHero = "Pygmalien"; // Holds the current hero filter selection

    // Derived array to display entries based on the selected hero
    $: displayedEntries = selectedHero
        ? cardItems.filter((cardItem) => cardItem.heroes.includes(selectedHero))
        : cardItems;
</script>

<h1>Hello, World! Welcome to How Bazaar!</h1>

<div>
    <label>
        <select bind:value={selectedHero}>
            <option value="">All Heroes</option>
            {#each heroOptions as hero}
                <option value={hero}>{hero}</option>
            {/each}
        </select>
    </label>
</div>

<ul>
    {#each displayedEntries as entry}
        <li>
            <div>{entry.name}</div>
            <div>Heroes: {entry.heroes.join(", ")}</div>
            <div>Tags: {entry.tags.join(", ")}</div>
            <div>Hidden Tags: {entry.hiddenTags.join(", ")}</div>
            <div>Starting Tier: {entry.startingTier}</div>
            <div>
                <ul>
                    {#each entry.abilityTexts as abilityText}
                        <li>{abilityText}</li>
                    {/each}
                </ul>
            </div>
            <div>
                <ul>
                    {#each Object.entries(entry.tiers) as [tierName, tierAttributes]}
                        <li>
                            {tierName}
                            <ul>
                                {#each Object.entries(tierAttributes) as [tierAttributeName, tierAttributeValue]}
                                    <li>
                                        {tierAttributeName}: {tierAttributeValue}
                                    </li>
                                {/each}
                            </ul>
                        </li>
                    {/each}
                </ul>
            </div>
        </li>
    {/each}
</ul>
