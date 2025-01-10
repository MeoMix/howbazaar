<script lang="ts">
    import type {
        ClientSideItemCard,
        TierType,
        EnchantmentType,
    } from "$lib/types";
    import { Card } from "flowbite-svelte";
    import Divider from "./Divider.svelte";
    import MonsterCardImage from "./MonsterCardImage.svelte";

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
</script>

<Card
    padding="none"
    class={`h-full relative text-gray-900 border-2 dark:bg-bazaar-background dark:text-bazaar-tan700 border-tiers-${tierType.toLowerCase()}-400 dark:border-tiers-${tierType.toLowerCase()}-400`}
>
    <MonsterCardImage name={card.name} type="items" size={card.size} />

    <div class="flex flex-col px-4 pb-4 py-2 relative">
        <div class="font-bold text-lg md:text-xl">
            {#if enchantment}
                <span
                    class={`text-enchantments-${enchantment.type.toLowerCase()}`}
                >
                    {enchantment.type}
                </span>
            {/if}
            {card.name}
        </div>

        <Divider />

        {#each card.tiers[tierType].tooltips as tooltip}
            <div class="text-sm md:text-base">
                {tooltip}
            </div>
        {/each}

        {#if enchantment}
            {#each enchantment.tooltips as tooltip}
                <div class="text-sm md:text-base">{tooltip}</div>
            {/each}
        {/if}
    </div>
</Card>
