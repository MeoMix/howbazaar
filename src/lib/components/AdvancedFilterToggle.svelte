<script lang="ts">
    import { goto } from "$app/navigation";
    import FilterToggle from "./FilterToggle.svelte";
    import { page } from "$app/state";
    import { AdjustmentsHorizontalOutline } from "flowbite-svelte-icons";

    let {
        isShowingAdvancedFilters = $bindable(),
    }: {
        isShowingAdvancedFilters: boolean;
    } = $props();

    function toggleAdvancedFilters() {
        isShowingAdvancedFilters = !isShowingAdvancedFilters;

        let query = new URLSearchParams(page.url.searchParams.toString());
        query.set("isShowingAdvancedFilters", `${isShowingAdvancedFilters}`);
        goto(`?${query.toString()}`, { replaceState: true });
    }
</script>

<FilterToggle
    isEnabled={isShowingAdvancedFilters}
    onClick={toggleAdvancedFilters}
>
    {#snippet icon()}
        <AdjustmentsHorizontalOutline class="w-7 h-7" />
    {/snippet}
</FilterToggle>
