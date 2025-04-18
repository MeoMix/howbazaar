<script lang="ts">
    import type {
        ClientSideItemCard,
        TierType,
        EnchantmentType,
    } from "$lib/types";
    import { parseTooltipForRendering } from "$lib/utils/tooltipUtils";
    import Divider from "./Divider.svelte";
    import MonsterCardImage from "./MonsterCardImage.svelte";
    import CardBadges from "./CardBadges.svelte";
    import { tooltip } from "$lib/actions/tooltip.svelte";

    const {
        card,
        tierType,
        enchantmentType,
    }: {
        card: ClientSideItemCard;
        tierType: TierType;
        enchantmentType: EnchantmentType | undefined;
    } = $props();

    const enchantment = $derived(
        card.enchantments.find(
            (enchantment) => enchantment.type === enchantmentType,
        ),
    );

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

<div
    class={`rounded-lg h-full relative text-gray-900 border dark:bg-bazaar-background dark:text-bazaar-tan700 border-tiers-${tierType.toLowerCase()}-400 dark:border-tiers-${tierType.toLowerCase()}-400`}
    use:tooltip={{ item: card }}
>
    <MonsterCardImage
        name={card.name}
        id={card.id}
        type="items"
        size={card.size}
    />

    <div class="flex flex-col px-4 pb-4 py-2 relative">
        <div class="flex flex-col gap-2 relative">
            <div class="font-bold text-lg md:text-xl">
                {#if enchantment}
                    <span
                        class={`text-enchantments-${enchantment.type.toLowerCase()}`}
                    >
                        {enchantment.type}
                    </span>
                {/if}
                {card.name}
            </div>
            <CardBadges
                primaryBadges={[
                    {
                        text: tierType,
                        color: tierType.toLowerCase(),
                        showIcon: false,
                    },
                    ...card.tags.map((text) => ({ text, showIcon: true })),
                ]}
            />

            <Divider />
        </div>

        {#each card.tiers[tierType].tooltips as tooltip}
            <div class="text-sm md:text-base">
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

        {#if enchantment}
            {#each enchantment.tooltips as tooltip}
                <div class="text-sm md:text-base">
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
        {/if}
    </div>
</div>
