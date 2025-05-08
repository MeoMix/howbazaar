<script lang="ts">
    import type {
        ClientSideSkillCard,
        Hero,
        HiddenTag,
        SkillSearchLocationOption,
        SkillSortOption,
        Tag,
        TierType,
        TriState,
    } from "$lib/types";
    import { Label } from "flowbite-svelte";
    import CardSkill from "./CardSkill.svelte";
    import LazyLoadList from "./LazyLoadList.svelte";
    import Select from "./Select.svelte";
    import {
        filterSkillCards,
        searchCards,
        sortCards,
    } from "$lib/utils/filterUtils";
    import { onMount } from "svelte";
    import { skillsStore } from "$lib/stores/skillsStore";

    let {
        serverVersion,
        sortOptions,
        heroStates,
        selectedTiers,
        tagStates,
        searchText,
        selectedSearchLocationOption,
        isMatchAnyTag,
        isMatchAnyHero,
        monsterDropsOnlyState,
        isHiddenWhenEmpty,
        initialLoad = true,
    }: {
        serverVersion: string;
        sortOptions: { name: string; value: SkillSortOption }[];
        heroStates: Record<Hero, TriState>;
        selectedTiers: TierType[];
        tagStates: Record<Tag | HiddenTag, TriState>;
        searchText: string;
        selectedSearchLocationOption: SkillSearchLocationOption;
        isMatchAnyTag: boolean;
        isMatchAnyHero: boolean;
        monsterDropsOnlyState: TriState;
        isHiddenWhenEmpty: boolean;
        initialLoad?: boolean;
    } = $props();

    let selectedSortOption = $state("name" as SkillSortOption);
    let isLoading = $state(false);
    let hasError = $state(false);
    let skills = $state([] as ClientSideSkillCard[]);

    onMount(() => {
        const unsubscribe = skillsStore.subscribe((state) => {
            skills = state.skills;
            isLoading = state.isLoading;
            hasError = state.hasError;
        });

        skillsStore.load(serverVersion); // Ensures we fetch fresh data if needed

        return unsubscribe;
    });

    const filteredSkills = $derived(
        filterSkillCards(
            skills,
            heroStates,
            selectedTiers,
            tagStates,
            isMatchAnyTag,
            isMatchAnyHero,
            monsterDropsOnlyState,
        ),
    );

    const searchedSkills = $derived(
        searchCards(filteredSkills, searchText, selectedSearchLocationOption),
    );

    const sortedSkills = $derived(
        sortCards(searchedSkills, selectedSortOption, searchText),
    );
</script>

{#if isLoading}
    <div>Loading skills...</div>
{:else if sortedSkills.length > 0 || !isHiddenWhenEmpty}
    <LazyLoadList
        items={sortedSkills}
        listItemName="skill"
        listClasses="space-y-4"
        {initialLoad}
    >
        {#snippet listItem(card: ClientSideSkillCard)}
            <CardSkill {card} />
        {/snippet}

        {#snippet headerControls()}
            <div class="flex items-center space-x-2">
                <Label class="dark:text-bazaar-tan700 text-nowrap"
                    >Sort by</Label
                >
                <Select
                    options={sortOptions}
                    selectedOption={selectedSortOption}
                    onSelectOption={(option) => {
                        selectedSortOption = option;
                    }}
                />
            </div>
        {/snippet}
    </LazyLoadList>
{/if}
