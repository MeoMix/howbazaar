import type { ClientSideCardItem } from '$lib/types';
import { writable } from 'svelte/store';
import { browser } from '$app/environment'; // Svelte-specific browser check

// Key for localStorage
const LOCAL_STORAGE_KEY = 'itemsStore';

type ItemsStoreData = {
    version: string | null;
    items: ClientSideCardItem[];
}

// Load initial data from localStorage if in a browser environment
const initialData = browser
    ? (() => {
        const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);

        try {
            return storedData
                ? JSON.parse(storedData) as ItemsStoreData
                : {
                    version: null as string | null,
                    items: [] as ClientSideCardItem[],
                };
        } catch (err) {
            console.error(`Error parsing localStorage key "${LOCAL_STORAGE_KEY}":`, err);
            return {
                version: null as string | null,
                items: [] as ClientSideCardItem[],
            };
        }
    })()
    : {
        version: null as string | null,
        items: [] as ClientSideCardItem[],
    };

// Create a writable store
export const itemsStore = writable(initialData);

// Persist to localStorage whenever the store changes (only in the browser)
if (browser) {
    itemsStore.subscribe((value) => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
        } catch (err) {
            console.error(`Error saving to localStorage:`, err);
        }
    });
}
