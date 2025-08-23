import type { ClientSideItemCard, ClientSideMonsterEncounter, ClientSideSkillCard, Hero, HiddenTag, ItemSortOption, Size, SkillSortOption, Tag, TierType, TriState, ClientSideMerchantCard, CustomTag, EnchantmentType, ClientSideEnchantment } from "$lib/types";
import type { Entries } from "type-fest";

export const heroOrder = ["Vanessa", "Pygmalien", "Dooley", "Mak", "Jules", "Stelle", "Common"] as const;
export const tierOrder = ["Bronze", "Silver", "Gold", "Diamond", "Legendary"] as const;
export const sizeOrder = ["Small", "Medium", "Large"];

export function getCardFilterOptions(cards: (ClientSideItemCard | ClientSideSkillCard)[]) {
    const heroOptions = heroOrder.map(hero => ({ name: hero, value: hero }));
    const minimumTierOptions = tierOrder.map(minimumTier => ({ name: minimumTier, value: minimumTier }));
    const sizeOptions = sizeOrder.map(size => ({ name: size, value: size }));

    const tagOptions = Array.from(
        new Set(cards.flatMap((card) => filterTags(card.tags, card.hiddenTags, card.customTags)))
    ).sort((a, b) => a.localeCompare(b)).map(tag => ({ name: tag, value: tag }));

    const enchantmentOptions = Array.from(
        new Set(cards.flatMap((card) =>
            'enchantments' in card ? card.enchantments.map((enchantment) => enchantment.type) : []
        ))
    ).sort((a, b) => a.localeCompare(b)).map(enchantment => ({ name: enchantment, value: enchantment }));

    return {
        heroOptions,
        minimumTierOptions,
        tagOptions,
        sizeOptions,
        enchantmentOptions
    };
}

function matchesHero(cardHeroes: Hero[], selectedHeroes: Hero[]): boolean {
    return selectedHeroes.length === 0 || selectedHeroes.some(hero => cardHeroes.includes(hero));
}

function matchesEnchantment(cardEnchantments: ClientSideEnchantment[], selectedEnchantments: EnchantmentType[]): boolean {
    return selectedEnchantments.length === 0 || selectedEnchantments.some(enchantment => cardEnchantments.some(cardEnchantment => cardEnchantment.type === enchantment));
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
    cardCustomTags: CustomTag[],
    tagStates: Partial<Record<Tag | HiddenTag | CustomTag, TriState>>,
    isMatchAnyTag: boolean
): boolean {
    // Convert to Sets for quick "has" checks
    const allCardTags = new Set([...cardTags, ...cardHiddenTags, ...cardCustomTags]);

    // Helper that knows how to handle special-cases
    const cardHasTag = (queryTag: string): boolean => {
        // If the user is filtering on "Economy" treat "EconomyReference" as matching
        // This is just because we show "Economy" to the user, rather than "EconomyReference", since there is no Economy tag.
        if (queryTag === "Economy") {
            return allCardTags.has("EconomyReference")
        }

        // Default check: just see if card has this tag in visible or hidden tags
        return allCardTags.has(queryTag);
    };

    const tagEntries = Object.entries(tagStates);

    if (isMatchAnyTag) {
        // If there are no "on" tags, everything matches automatically
        const hasOnTags = tagEntries.some(([_, state]) => state === "on");
        if (!hasOnTags) {
            return true;
        }

        // Otherwise, match if at least one of the "on" tags is found
        return tagEntries.some(([tag, state]) => {
            return state === "on" && cardHasTag(tag);
        });
    }

    // "All" tags mode: must satisfy every rule
    return tagEntries.every(([tag, state]) => {
        if (state === "on") {
            // Must have the tag
            return cardHasTag(tag);
        }
        if (state === "off") {
            // Must not have the tag
            return !cardHasTag(tag);
        }
        // For "unset" (or anything else), ignore it
        return true;
    });
}


// Match "yo-yo" to "yoyo" and "ice cream" to "icecream"
const normalize = (text: string): string => text.replace(/[^\w]|_/g, "");

// Substring and normalized matching functions
const substringMatch = (text: string, lowerSearchText: string): boolean => {
    return normalize(text.toLowerCase()).includes(normalize(lowerSearchText));
}

function matchesCardSearchText(
    card: ClientSideItemCard | ClientSideSkillCard,
    lowerSearchText: string,
): boolean {
    if (lowerSearchText === '') return true;

    // Split the search text by | to support searching for multiple terms
    const searchTerms = lowerSearchText.split('|').map(term => term.trim()).filter(term => term !== '');

    // If there are no valid search terms after splitting, return true
    if (searchTerms.length === 0) return true;

    // Check if any of the search terms match
    for (const term of searchTerms) {
        // Early exit if card name matches
        if (substringMatch(card.name, term)) {
            return true;
        }

        for (const [_tierType, tier] of Object.entries(card.tiers) as Entries<typeof card.tiers>) {
            if (tier.tooltips.length !== 0) {
                if (tier.tooltips.some(tooltip => substringMatch(tooltip, term))) {
                    return true; // Early exit if found
                }
            }
        }
    }

    return false;
}

