import type { ClientSideMerchantCard } from '$lib/types';
import { writable } from 'svelte/store';
import { browser } from '$app/environment'; // Svelte-specific browser check
import { fetchJson } from '$lib/utils/fetchUtils';

// Key for localStorage
const LOCAL_STORAGE_KEY = 'merchantsStore';

type MerchantsStoreData = {
    version: string | null;
    merchants: ClientSideMerchantCard[];
    isLoading: boolean;
    hasError: boolean;
}

// Load initial data from localStorage if in a browser environment
const loadFromLocalStorage = (): MerchantsStoreData => {
    if (!browser) return { version: null, merchants: [], isLoading: false, hasError: false };

    try {
        const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        return storedData
            ? { ...JSON.parse(storedData), isLoading: false, hasError: false }
            : { version: null, merchants: [], isLoading: false, hasError: false };
    } catch (err) {
        console.error(`Error parsing localStorage key "${LOCAL_STORAGE_KEY}":`, err);
        return { version: null, merchants: [], isLoading: false, hasError: false };
    }
};

function createMerchantsStore() {
    const { subscribe, update } = writable<MerchantsStoreData>(loadFromLocalStorage());

    async function load(serverVersion: string) {
        let isStoreStale = false;

        subscribe((store) => {
            // If the server informs us that what's written to the store is stale - don't use it.
            isStoreStale = serverVersion !== store.version;
        })();

        if (isStoreStale) {
            try {
                update(state => ({ ...state, isLoading: true }));

                const response = await fetchJson<ClientSideMerchantCard[]>(
                    "/api/merchants",
                    serverVersion,
                );

                update(state => ({ ...state, merchants: response.data, version: response.version }));
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
export const merchantsStore = createMerchantsStore();
