<script lang="ts">
    import type { ClientSideCard, ClientSideCardSkill } from "$lib/types";
    import CardSkill from "$lib/components/CardSkill.svelte";
    import {
        filterItemAndSkillCards,
        prepareItemAndSkillFilterOptions,
    } from "$lib/utils/filterUtils";
    import CardFilters from "$lib/components/CardFilters.svelte";

    const { data }: { data: { cards: ClientSideCard[] } } = $props();
    const cardSkills = data.cards
        .filter((card): card is ClientSideCardSkill => card.type === "Skill")
        .sort((a, b) => a.name.localeCompare(b.name));

    const { heroOptions, minimumTierOptions, tagOptions } =
        prepareItemAndSkillFilterOptions(cardSkills);

    const sizeOptions: string[] = [];

    let selectedHeroes = $state([] as string[]);
    let selectedTiers = $state([] as string[]);
    let selectedTags = $state([] as string[]);
    let mustMatchAllTags = $state(false);
    let selectedSizes = $state([] as string[]);
    let searchText = $state("");
    let isSearchNameOnly = $state(false);

    const filteredCards = $derived(
        filterItemAndSkillCards(
            cardSkills,
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
            No Skills Found. Check Your Search.
        {/if}
    </div>

    {#each visibleCards as card}
        <CardSkill {card} />
    {/each}
</div>

<div bind:this={loadMoreTrigger} class="h-1"></div>
