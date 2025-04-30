<script lang="ts">
    import { Button, Label } from "flowbite-svelte";
    import MultiSelectFilter from "./MultiSelectFilter.svelte";
    import FilterToggle from "./FilterToggle.svelte";
    import { onMount } from "svelte";
    import { page } from "$app/state";
    import type {
        Hero,
        HiddenTag,
        Tag,
        Option,
        TriState,
        SkillSearchLocationOption,
    } from "$lib/types";
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
        selectedSearchLocationOption = $bindable(),
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
        selectedSearchLocationOption: SkillSearchLocationOption;
        isMonsterDropsOnly: boolean;
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
        isMatchAnyHero = false;
        isMonsterDropsOnly = false;
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
            selectedSearchLocationOption = 'name';
        }
    });

    let searchLocationOptions = $state([
        { name: "Name", value: "name" },
        { name: "Name & Text", value: "name-text" },
    ] as { name: string; value: SkillSearchLocationOption }[]);
</script>

{#snippet button()}
    <AdvancedFilterToggle bind:isShowingAdvancedFilters />
{/snippet}

<div class="mt-8 mb-4">
    <div class="flex gap-2 items-center">
        <SearchInput
            placeholder="Search skills"
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
