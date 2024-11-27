<script lang="ts">
    import type { ClientSideSkillCard } from "$lib/types";
    import { copyCardLink } from "$lib/stores/clipboard";
    import { Card } from "flowbite-svelte";
    import { filterTags } from "$lib/utils/filterUtils";
    import CardBadges from "./CardBadges.svelte";
    import UnifiedTooltips from "./UnifiedTooltips.svelte";
    import CardImage from "./CardImage.svelte";
    import CardCombatEncounters from "./CardCombatEncounters.svelte";

    const { card }: { card: ClientSideSkillCard } = $props();

    const id = $derived(card.name.replace(/\s+/g, "_"));
    const tags = $derived(filterTags(card.tags, card.hiddenTags));
</script>

<Card
    padding="none"
    size="xl"
    class={`w-full relative border-2 text-gray-900 dark:bg-bazaar-background dark:text-bazaar-tan700 dark:border-bazaar-orange`}
    {id}
>
    <CardImage name={card.name} type="skills" size={card.size} />

    <div class="flex flex-col gap-2 p-4 relative">
        <div class="font-bold text-2xl">
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
    </div>
</Card>
