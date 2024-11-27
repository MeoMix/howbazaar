import type { ParsedCardItem, ClientSideCardItem, ParsedCardSkill, ParsedCardCombatEncounter, Monster, ClientSideDayHours } from "$lib/types";
import { getMonsterEncounterDays } from "./monsterEncounterService";

// TODO: This shouldn't be ClientSideCardItem[]
export function getItems(
    itemCards: ParsedCardItem[],
    // TODO: DI would be nice 
    skillCards: ParsedCardSkill[],
    combatEncounterCards: ParsedCardCombatEncounter[],
    monsters: Monster[],
    dayHours: ClientSideDayHours[]
): ClientSideCardItem[] {
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
            combatEncounters: combatEncounters.map(({ cardId, cardName }) => ({ cardId, cardName })).sort((a, b) => a.cardName.localeCompare(b.cardName)),
        };
    });

    return mappedItemCards;
}