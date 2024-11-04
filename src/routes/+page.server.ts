
import getParsedJson from "$lib/cardsJsonParser";
import type { ClientSideCardItem } from "$lib/types";

export function load(): { cardItems: ClientSideCardItem[] } {
    const cardItems = getParsedJson();

    return { cardItems };
}