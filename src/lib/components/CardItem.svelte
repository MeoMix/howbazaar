<script lang="ts">
    import type { ClientSideItemCard } from "$lib/types";
    import { Card } from "flowbite-svelte";
    import { filterTags } from "$lib/utils/filterUtils";
    import { parseTooltipForRendering } from "$lib/utils/tooltipUtils";
    import CardBadges from "./CardBadges.svelte";
    import UnifiedTooltips from "./UnifiedTooltips.svelte";
    import CardImage from "./CardImage.svelte";
    import CardCombatEncounters from "./CardCombatEncounters.svelte";
    import Divider from "./Divider.svelte";
    import CopyLinkButton from "./CopyLinkButton.svelte";

    const {
        card,
        areEnchantmentsShown,
    }: { card: ClientSideItemCard; areEnchantmentsShown: boolean } = $props();

    const id = $derived(card.name.replace(/\s+/g, "_"));
    const tags = $derived(filterTags(card.tags, card.hiddenTags));

    // Type guard functions to check the type of tooltip part
    function isKeywordPart(
        part: unknown,
    ): part is { text: string; effect: string } {
        return typeof part === "object" && part !== null && "effect" in part;
    }

    function isTierPart(part: unknown): part is {
        bold: boolean;
        parts: { text: string; tierType: string | null }[];
        original: string;
    } {
        return typeof part === "object" && part !== null && "bold" in part;
    }
</script>

<Card
    padding="none"
    size="xl"
    class={`relative border text-gray-900 dark:bg-bazaar-background dark:text-bazaar-tan700 dark:border-bazaar-orange`}
    {id}
>
    <div
        class="grid grid-cols-[66.66%_33.33%] md:grid-cols-[70%_30%] lg:grid-cols-[75%_25%]"
    >
        <div class="max-w-full col-start-2 row-span-1 md:row-span-2">
            <CardImage name={card.name} type="item" size={card.size} />
        </div>
        <div class="col-start-1 row-start-1 px-4 pt-4">
            <div class="flex flex-col gap-2 relative">
                <div class="font-bold text-2xl">
                    {card.name}
                    <CopyLinkButton {id} name={card.name} />
                </div>

                <CardBadges
                    primaryBadges={[
                        {
                            text: `${card.startingTier}${card.startingTier === "Legendary" ? "" : "+"}`,
                            color: card.startingTier.toLowerCase(),
                            showIcon: false,
                        },
                        ...[...card.heroes, card.size].map((text) => ({
                            text,
                            showIcon: false,
                        })),
                    ]}
                    secondaryBadges={tags.map((text) => ({ text, showIcon: true }))}
                />  

                {#if card.combatEncounters.length > 0}
                    <CardCombatEncounters
                        combatEncounters={card.combatEncounters}
                    />
                {/if}

                <Divider />
            </div>
        </div>
        <div
            class={`col-start-1 row-start-2 col-span-2 md:col-span-1 px-4 ${card.enchantments.length === 0 || !areEnchantmentsShown ? "pb-4" : ""}`}
        >
            <UnifiedTooltips
                unifiedTooltips={card.unifiedTooltips}
                startingTier={card.startingTier}
            />
        </div>
        {#if card.enchantments.length > 0 && areEnchantmentsShown}
            <div class="col-span-2 px-4 pb-4">
                <Divider />

                <div
                    class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4"
                >
                    {#each card.enchantments as enchantment}
                        <div>
                            <div
                                class={`text-lg font-semibold text-enchantments-${enchantment.type.toLowerCase()}`}
                            >
                                {enchantment.type}
                            </div>

                            {#each enchantment.tooltips as tooltip}
                                <div>
                                    {#each parseTooltipForRendering(tooltip, card.startingTier) as part}
                                        {#if typeof part === "string"}
                                            {part}
                                        {:else if isKeywordPart(part)}
                                            <!-- Render keyword with game effect styling -->
                                            <span
                                                class="font-semibold text-gameEffects-{part.effect}"
                                            >
                                                {part.text}
                                            </span>
                                        {:else if isTierPart(part)}
                                            <span
                                                class={part.bold
                                                    ? "font-semibold whitespace-nowrap"
                                                    : ""}
                                            >
                                                {#each part.parts as subpart, index}
                                                    {#if subpart.tierType}
                                                        <span
                                                            class={`text-tiers-${subpart.tierType.toLowerCase()}-500`}
                                                        >
                                                            {subpart.text}
                                                        </span>
                                                    {:else}
                                                        {subpart.text}
                                                    {/if}

                                                    {#if index < part.parts.length - 1}
                                                        {" » "}
                                                    {/if}
                                                {/each}
                                            </span>
                                        {/if}
                                    {/each}
                                </div>
                            {/each}
                        </div>
                    {/each}
                </div>
            </div>
        {/if}
        {#if card.remarks.length > 0}
            <div class="px-4 pb-4">
                <div class="text-yellow-500 font-bold">
                    !! HOWBAZAAR DEVELOPER REMARK !!
                </div>
                {#each card.remarks as remark}
                    <div>{remark}</div>
                {/each}
            </div>
        {/if}
    </div>
</Card>
