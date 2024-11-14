<svelte:head>
    <title>How Bazaar - Monsters</title>
</svelte:head>

<script lang="ts">
    import CardFilter from "$lib/components/CardFilter.svelte";
    import MonsterEncounter from "$lib/components/MonsterEncounter.svelte";
    import type { MonsterEncounterDay } from "$lib/types";

    const { data }: { data: { monsterEncounterDays: MonsterEncounterDay[] } } =
        $props();

    // TODO: Add support for days past 10, logic is more convoluted. Or maybe say 10+
    const monsterEncounterDays = $derived(
        data.monsterEncounterDays.sort(
            (dayHourA, dayHourB) => dayHourA.day - dayHourB.day,
        ),
    );

    // TODO: Think I should rewrite this to be `selectedDay`
    let selectedDays = $state([1]);
    const filteredMonsterEncounterDays = $derived(
        monsterEncounterDays.filter(({ day }) => selectedDays.includes(day)),
    );
</script>

<div class="text-3xl py-4">
    This is all a work in progress :) Check back soon for a much improved UI
</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
    <CardFilter
        label="Day"
        options={monsterEncounterDays.map(({ day }) => day)}
        isSingleSelection={true}
        bind:selectedOptions={selectedDays}
    />
</div>

<div class="space-y-4">
    {#each filteredMonsterEncounterDays as monsterEncounterDay}
        <div class="text-3xl bold">
            Day {monsterEncounterDay.day}
        </div>

        {#each monsterEncounterDay.groups as monsterEncounters}
            <div>
                {#each monsterEncounters as monsterEncounter}
                    <MonsterEncounter {monsterEncounter} />
                {/each}
            </div>
        {/each}
    {/each}
</div>
