<script lang="ts">
    import { onMount, tick } from "svelte";
    import type {
        ClientSideItemCard,
        ClientSideMerchantCard,
    } from "$lib/types";
    import { merchantsStore } from "$lib/stores/merchantsStore";
    import LazyLoadList from "./LazyLoadList.svelte";
    import { searchMerchants } from "$lib/utils/filterUtils";
    import MerchantCard from "./MerchantCard.svelte";
    import MerchantPreview from "./MerchantPreview.svelte";
    import { itemsStore } from "$lib/stores/itemsStore";

    let {
        serverVersion,
        searchText,
        selectedMerchant,
        isHiddenWhenEmpty,
        initialLoad = true,
    }: {
        serverVersion: string;
        searchText: string;
        selectedMerchant: ClientSideMerchantCard | undefined;
        isHiddenWhenEmpty: boolean;
        initialLoad?: boolean;
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

        itemsStore.load(serverVersion); // Ensures we fetch fresh data if needed

        const unsubscribeMerchants = merchantsStore.subscribe((state) => {
            merchants = state.merchants;
            isLoadingMerchants = state.isLoading;
            hasErrorMerchants = state.hasError;
        });

        merchantsStore.load(serverVersion); // Ensures we fetch fresh data if needed

        return () => {
            unsubscribeMerchants();
            unsubscribeItems();
        };
    });

    const filteredMerchants = $derived(merchants.filter(() => true));

    const searchedMerchants = $derived(
        searchText === "" ? [] : searchMerchants(filteredMerchants, searchText),
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
    <MerchantCard {merchant} {items} />
{/snippet}

{#if isLoadingMerchants || isLoadingItems}
    <div>Loading merchants...</div>
{:else if searchedMerchants.length > 0 || (!isHiddenWhenEmpty && searchText != "")}
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

            {#if merchant.id === selectedMerchant?.id}
                <MerchantCard merchant={selectedMerchant} {items} />
            {/if}
        {/each}
    </div>
{/if}
