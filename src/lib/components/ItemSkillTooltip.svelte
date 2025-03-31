<script lang="ts">
    import type { ClientSideItemCard, ClientSideSkillCard } from "$lib/types";
    import CardItem from "./CardItem.svelte";
    import CardSkill from "./CardSkill.svelte";

    const {
        item,
        skill,
        x,
        y,
        isVisible,
    }: {
        item?: ClientSideItemCard;
        skill?: ClientSideSkillCard;
        x: number;
        y: number;
        isVisible: boolean;
    } = $props();

    let tooltipElement = $state<HTMLDivElement | undefined>();

    // Position the tooltip above the cursor by default
    // If it would go off screen, position it below instead
    let tooltipY = $state(y - 20); // 20px above cursor by default
    let tooltipX = $state(x);

    // Update position when props change
    $effect(() => {
        if (isVisible && tooltipElement) {
            // Get viewport dimensions
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // Get tooltip dimensions
            const tooltipRect = tooltipElement.getBoundingClientRect();

            // Padding from viewport edges
            const EDGE_PADDING = 16;

            // Calculate initial position relative to viewport
            // Position 40px away from cursor for better visibility
            let newX = x + 40;
            let newY = y - 40;

            // Check if tooltip would go off screen
            if (newY - tooltipRect.height < EDGE_PADDING) {
                // Position below cursor if it would go off top
                newY = y + 40;
            }

            if (newX + tooltipRect.width > viewportWidth - EDGE_PADDING) {
                // Shift left if it would go off right
                newX = x - tooltipRect.width - 40;
            }

            if (newX < EDGE_PADDING) {
                // Shift right if it would go off left
                newX = EDGE_PADDING;
            }

            // Ensure tooltip stays within vertical viewport bounds
            if (newY + tooltipRect.height > viewportHeight - EDGE_PADDING) {
                newY = viewportHeight - tooltipRect.height - EDGE_PADDING;
            }

            // Update position
            tooltipX = newX;
            tooltipY = newY;
        }
    });
</script>

{#if isVisible && (item || skill)}
    <div
        bind:this={tooltipElement}
        class="fixed z-50 pointer-events-none min-w-[360px] max-w-[calc(100vw-32px)]"
        style="left: {tooltipX}px; top: {tooltipY}px;"
    >
        {#if item}
            <CardItem
                card={item}
                areEnchantmentsShown={false}
                showCopyLink={false}
            />
        {:else if skill}
            <CardSkill card={skill} showCopyLink={false} />
        {/if}
    </div>
{/if}
