<script lang="ts">
    import type {
        ClientSideMerchantCard,
        ClientSideItemCard,
    } from "$lib/types";
    import MerchantCardItem from "./MerchantCardItem.svelte";

    let {
        merchant,
        merchantItems,
    }: {
        merchant: ClientSideMerchantCard;
        merchantItems: ClientSideItemCard[];
    } = $props();
    const id = $derived(merchant.name.replace(/\s+/g, "_"));
</script>

<div class="mt-8 scroll-mb-[8px]" {id}>
    <div class="font-bold text-2xl mb-2">
        {merchant.name}

        ·

        <span class={`text-xl`}>
            {merchant.description}
        </span>
    </div>

    <div class={`grid gap-8 mt-4 grid-cols-[auto]`}>
        <div
            class="grid gap-2 grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 col-span-full md:col-span-1"
        >
            {#each merchantItems as item}
                <div class="flex flex-col">
                    <MerchantCardItem card={item} />
                </div>
            {/each}
        </div>
    </div>
</div>
