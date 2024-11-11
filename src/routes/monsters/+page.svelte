<script lang="ts">
    import CardFilter from "$lib/components/CardFilter.svelte";
    import LazyLoadList from "$lib/components/LazyLoadList.svelte";
    import MonsterCardItem from "$lib/components/MonsterCardItem.svelte";
    import MonsterCardSkill from "$lib/components/MonsterCardSkill.svelte";
    import type { ClientSideMonster } from "$lib/types";
    import { filterMonsters } from "$lib/utils/filterUtils";

    const { data }: { data: { monsters: ClientSideMonster[] } } = $props();

    const levelOptions = Array.from(
        new Set(data.monsters.map((monster) => monster.attributes.level)),
    ).sort((a, b) => a - b);

    let selectedLevels = $state([] as number[]);

    const filteredMonsters = $derived(
        filterMonsters(data.monsters, selectedLevels).sort(
            (a, b) => a.attributes.level - b.attributes.level,
        ),
    );
</script>

<div class="text-3xl py-4">
    This is all a work in progress :) Check back soon for a much improved UI
</div>

<!-- TODO: Maybe adopt CardFilters here? Or stop using CardFilters entirely and promote use of individual filter? -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
    <CardFilter
        label="Level"
        options={levelOptions}
        bind:selectedOptions={selectedLevels}
    />
</div>

{#snippet listItem(monster: ClientSideMonster)}
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
{/snippet}

<LazyLoadList items={filteredMonsters} {listItem} emptyMessage="No monsters found." />