<script lang="ts">
    import type { ClientSideItemCard, EnchantmentType } from "$lib/types";
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
        selectedEnchantmentTypes,
    }: {
        card: ClientSideItemCard;
        areEnchantmentsShown: boolean;
        showCopyLink?: boolean;
        selectedEnchantmentTypes?: EnchantmentType[];
    } = $props();

    const id = $derived(card.name.replace(/\s+/g, "_"));
    const tags = $derived(
        filterTags(card.tags, card.hiddenTags, card.customTags),
    );

    const shownEnchantments = $derived(
        areEnchantmentsShown
            ? card.enchantments
                  .filter((enchantment) =>
                      selectedEnchantmentTypes?.length
                          ? selectedEnchantmentTypes.includes(enchantment.type)
                          : true,
                  )
                  .sort((a, b) => a.type.localeCompare(b.type))
            : [],
    );
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
                        ...[...card.heroes, card.size].map((text) => ({
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

        {#if card.quests.length > 0}
            <div class="col-span-2 px-4 pb-4">
                <Divider />

                <div
                    class={`grid gap-4 ${
                        card.quests.length === 1
                            ? "grid-cols-1"
                            : card.quests.length === 2
                              ? "grid-cols-2 sm:grid-cols-2"
                              : card.quests.length === 3
                                ? "grid-cols-2 sm:grid-cols-3"
                                : card.quests.length === 4
                                  ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-4"
                                  : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                    }`}
                >
                    {#each card.quests as quest}
                        {#each quest.entries as entry}
                            <div>
                                <div class="text-lg font-semibold">
                                    <UnifiedTooltips
                                        unifiedTooltips={entry.tooltips}
                                        startingTier={card.startingTier}
                                    />
                                </div>

                                {#if entry.rewardTooltips.length > 0}
                                    {#each entry.rewardTooltips as tooltip}
                                        <UnifiedTooltip
                                            {tooltip}
                                            startingTier={card.startingTier}
                                        />
                                    {/each}
                                {/if}
                            </div>
                        {/each}
                    {/each}
                </div>
            </div>
        {/if}

        {#if shownEnchantments.length > 0}
            <div class="col-span-2 px-4 pb-4">
                <Divider />

                <div
                    class={`grid gap-4 ${
                        shownEnchantments.length === 1
                            ? "grid-cols-1"
                            : shownEnchantments.length === 2
                              ? "grid-cols-2 sm:grid-cols-2"
                              : shownEnchantments.length === 3
                                ? "grid-cols-2 sm:grid-cols-3"
                                : shownEnchantments.length === 4
                                  ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-4"
                                  : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                    }`}
                >
                    {#each shownEnchantments as enchantment}
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
    </div>
</Card>
