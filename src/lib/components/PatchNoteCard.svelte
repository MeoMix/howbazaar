<script lang="ts">
    import { onDestroy } from "svelte";
    import UnifiedTooltip from "$lib/components/UnifiedTooltip.svelte";
    import type {
        TierType,
        TooltipChange,
        ItemPatchNote,
        SkillPatchNote,
    } from "$lib/types";
    import { Card } from "flowbite-svelte";
    import Divider from "$lib/components/Divider.svelte";

    const { patch } = $props<{
        patch: ItemPatchNote | SkillPatchNote;
    }>();

    let copySuccess = $state(false);
    let copyTimeout: ReturnType<typeof setTimeout>;

    async function copyLink() {
        const url = new URL(window.location.href);
        url.hash = patch.metadata.name.toLowerCase().replace(/\s+/g, '_');
        await navigator.clipboard.writeText(url.toString());

        copySuccess = true;

        // Clear any existing timeout
        if (copyTimeout) clearTimeout(copyTimeout);

        // Reset after 2 seconds
        copyTimeout = setTimeout(() => {
            copySuccess = false;
        }, 2000);
    }

    // Cleanup timeout on component destroy
    onDestroy(() => {
        if (copyTimeout) clearTimeout(copyTimeout);
    });

    interface RenderedPatchNote {
        propName: string;
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

<Card
    padding="none"
    size="xl"
    class={`relative border text-gray-900 dark:bg-bazaar-background dark:text-bazaar-tan700 dark:border-bazaar-orange mb-3 scroll-mt-[80px]`}
    id={patch.metadata.name.toLowerCase().replace(/\s+/g, '_')}
>
    <div class="rounded-lg p-4">
        <div class="flex items-center mb-3">
            <h2 class="text-2xl font-semibold">
                {patch.metadata.name}
            </h2>
            <button
                class="ml-2 text-bazaar-orange w-[1.5em] transition-all"
                title={copySuccess ? "Link copied!" : "Copy link to this item"}
                onclick={copyLink}
            >
                {#if copySuccess}
                    ✓
                {:else}
                    🔗
                {/if}
            </button>
        </div>

        {#each renderPatchNote(patch) as { propName, change, previousTier, currentTier }, i}
            {#if i !== 0}
                <Divider />
            {/if}
            <div class="mb-3">
                <div class="grid grid-cols-[6.5rem_1fr] gap-2">
                    <div
                        class="text-md text-gray-500 dark:text-bazaar-tan300 font-medium self-center text-right"
                    >
                        {formatPropertyName(propName)}
                    </div>

                    <div class="space-y-2">
                        {#if propName === "tooltips" && Array.isArray(change)}
                            {@const aligned = getAlignedTooltips(change)}
                            {#each aligned.old as tooltip, i}
                                <div class="space-y-1">
                                    <!-- Old Value -->
                                    <div
                                        class="p-1 bg-red-500/15 dark:bg-red-900/15 min-h-[1.5rem] rounded"
                                    >
                                        {#if tooltip}
                                            {@const diff = getWordDiff(
                                                tooltip,
                                                aligned.new[i],
                                            )}
                                            <div>
                                                {#each groupHighlightedWords(diff.oldWords) as group}
                                                    <span
                                                        class={group.highlight
                                                            ? "bg-[rgba(248,81,73,0.4)] px-1 rounded-sm"
                                                            : ""}
                                                    >
                                                        <UnifiedTooltip
                                                            tooltip={group.text}
                                                            startingTier={previousTier}
                                                        />
                                                    </span>
                                                    {" "}
                                                {/each}
                                            </div>
                                        {:else}
                                            <div
                                                class="italic text-gray-500 dark:text-bazaar-tan300"
                                            >
                                                Not set
                                            </div>
                                        {/if}
                                    </div>
                                    <!-- New Value -->
                                    <div
                                        class="p-1 bg-green-500/15 dark:bg-green-900/15 min-h-[1.5rem] rounded"
                                    >
                                        {#if aligned.new[i]}
                                            {@const diff = getWordDiff(
                                                tooltip,
                                                aligned.new[i],
                                            )}
                                            <div>
                                                {#each groupHighlightedWords(diff.newWords) as group}
                                                    <span
                                                        class={group.highlight
                                                            ? "bg-[rgba(46,160,67,0.4)] px-1 rounded-sm"
                                                            : ""}
                                                    >
                                                        <UnifiedTooltip
                                                            tooltip={group.text}
                                                            startingTier={currentTier}
                                                        />
                                                    </span>
                                                    {" "}
                                                {/each}
                                            </div>
                                        {:else}
                                            <div
                                                class="italic text-gray-500 dark:text-bazaar-tan300"
                                            >
                                                Removed
                                            </div>
                                        {/if}
                                    </div>
                                </div>
                            {/each}
                        {:else if propName === "tags" || propName === "hiddenTags" || propName === "heroes"}
                            <div class="space-y-1">
                                <!-- Old Value -->
                                <div
                                    class="p-1 bg-red-500/15 dark:bg-red-900/15 min-h-[1.5rem] rounded"
                                >
                                    {#if change.removed?.length}
                                        <span
                                            class="bg-[rgba(248,81,73,0.4)] px-1 rounded-sm"
                                        >
                                            {formatArrayValues(change.removed)}
                                        </span>
                                    {:else}
                                        <em
                                            class="italic text-gray-500 dark:text-bazaar-tan300"
                                        >
                                            No {propName === "hiddenTags"
                                                ? "hidden tags"
                                                : propName} removed
                                        </em>
                                    {/if}
                                </div>
                                <!-- New Value -->
                                <div
                                    class="p-1 bg-green-500/15 dark:bg-green-900/15 min-h-[1.5rem] rounded"
                                >
                                    {#if change.added?.length}
                                        <span
                                            class="bg-[rgba(46,160,67,0.4)] px-1 rounded-sm"
                                        >
                                            {formatArrayValues(change.added)}
                                        </span>
                                    {:else}
                                        <em
                                            class="text-gray-500 dark:text-bazaar-tan300"
                                        >
                                            No {propName === "hiddenTags"
                                                ? "hidden tags"
                                                : propName} added
                                        </em>
                                    {/if}
                                </div>
                            </div>
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
                                                        class="text-sm font-medium text-gray-500 dark:text-bazaar-tan300 mb-1"
                                                    >
                                                        {enchantment.type}
                                                    </div>
                                                    <!-- Old Value -->
                                                    <div
                                                        class="p-1 bg-red-500/15 dark:bg-red-900/15 min-h-[1.5rem] rounded"
                                                    >
                                                        {#each enchantment.tooltipChanges as tooltipChange}
                                                            {#if tooltipChange.oldValue}
                                                                <span
                                                                    class="bg-[rgba(248,81,73,0.4)] px-1 rounded-sm"
                                                                >
                                                                    <UnifiedTooltip
                                                                        tooltip={tooltipChange.oldValue}
                                                                        startingTier={previousTier}
                                                                    />
                                                                </span>
                                                            {/if}
                                                        {/each}
                                                    </div>
                                                    <!-- New Value -->
                                                    <div
                                                        class="p-1 bg-green-500/15 dark:bg-green-900/15 min-h-[1.5rem] rounded"
                                                    >
                                                        <div
                                                            class="italic text-gray-500 dark:text-bazaar-tan300"
                                                        >
                                                            Removed
                                                        </div>
                                                    </div>
                                                </div>
                                            {/each}
                                        {/if}

                                        <!-- Added Enchantments -->
                                        {#if change.added?.length}
                                            {#each change.added as enchantment}
                                                <div class="space-y-1">
                                                    <div
                                                        class="text-sm font-medium text-gray-500 dark:text-bazaar-tan300 mb-1"
                                                    >
                                                        {enchantment.type}
                                                    </div>
                                                    <!-- Old Value -->
                                                    <div
                                                        class="p-1 bg-red-500/15 dark:bg-red-900/15 min-h-[1.5rem] rounded"
                                                    >
                                                        <div
                                                            class="italic text-gray-500 dark:text-bazaar-tan300"
                                                        >
                                                            Not set
                                                        </div>
                                                    </div>
                                                    <!-- New Value -->
                                                    <div
                                                        class="p-1 bg-green-500/15 dark:bg-green-900/15 min-h-[1.5rem] rounded"
                                                    >
                                                        {#each enchantment.tooltipChanges as tooltipChange}
                                                            {#if tooltipChange.newValue}
                                                                <span
                                                                    class="bg-[rgba(46,160,67,0.4)] px-1 rounded-sm"
                                                                >
                                                                    <UnifiedTooltip
                                                                        tooltip={tooltipChange.newValue}
                                                                        startingTier={currentTier}
                                                                    />
                                                                </span>
                                                            {/if}
                                                        {/each}
                                                    </div>
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
                                                class="text-sm font-medium text-gray-500 dark:text-bazaar-tan300 mb-1"
                                            >
                                                {enchantment.type}
                                            </div>
                                            {#if enchantment.tooltipChanges}
                                                {@const aligned =
                                                    getAlignedTooltips(
                                                        enchantment.tooltipChanges,
                                                    )}
                                                <div class="space-y-1">
                                                    {#each aligned.old as tooltip, i}
                                                        <div class="space-y-1">
                                                            <!-- Old Value -->
                                                            <div
                                                                class="p-1 bg-red-500/15 dark:bg-red-900/15 min-h-[1.5rem] rounded"
                                                            >
                                                                {#if tooltip}
                                                                    {@const diff =
                                                                        getWordDiff(
                                                                            tooltip,
                                                                            aligned
                                                                                .new[
                                                                                i
                                                                            ],
                                                                        )}
                                                                    <div>
                                                                        {#each groupHighlightedWords(diff.oldWords) as group}
                                                                            <span
                                                                                class={group.highlight
                                                                                    ? "bg-[rgba(248,81,73,0.4)] px-1 rounded-sm"
                                                                                    : ""}
                                                                            >
                                                                                <UnifiedTooltip
                                                                                    tooltip={group.text}
                                                                                    startingTier={previousTier}
                                                                                />
                                                                            </span>
                                                                            {" "}
                                                                        {/each}
                                                                    </div>
                                                                {:else}
                                                                    <div
                                                                        class="italic text-gray-500 dark:text-bazaar-tan300"
                                                                    >
                                                                        Not set
                                                                    </div>
                                                                {/if}
                                                            </div>
                                                            <!-- New Value -->
                                                            <div
                                                                class="p-1 bg-green-500/15 dark:bg-green-900/15 min-h-[1.5rem] rounded"
                                                            >
                                                                {#if aligned.new[i]}
                                                                    {@const diff =
                                                                        getWordDiff(
                                                                            tooltip,
                                                                            aligned
                                                                                .new[
                                                                                i
                                                                            ],
                                                                        )}
                                                                    <div>
                                                                        {#each groupHighlightedWords(diff.newWords) as group}
                                                                            <span
                                                                                class={group.highlight
                                                                                    ? "bg-[rgba(46,160,67,0.4)] px-1 rounded-sm"
                                                                                    : ""}
                                                                            >
                                                                                <UnifiedTooltip
                                                                                    tooltip={group.text}
                                                                                    startingTier={currentTier}
                                                                                />
                                                                            </span>
                                                                            {" "}
                                                                        {/each}
                                                                    </div>
                                                                {:else}
                                                                    <div
                                                                        class="italic text-gray-500 dark:text-bazaar-tan300"
                                                                    >
                                                                        Removed
                                                                    </div>
                                                                {/if}
                                                            </div>
                                                        </div>
                                                    {/each}
                                                </div>
                                            {/if}
                                        </div>
                                    {/each}
                                {/if}
                            </div>
                        {:else}
                            <div class="space-y-1">
                                <!-- Old Value -->
                                <div
                                    class="p-1 bg-red-500/15 dark:bg-red-900/15 min-h-[1.5rem] rounded"
                                >
                                    {#if change.oldValue !== undefined && change.oldValue !== null}
                                        <span
                                            class="bg-[rgba(248,81,73,0.4)] px-1 rounded-sm"
                                        >
                                            <UnifiedTooltip
                                                tooltip={formatValue(
                                                    change.oldValue,
                                                )}
                                                startingTier={previousTier}
                                            />
                                        </span>
                                    {:else}
                                        <em
                                            class="italic text-gray-500 dark:text-bazaar-tan300"
                                            >Not set</em
                                        >
                                    {/if}
                                </div>
                                <!-- New Value -->
                                <div
                                    class="p-1 bg-green-500/15 dark:bg-green-900/15 min-h-[1.5rem] rounded"
                                >
                                    {#if change.newValue !== undefined && change.newValue !== null}
                                        <span
                                            class="bg-[rgba(46,160,67,0.4)] px-1 rounded-sm"
                                        >
                                            <UnifiedTooltip
                                                tooltip={formatValue(
                                                    change.newValue,
                                                )}
                                                startingTier={currentTier}
                                            />
                                        </span>
                                    {:else}
                                        <em
                                            class="italic text-gray-500 dark:text-bazaar-tan300"
                                            >Removed</em
                                        >
                                    {/if}
                                </div>
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
        {/each}
    </div>
</Card>
