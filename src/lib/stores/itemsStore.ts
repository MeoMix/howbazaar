import type { ClientSideItemCard } from '$lib/types';
import { writable } from 'svelte/store';
import { browser } from '$app/environment'; // Svelte-specific browser check
import { fetchJson } from '$lib/utils/fetchUtils';

// Key for localStorage
const LOCAL_STORAGE_KEY = 'itemsStore';

type ItemsStoreData = {
    version: string | null;
    items: ClientSideItemCard[];
    isLoading: boolean;
    hasError: boolean;
}

// Load initial data from localStorage if in a browser environment
const loadFromLocalStorage = (): ItemsStoreData => {
    if (!browser) return { version: null, items: [], isLoading: false, hasError: false };

    try {
        const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        return storedData
            ? { ...JSON.parse(storedData), isLoading: false, hasError: false }
            : { version: null, items: [], isLoading: false, hasError: false };
    } catch (err) {
        console.error(`Error parsing localStorage key "${LOCAL_STORAGE_KEY}":`, err);
        return { version: null, items: [], isLoading: false, hasError: false };
    }
};

function createItemsStore() {
    const { subscribe, update } = writable<ItemsStoreData>(loadFromLocalStorage());

    async function load(serverVersion: string) {
        let isStoreStale = false;

        subscribe((store) => {
            // If the server informs us that what's written to the store is stale - don't use it.
            isStoreStale = serverVersion !== store.version;
        })();

        if (isStoreStale) {
            try {
                update(state => ({ ...state, isLoading: true }));

                const response = await fetchJson<ClientSideItemCard[]>(
                    "/api/items",
                    serverVersion,
                );

                update(state => ({ ...state, items: response.data, version: response.version }));
            } catch (error) {
                console.error(error);
                update(state => ({ ...state, hasError: true }));
            } finally {
                update(state => ({ ...state, isLoading: false }));
            }
        }
    }

    // Persist to localStorage whenever the store changes (only in the browser)
    if (browser) {
        subscribe((value) => {
            try {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
            } catch (err) {
                console.error(`Error saving to localStorage:`, err);
            }
        });
    }

    return { subscribe, load };
}

// Create and export singleton store instance
export const itemsStore = createItemsStore();
