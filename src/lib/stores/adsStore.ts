import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const LOCAL_STORAGE_KEY = 'adsStore_v2';

type AdsStoreData = {
    showAds: boolean;
}

const loadFromLocalStorage = (): AdsStoreData => {
    if (!browser) return { showAds: false };

    try {
        const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        return storedData
            ? { ...JSON.parse(storedData) }
            : { showAds: true };
    } catch (err) {
        console.error(`Error parsing localStorage key "${LOCAL_STORAGE_KEY}":`, err);
        return { showAds: true };
    }
};

function createAdsStore() {
    const { subscribe, set, update } = writable<AdsStoreData>(loadFromLocalStorage());

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

    return {
        subscribe,
        toggle: () => {
            update(value => {
                return { showAds: !value.showAds };
            });
        },
        show: () => {
            set({ showAds: true });
        },
        hide: () => {
            set({ showAds: false });
        }
    };
}

export const adsStore = createAdsStore(); 