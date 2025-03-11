<script lang="ts">
    import UnifiedTooltip from "$lib/components/UnifiedTooltip.svelte";
    import type {
        TierType,
        Tag,
        HiddenTag,
        Size,
        Hero,
        EnchantmentType,
    } from "$lib/types";
    import { Card } from "flowbite-svelte";
    import type { PageData } from "./$types";

    export let data: PageData;

    interface SimplePropertyChange<T> {
        oldValue: T | null;
        newValue: T | null;
    }

    interface ArrayPropertyChange<T> {
        added: T[];
        removed: T[];
    }

    interface TooltipChange {
        index: number;
        oldValue: string | null;
        newValue: string | null;
    }

    interface EnchantmentChange {
        type: EnchantmentType;
        tooltipChanges: TooltipChange[];
    }

    interface ItemMetadata {
        id: string;
        name: string;
        previousStartingTier: TierType;
        currentStartingTier: TierType;
    }

    interface ItemPatchNote {
        metadata: ItemMetadata;
        name?: SimplePropertyChange<string>;
        startingTier?: SimplePropertyChange<TierType>;
        tags?: ArrayPropertyChange<Tag>;
        hiddenTags?: ArrayPropertyChange<HiddenTag>;
        size?: SimplePropertyChange<Size>;
        heroes?: ArrayPropertyChange<Hero>;
        tooltips?: TooltipChange[];
        enchantments?: {
            added: EnchantmentChange[];
            removed: EnchantmentChange[];
            modified: EnchantmentChange[];
        };
    }

    interface SkillMetadata {
        id: string;
        name: string;
        previousStartingTier: TierType;
        currentStartingTier: TierType;
        heroes: Hero[];
    }

    interface SkillPatchNote {
        metadata: SkillMetadata;
        name?: SimplePropertyChange<string>;
        startingTier?: SimplePropertyChange<TierType>;
        tags?: ArrayPropertyChange<Tag>;
        hiddenTags?: ArrayPropertyChange<HiddenTag>;
        size?: SimplePropertyChange<Size>;
        heroes?: ArrayPropertyChange<Hero>;
        tooltips?: TooltipChange[];
    }

    interface RenderedPatchNote {
        propName: string;
        change: any;
        previousTier: TierType;
        currentTier: TierType;
    }

    // Helper function to get all changed properties
    function getChangedProperties(patchNote: ItemPatchNote | SkillPatchNote) {
        return Object.entries(patchNote).filter(([key]) => key !== "metadata");
    }

    // Format array values for display
    function formatArrayValues(values: any[]): string {
        return values.join(", ");
    }

    // Format a single value for display
    function formatValue(value: any): string {
        if (!value) return "";
        if (typeof value === "string") return value;
        if (Array.isArray(value)) return formatArrayValues(value);
        return String(value);
    }

    // Helper function to get aligned tooltips
    function getAlignedTooltips(changes: TooltipChange[]) {
        if (!changes?.length) return { old: [], new: [] };

        // First, merge changes at the same index and collect unique indices
        const mergedChanges = new Map<
            number,
            { oldValue: string | null; newValue: string | null }
        >();

        for (const change of changes) {
            const existing = mergedChanges.get(change.index);
            if (existing) {
                // If we already have a change at this index, merge them
                mergedChanges.set(change.index, {
                    oldValue: change.oldValue ?? existing.oldValue,
                    newValue: change.newValue ?? existing.newValue,
                });
            } else {
                // New change at this index
                mergedChanges.set(change.index, {
                    oldValue: change.oldValue,
                    newValue: change.newValue,
                });
            }
        }

        // Convert to array and sort by index
        const sortedChanges = Array.from(mergedChanges.entries())
            .filter(
                ([_, change]) =>
                    change.oldValue !== null || change.newValue !== null,
            )
            .sort(([a], [b]) => a - b);

        if (!sortedChanges.length) return { old: [], new: [] };

        // Create arrays of the exact size needed
        const oldTooltips = sortedChanges.map(([_, change]) => change.oldValue);
        const newTooltips = sortedChanges.map(([_, change]) => change.newValue);

        return { old: oldTooltips, new: newTooltips };
    }

    // Format property name for display
    function formatPropertyName(name: string): string {
        // Special cases
        const specialCases: Record<string, string> = {
            hiddenTags: "Hidden Tags",
            startingTier: "Starting Tier",
        };

        if (name in specialCases) {
            return specialCases[name];
        }

        // General case: convert camelCase to spaced words
        return (
            name
                // Insert a space before all caps and numbers
                .replace(/([A-Z0-9])/g, " $1")
                // Replace multiple spaces with a single space
                .replace(/\s+/g, " ")
                // Uppercase first letter and trim
                .trim()
                .replace(/^\w/, (c) => c.toUpperCase())
        );
    }

    const items = Object.values(data.patchNotes.items) as ItemPatchNote[];
    const skills = Object.values(data.patchNotes.skills) as SkillPatchNote[];

    // Helper function to render a patch note (used for both items and skills)
    function renderPatchNote(patch: ItemPatchNote | SkillPatchNote): RenderedPatchNote[] {
        return getChangedProperties(patch).map(([propName, change]) => {
            if (!change) return null;
            return {
                propName,
                change,
                previousTier: patch.metadata.previousStartingTier,
                currentTier: patch.metadata.currentStartingTier
            };
        }).filter((note): note is RenderedPatchNote => note !== null);
    }
