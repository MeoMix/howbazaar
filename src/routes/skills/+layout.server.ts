import parsedCards from "$lib/processedCards.json" assert { type: "json" };
import type { ClientSideCard, ClientSideCardSkill } from "$lib/types";

let skills: ClientSideCardSkill[];

export function load() {
    if (!skills) {
        skills = (parsedCards as ClientSideCard[]).filter((card): card is ClientSideCardSkill => card.type === "Skill");
    }

    return { skills };
}