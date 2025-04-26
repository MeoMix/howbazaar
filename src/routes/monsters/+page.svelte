<script lang="ts">
    import type {
        ClientSideMonsterEncounter,
        MonsterSearchLocationOption,
    } from "$lib/types";
    import type { PageData } from "./$types";
    import MonsterFilters from "$lib/components/MonsterFilters.svelte";
    import MonsterList from "$lib/components/MonsterList.svelte";
    import { tooltipState } from "$lib/actions/tooltip.svelte";
    import CardItem from "$lib/components/CardItem.svelte";
    import CardSkill from "$lib/components/CardSkill.svelte";
    import Tooltip from "$lib/components/Tooltip.svelte";

    const { data }: { data: PageData } = $props();

    let searchText = $state("");
    let selectedDay = $state(undefined) as number | undefined;
    let selectedSearchLocationOption = $state(
        "name-text" as MonsterSearchLocationOption,
    );

    let selectedMonsterEncounter = $state() as
        | ClientSideMonsterEncounter
        | undefined;

    function onSelectDay() {
        selectedMonsterEncounter = undefined;
    }
</script>

<svelte:head>
    <title>Monsters · How Bazaar</title>
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

<div
    class="w-full max-w-full sm:max-w-(--breakpoint-sm) md:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-lg) xl:max-w-(--breakpoint-xl)"
>
    <MonsterFilters
        dayOptions={data.dayOptions}
        bind:searchText
        bind:selectedSearchLocationOption
        bind:selectedDay
        {onSelectDay}
    />

    <MonsterList
        serverVersion={data.version}
        {selectedDay}
        {searchText}
        {selectedSearchLocationOption}
        {selectedMonsterEncounter}
        isHiddenWhenEmpty={false}
    />
</div>
