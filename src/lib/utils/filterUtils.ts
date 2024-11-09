import type { ClientSideCardItem, ClientSideCardSkill, ClientSideMonster } from "$lib/types";

// TODO: if this diverges any more maybe separate entirely
export function prepareItemAndSkillFilterOptions(cards: (ClientSideCardItem | ClientSideCardSkill)[]) {
    const uniqueHeroes = Array.from(
        new Set(cards.flatMap((card) => card.heroes))
    );
    const heroOptions = ["Vanessa", "Dooley", "Pygmalien",
        ...uniqueHeroes.filter(hero => !["Vanessa", "Dooley", "Pygmalien", "Common"].includes(hero)),
        "Common"
    ];

    const tagOptions = Array.from(
        new Set(cards.flatMap((card) => filterTags(card.tags, card.hiddenTags)))
    ).sort();

    const minimumTierOptions = ["Bronze", "Silver", "Gold", "Diamond"];

    const sizeOptions = ["Small", "Medium", "Large"];

    return {
        heroOptions,
        minimumTierOptions,
        tagOptions,
        sizeOptions
    };
}

// TODO: These types could be tighter
export function filterItemAndSkillCards<T extends { heroes: string[]; startingTier: string; tags: string[]; hiddenTags: string[], size: string }>(
    cards: T[],
    selectedHeroes: string[],
    selectedTiers: string[],
    selectedTags: string[],
    selectedSizes: string[]
): T[] {
    return cards.filter((card) => {
        const matchesHero =
            selectedHeroes.length === 0 ||
            (card.heroes && selectedHeroes.some((hero) => card.heroes.includes(hero)));
        const matchesTier =
            selectedTiers.length === 0 ||
            (card.startingTier && selectedTiers.includes(card.startingTier));

        // Make this a looser match than "includes" to support "Economy" matching "EconomyReference"
        const matchesTag =
            selectedTags.length === 0 ||
            (card.tags &&
                selectedTags.some((tag) =>
                    card.tags.some((cardTag) => cardTag.startsWith(tag)) ||
                    card.hiddenTags.some((hiddenTag) => hiddenTag.startsWith(tag))
                )
            );

        const matchesSizes =
            selectedSizes.length === 0 ||
            (card.size && selectedSizes.includes(card.size));

        return matchesHero && matchesTier && matchesTag && matchesSizes;
    });
}

export function filterMonsters(monsters: ClientSideMonster[], selectedLevels: number[]) {
    return monsters.filter((monster) => {
        const matchesLevel =
            selectedLevels.length === 0 ||
            (monster.attributes.level && selectedLevels.includes(monster.attributes.level));

        return matchesLevel;
    });
}

// Users don't want to see "Reference" in their tags because it's unintuitive to them.
// The underlying game implementation needs to keep the two types of tags distinct, though.
// Sometimes there's duplicates (i.e. Slow vs SlowReference) and other times there aren't (i.e. EconomyReference)
// So, drop Reference, but then ensure the list is distinct.
export function filterTags(tags: string[], hiddenTags: string[]) {
    return Array.from(
        new Set([...tags, ...hiddenTags].map(tag => tag.replace('Reference', '')))
    ).sort();
}