<script lang="ts">
    import type {
        ClientSideCardItem,
        ClientSideTierType,
        ClientSideEnchantmentType,
    } from "$lib/types";
    import { filterTags } from "$lib/utils/filterUtils";
    import { Card } from "flowbite-svelte";
    import CardBadges from "./CardBadges.svelte";
    import { removeSpecialCharacters } from "$lib/utils/stringUtils";

    const {
        card,
        tierType,
        enchantmentName,
    }: {
        card: ClientSideCardItem;
        tierType: ClientSideTierType;
        enchantmentName: ClientSideEnchantmentType | undefined;
    } = $props();

    const enchantment = $derived(
        card.enchantments.find(
            (enchantment) => enchantment.name === enchantmentName,
        ),
    );

    const sanitizedCardName = $derived(removeSpecialCharacters(card.name));
    const tags = $derived(filterTags(card.tags, card.hiddenTags));
</script>

<Card
    padding="none"
    class={`relative text-black border-2 dark:text-white border-tiers-${tierType.toLowerCase()} dark:border-tiers-${tierType.toLowerCase()}`}
>
    <div class="relative overflow-hidden rounded-t-md">
        <div
            class="absolute inset-0 bg-cover bg-center blur-xl brightness-50"
            style={`background-image: url('/images/items/${sanitizedCardName}.avif');`}
        ></div>

        <img
            src={`/images/items/${sanitizedCardName}.avif`}
            alt={card.name}
            class="relative h-[200px] z-10 mx-auto"
            width={card.size === "Small"
                ? 100
                : card.size === "Medium"
                  ? 200
                  : 300}
        />
    </div>

    <div class="flex flex-col gap-2 p-4 relative">
        <div class="font-bold text-2xl">
            {#if enchantment}
                <span
                    class={`text-enchantments-${enchantment.name.toLowerCase()}`}
                >
                    {enchantment.name}
                </span>
            {/if}
            {card.name}
        </div>

        <CardBadges
            primaryBadges={[tierType, card.size].map((text) => ({ text }))}
            secondaryBadges={tags.map((text) => ({ text }))}
        />

        {#if card.tiers[tierType].attributes.length > 0}
            <div>
                {#each card.tiers[tierType].attributes as attribute}
                    <div>
                        <span class="font-medium">{attribute.name}</span>
                        {attribute.value}
                        {attribute.valueDescriptor}
                    </div>
                {/each}
            </div>
        {/if}

        {#each card.tiers[tierType].tooltips as tooltip}
            <div>
                {tooltip}
            </div>
        {/each}

        {#if enchantment}
            {#each enchantment.tooltips as tooltip}
                <div>{tooltip}</div>
            {/each}
        {/if}
    </div>
</Card>
