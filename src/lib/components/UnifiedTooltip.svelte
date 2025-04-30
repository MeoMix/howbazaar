<script lang="ts">
    import type { TierType } from "$lib/types";
    import { highlightKeywords } from "$lib/utils/keywordUtil";
    import { highlightTiers, type TooltipPart } from "$lib/utils/tooltipUtils";
    import KeywordPart from "./KeywordPart.svelte";
    import TierPart from "./TierPart.svelte";

    const {
        tooltip,
        startingTier,
    }: {
        tooltip: string;
        startingTier: TierType;
    } = $props();

    const tooltipParts = $derived(
        highlightTiers(tooltip, startingTier).flatMap<TooltipPart>((part) =>
            typeof part === "string" ? highlightKeywords(part) : [part],
        ),
    );
</script>

{#each tooltipParts as part}
    {#if typeof part === "string"}
        {part}
    {:else if part.type === "keyword"}
        <KeywordPart {part} />
    {:else if part.type === "tier"}
        <TierPart {part} />
    {/if}
{/each}
