<script lang="ts">
    import { Badge } from "flowbite-svelte";

    const { primaryBadges, secondaryBadges } = $props<{
        primaryBadges: { text: string }[];
        secondaryBadges?: { text: string }[];
    }>();
</script>

<div class="flex gap-2">
    {#each primaryBadges as primaryBadge}
        <Badge rounded border color="dark">{primaryBadge.text}</Badge>
    {/each}
    {#if secondaryBadges?.length > 0}
        ·
    {/if}
    {#each secondaryBadges as secondaryBadge}
        <Badge rounded border color="dark">{secondaryBadge.text}</Badge>
    {/each}
</div>
