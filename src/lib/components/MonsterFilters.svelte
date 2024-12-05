<script lang="ts">
    import { Button } from "flowbite-svelte";
    import SearchInput from "./SearchInput.svelte";
    import SingleSelectFilter from "./SingleSelectFilter.svelte";
    import type { Option } from "$lib/types";
    import { onMount } from "svelte";

    let {
        dayOptions,
        searchText = $bindable(),
        selectedDay = $bindable(),
        onSelectDay,
    }: {
        dayOptions: Option[];
        searchText: string;
        selectedDay: number | undefined;
        onSelectDay: () => void,
    } = $props();

    function clearSearch() {
        selectedDay = undefined;
        searchText = "";
    }

    onMount(async () => {
        const hash = window.location.hash.slice(1);
        if (hash) {
            searchText = hash.replace("_", " ");
        }
    });
</script>

<div class="mt-8 mb-4">
    <SearchInput placeholder="Search monsters..." bind:value={searchText} />

    <div class="flex gap-2 mt-2">
        <Button
            size="xs"
            outline
            pill
            color={"red"}
            on:click={clearSearch}
            class="ml-auto transition-colors focus:outline-none border-2"
        >
            Clear Search
        </Button>
    </div>

    <div class="grid grid-cols-1 mt-4">
        <SingleSelectFilter
            label="Day"
            options={dayOptions}
            onSelect={onSelectDay}
            bind:selectedOptionValue={selectedDay}
        />
    </div>
</div>
