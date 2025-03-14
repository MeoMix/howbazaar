import { writeFileSync } from 'fs';
import path from 'path';
import type { ParsedItemCard, ParsedSkillCard, TierType, Tag, HiddenTag, Size, Hero, EnchantmentType } from '../src/lib/types';
import { distance } from 'fastest-levenshtein';

// Types for the patch notes output
type SimplePropertyChange<T> = {
    oldValue: T | null;
    newValue: T | null;
};

type ArrayPropertyChange<T> = {
    added: T[];
    removed: T[];
};

type TooltipChange = {
    index: number;
    oldValue: string | null;
    newValue: string | null;
};

type EnchantmentChange = {
    type: EnchantmentType;
    tooltipChanges: TooltipChange[];
};

// TODO: These types are duped from types.ts?

type BaseMetadata = {
    id: string;
    name: string;
    previousStartingTier: TierType;
    currentStartingTier: TierType;
    currentSize: Size;
    type: "item" | "skill";
};

type ItemMetadata = BaseMetadata & {
    currentHero: Hero | null;
};

type SkillMetadata = BaseMetadata & {
    // TODO: rename this to currentHeroes
    heroes: Hero[];
};

type BasePatchNote = {
    name?: SimplePropertyChange<string>;
    startingTier?: SimplePropertyChange<TierType>;
    tags?: ArrayPropertyChange<Tag>;
    hiddenTags?: ArrayPropertyChange<HiddenTag>;
    size?: SimplePropertyChange<Size>;
    tooltips?: TooltipChange[];
};

type ItemPatchNote = BasePatchNote & {
    metadata: ItemMetadata;
    heroes?: ArrayPropertyChange<Hero>;
    enchantments?: {
        added: EnchantmentChange[];
        removed: EnchantmentChange[];
        modified: EnchantmentChange[];
    };
};

type SkillPatchNote = BasePatchNote & {
    metadata: SkillMetadata;
    heroes?: ArrayPropertyChange<Hero>;
};

type PatchNotes = {
    version: string;
    items: Record<string, ItemPatchNote>;
    skills: Record<string, SkillPatchNote>;
};

function compareSimpleProperty<T>(oldValue: T | undefined, newValue: T | undefined): SimplePropertyChange<T> | undefined {
    if (oldValue === newValue) return undefined;
    return {
        oldValue: oldValue ?? null,
        newValue: newValue ?? null
    };
}

function compareArrays<T>(oldArr: T[] | undefined, newArr: T[] | undefined): ArrayPropertyChange<T> | undefined {
    if (!oldArr && !newArr) return undefined;
    if (!oldArr) return { added: newArr!, removed: [] };
    if (!newArr) return { added: [], removed: oldArr };

    const added: T[] = [];
    const removed: T[] = [];

    // Convert arrays to Sets for O(1) lookups
    const oldSet = new Set(oldArr);
    const newSet = new Set(newArr);

    // Find removed items (in old but not in new)
    for (const item of oldSet) {
        if (!newSet.has(item)) {
            removed.push(item);
        }
    }

    // Find added items (in new but not in old)
    for (const item of newSet) {
        if (!oldSet.has(item)) {
            added.push(item);
        }
    }

    if (added.length === 0 && removed.length === 0) return undefined;

    return { added, removed };
}

