<script lang="ts">
    import type { ClientSideItemCard } from "$lib/types";
    import { Card } from "flowbite-svelte";
    import { filterTags } from "$lib/utils/filterUtils";
    import CardBadges from "./CardBadges.svelte";
    import UnifiedTooltips from "./UnifiedTooltips.svelte";
    import CardImage from "./CardImage.svelte";
    import CardCombatEncounters from "./CardCombatEncounters.svelte";
    import Divider from "./Divider.svelte";
    import CopyLinkButton from "./CopyLinkButton.svelte";
    import UnifiedTooltip from "./UnifiedTooltip.svelte";

    const {
        card,
        areEnchantmentsShown,
        showCopyLink = true,
    }: {
        card: ClientSideItemCard;
        areEnchantmentsShown: boolean;
        showCopyLink?: boolean;
    } = $props();

    const id = $derived(card.name.replace(/\s+/g, "_"));
    const tags = $derived(filterTags(card.tags, card.hiddenTags, card.customTags));

    function getPackName(packId: ClientSideItemCard["packId"]): string {
        // First replace underscores with spaces
        let packName = packId.replace(/_/g, " ");

        // Remove any hero names from the pack name
        for (const hero of card.heroes) {
            packName = packName.replace(hero, "").trim();
        }

        // Append "Expansion" to the name
        return `${packName} Expansion`;
    }

    function shouldShowPackName(packId: string): boolean {
        return !packId.toLowerCase().includes("core");
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
            <CardImage
                name={card.name}
                id={card.id}
                type="item"
                size={card.size}
            />
        </div>
        <div class="col-start-1 row-start-1 px-4 pt-4">
            <div class="flex flex-col gap-2 relative">
                <div class="font-bold text-2xl">
                    {card.name}
                    {#if showCopyLink}
                        <CopyLinkButton {id} name={card.name} />
                    {/if}
                </div>

                <CardBadges
                    primaryBadges={[
                        {
                            text: `${card.startingTier}${card.startingTier === "Legendary" ? "" : "+"}`,
                            color: card.startingTier.toLowerCase(),
                            showIcon: false,
                        },
                        ...[
                            ...card.heroes,
                            card.size,
                            ...(shouldShowPackName(card.packId)
                                ? [getPackName(card.packId)]
                                : []),
                        ].map((text) => ({
                            text,
                            showIcon: false,
                        })),
                    ]}
                    secondaryBadges={tags.map((text) => ({
                        text,
                        showIcon: true,
                    }))}
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
                    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                >
                    {#each card.enchantments as enchantment}
                        <div>
                            <div
                                class={`text-lg font-semibold text-enchantments-${enchantment.type.toLowerCase()}`}
                            >
                                {enchantment.type}
                            </div>

                            {#each enchantment.tooltips as tooltip}
                                <UnifiedTooltip
                                    {tooltip}
                                    startingTier={card.startingTier}
                                />
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
