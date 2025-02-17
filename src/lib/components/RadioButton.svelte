<script lang="ts">
    import { RadioButton } from "flowbite-svelte";
    import type { Snippet } from "svelte";

    let {
        value,
        children,
        group = $bindable(),
        onClick,
    }: {
        value: string;
        children: Snippet;
        group: string | number;
        onClick: () => void;
    } = $props();

    const getClasses = (isSelected: boolean) => {
        const commonClasses =
            "py-1 px-2 cursor-pointer dark:border-bazaar-brown600 focus-within:ring-bazaar-orange dark:focus-within:ring-bazaar-orange400 shadow-gray-300 dark:shadow-bazaar-brown600 dark:hover:text-bazaar-orange dark:hover:border-bazaar-brown600 dark:hover:bg-bazaar-brown600";

        if (isSelected) {
            return `${commonClasses} text-primary-700 dark:text-bazaar-orange bg-gray-100 border-gray-300 dark:focus-within:text-bazaar-orange dark:bg-bazaar-brown600 `;
        } else {
            return `${commonClasses} text-gray-900 dark:text-bazaar-tan700 bg-white border-gray-200 dark:bg-transparent hover:bg-gray-100 hover:text-primary-700 focus-within:text-primary-700`;
        }
    };
</script>

<RadioButton size="sm" class={`${getClasses(group === value)}`} {value} bind:group on:click={onClick}
    >{@render children()}</RadioButton
>
