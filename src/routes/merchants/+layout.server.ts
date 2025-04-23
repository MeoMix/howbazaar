import type { MerchantsApiResponse } from "$lib/types";
import { getCardFilterOptions } from "$lib/utils/filterUtils";

export async function load({ fetch }) {
    const response = await fetch('/api/merchants');

    if (!response.ok) {
        throw new Error(`Failed to load merchants: ${response.statusText}`);
    }

    const { data: merchants, version }: MerchantsApiResponse = await response.json();
    // const { heroOptions, tagOptions, minimumTierOptions, sizeOptions } = getCardFilterOptions(merchants)

    return { version };
}