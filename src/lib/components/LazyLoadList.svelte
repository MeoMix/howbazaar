<script lang="ts" generics="T">
    import type { Snippet } from "svelte";

    const {
        items,
        listItemName,
        listItem,
        headerControls,
        batchSize = 5,
    }: {
        items: T[];
        listItemName: string;
        listItem: Snippet<[T]>;
        headerControls?: Snippet;
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
            { rootMargin: "400px" },
        );

        observer.observe(loadMoreTrigger);

        return () => observer.disconnect();
    });
</script>

<div class="space-y-4">
    <div class="flex justify-between items-center">
        <div class="text-lg flex-grow">
            {items.length}
            {listItemName}{items.length === 1 ? "" : "s"} found.
        </div>
    
        <div class="flex space-x-2">
            {#if headerControls}
                {@render headerControls()}
            {/if}
        </div>
    </div>

    {#each visibleItems as item}
        {@render listItem(item)}
    {/each}
</div>

<div bind:this={loadMoreTrigger} class="h-1"></div>
