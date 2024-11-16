<script lang="ts">
    import type {
        ClientSideCard,
        ClientSideCardSkill,
        ClientSideHero,
        ClientSideHiddenTag,
        ClientSideTag,
        ClientSideTierType,
        TriState,
    } from "$lib/types";
    import CardSkill from "$lib/components/CardSkill.svelte";
    import {
        filterSkillCards,
        getCardFilterOptions,
    } from "$lib/utils/filterUtils";
    import CardSkillFilters from "$lib/components/CardSkillFilters.svelte";
    import LazyLoadList from "$lib/components/LazyLoadList.svelte";

    const { data }: { data: { cards: ClientSideCard[] } } = $props();
    const cardSkills = data.cards
        .filter((card): card is ClientSideCardSkill => card.type === "Skill")
        .sort((a, b) => a.name.localeCompare(b.name));

    const { heroOptions, minimumTierOptions, tagOptions } =
        getCardFilterOptions(cardSkills);

    let heroStates = $state(
        Object.fromEntries(
            heroOptions.map((heroOption) => [
                heroOption.value,
                "unset" as TriState,
            ]),
        ) as Record<ClientSideHero, TriState>,
    );

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
    let isMatchAnyTag = $state(false);
    let isMatchAnyHero = $state(false);
    let searchText = $state("");
    let isSearchNameOnly = $state(false);

    const filteredCards = $derived(
        filterSkillCards(
            cardSkills,
            heroStates,
            selectedTiers,
            tagStates,
            searchText,
            isSearchNameOnly,
            isMatchAnyTag,
            isMatchAnyHero
        ),
    );
</script>

<svelte:head>
    <title>Skills · How Bazaar</title>
</svelte:head>

<CardSkillFilters
    {heroOptions}
    {minimumTierOptions}
    {tagOptions}
    bind:heroStates
    bind:selectedTiers
    bind:tagStates
    bind:isMatchAnyTag
    bind:isMatchAnyHero
    bind:searchText
    bind:isSearchNameOnly
/>

{#snippet listItem(card: ClientSideCardSkill)}
    <CardSkill {card} />
{/snippet}

<LazyLoadList items={filteredCards} {listItem} listItemName="skill" />
