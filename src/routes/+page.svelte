<script lang="ts">
    import AllFilters from "$lib/components/AllFilters.svelte";
    import ItemList from "$lib/components/ItemList.svelte";
    import MonsterList from "$lib/components/MonsterList.svelte";
    import SkillList from "$lib/components/SkillList.svelte";
    import type {
        Hero,
        HiddenTag,
        ItemSortOption,
        Size,
        SkillSortOption,
        Tag,
        TierType,
        TriState,
        EnchantmentType,
    } from "$lib/types";
    import type { PageData } from "./$types";
    import { tooltipState } from "$lib/actions/tooltip.svelte";
    import CardItem from "$lib/components/CardItem.svelte";
    import CardSkill from "$lib/components/CardSkill.svelte";
    import Tooltip from "$lib/components/Tooltip.svelte";
    import MerchantList from "$lib/components/MerchantList.svelte";

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
    let selectedEnchantmentTypes = $state([] as EnchantmentType[]);

    let monsterDropsOnlyState = $state("unset" as TriState);

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

{#if tooltipState.hoveredItem || tooltipState.hoveredSkill}
    <Tooltip x={tooltipState.x} y={tooltipState.y}>
        {#if tooltipState.hoveredItem}
            <CardItem
                card={tooltipState.hoveredItem}
                areEnchantmentsShown={false}
                showCopyLink={false}
            />
        {:else if tooltipState.hoveredSkill}
            <CardSkill card={tooltipState.hoveredSkill} showCopyLink={false} />
        {/if}
    </Tooltip>
{/if}

<!-- Main content area -->
<div
    class="w-full max-w-full sm:max-w-(--breakpoint-sm) md:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-lg) xl:max-w-(--breakpoint-xl)"
>
    <AllFilters
        heroOptions={data.heroOptions}
        minimumTierOptions={data.minimumTierOptions}
        tagOptions={data.tagOptions}
        sizeOptions={data.sizeOptions}
        enchantmentOptions={data.enchantmentOptions}
        bind:heroStates
        bind:selectedTiers
        bind:tagStates
        bind:selectedSizes
        bind:selectedEnchantmentTypes
        bind:isMatchAnyTag
        bind:isMatchAnyHero
        bind:searchText
        bind:monsterDropsOnlyState
    />

    <div class="flex flex-col gap-2">
        <ItemList
            serverVersion={data.itemsVersion}
            sortOptions={itemSortOptions}
            {selectedHeroes}
            {selectedTiers}
            {tagStates}
            {selectedSizes}
            {searchText}
            {isMatchAnyTag}
            {monsterDropsOnlyState}
            {selectedEnchantmentTypes}
            isHiddenWhenEmpty={true}
        />

        {#if selectedEnchantmentTypes.length === 0}
            <SkillList
                serverVersion={data.skillsVersion}
                sortOptions={skillSortOptions}
                {heroStates}
                {selectedTiers}
                {tagStates}
                {searchText}
                {isMatchAnyTag}
                {isMatchAnyHero}
                {monsterDropsOnlyState}
                isHiddenWhenEmpty={true}
                initialLoad={false}
            />
        {/if}

        <MonsterList
            serverVersion={data.monstersVersion}
            selectedDay={undefined}
            {searchText}
            selectedMonsterEncounter={undefined}
            isHiddenWhenEmpty={true}
            initialLoad={false}
        />

        <!-- <MerchantList
        itemsServerVersion={data.itemsVersion}
        merchantsServerVersion={data.merchantsVersion}
        {searchText}
        selectedMerchant={undefined}
        {selectedHeroes}
        {selectedTiers}
        {tagStates}
        {selectedSizes}
        {isMatchAnyTag}
        isHiddenWhenEmpty={true}
        initialLoad={false}
    /> -->
    </div>
</div>
