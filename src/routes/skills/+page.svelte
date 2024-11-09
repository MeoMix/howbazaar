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

    const { heroOptions, minimumTierOptions, tagOptions, hiddenTagOptions } =
        prepareItemAndSkillFilterOptions(cardSkills);

    const sizeOptions: string[] = [];

    let selectedHeroes = $state([] as string[]);
    let selectedTiers = $state([] as string[]);
    let selectedTags = $state([] as string[]);
    let selectedHiddenTags = $state([] as string[]);
    let selectedSizes = $state([] as string[]);

    const filteredCards = $derived(
        filterItemAndSkillCards(
            cardSkills,
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
        <CardSkill {card} />
    {/each}
</div>
