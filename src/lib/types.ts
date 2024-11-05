import type { V2CardsD as Card } from "$lib/v2_Cards";

export type CardsJson = { [key: string]: Card };

// TODO: Fix naming
export type ClientSideCard = {
    // TODO: Change to Type
    $type: "TCardItem" | "TCardSkill";
    name: string;
    tiers: {
        // TODO: This should be TierType
        [key: string]: {
            attributes: {
                name: string;
                value: number;
                valueDescriptor: string | null;
            }[];
            tooltips: string[];
        }
    };
    tags: string[];
    hiddenTags: string[];
    size: "Small" | "Medium" | "Large";
    heroes: string[];
}