// TODO: I think this can be simplified.
function compareTooltips(oldTooltips: string[] | undefined, newTooltips: string[] | undefined): TooltipChange[] | undefined {
    if (!oldTooltips && !newTooltips) return undefined;
    if (!oldTooltips) return newTooltips!.map((tooltip, index) => ({ index, oldValue: null, newValue: tooltip }));
    if (!newTooltips) return oldTooltips.map((tooltip, index) => ({ index, oldValue: tooltip, newValue: null }));

    const changes: TooltipChange[] = [];
    const matchedIndices = new Set<number>();
    const matchedOldIndices = new Set<number>();

    // Helper function to check if two tooltips are similar enough to be considered the same
    function areTooltipsSimilar(t1: string, t2: string): boolean {
        // Remove all numbers and special characters for comparison
        const normalize = (s: string) => s.replace(/[0-9()/]/g, '');
        const normalized1 = normalize(t1);
        const normalized2 = normalize(t2);

        // If normalized strings are identical, they're the same
        if (normalized1 === normalized2) return true;

        // If Levenshtein distance is small enough, consider them similar
        return distance(normalized1, normalized2) <= 2;
    }

    // First pass: find exact matches
    for (let i = 0; i < oldTooltips.length; i++) {
        const oldTooltip = oldTooltips[i];
        const exactMatchIndex = newTooltips.findIndex((t, j) => !matchedIndices.has(j) && t === oldTooltip);

        if (exactMatchIndex !== -1) {
            matchedIndices.add(exactMatchIndex);
            matchedOldIndices.add(i);
            continue;
        }
    }

    // Second pass: find similar matches for unmatched tooltips
    for (let i = 0; i < oldTooltips.length; i++) {
        if (matchedOldIndices.has(i)) continue;

        const oldTooltip = oldTooltips[i];
        let bestMatchIndex = -1;
        let bestMatchScore = Infinity;

        // Find the best matching tooltip
        for (let j = 0; j < newTooltips.length; j++) {
            if (matchedIndices.has(j)) continue;

            const newTooltip = newTooltips[j];
            if (areTooltipsSimilar(oldTooltip, newTooltip)) {
                const score = distance(oldTooltip, newTooltip);
                if (score < bestMatchScore) {
                    bestMatchScore = score;
                    bestMatchIndex = j;
                }
            }
        }

        if (bestMatchIndex !== -1) {
            matchedIndices.add(bestMatchIndex);
            matchedOldIndices.add(i);
            changes.push({
                index: i,
                oldValue: oldTooltip,
                newValue: newTooltips[bestMatchIndex]
            });
        } else {
            // No match found, this tooltip was removed
            matchedOldIndices.add(i);
            changes.push({
                index: i,
                oldValue: oldTooltip,
                newValue: null
            });
        }
    }

    // Third pass: find new tooltips that weren't matched
    for (let i = 0; i < newTooltips.length; i++) {
        if (!matchedIndices.has(i)) {
            changes.push({
                index: i,
                oldValue: null,
                newValue: newTooltips[i]
            });
        }
    }

    return changes.length > 0 ? changes : undefined;
}

function compareEnchantments(
    oldEnchantments: { type: EnchantmentType; tooltips: string[] }[] | undefined,
    newEnchantments: { type: EnchantmentType; tooltips: string[] }[] | undefined
): { added: EnchantmentChange[]; removed: EnchantmentChange[]; modified: EnchantmentChange[] } | undefined {
    if (!oldEnchantments && !newEnchantments) return undefined;
    if (!oldEnchantments) {
        return {
            added: newEnchantments!.map(e => ({ type: e.type, tooltipChanges: e.tooltips.map((t, i) => ({ index: i, oldValue: null, newValue: t })) })),
            removed: [],
            modified: []
        };
    }
    if (!newEnchantments) {
        return {
            added: [],
            removed: oldEnchantments.map(e => ({ type: e.type, tooltipChanges: e.tooltips.map((t, i) => ({ index: i, oldValue: t, newValue: null })) })),
            modified: []
        };
    }

    const oldMap = new Map(oldEnchantments.map(e => [e.type, e]));
    const newMap = new Map(newEnchantments.map(e => [e.type, e]));
    const processedTypes = new Set<EnchantmentType>();

    const added: EnchantmentChange[] = [];
    const removed: EnchantmentChange[] = [];
    const modified: EnchantmentChange[] = [];

    // Process all enchantments in a single pass
    for (const [type, newEnchantment] of newMap) {
        processedTypes.add(type);
        const oldEnchantment = oldMap.get(type);

        if (!oldEnchantment) {
            // Added enchantment
            added.push({
                type,
                tooltipChanges: newEnchantment.tooltips.map((t, i) => ({ index: i, oldValue: null, newValue: t }))
            });
        } else {
            // Check for modifications
            const tooltipChanges = compareTooltips(oldEnchantment.tooltips, newEnchantment.tooltips);
            if (tooltipChanges) {
                modified.push({
                    type,
                    tooltipChanges
                });
            }
        }
    }

    // Process removed enchantments
    for (const [type, oldEnchantment] of oldMap) {
        if (!processedTypes.has(type)) {
            removed.push({
                type,
                tooltipChanges: oldEnchantment.tooltips.map((t, i) => ({ index: i, oldValue: t, newValue: null }))
            });
        }
    }

    if (added.length === 0 && removed.length === 0 && modified.length === 0) return undefined;

    return { added, removed, modified };
}

