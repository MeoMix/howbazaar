import type { ParsedCardItem, ParsedCardSkill, ParsedCardCombatEncounter, Monster, ClientSideDayHours, ClientSideCardSkill } from "$lib/types";
import { getMonsterEncounterDays } from "./monsterEncounterService";

// TODO: This shouldn't be Clien
// TODO: This shouldn't be ClientSideCardSkill[]
export function getSkills(
    skillCards: ParsedCardSkill[],
    itemCards: ParsedCardItem[],
    // TODO: DI would be nice 
    combatEncounterCards: ParsedCardCombatEncounter[],
    monsters: Monster[],
    dayHours: ClientSideDayHours[]
): ClientSideCardSkill[] {
    const monsterEncounterDays = getMonsterEncounterDays(itemCards, skillCards, combatEncounterCards, monsters, dayHours);

    const mappedSkillCards = skillCards.map(skillCard => {
        const combatEncounters = monsterEncounterDays.flatMap(day =>
            day.groups.flatMap(group =>
                group.filter(encounter =>
                    encounter.skills.some(skill => skill.card.id === skillCard.id)
                )
            )
        );

        return {
            ...skillCard,
            combatEncounters: combatEncounters.map(({ cardId, cardName }) => ({ cardId, cardName })).sort((a, b) => a.cardName.localeCompare(b.cardName)),
        };
    });

    return mappedSkillCards;
}