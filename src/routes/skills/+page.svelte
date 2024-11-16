<script lang="ts">
    import type {
        ClientSideCard,
        ClientSideCardSkill,
        ClientSideHero,
        ClientSideHiddenTag,
        ClientSideSize,
        ClientSideTag,
        ClientSideTierType,
    } from "$lib/types";
    import CardSkill from "$lib/components/CardSkill.svelte";
    import {
        filterItemAndSkillCards,
        prepareItemAndSkillFilterOptions,
    } from "$lib/utils/filterUtils";
    import CardFilters from "$lib/components/CardFilters.svelte";
    import LazyLoadList from "$lib/components/LazyLoadList.svelte";

    const { data }: { data: { cards: ClientSideCard[] } } = $props();
    const cardSkills = data.cards
        .filter((card): card is ClientSideCardSkill => card.type === "Skill")
        .sort((a, b) => a.name.localeCompare(b.name));

    const { heroOptions, minimumTierOptions, tagOptions } =
        prepareItemAndSkillFilterOptions(cardSkills);

    let selectedHeroes = $state([] as ClientSideHero[]);
    let selectedTiers = $state([] as ClientSideTierType[]);
    let selectedTags = $state([] as (ClientSideTag | ClientSideHiddenTag)[]);
    let mustMatchAllTags = $state(false);
    // TODO: It's weird this has to declare selectedSizes when it doesn't filter on it
    let selectedSizes = $state([] as ClientSideSize[]);
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
</script>

<svelte:head>
    <title>Skills · How Bazaar</title>
</svelte:head>

<CardFilters
    {heroOptions}
    {minimumTierOptions}
    {tagOptions}
    bind:selectedHeroes
    bind:selectedTiers
    bind:selectedTags
    bind:selectedSizes
    bind:mustMatchAllTags
    bind:searchText
    bind:isSearchNameOnly
/>

{#snippet listItem(card: ClientSideCardSkill)}
    <CardSkill {card} />
{/snippet}

<LazyLoadList items={filteredCards} {listItem} listItemName="skill" />
