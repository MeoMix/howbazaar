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
    import { Label } from "flowbite-svelte";
    import CardItem from "./CardItem.svelte";
    import LazyLoadList from "./LazyLoadList.svelte";
    import Select from "./Select.svelte";
    import Switch from "./Switch.svelte";
    import { filterItemCards, sortCards } from "$lib/utils/filterUtils";
    import { onMount } from "svelte";
    import { itemsStore } from "$lib/stores/itemsStore";
    import { fetchJson } from "$lib/utils/fetchUtils";

    let {
        serverVersion,
        sortOptions,
        selectedHeroes,
        selectedTiers,
        tagStates,
        selectedSizes,
        searchText,
        isSearchEnchantments,
        isMatchAnyTag,
        isMonsterDropsOnly,
    }: {
        serverVersion: string;
        sortOptions: { name: string; value: ItemSortOptions }[];
        selectedHeroes: Hero[];
        selectedTiers: TierType[];
        tagStates: Record<Tag | HiddenTag, TriState>;
        selectedSizes: Size[];
        searchText: string;
        isSearchEnchantments: boolean;
        isMatchAnyTag: boolean;
        isMonsterDropsOnly: boolean;
    } = $props();

    let items = $state([] as ClientSideItemCard[]);
    let selectedSortOption = $state("name" as ItemSortOptions);
    // TODO: Consider persisting this in a store and/or in local storage
    let areEnchantmentsShown = $state(true);
    let isLoading = $state(false);
    let hasError = $state(false);
    let version = $state(null as string | null);

    onMount(async () => {
        itemsStore.subscribe((store) => {
            console.log("yo");
            // If the server informs us that what's written to the store is stale - don't use it.
            if (serverVersion === store.version) {
                items = store.items;
                version = store.version;
            }
        })();

        if (items.length === 0 || !version) {
            try {
                isLoading = true;
                const response = await fetchJson<ClientSideItemCard[]>(
                    "/api/items",
                    serverVersion,
                );
                itemsStore.set({
                    items: response.data,
                    version: response.version,
                });
                items = response.data;
                version = response.version;
            } catch (error) {
                console.error(error);
                hasError = true;
            } finally {
                isLoading = false;
            }
        }
    });

    const filteredItems = $derived(
        sortCards(
            filterItemCards(
                items,
                selectedHeroes,
                selectedTiers,
                tagStates,
                selectedSizes,
                searchText,
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
</script>

{#snippet listItem(card: ClientSideItemCard)}
    <CardItem {card} {areEnchantmentsShown} />
{/snippet}

{#snippet headerControls()}
    <div class="flex items-center space-x-2">
        <Label class="dark:text-bazaar-tan700">Sort by</Label>
        <Select
            options={sortOptions}
            selectedOption={selectedSortOption}
            onSelectOption={(option) => {
                selectedSortOption = option;
            }}
        />
    </div>

    <Switch
        isChecked={areEnchantmentsShown}
        onClick={onToggleEnchantments}
        offLabel="Show Enchantments"
    />
{/snippet}

{#if isLoading}
    <div>Loading items...</div>
{:else}
    <LazyLoadList
        items={filteredItems}
        {listItem}
        {headerControls}
        listItemName="item"
    />
{/if}
