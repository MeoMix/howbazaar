<script lang="ts">
    import { goto } from "$app/navigation";
    import FilterToggle from "./FilterToggle.svelte";
    import { page } from "$app/stores";

    let {
        isShowingAdvancedFilters = $bindable(),
    }: {
        isShowingAdvancedFilters: boolean;
    } = $props();

    function toggleAdvancedFilters() {
        isShowingAdvancedFilters = !isShowingAdvancedFilters;

        let query = new URLSearchParams($page.url.searchParams.toString());
        query.set("isShowingAdvancedFilters", `${isShowingAdvancedFilters}`);
        goto(`?${query.toString()}`, { replaceState: true });
    }
</script>

<FilterToggle
    isEnabled={isShowingAdvancedFilters}
    label="Filters"
    onClick={toggleAdvancedFilters}
/>
