<script lang="ts">
    import { Button } from "flowbite-svelte";
    import type { Snippet } from "svelte";

    const {
        label,
        icon,
        isEnabled,
        onClick,
    }: {
        label?: string;
        icon?: Snippet;
        isEnabled: boolean;
        onClick: () => void;
    } = $props();

    const getToggleClasses = (isEnabled: boolean) => {
        if (isEnabled) {
            return "bg-bazaar-orange dark:bg-bazaar-brown600 dark:text-bazaar-orange dark:border-bazaar-orange dark:hover:bg-bazaar-brown600 focus-within:ring-bazaar-orange dark:focus-within:ring-bazaar-orange dark:hover:text-bazaar-orange";
        } else {
            return "dark:bg-bazaar-brown text-gray-500 dark:text-bazaar-tan700 dark:border-bazaar-brown600 dark:hover:bg-bazaar-brown600 focus-within:ring-bazaar-orange dark:focus-within:ring-bazaar-orange hover:text-gray-900 dark:hover:text-bazaar-orange";
        }
    };
</script>

<Button
    size="sm"
    outline={!isEnabled}
    pill
    on:click={onClick}
    class={`transition-colors focus:outline-hidden border py-1.5 px-3 ${getToggleClasses(isEnabled)}`}
>
    {#if icon}
        {@render icon()}
    {/if}
    {#if label}
        <span class="text-nowrap capitalize">{label}</span>
    {/if}
</Button>
