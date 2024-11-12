<script lang="ts">
    import { Button, ButtonGroup, Input, InputAddon } from "flowbite-svelte";
    import CardFilter from "./CardFilter.svelte";
    import { onMount } from "svelte";
    import { SearchSolid } from "flowbite-svelte-icons";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";

    let {
        heroOptions,
        minimumTierOptions,
        tagOptions,
        sizeOptions,
        selectedHeroes = $bindable(),
        selectedTiers = $bindable(),
        selectedTags = $bindable(),
        selectedSizes = $bindable(),
        mustMatchAllTags = $bindable(),
        searchText = $bindable(),
        isSearchNameOnly = $bindable(),
    }: {
        heroOptions: string[];
        minimumTierOptions: string[];
        tagOptions: string[];
        sizeOptions: string[];
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

<div class="mt-8">
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
        <Button
            size="xs"
            outline={!isSearchNameOnly}
            pill
            color={isSearchNameOnly ? "primary" : "light"}
            on:click={() => (isSearchNameOnly = !isSearchNameOnly)}
            class="transition-colors focus:outline-none border-2"
        >
            Search Name Only
        </Button>

        <Button
            size="xs"
            outline={!isShowingAdvancedFilters}
            pill
            color={isShowingAdvancedFilters ? "primary" : "light"}
            on:click={toggleAdvancedFilters}
            class="transition-colors focus:outline-none border-2"
        >
            Show Advanced Filters
        </Button>

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
</div>

{#if isShowingAdvancedFilters}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
        <CardFilter
            label="Heroes"
            options={heroOptions}
            bind:selectedOptions={selectedHeroes}
        />
        <CardFilter
            label="Starting Tiers"
            options={minimumTierOptions}
            bind:selectedOptions={selectedTiers}
        />
        <CardFilter
            label="Tags"
            options={tagOptions}
            bind:selectedOptions={selectedTags}
            bind:mustMatchAll={mustMatchAllTags}
        />
        {#if sizeOptions.length > 0}
            <CardFilter
                label="Sizes"
                options={sizeOptions}
                bind:selectedOptions={selectedSizes}
            />
        {/if}
    </div>
{/if}
