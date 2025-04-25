import type { CorePackId, ExpansionPackId, Hero, HiddenTag, Size, Tag, TierType, TriState } from "$lib/types";

// NOTE: Hero filter is implied to be all released heros if unspecified.
// NOTE: Invalid pack filter is implied to be all except Core if unspecified.
export const merchantFilterMapping: { [key: string]: { name: string, tagStates?: Partial<Record<Tag | HiddenTag, TriState>>, sizeFilter?: Size[], tierFilter?: TierType[], heroFilter?: Hero[], invalidPackFilter?: (CorePackId | ExpansionPackId)[] } } = {
    "dc12f4bd-6c33-41f0-b7ad-d62a0be09a47": { name: "Aila", tagStates: { Weapon: "on" } },
    "705c0d8e-8513-49ce-82e8-81782cdac316": { name: "Ande", sizeFilter: ["Small"] },
    "8f0aea10-9894-4ded-a726-72b23142589c": { name: "Barkun", sizeFilter: ["Medium", "Large"] },
    "b1288f12-2cf9-4473-a43e-4dd521703990": { name: "Chronos", tagStates: { Haste: "on" } },
    "ef25f92c-484a-48de-b6de-8fc6429823ca": { name: "Cobweb", tagStates: { Slow: "on" } },
    "816e6ba0-8f5f-412e-9756-8e1901dd9d49": { name: "Colt", tagStates: { Ammo: "on" }, heroFilter: ["Vanessa", "Stelle"] },
    // TODO: Does Curio sell s catalysts?
    "c6cffe25-8e94-4a7b-a821-3e3c7093333b": { name: "Curio", tierFilter: ["Bronze"], heroFilter: ["Common"], invalidPackFilter: [] },
    "4580fb31-b2ea-4f9b-9ab9-2979602f83d8": { name: "Dooley", heroFilter: ["Dooley"] },
    "0ff275f7-60ef-4428-acb6-1a138d03152d": { name: "Eli", tagStates: { Potion: "on" }, heroFilter: ["Mak"] },
    "7bd967dd-4631-4252-bdff-ee0bd5e3ddb7": { name: "Flex", tagStates: { HealthMax: "on" }, heroFilter: ["Pygmalien"] },
    "c246ee53-51ea-40c1-ac2f-71435e179531": { name: "Freiya", tagStates: { Freeze: "on" } },
    "1f72700a-fe11-4792-8a47-9e52b9387f29": { name: "Goldie", tierFilter: ["Gold"] },
    "43dbd6ed-6989-4ae4-acdc-f8bfcb8a008f": { name: "Hef", tagStates: { Burn: "on" } },
    "2708055d-a8be-4c2f-a8d6-574e884a254e": { name: "Herma", tagStates: { Regen: "on", Heal: "on" }, heroFilter: ["Pygmalien", "Mak"] },
    "85db60ee-3619-4e39-bfb2-2f4ac56f172b": { name: "Jay Jay" },
    "7fdc233f-b81f-4216-a646-4c807c2240da": { name: "Jules", heroFilter: ["Jules"] },
    "a4fa13f8-6beb-4b6c-839b-60af167628d9": { name: "Kev's Armory", tagStates: { Health: "on", Shield: "on" } },
    "5b7c5fc4-c942-44fe-9ca8-726dc36a2ad6": { name: "Kina", tagStates: { Weapon: "off" } },
    "2745a661-095c-44a5-bb6e-8dc76e07bda2": { name: "Knightshade", tagStates: { Poison: "on" } },
    "892de564-d894-4e07-ab21-959e16e8cdf8": { name: "Luxe", tierFilter: ["Diamond"] },
    "4475cff5-6105-4f4a-978c-b282e36173eb": { name: "Mak", heroFilter: ["Mak"] },
    "b8f55bb0-536e-4d5f-a328-d38f88c6d479": { name: "Midsworth", sizeFilter: ["Small", "Large"] },
    "912c8b09-3b76-4aa1-8e21-245e0dfb5046": { name: "Mittel", sizeFilter: ["Medium"] },
    "e30d8bef-5bea-4e95-b4c2-e29e17325a82": { name: "Mr. Morland", tagStates: { Property: "on" }, heroFilter: ["Pygmalien"] },
    "1a21931f-6183-4251-914b-c8f83dc58a30": { name: "Nautica", tagStates: { Aquatic: "on" }, heroFilter: ["Vanessa"] },
    "d3727a3a-3dd2-4ea7-a396-515e2c41c1b0": { name: "Orion", tagStates: { Tool: "on" } },
    "065f6793-8607-4f02-abfe-db6afb221ab2": { name: "Pol", sizeFilter: ["Large"] },
    "bcdaa6d4-9057-4ea1-8110-a2dae217c55f": { name: "Prospero", tagStates: { EconomyReference: "on" }, heroFilter: ["Pygmalien"] },
    "f9074804-1812-445a-8688-b8c86f9c7711": { name: "Pygmalien", heroFilter: ["Pygmalien"] },
    "323e2c05-f077-4774-84a5-9e89d8d1c9b9": { name: "Quixel", sizeFilter: ["Small", "Medium"] },
    // Enchanted items only -- not well supported with current UI.
    "b690812d-108b-49ce-82f3-e1a41379022c": { name: "Serafina" },
    "ec81a27c-590c-43a1-a353-804a23b5e5d9": { name: "Silvia", tierFilter: ["Silver"] },
    "e48b3243-1e7e-4a97-bf4f-0699fd0b4616": { name: "Stelle", heroFilter: ["Stelle"] },
    // TODO: Any hero?
    "22bb0004-5131-4588-a567-03ee3c96003b": { name: "Tatiana", tagStates: { Toy: "on" } },
    "b1b1f445-e625-4397-b4e2-ee4feeb729fa": { name: "Tinker", tagStates: { Friend: "on" } },
    "3e871bbb-fb25-417f-8643-cb43456c3fc7": { name: "Tok's Clocks", tagStates: { Haste: "on", Slow: "on", Cooldown: "on" } },
    // TODO: All non-legendary items?
    "e3b894b0-a078-4b1d-8793-ac6459a8361a": { name: "Valpak" },
    "580ba494-a852-4d80-a82d-5cd66fcfd2f3": { name: "Vanessa", heroFilter: ["Vanessa"] }
};
