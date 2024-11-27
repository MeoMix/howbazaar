<script lang="ts">
    import type {
        ClientSideItemCard,
        TierType,
        EnchantmentType,
    } from "$lib/types";
    import { filterTags } from "$lib/utils/filterUtils";
    import { Card } from "flowbite-svelte";
    import CardBadges from "./CardBadges.svelte";
    import CardImage from "./CardImage.svelte";

    const {
        card,
        tierType,
        enchantmentType,
    }: {
        card: ClientSideItemCard;
        tierType: TierType;
        enchantmentType: EnchantmentType | undefined;
    } = $props();

    const enchantment = $derived(
        card.enchantments.find(
            (enchantment) => enchantment.type === enchantmentType,
        ),
    );

    const tags = $derived(filterTags(card.tags, card.hiddenTags));
</script>

<Card
    padding="none"
    class={`relative text-gray-900 border-2 dark:bg-bazaar-background dark:text-bazaar-tan700 border-tiers-${tierType.toLowerCase()}-400 dark:border-tiers-${tierType.toLowerCase()}-400`}
>
    <CardImage name={card.name} type="items" size={card.size} />

    <div class="flex flex-col gap-2 p-4 relative">
        <div class="font-bold text-2xl">
            {#if enchantment}
                <span
                    class={`text-enchantments-${enchantment.type.toLowerCase()}`}
                >
                    {enchantment.type}
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
