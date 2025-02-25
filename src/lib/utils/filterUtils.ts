import type { ClientSideItemCard, ClientSideMonsterEncounter, ClientSideSkillCard, Hero, HiddenTag, ItemSortOptions, Size, SkillSortOptions, Tag, TierType, TriState } from "$lib/types";
import type { Entries } from "type-fest";

export const heroOrder = ["Vanessa", "Pygmalien", "Dooley", "Jules", "Stelle", "Mak", "Common"] as const;
export const tierOrder = ["Bronze", "Silver", "Gold", "Diamond", "Legendary"] as const;
export const sizeOrder = ["Small", "Medium", "Large"];

export function getCardFilterOptions(cards: (ClientSideItemCard | ClientSideSkillCard)[]) {
    const heroOptions = heroOrder.map(hero => ({ name: hero, value: hero }));
    const minimumTierOptions = tierOrder.map(minimumTier => ({ name: minimumTier, value: minimumTier }));
    const sizeOptions = sizeOrder.map(size => ({ name: size, value: size }));
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
                const isTagMatch = (cardTag: string) => cardTag === tag || (cardTag === `${tag}Reference` && tag === 'Economy');
                return state === "on" && (cardTags.some(isTagMatch) || cardHiddenTags.some(isTagMatch));
            });
        }
        return true; // No tags are "on"; pass all cards
    }

    return tagEntries.every(([tag, state]) => {
        const isTagMatch = (cardTag: string) => cardTag === tag || (cardTag === `${tag}Reference` && tag === 'Economy');
        if (state === "on") {
            return cardTags.some(isTagMatch) || cardHiddenTags.some(isTagMatch);
        }
        if (state === "off") {
            return !cardTags.some(isTagMatch) && !cardHiddenTags.some(isTagMatch);
        }
        return true; // "unset" tags don't affect filtering
    });
}


// Match "yo-yo" to "yoyo" but don't match "Fort" to "Port" (as would be the case with Lev distance)
const normalize = (text: string): string => text.toLowerCase().replace(/[^\w\s]|_/g, "");

// Substring and normalized matching functions
const substringMatch = (text: string, searchText: string): boolean => {
    return normalize(text.toLowerCase()).includes(normalize(searchText.toLowerCase()));
}

function matchesCardSearchText(
    card: ClientSideItemCard | ClientSideSkillCard,
    lowerSearchText: string,
    isSearchEnchantments: boolean
): boolean {
    if (lowerSearchText === '') return true;

    const validTiers = card.tiers
        ? (Object.entries(card.tiers) as Entries<typeof card.tiers>)
            .filter(([tierType, tier]) => tierType !== "Legendary" && tier.tooltips.length !== 0)
        : [];

    const substringMatchArray = (arr: string[] | undefined, searchText: string): boolean =>
        arr?.some(item => substringMatch(item, searchText)) ?? false;

    const substringMatchTier = validTiers.some(([tierName, tier]) =>
        // substringMatch(tierName, lowerSearchText) ||
        tier.tooltips.some(tooltip => substringMatch(tooltip, lowerSearchText))
    );

    const substringMatchEnchantments = isSearchEnchantments && ('enchantments' in card) && card.enchantments.some(e =>
        // substringMatch(e.type, lowerSearchText) ||
        e.tooltips.some(tip => substringMatch(tip, lowerSearchText))
    );

    return substringMatch(card.name, lowerSearchText) ||
        // substringMatchArray(card.tags, lowerSearchText) ||
        // substringMatchArray(card.hiddenTags, lowerSearchText) ||
        // (card.size && substringMatch(card.size, lowerSearchText)) ||
        //substringMatchArray(card.heroes, lowerSearchText) ||
        substringMatchTier ||
        substringMatchEnchantments;
}

function matchesMonsterSearchText(
    monster: ClientSideMonsterEncounter,
    lowerSearchText: string,
): boolean {
    if (lowerSearchText === '') return true;

    return substringMatch(monster.cardName, lowerSearchText) || (
        monster.items.filter(item => matchesCardSearchText(item.card, lowerSearchText, false)).length > 0 ||
        monster.skills.filter(skill => matchesCardSearchText(skill.card, lowerSearchText, false)).length > 0
    );
}