function generateItemPatchNote(oldItem: ParsedItemCard | undefined, newItem: ParsedItemCard | undefined): ItemPatchNote | undefined {
    if (!oldItem && !newItem) return undefined;
    if (!oldItem) {
        return {
            metadata: {
                id: newItem!.id,
                name: newItem!.name,
                previousStartingTier: newItem!.startingTier,
                currentStartingTier: newItem!.startingTier,
                currentHero: newItem!.heroes[0] || null,
                currentSize: newItem!.size,
                type: "item"
            },
            name: { oldValue: null, newValue: newItem!.name },
            startingTier: { oldValue: null, newValue: newItem!.startingTier },
            tags: { added: newItem!.tags, removed: [] },
            hiddenTags: { added: newItem!.hiddenTags, removed: [] },
            size: { oldValue: null, newValue: newItem!.size },
            heroes: { added: newItem!.heroes, removed: [] },
            tooltips: newItem!.unifiedTooltips.map((t, i) => ({ index: i, oldValue: null, newValue: t })),
            enchantments: {
                added: newItem!.enchantments.map(e => ({ type: e.type, tooltipChanges: e.tooltips.map((t, i) => ({ index: i, oldValue: null, newValue: t })) })),
                removed: [],
                modified: []
            }
        };
    }
    if (!newItem) {
        return {
            metadata: {
                id: oldItem.id,
                name: oldItem.name,
                previousStartingTier: oldItem.startingTier,
                currentStartingTier: oldItem.startingTier,
                currentHero: oldItem.heroes[0] || null,
                currentSize: oldItem.size,
                type: "item"
            },
            name: { oldValue: oldItem.name, newValue: null },
            startingTier: { oldValue: oldItem.startingTier, newValue: null },
            tags: { added: [], removed: oldItem.tags },
            hiddenTags: { added: [], removed: oldItem.hiddenTags },
            size: { oldValue: oldItem.size, newValue: null },
            heroes: { added: [], removed: oldItem.heroes },
            tooltips: oldItem.unifiedTooltips.map((t, i) => ({ index: i, oldValue: t, newValue: null })),
            enchantments: {
                added: [],
                removed: oldItem.enchantments.map(e => ({ type: e.type, tooltipChanges: e.tooltips.map((t, i) => ({ index: i, oldValue: t, newValue: null })) })),
                modified: []
            }
        };
    }

    const patchNote: ItemPatchNote = {
        metadata: {
            id: newItem.id,
            name: newItem.name,
            previousStartingTier: oldItem.startingTier,
            currentStartingTier: newItem.startingTier,
            currentHero: newItem.heroes[0] || null,
            currentSize: newItem.size,
            type: "item"
        }
    };

    // Define property comparisons with proper typing
    type PropertyComparison<T> = {
        key: keyof ItemPatchNote;
        compare: (old: any, new_: any) => T | undefined;
        old: any;
        new: any;
    };

    const propertyComparisons: PropertyComparison<any>[] = [
        { key: 'name', compare: compareSimpleProperty, old: oldItem.name, new: newItem.name },
        { key: 'startingTier', compare: compareSimpleProperty, old: oldItem.startingTier, new: newItem.startingTier },
        { key: 'size', compare: compareSimpleProperty, old: oldItem.size, new: newItem.size },
        { key: 'tags', compare: compareArrays, old: oldItem.tags, new: newItem.tags },
        { key: 'hiddenTags', compare: compareArrays, old: oldItem.hiddenTags, new: newItem.hiddenTags },
        { key: 'heroes', compare: compareArrays, old: oldItem.heroes, new: newItem.heroes },
        { key: 'tooltips', compare: compareTooltips, old: oldItem.unifiedTooltips, new: newItem.unifiedTooltips }
    ];

    // Compare all properties
    for (const { key, compare, old, new: newValue } of propertyComparisons) {
        const result = compare(old, newValue);
        if (result) {
            patchNote[key] = result;
        }
    }

    // Compare enchantments separately due to its special structure
    const enchantmentsChange = compareEnchantments(oldItem.enchantments, newItem.enchantments);
    if (enchantmentsChange) {
        patchNote.enchantments = enchantmentsChange;
    }

    // Only return the patch note if there are actual changes
    return Object.keys(patchNote).length > 1 ? patchNote : undefined;
}

