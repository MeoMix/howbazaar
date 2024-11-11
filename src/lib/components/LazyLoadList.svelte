<script lang="ts" generics="T">
    import type { Snippet } from "svelte";

    const { 
        items, 
        listItemName,
        listItem,
        batchSize = 10,
    }: {
        items: T[];
        listItemName: string;
        listItem: Snippet<[T]>;
        batchSize?: number;
    } = $props();

    let itemsToDisplay = $state(batchSize);
    const visibleItems = $derived(items.slice(0, itemsToDisplay));
    
    let loadMoreTrigger: HTMLDivElement | null = null;

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
            { rootMargin: "400px" }
        );

        observer.observe(loadMoreTrigger);

        return () => observer.disconnect();
    });
</script>

<div class="space-y-4">
    <div class="text-lg">
        {visibleItems.length} {listItemName}{visibleItems.length === 1 ? '' : 's'} found.
    </div>

    {#each visibleItems as item}
        {@render listItem(item)}
    {/each}
</div>

<div bind:this={loadMoreTrigger} class="h-1"></div>