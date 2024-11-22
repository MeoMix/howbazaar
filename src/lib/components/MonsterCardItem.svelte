<script lang="ts">
    import type {
        ClientSideCardItem,
        ClientSideTierType,
        ClientSideEnchantmentType,
    } from "$lib/types";
    import { filterTags } from "$lib/utils/filterUtils";
    import { Card } from "flowbite-svelte";
    import CardBadges from "./CardBadges.svelte";
    import CardImage from "./CardImage.svelte";

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
</script>

<Card
    padding="none"
    class={`relative text-black border-2 dark:text-white border-tiers-${tierType.toLowerCase()} dark:border-tiers-${tierType.toLowerCase()}`}
>
    <CardImage name={card.name} type="items" size={card.size} />

    <div class="flex flex-col gap-2 p-4 relative">
        <div class="font-bold text-2xl">
            {#if enchantment}
                <span
                    class={`text-enchantments-${enchantment.name.toLowerCase()}`}
                >
                    {enchantment.name}
                </span>
            {/if}
            {card.name}
        </div>

        <CardBadges
            primaryBadges={[
                { text: tierType, color: tierType.toLowerCase() },
                { text: card.size },
            ]}
            secondaryBadges={tags.map((text) => ({ text }))}
        />

        {#each card.tiers[tierType].tooltips as tooltip}
            <div>
                {tooltip}
            </div>
        {/each}

        {#if enchantment}
            {#each enchantment.tooltips as tooltip}
                <div>{tooltip}</div>
            {/each}
        {/if}
    </div>
</Card>
