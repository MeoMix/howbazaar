<script lang="ts">
    import type { ClientSideCardItem } from "$lib/types";
    import { copyCardLink } from "$lib/stores/clipboard";
    import type { Entries } from "type-fest";
    import { Card } from "flowbite-svelte";
    import { filterTags } from "$lib/utils/filterUtils";
    import CardBadges from "./CardBadges.svelte";

    const { card }: { card: ClientSideCardItem } = $props();

    const id = $derived(card.name.replace(/\s+/g, "_"));
    const tags = $derived(filterTags(card.tags, card.hiddenTags));

    const tiers = $derived(
        (Object.entries(card.tiers) as Entries<typeof card.tiers>).filter(
            ([tierType, tier]) =>
                (card.startingTier === "Legendary" &&
                    tier.tooltips.length > 0 &&
                    tierType === "Legendary") ||
                (card.startingTier !== "Legendary" &&
                    tier.tooltips.length > 0 &&
                    tierType !== "Legendary"),
        ),
    );
</script>

<div class="p-4 border border-gray-200 rounded-lg shadow-sm" {id}>
    <div class="font-bold text-2xl mb-2">
        {card.name}
        <button onclick={() => copyCardLink(id)} title="Copy link to this item">
            🔗
        </button>
    </div>

    <CardBadges
        primaryBadges={[
            {
                text: `${card.startingTier}+`,
                color: card.startingTier.toLowerCase(),
            },
            ...[...card.heroes, card.size].map((text) => ({ text })),
        ]}
        secondaryBadges={tags.map((text) => ({ text }))}
    />

    <div class="font-semibold text-xl mt-4 mb-2">Tiers</div>

    <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
        {#each tiers as [tierType, tier]}
            <Card size="xl" padding="sm">
                <div
                    class={`text-lg font-semibold mb-2 text-tiers-${tierType.toLowerCase()}`}
                >
                    {tierType}
                </div>

                {#each tier.tooltips as tooltip}
                    <div>
                        {tooltip}
                    </div>
                {/each}
            </Card>
        {/each}
    </div>

    {#if card.enchantments.length > 0}
        <div class="font-semibold text-xl mt-4 mb-2">Enchantments</div>
        <div
            class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4"
        >
            {#each card.enchantments as enchantment}
                <Card size="xl" padding="sm">
                    <div
                        class={`text-lg font-semibold mb-2 text-enchantments-${enchantment.name.toLowerCase()}`}
                    >
                        {enchantment.name}
                    </div>

                    {#each enchantment.tooltips as tooltip}
                        <div>{tooltip}</div>
                    {/each}
                </Card>
            {/each}
        </div>
    {/if}
</div>
