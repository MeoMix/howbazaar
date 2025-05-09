<script lang="ts">
    import type { ClientSideSkillCard } from "$lib/types";
    import { Card } from "flowbite-svelte";
    import { filterTags } from "$lib/utils/filterUtils";
    import CardBadges from "./CardBadges.svelte";
    import UnifiedTooltips from "./UnifiedTooltips.svelte";
    import CardImage from "./CardImage.svelte";
    import CardCombatEncounters from "./CardCombatEncounters.svelte";
    import Divider from "./Divider.svelte";
    import CopyLinkButton from "./CopyLinkButton.svelte";

    const { 
        card,
        showCopyLink = true,
    }: { 
        card: ClientSideSkillCard;
        showCopyLink?: boolean;
    } = $props();

    const id = $derived(card.name.replace(/\s+/g, "_"));
    const tags = $derived(filterTags(card.tags, card.hiddenTags, card.customTags));
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
            <CardImage name={card.name} id={card.id} type="skill" size={card.size} />
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
                        ...card.heroes.map((text) => ({
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
            class={`col-start-1 row-start-2 col-span-2 md:col-span-1 px-4 pb-4`}
        >
            <UnifiedTooltips
                unifiedTooltips={card.unifiedTooltips}
                startingTier={card.startingTier}
            />
        </div>
    </div>
</Card>
