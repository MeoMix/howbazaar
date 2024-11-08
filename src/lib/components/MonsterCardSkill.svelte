<script lang="ts">
    import type { ClientSideCardSkill, ClientSideTierType } from "$lib/types";
    import { Card } from "flowbite-svelte";

    export let card: ClientSideCardSkill;
    export let tier: ClientSideTierType;
</script>

<div class="p-4 border border-gray-200 rounded-lg shadow-sm">
    <div class="font-bold text-2xl mb-2">
        {card.name}
    </div>

    <div class="flex mb-1 gap-4">
        <span class="font-semibold w-24 text-right">Tags</span>
        <span>{card.tags.join(", ")}</span>
    </div>

    <div class="flex mb-1 gap-4">
        <span class="font-semibold w-24 text-right">Hidden Tags</span>
        <span>{card.hiddenTags.join(", ")}</span>
    </div>

    <Card size="xl">
        <div class="text-lg font-semibold mb-2">
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
