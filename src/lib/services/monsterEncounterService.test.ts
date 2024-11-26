import { describe, it, expect, beforeAll } from 'vitest';
import { parseJson as parseCardsJson } from '$lib/parsers/cardsJsonParser';
import { parseJson as parseMonstersJson } from '$lib/parsers/monstersJsonParser';
import { parseJson as parseDayHoursJson } from '$lib/parsers/dayHoursJsonParser';
import cardsJson from "$lib/v2_Cards.json" assert { type: "json" };
import monstersJson from "$lib/v2_Monsters.json" assert { type: "json" };
import dayHoursJson from "$lib/v2_DayHours.json" assert { type: "json" };
import type { CardsJson, ClientSideCardCombatEncounter, ClientSideCardItem, ClientSideCardSkill, Monster, MonsterEncounterDay, MonstersJson } from '$lib/types';
import type { ClientSideDayHours, DayHoursJson } from '$lib/types';
import { getMonsterEncounterDays } from './monsterEncounterService';

describe('MonsterEncounterService', () => {
    let itemCards: ClientSideCardItem[];
    let skillCards: ClientSideCardSkill[];
    let combatEncounterCards: ClientSideCardCombatEncounter[];

    let monsters: Monster[];
    let dayHours: ClientSideDayHours[];
    let monsterEncounterDays: MonsterEncounterDay[];

    beforeAll(() => {
        const parsedCardsJson = parseCardsJson(cardsJson as CardsJson);
        itemCards = parsedCardsJson.itemCards;
        skillCards = parsedCardsJson.skillCards;
        combatEncounterCards = parsedCardsJson.combatEncounterCards;

        monsters = parseMonstersJson(monstersJson as MonstersJson);
        dayHours = parseDayHoursJson(dayHoursJson as DayHoursJson);

        monsterEncounterDays = getMonsterEncounterDays(itemCards, skillCards, combatEncounterCards, monsters, dayHours);
    });

    it('should have a Coconut Crab that only has one Sea Shell', () => {
        const coconutCrab = monsterEncounterDays
            .flatMap((day) => day.groups)
            .flatMap((group) => group)
            .find((monsterEncounter) => monsterEncounter.cardName === "Coconut Crab");

        const seaShells = coconutCrab?.items.filter(item => item.card.name === "Sea Shell");

        expect(seaShells).toHaveLength(1);
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

        expect(flamberge?.card.tiers[flamberge.tierType]?.tooltips).toHaveLength(3);
    });

    it('should have item details for Thug\'s Spices (at Diamond not Gold)', () => {
        const thug = monsterEncounterDays
            .flatMap((day) => day.groups)
            .flatMap((group) => group)
            .find((monsterEncounter) => monsterEncounter.cardName === "Thug");

        const spices = thug?.items.find(item => item.card.name === "Spices");

        expect(spices?.card.tiers[spices.tierType]?.tooltips).toHaveLength(3);
    });
});