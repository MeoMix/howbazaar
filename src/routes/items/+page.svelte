<script lang="ts">
    import type { ClientSideCard, ClientSideCardItem, ClientSideHero, ClientSideHiddenTag, ClientSideSize, ClientSideTag, ClientSideTierType } from "$lib/types";
    import CardItem from "$lib/components/CardItem.svelte";
    import CardFilters from "$lib/components/CardFilters.svelte";
    import {
        filterItemAndSkillCards,
        prepareItemAndSkillFilterOptions,
    } from "$lib/utils/filterUtils";
    import LazyLoadList from "$lib/components/LazyLoadList.svelte";

    const { data }: { data: { cards: ClientSideCard[] } } = $props();
    const cardItems = data.cards
        .filter((card): card is ClientSideCardItem => card.type === "Item")
        .sort((a, b) => a.name.localeCompare(b.name));

    const { heroOptions, minimumTierOptions, tagOptions, sizeOptions } =
        prepareItemAndSkillFilterOptions(cardItems);

    let selectedHeroes = $state([] as ClientSideHero[]);
    let selectedTiers = $state([] as ClientSideTierType[]);
    let selectedTags = $state([] as (ClientSideTag | ClientSideHiddenTag)[]);
    let mustMatchAllTags = $state(false);
    let selectedSizes = $state([] as ClientSideSize[]);
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

{#snippet listItem(card: ClientSideCardItem)}
    <CardItem {card} />
{/snippet}

<LazyLoadList items={filteredCards} {listItem} emptyMessage="No items found." />
