<script lang="ts">
    import { highlightKeywords } from "$lib/utils/keywordUtil";
    import KeywordPart from "./KeywordPart.svelte";

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
        {:else if part.type === "keyword"}
            <KeywordPart {part} />
        {/if}
    {/each}
</span>
