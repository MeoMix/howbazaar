<script lang="ts">
    import { highlightKeywords } from "$lib/utils/keywordUtil";

    let {
        description,
    }: {
        description: string;
    } = $props();

    // Don't show the "Buys..." bit as it's only relevant in game.
    const sellsDescription = $derived(
        description.replace(/Buys[\s\S]*$/, "").trim(),
    );

    const parts = $derived(highlightKeywords(sellsDescription));
</script>

<span>
    {#each parts as part}
        {#if typeof part === "string"}
            {part}
        {:else if part.effect}
            <span class="font-semibold text-game-{part.effect} capitalize"
                >{part.text}</span
            >
        {/if}
    {/each}
</span>
