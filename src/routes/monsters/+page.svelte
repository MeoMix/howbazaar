<script lang="ts">
    import CardFilter from "$lib/components/CardFilter.svelte";
    import LazyLoadList from "$lib/components/LazyLoadList.svelte";
    import MonsterEncounter from "$lib/components/MonsterEncounter.svelte";
    import type { MonsterEncounterDay, MonsterEncounter as MonsterEncounterType } from "$lib/types";

    const { data }: { data: { monsterEncounterDays: MonsterEncounterDay[] } } = $props();

    // TODO: Add support for days past 10, logic is more convoluted. Or maybe say 10+
    const monsterEncounterDays = $derived(
        data.monsterEncounterDays.sort((dayHourA, dayHourB) => dayHourA.day - dayHourB.day)
    );

    let selectedDays = $state([] as number[]);
    const filteredMonsterEncounterDays = $derived(
        monsterEncounterDays.filter(({ day }) => selectedDays.length === 0 || selectedDays.includes(day))
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

{#snippet dayListItem(monsterEncounterDay: MonsterEncounterDay)}
    <div class="text-3xl bold">
        Day {monsterEncounterDay.day}
    </div>

    {#each monsterEncounterDay.groups as monsterEncounters}
        <div>
            {#each monsterEncounters as monsterEncounter}
                {@render listItem(monsterEncounter)}
            {/each}
        </div>
    {/each}
{/snippet}

{#snippet listItem(monsterEncounter: MonsterEncounterType)}
    <MonsterEncounter {monsterEncounter} />
{/snippet}

<LazyLoadList items={filteredMonsterEncounterDays} listItem={dayListItem} listItemName="day" showSearchCount={false}/>