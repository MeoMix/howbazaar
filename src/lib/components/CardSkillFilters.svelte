<script lang="ts">
    import { Button, Label } from "flowbite-svelte";
    import MultiSelectFilter from "./MultiSelectFilter.svelte";
    import { onMount } from "svelte";
    import { page } from "$app/state";
    import type { Hero, HiddenTag, Tag, Option, TriState } from "$lib/types";
    import SearchInput from "./SearchInput.svelte";
    import MultiSelectTriFilter from "./MultiSelectTriFilter.svelte";
    import AdvancedFilterToggle from "./AdvancedFilterToggle.svelte";
    import FilterTriToggle from "./FilterTriToggle.svelte";
    import { CloseOutline } from "flowbite-svelte-icons";

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
        monsterDropsOnlyState = $bindable(),
    }: {
        heroOptions: Option[];
        minimumTierOptions: Option[];
        tagOptions: Option[];
        heroStates: Record<Hero, TriState>;
        selectedTiers: string[];
        tagStates: Record<Tag | HiddenTag, TriState>;
        isMatchAnyTag: boolean;
        isMatchAnyHero: boolean;
        searchText: string;
        monsterDropsOnlyState: TriState;
    } = $props();

    function clearSearch() {
        searchText = "";
        heroStates = Object.fromEntries(
            heroOptions.map((option) => [option.value, "unset"]),
        ) as Record<Hero, TriState>;
        selectedTiers = [];
        tagStates = Object.fromEntries(
            tagOptions.map((option) => [option.value, "unset"]),
        ) as Record<Tag | HiddenTag, TriState>;
        isMatchAnyTag = false;
        isMatchAnyHero = false;
        monsterDropsOnlyState = "unset";
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
            isMatchAnyHero ||
            selectedTiers.length > 0 ||
            monsterDropsOnlyState !== "unset" ||
            Object.values(tagStates).some((state) => state !== "unset") ||
            Object.values(heroStates).some((state) => state !== "unset"),
    );
</script>

<div class="mt-8 mb-4">
    <div class="flex gap-2 items-center">
        <SearchInput
            placeholder="Search skills"
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
        </div>
    {/if}
</div>
