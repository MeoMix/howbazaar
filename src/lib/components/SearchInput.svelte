<script lang="ts">
    import { ButtonGroup, Input, InputAddon } from "flowbite-svelte";
    import { SearchSolid } from "flowbite-svelte-icons";

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
        <SearchSolid class="w-4 h-4 text-gray-500 dark:text-gray-400" />
    </InputAddon>
</ButtonGroup>
