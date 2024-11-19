<script lang="ts">
    import type { ClientSideCardSkill, ClientSideTierType } from "$lib/types";
    import { Card } from "flowbite-svelte";
    import CardBadges from "./CardBadges.svelte";
    import { filterTags } from "$lib/utils/filterUtils";
    import { removeSpecialCharacters } from "$lib/utils/stringUtils";

    const {
        card,
        tierType,
    }: { card: ClientSideCardSkill; tierType: ClientSideTierType } = $props();

    const sanitizedCardName = $derived(removeSpecialCharacters(card.name));

    const tags = $derived(filterTags(card.tags, card.hiddenTags));
</script>

<Card
    padding="none"
    class={`text-black border-2 dark:text-white border-tiers-${tierType.toLowerCase()} dark:border-tiers-${tierType.toLowerCase()}`}
>
    <div class="relative overflow-hidden rounded-t-md">
        <div
            class="absolute inset-0 bg-cover bg-center blur-xl brightness-50"
            style={`background-image: url('/images/skills/${sanitizedCardName}.avif');`}
        ></div>

        <img
            src={`/images/skills/${sanitizedCardName}.avif`}
            alt={card.name}
            class="relative h-[200px] mx-auto"
            width={card.size === "Small"
                ? 100
                : card.size === "Medium"
                  ? 200
                  : 300}
        />
    </div>

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
