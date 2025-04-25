import type { ParsedMerchantCard, ClientSideMerchantCard } from "$lib/types";
// TODO: Weird to be pulling in from parsers here.
import { merchantFilterMapping } from "../../../scripts/parsers/merchantFilterMapping";

// TODO: This shouldn't be ClientSideMerchantCard[]
export function getMerchants(
    merchantCards: ParsedMerchantCard[],
): ClientSideMerchantCard[] {
    const mappedMerchantCards = merchantCards.map(merchantCard => {
        const filterMapping = merchantFilterMapping[merchantCard.id];

        return {
            ...merchantCard,
            filters: {
                sizes: filterMapping.sizeFilter,
                tagStates: filterMapping.tagStates,
                tiers: filterMapping.tierFilter,
                heros: filterMapping.heroFilter,
            },
        };
    });

    return mappedMerchantCards;
}
