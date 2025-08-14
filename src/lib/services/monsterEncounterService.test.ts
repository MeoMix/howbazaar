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

    it('should not contain duplicate entries for Eight Arm Davvy', () => {
        const eightArmDavvyEncounters = monsterEncounterDays.flatMap((monsterEncounterDay) =>
            monsterEncounterDay.groups.flatMap((group) =>
                group.filter((monsterEncounter) => monsterEncounter.cardName === "Eight Arm Davvy")
            )
        );

        expect(eightArmDavvyEncounters.length).toBe(1);
    });

    it('should consider Eight Arm Davvy\'s Octopus item a Legendary', () => {
        const eightArmDavvy = monsterEncounterDays
            .flatMap((day) => day.groups)
            .flatMap((group) => group)
            .find((monsterEncounter) => monsterEncounter.cardName === "Eight Arm Davvy");

        const octopus = eightArmDavvy?.items.find(item => item.card.name === "Octopus");

        expect(octopus?.tierType).toEqual("Legendary");
    });
});