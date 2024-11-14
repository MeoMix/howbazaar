<script lang="ts">
    import type { MonsterEncounter as MonsterEncounterType } from "$lib/types";
    import MonsterCardItem from "./MonsterCardItem.svelte";
    import MonsterCardSkill from "./MonsterCardSkill.svelte";

    const { monsterEncounter }: { monsterEncounter: MonsterEncounterType } =
        $props();
</script>

<div class="mt-8">
    <div class="font-bold text-3xl mb-1">
        {monsterEncounter.cardName}
    </div>

    <div class="flex mb-1 gap-4">
        <span class="font-semibold w-24 text-right capitalize whitespace-nowrap"
            >Health</span
        >
        <span class="capitalize">{monsterEncounter.health}</span>
    </div>

    <div class="flex mb-1 gap-4">
        <span class="font-semibold w-24 text-right capitalize whitespace-nowrap"
            >Level</span
        >
        <span class="capitalize">{monsterEncounter.level}</span>
    </div>

    <div class="font-semibold text-xl mt-4 mb-2">Cards</div>

    <div
        class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2"
    >
        {#each monsterEncounter.items as item}
            <MonsterCardItem
                card={item.card}
                tierType={item.tierType}
                enchantmentName={item.enchantmentType}
            />
        {/each}
    </div>

    {#if monsterEncounter.skills.length > 0}
        <div class="font-semibold text-xl mt-4 mb-2">Skills</div>
        <div
            class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2"
        >
            {#each monsterEncounter.skills as skill}
                <MonsterCardSkill card={skill.card} tierType={skill.tierType} />
            {/each}
        </div>
    {/if}
</div>
