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
        const combatEncounters = monsterEncounterDays.flatMap(day =>
            day.groups.flatMap(group =>
                group.filter(encounter =>
                    encounter.items.some(item => item.card.id === itemCard.id)
                )
            )
        );

        return {
            ...itemCard,
            combatEncounters: combatEncounters
                .sort((a, b) => a.level - b.level || a.cardName.localeCompare(b.cardName))
                .map(({ cardId, cardName }) => ({ cardId, cardName })),
        };
    });

    return mappedItemCards;
}