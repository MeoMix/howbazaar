import type { ParsedItemCard, ClientSideItemCard, ParsedSkillCard, ParsedCombatEncounterCard, ParsedMonster, ParsedDayHour } from "$lib/types";
import { getMonsterEncounterDays } from "./monsterEncounterService";

// TODO: This shouldn't be ClientSideCardItem[]
export function getItems(
    itemCards: ParsedItemCard[],
    skillCards: ParsedSkillCard[],
    combatEncounterCards: ParsedCombatEncounterCard[],
    monsters: ParsedMonster[],
    dayHours: ParsedDayHour[]
): ClientSideItemCard[] {
    const monsterEncounterDays = getMonsterEncounterDays(itemCards, skillCards, combatEncounterCards, monsters, dayHours);

    const mappedItemCards = itemCards.map(itemCard => {
        const uniqueEncounters = new Map<string, { cardId: string; cardName: string }>();

        monsterEncounterDays.forEach(day => {
            day.groups.forEach(group => {
                group.forEach(encounter => {
                    if (encounter.items.some(item => item.card.id === itemCard.id)) {
                        uniqueEncounters.set(encounter.cardName, { cardId: encounter.cardId, cardName: encounter.cardName });
                    }
                });
            });
        });

        return {
            ...itemCard,
            combatEncounters: Array.from(uniqueEncounters.values()).sort(
                (a, b) => a.cardId.localeCompare(b.cardId)
            ),
        };
    });

    return mappedItemCards;
}
