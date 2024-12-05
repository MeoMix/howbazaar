<script lang="ts">
    import type { TriState, Option } from "$lib/types";
    import { Button } from "flowbite-svelte";

    const {
        label,
        state,
        value,
        onClick,
    }: {
        label: string;
        state: TriState;
        value: Option["value"];
        onClick: (value: Option["value"]) => void;
    } = $props();

    const getToggleClasses = (state: TriState) => {
        if (state === "unset") {
            return `
            text-gray-500 hover:text-gray-900
            hover:text-gray-900 focus-within:ring-gray-200
            dark:bg-bazaar-brown dark:text-bazaar-tan700 dark:border-bazaar-brown600 
            dark:hover:bg-bazaar-brown600 dark:focus-within:ring-bazaar-brown 
            dark:hover:text-bazaar-orange
        `;
        } else if (state === "on") {
            return `
            bg-green-900 text-white border-green-800
            hover:bg-green-900 focus-within:ring-green-800
            dark:bg-green-900 dark:text-green-100 dark:border-green-800 
            dark:hover:bg-green-800 dark:focus-within:ring-green-900 
            dark:hover:text-neongreen-400
        `;
        } else if (state === "off") {
            return `
            bg-red-900 text-white border-red-800
            hover:bg-red-800 focus-within:ring-red-900
            dark:bg-red-900 dark:text-red-100 dark:border-red-800 
            dark:hover:bg-red-800 dark:focus-within:ring-red-900 
            dark:hover:text-orange-200
        `;
        }

        return "";
    };
</script>

<Button
    size="xs"
    outline={state === "unset"}
    pill
    color="none"
    on:click={() => onClick(value)}
    class={`capitalize transition-colors focus:outline-none border-2 ${getToggleClasses(state)}`}
>
    {label}
</Button>
