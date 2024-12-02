<script lang="ts">
    import { Button, Label } from "flowbite-svelte";
    import MultiSelectFilter from "./MultiSelectFilter.svelte";
    import FilterToggle from "./FilterToggle.svelte";
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import type { Hero, HiddenTag, Tag, Option, TriState } from "$lib/types";
    import SearchInput from "./SearchInput.svelte";
    import MultiSelectTriFilter from "./MultiSelectTriFilter.svelte";
    import AdvancedFilterToggle from "./AdvancedFilterToggle.svelte";

    let {
        heroOptions,
        minimumTierOptions,
        tagOptions,
        heroStates = $bindable(),
        selectedTiers = $bindable(),
        tagStates = $bindable(),
        isMatchAnyTag = $bindable(),
        isMatchAnyHero = $bindable(),
        searchText = $bindable(),
        isSearchNameOnly = $bindable(),
        isMonsterDropsOnly = $bindable(),
    }: {
        heroOptions: Option[];
        minimumTierOptions: Option[];
        tagOptions: Option[];
        canFilterEnchantments?: boolean;
        heroStates: Record<Hero, TriState>;
        selectedTiers: string[];
        tagStates: Record<Tag | HiddenTag, TriState>;
        isMatchAnyTag: boolean;
        isMatchAnyHero: boolean;
        searchText: string;
        isSearchNameOnly: boolean;
        isMonsterDropsOnly: boolean;
    } = $props();

    function clearSearch() {
        heroStates = Object.fromEntries(
            heroOptions.map((option) => [option.value, "unset"]),
        ) as Record<Hero, TriState>;
        selectedTiers = [];
        tagStates = Object.fromEntries(
            tagOptions.map((option) => [option.value, "unset"]),
        ) as Record<Tag | HiddenTag, TriState>;
        isMatchAnyTag = false;
        isMatchAnyHero = false;
        searchText = "";
        isSearchNameOnly = false;
        isMonsterDropsOnly = false;
    }

    let isShowingAdvancedFilters = $state(
        $page.url.searchParams.get("isShowingAdvancedFilters") === "true",
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
        <AdvancedFilterToggle bind:isShowingAdvancedFilters />

        <FilterToggle
            isEnabled={isSearchNameOnly}
            label="Search Name Only"
            onClick={() => (isSearchNameOnly = !isSearchNameOnly)}
        />

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

    {#if isShowingAdvancedFilters}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
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
            <MultiSelectTriFilter
                label="Tags"
                options={tagOptions}
                bind:triStates={tagStates}
                bind:isMatchAny={isMatchAnyTag}
            />

            <div>
                <Label
                    class="mb-2 font-semibold text-lg dark:text-bazaar-tan700"
                    >Misc</Label
                >

                <div class="flex flex-wrap gap-2">
                    <FilterToggle
                        isEnabled={isMonsterDropsOnly}
                        label={"Monster Drops Only"}
                        onClick={() => {
                            isMonsterDropsOnly = !isMonsterDropsOnly;
                        }}
                    />
                </div>
            </div>
        </div>
    {/if}
</div>
