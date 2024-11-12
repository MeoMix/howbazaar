import type { ClientSideCard, ClientSideCardCombatEncounter, ClientSideCardItem, ClientSideCardSkill, ClientSideDayHours, Monster, MonsterEncounterDay } from "$lib/types";

export function getMonsterEncounterDays(
    cards: ClientSideCard[],
    monsters: Monster[],
    dayHours: ClientSideDayHours[]
): MonsterEncounterDay[] {
    let monsterEncounterDayHours = dayHours.filter(({ day, hour }) => day <= 10 && hour === 3);

    const monsterEncounterDays = monsterEncounterDayHours.map((dayHour) => {
        const groups = dayHour.spawnGroups.map(group => {
            const uniqueIds = new Set<string>();

            const monsterEncounters = group.ids
                .filter(cardId => {
                    if (uniqueIds.has(cardId)) {
                        return false; // Skip duplicates
                    }
                    uniqueIds.add(cardId); // Add to set if not a duplicate
                    return true;
                })
                .map(cardId => {
                    const card = cards.find(card => card.id === cardId && card.type === "CombatEncounter") as ClientSideCardCombatEncounter | undefined;

                    if (card === undefined) {
                        console.log(`Failed to find card with cardId: ${cardId}`);
                        return null;
                    }

                    const monster = monsters.find(monster => monster.id === card.monsterTemplateId)!;

                    return {
                        cardId,
                        cardName: card.name,
                        level: monster.level,
                        health: monster.health,
                        items: monster.items.map(item => {
                            const card = cards.find(
                                card => card.id === item.templateId && card.type === "Item"
                            ) as ClientSideCardItem | undefined;

                            if (card === undefined) {
                                console.log(`Failed to find card item with id: ${item.templateId}`);
                                return null;
                            }

                            return {
                                card,
                                tierType: item.tierType,
                                enchantmentType: item.enchantmentType
                            };
                        }).filter(result => result !== null),
                        skills: monster.skills.map(skill => {
                            const card = cards.find(
                                card => card.id === skill.templateId && card.type === "Skill"
                            ) as ClientSideCardSkill | undefined;

                            if (card === undefined) {
                                console.log(`Failed to find card skill with id: ${skill.templateId}`);
                                return null;
                            }

                            return {
                                card,
                                tierType: skill.tierType
                            };
                        }).filter(result => result !== null),
                    };
                }).filter(result => result !== null);

            return monsterEncounters;
        });

        return {
            day: dayHour.day,
            groups
        };
    });

    return monsterEncounterDays;
}
