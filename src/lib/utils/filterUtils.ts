import type { ClientSideCard, ClientSideCardItem, ClientSideCardSkill } from "$lib/types";

export function prepareFilterOptions(cards: ClientSideCard[]) {
    const uniqueHeroes = Array.from(
        new Set(cards.flatMap((card) => card.heroes))
    );
    const heroOptions = ["Vanessa", "Dooley", "Pygmalien",
        ...uniqueHeroes.filter(hero => !["Vanessa", "Dooley", "Pygmalien", "Common"].includes(hero)),
        "Common"
    ];

    const tagOptions = Array.from(
        new Set(cards.flatMap((card) => card.tags))
    ).sort();

    const hiddenTagOptions = Array.from(
        new Set(cards.flatMap((card) => card.hiddenTags))
    ).sort();

    const minimumTierOptions = ["Bronze", "Silver", "Gold", "Diamond"];

    return {
        heroOptions,
        minimumTierOptions,
        tagOptions,
        hiddenTagOptions
    };
}

// TODO: These types could be tighter
export function filterCards<T extends { heroes: string[]; startingTier: string; tags: string[]; hiddenTags: string[] }>(
    cardItems: T[],
    selectedHeroes: string[],
    selectedTiers: string[],
    selectedTags: string[],
    selectedHiddenTags: string[]
): T[] {
    return cardItems.filter((card) => {
        const matchesHero =
            selectedHeroes.length === 0 ||
            (card.heroes && selectedHeroes.some((hero) => card.heroes.includes(hero)));
        const matchesTier =
            selectedTiers.length === 0 ||
            (card.startingTier && selectedTiers.includes(card.startingTier));
        const matchesTag =
            selectedTags.length === 0 ||
            (card.tags && selectedTags.some((tag) => card.tags.includes(tag)));
        const matchesHiddenTag =
            selectedHiddenTags.length === 0 ||
            (card.hiddenTags && selectedHiddenTags.some((hiddenTag) => card.hiddenTags.includes(hiddenTag)));

        return matchesHero && matchesTier && matchesTag && matchesHiddenTag;
    });
}