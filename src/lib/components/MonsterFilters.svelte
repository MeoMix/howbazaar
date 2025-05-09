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
        onSelectDay: () => void;
    } = $props();

    function clearSearch() {
        searchText = "";
        selectedDay = undefined;
    }

    function clearSearchInput() {
        searchText = "";
    }

    onMount(async () => {
        const hash = window.location.hash.slice(1);
        if (hash) {
            searchText = hash.replace(/_+/g, " ");
        }
    });
</script>

<div class="mt-8 mb-4">
    <SearchInput
        placeholder="Search monsters"
        bind:value={searchText}
        onClear={clearSearchInput}
    />

    <div class="flex flex-col gap-y-4">
        <div class="grid grid-cols-1 mt-4">
            <SingleSelectFilter
                label="Day"
                options={dayOptions}
                onSelect={onSelectDay}
                bind:selectedOptionValue={selectedDay}
            />
        </div>

        <Button
            size="xs"
            outline
            pill
            color={"red"}
            on:click={clearSearch}
            class="mt-4 transition-colors focus:outline-hidden border self-center w-auto"
        >
            Clear Search
        </Button>
    </div>
</div>
