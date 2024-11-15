<script lang="ts">
    import type { ClientSideCardSkill, ClientSideTierType } from "$lib/types";
    import { Card } from "flowbite-svelte";
    import CardBadges from "./CardBadges.svelte";
    import { filterTags } from "$lib/utils/filterUtils";
    import { getTierClass } from "$lib/utils/classUtils";
    import { removeSpecialCharacters } from "$lib/utils/stringUtils";

    const {
        card,
        tierType,
    }: { card: ClientSideCardSkill; tierType: ClientSideTierType } = $props();

    const sanitizedCardName = $derived(removeSpecialCharacters(card.name));

    const tags = $derived(filterTags(card.tags, card.hiddenTags));
</script>

<div class="p-4 border border-gray-200 rounded-lg shadow-sm">
    <div class="font-bold text-2xl mb-2">
        {card.name}
    </div>

    <img
        src={`/images/skills/${sanitizedCardName}.avif`}
        alt={card.name}
        class="mb-2 h-[200px]"
        width={200}
        loading="lazy"
    />

    <CardBadges primaryBadges={tags.map((text) => ({ text }))} />

    <Card size="xl" padding="sm" class="mt-4">
        <div class="text-lg font-semibold mb-2 {getTierClass(tierType)}">
            {tierType}
        </div>

        <div class="mb-2">
            {#each card.tiers[tierType].attributes as attribute}
                <div>
                    <span class="font-medium">{attribute.name}:</span>
                    {attribute.value}
                    {attribute.valueDescriptor}
                </div>
            {/each}

            {#each card.tiers[tierType].tooltips as tooltip}
                <div>
                    {tooltip}
                </div>
            {/each}
        </div>
    </Card>
</div>
