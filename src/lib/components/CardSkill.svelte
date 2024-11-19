<script lang="ts">
    import type { ClientSideCardSkill } from "$lib/types";
    import { copyCardLink } from "$lib/stores/clipboard";
    import type { Entries } from "type-fest";
    import { Card } from "flowbite-svelte";
    import { filterTags } from "$lib/utils/filterUtils";
    import CardBadges from "./CardBadges.svelte";
    import UnifiedTooltips from "./UnifiedTooltips.svelte";

    const { card }: { card: ClientSideCardSkill } = $props();

    const id = $derived(card.name.replace(/\s+/g, "_"));
    const tags = $derived(filterTags(card.tags, card.hiddenTags));
</script>

<div class="p-4 border border-gray-200 rounded-lg shadow-sm" {id}>
    <div class="font-bold text-2xl mb-2">
        {card.name}
        <button
            onclick={() => copyCardLink(id)}
            title="Copy link to this skill"
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

    <div class="font-semibold text-xl mt-4 mb-2">Description</div>

    <UnifiedTooltips
        unifiedTooltips={card.unifiedTooltips}
        startingTier={card.startingTier}
    />
</div>
