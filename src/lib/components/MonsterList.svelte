<script lang="ts">
    import type {
        ClientSideMonsterEncounter,
        ClientSideMonsterEncounterDay,
        MonsterSearchLocationOption,
    } from "$lib/types";
    import { onMount, tick } from "svelte";
    import LazyLoadList from "./LazyLoadList.svelte";
    import MonsterEncounter from "./MonsterEncounter.svelte";
    import { monsterEncounterDaysStore } from "$lib/stores/monsterEncounterDaysStore";
    import { searchMonsters } from "$lib/utils/filterUtils";
    import MonsterEncounterPreview from "./MonsterEncounterPreview.svelte";

    let {
        serverVersion,
        selectedDay,
        searchText,
        selectedSearchLocationOption,
        selectedMonsterEncounter,
        isHiddenWhenEmpty,
        initialLoad = true,
    }: {
        serverVersion: string;
        selectedDay: number | undefined;
        searchText: string;
        selectedSearchLocationOption: MonsterSearchLocationOption;
        selectedMonsterEncounter: ClientSideMonsterEncounter | undefined;
        isHiddenWhenEmpty: boolean;
        initialLoad?: boolean;
    } = $props();

    let isLoading = $state(false);
    let hasError = $state(false);
    let monsterEncounterDays = $state([] as ClientSideMonsterEncounterDay[]);

    onMount(() => {
        const unsubscribe = monsterEncounterDaysStore.subscribe((state) => {
            monsterEncounterDays = state.monsterEncounterDays;
            isLoading = state.isLoading;
            hasError = state.hasError;
        });

        monsterEncounterDaysStore.load(serverVersion); // Ensures we fetch fresh data if needed

        return unsubscribe;
    });

    const filteredMonsterEncounterDays = $derived(
        selectedDay === undefined
            ? monsterEncounterDays
            : monsterEncounterDays.filter(({ day }) => selectedDay === day),
    );

    const searchedMonsters = $derived(
        searchText === ""
            ? []
            : searchMonsters(
                  filteredMonsterEncounterDays.flatMap((encounter) =>
                      encounter.groups.flatMap((group) => group),
                  ),
                  searchText,
                  selectedSearchLocationOption,
              ),
    );

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
</script>

{#if isLoading}
    <div>Loading monsters...</div>
{:else if searchedMonsters.length > 0 || (!isHiddenWhenEmpty && searchText != "")}
    <div class="mb-8">
        <LazyLoadList
            items={searchedMonsters}
            listItemName="monster"
            listClasses="space-y-4"
            {initialLoad}
        >
            {#snippet listItem(monsterEncounter: ClientSideMonsterEncounter)}
                <MonsterEncounter {monsterEncounter} />
            {/snippet}
        </LazyLoadList>
    </div>
{:else if !isHiddenWhenEmpty}
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
                            <div class="grid grid-cols-1 gap-1 auto-rows-min">
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
                <MonsterEncounter monsterEncounter={selectedMonsterEncounter} />
            {/if}
        </div>
    {/each}
{/if}
