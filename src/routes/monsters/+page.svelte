<script lang="ts">
    import MonsterEncounter from "$lib/components/MonsterEncounter.svelte";
    import MonsterEncounterPreview from "$lib/components/MonsterEncounterPreview.svelte";
    import type {
        MonsterEncounterDay,
        MonsterEncounter as MonsterEncounterType,
    } from "$lib/types";
    import SingleSelectFilter from "$lib/components/SingleSelectFilter.svelte";

    const { data }: { data: { monsterEncounterDays: MonsterEncounterDay[] } } =
        $props();

    const monsterEncounterDays = $derived(
        data.monsterEncounterDays.sort(
            (dayHourA, dayHourB) => dayHourA.day - dayHourB.day,
        ),
    );

    let selectedDay = $state(undefined) as number | undefined;
    const filteredMonsterEncounterDays = $derived(
        selectedDay === undefined
            ? monsterEncounterDays
            : monsterEncounterDays.filter(({ day }) => selectedDay === day),
    );

    let selectedMonsterEncounter = $state() as MonsterEncounterType | undefined;
    function toggleEncounter(monsterEncounter: MonsterEncounterType) {
        if (selectedMonsterEncounter?.cardId === monsterEncounter.cardId) {
            selectedMonsterEncounter = undefined;
        } else {
            selectedMonsterEncounter = monsterEncounter;
        }
    }

    const dayOptions = $derived(
        monsterEncounterDays.map(({ day }) => ({
            name: `${day}${day === 10 ? "+" : ""}`,
            value: day,
        })),
    );

    function onSelectDay() {
        selectedMonsterEncounter = undefined;
    }
</script>

<svelte:head>
    <title>Monsters · How Bazaar</title>
</svelte:head>

<div class="my-4">
    <SingleSelectFilter
        label="Day"
        options={dayOptions}
        onSelect={onSelectDay}
        bind:selectedOptionValue={selectedDay}
    />
</div>

{#each filteredMonsterEncounterDays as monsterEncounterDay}
    <div class="mb-8">
        <div class="text-2xl font-bold">
            Day {monsterEncounterDay.day}
        </div>

        <div class="grid gap-2 justify-items-center grid-cols-5">
            {#each monsterEncounterDay.groups as monsterEncounters}
                {#each monsterEncounters as monsterEncounter}
                    <MonsterEncounterPreview
                        {monsterEncounter}
                        {toggleEncounter}
                        isActive={!selectedMonsterEncounter ||
                            selectedMonsterEncounter?.cardId ===
                                monsterEncounter.cardId}
                    />
                {/each}
            {/each}
        </div>

        {#if selectedMonsterEncounter && monsterEncounterDay.groups
                .flat()
                .some((encounter) => encounter.cardId === selectedMonsterEncounter?.cardId)}
            <MonsterEncounter monsterEncounter={selectedMonsterEncounter} />
        {/if}
    </div>
{/each}
