<script lang="ts">
    import type { ClientSideCard, ClientSideCardItem } from "$lib/types";
    import CardItem from "$lib/components/CardItem.svelte";
    import CardFilters from "$lib/components/CardFilters.svelte";
    import { filterItemAndSkillCards, prepareItemAndSkillFilterOptions } from "$lib/utils/filterUtils";

    const { data }: { data: { cards: ClientSideCard[] } } = $props();
    const cardItems = data.cards
        .filter((card): card is ClientSideCardItem => card.type === "Item")
        .sort((a, b) => a.name.localeCompare(b.name));

    const {
        heroOptions,
        minimumTierOptions,
        tagOptions,
        hiddenTagOptions,
        sizeOptions,
    } = prepareItemAndSkillFilterOptions(cardItems);

    let selectedHeroes = $state([] as string[]);
    let selectedTiers = $state([] as string[]);
    let selectedTags = $state([] as string[]);
    let selectedHiddenTags = $state([] as string[]);
    let selectedSizes = $state([] as string[]);

    const filteredCards = $derived(
        filterItemAndSkillCards(
            cardItems,
            selectedHeroes,
            selectedTiers,
            selectedTags,
            selectedHiddenTags,
            selectedSizes,
        ),
    );
</script>

<CardFilters
    {heroOptions}
    {minimumTierOptions}
    {tagOptions}
    {hiddenTagOptions}
    {sizeOptions}
    bind:selectedHeroes
    bind:selectedTiers
    bind:selectedTags
    bind:selectedHiddenTags
    bind:selectedSizes
/>

<div class="space-y-4">
    {#each filteredCards as card}
        <CardItem {card} />
    {/each}
</div>
