import type { ItemsApiResponse, MerchantsApiResponse } from "$lib/types";
import { getCardFilterOptions } from "$lib/utils/filterUtils";

export async function load({ fetch }) {
    const merchantsResponse = await fetch('/api/merchants');

    if (!merchantsResponse.ok) {
        throw new Error(`Failed to load merchants: ${merchantsResponse.statusText}`);
    }

    const { version }: MerchantsApiResponse = await merchantsResponse.json();

    const itemsResponse = await fetch('/api/items');

    if (!itemsResponse.ok) {
        throw new Error(`Failed to load items: ${itemsResponse.statusText}`);
    }

    const { data: items, version: itemsVersion }: ItemsApiResponse = await itemsResponse.json();

    const { heroOptions, tagOptions, minimumTierOptions, sizeOptions, expansionOptions } = getCardFilterOptions(items);

    return {
        heroOptions,
        tagOptions,
        minimumTierOptions,
        sizeOptions,
        expansionOptions,
        version,
        itemsVersion,
    };
}