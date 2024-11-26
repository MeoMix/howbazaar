import type { ClientSideCard, ClientSideCardSkill } from "$lib/types";

// TODO: This shouldn't be ClientSideCardSkill[]
export function getSkills(cards: ClientSideCard[]): ClientSideCardSkill[] {
    const skills = cards.filter((card): card is ClientSideCardSkill => card.type === "Skill");

    return skills;
}