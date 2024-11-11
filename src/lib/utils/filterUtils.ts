import type { ClientSideCardItem, ClientSideCardSkill, ClientSideMonster, ClientSideTier, ClientSideTierType } from "$lib/types";
import type { Entries } from "type-fest";

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
export function filterItemAndSkillCards<T extends { heroes: string[]; startingTier: string; tags: string[]; hiddenTags: string[], size: string; name: string; tooltips?: string[]; tiers?: { [key in ClientSideTierType]: ClientSideTier }, enchantments?: { name: string; tooltips: string[] }[] }>(
    cards: T[],
    selectedHeroes: string[],
    selectedTiers: string[],
    selectedTags: string[],
    selectedSizes: string[],
    searchText: string,
    isSearchNameOnly: boolean,
    mustMatchAllTags: boolean
): T[] {
    const lowerSearchText = searchText.toLowerCase();

    return cards.filter((card) => {
        const matchesHero =
            selectedHeroes.length === 0 ||
            (card.heroes && selectedHeroes.some((hero) => card.heroes.includes(hero)));
        const matchesTier =
            selectedTiers.length === 0 ||
            (card.startingTier && selectedTiers.includes(card.startingTier));

        // Make this a looser match than "includes" to support "Economy" matching "EconomyReference"
        const matchesTag = selectedTags.length === 0 || (card.tags && (
            mustMatchAllTags
                ? selectedTags.every((tag) =>
                    card.tags.some((cardTag) => cardTag.startsWith(tag)) ||
                    card.hiddenTags.some((hiddenTag) => hiddenTag.startsWith(tag))
                )
                : selectedTags.some((tag) =>
                    card.tags.some((cardTag) => cardTag.startsWith(tag)) ||
                    card.hiddenTags.some((hiddenTag) => hiddenTag.startsWith(tag))
                )
        ));

        const matchesSizes =
            selectedSizes.length === 0 ||
            (card.size && selectedSizes.includes(card.size));

        const validTiers = card.tiers ? (Object.entries(card.tiers) as Entries<typeof card.tiers>).filter(([tierType, tier]) => tierType !== "Legendary" && tier.tooltips.length !== 0) : [];

        const matchesSearchText = lowerSearchText === '' || (
            isSearchNameOnly
                ? card.name.toLowerCase().includes(lowerSearchText)
                : (
                    card.name.toLowerCase().includes(lowerSearchText) ||
                    card.tooltips?.some(tip => tip.toLowerCase().includes(lowerSearchText)) ||
                    card.tags?.some(tag => tag.toLowerCase().includes(lowerSearchText)) ||
                    card.hiddenTags?.some(hiddenTag => hiddenTag.toLowerCase().includes(lowerSearchText)) ||
                    card.size?.toLowerCase().includes(lowerSearchText) ||
                    card.heroes?.some(hero => hero.toLowerCase().includes(lowerSearchText)) ||
                    validTiers.some(([tierName]) => tierName.toLowerCase().includes(lowerSearchText)) ||
                    card.enchantments?.some(e =>
                        e.name.toLowerCase().includes(lowerSearchText) ||
                        e.tooltips.some(tip => tip.toLowerCase().includes(lowerSearchText))
                    )
                )
        );

        return matchesHero && matchesTier && matchesTag && matchesSizes && matchesSearchText;
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