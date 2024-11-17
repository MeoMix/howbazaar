<script lang="ts">
    import type { ClientSideCardSkill } from "$lib/types";
    import { copyCardLink } from "$lib/stores/clipboard";
    import type { Entries } from "type-fest";
    import { Card } from "flowbite-svelte";
    import { filterTags } from "$lib/utils/filterUtils";
    import CardBadges from "./CardBadges.svelte";

    const { card }: { card: ClientSideCardSkill } = $props();

    const id = $derived(card.name.replace(/\s+/g, "_"));
    const tags = $derived(filterTags(card.tags, card.hiddenTags));
</script>

<div class="p-4 border border-gray-200 rounded-lg shadow-sm" {id}>
    <div class="font-bold text-2xl mb-2">
        {card.name}
        <button
            onclick={() => copyCardLink(id)}
            title="Copy link to this skill"
        >
            🔗
        </button>
    </div>

    <CardBadges
        primaryBadges={card.heroes.map((text) => ({ text }))}
        secondaryBadges={tags.map((text) => ({ text }))}
    />

    <div class="font-semibold text-xl mt-4 mb-2">Tiers</div>
    <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
        {#each (Object.entries(card.tiers) as Entries<typeof card.tiers>).filter(([tierType, tier]) => tierType !== "Legendary" && tier.tooltips.length > 0) as [tierType, tier]}
            <Card size="xl" padding="sm">
                <div
                    class={`text-lg font-semibold mb-2 text-tiers-${tierType.toLowerCase()}`}
                >
                    {tierType}
                </div>

                <div class="mb-2">
                    {#each tier.attributes as attribute}
                        <div>
                            <span class="font-medium">{attribute.name}:</span>
                            {attribute.value}
                            {attribute.valueDescriptor}
                        </div>
                    {/each}

                    {#each tier.tooltips as tooltip}
                        <div>
                            {tooltip}
                        </div>
                    {/each}
                </div>
            </Card>
        {/each}
    </div>
</div>
