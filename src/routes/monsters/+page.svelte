<script lang="ts">
    import type {
        ClientSideMonsterEncounter,
        MonsterSearchLocationOption,
    } from "$lib/types";
    import type { PageData } from "./$types";
    import MonsterFilters from "$lib/components/MonsterFilters.svelte";
    import MonsterList from "$lib/components/MonsterList.svelte";

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

<div
    class="w-full max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl"
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
