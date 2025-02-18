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
    import { fetchJson } from "$lib/utils/fetchUtils";
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
    } = $props();

    let selectedSortOption = $state("name" as SkillSortOptions);
    let isLoading = $state(false);
    let hasError = $state(false);
    let skills = $state([] as ClientSideSkillCard[]);
    let version = $state(null as string | null);

    onMount(async () => {
        skillsStore.subscribe((store) => {
            // If the server informs us that what's written to the store is stale - don't use it.
            if (serverVersion === store.version) {
                skills = store.skills;
                version = store.version;
            }
        })();

        if (skills.length === 0 || !version) {
            try {
                isLoading = true;
                const response = await fetchJson<ClientSideSkillCard[]>(
                    "/api/skills",
                    serverVersion,
                );
                skillsStore.set({
                    skills: response.data,
                    version: response.version,
                });
                skills = response.data;
                version = response.version;
            } catch (error) {
                console.error(error);
                hasError = true;
            } finally {
                isLoading = false;
            }
        }
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
{:else}
    <LazyLoadList
        items={filteredSkills}
        {listItem}
        {headerControls}
        listItemName="skill"
    />
{/if}
