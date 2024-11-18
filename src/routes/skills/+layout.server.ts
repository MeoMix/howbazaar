import parsedCards from "$lib/processedCards.json" assert { type: "json" };

import type { ClientSideCard } from "$lib/types";
import { redirect } from "@sveltejs/kit";

let cards: ClientSideCard[];

export function load({ url }) {
    if (url.pathname === '/') {
        redirect(302, '/items');
    }

    if (!cards) {
        cards = parsedCards as ClientSideCard[];
    }

    return { cards };
}