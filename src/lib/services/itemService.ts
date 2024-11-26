import type { ClientSideCard, ClientSideCardItem } from "$lib/types";

// TODO: This shouldn't be ClientSideCardItem[]
export function getItems(cards: ClientSideCard[]): ClientSideCardItem[] {
    const items = cards.filter((card): card is ClientSideCardItem => card.type === "Item");

    return items;
}