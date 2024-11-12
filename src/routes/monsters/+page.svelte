<script lang="ts">
    import CardFilter from "$lib/components/CardFilter.svelte";
    import LazyLoadList from "$lib/components/LazyLoadList.svelte";
    import MonsterEncounter from "$lib/components/MonsterEncounter.svelte";
    import type { ClientSideDayHours, ClientSideMonster } from "$lib/types";

    const { data }: { data: { monsters: ClientSideMonster[], dayHours: ClientSideDayHours[] } } = $props();

    // TODO: Add support for days past 10, logic is more convoluted. Or maybe say 10+
    const monsterEncounterDayHours = $derived(
        data.dayHours.filter(dayHour => dayHour.day <= 10 && dayHour.hour === 3).sort((dayHourA, dayHourB) => dayHourA.day - dayHourB.day)
    );

    let selectedDays = $state([] as number[]);
    const filteredDayHours = $derived(
        monsterEncounterDayHours.filter(({ day }) => selectedDays.length === 0 || selectedDays.includes(day))
    );
</script>

<div class="text-3xl py-4">
    This is all a work in progress :) Check back soon for a much improved UI
</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
    <CardFilter
        label="Day"
        options={monsterEncounterDayHours.map(dayHour => dayHour.day)}
        isSingleSelection={true}
        bind:selectedOptions={selectedDays}
    />
</div>

{#snippet dayListItem(dayHour: ClientSideDayHours)}
    <div class="text-3xl bold">
        Day {dayHour.day}
    </div>

    {#each dayHour.spawnGroups as spawnGroup}
        <div>
            {#each spawnGroup.ids as id}
                {#if data.monsters.find(monster => monster.cardId === id)}
                    {@render listItem(data.monsters.find(monster => monster.cardId === id)!)}
                {/if}
            {/each}
        </div>
    {/each}
{/snippet}

{#snippet listItem(monster: ClientSideMonster)}
    <MonsterEncounter {monster} />
{/snippet}

<LazyLoadList items={filteredDayHours} listItem={dayListItem} listItemName="day" showSearchCount={false}/>