<script lang="ts">
    import type {
        ClientSideMerchantCard,
        ClientSideItemCard,
    } from "$lib/types";
    import { filterItemCards } from "$lib/utils/filterUtils";
    import MerchantCardItem from "./MerchantCardItem.svelte";

    let {
        merchant,
        items,
    }: { merchant: ClientSideMerchantCard; items: ClientSideItemCard[] } =
        $props();
    const id = $derived(merchant.name.replace(/\s+/g, "_"));

    const filteredItems = $derived(
        filterItemCards(
            items,
            merchant.filters.heros ?? [],
            merchant.filters.tiers ?? [],
            merchant.filters.tagStates ?? {},
            merchant.filters.sizes ?? [],
            true,
            false,
            "unset",
        ),
    );

    // TODO: Derive items from merchant filter + loading items
</script>

<div class="mt-8 scroll-mb-[8px]" {id}>
    <div class="font-bold text-2xl mb-2">
        {merchant.name}

        ·

        <span class={`text-xl`}>
            {merchant.description}
        </span>
    </div>

    <div
        class="grid gap-2 grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 col-span-full md:col-span-1"
    >
        {#each filteredItems as item, index}
            <div class="flex flex-col">
                <!-- Conditionally show title for the first column -->
                {#if index === 0}
                    <div class="font-semibold text-lg md:text-xl mb-2">
                        Items
                    </div>
                {/if}
                {#if index !== 0}
                    <div
                        class="invisible font-semibold text-lg md:text-xl mb-2"
                    >
                        Items
                    </div>
                {/if}
                <MerchantCardItem
                    card={item}
                />
            </div>
        {/each}
    </div>
</div>
