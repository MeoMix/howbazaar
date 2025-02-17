<script lang="ts">
    import type { ClientSideItemCard } from "$lib/types";
    import { copyCardLink } from "$lib/stores/clipboard";
    import { Card } from "flowbite-svelte";
    import { filterTags } from "$lib/utils/filterUtils";
    import CardBadges from "./CardBadges.svelte";
    import UnifiedTooltips from "./UnifiedTooltips.svelte";
    import CardImage from "./CardImage.svelte";
    import CardCombatEncounters from "./CardCombatEncounters.svelte";
    import Divider from "./Divider.svelte";

    const {
        card,
        areEnchantmentsShown,
    }: { card: ClientSideItemCard; areEnchantmentsShown: boolean } = $props();

    const id = $derived(card.name.replace(/\s+/g, "_"));
    const tags = $derived(filterTags(card.tags, card.hiddenTags));
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
            <CardImage name={card.name} type="items" size={card.size} />
        </div>
        <div class="col-start-1 row-start-1 px-4 pt-4">
            <div class="flex flex-col gap-2 relative">
                <div class="font-bold text-2xl">
                    {card.name}
                    <button
                        onclick={() => copyCardLink(id)}
                        title="Copy link to this item"
                    >
                        🔗
                    </button>
                </div>

                <CardBadges
                    primaryBadges={[
                        {
                            text: `${card.startingTier}${card.startingTier === "Legendary" ? "" : "+"}`,
                            color: card.startingTier.toLowerCase(),
                        },
                        ...[...card.heroes, card.size].map((text) => ({
                            text,
                        })),
                    ]}
                    secondaryBadges={tags.map((text) => ({ text }))}
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
                                <div>{tooltip}</div>
                            {/each}
                        </div>
                    {/each}
                </div>
            </div>
        {/if}
        {#if card.remarks.length > 0}
            <div class="px-4 pb-4">
                <div class="text-yellow-500 font-bold">!! HOWBAZAAR DEVELOPER REMARK !!</div>
                {#each card.remarks as remark}
                    <div>{remark}</div>
                {/each}
            </div>
        {/if}
    </div>
</Card>
