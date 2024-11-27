<script lang="ts">
    import type { ClientSideItemCard } from "$lib/types";
    import { copyCardLink } from "$lib/stores/clipboard";
    import { Card } from "flowbite-svelte";
    import { filterTags } from "$lib/utils/filterUtils";
    import CardBadges from "./CardBadges.svelte";
    import UnifiedTooltips from "./UnifiedTooltips.svelte";
    import CardImage from "./CardImage.svelte";
    import CardCombatEncounters from "./CardCombatEncounters.svelte";

    const { card }: { card: ClientSideItemCard } = $props();

    const id = $derived(card.name.replace(/\s+/g, "_"));
    const tags = $derived(filterTags(card.tags, card.hiddenTags));
</script>

<Card
    padding="none"
    size="xl"
    class={`relative border-2 text-gray-900 dark:bg-bazaar-background dark:text-bazaar-tan700 dark:border-bazaar-orange`}
    {id}
>
    <CardImage name={card.name} type="items" size={card.size} />

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

        {#if card.combatEncounters.length > 0}
            <CardCombatEncounters combatEncounters={card.combatEncounters} />
        {/if}

        <div
            class="h-[1px] my-4 bg-gradient-to-r from-transparent via-gray-200 dark:via-bazaar-orange to-transparent"
        ></div>

        <UnifiedTooltips
            unifiedTooltips={card.unifiedTooltips}
            startingTier={card.startingTier}
        />

        {#if card.enchantments.length > 0}
            <div
                class="h-[1px] my-4 bg-gradient-to-r from-transparent via-gray-200 dark:via-bazaar-orange to-transparent"
            ></div>

            <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {#each card.enchantments as enchantment}
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
