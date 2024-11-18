import parsedCards from "$lib/processedCards.json" assert { type: "json" };
import type { ClientSideCard } from "$lib/types";

let cards: ClientSideCard[];

export function load() {
    if (!cards) {
        cards = parsedCards as ClientSideCard[];
    }

    return { cards };
}