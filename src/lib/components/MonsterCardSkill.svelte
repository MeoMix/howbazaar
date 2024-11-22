<script lang="ts">
    import type { ClientSideCardSkill, ClientSideTierType } from "$lib/types";
    import { Card } from "flowbite-svelte";
    import CardBadges from "./CardBadges.svelte";
    import { filterTags } from "$lib/utils/filterUtils";
    import CardImage from "./CardImage.svelte";

    const {
        card,
        tierType,
    }: { card: ClientSideCardSkill; tierType: ClientSideTierType } = $props();

    const tags = $derived(filterTags(card.tags, card.hiddenTags));
</script>

<Card
    padding="none"
    class={`text-black border-2 dark:text-white border-tiers-${tierType.toLowerCase()} dark:border-tiers-${tierType.toLowerCase()}`}
>
    <CardImage name={card.name} type="skills" size={card.size} />

    <div class="flex flex-col gap-2 p-4 relative">
        <div class="font-bold text-2xl">
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
    </div>
</Card>
