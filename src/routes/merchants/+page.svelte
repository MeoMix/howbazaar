<script lang="ts">
    import MerchantFilters from "$lib/components/MerchantFilters.svelte";
    import MerchantList from "$lib/components/MerchantList.svelte";
    import type { ClientSideMerchantCard } from "$lib/types";
    import type { PageData } from "./$types";

    const { data }: { data: PageData } = $props();

    let searchText = $state("");
    let selectedMerchant = $state() as ClientSideMerchantCard | undefined;
</script>

<svelte:head>
    <title>Merchants · How Bazaar</title>
</svelte:head>

<div
    class="w-full max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl"
>
    <MerchantFilters />

    <MerchantList
        serverVersion={data.version}
        {searchText}
        {selectedMerchant}
        isHiddenWhenEmpty={false}
    />
</div>
