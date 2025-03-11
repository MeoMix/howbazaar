<script lang="ts">
    import type { TierType } from "$lib/types";
    import UnifiedTooltip from "./UnifiedTooltip.svelte";

    const {
        unifiedTooltips,
        startingTier,
    }: {
        unifiedTooltips: string[];
        startingTier: TierType;
    } = $props();
</script>

<ul class="list-inside leading-loose">
    {#each unifiedTooltips as tooltip}
        <li>
            <UnifiedTooltip {tooltip} {startingTier} />
        </li>
    {/each}
</ul>
