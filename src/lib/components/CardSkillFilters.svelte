<script lang="ts">
    import { Button } from "flowbite-svelte";
    import MultiSelectFilter from "./MultiSelectFilter.svelte";
    import FilterToggle from "./FilterToggle.svelte";
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import type { Option, TriState } from "$lib/types";
    import SearchInput from "./SearchInput.svelte";
    import MultiSelectTriFilter from "./MultiSelectTriFilter.svelte";
    import AdvancedFilterToggle from "./AdvancedFilterToggle.svelte";

    let {
        heroOptions,
        minimumTierOptions,
        tagOptions,
        selectedHeroes = $bindable(),
        selectedTiers = $bindable(),
        tagStates = $bindable(),
        isMatchAnyTags = $bindable(),
        searchText = $bindable(),
        isSearchNameOnly = $bindable(),
    }: {
        heroOptions: Option[];
        minimumTierOptions: Option[];
        tagOptions: Option[];
        canFilterEnchantments?: boolean;
        selectedHeroes: string[];
        selectedTiers: string[];
        tagStates: Record<string, TriState>;
        isMatchAnyTags: boolean;
        searchText: string;
        isSearchNameOnly: boolean;
    } = $props();

    function clearSearch() {
        selectedHeroes = [];
        selectedTiers = [];
        tagStates = Object.fromEntries(
            tagOptions.map((option) => [option.value, "unset"]),
        );
        isMatchAnyTags = false;
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
</script>

<div class="mt-8 mb-4">
    <SearchInput placeholder="Search skills..." bind:value={searchText} />

    <div class="flex gap-2 mt-2">
        <AdvancedFilterToggle bind:isShowingAdvancedFilters={isShowingAdvancedFilters} />

        <FilterToggle
            isEnabled={isSearchNameOnly}
            label="Search Name Only"
            onClick={() => (isSearchNameOnly = !isSearchNameOnly)}
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
            <MultiSelectFilter
                label="Heroes"
                options={heroOptions}
                bind:selectedOptionValues={selectedHeroes}
            />
            <MultiSelectFilter
                label="Starting Tiers"
                options={minimumTierOptions}
                bind:selectedOptionValues={selectedTiers}
            />
            <MultiSelectTriFilter
                label="Tags"
                options={tagOptions}
                bind:triStates={tagStates}
                bind:isMatchAny={isMatchAnyTags}
            />
        </div>
    {/if}
</div>
