<script lang="ts">
    import type {
        ClientSideItemCard,
        Hero,
        HiddenTag,
        ItemSortOptions,
        Size,
        Tag,
        TierType,
        TriState,
    } from "$lib/types";
    import CardItem from "$lib/components/CardItem.svelte";
    import CardItemFilters from "$lib/components/CardItemFilters.svelte";
    import { filterItemCards, sortCards } from "$lib/utils/filterUtils";
    import LazyLoadList from "$lib/components/LazyLoadList.svelte";
    import type { PageData } from "./$types";
    import { onMount } from "svelte";
    import { itemsStore } from "$lib/stores/itemsStore";
    import { fetchJson } from "$lib/utils/fetchUtils";
    import Switch from "$lib/components/Switch.svelte";
    import Select from "$lib/components/Select.svelte";

    const { data }: { data: PageData } = $props();

    let isLoading = $state(false);
    let hasError = $state(false);
    let cardItems = $state([] as ClientSideItemCard[]);
    let version = $state(null as string | null);

    onMount(async () => {
        itemsStore.subscribe((store) => {
            // If the server informs us that what's written to the store is stale - don't use it.
            if (data.version === store.version) {
                cardItems = store.items;
                version = store.version;
            }
        })();

        if (cardItems.length === 0 || !version) {
            try {
                isLoading = true;
                const response = await fetchJson<ClientSideItemCard[]>(
                    "/api/items",
                    data.version,
                );
                itemsStore.set({
                    items: response.data,
                    version: response.version,
                });
                cardItems = response.data;
                version = response.version;
            } catch (error) {
                console.error(error);
                hasError = true;
            } finally {
                isLoading = false;
            }
        }
    });

    let selectedHeroes = $state([] as Hero[]);
    let selectedTiers = $state([] as TierType[]);

    let tagStates = $state(
        Object.fromEntries(
            data.tagOptions.map(({ value }) => [value, "unset"]),
        ) as Record<Tag | HiddenTag, TriState>,
    );

    let isMatchAnyTag = $state(false);
    let selectedSizes = $state([] as Size[]);
    let searchText = $state("");
    let isSearchNameOnly = $state(false);
    let isSearchEnchantments = $state(false);
    let isMonsterDropsOnly = $state(false);
    // TODO: Consider persisting this in a store and/or in local storage
    let areEnchantmentsShown = $state(true);
    let selectedSortOption = $state("name" as ItemSortOptions);

    const filteredCards = $derived(
        sortCards(
            filterItemCards(
                cardItems,
                selectedHeroes,
                selectedTiers,
                tagStates,
                selectedSizes,
                searchText,
                isSearchNameOnly,
                isSearchEnchantments,
                isMatchAnyTag,
                isMonsterDropsOnly,
            ),
            selectedSortOption,
        ),
    );

    const onToggleEnchantments = () => {
        areEnchantmentsShown = !areEnchantmentsShown;
    };

    let sortOptions: { name: string; value: ItemSortOptions }[] = [
        {
            value: "name",
            name: "Name",
        },
        {
            value: "tier",
            name: "Tier",
        },
        {
            value: "size",
            name: "Size",
        },
        {
            value: "hero",
            name: "Hero",
        },
    ];
</script>

<svelte:head>
    <title>Items · How Bazaar</title>
</svelte:head>

<div
    class="mx-auto w-full max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl"
>
    <CardItemFilters
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
        bind:isSearchNameOnly
        bind:isSearchEnchantments
        bind:isMonsterDropsOnly
    />

    {#if isLoading}
        <div>Loading items...</div>
    {:else}
        {#snippet listItem(card: ClientSideItemCard)}
            <CardItem {card} {areEnchantmentsShown} />
        {/snippet}

        {#snippet headerControls()}
            <Switch
                isChecked={areEnchantmentsShown}
                onClick={onToggleEnchantments}
                label="Show Enchantments"
            />
            <Select
                options={sortOptions}
                selectedOption={selectedSortOption}
                onSelectOption={(option) => {
                    selectedSortOption = option;
                }}
            />
        {/snippet}

        <LazyLoadList
            items={filteredCards}
            {listItem}
            {headerControls}
            listItemName="item"
        />
    {/if}
</div>
