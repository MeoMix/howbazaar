<script lang="ts">
    import type {
        ClientSideMerchantCard,
        ClientSideItemCard,
    } from "$lib/types";
    import LazyLoadList from "./LazyLoadList.svelte";
    import MerchantCardItem from "./MerchantCardItem.svelte";
    import MerchantDescription from "./MerchantDescription.svelte";

    let {
        merchant,
        merchantItems,
        totalItemCount,
    }: {
        merchant: ClientSideMerchantCard;
        merchantItems: ClientSideItemCard[];
        totalItemCount?: number;
    } = $props();

    const id = $derived(merchant.name.replace(/\s+/g, "_"));
</script>

<div class="mt-8 scroll-mt-[80px]" {id}>
    <div class="font-bold text-2xl mb-2">
        {merchant.name}

        ·

        <span class={`text-xl text-bazaar-tan300`}>
            <MerchantDescription description={merchant.description} />
        </span>
    </div>

    <div class={`grid gap-8 mt-4 grid-cols-[auto]`}>
        <LazyLoadList
            items={merchantItems}
            listItemName="item"
            listClasses="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 col-span-full md:col-span-1"
            {totalItemCount}
            batchSize={10}
        >
            {#snippet listItem(card: ClientSideItemCard)}
                <MerchantCardItem {card} />
            {/snippet}
        </LazyLoadList>
    </div>
</div>