function generateSkillPatchNote(oldSkill: ParsedSkillCard | undefined, newSkill: ParsedSkillCard | undefined): SkillPatchNote | undefined {
    if (!oldSkill && !newSkill) return undefined;
    if (!oldSkill) {
        return {
            metadata: {
                id: newSkill!.id,
                name: newSkill!.name,
                previousStartingTier: newSkill!.startingTier,
                currentStartingTier: newSkill!.startingTier,
                heroes: newSkill!.heroes,
                currentSize: newSkill!.size,
                type: "skill"
            },
            name: { oldValue: null, newValue: newSkill!.name },
            startingTier: { oldValue: null, newValue: newSkill!.startingTier },
            tags: { added: newSkill!.tags, removed: [] },
            hiddenTags: { added: newSkill!.hiddenTags, removed: [] },
            size: { oldValue: null, newValue: newSkill!.size },
            heroes: { added: newSkill!.heroes, removed: [] },
            tooltips: newSkill!.unifiedTooltips.map((t, i) => ({ index: i, oldValue: null, newValue: t }))
        };
    }
    if (!newSkill) {
        return {
            metadata: {
                id: oldSkill.id,
                name: oldSkill.name,
                previousStartingTier: oldSkill.startingTier,
                currentStartingTier: oldSkill.startingTier,
                heroes: oldSkill.heroes,
                currentSize: oldSkill.size,
                type: "skill"
            },
            name: { oldValue: oldSkill.name, newValue: null },
            startingTier: { oldValue: oldSkill.startingTier, newValue: null },
            tags: { added: [], removed: oldSkill.tags },
            hiddenTags: { added: [], removed: oldSkill.hiddenTags },
            size: { oldValue: oldSkill.size, newValue: null },
            heroes: { added: [], removed: oldSkill.heroes },
            tooltips: oldSkill.unifiedTooltips.map((t, i) => ({ index: i, oldValue: t, newValue: null }))
        };
    }

    const patchNote: SkillPatchNote = {
        metadata: {
            id: newSkill.id,
            name: newSkill.name,
            previousStartingTier: oldSkill.startingTier,
            currentStartingTier: newSkill.startingTier,
            heroes: newSkill.heroes,
            currentSize: newSkill.size,
            type: "skill"
        }
    };

    // Define property comparisons with proper typing
    type PropertyComparison<T> = {
        key: keyof SkillPatchNote;
        compare: (old: any, new_: any) => T | undefined;
        old: any;
        new: any;
    };

    const propertyComparisons: PropertyComparison<any>[] = [
        { key: 'name', compare: compareSimpleProperty, old: oldSkill.name, new: newSkill.name },
        { key: 'startingTier', compare: compareSimpleProperty, old: oldSkill.startingTier, new: newSkill.startingTier },
        { key: 'size', compare: compareSimpleProperty, old: oldSkill.size, new: newSkill.size },
        { key: 'tags', compare: compareArrays, old: oldSkill.tags, new: newSkill.tags },
        { key: 'hiddenTags', compare: compareArrays, old: oldSkill.hiddenTags, new: newSkill.hiddenTags },
        { key: 'heroes', compare: compareArrays, old: oldSkill.heroes, new: newSkill.heroes },
        { key: 'tooltips', compare: compareTooltips, old: oldSkill.unifiedTooltips, new: newSkill.unifiedTooltips }
    ];

    // Compare all properties
    for (const { key, compare, old, new: newValue } of propertyComparisons) {
        const result = compare(old, newValue);
        if (result) {
            patchNote[key] = result;
        }
    }

    // Only return the patch note if there are actual changes
    return Object.keys(patchNote).length > 1 ? patchNote : undefined;
}

