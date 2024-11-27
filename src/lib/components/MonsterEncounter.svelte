<script lang="ts">
    import type { MonsterEncounter as MonsterEncounterType } from "$lib/types";
    import { Badge } from "flowbite-svelte";
    import MonsterCardItem from "./MonsterCardItem.svelte";
    import MonsterCardSkill from "./MonsterCardSkill.svelte";

    const { monsterEncounter }: { monsterEncounter: MonsterEncounterType } =
        $props();

    const id = $derived(monsterEncounter.cardName.replace(/\s+/g, "_"));
</script>

<div class="mt-8" {id}>
    <div class="font-bold text-3xl mb-2">
        {monsterEncounter.cardName}
    </div>

    <Badge large rounded border color="green"
        >{monsterEncounter.health} health</Badge
    >

    {#if monsterEncounter.skills.length > 0}
        <div class="font-semibold text-2xl mt-4 mb-2">Skills</div>
        <div
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2"
        >
            {#each monsterEncounter.skills as skill}
                <MonsterCardSkill card={skill.card} tierType={skill.tierType} />
            {/each}
        </div>
    {/if}

    <div class="font-semibold text-2xl mt-4 mb-2">Items</div>

    <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2"
    >
        {#each monsterEncounter.items as item}
            <MonsterCardItem
                card={item.card}
                tierType={item.tierType}
                enchantmentName={item.enchantmentType}
            />
        {/each}
    </div>
</div>
