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

    const matchedMerchantIds = $derived(() => {
        if (selectedMerchant) {
            return new Set([selectedMerchant.id]);
        }

        const lowerSearchText = searchText.toLowerCase();
        const tokens = lowerSearchText
            .split("|")
            .map((t) => t.trim())
            .filter((t) => t !== "");

        const matches = new Set<string>();

        for (const token of tokens) {
            for (const merchant of merchants) {
                if (merchant.name.toLowerCase().includes(token)) {
                    matches.add(merchant.id);
                }
            }
        }

        return matches;
    });

    const leftoverSearchText = $derived(() => {
        if (selectedMerchant) return searchText;

        const lowerSearchText = searchText.toLowerCase();
        let tokens = lowerSearchText
            .split("|")
            .map((t) => t.trim())
            .filter((t) => t !== "");

        // Remove any tokens that match a merchant name
        tokens = tokens.filter((token) => {
            return !merchants.some((merchant) =>
                merchant.name.toLowerCase().includes(token),
            );
        });

        return tokens.join(" | ");
    });

    // Start by applying user filters to the items under consideration.
    // This will ensure each merchant only shows items relevant to the user's filters.
    const filteredItems = $derived(
        filterItemCards(
            items,
            selectedHeroes,
            selectedTiers,
            { ...tagStates, Core: "off" },
            selectedSizes,
            isMatchAnyTag,
            false,
            "unset",
        ),
    );

    const searchedItems = $derived(
        searchCards(
            filteredItems,
            leftoverSearchText(),
            selectedSearchLocationOption,
        ),
    );

    const merchantItemsMap = $derived(
        new Map(
            merchants.map((merchant) => [
                merchant.id,
                // Apply filters to the item pool again, but this time customized to the specific merchant.
                // This will ensure each merchant only shows items relevant to the specific merchant.
                filterItemCards(
                    searchedItems,
                    // If heroes isn't provided then show all released heroes except Common.
                    merchant.filters.heros ?? [
                        "Vanessa",
                        "Pygmalien",
                        "Dooley",
                        // "Jules",
                        // "Stelle",
                        "Mak",
                    ],
                    // If tier isn't provided then show all tiers but exclude Legendary because merchants don't sell legendary items.
                    merchant.filters.tiers ?? [
                        "Bronze",
                        "Silver",
                        "Gold",
                        "Diamond",
                    ],
                    merchant.filters.tagStates ?? {},
                    merchant.filters.sizes ?? [],
                    merchant.filters.isMatchAnyTag ?? true,
                    false,
                    "unset",
                    merchant.filters.invalidPacks ?? ["Core"],
                ),
            ]),
        ),
    );

    $effect(() => {
        console.log("matchedMerchantIds", matchedMerchantIds());
    });

    const filteredMerchants = $derived(() => {
        let candidates = merchants.filter(
            (merchant) => (merchantItemsMap.get(merchant.id) ?? []).length > 0,
        );

        // If user matched merchant names, filter down to only those
        if (matchedMerchantIds().size > 0) {
            candidates = candidates.filter((m) =>
                matchedMerchantIds().has(m.id),
            );
        }

        return candidates;
    });

    $effect(() => {
        console.log("filteredMerchants", filteredMerchants());
    });

    const isSearchFilterApplied = $derived(
        searchText !== "" ||
            selectedHeroes.length > 0 ||
            selectedTiers.length > 0 ||
            selectedSizes.length > 0 ||
            Object.values(tagStates).some((state) => state !== "unset"),
    );

    const searchedMerchants = $derived(() => {
        if (!isSearchFilterApplied) return [];

        if (selectedMerchant) {
            return filteredMerchants().filter(
                (m) => m.id === selectedMerchant!.id,
            );
        }

        return searchMerchants(
            filteredMerchants(),
            merchantItemsMap,
            searchText,
            selectedSearchLocationOption,
        );
    });

    $effect(() => {
        console.log("searchedMerchants", searchedMerchants());
        console.log("effectiveSearchText:", searchText);
    });

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
                    block: "start",
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
{:else if searchedMerchants().length > 0 || (!isHiddenWhenEmpty && isSearchFilterApplied)}
    <div class="mb-8">
        <LazyLoadList
            items={searchedMerchants()}
            {listItem}
            listItemName="merchant"
            {initialLoad}
        />
    </div>
{:else if !isHiddenWhenEmpty}
    <div class="grid grid-cols-3 gap-1">
        {#each filteredMerchants() as merchant}
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
