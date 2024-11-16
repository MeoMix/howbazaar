import type { ClientSideCardItem, ClientSideCardSkill, ClientSideHero, ClientSideHiddenTag, ClientSideSize, ClientSideTag, ClientSideTierType, TriState } from "$lib/types";
import type { Entries } from "type-fest";

export function getCardFilterOptions(cards: (ClientSideCardItem | ClientSideCardSkill)[]) {
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

function matchesHero(cardHeroes: ClientSideHero[], selectedHeroes: ClientSideHero[]): boolean {
    return selectedHeroes.length === 0 || selectedHeroes.some(hero => cardHeroes.includes(hero));
}

function matchesHeroState(
    cardHeroes: ClientSideHero[],
    heroStates: Record<ClientSideHero, TriState>,
    isMatchAnyHero: boolean
): boolean {
    const heroEntries = Object.entries(heroStates);

    if (isMatchAnyHero) {
        const hasOnHeroes = heroEntries.some(([_, state]) => state === "on");
        if (hasOnHeroes) {
            return heroEntries.some(([hero, state]) => {
                return state === "on" && cardHeroes.some(cardHero => cardHero === hero);
            });
        }
        return true; // No heroes are "on"; pass all cards
    }

    return heroEntries.every(([hero, state]) => {
        if (state === "on") {
            return cardHeroes.some(cardHero => cardHero === hero);
        }
        if (state === "off") {
            return !cardHeroes.some(cardHero => cardHero === hero);
        }
        return true; // "unset" tags don't affect filtering
    });
}

function matchesTier(cardTier: ClientSideTierType, selectedTiers: ClientSideTierType[]): boolean {
    return selectedTiers.length === 0 || selectedTiers.includes(cardTier);
}

function matchesTagState(
    cardTags: string[],
    cardHiddenTags: string[],
    tagStates: Record<ClientSideTag | ClientSideHiddenTag, TriState>,
    isMatchAnyTag: boolean
): boolean {
    const tagEntries = Object.entries(tagStates);

    if (isMatchAnyTag) {
        const hasOnTags = tagEntries.some(([_, state]) => state === "on");
        if (hasOnTags) {
            return tagEntries.some(([tag, state]) => {
                const isTagMatch = (cardTag: string) => cardTag === tag || cardTag === `${tag}Reference`;
                return state === "on" && (cardTags.some(isTagMatch) || cardHiddenTags.some(isTagMatch));
            });
        }
        return true; // No tags are "on"; pass all cards
    }

    return tagEntries.every(([tag, state]) => {
        const isTagMatch = (cardTag: string) => cardTag === tag || cardTag === `${tag}Reference`;
        if (state === "on") {
            return cardTags.some(isTagMatch) || cardHiddenTags.some(isTagMatch);
        }
        if (state === "off") {
            return !cardTags.some(isTagMatch) && !cardHiddenTags.some(isTagMatch);
        }
        return true; // "unset" tags don't affect filtering
    });
}

function matchesSearchText(
    card: ClientSideCardItem | ClientSideCardSkill,
    lowerSearchText: string,
    isSearchNameOnly: boolean,
    isSearchEnchantments: boolean
): boolean {
    if (lowerSearchText === '') return true;

    const validTiers = card.tiers
        ? (Object.entries(card.tiers) as Entries<typeof card.tiers>)
            .filter(([tierType, tier]) => tierType !== "Legendary" && tier.tooltips.length !== 0)
        : [];

    return isSearchNameOnly
        ? card.name.toLowerCase().includes(lowerSearchText)
        : card.name.toLowerCase().includes(lowerSearchText) ||
        card.tags?.some(tag => tag.toLowerCase().includes(lowerSearchText)) ||
        card.hiddenTags?.some(hiddenTag => hiddenTag.toLowerCase().includes(lowerSearchText)) ||
        card.size?.toLowerCase().includes(lowerSearchText) ||
        card.heroes?.some(hero => hero.toLowerCase().includes(lowerSearchText)) ||
        validTiers.some(([tierName, tier]) =>
            tierName.toLowerCase().includes(lowerSearchText) ||
            tier.tooltips.some(tooltip => tooltip.toLowerCase().includes(lowerSearchText)) ||
            tier.attributes.some(attribute =>
                `${attribute.name} ${attribute.value} ${attribute.valueDescriptor}`.toLowerCase().includes(lowerSearchText)
            )
        ) ||
        (isSearchEnchantments && card.enchantments?.some(e =>
            e.name.toLowerCase().includes(lowerSearchText) ||
            e.tooltips.some(tip => tip.toLowerCase().includes(lowerSearchText))
        ));
}

export function filterItemCards(
    cards: ClientSideCardItem[],
    selectedHeroes: ClientSideHero[],
    selectedTiers: ClientSideTierType[],
    tagStates: Record<ClientSideTag | ClientSideHiddenTag, TriState>,
    selectedSizes: ClientSideSize[],
    searchText: string,
    isSearchNameOnly: boolean,
    isSearchEnchantments: boolean,
    isMatchAnyTag: boolean
): ClientSideCardItem[] {
    const lowerSearchText = searchText.toLowerCase();

    return cards.filter(card => {
        return (
            matchesHero(card.heroes, selectedHeroes) &&
            matchesTier(card.startingTier, selectedTiers) &&
            matchesTagState(card.tags, card.hiddenTags, tagStates, isMatchAnyTag) &&
            (selectedSizes.length === 0 || (card.size && selectedSizes.includes(card.size))) &&
            matchesSearchText(card, lowerSearchText, isSearchNameOnly, isSearchEnchantments)
        );
    });
}

export function filterSkillCards(
    cards: ClientSideCardSkill[],
    heroStates: Record<ClientSideHero, TriState>,
    selectedTiers: ClientSideTierType[],
    tagStates: Record<ClientSideTag | ClientSideHiddenTag, TriState>,
    searchText: string,
    isSearchNameOnly: boolean,
    isMatchAnyTag: boolean,
    isMatchAnyHero: boolean
): ClientSideCardSkill[] {
    const lowerSearchText = searchText.toLowerCase();

    return cards.filter(card => {
        return (
            matchesHeroState(card.heroes, heroStates, isMatchAnyHero) &&
            matchesTier(card.startingTier, selectedTiers) &&
            matchesTagState(card.tags, card.hiddenTags, tagStates, isMatchAnyTag) &&
            matchesSearchText(card, lowerSearchText, isSearchNameOnly, false)
        );
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