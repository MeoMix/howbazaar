<script lang="ts">
    import data from "$lib/v2_Cards.json";

    type TierType = "Bronze" | "Silver" | "Gold" | "Diamond";

    type Tier = {
        Attributes: { [key: string]: number };
    };

    type Tiers = {
        Bronze?: Tier;
        Silver?: Tier;
        Gold?: Tier;
        Diamond?: Tier;
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
            [key: string]: {
                TranslationKey: string;
            };
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
        StartingTier: string;
        Tags: string[];
        HiddenTags: string[];
        Heroes: string[];
        SpawningEligibility: "Always" | "Never" | "GuidOnly";
    }

    interface TCardEncounterStep {
        $type: "TCardEncounterStep";
    }

    type Entry = TCardItem | TCardEncounterStep;

    function isTCardItem(entry: any): entry is TCardItem {
        return entry.$type === "TCardItem" && "Tiers" in entry;
    }

    function isSpawningEligibleCard(cardItem: TCardItem): boolean {
        return cardItem.SpawningEligibility === "Always";
    }

    const tierOrder = ["Bronze", "Silver", "Gold", "Diamond"] as const;

    const filteredEntries = Object.values(data).filter(
        isTCardItem,
    ) as TCardItem[];

    const filteredCardItems = filteredEntries.filter(isSpawningEligibleCard);

    function extractAbilities(attributes: Tier["Attributes"]): string[] {
        const abilities: string[] = [];

        // Get all keys from the item in the order they appear
        const keys = Object.keys(attributes);
        const startIndex = keys.indexOf("Multicast");
        // NOTE: Vanessa's Tripwire doesn't include Multicast at all. In this scenario, SellPrice is what I need to use.
        // Maybe the rule should be that items which don't have CooldownMax won't have MultiCast.
        // const sellPriceIndex = keys.lastIndexOf("SellPrice");

        // const startIndex = Math.max(multicastIndex, sellPriceIndex);

        if (startIndex === -1) {
            return [];
        }

        // Start iterating after "Multicast"
        for (let i = startIndex + 1; i < keys.length; i++) {
            const key = keys[i];

            // Ignore "Custom" prefixed items
            if (key.startsWith("Custom")) {
                continue;
            }

            // Use regex to capture the prefix based on capitalization
            const prefixMatch = key.match(/^[a-z]+|^[A-Z][a-z]*/);
            if (prefixMatch) {
                const ability = prefixMatch[0];
                // Add to abilities array only if it's not already included
                if (!abilities.includes(ability)) {
                    abilities.push(ability);
                }
            }
        }

        return abilities;
    }

    const cardItems = filteredCardItems.map((entry: TCardItem) => {
        const tierAttributes: Record<TierType, any> = {
            Bronze: {},
            Silver: {},
            Gold: {},
            Diamond: {},
        };

        let accumulatedAttributes = {};

        for (const tier of tierOrder) {
            const currentTier = entry.Tiers[tier];
            if (currentTier && currentTier.Attributes) {
                const currentAttributes = currentTier.Attributes;

                accumulatedAttributes = {
                    ...accumulatedAttributes,
                    ...currentAttributes,
                };

                tierAttributes[tier] = { ...accumulatedAttributes };
            } else {
                tierAttributes[tier] = { ...accumulatedAttributes };
            }
        }

        const startingTier = entry.StartingTier as
            | "Bronze"
            | "Silver"
            | "Gold"
            | "Diamond";
        let hiddenTags = entry.HiddenTags;

        // TODO: Why can this be empty?
        let startingTierAttributes = tierAttributes[startingTier];

        const extractedAbilities = startingTierAttributes
            ? extractAbilities(startingTierAttributes)
            : [];

        if (entry.Localization.Title.Text === "DJ Rob0t") {
            debugger;
        }

        // There are localization entries which aren't used - filter out the unused entries rather than relying on localization as a single source of truth
        const abilityLocalizationKeys = Object.values(entry.Abilities).map(
            ({ TranslationKey }) => TranslationKey,
        );

        // Sadly, there are also duplicate keys! Need to take just the last instance when duplicates exist.
        // Create a Map to store only the last occurrence of each Content.Key
        const uniqueTooltips = new Map<string, { text: string }>();

        // Loop through Tooltips in reverse to ensure only the last occurrence is stored
        for (let i = entry.Localization.Tooltips.length - 1; i >= 0; i--) {
            const tooltip = entry.Localization.Tooltips[i];
            const key = tooltip.Content.Key;

            // Only add to the Map if the key is in abilityLocalizationKeys and hasn't been added yet
            if (
                abilityLocalizationKeys.includes(key) &&
                !uniqueTooltips.has(key)
            ) {
                uniqueTooltips.set(key, { text: tooltip.Content.Text });
            }
        }

        const rawAbilities = Array.from(uniqueTooltips.entries())
            .filter(([key]) => abilityLocalizationKeys.includes(key))
            .sort(
                (a, b) =>
                    abilityLocalizationKeys.indexOf(a[0]) -
                    abilityLocalizationKeys.indexOf(b[0]),
            )
            .map(([, value]) => value);

        const convertMillisecondsToSeconds = (text: string) => {
            return text.replace(/(\d+)\s*seconds/g, (_, milliseconds) => {
                // Convert milliseconds to seconds
                const seconds = parseInt(milliseconds, 10) / 1000;
                return `${seconds} seconds`;
            });
        };

        const getAttributeByAbility = (
            ability: string,
            suffix: string,
        ): string => {
            // Determine attribute name based on tag and suffix
            let attribute = "";

            if (
                ability === "Burn" ||
                ability === "Shield" ||
                ability == "Poison"
            ) {
                attribute = `${ability}Apply${suffix}`;
            } else if (ability === "AmmoReference") {
                attribute = `Reload${suffix}`;
            } else {
                attribute = `${ability}${suffix}`;
            }

            return attribute;
        };

        const formattedAbilities = rawAbilities.map((ability) => {
            let modifiedText = ability.text;

            let customOffset = 0;

            for (let abilityIndex = 0; abilityIndex < 5; abilityIndex++) {
                // Define both potential placeholders
                const placeholders = [
                    {
                        placeholder: `{ability.${abilityIndex}}`,
                        suffix: "Amount",
                    },
                    {
                        placeholder: `{ability.${abilityIndex}.targets}`,
                        suffix: "Targets",
                    },
                ];

                // Iterate over each placeholder to replace them if found
                placeholders.forEach(({ placeholder, suffix }) => {
                    if (modifiedText?.includes(placeholder)) {
                        let ability = extractedAbilities[abilityIndex];
                        let attribute = getAttributeByAbility(ability, suffix);

                        // Retrieve the value from the tier attributes
                        let tierAttribute = tierAttributes[startingTier];
                        let value = tierAttribute
                            ? tierAttribute[attribute]
                            : undefined;

                        // Fall back to custom attribute lookup if needed
                        if (value === undefined) {
                            value = tierAttribute
                                ? tierAttribute[`Custom_${customOffset}`]
                                : undefined;

                            if (value !== undefined) {
                                customOffset += 1;
                            }
                        }

                        // If falling back to custom attribute failed, but there was some attribute to use, fall back to using it.
                        // This seems like an especially egregious issue in the quality of the input data, but it is what it is.
                        // Should track when this occurs because it could lead to quality issues in the app.
                        if (value === undefined) {
                            let ability =
                                extractedAbilities[
                                    extractedAbilities.length - 1
                                ];
                            let attribute = getAttributeByAbility(
                                ability,
                                suffix,
                            );
                            value = tierAttribute
                                ? tierAttribute[attribute]
                                : undefined;
                        }

                        // Replace the placeholder in the modified text if the value exists
                        if (value !== undefined) {
                            modifiedText = modifiedText.replace(
                                placeholder,
                                value,
                            );
                        }
                    }
                });
            }

            // TODO: not sure max auras
            for (let auraIndex = 0; auraIndex < 10; auraIndex++) {
                const placeholder = `{aura.${auraIndex}}`;

                if (modifiedText?.includes(placeholder)) {
                    let attribute =
                        entry.Auras[auraIndex].Action.Value.AttributeType;

                    let tierAttribute = tierAttributes[startingTier];

                    let value = tierAttribute
                        ? tierAttribute[attribute]
                        : undefined;

                    // Replace the placeholder in the modified text if the value exists
                    if (value !== undefined) {
                        modifiedText = modifiedText.replace(placeholder, value);
                    }
                }
            }

            // Apply convertMillisecondsToSeconds only once to the final modified text
            if (modifiedText !== ability.text) {
                ability.text = convertMillisecondsToSeconds(modifiedText);
            }

            return ability;
        });

        return {
            name: entry.Localization.Title.Text,
            abilities: formattedAbilities,
            startingTier: entry.StartingTier,
            tiers: tierAttributes,
            tags: entry.Tags,
            hiddenTags,
            heroes: entry.Heroes,
        };
    });

    // Set of predefined hero names for the filter
    const heroOptions = ["Vanessa", "Dooley", "Pygmalien"];
    let selectedHero = "Dooley"; // Holds the current hero filter selection

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
            <!-- <div>Heroes: {entry.heroes.join(", ")}</div> -->
            <div>Tags: {entry.tags.join(", ")}</div>
            <div>Hidden Tags: {entry.hiddenTags.join(", ")}</div>
            <div>Starting Tier: {entry.startingTier}</div>
            <div>
                <ul>
                    {#each entry.abilities as ability}
                        <li>{ability.text}</li>
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
