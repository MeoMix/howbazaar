<script lang="ts">
    import { Toggle } from "flowbite-svelte";

    let {
        isChecked,
        onClick,
        label,
        offLabel = "",
    }: {
        isChecked: boolean;
        onClick: () => void;
        label: string;
        offLabel?: string;
    } = $props();
</script>

<Toggle
    class="mt-2 inline-flex dark:text-bazaar-tan700"
    classDiv="dark:bg-bazaar-tan200 dark:after:bg-bazaar-tan700 peer-focus:ring-bazaar-orange dark:peer-focus:ring-bazaar-orange400 peer-checked:bg-bazaar-orange"
    checked={isChecked}
    on:click={onClick}
>
    <svelte:fragment slot="offLabel">{offLabel}</svelte:fragment>
    {label}
</Toggle>
