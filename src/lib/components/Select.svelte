<script lang="ts" generics="T">
    import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
    import { ChevronDownOutline } from "flowbite-svelte-icons";

    type Option<T> = { name: string; value: T };

    let {
        options,
        selectedOption,
        onSelectOption,
    }: {
        options: Option<T>[];
        selectedOption: T;
        onSelectOption: (optionValue: T) => void;
    } = $props();

    let isOpen = $state(false);
</script>

<div class="relative w-full">
    <Button
        size="sm"
        class="flex justify-between text-nowrap py-1 px-2 w-full text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-bazaar-orange focus:border-bazaar-orange dark:bg-bazaar-brown dark:border-bazaar-brown600 dark:placeholder-gray-400 dark:text-bazaar-tan700 dark:focus:ring-bazaar-orange dark:focus:border-bazaar-orange"
    >
        {options.find((option) => option.value === selectedOption)?.name}
        <ChevronDownOutline
            class="w-6 h-6 ms-2 text-white dark:text-bazaar-tan700"
        />
    </Button>
    <Dropdown
        bind:open={isOpen}
        containerClass="absolute w-full overflow-hidden divide-y z-50 bg-white dark:bg-bazaar-brown text-gray-700 dark:text-bazaar-tan700 rounded-lg border-gray-100 dark:border-bazaar-brown600 divide-gray-100 dark:divide-bazaar-brown600"
    >
        {#each options as option}
            <DropdownItem
                class={`w-full hover:bg-gray-100 dark:hover:bg-bazaar-brown600 dark:hover:text-bazaar-orange ${option.value === selectedOption ? "bg-bazaar-brown600 text-bazaar-orange" : ""}`}
                on:click={() => {
                    isOpen = false;
                    onSelectOption(option.value);
                }}
            >
                {option.name}
            </DropdownItem>
        {/each}
    </Dropdown>
</div>
