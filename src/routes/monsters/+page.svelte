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
    import { fetchJson } from "$lib/utils/fetchUtils";
    import MonsterFilters from "$lib/components/MonsterFilters.svelte";
    import LazyLoadList from "$lib/components/LazyLoadList.svelte";
    import { filterMonsters } from "$lib/utils/filterUtils";

    const { data }: { data: PageData } = $props();

    let isLoading = $state(false);
    let hasError = $state(false);
    let monsterEncounterDays = $state([] as ClientSideMonsterEncounterDay[]);
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
                const response = await fetchJson<
                    ClientSideMonsterEncounterDay[]
                >("/api/monsterEncounterDays", data.version);
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

    <div class="my-8 font-semibold text-red-500">
        WARNING: This data is still out of date (I can't update it
        automatically). I'm working on updating it manually, but it'll take
        time. Feel free to ping me in the Discord with issues.
    </div>


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
