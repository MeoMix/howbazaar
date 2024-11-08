<script lang="ts">
    import type { ClientSideCard, ClientSideCardItem } from "$lib/types";
    import CardItem from "$lib/components/CardItem.svelte";
    import { Label, Select } from "flowbite-svelte";

    const { data }: { data: { cards: ClientSideCard[] } } = $props();

    let selectedHero = $state("");

    const heroOptions = ["Vanessa", "Dooley", "Pygmalien", "Common"];

    const cardItems = data.cards.filter(
        (card): card is ClientSideCardItem => card.type === "Item",
    );

    const filteredCardItems = $derived(
        selectedHero
            ? cardItems.filter((card) => card.heroes.includes(selectedHero))
            : cardItems,
    );
</script>

<div class="mb-4">
    <Label class="font-semibold text-lg">
        Filter Items

        <Select
            items={heroOptions.map((hero) => ({ value: hero, name: hero }))}
            class="w-48"
        />
    </Label>
</div>

<div class="space-y-4">
    {#each filteredCardItems as card}
        <CardItem {card} />
    {/each}
</div>
