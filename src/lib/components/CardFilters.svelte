<script lang="ts">
    import CardFilter from "./CardFilter.svelte";

    let {
        heroOptions,
        minimumTierOptions,
        tagOptions,
        sizeOptions,
        selectedHeroes = $bindable(),
        selectedTiers = $bindable(),
        selectedTags = $bindable(),
        selectedSizes = $bindable(),
    } = $props<{
        heroOptions: string[];
        minimumTierOptions: string[];
        tagOptions: string[];
        sizeOptions: string[];
        selectedHeroes: string[];
        selectedTiers: string[];
        selectedTags: string[];
        selectedSizes: string[];
    }>();
</script>

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
    {#if sizeOptions.length > 0}
        <CardFilter
            label="Sizes Tiers"
            options={sizeOptions}
            bind:selectedOptions={selectedSizes}
        />
    {/if}
    <CardFilter
        label="Tags"
        options={tagOptions}
        bind:selectedOptions={selectedTags}
    />
</div>
