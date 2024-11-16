import type { ClientSideCard, ClientSideCardCombatEncounter, ClientSideCardItem, ClientSideCardSkill, ClientSideDayHours, ClientSideTierType, Monster, MonsterEncounterDay } from "$lib/types";

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

                            // Some items in v2_Monsters have invalid tier types because the starting tier of the item
                            // was changed, or because they're legendaries but not represented as such in the data.
                            const tierType = getValidTierType(item.tierType, card.startingTier);

                            return {
                                card,
                                tierType,
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

                            // Not aware of this being an issue/necessary but applying it for skills just to be cautious.
                            const tierType = getValidTierType(skill.tierType, card.startingTier);

                            return {
                                card,
                                tierType
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

const tiers = ["Bronze", "Silver", "Gold", "Diamond", "Legendary"];
function getValidTierType(itemTierType: ClientSideTierType, cardStartingTier: ClientSideTierType): ClientSideTierType {
    return tiers.indexOf(itemTierType) < tiers.indexOf(cardStartingTier)
        ? cardStartingTier
        : itemTierType;
}