<script lang="ts">
    import type { ClientSideCardSkill, ClientSideTierType } from "$lib/types";
    import { Card } from "flowbite-svelte";
    import CardBadges from "./CardBadges.svelte";
    import { filterTags } from "$lib/utils/filterUtils";

    const {
        card,
        tier,
    }: { card: ClientSideCardSkill; tier: ClientSideTierType } = $props();

    const tags = $derived(filterTags(card.tags, card.hiddenTags));
</script>

<div class="p-4 border border-gray-200 rounded-lg shadow-sm">
    <div class="font-bold text-2xl mb-2">
        {card.name}
    </div>

    <CardBadges primaryBadges={tags.map((text) => ({ text }))} />

    <Card size="xl" class="mt-4">
        <div
            class="text-lg font-semibold mb-2"
            class:text-tiers-bronze={tier === "Bronze"}
            class:text-tiers-silver={tier === "Silver"}
            class:text-tiers-gold={tier === "Gold"}
            class:text-tiers-diamond={tier === "Diamond"}
        >
            {tier}
        </div>

        <div class="mb-2">
            {#each card.tiers[tier].attributes as attribute}
                <div>
                    <span class="font-medium">{attribute.name}:</span>
                    {attribute.value}
                    {attribute.valueDescriptor}
                </div>
            {/each}

            {#each card.tiers[tier].tooltips as tooltip}
                <div>
                    {tooltip}
                </div>
            {/each}
        </div>
    </Card>
</div>
