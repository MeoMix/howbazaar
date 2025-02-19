<script lang="ts">
    import MonsterEncounter from "$lib/components/MonsterEncounter.svelte";
    import MonsterEncounterPreview from "$lib/components/MonsterEncounterPreview.svelte";
    import type {
        ClientSideMonsterEncounterDay,
        ClientSideMonsterEncounter,
    } from "$lib/types";
    import type { PageData } from "./$types";
    import { onMount, tick } from "svelte";
    import { monsterEncounterDaysStore } from "$lib/stores/monsterEncounterDaysStore";
    import MonsterFilters from "$lib/components/MonsterFilters.svelte";
    import LazyLoadList from "$lib/components/LazyLoadList.svelte";
    import { filterMonsters } from "$lib/utils/filterUtils";

    const { data }: { data: PageData } = $props();

    let isLoading = $state(false);
    let hasError = $state(false);
    let monsterEncounterDays = $state([] as ClientSideMonsterEncounterDay[]);

    onMount(() => {
        const unsubscribe = monsterEncounterDaysStore.subscribe((state) => {
            monsterEncounterDays = state.monsterEncounterDays;
            isLoading = state.isLoading;
            hasError = state.hasError;
        });

        monsterEncounterDaysStore.load(data.version); // Ensures we fetch fresh data if needed

        return unsubscribe;
    });

    let searchText = $state("");
    let selectedDay = $state(undefined) as number | undefined;
    const filteredMonsterEncounterDays = $derived(
        selectedDay === undefined
            ? monsterEncounterDays
            : monsterEncounterDays.filter(({ day }) => selectedDay === day),
    );

    const filteredMonsters = $derived(
        searchText === ""
            ? []
            : filterMonsters(
                  filteredMonsterEncounterDays.flatMap((encounter) =>
                      encounter.groups.flatMap((group) => group),
                  ),
                  searchText,
              ),
    );

    let selectedMonsterEncounter = $state() as
        | ClientSideMonsterEncounter
        | undefined;
    async function toggleEncounter(
        monsterEncounter: ClientSideMonsterEncounter,
    ) {
        if (selectedMonsterEncounter?.cardId === monsterEncounter.cardId) {
            selectedMonsterEncounter = undefined;
        } else {
            selectedMonsterEncounter = monsterEncounter;

            await tick();

            // Do this manually so it works even if data is fetched after page loads
            const targetElement = document.getElementById(
                monsterEncounter.cardName.replace(/\s+/g, "_"),
            );

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                });
            }
        }
    }

    function onSelectDay() {
        selectedMonsterEncounter = undefined;
    }
</script>

<svelte:head>
    <title>Monsters · How Bazaar</title>
</svelte:head>

<div
    class="mx-auto w-full max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl"
>
    <MonsterFilters
        dayOptions={data.dayOptions}
        bind:searchText
        bind:selectedDay
        {onSelectDay}
    />

    {#if isLoading}
        <div>Loading monsters...</div>
    {:else if filteredMonsters.length > 0}
        <div class="mb-8">
            {#snippet listItem(monsterEncounter: ClientSideMonsterEncounter)}
                <MonsterEncounter {monsterEncounter} />
            {/snippet}

            <LazyLoadList
                items={filteredMonsters}
                {listItem}
                listItemName="monster"
            />
        </div>
    {:else}
        {#each filteredMonsterEncounterDays as monsterEncounterDay}
            <div class="mb-8">
                <div class="text-2xl font-bold mb-4">
                    {#if monsterEncounterDay.day === "event"}
                        Event
                    {:else}
                        Day {monsterEncounterDay.day}
                    {/if}
                </div>

                <div class="grid grid-cols-3 gap-1">
                    {#each monsterEncounterDay.groups as monsterEncounters}
                        {#if monsterEncounterDay.groups.length < 3}
                            {#each monsterEncounters as monsterEncounter}
                                <div
                                    class="grid grid-cols-1 gap-1 auto-rows-min"
                                >
                                    <MonsterEncounterPreview
                                        {monsterEncounter}
                                        {toggleEncounter}
                                        isActive={selectedMonsterEncounter?.cardId ===
                                            monsterEncounter.cardId}
                                    />
                                </div>
                            {/each}
                        {:else}
                            <div class="grid grid-cols-1 gap-1 auto-rows-min">
                                {#each monsterEncounters as monsterEncounter}
                                    <MonsterEncounterPreview
                                        {monsterEncounter}
                                        {toggleEncounter}
                                        isActive={selectedMonsterEncounter?.cardId ===
                                            monsterEncounter.cardId}
                                    />
                                {/each}
                            </div>
                        {/if}
                    {/each}
                </div>

                {#if selectedMonsterEncounter && monsterEncounterDay.groups
                        .flat()
                        .some((encounter) => encounter.cardId === selectedMonsterEncounter?.cardId)}
                    <MonsterEncounter
                        monsterEncounter={selectedMonsterEncounter}
                    />
                {/if}
            </div>
        {/each}
    {/if}
</div>
