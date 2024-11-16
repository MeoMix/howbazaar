<script lang="ts">
    import { Button, ButtonGroup, Input, InputAddon } from "flowbite-svelte";
    import CardFilter from "./MultiSelectFilter.svelte";
    import FilterToggle from "./FilterToggle.svelte";
    import { onMount } from "svelte";
    import { SearchSolid } from "flowbite-svelte-icons";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import type { Option } from "$lib/types";

    let {
        heroOptions,
        minimumTierOptions,
        tagOptions,
        sizeOptions = [],
        selectedHeroes = $bindable(),
        selectedTiers = $bindable(),
        selectedTags = $bindable(),
        selectedSizes = $bindable(),
        mustMatchAllTags = $bindable(),
        searchText = $bindable(),
        isSearchNameOnly = $bindable(),
    }: {
        heroOptions: Option[];
        minimumTierOptions: Option[];
        tagOptions: Option[];
        sizeOptions?: Option[];
        selectedHeroes: string[];
        selectedTiers: string[];
        selectedTags: string[];
        selectedSizes: string[];
        mustMatchAllTags: boolean;
        searchText: string;
        isSearchNameOnly: boolean;
    } = $props();

    function clearSearch() {
        selectedHeroes = [];
        selectedTiers = [];
        selectedTags = [];
        mustMatchAllTags = false;
        selectedSizes = [];
        searchText = "";
        isSearchNameOnly = false;
    }

    let isShowingAdvancedFilters = $state(
        $page.url.searchParams.has("isShowingAdvancedFilters"),
    );

    onMount(async () => {
        const hash = window.location.hash.slice(1);
        if (hash) {
            isSearchNameOnly = true;
            searchText = hash.replace("_", " ");
        }
    });

    function toggleAdvancedFilters() {
        isShowingAdvancedFilters = !isShowingAdvancedFilters;

        let query = new URLSearchParams($page.url.searchParams.toString());
        query.set("isShowingAdvancedFilters", `${isShowingAdvancedFilters}`);
        goto(`?${query.toString()}`, { replaceState: true });
    }
</script>

<div class="mt-8 mb-4">
    <ButtonGroup class="w-full">
        <Input
            type="text"
            placeholder="Search items..."
            bind:value={searchText}
        />
        <InputAddon>
            <SearchSolid class="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </InputAddon>
    </ButtonGroup>

    <div class="flex gap-2 mt-2">
        <FilterToggle
            isEnabled={isSearchNameOnly}
            label="Search Name Only"
            onClick={() => (isSearchNameOnly = !isSearchNameOnly)}
        />

        <FilterToggle
            isEnabled={isShowingAdvancedFilters}
            label="Show Advanced Filters"
            onClick={toggleAdvancedFilters}
        />

        <Button
            size="xs"
            outline
            pill
            color={"primary"}
            on:click={clearSearch}
            class="ml-auto transition-colors focus:outline-none border-2"
        >
            Clear Search
        </Button>
    </div>

    {#if isShowingAdvancedFilters}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <CardFilter
                label="Heroes"
                options={heroOptions}
                bind:selectedOptionValues={selectedHeroes}
            />
            <CardFilter
                label="Starting Tiers"
                options={minimumTierOptions}
                bind:selectedOptionValues={selectedTiers}
            />
            <CardFilter
                label="Tags"
                options={tagOptions}
                bind:selectedOptionValues={selectedTags}
                bind:mustMatchAll={mustMatchAllTags}
            />
            {#if sizeOptions.length > 0}
                <CardFilter
                    label="Sizes"
                    options={sizeOptions}
                    bind:selectedOptionValues={selectedSizes}
                />
            {/if}
        </div>
    {/if}
</div>
