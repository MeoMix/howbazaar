import type { ClientSideItemCard, ClientSideSkillCard, Hero, HiddenTag, Size, Tag, TierType, TriState } from "$lib/types";
import type { Entries } from "type-fest";

const heroes = ["Vanessa", "Pygmalien", "Dooley", "Jules", "Stelle", "Mak", "Common"] as const;
const tierTypes = ["Bronze", "Silver", "Gold", "Diamond", "Legendary"] as const;
const sizes = ["Small", "Medium", "Large"];

export function getCardFilterOptions(cards: (ClientSideItemCard | ClientSideSkillCard)[]) {
    const heroOptions = heroes.map(hero => ({ name: hero, value: hero }));
    const minimumTierOptions = tierTypes.map(minimumTier => ({ name: minimumTier, value: minimumTier }));
    const sizeOptions = sizes.map(size => ({ name: size, value: size }));
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

function matchesHero(cardHeroes: Hero[], selectedHeroes: Hero[]): boolean {
    return selectedHeroes.length === 0 || selectedHeroes.some(hero => cardHeroes.includes(hero));
}

function matchesHeroState(
    cardHeroes: Hero[],
    heroStates: Record<Hero, TriState>,
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

function matchesTier(cardTier: TierType, selectedTiers: TierType[]): boolean {
    return selectedTiers.length === 0 || selectedTiers.includes(cardTier);
}

function matchesTagState(
    cardTags: string[],
    cardHiddenTags: string[],
    tagStates: Record<Tag | HiddenTag, TriState>,
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
    card: ClientSideItemCard | ClientSideSkillCard,
    lowerSearchText: string,
    isSearchNameOnly: boolean,
    isSearchEnchantments: boolean
): boolean {
    if (lowerSearchText === '') return true;

    const validTiers = card.tiers
        ? (Object.entries(card.tiers) as Entries<typeof card.tiers>)
            .filter(([tierType, tier]) => tierType !== "Legendary" && tier.tooltips.length !== 0)
        : [];

    // Substring and fuzzy matching functions
    const substringMatch = (text: string, searchText: string): boolean =>
        text.toLowerCase().includes(searchText.toLowerCase());

    const fuzzyMatch = (text: string, searchText: string, threshold: number = 1): boolean => {
        const distance = levenshtein(text.toLowerCase(), searchText.toLowerCase());
        return distance <= threshold;
    };

    const levenshtein = (a: string, b: string): number => {
        const matrix = Array.from({ length: a.length + 1 }, (_, i) =>
            Array(b.length + 1).fill(i)
        );

        for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

        for (let i = 1; i <= a.length; i++) {
            for (let j = 1; j <= b.length; j++) {
                const cost = a[i - 1] === b[j - 1] ? 0 : 1;
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1, // Deletion
                    matrix[i][j - 1] + 1, // Insertion
                    matrix[i - 1][j - 1] + cost // Substitution
                );
            }
        }

        return matrix[a.length][b.length];
    };

    const hybridMatch = (text: string, searchText: string): boolean => {
        const isShortInput = searchText.length <= 3; // Threshold to treat short inputs differently
        return substringMatch(text, searchText) || (!isShortInput && fuzzyMatch(text, searchText));
    };

    const hybridMatchArray = (arr: string[] | undefined, searchText: string): boolean =>
        arr?.some(item => hybridMatch(item, searchText)) ?? false;

    const hybridMatchTier = validTiers.some(([tierName, tier]) =>
        hybridMatch(tierName, lowerSearchText) ||
        tier.tooltips.some(tooltip => hybridMatch(tooltip, lowerSearchText))
    );

    const hybridMatchEnchantments = isSearchEnchantments && ('enchantments' in card) && card.enchantments.some(e =>
        hybridMatch(e.name, lowerSearchText) ||
        e.tooltips.some(tip => hybridMatch(tip, lowerSearchText))
    );

    return isSearchNameOnly
        ? hybridMatch(card.name, lowerSearchText)
        : hybridMatch(card.name, lowerSearchText) ||
        hybridMatchArray(card.tags, lowerSearchText) ||
        hybridMatchArray(card.hiddenTags, lowerSearchText) ||
        (card.size && hybridMatch(card.size, lowerSearchText)) ||
        hybridMatchArray(card.heroes, lowerSearchText) ||
        hybridMatchTier ||
        hybridMatchEnchantments;
}

export function filterItemCards(
    cards: ClientSideItemCard[],
    selectedHeroes: Hero[],
    selectedTiers: TierType[],
    tagStates: Record<Tag | HiddenTag, TriState>,
    selectedSizes: Size[],
    searchText: string,
    isSearchNameOnly: boolean,
    isSearchEnchantments: boolean,
    isMatchAnyTag: boolean
): ClientSideItemCard[] {
    const lowerSearchText = searchText.toLowerCase();

    // Apply all filters (except search text) first
    const filteredCards = cards.filter(card => {
        return (
            matchesHero(card.heroes, selectedHeroes) &&
            matchesTier(card.startingTier, selectedTiers) &&
            matchesTagState(card.tags, card.hiddenTags, tagStates, isMatchAnyTag) &&
            (selectedSizes.length === 0 || (card.size && selectedSizes.includes(card.size)))
        );
    });

    // Separate exact matches from filtered results
    const exactMatches = filteredCards.filter(card => card.name.toLowerCase() === lowerSearchText);

    // If exact matches exist, prioritize them
    if (exactMatches.length > 0) {
        return exactMatches;
    }

    // Otherwise, fallback to fuzzy search on the remaining filtered cards
    return filteredCards.filter(card =>
        matchesSearchText(card, lowerSearchText, isSearchNameOnly, isSearchEnchantments)
    );
}

export function filterSkillCards(
    cards: ClientSideSkillCard[],
    heroStates: Record<Hero, TriState>,
    selectedTiers: TierType[],
    tagStates: Record<Tag | HiddenTag, TriState>,
    searchText: string,
    isSearchNameOnly: boolean,
    isMatchAnyTag: boolean,
    isMatchAnyHero: boolean
): ClientSideSkillCard[] {
    const lowerSearchText = searchText.toLowerCase();

    // Apply all filters (except search text) first
    const filteredCards = cards.filter(card => {
        return (
            matchesHeroState(card.heroes, heroStates, isMatchAnyHero) &&
            matchesTier(card.startingTier, selectedTiers) &&
            matchesTagState(card.tags, card.hiddenTags, tagStates, isMatchAnyTag)
        );
    });

    // Separate exact matches from filtered results
    const exactMatches = filteredCards.filter(card => card.name.toLowerCase() === lowerSearchText);

    // If exact matches exist, prioritize them
    if (exactMatches.length > 0) {
        return exactMatches;
    }

    // Otherwise, fallback to fuzzy search on the remaining filtered cards
    return filteredCards.filter(card =>
        matchesSearchText(card, lowerSearchText, isSearchNameOnly, false)
    );
}

// Users don't want to see "Reference" in their tags because it's unintuitive to them.
// The underlying game implementation needs to keep the two types of tags distinct, though.
// Sometimes there's duplicates (i.e. Slow vs SlowReference) and other times there aren't (i.e. EconomyReference)
// So, drop Reference, but then ensure the list is distinct.
export function filterTags(tags: Tag[], hiddenTags: HiddenTag[]) {
    // TODO: tighten types here?
    return Array.from(
        new Set([...tags, ...hiddenTags].map(tag => tag.replace('Reference', '')))
    ).sort();
}