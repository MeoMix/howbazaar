<script lang="ts">
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
    <Input type="text" {placeholder} bind:value />
    <InputAddon>
        <SearchOutline class="w-4 h-4 text-gray-500 dark:text-gray-400" />
    </InputAddon>
</ButtonGroup>
