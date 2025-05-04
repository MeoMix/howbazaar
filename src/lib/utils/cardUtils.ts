import type { CorePackId, ExpansionPackId } from "$lib/types";

export const CORE_PACK_IDS: Set<CorePackId> = new Set([
    "Core",
    "Pygmalien_Core",
    "Vanessa_Core",
    "Dooley_Core",
    "Mak_Core",
    "Jules_Core",
    "Stelle_Core"
]);

export const HEROES = ["Vanessa", "Pygmalien", "Dooley", "Mak", "Jules", "Stelle"] as const;

export function isExpansionPack(packId: CorePackId | ExpansionPackId): packId is ExpansionPackId {
    return !CORE_PACK_IDS.has(packId as CorePackId);
}

export function getExpansionPackName(packId: ExpansionPackId): string {
    // First replace underscores with spaces
    let packName = packId.replace(/_/g, " ");

    // Remove any hero names from the pack name
    for (const hero of HEROES) {
        // Use word boundaries to ensure exact matches
        packName = packName.replace(new RegExp(`\\b${hero}\\b`, 'g'), "").trim();
        // Also filter out 3-letter abbreviations of the hero name (as exact words)
        const abbr = hero.substring(0, 3);
        packName = packName.replace(new RegExp(`\\b${abbr}\\b`, 'g'), "").trim();
    }

    return packName;
}