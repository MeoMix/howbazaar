import { getVersionedItems } from "$lib/utils/dataUtils";
import { getCardFilterOptions } from "$lib/utils/filterUtils";

export function load() {
    const { items, version } = getVersionedItems();

    const { heroOptions, tagOptions, minimumTierOptions, sizeOptions } = getCardFilterOptions(items)

    return {
        heroOptions,
        tagOptions,
        minimumTierOptions,
        sizeOptions,
        version,
    };
}