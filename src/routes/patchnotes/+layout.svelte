<script lang="ts">
    import type { ClientSideItemCard, ClientSideSkillCard } from "$lib/types";
    import { onMount, type Snippet } from "svelte";
    import { itemsStore } from "$lib/stores/itemsStore";
    import { skillsStore } from "$lib/stores/skillsStore";
    import type { PageData } from "../$types";

    let { children, data }: { children: Snippet; data: PageData } = $props();

    let isLoadingItems = $state(false);
    let hasItemsError = $state(false);

    onMount(() => {
        const unsubscribe = itemsStore.subscribe((state) => {
            isLoadingItems = state.isLoading;
            hasItemsError = state.hasError;
        });

        itemsStore.load(data.itemsVersion); // Ensures we fetch fresh data if needed

        return unsubscribe;
    });

    let isLoadingSkills = $state(false);
    let hasSkillsError = $state(false);
    onMount(() => {
        const unsubscribe = skillsStore.subscribe((state) => {
            isLoadingSkills = state.isLoading;
            hasSkillsError = state.hasError;
        });

        skillsStore.load(data.skillsVersion); // Ensures we fetch fresh data if needed

        return unsubscribe;
    });
</script>

{@render children()}
