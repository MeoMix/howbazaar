<script lang="ts">
    import type { ClientSideCard, ClientSideCardItem } from "$lib/types";
    import CardItem from "$lib/components/CardItem.svelte";
    import { Label, Select } from "flowbite-svelte";

    const { data }: { data: { cards: ClientSideCard[] } } = $props();

    let selectedHero = $state("All");

    const heroOptions = ["All", "Vanessa", "Dooley", "Pygmalien", "Stelle", "Jules", "Mak", "Common"];
    const cardItems = data.cards.filter(
        (card): card is ClientSideCardItem => card.type === "Item",
    );

    const filteredCards = $derived(
        selectedHero !== "All"
            ? cardItems.filter((card) => card.heroes.includes(selectedHero))
            : cardItems,
    );
</script>

<div class="mb-4">
    <Label class="font-semibold text-lg">
        Filter Items

        <Select
            items={heroOptions.map((hero) => ({ value: hero, name: hero }))}
            bind:value={selectedHero}
            class="w-48"
        />
    </Label>
</div>

<div class="space-y-4">
    {#each filteredCards as card}
        <CardItem {card} />
    {/each}
</div>
