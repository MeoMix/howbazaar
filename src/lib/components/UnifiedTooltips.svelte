<script lang="ts">
    import { Card } from "flowbite-svelte";
    import type { ClientSideTierType } from "$lib/types";
    import { parseTooltipForRendering } from "$lib/utils/tooltipUtils";

    const {
        unifiedTooltips,
        startingTier,
    }: {
        unifiedTooltips: string[];
        startingTier: ClientSideTierType;
    } = $props();
</script>

<ul class="list-inside leading-loose">
    {#each unifiedTooltips as tooltip}
        <li>
            {#each parseTooltipForRendering(tooltip, startingTier) as part}
                {#if typeof part === "string"}
                    {part}
                {:else}
                    <span
                        class={part.bold
                            ? "font-semibold whitespace-nowrap"
                            : ""}
                    >
                        {"( "}

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
                        {" )"}
                    </span>
                {/if}
            {/each}
        </li>
    {/each}
</ul>
