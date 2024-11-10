<script lang="ts">
    import type { ClientSideCardItem, ClientSideTierType } from "$lib/types";
    import { filterTags } from "$lib/utils/filterUtils";
    import { Card } from "flowbite-svelte";

    const {
        card,
        tier,
        enchantmentName,
    }: {
        card: ClientSideCardItem;
        tier: ClientSideTierType;
        enchantmentName: string | undefined;
    } = $props();

    const enchantment = $derived(
        card.enchantments.find(
            (enchantment) => enchantment.name === enchantmentName,
        ),
    );
</script>

<div class="p-4 border border-gray-200 rounded-lg shadow-sm">
    <div class="font-bold text-2xl mb-2">
        {card.name}
    </div>

    <div class="flex mb-1 gap-4">
        <span class="font-semibold w-24 text-right whitespace-nowrap">Size</span
        >
        <span>{card.size}</span>
    </div>

    <div class="flex mb-1 gap-4">
        <span class="font-semibold w-24 text-right whitespace-nowrap">Tags</span
        >
        <span>{filterTags(card.tags, card.hiddenTags).join(", ")}</span>
    </div>

    <Card size="xl">
        <div class="text-lg font-semibold mb-2">
            {tier}
        </div>

        <div class="mb-2">
            {#each card.tiers[tier].attributes as attribute}
                <div>
                    <span class="font-medium">{attribute.name}</span>
                    {attribute.value}
                    {attribute.valueDescriptor}
                </div>
            {/each}
        </div>

        {#each card.tiers[tier].tooltips as tooltip}
            <div>
                {tooltip}
            </div>
        {/each}

        {#if enchantment}
            <Card size="xl">
                <div class="text-lg font-semibold mb-2">
                    {enchantment.name}
                </div>
                {#each enchantment.tooltips as tooltip}
                    <div>{tooltip}</div>
                {/each}
            </Card>
        {/if}
    </Card>
</div>
