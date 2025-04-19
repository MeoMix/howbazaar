
import type { EnchantmentType, ParsedMonster } from "$lib/types";
import type { MonstersJson } from "./types.parser";

export function parseJson(monstersJson: MonstersJson): ParsedMonster[] {
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
                    enchantmentType: (item.EnchantmentType as EnchantmentType) ?? undefined
                })),
                skills: monster.Player.Skills.map(skill => ({
                    templateId: skill.TemplateId,
                    tierType: skill.Tier
                })),
            };
        });

    return patchMonsters(monsters);
}

function patchMonsters(monsters: ParsedMonster[]) {
    monsters.forEach((monster) => {
        // Coconut Crab
        if (monster.id === "2e9ed78c-6070-4802-9e98-e1090fe5bd78" ) {
            // v2_Monsters says Coconut Crab has two Sea Shells when it only has one
            monster.items = monster.items.filter(item => !(item.templateId === "eda51b14-8420-4da4-ba82-89513e5deaa2" && item.socketId === "Socket_7"));
        }

        // Pyro
        if (monster.id === "b712a602-1843-4fc3-85ad-b8e3b7bca489") {
            monster.skills.push({
                templateId: "b6c90dc6-f497-4fe4-90a1-759947180884",
                tierType: "Bronze"
            });
        }

        // Boarrior
        if (monster.id === "6d939dd0-fd9b-46b8-8861-cccb818757da") {
            // Remove Red Piggles A, Red Piggles X, and Gumball
            monster.items = monster.items.filter(item => item.templateId !== "844efa15-de6f-4fec-a438-21904969577b" && item.templateId !== "48d24eb0-d953-409c-9602-1d3d4c4278c5" && item.templateId !== "6d6199b4-82a4-441d-9329-f4164737ac6b");

            const oldSwordIndex = monster.items.findIndex(item => item.templateId === "529a7e95-b350-4fd6-96fd-fef80d4c1462");

            if (oldSwordIndex !== -1) {
                // Insert hatchet after Old Sword
                monster.items.splice(oldSwordIndex + 1, 0, {
                    templateId: "349fc81f-2b3a-4d39-beaa-6a0d5105a19a",
                    tierType: "Silver",
                    socketId: "Socket_4",
                    enchantmentType: undefined
                });
            }

            const shoeBladeIndex = monster.items.findIndex(item => item.templateId === "8391a75d-56e7-4206-a16e-62dbd986925f");
            if (shoeBladeIndex !== -1) {
                // Insert Lumboars after Shoe Blade
                monster.items.splice(shoeBladeIndex + 1, 0, {
                    templateId: "9d289951-bda7-4f74-a5cf-dbe350c0cae5",
                    tierType: "Bronze",
                    socketId: "Socket_6",
                    enchantmentType: undefined
                });
            }
        }

        // Boilerroom Brawler
        if (monster.id === "7719b6d8-7977-4d49-88a2-da29a19ad235") {
            // Replace Hammer with Orbital Polisher and Wrench with Goggles
            const hammerIndex = monster.items.findIndex(item => item.templateId === "f8dd1239-f4a3-4bca-b975-2125906e7fcb");

            if (hammerIndex !== -1) {
                monster.items[hammerIndex].templateId = "d619c665-1d58-46e8-828f-6e7e36a86a7d";
                monster.items[hammerIndex].tierType = "Gold";
            }

            const wrenchIndex = monster.items.findIndex(item => item.templateId === "27e2ea0b-4e39-4826-be29-9f5505d5938a");
            if (wrenchIndex !== -1) {
                monster.items[wrenchIndex].templateId = "f8b41c46-8adc-4e84-835a-831e2e3d84d1";
                monster.items[wrenchIndex].tierType = "Silver";
            }
        }

        return monster;
    });

    return monsters;
}