</script>

<div class="max-w-6xl mx-auto p-4">
    {#if items.length > 0}
        <h1 class="text-3xl font-bold mb-6 text-gray-900 dark:text-bazaar-tan700">Items</h1>
        {#each items as patch}
            <Card
                padding="none"
                size="xl"
                class={`relative border text-gray-900 dark:bg-bazaar-background dark:text-bazaar-tan700 dark:border-bazaar-orange mb-3`}
                id={patch.metadata.id}
            >
                <div class="rounded-lg p-4">
                    <h2 class="text-2xl font-semibold mb-3">
                        {patch.metadata.name}
                    </h2>

                    {#each renderPatchNote(patch) as { propName, change, previousTier, currentTier }}
                        <div class="mb-3">
                            <div class="grid grid-cols-[5rem_1fr_1fr] gap-2">
                                <div
                                    class="text-sm text-gray-500 dark:text-bazaar-tan300 font-medium {propName === 'tooltips' ? 'self-center' : 'pt-2'}"
                                >
                                    {formatPropertyName(propName)}
                                </div>

                                <!-- Previous Values -->
                                <div class="space-y-2">
                                    {#if propName === "tooltips" && Array.isArray(change)}
                                        {@const aligned = getAlignedTooltips(change)}
                                        {#each aligned.old as tooltip, i}
                                            <div class="p-1 border-b dark:border-red-900 min-h-[1.5rem]">
                                                {#if tooltip}
                                                    <UnifiedTooltip
                                                        {tooltip}
                                                        startingTier={previousTier}
                                                    />
                                                {:else}
                                                    <div class="italic text-gray-500 dark:text-bazaar-tan300"></div>
                                                {/if}
                                            </div>
                                        {/each}
                                    {:else if propName === "tags" || propName === "hiddenTags" || propName === "heroes"}
                                        <div class="p-1 border-b dark:border-red-900 min-h-[1.5rem]">
                                            {#if change.removed?.length}
                                                {formatArrayValues(change.removed)}
                                            {:else}
                                                <em class="italic text-gray-500 dark:text-bazaar-tan300">
                                                    No {propName === "hiddenTags" ? "hidden tags" : propName} removed
                                                </em>
                                            {/if}
                                        </div>
                                    {:else if change.oldValue !== undefined && change.oldValue !== null}
                                        <div class="p-1 border-b dark:border-red-900 min-h-[1.5rem]">
                                            <UnifiedTooltip
                                                tooltip={formatValue(change.oldValue)}
                                                startingTier={previousTier}
                                            />
                                        </div>
                                    {:else}
                                        <div class="p-1 border-b dark:border-red-900 min-h-[1.5rem]">
                                            <em class="italic text-gray-500 dark:text-bazaar-tan300">Not set</em>
                                        </div>
                                    {/if}
                                </div>

                                <!-- New Values -->
                                <div class="space-y-2">
                                    {#if propName === "tooltips" && Array.isArray(change)}
                                        {@const aligned = getAlignedTooltips(change)}
                                        {#each aligned.new as tooltip, i}
                                            <div class="p-1 border-b dark:border-green-900 min-h-[1.5rem]">
                                                {#if tooltip}
                                                    <UnifiedTooltip
                                                        {tooltip}
                                                        startingTier={currentTier}
                                                    />
                                                {:else}
                                                    <div class="italic text-gray-500 dark:text-bazaar-tan300">
                                                        Removed
                                                    </div>
                                                {/if}
                                            </div>
                                        {/each}
                                    {:else if propName === "tags" || propName === "hiddenTags" || propName === "heroes"}
                                        <div class="p-1 border-b dark:border-green-900 min-h-[1.5rem]">
                                            {#if change.added?.length}
                                                {formatArrayValues(change.added)}
                                            {:else}
                                                <em class="text-gray-500 dark:text-bazaar-tan300">
                                                    No new {propName === "hiddenTags" ? "hidden tags" : propName}
                                                </em>
                                            {/if}
                                        </div>
                                    {:else if change.newValue !== undefined && change.newValue !== null}
                                        <div class="p-1 border-b dark:border-green-900 min-h-[1.5rem]">
                                            <UnifiedTooltip
                                                tooltip={formatValue(change.newValue)}
                                                startingTier={currentTier}
                                            />
                                        </div>
                                    {:else}
                                        <div class="p-1 border-b dark:border-green-900 min-h-[1.5rem]">
                                            <em class="italic text-gray-500 dark:text-bazaar-tan300">Removed</em>
                                        </div>
                                    {/if}
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            </Card>
        {/each}
    {/if}

    {#if skills.length > 0}
        <h1 class="text-3xl font-bold mb-6 mt-8 text-gray-900 dark:text-bazaar-tan700">Skills</h1>
        {#each skills as patch}
            <Card
                padding="none"
                size="xl"
                class={`relative border text-gray-900 dark:bg-bazaar-background dark:text-bazaar-tan700 dark:border-bazaar-orange mb-3`}
                id={patch.metadata.id}
            >
                <div class="rounded-lg p-4">
                    <h2 class="text-2xl font-semibold mb-3">
                        {patch.metadata.name}
                    </h2>

                    {#each renderPatchNote(patch) as { propName, change, previousTier, currentTier }}
                        <div class="mb-3">
                            <div class="grid grid-cols-[5rem_1fr_1fr] gap-2">
                                <div
                                    class="text-sm text-gray-500 dark:text-bazaar-tan300 font-medium {propName === 'tooltips' ? 'self-center' : 'pt-2'}"
                                >
                                    {formatPropertyName(propName)}
                                </div>

                                <!-- Previous Values -->
                                <div class="space-y-2">
                                    {#if propName === "tooltips" && Array.isArray(change)}
                                        {@const aligned = getAlignedTooltips(change)}
                                        {#each aligned.old as tooltip, i}
                                            <div class="p-1 border-b dark:border-red-900 min-h-[1.5rem]">
                                                {#if tooltip}
                                                    <UnifiedTooltip
                                                        {tooltip}
                                                        startingTier={previousTier}
                                                    />
                                                {:else}
                                                    <div class="italic text-gray-500 dark:text-bazaar-tan300"></div>
                                                {/if}
                                            </div>
                                        {/each}
                                    {:else if propName === "tags" || propName === "hiddenTags" || propName === "heroes"}
                                        <div class="p-1 border-b dark:border-red-900 min-h-[1.5rem]">
                                            {#if change.removed?.length}
                                                {formatArrayValues(change.removed)}
                                            {:else}
                                                <em class="italic text-gray-500 dark:text-bazaar-tan300">
                                                    No {propName === "hiddenTags" ? "hidden tags" : propName} removed
                                                </em>
                                            {/if}
                                        </div>
                                    {:else if change.oldValue !== undefined && change.oldValue !== null}
                                        <div class="p-1 border-b dark:border-red-900 min-h-[1.5rem]">
                                            <UnifiedTooltip
                                                tooltip={formatValue(change.oldValue)}
                                                startingTier={previousTier}
                                            />
                                        </div>
                                    {:else}
                                        <div class="p-1 border-b dark:border-red-900 min-h-[1.5rem]">
                                            <em class="italic text-gray-500 dark:text-bazaar-tan300">Not set</em>
                                        </div>
                                    {/if}
                                </div>

                                <!-- New Values -->
                                <div class="space-y-2">
                                    {#if propName === "tooltips" && Array.isArray(change)}
                                        {@const aligned = getAlignedTooltips(change)}
                                        {#each aligned.new as tooltip, i}
                                            <div class="p-1 border-b dark:border-green-900 min-h-[1.5rem]">
                                                {#if tooltip}
                                                    <UnifiedTooltip
                                                        {tooltip}
                                                        startingTier={currentTier}
                                                    />
                                                {:else}
                                                    <div class="italic text-gray-500 dark:text-bazaar-tan300">
                                                        Removed
                                                    </div>
                                                {/if}
                                            </div>
                                        {/each}
                                    {:else if propName === "tags" || propName === "hiddenTags" || propName === "heroes"}
                                        <div class="p-1 border-b dark:border-green-900 min-h-[1.5rem]">
                                            {#if change.added?.length}
                                                {formatArrayValues(change.added)}
                                            {:else}
                                                <em class="text-gray-500 dark:text-bazaar-tan300">
                                                    No new {propName === "hiddenTags" ? "hidden tags" : propName}
                                                </em>
                                            {/if}
                                        </div>
                                    {:else if change.newValue !== undefined && change.newValue !== null}
                                        <div class="p-1 border-b dark:border-green-900 min-h-[1.5rem]">
                                            <UnifiedTooltip
                                                tooltip={formatValue(change.newValue)}
                                                startingTier={currentTier}
                                            />
                                        </div>
                                    {:else}
                                        <div class="p-1 border-b dark:border-green-900 min-h-[1.5rem]">
                                            <em class="italic text-gray-500 dark:text-bazaar-tan300">Removed</em>
                                        </div>
                                    {/if}
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            </Card>
        {/each}
    {/if}

    {#if items.length === 0 && skills.length === 0}
        <div class="text-center text-gray-500 dark:text-bazaar-tan300 py-8">
            No changes in this patch.
        </div>
    {/if}
</div>
