<script lang="ts">
    import type {
        ClientSideCard,
        ClientSideCardItem,
        ClientSideHero,
        ClientSideHiddenTag,
        ClientSideSize,
        ClientSideTag,
        ClientSideTierType,
        TriState,
    } from "$lib/types";
    import CardItem from "$lib/components/CardItem.svelte";
    import CardItemFilters from "$lib/components/CardItemFilters.svelte";
    import {
        filterItemCards,
        getCardFilterOptions,
    } from "$lib/utils/filterUtils";
    import LazyLoadList from "$lib/components/LazyLoadList.svelte";

    const { data }: { data: { cards: ClientSideCard[] } } = $props();
    const cardItems = data.cards
        .filter((card): card is ClientSideCardItem => card.type === "Item")
        .sort((a, b) => a.name.localeCompare(b.name));

    const { heroOptions, minimumTierOptions, tagOptions, sizeOptions } =
        getCardFilterOptions(cardItems);

    let selectedHeroes = $state([] as ClientSideHero[]);
    let selectedTiers = $state([] as ClientSideTierType[]);

    // Generate tagStates with default "unset" value
    let tagStates = $state(
        Object.fromEntries(
            tagOptions.map((tagOption) => [
                tagOption.value,
                "unset" as TriState,
            ]),
        ) as Record<ClientSideTag | ClientSideHiddenTag, TriState>,
    );

    let isMatchAnyTags = $state(false);
    let selectedSizes = $state([] as ClientSideSize[]);
    let searchText = $state("");
    let isSearchNameOnly = $state(false);
    let isSearchEnchantments = $state(false);

    const filteredCards = $derived(
        filterItemCards(
            cardItems,
            selectedHeroes,
            selectedTiers,
            tagStates,
            selectedSizes,
            searchText,
            isSearchNameOnly,
            isSearchEnchantments,
            isMatchAnyTags,
        ),
    );
</script>

<svelte:head>
    <title>Items · How Bazaar</title>
</svelte:head>

<CardItemFilters
    {heroOptions}
    {minimumTierOptions}
    {tagOptions}
    {sizeOptions}
    bind:selectedHeroes
    bind:selectedTiers
    bind:tagStates
    bind:selectedSizes
    bind:isMatchAnyTags
    bind:searchText
    bind:isSearchNameOnly
    bind:isSearchEnchantments
/>

{#snippet listItem(card: ClientSideCardItem)}
    <CardItem {card} />
{/snippet}

<LazyLoadList items={filteredCards} {listItem} listItemName="item" />
