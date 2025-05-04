<script lang="ts">
    import { Button, Label } from "flowbite-svelte";
    import MultiSelectFilter from "./MultiSelectFilter.svelte";
    import { onMount } from "svelte";
    import { page } from "$app/state";
    import type {
        HiddenTag,
        Tag,
        Option,
        TriState,
        Hero,
        AllSearchLocationOption,
        ExpansionPackId,
    } from "$lib/types";
    import SearchInput from "./SearchInput.svelte";
    import MultiSelectTriFilter from "./MultiSelectTriFilter.svelte";
    import AdvancedFilterToggle from "./AdvancedFilterToggle.svelte";
    import FilterTriToggle from "./FilterTriToggle.svelte";

    let {
        heroOptions,
        minimumTierOptions,
        tagOptions,
        sizeOptions,
        expansionOptions,
        heroStates = $bindable(),
        selectedTiers = $bindable(),
        tagStates = $bindable(),
        selectedSizes = $bindable(),
        selectedExpansions = $bindable(),
        isMatchAnyTag = $bindable(),
        isMatchAnyHero = $bindable(),
        searchText = $bindable(),
        selectedSearchLocationOption = $bindable(),
        monsterDropsOnlyState = $bindable(),
    }: {
        heroOptions: Option[];
        minimumTierOptions: Option[];
        tagOptions: Option[];
        sizeOptions: Option[];
        expansionOptions: Option[];
        heroStates: Record<Hero, TriState>;
        selectedTiers: string[];
        tagStates: Record<Tag | HiddenTag, TriState>;
        selectedSizes: string[];
        selectedExpansions: ExpansionPackId[];
        isMatchAnyTag: boolean;
        isMatchAnyHero: boolean;
        searchText: string;
        selectedSearchLocationOption: AllSearchLocationOption;
        monsterDropsOnlyState: TriState;
    } = $props();

    function clearSearch() {
        searchText = "";
        selectedSearchLocationOption = "name-text";
        heroStates = Object.fromEntries(
            heroOptions.map((option) => [option.value, "unset"]),
        ) as Record<Hero, TriState>;
        selectedTiers = [];
        tagStates = Object.fromEntries(
            tagOptions.map((option) => [option.value, "unset"]),
        ) as Record<Tag | HiddenTag, TriState>;
        isMatchAnyTag = false;
        selectedSizes = [];
        monsterDropsOnlyState = "unset";
        selectedExpansions = [];
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
            selectedSearchLocationOption = "name";
        }
    });

    let searchLocationOptions = $state([
        { name: "Name", value: "name" },
        { name: "Name & Text", value: "name-text" },
        {
            name: "Name, Text & Enchantments",
            value: "name-text-enchantments",
        },
    ] as { name: string; value: AllSearchLocationOption }[]);
</script>

{#snippet button()}
    <AdvancedFilterToggle bind:isShowingAdvancedFilters />
{/snippet}

<div class="mt-8 mb-4">
    <div class="flex gap-2 items-center">
        <SearchInput
            placeholder="Search items, skills, and monsters"
            bind:selectedSearchLocationOption
            {searchLocationOptions}
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
                <MultiSelectTriFilter
                    label="Heroes"
                    options={heroOptions}
                    bind:triStates={heroStates}
                    bind:isMatchAny={isMatchAnyHero}
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
                <MultiSelectFilter
                    label="Expansions"
                    options={expansionOptions}
                    bind:selectedOptionValues={selectedExpansions}
                />

                <div>
                    <Label
                        class="mb-2 font-semibold text-lg dark:text-bazaar-tan700"
                        >Misc</Label
                    >

                    <div class="flex flex-wrap gap-2">
                        <FilterTriToggle
                            value={monsterDropsOnlyState}
                            state={monsterDropsOnlyState}
                            label={"Monster Drops Only"}
                            onClick={() => {
                                monsterDropsOnlyState =
                                    monsterDropsOnlyState === "unset"
                                        ? "on"
                                        : monsterDropsOnlyState === "on"
                                          ? "off"
                                          : "unset";
                            }}
                        />
                    </div>
                </div>
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
