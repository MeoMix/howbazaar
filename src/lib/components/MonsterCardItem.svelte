<script lang="ts">
    import type {
        ClientSideItemCard,
        TierType,
        EnchantmentType,
    } from "$lib/types";
    import Divider from "./Divider.svelte";
    import MonsterCardImage from "./MonsterCardImage.svelte";
    import CardBadges from "./CardBadges.svelte";
    import { tooltip } from "$lib/actions/tooltip.svelte";
    import UnifiedTooltip from "./UnifiedTooltip.svelte";

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

<div
    class={`rounded-lg h-full relative text-gray-900 border dark:bg-bazaar-background dark:text-bazaar-tan700 border-tiers-${tierType.toLowerCase()}-400 dark:border-tiers-${tierType.toLowerCase()}-400`}
    use:tooltip={{ item: card }}
>
    <MonsterCardImage
        name={card.name}
        id={card.id}
        type="items"
        size={card.size}
    />

    <div class="flex flex-col px-4 pb-4 py-2 relative">
        <div class="flex flex-col gap-2 relative">
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
            <CardBadges
                primaryBadges={[
                    {
                        text: tierType,
                        color: tierType.toLowerCase(),
                        showIcon: false,
                    },
                    ...card.tags.map((text) => ({ text, showIcon: true })),
                ]}
            />

            <Divider />
        </div>

        {#each card.tiers[tierType].tooltips as tooltip}
            <div class="text-sm md:text-base">
                <UnifiedTooltip {tooltip} startingTier={card.startingTier} />
            </div>
        {/each}

        {#if enchantment}
            {#each enchantment.tooltips as tooltip}
                <div class="text-sm md:text-base">
                    <UnifiedTooltip
                        {tooltip}
                        startingTier={card.startingTier}
                    />
                </div>
            {/each}
        {/if}
    </div>
</div>
