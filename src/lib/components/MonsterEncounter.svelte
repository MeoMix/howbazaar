<script lang="ts">
    import type { ClientSideMonsterEncounter } from "$lib/types";
    import MonsterCardItem from "./MonsterCardItem.svelte";
    import MonsterCardSkill from "./MonsterCardSkill.svelte";

    const {
        monsterEncounter,
    }: { monsterEncounter: ClientSideMonsterEncounter } = $props();

    const id = $derived(monsterEncounter.cardName.replace(/\s+/g, "_"));
</script>

<div class="mt-8" {id}>
    <div class="font-bold text-2xl mb-2">
        {monsterEncounter.cardName}

        ·
        
        <span class={`text-xl text-green-700 whitespace-nowrap`}>
            {monsterEncounter.health} health
        </span>

        ·

        <span class={`text-xl whitespace-nowrap`}>
            Day {monsterEncounter.day}
        </span>
    </div>

    <div
        class={`grid gap-8 mt-4 ${
            !monsterEncounter.skills.length
                ? "grid-cols-[auto]"
                : monsterEncounter.skills.length > 0 &&
                    monsterEncounter.items.length > 0
                  ? "grid-cols-[auto] md:grid-cols-[240px_auto]"
                  : ""
        }`}
    >
        {#if monsterEncounter.skills.length > 0}
            <div class="flex flex-col">
                <div class="font-semibold text-lg md:text-xl mb-2">Skills</div>
                <div class="flex flex-col gap-2">
                    {#each monsterEncounter.skills as skill}
                        <MonsterCardSkill
                            card={skill.card}
                            tierType={skill.tierType}
                        />
                    {/each}
                </div>
            </div>
        {/if}

        <div
            class="grid gap-2 grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 col-span-full md:col-span-1"
        >
            {#each monsterEncounter.items as item, index}
                <div class="flex flex-col">
                    <!-- Conditionally show title for the first column -->
                    {#if index === 0}
                        <div class="font-semibold text-lg md:text-xl mb-2">
                            Items
                        </div>
                    {/if}
                    {#if index !== 0}
                        <div
                            class="invisible font-semibold text-lg md:text-xl mb-2"
                        >
                            Items
                        </div>
                    {/if}
                    <MonsterCardItem
                        card={item.card}
                        tierType={item.tierType}
                        enchantmentType={item.enchantmentType}
                    />
                </div>
            {/each}
        </div>
    </div>
</div>
