import type { ClientSideCardSkill } from '$lib/types';
import { writable } from 'svelte/store';
import { browser } from '$app/environment'; // Svelte-specific browser check

// Key for localStorage
const LOCAL_STORAGE_KEY = 'skillsStore';

type SkillsStoreData = {
    version: string | null;
    skills: ClientSideCardSkill[];
}

// Load initial data from localStorage if in a browser environment
const initialData = browser
    ? (() => {
        const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);

        try {
            return storedData
                ? JSON.parse(storedData) as SkillsStoreData
                : {
                    version: null as string | null,
                    skills: [] as ClientSideCardSkill[],
                };
        } catch (err) {
            console.error(`Error parsing localStorage key "${LOCAL_STORAGE_KEY}":`, err);
            return {
                version: null as string | null,
                skills: [] as ClientSideCardSkill[],
            };
        }
    })()
    : {
        version: null as string | null,
        skills: [] as ClientSideCardSkill[],
    };

// Create a writable store
export const skillsStore = writable(initialData);

// Persist to localStorage whenever the store changes (only in the browser)
if (browser) {
    skillsStore.subscribe((value) => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
        } catch (err) {
            console.error(`Error saving to localStorage:`, err);
        }
    });
}
