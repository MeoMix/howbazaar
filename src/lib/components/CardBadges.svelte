<script lang="ts">
    import { Badge } from "flowbite-svelte";

    const {
        primaryBadges,
        secondaryBadges = [],
    }: {
        primaryBadges: { text: string }[];
        secondaryBadges?: { text: string }[];
    } = $props();
</script>

<div class="flex flex-wrap gap-2">
    {#each primaryBadges as primaryBadge}
        <Badge rounded border color="dark">{primaryBadge.text}</Badge>
    {/each}
    {#if secondaryBadges?.length > 0}
        <span>·</span>
    {/if}
    {#each secondaryBadges as secondaryBadge}
        <Badge rounded border color="dark">{secondaryBadge.text}</Badge>
    {/each}
</div>
