<script lang="ts">
    import CardFilter from "$lib/components/CardFilter.svelte";
    import MonsterEncounter from "$lib/components/MonsterEncounter.svelte";
    import MonsterEncounterPreview from "$lib/components/MonsterEncounterPreview.svelte";
    import type {
        MonsterEncounterDay,
        MonsterEncounter as MonsterEncounterType,
    } from "$lib/types";

    const { data }: { data: { monsterEncounterDays: MonsterEncounterDay[] } } =
        $props();

    const monsterEncounterDays = $derived(
        data.monsterEncounterDays.sort(
            (dayHourA, dayHourB) => dayHourA.day - dayHourB.day,
        ),
    );

    // TODO: Think I should rewrite this to be `selectedDay`
    let selectedDays = $state([] as number[]);
    const filteredMonsterEncounterDays = $derived(
        monsterEncounterDays.filter(
            ({ day }) =>
                selectedDays.length === 0 || selectedDays.includes(day),
        ),
    );

    let selectedMonsterEncounter = $state() as MonsterEncounterType | undefined;
    function toggleEncounter(monsterEncounter: MonsterEncounterType) {
        if (selectedMonsterEncounter?.cardId === monsterEncounter.cardId) {
            selectedMonsterEncounter = undefined;
        } else {
            selectedMonsterEncounter = monsterEncounter;
        }
    }

    // TODO: No idea if this is the correct way to do this, feels like it's not
    $effect.pre(() => {
        if (selectedDays) {
            selectedMonsterEncounter = undefined;
        }
    });
</script>

<svelte:head>
    <title>Monsters · How Bazaar</title>
</svelte:head>

<div class="my-4">
    <CardFilter
        label="Day"
        options={monsterEncounterDays.map(({ day }) => ({
            name: `${day}${day === 10 ? "+" : ""}`,
            value: day,
        }))}
        isSingleSelection={true}
        bind:selectedOptionValues={selectedDays}
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
