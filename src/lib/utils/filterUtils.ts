import type { ClientSideCardItem, ClientSideCardSkill, ClientSideHero, ClientSideHiddenTag, ClientSideSize, ClientSideTag, ClientSideTierType } from "$lib/types";
import type { Entries } from "type-fest";

export function prepareItemAndSkillFilterOptions(cards: (ClientSideCardItem | ClientSideCardSkill)[]) {
    // TODO: Technically these option types could be tighter than string
    const heroOptions = ["Vanessa", "Pygmalien", "Dooley", "Jules", "Stelle", "Mak", "Common"].map(hero => ({ name: hero, value: hero }));
    const minimumTierOptions = ["Bronze", "Silver", "Gold", "Diamond", "Legendary"].map(minimumTier => ({ name: minimumTier, value: minimumTier }));
    const sizeOptions = ["Small", "Medium", "Large"].map(size => ({ name: size, value: size }));
    const tagOptions = Array.from(
        new Set(cards.flatMap((card) => filterTags(card.tags, card.hiddenTags)))
    ).sort().map(tag => ({ name: tag, value: tag }));

    return {
        heroOptions,
        minimumTierOptions,
        tagOptions,
        sizeOptions
    };
}

export function filterItemAndSkillCards<T extends ClientSideCardItem | ClientSideCardSkill>(
    cards: T[],
    selectedHeroes: ClientSideHero[],
    selectedTiers: ClientSideTierType[],
    selectedTags: (ClientSideTag | ClientSideHiddenTag)[],
    selectedSizes: ClientSideSize[],
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
        // Don't just use "startsWith" though because there's "Heal" and "Health" which are distinct.
        const matchesTag = selectedTags.length === 0 || (card.tags && (
            mustMatchAllTags
                ? selectedTags.every((tag) =>
                    card.tags.some((cardTag) =>
                        cardTag === tag || cardTag === `${tag}Reference`
                    ) ||
                    card.hiddenTags.some((hiddenTag) =>
                        hiddenTag === tag || hiddenTag === `${tag}Reference`
                    )
                )
                : selectedTags.some((tag) =>
                    card.tags.some((cardTag) =>
                        cardTag === tag || cardTag === `${tag}Reference`
                    ) ||
                    card.hiddenTags.some((hiddenTag) =>
                        hiddenTag === tag || hiddenTag === `${tag}Reference`
                    )
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
                    card.tags?.some(tag => tag.toLowerCase().includes(lowerSearchText)) ||
                    card.hiddenTags?.some(hiddenTag => hiddenTag.toLowerCase().includes(lowerSearchText)) ||
                    card.size?.toLowerCase().includes(lowerSearchText) ||
                    card.heroes?.some(hero => hero.toLowerCase().includes(lowerSearchText)) ||
                    validTiers.some(([tierName, tier]) => tierName.toLowerCase().includes(lowerSearchText) || tier.tooltips.some(tooltip => tooltip.toLowerCase().includes(lowerSearchText) || tier.attributes.some(attribute => `${attribute.name} ${attribute.value} ${attribute.valueDescriptor}`.toLowerCase().includes(lowerSearchText)))) ||
                    card.enchantments?.some(e =>
                        e.name.toLowerCase().includes(lowerSearchText) ||
                        e.tooltips.some(tip => tip.toLowerCase().includes(lowerSearchText))
                    )
                )
        );

        return matchesHero && matchesTier && matchesTag && matchesSizes && matchesSearchText;
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