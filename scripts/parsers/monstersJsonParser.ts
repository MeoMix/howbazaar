
import type { EnchantmentType, ParsedMonster } from "$lib/types";
import type { MonstersJson } from "./types.parser";

export function parseJson(monstersJson: MonstersJson): ParsedMonster[] {
    return Object.values(monstersJson)
        .map(monster => {
            return {
                id: monster.Id,
                health: monster.Health,
                items: monster.Items.map(item => ({
                    id: item.Id,
                    tierType: item.Tier,
                    // TODO: Weird this isn't typed appropriately
                    enchantmentType: (item.EnchantmentType as EnchantmentType) ?? undefined
                })),
                skills: monster.Skills.map(skill => ({
                    id: skill.Id,
                    tierType: skill.Tier
                })),
            };
        });
}
