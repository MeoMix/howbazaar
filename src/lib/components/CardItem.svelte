<script lang="ts">
    import type { ClientSideCardItem } from "$lib/types";
    import { copyCardLink } from "$lib/stores/clipboard";
    import { Card } from "flowbite-svelte";
    import { filterTags } from "$lib/utils/filterUtils";
    import CardBadges from "./CardBadges.svelte";
    import UnifiedTooltips from "./UnifiedTooltips.svelte";

    const { card }: { card: ClientSideCardItem } = $props();

    const id = $derived(card.name.replace(/\s+/g, "_"));
    const tags = $derived(filterTags(card.tags, card.hiddenTags));
    // TODO: Filter this out server-side at some point. Just didn't want to invalidate the cache for a minor change.
    const filteredEnchantments = $derived(
        card.enchantments.filter(
            (enchantment) =>
                !(
                    enchantment.name === "Radiant" &&
                    enchantment.tooltips[0]?.includes("This cannot be Frozen")
                ),
        ),
    );
</script>

<Card
    padding="none"
    size="xl"
    class={`relative border-2 text-gray-900 dark:bg-bazaar-background dark:text-bazaar-tan700 dark:border-bazaar-orange`}
    {id}
>
    <div class="flex flex-col gap-2 p-4 relative">
        <div class="font-bold text-2xl">
            {card.name}
            <button
                onclick={() => copyCardLink(id)}
                title="Copy link to this item"
            >
                🔗
            </button>
        </div>

        <CardBadges
            primaryBadges={[
                {
                    text: `${card.startingTier}${card.startingTier === "Legendary" ? "" : "+"}`,
                    color: card.startingTier.toLowerCase(),
                },
                ...[...card.heroes, card.size].map((text) => ({ text })),
            ]}
            secondaryBadges={tags.map((text) => ({ text }))}
        />

        <div
            class="h-[1px] my-4 bg-gradient-to-r from-transparent via-gray-200 dark:via-bazaar-orange to-transparent"
        ></div>

        <UnifiedTooltips
            unifiedTooltips={card.unifiedTooltips}
            startingTier={card.startingTier}
        />

        {#if filteredEnchantments.length > 0}
            <div
                class="h-[1px] my-4 bg-gradient-to-r from-transparent via-gray-200 dark:via-bazaar-orange to-transparent"
            ></div>

            <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {#each filteredEnchantments as enchantment}
                    <div>
                        <div
                            class={`text-lg font-semibold text-enchantments-${enchantment.name.toLowerCase()}`}
                        >
                            {enchantment.name}
                        </div>

                        {#each enchantment.tooltips as tooltip}
                            <div>{tooltip}</div>
                        {/each}
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</Card>
