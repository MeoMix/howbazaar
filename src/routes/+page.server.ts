import cardsJson from "$lib/v2_Cards.json" assert { type: "json" };
import { parseJson } from "$lib/cardsJsonParser";
import type { CardsJson } from "$lib/types";

export function load() {
    const cards = parseJson(cardsJson as CardsJson);

    return { cards };
}