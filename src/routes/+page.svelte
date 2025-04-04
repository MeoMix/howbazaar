<script lang="ts">
    import AllFilters from "$lib/components/AllFilters.svelte";
    import ItemList from "$lib/components/ItemList.svelte";
    import MonsterList from "$lib/components/MonsterList.svelte";
    import SkillList from "$lib/components/SkillList.svelte";
    import type {
        Hero,
        HiddenTag,
        ItemSortOption,
        ItemSearchLocationOption,
        Size,
        SkillSortOption,
        Tag,
        TierType,
        TriState,
        MonsterSearchLocationOption,
        SkillSearchLocationOption,
        AllSearchLocationOption,
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
    let selectedSearchLocationOption = $state(
        "name-text" as AllSearchLocationOption,
    );

    let itemSelectedSearchLocationOption = $derived(
        selectedSearchLocationOption as ItemSearchLocationOption,
    );
    let skillSelectedSearchLocationOption = $derived(
        (selectedSearchLocationOption === "name-text-enchantments"
            ? "name-text"
            : selectedSearchLocationOption) as SkillSearchLocationOption,
    );
    let monsterSelectedSearchLocationOption = $derived(
        (selectedSearchLocationOption === "name-text-enchantments"
            ? "name-text"
            : selectedSearchLocationOption) as MonsterSearchLocationOption,
    );

    let isMonsterDropsOnly = $state(false);
    let latestExpansionsOnlyState = $state("unset" as TriState);

    let itemSortOptions: { name: string; value: ItemSortOption }[] = [
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

    let skillSortOptions: { name: string; value: SkillSortOption }[] = [
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

<!-- Main content area -->
<div
    class="w-full max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl"
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
        bind:selectedSearchLocationOption
        bind:isMonsterDropsOnly
        bind:latestExpansionsOnlyState
    />

    <ItemList
        serverVersion={data.itemsVersion}
        sortOptions={itemSortOptions}
        {selectedHeroes}
        {selectedTiers}
        {tagStates}
        {selectedSizes}
        {searchText}
        selectedSearchLocationOption={itemSelectedSearchLocationOption}
        {isMatchAnyTag}
        {isMonsterDropsOnly}
        {latestExpansionsOnlyState}
        isHiddenWhenEmpty={true}
    />

    <SkillList
        serverVersion={data.skillsVersion}
        sortOptions={skillSortOptions}
        {heroStates}
        {selectedTiers}
        {tagStates}
        {searchText}
        selectedSearchLocationOption={skillSelectedSearchLocationOption}
        {isMatchAnyTag}
        {isMatchAnyHero}
        {isMonsterDropsOnly}
        {latestExpansionsOnlyState}
        isHiddenWhenEmpty={true}
        initialLoad={false}
    />

    <MonsterList
        serverVersion={data.monstersVersion}
        selectedDay={undefined}
        {searchText}
        selectedSearchLocationOption={monsterSelectedSearchLocationOption}
        selectedMonsterEncounter={undefined}
        isHiddenWhenEmpty={true}
        initialLoad={false}
    />
</div>
