<script lang="ts" generics="T">
    import type { Snippet } from "svelte";

    const {
        items,
        listClasses,
        listItemName,
        listItem,
        headerControls,
        batchSize = 5,
        initialLoad = true,
    }: {
        items: T[];
        listClasses?: string;
        listItemName: string;
        listItem: Snippet<[T]>;
        headerControls?: Snippet;
        batchSize?: number;
        initialLoad?: boolean;
    } = $props();

    let itemsToDisplay = $state(initialLoad ? batchSize : 0);
    const visibleItems = $derived(items.slice(0, itemsToDisplay));

    let loadMoreTrigger: HTMLDivElement | null = null;
    let componentRoot: HTMLDivElement | null = null;

    $effect(() => {
        if (!loadMoreTrigger) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        itemsToDisplay += batchSize;
                    }
                });
            },
            { rootMargin: "400px" },
        );

        observer.observe(loadMoreTrigger);

        return () => observer.disconnect();
    });

    // Add a separate observer for the component root to handle initial load
    $effect(() => {
        if (!componentRoot || initialLoad) return;

        const rootObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && itemsToDisplay === 0) {
                        itemsToDisplay = batchSize;
                    }
                });
            },
            { rootMargin: "0px" },
        );

        rootObserver.observe(componentRoot);

        return () => rootObserver.disconnect();
    });
</script>

<div bind:this={componentRoot} class="space-y-4">
    <div class="flex justify-between items-center">
        <div class="font-semibold flex-grow">
            {items.length}
            {listItemName}{items.length === 1 ? "" : "s"}
        </div>

        <div class="flex space-x-4 items-center">
            {#if headerControls}
                {@render headerControls()}
            {/if}
        </div>
    </div>

    <div class="{listClasses}">
        {#each visibleItems as item}
            {@render listItem(item)}
        {/each}
    </div>
</div>

<div bind:this={loadMoreTrigger} class="h-1"></div>
