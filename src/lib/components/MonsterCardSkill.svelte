<script lang="ts">
    import type { ClientSideSkillCard, TierType } from "$lib/types";
    import { Card } from "flowbite-svelte";
    import CardBadges from "./CardBadges.svelte";
    import { filterTags } from "$lib/utils/filterUtils";
    import CardImage from "./CardImage.svelte";
    import Divider from "./Divider.svelte";

    const {
        card,
        tierType,
    }: { card: ClientSideSkillCard; tierType: TierType } = $props();

    const tags = $derived(filterTags(card.tags, card.hiddenTags));
</script>

<Card
    padding="none"
    class={`text-gray-900 border-2 dark:text-white dark:bg-bazaar-background dark:text-bazaar-tan700 border-tiers-${tierType.toLowerCase()}-400 dark:border-tiers-${tierType.toLowerCase()}-400`}
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

        <Divider />

        {#each card.tiers[tierType].tooltips as tooltip}
            <div>
                {tooltip}
            </div>
        {/each}
    </div>
</Card>
