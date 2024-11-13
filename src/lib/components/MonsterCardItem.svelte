<script lang="ts">
    import type {
        ClientSideCardItem,
        ClientSideTierType,
        ClientSideEnchantmentType,
    } from "$lib/types";
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
        enchantmentName: ClientSideEnchantmentType | undefined;
    } = $props();

    const enchantment = $derived(
        card.enchantments.find(
            (enchantment) => enchantment.name === enchantmentName,
        ),
    );

    const tags = $derived(filterTags(card.tags, card.hiddenTags));

    const columnSpanClass = $derived(
        {
            Small: "col-span-1",
            Medium: "col-span-2",
            Large: "col-span-3",
        }[card.size],
    );
</script>

<div class="p-4 border border-gray-200 rounded-lg shadow-sm ${columnSpanClass}">
    <div class="font-bold text-2xl mb-2">
        {card.name}
    </div>

    <!-- TODO: consider deriving blob URL from env variable instead of hardcoding -->
    <img
        src={`https://viluukiao9kyljph.public.blob.vercel-storage.com/images/${card.name.replace(/[\s&']+/g, "")}.webp`}
        alt={card.name}
        class="mb-2 h-[200px]"
        width={card.size === "Small" ? 100 : card.size === "Medium" ? 200 : 300}
        loading="lazy"
    />

    <CardBadges
        primaryBadges={[card.size].map((text) => ({ text }))}
        secondaryBadges={tags.map((text) => ({ text }))}
    />

    <Card size="xl" padding="sm" class="mt-4">
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
            <Card size="xl" padding="sm" class="mt-4">
                <div
                    class="text-lg font-semibold mb-2 {getEnchantmentClass(
                        enchantment.name,
                    )}"
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
