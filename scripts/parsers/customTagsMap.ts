import type { CustomTag } from "$lib/types";
const customTagsMap: Record<string, CustomTag[]> = {
    // Arken's Ring
    "c9a88c39-28e0-4618-907d-aec77f44d817": ["Unpurchasable"],

    // Armored Core:
    "88ca9279-a62c-4bdb-ba2c-06871a7c5b7d": ["Unpurchasable"],

    // Bag of Jewels:
    "5ded844c-5279-4c30-9198-309fba0b651b": ["Unpurchasable"],

    // Blue Gumball
    "73998555-1f68-440b-b28f-84c0f9f07579": ["Unpurchasable"],

    // Blue Piggles A
    "ce7ff94f-29e4-4f2d-bca9-cca83eacf774": ["Unpurchasable"],

    // Blue Piggles L
    "2df8f38b-bb9f-4247-afe9-525067c9e29e": ["Unpurchasable"],

    // Blue Piggles R
    "1d8d4dea-aaf9-4041-aa54-ae133f552d55": ["Unpurchasable"],

    // Blue Piggles X
    "8124f91b-3b4f-40ae-9493-057a0be7feb9": ["Unpurchasable"],

    // Broken Shackles
    "7f706346-b364-4791-a104-ed6fe03e87e1": ["Unpurchasable"],

    // Busy Bee
    "94e28682-a012-4dd0-8ce8-7fe180aa6127": ["Unpurchasable"],

    // Candy Mail
    "9b499211-2c75-4781-a0e2-a0dab7d5dc5a": ["Unpurchasable"],

    // Catalyst
    "694a08fe-e8ff-4a45-9693-4c68f11a1f8b": ["Unpurchasable"],

    // Chunk of Gold
    "0c8298ad-3001-4631-9bed-df11a7425ced": ["Unpurchasable"],

    // Chunk of Lead
    "ef20ec33-7990-41b8-8d8e-47514b503612": ["Unpurchasable"],

    // Colossal Popsicle
    "793b64b2-20a8-42ca-a592-54c9c3f814f8": ["Unpurchasable"],

    // Companion Core:
    "44366f1e-a46b-4b41-9bf7-a1dec75bb6d6": ["Unpurchasable"],

    // Cosmic Amulet
    "39f47d29-2ef3-4057-bb60-33acd3dd12a2": ["Unpurchasable"],

    // Cosmic Plumage
    "c45a7c22-ae24-4246-bb6c-a83324a8546c": ["Unpurchasable"],

    // Critical Core:
    "a5fda359-ceb0-4b00-bcac-810c9cecef8e": ["Unpurchasable"],

    // Dragon Heart
    "2f4625b6-42e1-42e8-9f50-82edf038fac1": ["Unpurchasable"],

    // Dragon Whelp
    "1ff59248-bf6c-49e1-9c45-59989df19693": ["Unpurchasable"],

    // Dragon Wing
    "292115b4-a145-476e-b3a7-0fe199b5c1af": ["Unpurchasable"],

    // Duct Tape
    "0966f887-5aaf-44a5-90fa-ecb194270513": ["Unpurchasable"],

    // Ectoplasm
    "7b731de3-3598-46f4-b61f-75b7a0065d8a": ["Unpurchasable"],

    // Epicurean Chocolate
    "ca45968e-c996-412b-b359-7bfc3e70e893": ["Unpurchasable"],

    // Eye of the Colossus
    "3373c95c-6910-4414-8134-abf2ff1c90fa": ["Unpurchasable"],

    // Flamberge
    "8938035e-be96-4827-bd34-7258253bd942": ["Unpurchasable"],

    // Genie Lamp
    "ac92c118-c073-465c-8d89-abafa0dcb144": ["Unpurchasable"],

    // Green Gumball
    "d0a15bf6-fc3a-47c5-84c5-7c34c6996598": ["Unpurchasable"],

    // Gunpowder
    "3e563d2a-87e7-4e9a-bfa2-3268b27b7447": ["Unpurchasable"],

    // Icebreaker
    "4bb254dc-4b02-4c4b-8198-a310bdb122e4": ["Unpurchasable"],

    // Ignition Core:
    "9b9ea23a-408c-4e08-9b09-9f791285d16c": ["Unpurchasable"],

    // Infernal Greatsword
    "3c9c0a73-ea2e-4ff2-be75-fd4363f72d37": ["Unpurchasable"],

    // Junkyard Catapult
    "3d766165-a7f8-4286-8d37-976d5e101522": ["Unpurchasable"],

    // Magician's Top Hat
    "a1a898d3-4e07-41bb-a293-bb41fa39a6df": ["Unpurchasable"],

    // Mortal Coil
    "86f9a35d-73d6-456c-b56d-ddb6adc64175": ["Unpurchasable"],

    // Nanobot
    "764ad6f5-f9a0-4edc-8692-fa166abe2ba3": ["Unpurchasable"],

    // Nargile
    "f76338d5-e09b-4319-8914-c35043d464fc": ["Unpurchasable"],

    // Necronomicon
    "5aa3022a-2e75-46a8-9cfb-983a97139d05": ["Unpurchasable"],

    // Neural Toxin
    "9bdc7dad-5016-4743-9b44-1e20b03a1961": ["Unpurchasable"],

    // Octopus
    "82d41afc-d1a9-41ee-a03d-fd9305bef8b5": ["Unpurchasable"],

    // Red Gumball
    "6d6199b4-82a4-441d-9329-f4164737ac6b": ["Unpurchasable"],

    // Red Piggles A
    "844efa15-de6f-4fec-a438-21904969577b": ["Unpurchasable"],

    // Red Piggles L
    "b3c06ff9-f0e1-4527-81aa-2f71d7bf6503": ["Unpurchasable"],

    // Red Piggles R
    "b57d9963-d241-40c9-8f9f-f9925a2da661": ["Unpurchasable"],

    // Red Piggles X
    "48d24eb0-d953-409c-9602-1d3d4c4278c5": ["Unpurchasable"],

    // Scythe
    "0c710f33-d0fd-40c8-aa2d-34fc20f23140": ["Unpurchasable"],

    // Singularity
    "cb766f97-21b4-43b9-af0e-c47bc7a3b4fd": ["Unpurchasable"],

    // Snowflake
    "9f478d9d-cc98-4ff2-926a-5eeb09bd044c": ["Unpurchasable"],

    // Soul of the District
    "d154b0ed-4fe3-4abe-a08c-fbc622a64500": ["Unpurchasable"],

    // Spare Change
    "f212afe2-08d1-40e3-978b-762d345bc7e5": ["Unpurchasable"],

    // Super Syrup
    "8863af7b-4b2d-4456-81d8-e1d9f0dce4a9": ["Unpurchasable"],

    // Teddy
    "cbec1d5f-096e-49d0-b736-60091fd3f9aa": ["Unpurchasable"],

    // The Core:
    "eeeb02b5-9e8d-4af8-9902-2a77b1f838e7": ["Unpurchasable"],

    // The Eclipse
    "c600d27d-0df0-4f05-a2ab-4a64a0d9fa32": ["Unpurchasable"],

    // Thieves Guild Medallion
    "1e48bd28-cd41-49e9-9e22-b44da30ef6be": ["Unpurchasable"],

    // TinyCutlass:
    "97d8654e-532b-4960-8f5b-5822562d3450": ["Unpurchasable"],

    // Tommoo Gun
    "347a3f68-b4bc-49c4-856d-534b14b47459": ["Unpurchasable"],

    // Upgrade Hammer
    "19379b88-4fe5-474c-a254-d266c0435bf4": ["Unpurchasable"],

    // Vial of Blood
    "08bb5055-bd8d-4f86-bff6-24f8cb47f509": ["Unpurchasable"],

    // Void Ray
    "baec36c3-2c41-47fa-bd54-6f1d6b34e8d0": ["Unpurchasable"],

    // Void Shield
    "cfd94b43-c547-4dea-a977-658a388e75d4": ["Unpurchasable"],

    // Weaponized Core:
    "9131cedf-e5e7-4a23-a90e-2576048419e8": ["Unpurchasable"],

    // Yellow Gumball
    "acbddaec-41a7-452e-b4aa-357e75553d55": ["Unpurchasable"],

    // Yellow Piggles A
    "9c21ee00-116d-4868-a215-3f9b57bc8657": ["Unpurchasable"],

    // Yellow Piggles L
    "d8e476dd-8184-4cb5-8cca-df1cb66c4305": ["Unpurchasable"],

    // Yellow Piggles R
    "3868bcee-4463-4c34-9a9b-b1ab1fa49260": ["Unpurchasable"],

    // Yellow Piggles X
    "d4586506-d4d6-45d5-866b-796203f8d9d3": ["Unpurchasable"],
};

export default customTagsMap;
