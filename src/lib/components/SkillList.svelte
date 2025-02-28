<script lang="ts">
    import type {
        ClientSideSkillCard,
        Hero,
        HiddenTag,
        SkillSortOptions,
        Tag,
        TierType,
        TriState,
    } from "$lib/types";
    import { Label } from "flowbite-svelte";
    import CardSkill from "./CardSkill.svelte";
    import LazyLoadList from "./LazyLoadList.svelte";
    import Select from "./Select.svelte";
    import { filterSkillCards, sortCards } from "$lib/utils/filterUtils";
    import { onMount } from "svelte";
    import { skillsStore } from "$lib/stores/skillsStore";

    let {
        serverVersion,
        sortOptions,
        heroStates,
        selectedTiers,
        tagStates,
        searchText,
        isMatchAnyTag,
        isMatchAnyHero,
        isMonsterDropsOnly,
        isHiddenWhenEmpty,
        initialLoad = true,
    }: {
        serverVersion: string;
        sortOptions: { name: string; value: SkillSortOptions }[];
        heroStates: Record<Hero, TriState>;
        selectedTiers: TierType[];
        tagStates: Record<Tag | HiddenTag, TriState>;
        searchText: string;
        isMatchAnyTag: boolean;
        isMatchAnyHero: boolean;
        isMonsterDropsOnly: boolean;
        isHiddenWhenEmpty: boolean;
        initialLoad?: boolean;
    } = $props();

    let selectedSortOption = $state("name" as SkillSortOptions);
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
        sortCards(
            filterSkillCards(
                skills,
                heroStates,
                selectedTiers,
                tagStates,
                searchText,
                isMatchAnyTag,
                isMatchAnyHero,
                isMonsterDropsOnly,
            ),
            selectedSortOption,
        ),
    );
</script>

{#snippet listItem(card: ClientSideSkillCard)}
    <CardSkill {card} />
{/snippet}

{#snippet headerControls()}
    <div class="flex items-center space-x-2">
        <Label class="dark:text-bazaar-tan700">Sort by</Label>
        <Select
            options={sortOptions}
            selectedOption={selectedSortOption}
            onSelectOption={(option) => {
                selectedSortOption = option;
            }}
        />
    </div>
{/snippet}

{#if isLoading}
    <div>Loading skills...</div>
{:else if filteredSkills.length > 0 || !isHiddenWhenEmpty}
    <LazyLoadList
        items={filteredSkills}
        {listItem}
        {headerControls}
        listItemName="skill"
        {initialLoad}
    />
{/if}