function matchesMonsterSearchText(
    monster: ClientSideMonsterEncounter,
    lowerSearchText: string,
): boolean {
    if (lowerSearchText === '') return true;

    // Split the search text by | to support searching for multiple terms
    const searchTerms = lowerSearchText.split('|').map(term => term.trim()).filter(term => term !== '');

    // If there are no valid search terms after splitting, return true
    if (searchTerms.length === 0) return true;

    // Check if any of the search terms match
    for (const term of searchTerms) {
        if (substringMatch(monster.cardName, term) ||
            monster.items.filter(item => matchesCardSearchText(item.card, term)).length > 0 ||
            monster.skills.filter(skill => matchesCardSearchText(skill.card, term)).length > 0) {
            return true;
        }
    }

    return false;
}

function matchesMerchantSearchText(
    merchant: ClientSideMerchantCard,
    merchantItemsMap: Map<string, { filteredItems: ClientSideItemCard[] }>,
    lowerSearchText: string,
): boolean {
    if (lowerSearchText === '') return true;

    // Split the search text by | to support searching for multiple terms
    const searchTerms = lowerSearchText.split('|').map(term => term.trim()).filter(term => term !== '');

    // If there are no valid search terms after splitting, return true
    if (searchTerms.length === 0) return true;

    // Check if any of the search terms match
    for (const term of searchTerms) {
        if (substringMatch(merchant.name, term) ||
            (merchantItemsMap.get(merchant.id)?.filteredItems ?? []).filter(item => matchesCardSearchText(item, term)).length > 0) {
            return true;
        }
    }

    return false;
}

export function filterItemCards(
    cards: ClientSideItemCard[],
    selectedHeroes: Hero[],
    selectedTiers: TierType[],
    tagStates: Partial<Record<Tag | HiddenTag | CustomTag, TriState>>,
    selectedSizes: Size[],
    isMatchAnyTag: boolean,
    monsterDropsOnlyState: TriState,
    selectedEnchantments: EnchantmentType[],
): ClientSideItemCard[] {
    return cards.filter(card => {
        return (
            (monsterDropsOnlyState === "on" ? card.combatEncounters.length > 0 : (monsterDropsOnlyState === "off" ? card.combatEncounters.length === 0 : true)) &&
            matchesHero(card.heroes, selectedHeroes) &&
            matchesTier(card.startingTier, selectedTiers) &&
            matchesTagState(card.tags, card.hiddenTags, card.customTags, tagStates, isMatchAnyTag) &&
            (selectedSizes.length === 0 || selectedSizes.includes(card.size)) &&
            matchesEnchantment(card.enchantments, selectedEnchantments)
        );
    });
}

export function filterSkillCards(
    cards: ClientSideSkillCard[],
    heroStates: Record<Hero, TriState>,
    selectedTiers: TierType[],
    tagStates: Partial<Record<Tag | HiddenTag | CustomTag, TriState>>,
    isMatchAnyTag: boolean,
    isMatchAnyHero: boolean,
    monsterDropsOnlyState: TriState,
): ClientSideSkillCard[] {
    return cards.filter(card => {
        return (
            (monsterDropsOnlyState === "on" ? card.combatEncounters.length > 0 : (monsterDropsOnlyState === "off" ? card.combatEncounters.length === 0 : true)) &&
            matchesHeroState(card.heroes, heroStates, isMatchAnyHero) &&
            matchesTier(card.startingTier, selectedTiers) &&
            matchesTagState(card.tags, card.hiddenTags, card.customTags, tagStates, isMatchAnyTag)
        );
    });
}

export function searchCards<T extends ClientSideItemCard | ClientSideSkillCard>(
    cards: T[],
    searchText: string,
): T[] {
    const lowerSearchText = searchText.trim().toLowerCase();

    return cards.filter(card => matchesCardSearchText(card, lowerSearchText));
}

export function searchMonsters(
    monsters: ClientSideMonsterEncounter[],
    searchText: string,
) {
    const lowerSearchText = searchText.trim().toLowerCase();

    return monsters.filter(monster =>
        matchesMonsterSearchText(monster, lowerSearchText)
    );
}

export function searchMerchants(
    merchants: ClientSideMerchantCard[],
    merchantItemsMap: Map<string, { filteredItems: ClientSideItemCard[] }>,
    searchText: string,
) {
    const lowerSearchText = searchText.trim().toLowerCase();

    return merchants.filter(merchant =>
        matchesMerchantSearchText(merchant, merchantItemsMap, lowerSearchText)
    );
}

// TODO: There's probably a better spot to put this, but rename EconomyReference to Economy because there's no Economy
// tag, so might as well use a shorter form.
export function filterTags(tags: Tag[], hiddenTags: HiddenTag[], customTags: CustomTag[]) {
    return Array.from(
        new Set([...tags, ...hiddenTags, ...customTags].map(tag => tag.replace('EconomyReference', 'Economy')))
    ).sort();
}

export function sortCards<T extends (ClientSideItemCard | ClientSideSkillCard)>(cards: T[], selectedSortOption: (ItemSortOption | SkillSortOption), searchText: string) {
    return [...cards].sort((a, b) => {
        // If searchText is provided, check for exact matches first
        if (searchText) {
            // Split search text by pipe and trim each term
            const searchTerms = searchText.split('|').map(term => term.trim().toLowerCase());

            // Check if either card exactly matches any search term
            const aExactMatch = searchTerms.some(term => a.name.toLowerCase() === term);
            const bExactMatch = searchTerms.some(term => b.name.toLowerCase() === term);

            if (aExactMatch && !bExactMatch) return -1;
            if (!aExactMatch && bExactMatch) return 1;
            if (aExactMatch && bExactMatch) return 0;
        }

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