// Run the script
export function getPatchNotes(oldItems: ParsedItemCard[], newItems: ParsedItemCard[], oldSkills: ParsedSkillCard[], newSkills: ParsedSkillCard[]): PatchNotes {
    // Create maps for easier lookup
    const oldItemsMap = new Map(oldItems.map((item: ParsedItemCard) => [item.id, item]));
    const newItemsMap = new Map(newItems.map((item: ParsedItemCard) => [item.id, item]));
    const oldSkillsMap = new Map(oldSkills.map((skill: ParsedSkillCard) => [skill.id, skill]));
    const newSkillsMap = new Map(newSkills.map((skill: ParsedSkillCard) => [skill.id, skill]));

    // Generate patch notes for all items
    const items: Record<string, ItemPatchNote> = {};
    const skills: Record<string, SkillPatchNote> = {};

    // Check all items in both versions
    const allItemIds = new Set([...oldItemsMap.keys(), ...newItemsMap.keys()]);
    const allSkillIds = new Set([...oldSkillsMap.keys(), ...newSkillsMap.keys()]);

    for (const id of allItemIds) {
        const oldItem = oldItemsMap.get(id);
        const newItem = newItemsMap.get(id);

        const patchNote = generateItemPatchNote(oldItem, newItem);
        if (patchNote) {
            items[id] = patchNote;
        }
    }

    for (const id of allSkillIds) {
        const oldSkill = oldSkillsMap.get(id);
        const newSkill = newSkillsMap.get(id);

        const patchNote = generateSkillPatchNote(oldSkill, newSkill);
        if (patchNote) {
            skills[id] = patchNote;
        }
    }

    return {
        version: 'current', // This will be overridden by generatePatchNotes
        items,
        skills
    };
}

async function loadParsedCards<T>(filePath: string): Promise<T> {
    return (await import(filePath)).default as T;
}

export async function generatePatchNotes(oldVersion: string, newVersion: string): Promise<void> {
    // Read the files
    const oldItemsPath = path.resolve(`./src/lib/db/patches/${oldVersion}/parsedItemCards.ts`);
    const newItemsPath = path.resolve(`./src/lib/db/patches/${newVersion}/parsedItemCards.ts`);
    const oldSkillsPath = path.resolve(`./src/lib/db/patches/${oldVersion}/parsedSkillCards.ts`);
    const newSkillsPath = path.resolve(`./src/lib/db/patches/${newVersion}/parsedSkillCards.ts`);

    // Import and get the default export from both files
    const { default: oldItems } = await import(oldItemsPath) as { default: ParsedItemCard[] };
    const { default: newItems } = await import(newItemsPath) as { default: ParsedItemCard[] };
    const { default: oldSkills } = await import(oldSkillsPath) as { default: ParsedSkillCard[] };
    const { default: newSkills } = await import(newSkillsPath) as { default: ParsedSkillCard[] };

    // Generate patch notes
    const patchNotes = getPatchNotes(oldItems, newItems, oldSkills, newSkills);
    patchNotes.version = newVersion;

    // Write the patch notes as a TypeScript file
    const patchNotesPath = path.resolve(`./src/lib/db/patches/${newVersion}/patchNotes.ts`);
    const fileContent = `// Auto-generated file. Do not edit directly.
// TypeScript representation of processed data.
import type { PatchNotes } from '$lib/types';

const data: PatchNotes = ${JSON.stringify(patchNotes, null, 2)};

export default data;
`;
    writeFileSync(patchNotesPath, fileContent);
}

// CLI argument handling
function printUsage() {
    console.log('Usage: ts-node generatePatchNotes.ts <oldVersion> <newVersion>');
    console.log('Example: ts-node generatePatchNotes.ts 1.0.0 1.1.0');
    process.exit(1);
}

function getVersionsFromCLI(): { oldVersion: string; newVersion: string } {
    const args = process.argv.slice(2); // Remove node and script name from args

    if (args.length !== 2) {
        console.error('Error: Exactly two version arguments are required.');
        printUsage();
    }

    const [oldVersion, newVersion] = args;
    return { oldVersion, newVersion };
}

// Run the script
const { oldVersion, newVersion } = getVersionsFromCLI();
generatePatchNotes(oldVersion, newVersion).catch((error) => {
    console.error('Error generating patch notes:', error);
    process.exit(1);
});