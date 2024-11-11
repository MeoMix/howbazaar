<script lang="ts">
    import type { ClientSideCardItem, ClientSideTierType, EnchantmentType } from "$lib/types";
    import { filterTags } from "$lib/utils/filterUtils";
    import { Card } from "flowbite-svelte";
    import CardBadges from "./CardBadges.svelte";
    import { getEnchantmentClass, getTierClass } from "$lib/utils/classUtils";

    const {
        card,
        tierType,
        enchantmentName,
    }: {
        card: ClientSideCardItem;
        tierType: ClientSideTierType;
        enchantmentName: EnchantmentType | undefined;
    } = $props();

    const enchantment = $derived(
        card.enchantments.find(
            (enchantment) => enchantment.name === enchantmentName,
        ),
    );

    const tags = $derived(filterTags(card.tags, card.hiddenTags));
</script>

<div class="p-4 border border-gray-200 rounded-lg shadow-sm">
    <div class="font-bold text-2xl mb-2">
        {card.name}
    </div>

    <CardBadges
        primaryBadges={[card.size].map((text) => ({ text }))}
        secondaryBadges={tags.map((text) => ({ text }))}
    />

    <Card size="xl" class="mt-4">
        <div class="text-lg font-semibold mb-2 {getTierClass(tierType)}">
            {tierType}
        </div>

        <div class="mb-2">
            {#each card.tiers[tierType].attributes as attribute}
                <div>
                    <span class="font-medium">{attribute.name}</span>
                    {attribute.value}
                    {attribute.valueDescriptor}
                </div>
            {/each}
        </div>

        {#each card.tiers[tierType].tooltips as tooltip}
            <div>
                {tooltip}
            </div>
        {/each}

        {#if enchantment}
            <Card size="xl" class="mt-4">
                <div
                    class="text-lg font-semibold mb-2 {getEnchantmentClass(enchantment.name)}"
                >
                    {enchantment.name}
                </div>

                {#each enchantment.tooltips as tooltip}
                    <div>{tooltip}</div>
                {/each}
            </Card>
        {/if}
    </Card>
</div>
