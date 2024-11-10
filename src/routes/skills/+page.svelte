<script lang="ts">
    import type { ClientSideCard, ClientSideCardSkill } from "$lib/types";
    import CardSkill from "$lib/components/CardSkill.svelte";
    import {
        filterItemAndSkillCards,
        prepareItemAndSkillFilterOptions,
    } from "$lib/utils/filterUtils";
    import CardFilters from "$lib/components/CardFilters.svelte";
    import { onMount, tick } from "svelte";
    import { Button, Input, Label } from "flowbite-svelte";

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
    let includeTitle = $state(false);
    let includeNonEnchantmentText = $state(false);
    let includeEnchantmentText = $state(false);

    const filteredCards = $derived(
        filterItemAndSkillCards(
            cardSkills,
            selectedHeroes,
            selectedTiers,
            selectedTags,
            selectedSizes,
            searchText,
            includeTitle,
            includeNonEnchantmentText,
            includeEnchantmentText,
            mustMatchAllTags,
        ),
    );

    let itemsToDisplay = $state(20); // Start with 20 items
    const visibleCards = $derived(filteredCards.slice(0, itemsToDisplay));

    let loadMoreTrigger: HTMLDivElement | null = null; // Reference for the intersection observer

    // Intersection Observer for lazy loading
    $effect(() => {
        if (!loadMoreTrigger) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        itemsToDisplay += 20; // Load 20 more items
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
            includeTitle = true;
            searchText = hash.replace("_", " ");

            // Wait until Svelte has updated the DOM
            await tick();

            // Then scroll into view
            document
                .getElementById(hash)
                ?.scrollIntoView({ behavior: "instant" });
        }
    });
</script>

<!-- TODO: merge this with CardFilters? -->
<div class="mb-4">
    <Label class="font-semibold text-lg mb-2">Search</Label>

    <Input type="text" placeholder="Search skills..." bind:value={searchText} />

    <div class="flex gap-2 mt-2">
        <Button
            size="xs"
            outline={!includeTitle}
            pill
            color={includeTitle ? "primary" : "light"}
            on:click={() => (includeTitle = !includeTitle)}
            class="transition-colors focus:outline-none border-2"
        >
            Include Title
        </Button>
        <Button
            size="xs"
            outline={!includeNonEnchantmentText}
            pill
            color={includeNonEnchantmentText ? "primary" : "light"}
            on:click={() =>
                (includeNonEnchantmentText = !includeNonEnchantmentText)}
            class="transition-colors focus:outline-none border-2"
        >
            Include Text
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

<div class="space-y-4">
    <div class="text-lg">
        {#if visibleCards.length === 0}
            No Skills Found. Check Your Search.
        {:else}
            {filteredCards.length} Skill{filteredCards.length === 1 ? "" : "s"} Found
        {/if}
    </div>

    {#each visibleCards as card}
        <CardSkill {card} />
    {/each}
</div>

<div bind:this={loadMoreTrigger} class="h-1"></div>
