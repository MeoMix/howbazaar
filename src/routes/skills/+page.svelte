<script lang="ts">
    import type { ClientSideCard } from "$lib/types";
    import CardSkill from "$lib/components/CardSkill.svelte";

    const { data }: { data: { cards: ClientSideCard[] } } = $props();

    let selectedHero = $state("");

    const heroOptions = ["Vanessa", "Dooley", "Pygmalien", "Common"];
    const displayedCards = data.cards.filter((card) => card.type === "Skill");

    const filteredCards = $derived(
        selectedHero
            ? displayedCards.filter((card) =>
                  card.heroes.includes(selectedHero),
              )
            : displayedCards,
    );
</script>

<div class="mb-4">
    <label class="block font-semibold text-lg">
        Filter Skills:
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
    {#each filteredCards as card}
        <CardSkill {card} />
    {/each}
</div>
