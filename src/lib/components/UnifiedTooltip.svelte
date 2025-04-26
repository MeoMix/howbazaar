<script lang="ts">
    import type { TierType } from "$lib/types";
    import {
        parseTooltipForRendering,
        type TooltipKeywordPart,
        type TooltipTierPart,
    } from "$lib/utils/tooltipUtils";

    const {
        tooltip,
        startingTier,
    }: {
        tooltip: string;
        startingTier: TierType;
    } = $props();

    // Type guard functions to check the type of tooltip part
    function isKeywordPart(part: unknown): part is TooltipKeywordPart {
        return typeof part === "object" && part !== null && "effect" in part;
    }

    function isTierPart(part: unknown): part is TooltipTierPart {
        return typeof part === "object" && part !== null && "bold" in part;
    }
</script>

{#each parseTooltipForRendering(tooltip, startingTier) as part}
    {#if typeof part === "string"}
        {part}
    {:else if isKeywordPart(part)}
        <!-- Render keyword with game effect styling -->
        <span class="font-semibold text-game-{part.effect}">
            {part.text}
        </span>
    {:else if isTierPart(part)}
        <span class={part.bold ? "font-semibold whitespace-nowrap inline-block" : ""}>
            {#each part.parts as subpart, index}
                {#if subpart.tierType}
                    <span
                        class={`text-tiers-${subpart.tierType.toLowerCase()}-500`}
                    >
                        {subpart.text}
                    </span>
                {:else}
                    {subpart.text}
                {/if}

                {#if index < part.parts.length - 1}
                    {" » "}
                {/if}
            {/each}
        </span>
    {/if}
{/each}
