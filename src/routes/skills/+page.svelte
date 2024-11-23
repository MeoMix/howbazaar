<script lang="ts">
    import type {
        ClientSideCardSkill,
        ClientSideHero,
        ClientSideHiddenTag,
        ClientSideTag,
        ClientSideTierType,
        TriState,
    } from "$lib/types";
    import CardSkill from "$lib/components/CardSkill.svelte";
    import { filterSkillCards } from "$lib/utils/filterUtils";
    import CardSkillFilters from "$lib/components/CardSkillFilters.svelte";
    import LazyLoadList from "$lib/components/LazyLoadList.svelte";
    import { onMount } from "svelte";
    import { fetchJson } from "$lib/utils/fetchUtils";
    import type { PageData } from "./$types";
    import { skillsStore } from "$lib/stores/skillsStore";

    const { data }: { data: PageData } = $props();

    let isLoading = $state(false);
    let hasError = $state(false);
    let cardSkills = $state([] as ClientSideCardSkill[]);
    let version = $state(null as string | null);

    onMount(async () => {
        skillsStore.subscribe((store) => {
            // If the server informs us that what's written to the store is stale - don't use it.
            if (data.version === store.version) {
                cardSkills = store.skills;
                version = store.version;
            }
        })();

        if (cardSkills.length === 0 || !version) {
            try {
                isLoading = true;
                const response = await fetchJson<ClientSideCardSkill[]>(
                    "/api/skills",
                    data.version,
                );
                skillsStore.set({
                    skills: response.data,
                    version: response.version,
                });
                cardSkills = response.data;
                version = response.version;
            } catch (error) {
                console.error(error);
                hasError = true;
            } finally {
                isLoading = false;
            }
        }
    });

    let heroStates = $state(
        Object.fromEntries(
            data.heroOptions.map(({ value }) => [value, "unset"]),
        ) as Record<ClientSideHero, TriState>,
    );

    let tagStates = $state(
        Object.fromEntries(
            data.tagOptions.map(({ value }) => [value, "unset"]),
        ) as Record<ClientSideTag | ClientSideHiddenTag, TriState>,
    );

    let selectedTiers = $state([] as ClientSideTierType[]);
    let isMatchAnyTag = $state(false);
    let isMatchAnyHero = $state(false);
    let searchText = $state("");
    let isSearchNameOnly = $state(false);

    const filteredCards = $derived(
        heroStates && tagStates
            ? filterSkillCards(
                  cardSkills,
                  heroStates,
                  selectedTiers,
                  tagStates,
                  searchText,
                  isSearchNameOnly,
                  isMatchAnyTag,
                  isMatchAnyHero,
              )
            : [],
    );
</script>

<svelte:head>
    <title>Skills · How Bazaar</title>
</svelte:head>

<CardSkillFilters
    heroOptions={data.heroOptions}
    minimumTierOptions={data.minimumTierOptions}
    tagOptions={data.tagOptions}
    bind:heroStates
    bind:selectedTiers
    bind:tagStates
    bind:isMatchAnyTag
    bind:isMatchAnyHero
    bind:searchText
    bind:isSearchNameOnly
/>

<div class="mx-auto w-full max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg">
    {#if isLoading}
        <div>Loading skills...</div>
    {:else}
        {#snippet listItem(card: ClientSideCardSkill)}
            <CardSkill {card} />
        {/snippet}

        <LazyLoadList items={filteredCards} {listItem} listItemName="skill" />
    {/if}
</div>
