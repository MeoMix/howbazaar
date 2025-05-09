<script lang="ts">
    import { Button } from "flowbite-svelte";
    import SearchInput from "./SearchInput.svelte";
    import SingleSelectFilter from "./SingleSelectFilter.svelte";
    import type { Option } from "$lib/types";
    import { onMount } from "svelte";
    import { CloseOutline } from "flowbite-svelte-icons";

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

    const isSearchActive = $derived(
        searchText !== "" || selectedDay !== undefined,
    );
</script>

<div class="mt-8 mb-4">
    <SearchInput
        placeholder="Search monsters"
        bind:value={searchText}
        onClear={clearSearchInput}
    >
        {#snippet actions()}
            <div class="flex gap-2 items-center">
                <Button
                    size="sm"
                    outline
                    pill
                    disabled={!isSearchActive}
                    color="red"
                    on:click={clearSearch}
                >
                    <CloseOutline class="w-5 h-5" />
                </Button>
            </div>
        {/snippet}
    </SearchInput>

    <div class="flex flex-col gap-y-4">
        <div class="grid grid-cols-1 mt-4">
            <SingleSelectFilter
                label="Day"
                options={dayOptions}
                onSelect={onSelectDay}
                bind:selectedOptionValue={selectedDay}
            />
        </div>
    </div>
</div>
