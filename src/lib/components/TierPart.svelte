<script lang="ts">
    import type { TierPart } from "$lib/utils/tooltipUtils";

    let { part }: { part: TierPart } = $props();
</script>

<span class="font-semibold whitespace-nowrap">
    {#each part.parts as subpart, index}
        {#if subpart.tierType}
            <span
                class="text-tiers-{subpart.tierType.toLowerCase()}-500 capitalize"
                >{subpart.text}</span
            >
        {:else}
            {subpart.text}
        {/if}
        {#if index < part.parts.length - 1}{" » "}{/if}
    {/each}
</span>
