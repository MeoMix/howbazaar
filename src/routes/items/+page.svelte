<script lang="ts">
    import type { ClientSideCard, ClientSideCardItem } from "$lib/types";
    import CardItem from "$lib/components/CardItem.svelte";
    import CardFilters from "$lib/components/CardFilters.svelte";
    import {
        filterItemAndSkillCards,
        prepareItemAndSkillFilterOptions,
    } from "$lib/utils/filterUtils";
    import { Button, Input, Label } from "flowbite-svelte";
    import { onMount, tick } from "svelte";

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

    onMount(async () => {
        const hash = window.location.hash.slice(1);
        if (hash) {
            isSearchNameOnly = true;
            searchText = hash.replace("_", " ");

            // Wait until Svelte has updated the DOM
            await tick();

            // Then scroll into view
            document
                .getElementById(hash)
                ?.scrollIntoView({ behavior: "instant" });
        }
    });

    function clearSearch() {
        selectedHeroes = [];
        selectedTiers = [];
        selectedTags = [];
        mustMatchAllTags = false;
        selectedSizes = [];
        searchText = "";
        isSearchNameOnly = false;
    }
</script>

<!-- TODO: merge this with CardFilters? -->
<div class="mb-4">
    <Label class="font-semibold text-lg mb-2">Search</Label>

    <Input type="text" placeholder="Search items..." bind:value={searchText} />

    <div class="flex gap-2 mt-2">
        <Button
            size="xs"
            outline={!isSearchNameOnly}
            pill
            color={isSearchNameOnly ? "primary" : "light"}
            on:click={() => (isSearchNameOnly = !isSearchNameOnly)}
            class="transition-colors focus:outline-none border-2"
        >
            Name Only
        </Button>
    </div>
</div>

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
/>

<Button class="mb-4" outline on:click={clearSearch}>Clear Search</Button>

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
