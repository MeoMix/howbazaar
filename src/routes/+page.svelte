<script lang="ts">
    import data from "$lib/v2_Cards.json";

    type TierType = "Bronze" | "Silver" | "Gold" | "Diamond";

    type Tier = {
        Attributes: any;
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
        return cardItem.SpawningEligibility !== "Never";
    }

    const tierOrder = ["Bronze", "Silver", "Gold", "Diamond"] as const;

    const filteredEntries = Object.values(data).filter(
        isTCardItem,
    ) as TCardItem[];

    const filteredCardItems = filteredEntries.filter(isSpawningEligibleCard);

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

        // There are localization entries which aren't used - filter out the unused entries rather than relying on localization as a single source of truth
        const abilityLocalizationKeys = Object.values(entry.Abilities).map(
            ({ TranslationKey }) => TranslationKey,
        );

        const rawAbilities = entry.Localization.Tooltips.filter((entry) =>
            abilityLocalizationKeys.includes(entry.Content.Key),
        ).map((tooltip) => ({
            text: tooltip.Content.Text,
        }));

        const convertMillisecondsToSeconds = (text: string) => {
            return text.replace(/(\d+)\s*seconds/g, (_, milliseconds) => {
                // Convert milliseconds to seconds
                const seconds = parseInt(milliseconds, 10) / 1000;
                return `${seconds} seconds`;
            });
        };

        const formattedAbilities = rawAbilities.map((ability) => {
            let modifiedText = ability.text;

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
                        let tag = hiddenTags[abilityIndex];

                        // Determine attribute name based on tag and suffix
                        let attribute = "";
                        if (
                            tag === "Burn" ||
                            tag === "Shield" ||
                            tag == "Poison"
                        ) {
                            attribute = `${tag}Apply${suffix}`;
                        } else if (tag === "AmmoReference") {
                            attribute = `Reload${suffix}`;
                        } else {
                            attribute = `${tag}${suffix}`;
                        }

                        // Retrieve the value from the tier attributes
                        let tierAttribute = tierAttributes[startingTier];
                        let value = tierAttribute
                            ? tierAttribute[attribute]
                            : undefined;

                        // Fall back to custom attribute lookup if needed
                        if (value === undefined) {
                            value = tierAttribute
                                ? tierAttribute[`Custom_${abilityIndex}`]
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
    let selectedHero = "Vanessa"; // Holds the current hero filter selection

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
