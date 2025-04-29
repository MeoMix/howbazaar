<script lang="ts">
    import { Button, Label } from "flowbite-svelte";
    import MultiSelectFilter from "./MultiSelectFilter.svelte";
    import FilterToggle from "./FilterToggle.svelte";
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import type {
        HiddenTag,
        Tag,
        Option,
        TriState,
        ItemSearchLocationOption,
    } from "$lib/types";
    import SearchInput from "./SearchInput.svelte";
    import MultiSelectTriFilter from "./MultiSelectTriFilter.svelte";
    import AdvancedFilterToggle from "./AdvancedFilterToggle.svelte";

    let {
        heroOptions,
        minimumTierOptions,
        tagOptions,
        sizeOptions,
        selectedHeroes = $bindable(),
        selectedTiers = $bindable(),
        tagStates = $bindable(),
        selectedSizes = $bindable(),
        isMatchAnyTag = $bindable(),
        searchText = $bindable(),
        selectedSearchLocationOption = $bindable(),
    }: {
        heroOptions: Option[];
        minimumTierOptions: Option[];
        tagOptions: Option[];
        sizeOptions: Option[];
        canFilterEnchantments?: boolean;
        selectedHeroes: string[];
        selectedTiers: string[];
        tagStates: Record<Tag | HiddenTag, TriState>;
        selectedSizes: string[];
        isMatchAnyTag: boolean;
        searchText: string;
        selectedSearchLocationOption: ItemSearchLocationOption;
    } = $props();

    function clearSearch() {
        searchText = "";
        selectedSearchLocationOption = "name-text";
        selectedHeroes = [];
        selectedTiers = [];
        tagStates = Object.fromEntries(
            tagOptions.map((option) => [option.value, "unset"]),
        ) as Record<Tag | HiddenTag, TriState>;
        isMatchAnyTag = false;
        selectedSizes = [];
    }

    function clearSearchInput() {
        searchText = "";
    }

    let isShowingAdvancedFilters = $state(
        $page.url.searchParams.get("isShowingAdvancedFilters") === "true",
    );

    onMount(async () => {
        const hash = window.location.hash.slice(1);
        if (hash) {
            searchText = hash.replace(/_+/g, " ");
            selectedSearchLocationOption = "name";
        }
    });

    let searchLocationOptions = $state([
        { name: "Name", value: "name" },
        { name: "Name & Text", value: "name-text" },
    ] as { name: string; value: ItemSearchLocationOption }[]);
</script>

{#snippet button()}
    <AdvancedFilterToggle bind:isShowingAdvancedFilters />
{/snippet}

<div class="mt-8 mb-4">
    <div class="flex gap-2 items-center">
        <SearchInput
            placeholder="Search merchants"
            {searchLocationOptions}
            bind:selectedSearchLocationOption
            {button}
            bind:value={searchText}
            onClear={clearSearchInput}
        />
    </div>

    {#if isShowingAdvancedFilters}
        <div class="flex flex-col gap-y-4">
            <div class="grid grid-cols-2 mt-4 gap-y-4">
                <div class="col-span-full">
                    <MultiSelectTriFilter
                        label="Tags"
                        options={tagOptions}
                        bind:triStates={tagStates}
                        bind:isMatchAny={isMatchAnyTag}
                    />
                </div>
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
                <MultiSelectFilter
                    label="Sizes"
                    options={sizeOptions}
                    bind:selectedOptionValues={selectedSizes}
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
    {/if}
</div>
