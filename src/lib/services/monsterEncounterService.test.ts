import { describe, it, expect, beforeAll } from 'vitest';
import parsedItemCards from "$lib/processedItemCards.json" assert { type: "json" };
import parsedSkillCards from "$lib/processedSkillCards.json" assert { type: "json" };
import parsedCombatEncounterCards from "$lib/processedCombatEncounterCards.json" assert { type: "json" };
import parsedMonsters from "$lib/processedMonsters.json" assert { type: "json" };
import parsedDayHours from "$lib/processedDayHours.json" assert { type: "json" };
import type { ParsedCardCombatEncounter, ParsedCardItem, ParsedCardSkill, Monster, MonsterEncounterDay } from '$lib/types';
import type { ClientSideDayHours } from '$lib/types';
import { getMonsterEncounterDays } from './monsterEncounterService';

describe('MonsterEncounterService', () => {
    let itemCards = parsedItemCards as ParsedCardItem[];
    let skillCards = parsedSkillCards as ParsedCardSkill[];
    let combatEncounterCards = parsedCombatEncounterCards as ParsedCardCombatEncounter[];
    let monsters = parsedMonsters as Monster[];
    let dayHours = parsedDayHours as ClientSideDayHours[];

    let monsterEncounterDays: MonsterEncounterDay[];

    beforeAll(() => {
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