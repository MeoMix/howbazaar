<script lang="ts">
    import UnifiedTooltip from "$lib/components/UnifiedTooltip.svelte";
    import type {
        TierType,
        TooltipChange,
        ItemPatchNote,
        SkillPatchNote,
    } from "$lib/types";
    import { Card } from "flowbite-svelte";
    import Divider from "$lib/components/Divider.svelte";
    import CopyLinkButton from "$lib/components/CopyLinkButton.svelte";
    import CardImage from "$lib/components/CardImage.svelte";

    const { patch, state = "full" }: { patch: ItemPatchNote | SkillPatchNote; state?: "full" | "compact" } = $props();

    const id = $derived(patch.metadata.name.toLowerCase().replace(/\s+/g, "_"));

    interface RenderedPatchNote {
        propName:
            | "name"
            | "startingTier"
            | "tags"
            | "hiddenTags"
            | "size"
            | "tooltips"
            | "heroes"
            | "enchantments";
        change: any;
        previousTier: TierType;
        currentTier: TierType;
    }

    interface WordDiff {
        text: string;
        highlight: boolean;
    }

    // Helper function to group consecutive highlighted words
    function groupHighlightedWords(
        words: WordDiff[],
    ): { text: string; highlight: boolean }[] {
        const groups: { text: string; highlight: boolean }[] = [];
        let currentGroup: string[] = [];
        let currentHighlight = false;

        for (let i = 0; i < words.length; i++) {
            const word = words[i];

            // If this is the first word or the highlight state changed
            if (i === 0 || word.highlight !== currentHighlight) {
                // If we have a current group, add it
                if (currentGroup.length > 0) {
                    groups.push({
                        text: currentGroup.join(" "),
                        highlight: currentHighlight,
                    });
                    currentGroup = [];
                }
                currentHighlight = word.highlight;
            }

            currentGroup.push(word.text);
        }

        // Add the last group
        if (currentGroup.length > 0) {
            groups.push({
                text: currentGroup.join(" "),
                highlight: currentHighlight,
            });
        }

        return groups;
    }

    // Helper function to perform word-level diffing
    function getWordDiff(
        oldText: string | null,
        newText: string | null,
    ): { oldWords: WordDiff[]; newWords: WordDiff[] } {
        if (!oldText && !newText) return { oldWords: [], newWords: [] };
        // If there's no old text, the new text is entirely new (all green)
        if (!oldText)
            return {
                oldWords: [],
                newWords: newText!
                    .split(/\s+/)
                    .map((text) => ({ text, highlight: true })),
            };
        // If there's no new text, the old text was entirely removed (all red)
        if (!newText)
            return {
                oldWords: oldText
                    .split(/\s+/)
                    .map((text) => ({ text, highlight: true })),
                newWords: [],
            };

        // Split into words but preserve the original text
        const oldWords = oldText.split(/\s+/);
        const newWords = newText.split(/\s+/);

        // Function to normalize a word for comparison (strip punctuation and convert to lowercase)
        const normalizeWord = (word: string) =>
            word.toLowerCase().replace(/[.,!?;:()]/g, "");

        // Create normalized versions for comparison
        const normalizedOldWords = oldWords.map(normalizeWord);
        const normalizedNewWords = newWords.map(normalizeWord);

        // Find the longest common subsequence indices
        function getLCS(X: string[], Y: string[]): number[][] {
            const m = X.length;
            const n = Y.length;
            const L = Array(m + 1)
                .fill(0)
                .map(() => Array(n + 1).fill(0));

            for (let i = 0; i <= m; i++) {
                for (let j = 0; j <= n; j++) {
                    if (i === 0 || j === 0) L[i][j] = 0;
                    else if (X[i - 1] === Y[j - 1])
                        L[i][j] = L[i - 1][j - 1] + 1;
                    else L[i][j] = Math.max(L[i - 1][j], L[i][j - 1]);
                }
            }
            return L;
        }

        // Get LCS table
        const lcsTable = getLCS(normalizedOldWords, normalizedNewWords);

        // Backtrack to find the actual subsequence and mark changes
        const oldHighlighted: boolean[] = new Array(oldWords.length).fill(true);
        const newHighlighted: boolean[] = new Array(newWords.length).fill(true);

        let i = normalizedOldWords.length;
        let j = normalizedNewWords.length;

        while (i > 0 && j > 0) {
            if (normalizedOldWords[i - 1] === normalizedNewWords[j - 1]) {
                oldHighlighted[i - 1] = false;
                newHighlighted[j - 1] = false;
                i--;
                j--;
            } else if (lcsTable[i][j - 1] > lcsTable[i - 1][j]) {
                j--;
            } else {
                i--;
            }
        }

        // Create the final word diff arrays
        return {
            oldWords: oldWords.map((text, i) => ({
                text,
                highlight: oldHighlighted[i],
            })),
            newWords: newWords.map((text, i) => ({
                text,
                highlight: newHighlighted[i],
            })),
        };
    }

    // Helper function to get all changed properties
    function getChangedProperties(patchNote: ItemPatchNote | SkillPatchNote) {
        return Object.entries(patchNote).filter(([key]) => key !== "metadata");
    }

    // Format a single value for display
    function formatValue(value: any): string {
        if (!value) return "";
        if (typeof value === "string") return value;
        if (Array.isArray(value)) return value.join(", ");
        return String(value);
    }

    // Helper function to get aligned tooltips
    function getAlignedTooltips(changes: TooltipChange[]) {
        if (!changes?.length) return [];

        // Merge changes at the same index and collect unique indices
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

        // Convert to array, sort by index, and filter out empty changes
        return Array.from(mergedChanges.entries())
            .filter(
                ([_, change]) =>
                    change.oldValue !== null || change.newValue !== null,
            )
            .sort(([a], [b]) => a - b)
            .map(([_, change]) => change);
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

    // Helper function to render a patch note (used for both items and skills)
    function renderPatchNote(
        patch: ItemPatchNote | SkillPatchNote,
    ): RenderedPatchNote[] {
        return getChangedProperties(patch)
            .map(([propName, change]) => {
                if (!change) return null;
                return {
                    propName,
                    change,
                    previousTier: patch.metadata.previousStartingTier,
                    currentTier: patch.metadata.currentStartingTier,
                };
            })
            .filter((note): note is RenderedPatchNote => note !== null);
    }
</script>

{#snippet diffContainer(
    oldValue: any,
    newValue: any,
    previousTier: TierType,
    currentTier: TierType,
)}
    <div class="opacity-60">
        {#if oldValue !== undefined && oldValue !== null}
            <span class="bg-patchnotes-removed px-1 rounded-sm">
                <UnifiedTooltip
                    tooltip={formatValue(oldValue)}
                    startingTier={previousTier}
                />
            </span>
        {:else}
            <span class="italic text-gray-500 dark:text-bazaar-tan300">
                Not set
            </span>
        {/if}
    </div>

    <div>
        {#if newValue !== undefined && newValue !== null}
            <span class="bg-patchnotes-added px-1 rounded-sm">
                <UnifiedTooltip
                    tooltip={formatValue(newValue)}
                    startingTier={currentTier}
                />
            </span>
        {:else}
            <span class="italic text-gray-500 dark:text-bazaar-tan300">
                Removed
            </span>
        {/if}
    </div>
{/snippet}

{#snippet tooltipDiff(
    oldTooltip: string | null,
    newTooltip: string | null,
    previousTier: TierType,
    currentTier: TierType,
)}
    {#if oldTooltip}
        {@const diff = getWordDiff(oldTooltip, newTooltip)}
        <div class="opacity-60">
            {#each groupHighlightedWords(diff.oldWords) as group}
                {#if group.highlight}
                    <span class="bg-patchnotes-removed px-1 rounded-sm">
                        <UnifiedTooltip
                            tooltip={group.text}
                            startingTier={currentTier}
                        />
                    </span>
                {:else}
                    <UnifiedTooltip
                        tooltip={group.text}
                        startingTier={previousTier}
                    />
                {/if}
                {" "}
            {/each}
        </div>
    {:else}
        <div class="italic text-gray-500 dark:text-bazaar-tan300">Not set</div>
    {/if}

    {#if newTooltip}
        {@const diff = getWordDiff(oldTooltip, newTooltip)}
        <div>
            {#each groupHighlightedWords(diff.newWords) as group}
                {#if group.highlight}
                    <span class="bg-patchnotes-added px-1 rounded-sm">
                        <UnifiedTooltip
                            tooltip={group.text}
                            startingTier={currentTier}
                        />
                    </span>
                {:else}
                    <UnifiedTooltip
                        tooltip={group.text}
                        startingTier={currentTier}
                    />
                {/if}
                {" "}
            {/each}
        </div>
    {:else}
        <div class="italic text-gray-500 dark:text-bazaar-tan300">Removed</div>
    {/if}
{/snippet}

{#snippet arrayDiff(
    removed: any[] | undefined,
    added: any[] | undefined,
    propName: "tags" | "hiddenTags" | "heroes",
)}
    <div class="opacity-60">
        {#if removed?.length}
            <span class="bg-patchnotes-removed px-1 rounded-sm">
                {removed.join(", ")}
            </span>
        {:else}
            <span class="italic text-gray-500 dark:text-bazaar-tan300">
                No {propName === "hiddenTags" ? "hidden tags" : propName} removed
            </span>
        {/if}
    </div>

    <div>
        {#if added?.length}
            <span class="bg-patchnotes-added px-1 rounded-sm">
                {added.join(", ")}
            </span>
        {:else}
            <span class="text-gray-500 dark:text-bazaar-tan300">
                No {propName === "hiddenTags" ? "hidden tags" : propName} added
            </span>
        {/if}
    </div>
{/snippet}

<div
    class={`rounded-lg relative ${state === "full" ? "border" : ""} text-gray-900 dark:bg-bazaar-background dark:text-bazaar-tan700 dark:border-bazaar-orange scroll-mt-[80px]`}
    {id}
>
    <div
        class="grid grid-cols-[70%_30%] md:grid-cols-[80%_20%] lg:grid-cols-[85%_15%]"
    >
        {#if state === "full"}
            <div class="max-w-full col-start-2 row-span-1 md:row-span-2">
                <CardImage
                    name={patch.metadata.name}
                    type={patch.metadata.type}
                    size={patch.metadata.currentSize}
                    isLazy
                />
            </div>
        {/if}

        <div class={`col-start-1 row-start-1 ${state === "full" ? "px-4 py-4" : "px-0 py-0"}`}>
            <div class={`flex items-center ${state === "full" ? "mb-3" : ""}`}>
                <h2 class={`text-2xl font-semibold ${state === "compact" ? "text-bazaar-orange" : ""}`}>
                    {patch.metadata.name}
                    {#if state === "full"}
                        <CopyLinkButton {id} name={patch.metadata.name} />
                    {/if}
                </h2>
            </div>

            {#each renderPatchNote(patch) as { propName, change, previousTier, currentTier }, i}
                <div class={`flex ${i !== 0 ? "mt-2" : ""}`}>
                    <div
                        class="w-[6.5rem] text-gray-500 dark:text-bazaar-tan300 font-medium self-center text-right pr-2"
                    >
                        {formatPropertyName(propName)}
                    </div>

                    <Divider isVertical />

                    <div class="flex-1 pl-2">
                        {#if propName === "tooltips" && Array.isArray(change)}
                            {@const aligned = getAlignedTooltips(change)}
                            {#each aligned as { oldValue, newValue }, i}
                                <div
                                    class={i !== aligned.length - 1
                                        ? "mb-2"
                                        : ""}
                                >
                                    {@render tooltipDiff(
                                        oldValue,
                                        newValue,
                                        previousTier,
                                        currentTier,
                                    )}
                                </div>
                            {/each}
                        {:else if propName === "tags" || propName === "hiddenTags" || propName === "heroes"}
                            {@render arrayDiff(
                                change.removed,
                                change.added,
                                propName,
                            )}
                        {:else if propName === "enchantments"}
                            <div class="space-y-4">
                                <!-- Added/Removed Enchantments -->
                                {#if change.removed?.length || change.added?.length}
                                    <div class="space-y-4">
                                        <!-- Removed Enchantments -->
                                        {#if change.removed?.length}
                                            {#each change.removed as enchantment}
                                                <div class="space-y-1">
                                                    <div
                                                        class="text-sm font-medium text-enchantments-{enchantment.type.toLowerCase()} mb-1 opacity-60"
                                                    >
                                                        {enchantment.type}
                                                    </div>
                                                    {#each enchantment.tooltipChanges as tooltipChange}
                                                        {@render tooltipDiff(
                                                            tooltipChange.oldValue,
                                                            null,
                                                            previousTier,
                                                            currentTier,
                                                        )}
                                                    {/each}
                                                </div>
                                            {/each}
                                        {/if}

                                        <!-- Added Enchantments -->
                                        {#if change.added?.length}
                                            {#each change.added as enchantment}
                                                <div class="space-y-1">
                                                    <div
                                                        class="text-sm font-medium text-enchantments-{enchantment.type.toLowerCase()} mb-1 opacity-60"
                                                    >
                                                        {enchantment.type}
                                                    </div>
                                                    {#each enchantment.tooltipChanges as tooltipChange}
                                                        {@render tooltipDiff(
                                                            null,
                                                            tooltipChange.newValue,
                                                            previousTier,
                                                            currentTier,
                                                        )}
                                                    {/each}
                                                </div>
                                            {/each}
                                        {/if}
                                    </div>
                                {/if}

                                <!-- Modified Enchantments -->
                                {#if change.modified?.length}
                                    {#each change.modified as enchantment}
                                        <div class="space-y-1">
                                            <div
                                                class="text-sm font-medium text-enchantments-{enchantment.type.toLowerCase()} mb-1 opacity-60"
                                            >
                                                {enchantment.type}
                                            </div>
                                            {#if enchantment.tooltipChanges}
                                                {@const aligned =
                                                    getAlignedTooltips(
                                                        enchantment.tooltipChanges,
                                                    )}
                                                {#each aligned as { oldValue, newValue }, i}
                                                    <div
                                                        class={i !==
                                                        aligned.length - 1
                                                            ? "mb-2"
                                                            : ""}
                                                    >
                                                        {@render tooltipDiff(
                                                            oldValue,
                                                            newValue,
                                                            previousTier,
                                                            currentTier,
                                                        )}
                                                    </div>
                                                {/each}
                                            {/if}
                                        </div>
                                    {/each}
                                {/if}
                            </div>
                        {:else}
                            {@render diffContainer(
                                change.oldValue,
                                change.newValue,
                                previousTier,
                                currentTier,
                            )}
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>
