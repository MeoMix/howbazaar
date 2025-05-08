export type KeywordPart = {
    type: "keyword";
    text: string;
    effect: string;
};

const keywordEffects: Record<string, string[]> = {
    damage: ["Crit Chance", "Damage", "Damages"],
    heal: ["Heal", "Heals", "Health", "Max Health", "Regeneration", "Regen"],
    ammo: ["Ammo", "Max Ammo"],
    shield: ["Shield", "Shields"],
    haste: ["Haste", "Hastes"],
    charge: ["Charge", "Charges"],
    slow: ["Slow", "Slows"],
    poison: ["Poison", "Poisons"],
    freeze: ["Freeze"],
    burn: ["Burn", "Burns"],
    value: ["Economic"],
    tag: [
        "Friend", "Friends",
        "Property", "Properties",
        "Weapon", "Weapons", "Non-Weapon", "Non-Weapons",
        "Vehicle", "Vehicles",
        "Tool", "Tools",
        "Aquatic", "Toy", "Toys",
        "Reagent", "Reagents",
        "Apparel", "Potion", "Potions"
    ]
};

function escapeRegex(keyword: string): string {
    return keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const keywordEffectMap: Record<string, string> = {};
for (const [effect, keywords] of Object.entries(keywordEffects)) {
    for (const keyword of keywords) {
        keywordEffectMap[keyword] = effect;
    }
}

const sortedKeywords = Object.keys(keywordEffectMap).sort((a, b) => b.length - a.length);
const keywordRegex = new RegExp(
    `\\b(${sortedKeywords.map(escapeRegex).join("|")})\\b`,
    "gi"
);

/**
 * Processes a text string and wraps recognized keywords with their associated effect styles.
 *
 * @param text The text to process.
 * @returns An array of plain strings and keyword parts for rendering.
 */
export function highlightKeywords(text: string): Array<string | KeywordPart> {
    if (!text) return [];

    const parts: Array<string | KeywordPart> = [];
    let lastIndex = 0;

    for (const match of text.matchAll(keywordRegex)) {
        const matchStart = match.index!;
        const matchEnd = matchStart + match[0].length;

        // Add plain text before the match
        if (matchStart > lastIndex) {
            parts.push(text.slice(lastIndex, matchStart));
        }

        const matchedText = match[0];
        const effectKey = sortedKeywords.find(
            key => key.toLowerCase() === matchedText.toLowerCase()
        )!;

        parts.push({
            type: "keyword",
            text: matchedText,
            effect: keywordEffectMap[effectKey],
        });

        lastIndex = matchEnd;
    }

    // Add any remaining text
    if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
    }

    return parts;
}
