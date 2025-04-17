<script lang="ts">
    const {
        x,
        y,
        children,
        edgePadding = 16,
        cursorOffset = 40,
        minWidth = 360,
    }: {
        x: number;
        y: number;
        children: any;
        edgePadding?: number;
        cursorOffset?: number;
        minWidth?: number;
    } = $props();

    let tooltipElement = $state<HTMLDivElement | undefined>();

    // Position the tooltip above the cursor by default
    // If it would go off screen, position it below instead
    let tooltipY = $state(y - cursorOffset); // Above cursor by default
    let tooltipX = $state(x);

    // Update position when props change
    $effect(() => {
        if (tooltipElement) {
            // Get viewport dimensions
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // Get tooltip dimensions
            const tooltipRect = tooltipElement.getBoundingClientRect();

            // Calculate initial position relative to viewport
            // Position away from cursor for better visibility
            let newX = x + cursorOffset;
            let newY = y - cursorOffset;

            // Check if tooltip would go off screen
            if (newY - tooltipRect.height < viewportHeight - edgePadding) {
                // Position below cursor if it would go off top
                newY = y + cursorOffset;
            }

            if (newX + tooltipRect.width > viewportWidth - edgePadding) {
                // Shift left if it would go off right
                newX = x - tooltipRect.width - cursorOffset;
            }

            if (newX < edgePadding) {
                // Shift right if it would go off left
                newX = edgePadding;
            }

            // Ensure tooltip stays within vertical viewport bounds
            if (newY + tooltipRect.height > viewportHeight - edgePadding) {
                newY = viewportHeight - tooltipRect.height - edgePadding;
            }

            // Update position
            tooltipX = newX;
            tooltipY = newY;
        }
    });
</script>

<div
    bind:this={tooltipElement}
    class="fixed z-50 pointer-events-none"
    style="left: {tooltipX}px; top: {tooltipY}px; min-width: {minWidth}px; max-width: calc(100vw - {2 *
        edgePadding}px);"
>
    {@render children()}
</div>
