<script lang="ts">
    // TODO: Should I use Search component?
    import { ButtonGroup, Input, InputAddon } from "flowbite-svelte";
    import SearchOutline from "flowbite-svelte-icons/SearchOutline.svelte";

    let {
        placeholder,
        value = $bindable(),
    }: {
        placeholder: string;
        value: string;
    } = $props();
</script>

<ButtonGroup class="w-full">
    <Input
        type="text"
        {placeholder}
        bind:value
        class="focus:border-bazaar-orange focus:ring-bazaar-orange dark:focus:border-bazaar-orange dark:focus:ring-bazaar-orange dark:bg-bazaar-brown dark:placeholder-bazaar-tan700 dark:border-bazaar-brown600"
    />
    <InputAddon
        class="dark:bg-bazaar-brown600 dark:border-bazaar-brown600 dark:last:border-e-brown600"
    >
        <SearchOutline class="w-4 h-4 text-gray-500 dark:text-bazaar-tan700" />
    </InputAddon>
</ButtonGroup>
