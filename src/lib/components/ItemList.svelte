<script lang="ts">
    import type {
        ClientSideItemCard,
        Hero,
        HiddenTag,
        ItemSortOption,
        ItemSearchLocationOption,
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

    let {
        serverVersion,
        sortOptions,
        selectedHeroes,
        selectedTiers,
        tagStates,
        selectedSizes,
        searchText,
        selectedSearchLocationOption,
        isMatchAnyTag,
        isMonsterDropsOnly,
        latestExpansionOnlyState,
        isHiddenWhenEmpty,
    }: {
        serverVersion: string;
        sortOptions: { name: string; value: ItemSortOption }[];
        selectedHeroes: Hero[];
        selectedTiers: TierType[];
        tagStates: Record<Tag | HiddenTag, TriState>;
        selectedSizes: Size[];
        searchText: string;
        selectedSearchLocationOption: ItemSearchLocationOption;
        isMatchAnyTag: boolean;
        isMonsterDropsOnly: boolean;
        latestExpansionOnlyState: TriState;
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
        sortCards(
            filterItemCards(
                items,
                selectedHeroes,
                selectedTiers,
                tagStates,
                selectedSizes,
                searchText,
                selectedSearchLocationOption,
                isMatchAnyTag,
                isMonsterDropsOnly,
                latestExpansionOnlyState,
            ),
            selectedSortOption,
            searchText,
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
        <Label class="dark:text-bazaar-tan700 text-nowrap">Sort by</Label>
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
{:else if filteredItems.length > 0 || !isHiddenWhenEmpty}
    <LazyLoadList
        items={filteredItems}
        {listItem}
        {headerControls}
        listItemName="item"
    />
{/if}
