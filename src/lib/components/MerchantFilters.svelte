<script lang="ts">
    import { Button } from "flowbite-svelte";
    import MultiSelectFilter from "./MultiSelectFilter.svelte";
    import { onMount } from "svelte";
    import { page } from "$app/state";
    import type {
        HiddenTag,
        Tag,
        Option,
        TriState,
    } from "$lib/types";
    import SearchInput from "./SearchInput.svelte";
    import MultiSelectTriFilter from "./MultiSelectTriFilter.svelte";
    import AdvancedFilterToggle from "./AdvancedFilterToggle.svelte";
    import { CloseOutline } from "flowbite-svelte-icons";

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
    }: {
        heroOptions: Option[];
        minimumTierOptions: Option[];
        tagOptions: Option[];
        sizeOptions: Option[];
        selectedHeroes: string[];
        selectedTiers: string[];
        tagStates: Record<Tag | HiddenTag, TriState>;
        selectedSizes: string[];
        isMatchAnyTag: boolean;
        searchText: string;
    } = $props();

    function clearSearch() {
        searchText = "";
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
        page.url.searchParams.get("isShowingAdvancedFilters") === "true",
    );

    onMount(async () => {
        const hash = window.location.hash.slice(1);
        if (hash) {
            searchText = hash.replace(/_+/g, " ");
        }
    });

    const isSearchActive = $derived(
        searchText !== "" ||
            isMatchAnyTag ||
            selectedTiers.length > 0 ||
            selectedSizes.length > 0 ||
            selectedHeroes.length > 0 ||
            Object.values(tagStates).some((state) => state !== "unset"),
    );
</script>

<div class="mt-8 mb-4">
    <div class="flex gap-2 items-center">
        <SearchInput
            placeholder="Search merchants"
            bind:value={searchText}
            onClear={clearSearchInput}
        >
            {#snippet actions()}
                <div class="flex gap-2 items-center">
                    <AdvancedFilterToggle bind:isShowingAdvancedFilters />

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
    </div>

    {#if isShowingAdvancedFilters}
        <div class="flex flex-col gap-y-4">
            <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 gap-y-4 gap-x-4"
            >
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
        </div>
    {/if}
</div>
