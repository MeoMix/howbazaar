<script lang="ts">
    import { onMount, tick } from "svelte";
    import type {
        ClientSideItemCard,
        ClientSideMerchantCard,
        Hero,
        HiddenTag,
        MerchantSearchLocationOption,
        Size,
        Tag,
        TierType,
        TriState,
    } from "$lib/types";
    import { merchantsStore } from "$lib/stores/merchantsStore";
    import LazyLoadList from "./LazyLoadList.svelte";
    import {
        filterItemCards,
        searchCards,
        searchMerchants,
    } from "$lib/utils/filterUtils";
    import MerchantCard from "./MerchantCard.svelte";
    import MerchantPreview from "./MerchantPreview.svelte";
    import { itemsStore } from "$lib/stores/itemsStore";

    let {
        itemsServerVersion,
        merchantsServerVersion,
        searchText,
        selectedMerchant,
        selectedSearchLocationOption,
        isHiddenWhenEmpty,
        initialLoad = true,
        selectedHeroes,
        selectedTiers,
        tagStates,
        selectedSizes,
        isMatchAnyTag,
    }: {
        itemsServerVersion: string;
        merchantsServerVersion: string;
        searchText: string;
        selectedSearchLocationOption: MerchantSearchLocationOption;
        selectedMerchant: ClientSideMerchantCard | undefined;
        isHiddenWhenEmpty: boolean;
        initialLoad?: boolean;
        selectedHeroes: Hero[];
        selectedTiers: TierType[];
        tagStates: Record<Tag | HiddenTag, TriState>;
        selectedSizes: Size[];
        isMatchAnyTag: boolean;
    } = $props();

    let isLoadingMerchants = $state(false);
    let hasErrorMerchants = $state(false);
    let merchants = $state([] as ClientSideMerchantCard[]);
    let isLoadingItems = $state(false);
    let hasErrorItems = $state(false);
    // TODO: Apply filters to items after implementing search filters.
    let items = $state([] as ClientSideItemCard[]);

    onMount(() => {
        const unsubscribeItems = itemsStore.subscribe((state) => {
            items = state.items;
            isLoadingItems = state.isLoading;
            hasErrorItems = state.hasError;
        });

        itemsStore.load(itemsServerVersion); // Ensures we fetch fresh data if needed

        const unsubscribeMerchants = merchantsStore.subscribe((state) => {
            merchants = state.merchants;
            isLoadingMerchants = state.isLoading;
            hasErrorMerchants = state.hasError;
        });

        merchantsStore.load(merchantsServerVersion); // Ensures we fetch fresh data if needed

        return () => {
            unsubscribeMerchants();
            unsubscribeItems();
        };
    });

    const filteredItems = $derived(
        filterItemCards(
            items,
            selectedHeroes,
            selectedTiers,
            tagStates,
            selectedSizes,
            isMatchAnyTag,
            false,
            "unset",
        ),
    );

    const searchedItems = $derived(
        searchCards(filteredItems, searchText, selectedSearchLocationOption),
    );

    const merchantItemsMap = $derived(
        new Map(
            merchants.map((merchant) => [
                merchant.id,
                filterItemCards(
                    searchedItems,
                    merchant.filters.heros ?? [],
                    merchant.filters.tiers ?? [],
                    merchant.filters.tagStates ?? {},
                    merchant.filters.sizes ?? [],
                    true,
                    false,
                    "unset",
                ),
            ]),
        ),
    );

    const filteredMerchants = $derived(
        merchants.filter(
            (merchant) => (merchantItemsMap.get(merchant.id) ?? []).length > 0,
        ),
    );

    const isSearchFilterApplied = $derived(
        searchText !== "" ||
            selectedHeroes.length > 0 ||
            selectedTiers.length > 0 ||
            selectedSizes.length > 0 ||
            Object.values(tagStates).some((state) => state !== "unset"),
    );

    const searchedMerchants = $derived(
        !isSearchFilterApplied
            ? []
            : searchMerchants(
                  filteredMerchants,
                  merchantItemsMap,
                  searchText,
                  selectedSearchLocationOption,
              ),
    );

    async function toggleMerchant(merchant: ClientSideMerchantCard) {
        if (selectedMerchant?.id === merchant.id) {
            selectedMerchant = undefined;
        } else {
            selectedMerchant = merchant;

            await tick();

            // Do this manually so it works even if data is fetched after page loads
            const targetElement = document.getElementById(
                merchant.name.replace(/\s+/g, "_"),
            );

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                });
            }
        }
    }
</script>

{#snippet listItem(merchant: ClientSideMerchantCard)}
    <MerchantCard
        {merchant}
        merchantItems={merchantItemsMap.get(merchant.id) ?? []}
    />
{/snippet}

{#if isLoadingMerchants || isLoadingItems}
    <div>Loading merchants...</div>
{:else if searchedMerchants.length > 0 || (!isHiddenWhenEmpty && isSearchFilterApplied)}
    <div class="mb-8">
        <LazyLoadList
            items={searchedMerchants}
            {listItem}
            listItemName="merchant"
            {initialLoad}
        />
    </div>
{:else if !isHiddenWhenEmpty}
    <div class="grid grid-cols-3 gap-1">
        {#each filteredMerchants as merchant}
            <MerchantPreview
                {merchant}
                {toggleMerchant}
                isActive={selectedMerchant?.id === merchant.id}
            />
        {/each}
    </div>

    {#if selectedMerchant?.id}
        <MerchantCard
            merchant={selectedMerchant}
            merchantItems={merchantItemsMap.get(selectedMerchant.id) ?? []}
        />
    {/if}
{/if}
