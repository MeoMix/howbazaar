<script lang="ts">
    import MerchantFilters from "$lib/components/MerchantFilters.svelte";
    import MerchantList from "$lib/components/MerchantList.svelte";
    import type {
        ClientSideMerchantCard,
        Hero,
        HiddenTag,
        MerchantSearchLocationOption,
        Size,
        Tag,
        TierType,
        TriState,
    } from "$lib/types";
    import type { PageData } from "./$types";

    const { data }: { data: PageData } = $props();

    let searchText = $state("");
    let selectedMerchant = $state() as ClientSideMerchantCard | undefined;

    let selectedHeroes = $state([] as Hero[]);
    let selectedTiers = $state([] as TierType[]);
    let tagStates = $state(
        Object.fromEntries(
            data.tagOptions.map(({ value }) => [value, "unset"]),
        ) as Record<Tag | HiddenTag, TriState>,
    );
    let isMatchAnyTag = $state(false);
    let selectedSizes = $state([] as Size[]);
    let selectedSearchLocationOption = $state(
        "name-text" as MerchantSearchLocationOption,
    );
</script>

<svelte:head>
    <title>Merchants · How Bazaar</title>
</svelte:head>

<div
    class="w-full max-w-full sm:max-w-(--breakpoint-sm) md:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-lg) xl:max-w-(--breakpoint-xl)"
>
    <div class="text-lg mt-4 text-red-500">
        Hi! I know the UX for this isn't quite right yet. I'll work on improving
        it over the upcoming days. Just wanted to ship something. Feel free to
        reach out on Discord and provide feedback on how you'd like it to function.
    </div>

    <MerchantFilters
        heroOptions={data.heroOptions}
        minimumTierOptions={data.minimumTierOptions}
        tagOptions={data.tagOptions}
        sizeOptions={data.sizeOptions}
        bind:selectedHeroes
        bind:selectedTiers
        bind:tagStates
        bind:selectedSizes
        bind:isMatchAnyTag
        bind:searchText
        bind:selectedSearchLocationOption
    />

    <MerchantList
        itemsServerVersion={data.itemsVersion}
        merchantsServerVersion={data.version}
        {searchText}
        {selectedMerchant}
        {selectedSearchLocationOption}
        {selectedHeroes}
        {selectedTiers}
        {tagStates}
        {selectedSizes}
        {isMatchAnyTag}
        isHiddenWhenEmpty={false}
    />
</div>
