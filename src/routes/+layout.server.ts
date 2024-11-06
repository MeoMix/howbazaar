import cardsJson from "$lib/v2_Cards.json" assert { type: "json" };
import { parseJson } from "$lib/cardsJsonParser";
import type { CardsJson, ClientSideCard } from "$lib/types";
import { redirect } from "@sveltejs/kit";

let cachedCards: ClientSideCard[];

export function load({ url }) {
    if (url.pathname === '/') {
        redirect(302, '/items');
    }

    if (!cachedCards) {
        cachedCards = parseJson(cardsJson as CardsJson)
    }

    return { cards: cachedCards };
}