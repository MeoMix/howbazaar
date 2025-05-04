import type { ItemsApiResponse } from "$lib/types";
import { getCardFilterOptions } from "$lib/utils/filterUtils";

export async function load({ fetch }) {
    const response = await fetch('/api/items');

    if (!response.ok) {
        throw new Error(`Failed to load items: ${response.statusText}`);
    }

    const { data: items, version }: ItemsApiResponse = await response.json();
    const { heroOptions, tagOptions, minimumTierOptions, sizeOptions, expansionOptions } = getCardFilterOptions(items)

    return {
        heroOptions,
        tagOptions,
        minimumTierOptions,
        sizeOptions,
        expansionOptions,
        version,
    };
}