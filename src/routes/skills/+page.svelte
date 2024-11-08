<script lang="ts">
    import type { ClientSideCard, ClientSideCardSkill } from "$lib/types";
    import CardSkill from "$lib/components/CardSkill.svelte";
    import { filterCards, prepareFilterOptions } from "$lib/utils/filterUtils";
    import CardFilters from "$lib/components/CardFilters.svelte";

    const { data }: { data: { cards: ClientSideCard[] } } = $props();
    const cardSkills = data.cards.filter(
        (card): card is ClientSideCardSkill => card.type === "Skill",
    );

    const { 
        heroOptions, 
        minimumTierOptions, 
        tagOptions,
        hiddenTagOptions
    } = prepareFilterOptions(cardSkills);

    let selectedHeroes = $state([] as string[]);
    let selectedTiers = $state([] as string[]);
    let selectedTags = $state([] as string[]);
    let selectedHiddenTags = $state([] as string[]);

    const filteredCards = $derived(
        filterCards(
            cardSkills,
            selectedHeroes,
            selectedTiers,
            selectedTags,
            selectedHiddenTags,
        ),
    );

</script>

<CardFilters
    {heroOptions}
    {minimumTierOptions}
    {tagOptions}
    {hiddenTagOptions}
    bind:selectedHeroes
    bind:selectedTiers
    bind:selectedTags
    bind:selectedHiddenTags
/>

<div class="space-y-4">
    {#each filteredCards as card}
        <CardSkill {card} />
    {/each}
</div>
