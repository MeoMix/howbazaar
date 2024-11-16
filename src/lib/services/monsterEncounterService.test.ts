import { describe, it, expect, beforeAll } from 'vitest';
import { parseJson as parseCardsJson } from '../cardsJsonParser';
import { parseJson as parseMonstersJson } from '../monstersJsonParser';
import { parseJson as parseDayHoursJson } from '../dayHoursJsonParser';
import cardsJson from "$lib/v2_Cards.json" assert { type: "json" };
import monstersJson from "$lib/v2_Monsters.json" assert { type: "json" };
import dayHoursJson from "$lib/v2_DayHours.json" assert { type: "json" };
import type { CardsJson, Monster, MonsterEncounterDay, MonstersJson } from '../types';
import type { ClientSideCard, ClientSideDayHours, DayHoursJson } from '$lib/types';
import { getMonsterEncounterDays } from './monsterEncounterService';

describe('MonsterEncounterService', () => {
    let cards: ClientSideCard[];
    let monsters: Monster[];
    let dayHours: ClientSideDayHours[];
    let monsterEncounterDays: MonsterEncounterDay[];

    beforeAll(() => {
        cards = parseCardsJson(cardsJson as CardsJson);
        monsters = parseMonstersJson(monstersJson as MonstersJson);
        dayHours = parseDayHoursJson(dayHoursJson as DayHoursJson);

        monsterEncounterDays = getMonsterEncounterDays(cards, monsters, dayHours);
    });

    it('should have an Eccentric Etherwright even though they are duplicate entries in v2_Cards which might confuse v2_Monsters', () => {
        const eccentricEtherwrightEncounter = monsterEncounterDays.find((monsterEncounterDay) =>
            monsterEncounterDay.groups.some((group) =>
                group.some((monsterEncounter) =>
                    monsterEncounter.cardName === "Eccentric Etherwright"
                )
            )
        );

        expect(eccentricEtherwrightEncounter).toBeDefined();
    });

    it('should have a Viper encounter, and Viper should have a Fang with a Toxic enchantment', () => {
        const viperEncounter = monsterEncounterDays.find((monsterEncounterDay) =>
            monsterEncounterDay.groups.some((group) =>
                group.some((monsterEncounter) =>
                    monsterEncounter.cardName === "Viper" &&
                    monsterEncounter.items.some(item => item.card.name === "Fang" && item.enchantmentType === "Toxic")
                )
            )
        );

        expect(viperEncounter).toBeDefined();
    });

    it('should not contain duplicate entries for Veteran Octopus', () => {
        const veteranOctopusEncounters = monsterEncounterDays.flatMap((monsterEncounterDay) =>
            monsterEncounterDay.groups.flatMap((group) =>
                group.filter((monsterEncounter) => monsterEncounter.cardName === "Veteran Octopus")
            )
        );

        expect(veteranOctopusEncounters.length).toBe(1);
    });

    it('should consider Veteran Octopus\'s Octopus item a Legendary', () => {
        const veteranOctopus = monsterEncounterDays
            .flatMap((day) => day.groups)
            .flatMap((group) => group)
            .find((monsterEncounter) => monsterEncounter.cardName === "Veteran Octopus");

        const octopus = veteranOctopus?.items.find(item => item.card.name === "Octopus");

        expect(octopus?.tierType).toEqual("Legendary");
    });

    it('should have item details for Lord of the Waste\'s Legendary Flamberge', () => {
        const lordOfTheWastes = monsterEncounterDays
            .flatMap((day) => day.groups)
            .flatMap((group) => group)
            .find((monsterEncounter) => monsterEncounter.cardName === "Lord of the Wastes");

        const flamberge = lordOfTheWastes?.items.find(item => item.card.name === "Flamberge");

        expect(flamberge?.card.tiers[flamberge.tierType]?.tooltips).toHaveLength(2);
    });

    it('should have item details for Thug\'s Spices (at Diamond not Gold)', () => {
        const thug = monsterEncounterDays
            .flatMap((day) => day.groups)
            .flatMap((group) => group)
            .find((monsterEncounter) => monsterEncounter.cardName === "Thug");

        const spices = thug?.items.find(item => item.card.name === "Spices");

        expect(spices?.card.tiers[spices.tierType]?.tooltips).toHaveLength(1);
    });
});