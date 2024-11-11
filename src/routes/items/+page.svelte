<script lang="ts">
    import type { ClientSideCard, ClientSideCardItem } from "$lib/types";
    import CardItem from "$lib/components/CardItem.svelte";
    import CardFilters from "$lib/components/CardFilters.svelte";
    import {
        filterItemAndSkillCards,
        prepareItemAndSkillFilterOptions,
    } from "$lib/utils/filterUtils";

    const { data }: { data: { cards: ClientSideCard[] } } = $props();
    const cardItems = data.cards
        .filter((card): card is ClientSideCardItem => card.type === "Item")
        .sort((a, b) => a.name.localeCompare(b.name));

    const { heroOptions, minimumTierOptions, tagOptions, sizeOptions } =
        prepareItemAndSkillFilterOptions(cardItems);

    let selectedHeroes = $state([] as string[]);
    let selectedTiers = $state([] as string[]);
    let selectedTags = $state([] as string[]);
    let mustMatchAllTags = $state(false);
    let selectedSizes = $state([] as string[]);
    let searchText = $state("");
    let isSearchNameOnly = $state(false);

    const filteredCards = $derived(
        filterItemAndSkillCards(
            cardItems,
            selectedHeroes,
            selectedTiers,
            selectedTags,
            selectedSizes,
            searchText,
            isSearchNameOnly,
            mustMatchAllTags,
        ),
    );

    let itemsToDisplay = $state(10);
    const visibleCards = $derived(filteredCards.slice(0, itemsToDisplay));

    let loadMoreTrigger: HTMLDivElement | null = null; // Reference for the intersection observer

    // Intersection Observer for lazy loading
    $effect(() => {
        if (!loadMoreTrigger) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        itemsToDisplay += 10;
                    }
                });
            },
            { rootMargin: "400px" },
        );

        observer.observe(loadMoreTrigger);

        // Cleanup observer on component destroy
        return () => observer.disconnect();
    });
</script>

<CardFilters
    {heroOptions}
    {minimumTierOptions}
    {tagOptions}
    {sizeOptions}
    bind:selectedHeroes
    bind:selectedTiers
    bind:selectedTags
    bind:selectedSizes
    bind:mustMatchAllTags
    bind:searchText
    bind:isSearchNameOnly
/>

<div class="space-y-4">
    <div class="text-lg">
        {#if visibleCards.length === 0}
            No Items Found. Check Your Search.
        {:else}
            {filteredCards.length} Item{filteredCards.length === 1 ? "" : "s"} Found
        {/if}
    </div>

    {#each visibleCards as card}
        <CardItem {card} />
    {/each}
</div>

<div bind:this={loadMoreTrigger} class="h-1"></div>
