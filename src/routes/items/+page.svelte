<script lang="ts">
    import type { ClientSideCard, ClientSideCardItem } from "$lib/types";
    import CardItem from "$lib/components/CardItem.svelte";
    import { Label, Button } from "flowbite-svelte";

    const { data }: { data: { cards: ClientSideCard[] } } = $props();
    const cardItems = data.cards.filter(
        (card): card is ClientSideCardItem => card.type === "Item",
    );

    const uniqueHeroes = Array.from(
        new Set(cardItems.flatMap((card) => card.heroes)),
    );
    const heroOptions = [
        "Vanessa",
        "Dooley",
        "Pygmalien",
        ...uniqueHeroes.filter(
            (hero) =>
                !["Vanessa", "Dooley", "Pygmalien", "Common"].includes(hero),
        ),
        "Common",
    ];

    const tagOptions = Array.from(
        new Set(cardItems.flatMap((card) => card.tags)),
    ).sort();

    const hiddenTagOptions = Array.from(
        new Set(cardItems.flatMap((card) => card.hiddenTags)),
    ).sort();

    let selectedHeroes = $state([] as string[]);
    let selectedTiers = $state([] as string[]);
    let selectedTags = $state([] as string[]);
    let selectedHiddenTags = $state([] as string[]);

    const minimumTierOptions = ["Bronze", "Silver", "Gold", "Diamond"];

    const handleSelection = (selectedArray: string[], item: string) => {
        if (selectedArray.includes(item)) {
            return selectedArray.filter((i) => i !== item);
        } else {
            return [...selectedArray, item];
        }
    };

    const filteredCards = $derived(
        cardItems.filter((card) => {
            const matchesHero =
                selectedHeroes.length === 0 ||
                selectedHeroes.some((hero) => card.heroes.includes(hero));
            const matchesTier =
                selectedTiers.length === 0 ||
                selectedTiers.includes(card.startingTier);
            const matchesTag =
                selectedTags.length === 0 ||
                selectedTags.some((tag) => card.tags.includes(tag));
            const matchesHiddenTag =
                selectedHiddenTags.length === 0 ||
                selectedHiddenTags.some((hiddenTag) =>
                    card.hiddenTags.includes(hiddenTag),
                );

            return matchesHero && matchesTier && matchesTag && matchesHiddenTag;
        }),
    );
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
    <div>
        <Label class="font-semibold text-lg">Heroes</Label>
        <div class="flex flex-wrap gap-2 mt-2">
            {#each heroOptions as hero}
                <Button
                    size="xs"
                    outline={!selectedHeroes.includes(hero)}
                    pill
                    color={selectedHeroes.includes(hero) ? "primary" : "light"}
                    onclick={() =>
                        (selectedHeroes = handleSelection(
                            selectedHeroes,
                            hero,
                        ))}
                    class="transition-colors focus:outline-none border-2"
                >
                    {hero}
                </Button>
            {/each}
        </div>
    </div>

    <div>
        <Label class="font-semibold text-lg">Starting Tiers</Label>
        <div class="flex flex-wrap gap-2 mt-2">
            {#each minimumTierOptions as tier}
                <Button
                    size="xs"
                    outline={!selectedTiers.includes(tier)}
                    pill
                    color={selectedTiers.includes(tier) ? "primary" : "light"}
                    onclick={() =>
                        (selectedTiers = handleSelection(selectedTiers, tier))}
                    class="transition-colors focus:outline-none border-2"
                >
                    {tier}
                </Button>
            {/each}
        </div>
    </div>

    <div>
        <Label class="font-semibold text-lg">Tags</Label>
        <div class="flex flex-wrap gap-2 mt-2">
            {#each tagOptions as tag}
                <Button
                    size="xs"
                    outline={!selectedTags.includes(tag)}
                    pill
                    color={selectedTags.includes(tag) ? "primary" : "light"}
                    onclick={() =>
                        (selectedTags = handleSelection(selectedTags, tag))}
                    class="transition-colors focus:outline-none border-2"
                >
                    {tag}
                </Button>
            {/each}
        </div>
    </div>

    <div>
        <Label class="font-semibold text-lg">Hidden Tags</Label>
        <div class="flex flex-wrap gap-2 mt-2">
            {#each hiddenTagOptions as hiddenTag}
                <Button
                    size="xs"
                    outline={!selectedHiddenTags.includes(hiddenTag)}
                    pill
                    color={selectedHiddenTags.includes(hiddenTag)
                        ? "primary"
                        : "light"}
                    onclick={() =>
                        (selectedHiddenTags = handleSelection(
                            selectedHiddenTags,
                            hiddenTag,
                        ))}
                    class="transition-colors focus:outline-none border-2"
                >
                    {hiddenTag}
                </Button>
            {/each}
        </div>
    </div>
</div>

<div class="space-y-4">
    {#each filteredCards as card}
        <CardItem {card} />
    {/each}
</div>
