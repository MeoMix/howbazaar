import type { ClientSideCardItem, ClientSideCardSkill, ClientSideHero, ClientSideHiddenTag, ClientSideSize, ClientSideTag, ClientSideTierType, TriState } from "$lib/types";
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
    tagStates: Record<ClientSideTag | ClientSideHiddenTag, TriState>,
    selectedSizes: ClientSideSize[],
    searchText: string,
    isSearchNameOnly: boolean,
    isSearchEnchantments: boolean,
    isMatchAnyTags: boolean
): T[] {
    const lowerSearchText = searchText.toLowerCase();

    return cards.filter((card) => {
        const matchesHero =
            selectedHeroes.length === 0 ||
            (card.heroes && selectedHeroes.some((hero) => card.heroes.includes(hero)));
        const matchesTier =
            selectedTiers.length === 0 ||
            (card.startingTier && selectedTiers.includes(card.startingTier));

        // Updated matchesTag logic to use tagStates
        const matchesTag = (() => {
            const tagEntries = Object.entries(tagStates);

            if (isMatchAnyTags) {
                // At least one "on" tag must match (if any are "on"), and "off" tags are ignored
                const hasOnTags = tagEntries.some(([_, state]) => state === "on");

                if (hasOnTags) {
                    return tagEntries.some(([tag, state]) => {
                        const isTagMatch = (cardTag: string) =>
                            cardTag === tag || cardTag === `${tag}Reference`;

                        return (
                            state === "on" &&
                            (card.tags?.some(isTagMatch) ||
                                card.hiddenTags?.some(isTagMatch))
                        );
                    });
                }

                // If no tags are "on", all cards pass the filter
                return true;
            } else {
                // All "on" tags must be present, and no "off" tags can be present
                return tagEntries.every(([tag, state]) => {
                    const isTagMatch = (cardTag: string) =>
                        cardTag === tag || cardTag === `${tag}Reference`;

                    if (state === "on") {
                        // Card must have this "on" tag
                        return (
                            card.tags?.some(isTagMatch) ||
                            card.hiddenTags?.some(isTagMatch)
                        );
                    }

                    if (state === "off") {
                        // Card must not have this "off" tag
                        return (
                            !card.tags?.some(isTagMatch) &&
                            !card.hiddenTags?.some(isTagMatch)
                        );
                    }

                    // "unset" tags don't matter
                    return true;
                });
            }
        })();

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
                    (isSearchEnchantments ? card.enchantments?.some(e =>
                        e.name.toLowerCase().includes(lowerSearchText) ||
                        e.tooltips.some(tip => tip.toLowerCase().includes(lowerSearchText))
                    ) : false)
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