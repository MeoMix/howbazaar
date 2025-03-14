<script lang="ts">
    import { onDestroy } from "svelte";

    const { id, name } = $props<{
        id: string;
        name: string;
    }>();

    let copyTimeout = $state() as ReturnType<typeof setTimeout> | undefined;

    async function copyLink() {
        const url = new URL(window.location.href);
        url.hash = id;
        await navigator.clipboard.writeText(url.toString());

        // Clear any existing timeout
        if (copyTimeout) clearTimeout(copyTimeout);

        // Reset after 2 seconds
        copyTimeout = setTimeout(() => {
            copyTimeout = undefined;
        }, 2000);
    }

    // Cleanup timeout on component destroy
    onDestroy(() => {
        if (copyTimeout) clearTimeout(copyTimeout);
    });
</script>

<button
    class="ml-2 text-bazaar-orange text-lg"
    title={copyTimeout ? "Link copied!" : `Copy link to ${name}`}
    onclick={copyLink}
>
    {#if copyTimeout}
        ✓
    {:else}
        🔗
    {/if}
</button>
