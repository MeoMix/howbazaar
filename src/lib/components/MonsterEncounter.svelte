<script lang="ts">
    import type { ClientSideMonster } from "$lib/types";
    import MonsterCardItem from "./MonsterCardItem.svelte";
    import MonsterCardSkill from "./MonsterCardSkill.svelte";

    const { monster }: { monster: ClientSideMonster } = $props();
</script>

<div class="font-bold text-2xl mb-2">{monster.name}</div>
<div>
    {#each Object.entries(monster.attributes) as [attributeName, attributeValue]}
        <div class="flex mb-1 gap-4">
            <span
                class="font-semibold w-24 text-right capitalize whitespace-nowrap"
                >{attributeName}</span
            >
            <span class="capitalize">{attributeValue}</span>
        </div>
    {/each}

    <div class="font-semibold text-xl mt-4 mb-2">Cards</div>

    <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
        {#each monster.items as item}
            <MonsterCardItem
                card={item.card}
                tierType={item.tierType}
                enchantmentName={item.enchantmentName}
            />
        {/each}
    </div>

    {#if monster.skills.length > 0}
        <div class="font-semibold text-xl mt-4 mb-2">Skills</div>
        <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
            {#each monster.skills as skill}
                <MonsterCardSkill card={skill.card} tierType={skill.tierType} />
            {/each}
        </div>
    {/if}
</div>
