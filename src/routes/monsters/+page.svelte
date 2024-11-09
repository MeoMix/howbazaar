<script lang="ts">
    import MonsterCardItem from "$lib/components/MonsterCardItem.svelte";
    import MonsterCardSkill from "$lib/components/MonsterCardSkill.svelte";
    import type {
        ClientSideCard,
        ClientSideCardItem,
        ClientSideMonster,
    } from "$lib/types";
    import { Label, Select } from "flowbite-svelte";

    const { data }: { data: { monsters: ClientSideMonster[] } } = $props();

    let selectedLevel = $state("All");

    let sortedMonsters = data.monsters.sort(
        (a, b) => a.attributes.level - b.attributes.level,
    );

    const levelOptions = [
        "All",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
    ];

    const filteredMonsters = $derived(
        selectedLevel !== "All"
            ? sortedMonsters.filter(
                  (monster) => `${monster.attributes.level}` === selectedLevel,
              )
            : sortedMonsters,
    );

    function camelToTitle(text: string) {
        return text
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .replace(/^./, (str) => str.toUpperCase());
    }
</script>

<div class="text-3xl py-4">
    This is all a work in progress :) Check back tomorrow.
</div>

<div class="mb-4">
    <Label class="font-semibold text-lg">
        Filter Monsters

        <Select
            items={levelOptions.map((level) => ({ value: level, name: level }))}
            bind:value={selectedLevel}
            class="w-48"
        />
    </Label>
</div>

<div class="space-y-4">
    {#each filteredMonsters as monster}
        <div class="font-bold text-2xl mb-2">{monster.name}</div>
        <div>
            {#each Object.entries(monster.attributes) as [attributeName, attributeValue]}
                <div class="flex mb-1 gap-4">
                    <span class="font-semibold w-24 text-right capitalize whitespace-nowrap">{camelToTitle(attributeName)}</span>
                    <!-- Capitalize the first letter of the attributeValue (if needed) -->
                    <span class="capitalize">{attributeValue}</span>
                </div>
            {/each}

            <div class="font-semibold text-xl mt-4 mb-2">Cards</div>

            <div
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
                {#each monster.items as item}
                    <MonsterCardItem card={item.card} tier={item.tier} />
                {/each}
            </div>

            <div class="font-semibold text-xl mt-4 mb-2">Skills</div>
            <div
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
                {#each monster.skills as skill}
                    <MonsterCardSkill card={skill.card} tier={skill.tier} />
                {/each}
            </div>
        </div>
    {/each}
</div>
