import { describe, it, expect, beforeAll } from 'vitest';
import { parseJson as parseCardsJson } from './cardsJsonParser';
import { parseJson } from './monstersJsonParser';
import cardsJson from "$lib/v2_Cards.json" assert { type: "json" };
import monstersJson from "$lib/v2_Monsters.json" assert { type: "json" };
import type { CardsJson, ClientSideMonster, MonstersJson } from './types';

describe('monsterJsonParser', () => {
    let monsters: ClientSideMonster[];

    beforeAll(() => {
        const cards = parseCardsJson(cardsJson as CardsJson);
        monsters = parseJson(monstersJson as MonstersJson, cards);
    });

    it('should parse Viper\'s Toxic Fang', () => {
        const viper = monsters.find(monster => monster.name === "Viper");
        const toxicFang = viper?.items.find(item => item.card.name === "Fang" && item.enchantmentName === "Toxic");

        expect(toxicFang).toBeDefined();
    });
});