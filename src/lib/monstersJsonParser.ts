
import type { ClientSideCard, ClientSideCardItem, ClientSideCardSkill, ClientSideMonster, MonstersJson } from "./types";

// TODO: It's bad this takes in ClientSideCards, should have a separate module that unifies them and/or move data to database and fetch relationally.
export function parseJson(monstersJson: MonstersJson, cards: ClientSideCard[]): ClientSideMonster[] {
    const validMonsters = Object.values(monstersJson);

    const monsters = validMonsters.map(monster => {
        return {
            // TODO: Weird to use InternalName and not something localize here
            name: monster.InternalName,
            attributes: {
                level: monster.Player.Attributes.Level,
                health: monster.Player.Attributes.HealthMax,
                healthRegen: monster.Player.Attributes.HealthRegen ?? 0,
            },
            items: monster.Player.Hand.Items.map(item => {
                // TODO: oh god the performance
                let card = cards.find(card => card.id === item.TemplateId) as ClientSideCardItem | undefined;
                return {
                    card,
                    tier: item.Tier,
                }
            }),
            skills: monster.Player.Skills.map(skill => {
                // TODO: oh god the performance
                let card = cards.find(card => card.id === skill.TemplateId) as ClientSideCardSkill | undefined;
                return {
                    card,
                    tier: skill.Tier,
                }
            }),
        };
    })
        .filter(monster =>
            monster.items.every(item => item.card !== undefined) &&
            monster.skills.every(skill => skill.card !== undefined)
        ) as ClientSideMonster[]; // TODO: Fix casting

    return monsters;
}