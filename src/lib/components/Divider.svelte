<script lang="ts">
    let { isVertical = false }: { isVertical?: boolean } = $props();
</script>

{#if isVertical}
    <div
        class="w-[1px] mx-2 bg-gradient-to-b from-transparent via-gray-200 dark:via-bazaar-orange to-transparent"
    ></div>
{:else}
    <div
        class="h-[1px] my-2 bg-gradient-to-r from-transparent via-gray-200 dark:via-bazaar-orange to-transparent"
    ></div>
{/if}
