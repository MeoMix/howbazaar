import type { ClientSideCardCombatEncounter, ClientSideCardItem, ClientSideCardSkill, ClientSideMonster } from "$lib/types";

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
        new Set(cards.flatMap((card) => card.tags))
    ).sort();

    const hiddenTagOptions = Array.from(
        new Set(cards.flatMap((card) => card.hiddenTags))
    ).sort();

    const minimumTierOptions = ["Bronze", "Silver", "Gold", "Diamond"];

    const sizeOptions = ["Small", "Medium", "Large"];

    return {
        heroOptions,
        minimumTierOptions,
        tagOptions,
        hiddenTagOptions,
        sizeOptions
    };
}

// TODO: These types could be tighter
export function filterItemAndSkillCards<T extends { heroes: string[]; startingTier: string; tags: string[]; hiddenTags: string[], size: string }>(
    cards: T[],
    selectedHeroes: string[],
    selectedTiers: string[],
    selectedTags: string[],
    selectedHiddenTags: string[],
    selectedSizes: string[]
): T[] {
    return cards.filter((card) => {
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
        const matchesSizes =
            selectedSizes.length === 0 ||
            (card.size && selectedSizes.includes(card.size));

        return matchesHero && matchesTier && matchesTag && matchesHiddenTag && matchesSizes;
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