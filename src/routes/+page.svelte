<script lang="ts">
    import AllFilters from "$lib/components/AllFilters.svelte";
    import ItemList from "$lib/components/ItemList.svelte";
    import MonsterList from "$lib/components/MonsterList.svelte";
    import SkillList from "$lib/components/SkillList.svelte";
    import type {
        Hero,
        HiddenTag,
        ItemSortOptions,
        Size,
        SkillSortOptions,
        Tag,
        TierType,
        TriState,
    } from "$lib/types";
    import type { PageData } from "./$types";

    const { data }: { data: PageData } = $props();

    let selectedTiers = $state([] as TierType[]);
    let tagStates = $state(
        Object.fromEntries(
            data.tagOptions.map(({ value }) => [value, "unset"]),
        ) as Record<Tag | HiddenTag, TriState>,
    );

    let heroStates = $state(
        Object.fromEntries(
            data.heroOptions.map(({ value }) => [value, "unset"]),
        ) as Record<Hero, TriState>,
    );

    let selectedHeroes = $derived(
        Object.entries(heroStates)
            .filter(([_, state]) => state === "on") // Keep only heroes where the state is "on"
            .map(([hero]) => hero as Hero), // Extract the hero name
    );

    let isMatchAnyTag = $state(false);
    let isMatchAnyHero = $state(false);
    let selectedSizes = $state([] as Size[]);
    let searchText = $state("");
    let isSearchEnchantments = $state(false);
    let isMonsterDropsOnly = $state(false);

    let itemSortOptions: { name: string; value: ItemSortOptions }[] = [
        {
            value: "name",
            name: "Name",
        },
        {
            value: "tier",
            name: "Tier",
        },
        {
            value: "size",
            name: "Size",
        },
        {
            value: "hero",
            name: "Hero",
        },
    ];

    let skillSortOptions: { name: string; value: SkillSortOptions }[] = [
        {
            value: "name",
            name: "Name",
        },
        {
            value: "tier",
            name: "Tier",
        },
        {
            value: "hero",
            name: "Hero",
        },
    ];
</script>

<svelte:head>
    <title>All · How Bazaar</title>
</svelte:head>

<div
    class="mx-auto w-full max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl"
>
    <AllFilters
        heroOptions={data.heroOptions}
        minimumTierOptions={data.minimumTierOptions}
        tagOptions={data.tagOptions}
        sizeOptions={data.sizeOptions}
        bind:heroStates
        bind:selectedTiers
        bind:tagStates
        bind:selectedSizes
        bind:isMatchAnyTag
        bind:isMatchAnyHero
        bind:searchText
        bind:isSearchEnchantments
        bind:isMonsterDropsOnly
    />

    <ItemList
        serverVersion={data.itemsVersion}
        sortOptions={itemSortOptions}
        {selectedHeroes}
        {selectedTiers}
        {tagStates}
        {selectedSizes}
        {searchText}
        {isSearchEnchantments}
        {isMatchAnyTag}
        {isMonsterDropsOnly}
        isHiddenWhenEmpty={true}
    />

    <SkillList
        serverVersion={data.skillsVersion}
        sortOptions={skillSortOptions}
        {heroStates}
        {selectedTiers}
        {tagStates}
        {searchText}
        {isMatchAnyTag}
        {isMatchAnyHero}
        {isMonsterDropsOnly}
        isHiddenWhenEmpty={true}
    />

    <MonsterList
        serverVersion={data.monstersVersion}
        selectedDay={undefined}
        {searchText}
        selectedMonsterEncounter={undefined}
        isHiddenWhenEmpty={true}
    />
</div>
