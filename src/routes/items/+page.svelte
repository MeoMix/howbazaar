<script lang="ts">
    import type {
        Hero,
        HiddenTag,
        ItemSortOption,
        ItemSearchLocationOption,
        Size,
        Tag,
        TierType,
        TriState,
    } from "$lib/types";
    import CardItemFilters from "$lib/components/CardItemFilters.svelte";
    import type { PageData } from "./$types";
    import ItemList from "$lib/components/ItemList.svelte";

    const { data }: { data: PageData } = $props();

    let selectedHeroes = $state([] as Hero[]);
    let selectedTiers = $state([] as TierType[]);
    let tagStates = $state(
        Object.fromEntries(
            data.tagOptions.map(({ value }) => [value, "unset"]),
        ) as Record<Tag | HiddenTag, TriState>,
    );
    let isMatchAnyTag = $state(false);
    let selectedSizes = $state([] as Size[]);
    let searchText = $state("");
    let selectedSearchLocationOption = $state(
        "name-text" as ItemSearchLocationOption,
    );
    let monsterDropsOnlyState = $state("unset" as TriState);
    let latestExpansionsOnlyState = $state("unset" as TriState);
    let sortOptions: { name: string; value: ItemSortOption }[] = [
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
</script>

<svelte:head>
    <title>Items · How Bazaar</title>
</svelte:head>

<div
    class="w-full max-w-full sm:max-w-(--breakpoint-sm) md:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-lg) xl:max-w-(--breakpoint-xl)"
>
    <CardItemFilters
        heroOptions={data.heroOptions}
        minimumTierOptions={data.minimumTierOptions}
        tagOptions={data.tagOptions}
        sizeOptions={data.sizeOptions}
        bind:selectedHeroes
        bind:selectedTiers
        bind:tagStates
        bind:selectedSizes
        bind:isMatchAnyTag
        bind:searchText
        bind:selectedSearchLocationOption
        bind:monsterDropsOnlyState
        bind:latestExpansionsOnlyState
    />

    <ItemList
        serverVersion={data.version}
        {sortOptions}
        {selectedHeroes}
        {selectedTiers}
        {tagStates}
        {selectedSizes}
        {searchText}
        {selectedSearchLocationOption}
        {isMatchAnyTag}
        {monsterDropsOnlyState}
        {latestExpansionsOnlyState}
        isHiddenWhenEmpty={false}
    />
</div>
