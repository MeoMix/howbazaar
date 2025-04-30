<script lang="ts">
    import type { TierType } from "$lib/types";
    import { highlightKeywords, type KeywordPart } from "$lib/utils/keywordUtil";
    import {
        parseTieredTooltip,
        type TooltipPart,
        type TooltipTierPart,
    } from "$lib/utils/tooltipUtils";

    const {
        tooltip,
        startingTier,
    }: {
        tooltip: string;
        startingTier: TierType;
    } = $props();

    function isKeywordPart(part: TooltipPart): part is KeywordPart {
        return typeof part === "object" && "effect" in part;
    }

    function isTierPart(part: TooltipPart): part is TooltipTierPart {
        return typeof part === "object" && "bold" in part;
    }

    function combinePartsWithKeywords(
        parts: (string | TooltipTierPart)[],
    ): TooltipPart[] {
        const result: TooltipPart[] = [];

        for (const part of parts) {
            if (typeof part === "string") {
                result.push(...highlightKeywords(part));
            } else {
                result.push(part); // TooltipTierPart
            }
        }

        return result;
    }

    const parsedParts = $derived(
        combinePartsWithKeywords(parseTieredTooltip(tooltip, startingTier)),
    );
</script>

{#each parsedParts as part}
    {#if typeof part === "string"}
        {part}
    {:else if isKeywordPart(part)}
        <span class="font-semibold text-game-{part.effect} capitalize">{part.text}</span>
    {:else if isTierPart(part)}
        <span class={part.bold ? "font-semibold whitespace-nowrap" : ""}>
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
    {/if}
{/each}
