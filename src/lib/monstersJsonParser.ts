
import type { ClientSideCard, ClientSideCardCombatEncounter, ClientSideCardItem, ClientSideCardSkill, ClientSideMonster, MonstersJson } from "./types";

const explicitlyHiddenMonsterIds = [
    // "Dragon"
    // Weird that this seemingly actually exists and is enabled, it's just missing one item
    "58ba322d-a76c-4106-b91c-37ea207353a0",
    // "Mimic"
    // This is a "GuidOnly" so assume the associated event isn't enabled that would trigger it.
    "7f6cecb6-3f07-4606-8d62-21c0b5e4e369",
];

// TODO: It's bad this takes in ClientSideCards, should have a separate module that unifies them and/or move data to database and fetch relationally.
export function parseJson(monstersJson: MonstersJson, cards: ClientSideCard[]): ClientSideMonster[] {
    const combatEncounterMap = new Map(
        cards
            .filter((card): card is ClientSideCardCombatEncounter => card.type === "CombatEncounter")
            .map(card => [card.monsterTemplateId, card])
    );

    const monsters = Object.values(monstersJson)
        .map(monster => {
            const matchingCard = combatEncounterMap.get(monster.Id);

            if (!matchingCard || explicitlyHiddenMonsterIds.includes(monster.Id)) {
                return null;
            }

            return {
                name: matchingCard.name,
                attributes: {
                    level: monster.Player.Attributes.Level,
                    health: monster.Player.Attributes.HealthMax,
                },
                // Only include items with a matching card
                items: monster.Player.Hand.Items.map(item => {
                    let card = cards.find(
                        card => card.id === item.TemplateId && card.type === "Item"
                    ) as ClientSideCardItem | undefined;

                    if (!card) {
                        console.warn(
                            `Item with TemplateId "${item.TemplateId}" not found for monster "${matchingCard.name}". Excluding this item.`
                        );
                    }

                    return card ? { card, tierType: item.Tier, enchantmentName: item.EnchantmentType ?? undefined } : null;
                }).filter((item) => item !== null),

                // Only include skills with a matching card
                skills: monster.Player.Skills.map(skill => {
                    let card = cards.find(
                        card => card.id === skill.TemplateId && card.type === "Skill"
                    ) as ClientSideCardSkill | undefined;

                    if (!card) {
                        console.warn(
                            `Skill with TemplateId "${skill.TemplateId}" not found for monster "${matchingCard.name}". Excluding this skill.`
                        );
                    }

                    return card ? { card, tierType: skill.Tier } : null;
                }).filter((skill) => skill !== null),
            };
        })
        .filter((monster): monster is ClientSideMonster => monster !== null);

    return monsters;
}
