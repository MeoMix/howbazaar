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

<div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
>
    <Card size="xl" padding="sm">
        {#each unifiedTooltips as tooltip}
            <div>
                {#each parseTooltipForRendering(tooltip, startingTier) as part}
                    {#if typeof part === "string"}
                        {part}
                    {:else}
                        <span class={part.bold ? "font-semibold whitespace-nowrap" : ""}>
                            {"( "}

                            {#each part.parts as subpart, index}
                                {#if subpart.tierType}
                                    <span
                                        class={`text-tiers-${subpart.tierType.toLowerCase()}`}
                                    >
                                        {subpart.text}
                                    </span>
                                {:else}
                                    {subpart.text}
                                {/if}

                                {#if index < part.parts.length - 1}
                                    {" / "}
                                {/if}
                            {/each}
                            {" )"}
                        </span>
                    {/if}
                {/each}
            </div>
        {/each}
    </Card>
</div>
