import type { ParsedItemCard, ParsedSkillCard, ParsedCombatEncounterCard, ParsedMonster, ParsedDayHour, ClientSideSkillCard } from "$lib/types";
import { getMonsterEncounterDays } from "./monsterEncounterService";

// TODO: This shouldn't be ClientSideCardSkill[]
export function getSkills(
    skillCards: ParsedSkillCard[],
    itemCards: ParsedItemCard[],
    combatEncounterCards: ParsedCombatEncounterCard[],
    monsters: ParsedMonster[],
    dayHours: ParsedDayHour[]
): ClientSideSkillCard[] {
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
            combatEncounters: combatEncounters
                .sort((a, b) => a.level - b.level || a.cardName.localeCompare(b.cardName))
                .map(({ cardId, cardName }) => ({ cardId, cardName })),
        };
    });

    return mappedSkillCards;
}