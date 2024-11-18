import parsedCards from "$lib/processedCards.json" assert { type: "json" };
import type { ClientSideCard, ClientSideCardItem } from "$lib/types";

let items: ClientSideCardItem[];

export function load() {
    if (!items) {
        items = (parsedCards as ClientSideCard[]).filter((card): card is ClientSideCardItem => card.type === "Item");
    }

    return { items };
}