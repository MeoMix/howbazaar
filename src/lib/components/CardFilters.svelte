<script lang="ts">
    import { Button, ButtonGroup, Input, InputAddon } from "flowbite-svelte";
    import CardFilter from "./CardFilter.svelte";
    import { onMount } from "svelte";
    import { SearchSolid } from "flowbite-svelte-icons";

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

    onMount(async () => {
        const hash = window.location.hash.slice(1);
        if (hash) {
            isSearchNameOnly = true;
            searchText = hash.replace("_", " ");
        }
    });
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
        <Button
            size="xs"
            outline={!isSearchNameOnly}
            pill
            color={isSearchNameOnly ? "primary" : "light"}
            on:click={() => (isSearchNameOnly = !isSearchNameOnly)}
            class="transition-colors focus:outline-none border-2"
        >
            Name Only
        </Button>
    </div>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
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

<Button class="mb-4" outline on:click={clearSearch} color="dark"
    >Clear Search</Button
>
