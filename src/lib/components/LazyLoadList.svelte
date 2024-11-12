<script lang="ts" generics="T">
    import type { Snippet } from "svelte";

    const { 
        items, 
        listItemName,
        listItem,
        batchSize = 10,
        showSearchCount = true
    }: {
        items: T[];
        listItemName: string;
        listItem: Snippet<[T]>;
        batchSize?: number;
        showSearchCount?: boolean;
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
    {#if showSearchCount}
        <div class="text-lg">
            {items.length} {listItemName}{items.length === 1 ? '' : 's'} found.
        </div>
    {/if}

    {#each visibleItems as item}
        {@render listItem(item)}
    {/each}
</div>

<div bind:this={loadMoreTrigger} class="h-1"></div>