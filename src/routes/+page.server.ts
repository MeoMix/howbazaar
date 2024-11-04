import cardsJson from "$lib/v2_Cards.json";
import { parseJson } from "$lib/cardsJsonParser";
import type { CardsJson, ClientSideCardItem } from "$lib/types";

export function load(): { cardItems: ClientSideCardItem[] } {
    const cardItems = parseJson(cardsJson as CardsJson);

    return { cardItems };
}