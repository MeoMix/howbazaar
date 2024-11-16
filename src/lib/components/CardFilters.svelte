<script lang="ts">
    import { Button } from "flowbite-svelte";
    import CardFilter from "./MultiSelectFilter.svelte";
    import FilterToggle from "./FilterToggle.svelte";
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import type { Option } from "$lib/types";
    import SearchInput from "./SearchInput.svelte";

    let {
        heroOptions,
        minimumTierOptions,
        tagOptions,
        sizeOptions = [],
        searchPlaceholder,
        canFilterEnchantments = false,
        selectedHeroes = $bindable(),
        selectedTiers = $bindable(),
        selectedTags = $bindable(),
        selectedSizes = $bindable(),
        mustMatchAllTags = $bindable(),
        searchText = $bindable(),
        isSearchNameOnly = $bindable(),
        isSearchEnchantments = $bindable(),
    }: {
        heroOptions: Option[];
        minimumTierOptions: Option[];
        tagOptions: Option[];
        sizeOptions?: Option[];
        searchPlaceholder: string;
        canFilterEnchantments?: boolean;
        selectedHeroes: string[];
        selectedTiers: string[];
        selectedTags: string[];
        selectedSizes: string[];
        mustMatchAllTags: boolean;
        searchText: string;
        isSearchNameOnly: boolean;
        isSearchEnchantments: boolean;
    } = $props();

    function clearSearch() {
        selectedHeroes = [];
        selectedTiers = [];
        selectedTags = [];
        mustMatchAllTags = false;
        selectedSizes = [];
        searchText = "";
        isSearchNameOnly = false;
        isSearchEnchantments = false;
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
    <SearchInput placeholder={searchPlaceholder} bind:value={searchText} />

    <div class="flex gap-2 mt-2">
        <FilterToggle
            isEnabled={isShowingAdvancedFilters}
            label="Show Advanced Filters"
            onClick={toggleAdvancedFilters}
        />

        <FilterToggle
            isEnabled={isSearchNameOnly}
            label="Search Name Only"
            onClick={() => (isSearchNameOnly = !isSearchNameOnly)}
        />

        {#if canFilterEnchantments}
            <FilterToggle
                isEnabled={isSearchEnchantments}
                label="Include Enchantments"
                onClick={() => (isSearchEnchantments = !isSearchEnchantments)}
            />
        {/if}

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
