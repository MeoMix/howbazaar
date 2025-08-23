<script lang="ts">
    import type {
        ClientSideItemCard,
        Hero,
        HiddenTag,
        ItemSortOption,
        Size,
        Tag,
        TierType,
        TriState,
        EnchantmentType,
    } from "$lib/types";
    import { Label } from "flowbite-svelte";
    import CardItem from "./CardItem.svelte";
    import LazyLoadList from "./LazyLoadList.svelte";
    import Select from "./Select.svelte";
    import Switch from "./Switch.svelte";
    import {
        filterItemCards,
        searchCards,
        sortCards,
    } from "$lib/utils/filterUtils";
    import { onMount } from "svelte";
    import { itemsStore } from "$lib/stores/itemsStore";

    let {
        serverVersion,
        sortOptions,
        selectedHeroes,
        selectedTiers,
        tagStates,
        selectedSizes,
        searchText,
        isMatchAnyTag,
        monsterDropsOnlyState,
        selectedEnchantmentTypes,
        isHiddenWhenEmpty,
    }: {
        serverVersion: string;
        sortOptions: { name: string; value: ItemSortOption }[];
        selectedHeroes: Hero[];
        selectedTiers: TierType[];
        tagStates: Record<Tag | HiddenTag, TriState>;
        selectedSizes: Size[];
        searchText: string;
        isMatchAnyTag: boolean;
        monsterDropsOnlyState: TriState;
        selectedEnchantmentTypes: EnchantmentType[];
        isHiddenWhenEmpty: boolean;
    } = $props();

    let items = $state([] as ClientSideItemCard[]);
    let selectedSortOption = $state("name" as ItemSortOption);
    // TODO: Consider persisting this in a store and/or in local storage
    let areEnchantmentsShown = $state(true);
    let isLoading = $state(false);
    let hasError = $state(false);

    onMount(() => {
        const unsubscribe = itemsStore.subscribe((state) => {
            items = state.items;
            isLoading = state.isLoading;
            hasError = state.hasError;
        });

        itemsStore.load(serverVersion); // Ensures we fetch fresh data if needed

        return unsubscribe;
    });

    const filteredItems = $derived(
        filterItemCards(
            items,
            selectedHeroes,
            selectedTiers,
            tagStates,
            selectedSizes,
            isMatchAnyTag,
            monsterDropsOnlyState,
            selectedEnchantmentTypes,
        ),
    );

    const searchedItems = $derived(
        searchCards(filteredItems, searchText),
    );

    const sortedItems = $derived(
        sortCards(searchedItems, selectedSortOption, searchText),
    );

    const onToggleEnchantments = () => {
        areEnchantmentsShown = !areEnchantmentsShown;
    };
</script>

{#if isLoading}
    <div>Loading items...</div>
{:else if sortedItems.length > 0 || !isHiddenWhenEmpty}
    <LazyLoadList
        items={sortedItems}
        listItemName="item"
        listClasses="space-y-4"
    >
        {#snippet listItem(card: ClientSideItemCard)}
            <CardItem {card} {areEnchantmentsShown} {selectedEnchantmentTypes} />
        {/snippet}

        {#snippet headerControls()}
            <div class="flex items-center space-x-2">
                <Label class="dark:text-bazaar-tan700 text-nowrap"
                    >Sort by</Label
                >
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
    </LazyLoadList>
{/if}
