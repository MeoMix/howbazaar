<script lang="ts">
    import type { ClientSideCard, ClientSideCardSkill } from "$lib/types";
    import CardSkill from "$lib/components/CardSkill.svelte";
    import { Label, Select } from "flowbite-svelte";

    const { data }: { data: { cards: ClientSideCard[] } } = $props();

    let selectedHero = $state("All");

    const heroOptions = ["All", "Vanessa", "Dooley", "Pygmalien", "Stelle", "Jules", "Mak", "Common"];
    const cardSkills = data.cards.filter(
        (card): card is ClientSideCardSkill => card.type === "Skill",
    );

    const filteredCards = $derived(
        selectedHero !== "All"
            ? cardSkills.filter((card) => card.heroes.includes(selectedHero))
            : cardSkills,
    );
</script>

<div class="mb-4">
    <Label class="font-semibold text-lg">
        Filter Skills

        <Select
            items={heroOptions.map((hero) => ({ value: hero, name: hero }))}
            bind:value={selectedHero}
            class="w-48"
        />
    </Label>
</div>

<div class="space-y-4">
    {#each filteredCards as card}
        <CardSkill {card} />
    {/each}
</div>
