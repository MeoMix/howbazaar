
import type { ClientSideEnchantmentType, Monster, MonstersJson } from "./types";

export function parseJson(monstersJson: MonstersJson): Monster[] {
    const monsters = Object.values(monstersJson)
        .map(monster => {
            return {
                id: monster.Id,
                level: monster.Player.Attributes.Level,
                health: monster.Player.Attributes.HealthMax,
                items: monster.Player.Hand.Items.map(item => ({
                    templateId: item.TemplateId,
                    tierType: item.Tier,
                    socketId: item.SocketId!,
                    // TODO: Weird this isn't typed appropriately
                    enchantmentType: (item.EnchantmentType as ClientSideEnchantmentType) ?? undefined
                })),
                skills: monster.Player.Skills.map(skill => ({
                    templateId: skill.TemplateId,
                    tierType: skill.Tier
                })),
            };
        });

    return monsters;
}
