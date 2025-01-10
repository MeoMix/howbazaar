import type { ParsedCombatEncounterCard, ParsedItemCard, ParsedSkillCard, ParsedDayHour, TierType, ParsedMonster, ClientSideMonsterEncounterDay } from "$lib/types";

// TODO: This should return 'MonsterEncounterDay' which is converted to DTO in the API layer.
export function getMonsterEncounterDays(
    itemCards: ParsedItemCard[],
    skillCards: ParsedSkillCard[],
    combatEncounterCards: ParsedCombatEncounterCard[],
    monsters: ParsedMonster[],
    dayHours: ParsedDayHour[]
): ClientSideMonsterEncounterDay[] {
    const monsterEncounterDayHours = dayHours.filter(({ day, hour }) => day <= 10 && hour === 3);

    // Sparring Partner, Mr. Moo, Bounty Hunter, and Mimic are "Event" monsters
    const allMonsterEncounters = [...monsterEncounterDayHours, {
        day: "event" as const,
        spawnGroups: [{
            ids: [
                // Sparring Partner
                "60be5dca-6908-439c-843a-92dcb5b5dc4e",
                // Mr. Moo
                "72411b58-e99a-44a9-a43f-9767896c7508",
                // Bounty Hunter
                "0f0b2074-06d7-4aea-a5aa-9e603602215a",
                // Mimic
                "85420ae1-363b-4e84-8405-cc1a306b00fb",
            ]
        }]
    }];

    const monsterEncounterDays: ClientSideMonsterEncounterDay[] = allMonsterEncounters.map((dayHour) => {
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
                    const combatEncounter = combatEncounterCards.find(card => card.id === cardId);

                    if (combatEncounter === undefined) {
                        console.log(`Failed to find card with cardId: ${cardId}`);
                        return null;
                    }

                    const cardName = combatEncounter.name;
                    const monster = monsters.find(monster => monster.id === combatEncounter.monsterTemplateId);

                    if (monster === undefined) {
                        //console.log(`Failed to find monster with templateId: ${combatEncounter.monsterTemplateId}`);
                        return null;
                    }

                    const items = monster.items.map(item => {
                        const itemCard = itemCards.find(card => card.id === item.templateId);

                        if (itemCard === undefined) {
                            //console.log(`Failed to find card item with id: ${item.templateId}`);
                            return null;
                        }

                        // Some items in v2_Monsters have invalid tier types because the starting tier of the item
                        // was changed, or because they're legendaries but not represented as such in the data.
                        const tierType = getValidTierType(item.tierType, itemCard.startingTier);

                        return {
                            card: {
                                ...itemCard,
                                // TODO: Use a different type for card here
                                combatEncounters: [],
                            },
                            tierType,
                            enchantmentType: item.enchantmentType
                        };
                    }).filter(result => result !== null);

                    const skills = monster.skills.map(skill => {
                        const skillCard = skillCards.find(card => card.id === skill.templateId);

                        if (skillCard === undefined) {
                            //console.log(`Failed to find card skill with id: ${skill.templateId}`);
                            return null;
                        }

                        // Not aware of this being an issue/necessary but applying it for skills just to be cautious.
                        const tierType = getValidTierType(skill.tierType, skillCard.startingTier);

                        return {
                            card: {
                                ...skillCard,
                                // TODO: Use a different type for card here
                                combatEncounters: [],
                            },
                            tierType
                        };
                    }).filter(result => result !== null);

                    return {
                        cardId,
                        cardName,
                        level: monster.level,
                        health: monster.health,
                        items,
                        skills,
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
function getValidTierType(itemTierType: TierType, cardStartingTier: TierType): TierType {
    return tiers.indexOf(itemTierType) < tiers.indexOf(cardStartingTier)
        ? cardStartingTier
        : itemTierType;
}