export function filterItemCards(
    cards: ClientSideItemCard[],
    selectedHeroes: Hero[],
    selectedTiers: TierType[],
    tagStates: Record<Tag | HiddenTag, TriState>,
    selectedSizes: Size[],
    searchText: string,
    isSearchEnchantments: boolean,
    isMatchAnyTag: boolean,
    isMonsterDropsOnly: boolean
): ClientSideItemCard[] {
    const lowerSearchText = searchText.trim().toLowerCase();

    // Apply all filters (except search text) first
    const filteredCards = cards.filter(card => {
        return (
            (isMonsterDropsOnly ? card.combatEncounters.length > 0 : true) &&
            matchesHero(card.heroes, selectedHeroes) &&
            matchesTier(card.startingTier, selectedTiers) &&
            matchesTagState(card.tags, card.hiddenTags, tagStates, isMatchAnyTag) &&
            (selectedSizes.length === 0 || (card.size && selectedSizes.includes(card.size)))
        );
    });

    // Otherwise, fallback to normalized search on the remaining filtered cards
    return filteredCards.filter(card =>
        matchesCardSearchText(card, lowerSearchText, isSearchEnchantments)
    );
}

export function filterSkillCards(
    cards: ClientSideSkillCard[],
    heroStates: Record<Hero, TriState>,
    selectedTiers: TierType[],
    tagStates: Record<Tag | HiddenTag, TriState>,
    searchText: string,
    isMatchAnyTag: boolean,
    isMatchAnyHero: boolean,
    isMonsterDropsOnly: boolean
): ClientSideSkillCard[] {
    const lowerSearchText = searchText.trim().toLowerCase();

    // Apply all filters (except search text) first
    const filteredCards = cards.filter(card => {
        return (
            (isMonsterDropsOnly ? card.combatEncounters.length > 0 : true) &&
            matchesHeroState(card.heroes, heroStates, isMatchAnyHero) &&
            matchesTier(card.startingTier, selectedTiers) &&
            matchesTagState(card.tags, card.hiddenTags, tagStates, isMatchAnyTag)
        );
    });

    // Otherwise, fallback to normalized search on the remaining filtered cards
    return filteredCards.filter(card =>
        matchesCardSearchText(card, lowerSearchText, false)
    );
}

export function filterMonsters(monsters: ClientSideMonsterEncounter[], searchText: string) {
    const lowerSearchText = searchText.trim().toLowerCase();

    // Otherwise, fallback to normalized search on the remaining filtered cards
    return monsters.filter(monster =>
        matchesMonsterSearchText(monster, lowerSearchText)
    );
}

// TODO: There's probably a better spot to put this, but rename EconomyReference to Economy because there's no Economy
// tag, so might as well use a shorter form.
export function filterTags(tags: Tag[], hiddenTags: HiddenTag[]) {
    return Array.from(
        new Set([...tags, ...hiddenTags].map(tag => tag.replace('EconomyReference', 'Economy')))
    ).sort();
}

export function sortCards<T extends (ClientSideItemCard | ClientSideSkillCard)>(cards: T[], selectedSortOption: (ItemSortOptions | SkillSortOptions)) {
    return cards.sort((a, b) => {
        if (selectedSortOption === "name") {
            return a.name.localeCompare(b.name);
        } else if (selectedSortOption === "tier") {
            // Sort by tier using tierOrder
            const tierComparison = tierOrder.indexOf(a.startingTier) - tierOrder.indexOf(b.startingTier);
            if (tierComparison !== 0) {
                return tierComparison;
            }
            // Sort alphabetically within the same tier
            return a.name.localeCompare(b.name);
        } else if (selectedSortOption === "size") {
            // Sort by size using sizeOrder
            return sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size);
        } else if (selectedSortOption === "hero") {
            // Sort by heroes[0] using heroOrder
            const heroComparison = heroOrder.indexOf(a.heroes[0]) - heroOrder.indexOf(b.heroes[0]);
            if (heroComparison !== 0) {
                return heroComparison;
            }
            // Sort alphabetically within the same hero
            return a.name.localeCompare(b.name);
        }

        // Default to alphabetical sorting
        return a.name.localeCompare(b.name);
    });
};