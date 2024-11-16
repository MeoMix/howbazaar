<script lang="ts">
    import type {
        ClientSideCard,
        ClientSideCardSkill,
        ClientSideHero,
        ClientSideHiddenTag,
        ClientSideSize,
        ClientSideTag,
        ClientSideTierType,
        TriState,
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
    // TODO: It's weird this has to declare selectedSizes when it doesn't filter on it
    let selectedSizes = $state([] as ClientSideSize[]);
    let searchText = $state("");
    let isSearchNameOnly = $state(false);
    // TODO: It's weird this has to declare isSearchEnchantments when skills don't have enchantments
    let isSearchEnchantments = $state(false);

    const filteredCards = $derived(
        filterItemAndSkillCards(
            cardSkills,
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
    <title>Skills · How Bazaar</title>
</svelte:head>

<CardFilters
    {heroOptions}
    {minimumTierOptions}
    {tagOptions}
    searchPlaceholder="Search skills..."
    bind:selectedHeroes
    bind:selectedTiers
    bind:tagStates
    bind:selectedSizes
    bind:isMatchAnyTags
    bind:searchText
    bind:isSearchNameOnly
    bind:isSearchEnchantments
/>

{#snippet listItem(card: ClientSideCardSkill)}
    <CardSkill {card} />
{/snippet}

<LazyLoadList items={filteredCards} {listItem} listItemName="skill" />
