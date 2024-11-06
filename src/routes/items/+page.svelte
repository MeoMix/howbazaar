<script lang="ts">
    import type { ClientSideCard, ClientSideCardItem } from "$lib/types";
    import CardItem from "$lib/components/CardItem.svelte";

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
    <label class="block font-semibold text-lg">
        Filter Items:
        <select
            bind:value={selectedHero}
            class="border border-gray-300 rounded-md p-2 ml-2 focus:outline-none focus:ring focus:border-blue-300"
        >
            <option value="">All</option>
            {#each heroOptions as hero}
                <option value={hero}>{hero}</option>
            {/each}
        </select>
    </label>
</div>

<div class="space-y-4">
    {#each filteredCardItems as card}
        <CardItem {card} />
    {/each}
</div>
