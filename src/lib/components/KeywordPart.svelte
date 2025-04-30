<script lang="ts">
    import type { KeywordPart } from "$lib/utils/keywordUtil";

    let { part }: { part: KeywordPart } = $props();
</script>

<span class="font-semibold text-game-{part.effect} capitalize">
    {part.text}
</span>
