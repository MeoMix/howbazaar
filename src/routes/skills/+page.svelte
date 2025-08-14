<script lang="ts">
    import type {
        Hero,
        HiddenTag,
        SkillSortOption,
        Tag,
        TierType,
        TriState,
    } from "$lib/types";
    import CardSkillFilters from "$lib/components/CardSkillFilters.svelte";
    import type { PageData } from "./$types";
    import SkillList from "$lib/components/SkillList.svelte";

    const { data }: { data: PageData } = $props();

    let heroStates = $state(
        Object.fromEntries(
            data.heroOptions.map(({ value }) => [value, "unset"]),
        ) as Record<Hero, TriState>,
    );

    let tagStates = $state(
        Object.fromEntries(
            data.tagOptions.map(({ value }) => [value, "unset"]),
        ) as Record<Tag | HiddenTag, TriState>,
    );

    let selectedTiers = $state([] as TierType[]);
    let isMatchAnyTag = $state(false);
    let isMatchAnyHero = $state(false);
    let searchText = $state("");
    let monsterDropsOnlyState = $state("unset" as TriState);
    let sortOptions: { name: string; value: SkillSortOption }[] = [
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
    <title>Skills · How Bazaar</title>
</svelte:head>

<div
    class="w-full max-w-full sm:max-w-(--breakpoint-sm) md:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-lg) xl:max-w-(--breakpoint-xl)"
>
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
        bind:monsterDropsOnlyState
    />

    <SkillList
        serverVersion={data.version}
        {sortOptions}
        {heroStates}
        {selectedTiers}
        {tagStates}
        {searchText}
        {isMatchAnyTag}
        {isMatchAnyHero}
        {monsterDropsOnlyState}
        isHiddenWhenEmpty={false}
    />
</div>
