<script lang="ts">
    import data from "$lib/v2_Cards.json";

    type Tier = {
        // TODO: maybe tighten Attributes down but there would be a lot and very dynamic
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
            Tooltips: Array<{ Content: { Text: string } }>;
        };
        StartingTier: string;
        Tags: string[];
        HiddenTags: string[];
        Heroes: string[];
    }

    interface TCardEncounterStep {
        $type: "TCardEncounterStep";
        // Other properties specific to TCardEncounterStep
    }

    type Entry = TCardItem | TCardEncounterStep;

    // TODO: change this from 'any' to Entry
    function isTCardItem(entry: any): entry is TCardItem {
        return entry.$type === "TCardItem" && "Tiers" in entry;
    }

    const tierOrder = ["Bronze", "Silver", "Gold", "Diamond"] as const;

    // TODO: weird that I have to cast here
    const filteredEntries = Object.values(data).filter(isTCardItem) as TCardItem[];
    
    const entries = filteredEntries
        .map((entry: TCardItem) => {
            // Result object to store attributes for each tier
            const tierAttributes = {
                Bronze: {},
                Silver: {},
                Gold: {},
                Diamond: {},
            };

            // Initialize a base object for cumulative attributes
            let accumulatedAttributes = {};

            for (const tier of tierOrder) {
                // Check if the tier exists in entry.Tiers
                const currentTier = entry.Tiers[tier];
                if (currentTier && currentTier.Attributes) {
                    const currentAttributes = currentTier.Attributes;

                    // Use spread to copy accumulatedAttributes and override with current tier attributes
                    accumulatedAttributes = {
                        ...accumulatedAttributes,
                        ...currentAttributes,
                    };

                    // Save the accumulated result for this tier
                    tierAttributes[tier] = { ...accumulatedAttributes };
                } else {
                    // If the tier is missing, use the accumulated attributes up to this point
                    tierAttributes[tier] = { ...accumulatedAttributes };
                }
            }

            return {
                name: entry.Localization.Title.Text,
                abilities: entry.Localization.Tooltips.map((tooltip) => ({
                    text: tooltip.Content.Text,
                })),
                startingTier: entry.StartingTier,
                tiers: tierAttributes,
                tags: entry.Tags,
                hiddenTags: entry.HiddenTags,
                heroes: entry.Heroes,
            };
        });
</script>

<h1>Hello, World! Welcome to How Bazaar!</h1>

<ul>
    {#each entries as entry}
        <li>
            <div>
                {entry.name}
            </div>
            <div>Heroes: {entry.heroes.join(", ")}</div>
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
