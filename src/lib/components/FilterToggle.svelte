<script lang="ts">
    import { Button } from "flowbite-svelte";

    const {
        label,
        isEnabled,
        onClick,
    }: {
        label: string;
        isEnabled: boolean;
        onClick: () => void;
    } = $props();

    const getToggleClasses = (isEnabled: boolean) => {
        if (isEnabled) {
            return "bg-bazaar-orange dark:bg-bazaar-brown600 dark:text-bazaar-orange dark:border-bazaar-orange dark:hover:bg-bazaar-brown600 focus-within:ring-bazaar-orange dark:focus-within:ring-bazaar-brown600 dark:hover:text-bazaar-orange";
        } else {
            return "dark:bg-bazaar-brown text-gray-500 dark:text-bazaar-tan700 dark:border-bazaar-brown600 dark:hover:bg-bazaar-brown600 focus-within:ring-bazaar-orange dark:focus-within:ring-bazaar-brown hover:text-gray-900 dark:hover:text-bazaar-orange";
        }
    };
</script>

<Button
    size="xs"
    outline={!isEnabled}
    pill
    on:click={onClick}
    class={`capitalize transition-colors focus:outline-none border-2 ${getToggleClasses(isEnabled)}`}
>
    {label}
</Button>
