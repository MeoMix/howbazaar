<script lang="ts">
    import type { ClientSideCardSkill, ClientSideTierType } from "$lib/types";
    import { Card } from "flowbite-svelte";
    import CardBadges from "./CardBadges.svelte";
    import { filterTags } from "$lib/utils/filterUtils";
    import { getTierClass } from "$lib/utils/classUtils";

    const {
        card,
        tierType,
    }: { card: ClientSideCardSkill; tierType: ClientSideTierType } = $props();

    const tags = $derived(filterTags(card.tags, card.hiddenTags));
</script>

<div class="p-4 border border-gray-200 rounded-lg shadow-sm">
    <div class="font-bold text-2xl mb-2">
        {card.name}
    </div>

    <CardBadges primaryBadges={tags.map((text) => ({ text }))} />

    <Card size="xl" class="mt-4">
        <div class="text-lg font-semibold mb-2 {getTierClass(tierType)}">
            {tierType}
        </div>

        <div class="mb-2">
            {#each card.tiers[tierType].attributes as attribute}
                <div>
                    <span class="font-medium">{attribute.name}:</span>
                    {attribute.value}
                    {attribute.valueDescriptor}
                </div>
            {/each}

            {#each card.tiers[tierType].tooltips as tooltip}
                <div>
                    {tooltip}
                </div>
            {/each}
        </div>
    </Card>
</div>
