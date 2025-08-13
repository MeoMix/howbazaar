<script lang="ts">
    import type { ClientSideItemCard } from "$lib/types";
    import Divider from "./Divider.svelte";
    import MerchantCardImage from "./MerchantCardImage.svelte";
    import CardBadges from "./CardBadges.svelte";
    import { tooltip } from "$lib/actions/tooltip.svelte";
    import UnifiedTooltips from "./UnifiedTooltips.svelte";
    import { filterTags } from "$lib/utils/filterUtils";
    // import {
    //     getExpansionPackName,
    //     isExpansionPack,
    // } from "$lib/utils/cardUtils";

    const {
        card,
    }: {
        card: ClientSideItemCard;
    } = $props();

    const tags = $derived(
        filterTags(card.tags, card.hiddenTags, card.customTags),
    );

    const primaryBadges = $derived([
        {
            text: `${card.startingTier}${card.startingTier === "Legendary" ? "" : "+"}`,
            color: card.startingTier.toLowerCase(),
            showIcon: false,
        },
        ...[
            ...card.heroes,
            card.size,
            // ...(isExpansionPack(card.packId)
            //     ? [getExpansionPackName(card.packId)]
            //     : []),
        ].map((text) => ({
            text,
            showIcon: false,
        })),
    ]);

    const secondaryBadges = $derived(
        tags.map((text) => ({ text, showIcon: true })),
    );
</script>

<div
    class={`rounded-lg h-full relative text-gray-900 border dark:bg-bazaar-background dark:text-bazaar-tan700 dark:border-bazaar-orange`}
    use:tooltip={{ item: card }}
>
    <MerchantCardImage
        name={card.name}
        id={card.id}
        type="items"
        size={card.size}
    />

    <div class="flex flex-col px-0 pb-4 py-2 relative">
        <div class="px-4 flex flex-col gap-2 relative">
            <div class="font-bold text-lg md:text-xl">
                {card.name}
            </div>
            <CardBadges {primaryBadges} {secondaryBadges} />
            <Divider />
        </div>
        <div
            class={`col-start-1 row-start-2 col-span-2 md:col-span-1 px-4 pb-4`}
        >
            <UnifiedTooltips
                unifiedTooltips={card.unifiedTooltips}
                startingTier={card.startingTier}
            />
        </div>
    </div>
</div>
