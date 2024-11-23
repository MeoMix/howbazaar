<script lang="ts">
    import MonsterEncounter from "$lib/components/MonsterEncounter.svelte";
    import MonsterEncounterPreview from "$lib/components/MonsterEncounterPreview.svelte";
    import type {
        MonsterEncounterDay,
        MonsterEncounter as MonsterEncounterType,
    } from "$lib/types";
    import SingleSelectFilter from "$lib/components/SingleSelectFilter.svelte";
    import type { PageData } from "./$types";
    import { onMount } from "svelte";
    import { monsterEncounterDaysStore } from "$lib/stores/monsterEncounterDaysStore";
    import { fetchJson } from "$lib/utils/fetchUtils";

    const { data }: { data: PageData } = $props();

    let isLoading = $state(false);
    let hasError = $state(false);
    let monsterEncounterDays = $state([] as MonsterEncounterDay[]);
    let version = $state(null as string | null);

    onMount(async () => {
        monsterEncounterDaysStore.subscribe((store) => {
            // If the server informs us that what's written to the store is stale - don't use it.
            if (data.version === store.version) {
                monsterEncounterDays = store.monsterEncounterDays;
                version = store.version;
            }
        })();

        if (monsterEncounterDays.length === 0 || !version) {
            try {
                isLoading = true;
                const response = await fetchJson<MonsterEncounterDay[]>(
                    "/api/monsterEncounterDays",
                    data.version,
                );
                monsterEncounterDaysStore.set({
                    monsterEncounterDays: response.data,
                    version: response.version,
                });
                monsterEncounterDays = response.data;
                version = response.version;
            } catch (error) {
                console.error(error);
                hasError = true;
            } finally {
                isLoading = false;
            }
        }
    });

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
        options={data.dayOptions}
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
                        isActive={selectedMonsterEncounter?.cardId === monsterEncounter.cardId}
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
