import cardsJson from "$lib/v2_Cards.json" assert { type: "json" };
import monstersJson from "$lib/v2_Monsters.json" assert { type: "json" };
import { parseJson as parseCardsJson } from "$lib/cardsJsonParser";
import { parseJson as parseMonstersJson } from "$lib/monstersJsonParser";
import type { CardsJson, ClientSideCard, ClientSideMonster, MonstersJson } from "$lib/types";
import { redirect } from "@sveltejs/kit";

let cachedCards: ClientSideCard[];
let cachedMonsters: ClientSideMonster[];

export function load({ url }) {
    if (url.pathname === '/') {
        redirect(302, '/items');
    }

    if (!cachedCards) {
        cachedCards = parseCardsJson(cardsJson as CardsJson)
    }

    if (!cachedMonsters) {
        cachedMonsters = parseMonstersJson(monstersJson as MonstersJson, cachedCards)
    }

    return { cards: cachedCards, monsters: cachedMonsters };
}