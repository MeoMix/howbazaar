
import type { EnchantmentType, ParsedMonster } from "$lib/types";
import type { MonstersJson } from "./types.parser";

export function parseJson(monstersJson: MonstersJson): ParsedMonster[] {
    return Object.values(monstersJson)
        .map(monster => {
            return {
                id: monster.Id,
                health: monster.Player.Attributes.HealthMax,
                items: monster.Player.Hand.Items.map(item => ({
                    templateId: item.TemplateId,
                    tierType: item.Tier,
                    // TODO: Weird this isn't typed appropriately
                    enchantmentType: (item.EnchantmentType as EnchantmentType) ?? undefined
                })),
                skills: monster.Player.Skills.map(skill => ({
                    templateId: skill.TemplateId,
                    tierType: skill.Tier
                })),
            };
        });
}
