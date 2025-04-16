import { describe, it, expect, beforeAll } from 'vitest';
import parsedItemCards from "$lib/db/patches/latest/parsedItemCards";
import parsedSkillCards from "$lib/db/patches/latest/parsedSkillCards";
import parsedCombatEncounterCards from "$lib/db/patches/latest/parsedCombatEncounterCards";
import parsedMonsters from "$lib/db/patches/latest/parsedMonsters";
import parsedDayHours from "$lib/db/patches/latest/parsedDayHours";
import type { ClientSideMonsterEncounterDay } from '$lib/types';
import { getMonsterEncounterDays } from './monsterEncounterService';

describe('MonsterEncounterService', () => {
    let monsterEncounterDays: ClientSideMonsterEncounterDay[];

    beforeAll(() => {
        monsterEncounterDays = getMonsterEncounterDays(parsedItemCards, parsedSkillCards, parsedCombatEncounterCards, parsedMonsters, parsedDayHours);
    });

    it('should have a Coconut Crab that only has one Sea Shell', () => {
        const coconutCrab = monsterEncounterDays
            .flatMap((day) => day.groups)
            .flatMap((group) => group)
            .find((monsterEncounter) => monsterEncounter.cardName === "Coconut Crab");

        const seaShells = coconutCrab?.items.filter(item => item.card.name === "Sea Shell");

        expect(seaShells).toHaveLength(1);
    });

    it('should have an Eccentric Etherwright even though they are duplicate entries in cards.json which might confuse v2_Monsters', () => {
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

    it('should have item details for Lord of the Waste\'s Diamond Flamberge', () => {
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