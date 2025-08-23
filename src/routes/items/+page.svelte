<script lang="ts">
    import type {
        Hero,
        HiddenTag,
        ItemSortOption,
        Size,
        Tag,
        TierType,
        TriState,
        EnchantmentType,
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
    let monsterDropsOnlyState = $state("unset" as TriState);
    let selectedEnchantmentTypes = $state([] as EnchantmentType[]);
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
        enchantmentOptions={data.enchantmentOptions}
        bind:selectedHeroes
        bind:selectedTiers
        bind:tagStates
        bind:selectedSizes
        bind:isMatchAnyTag
        bind:searchText
        bind:monsterDropsOnlyState
        bind:selectedEnchantmentTypes
    />

    <ItemList
        serverVersion={data.version}
        {sortOptions}
        {selectedHeroes}
        {selectedTiers}
        {tagStates}
        {selectedSizes}
        {searchText}
        {isMatchAnyTag}
        {monsterDropsOnlyState}
        {selectedEnchantmentTypes}
        isHiddenWhenEmpty={false}
    />
</div>
