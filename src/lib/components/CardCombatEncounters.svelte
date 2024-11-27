<script lang="ts">
    import { page } from "$app/stores";
    import type { ClientSideCombatEncounterSummary } from "$lib/types";

    const {
        combatEncounters,
    }: { combatEncounters: ClientSideCombatEncounterSummary[] } = $props();
</script>

<div class="font-semibold flex flex-wrap gap-1 mt-2">
    {#each combatEncounters as combatEncounter, index}
        <div class="whitespace-nowrap flex gap-1 items-center">
            <a
                href={`/monsters${$page.url.search}#${combatEncounter.cardName.replace(/\s+/g, "_")}`}
                class="text-blue-600 dark:text-blue-500 hover:underline"
            >
                {combatEncounter.cardName}
            </a>
            {#if index < combatEncounters.length - 1}
                <div aria-hidden="true">{"·"}</div>
            {/if}
        </div>
    {/each}
</div>
