import type { ClientSideMonsterEncounterDay } from '$lib/types';
import { writable } from 'svelte/store';
import { browser } from '$app/environment'; // Svelte-specific browser check

// Key for localStorage
const LOCAL_STORAGE_KEY = 'monsterEncounterDaysStore';

type MonsterEncounterDaysStoreData = {
    version: string | null;
    monsterEncounterDays: ClientSideMonsterEncounterDay[];
}

// Load initial data from localStorage if in a browser environment
const initialData = browser
    ? (() => {
        const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);

        try {
            return storedData
                ? JSON.parse(storedData) as MonsterEncounterDaysStoreData
                : {
                    version: null as string | null,
                    monsterEncounterDays: [] as ClientSideMonsterEncounterDay[],
                };
        } catch (err) {
            console.error(`Error parsing localStorage key "${LOCAL_STORAGE_KEY}":`, err);
            return {
                version: null as string | null,
                monsterEncounterDays: [] as ClientSideMonsterEncounterDay[],
            };
        }
    })()
    : {
        version: null as string | null,
        monsterEncounterDays: [] as ClientSideMonsterEncounterDay[],
    };

// Create a writable store
export const monsterEncounterDaysStore = writable(initialData);

// Persist to localStorage whenever the store changes (only in the browser)
if (browser) {
    monsterEncounterDaysStore.subscribe((value) => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
        } catch (err) {
            console.error(`Error saving to localStorage:`, err);
        }
    });
}
