<script lang="ts">
    import type { ClientSideCardItem } from "$lib/types";
    import { copyCardLink } from "$lib/stores/clipboard";
    import type { Entries } from "type-fest";
    import { Card } from "flowbite-svelte";

    const { card }: { card: ClientSideCardItem } = $props();

    const id = $derived(card.name.replace(/\s+/g, "_"));
</script>

<div class="p-4 border border-gray-200 rounded-lg shadow-sm" {id}>
    <div class="font-bold text-2xl mb-2">
        {card.name}
        <button onclick={() => copyCardLink(id)} title="Copy link to this item">
            🔗
        </button>
    </div>

    <div class="flex mb-1 gap-4">
        <span class="font-semibold w-24 text-right">Heroes</span>
        <span>{card.heroes.join(", ")}</span>
    </div>

    <div class="flex mb-1 gap-4">
        <span class="font-semibold w-24 text-right">Size</span>
        <span>{card.size}</span>
    </div>

    <div class="flex mb-1 gap-4">
        <span class="font-semibold w-24 text-right">Tags</span>
        <span>{card.tags.join(", ")}</span>
    </div>

    <div class="flex mb-1 gap-4">
        <span class="font-semibold w-24 text-right">Hidden Tags</span>
        <span>{card.hiddenTags.join(", ")}</span>
    </div>

    <div class="font-semibold text-xl mt-4 mb-2">
        Tiers
    </div>
    <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
        {#each (Object.entries(card.tiers) as Entries<typeof card.tiers>).filter(([tierType]) => tierType !== "Legendary") as [tierType, tier]}
            {#if tier.tooltips.length === 0}
                <div></div>
            {:else}
                <Card size="xl">
                    <div class="text-lg font-semibold mb-2">
                        {tierType}
                    </div>

                    <div class="mb-2">
                        {#each tier.attributes as attribute}
                            <div>
                                <span class="font-medium">{attribute.name}</span>
                                {attribute.value}
                                {attribute.valueDescriptor}
                            </div>
                        {/each}
                    </div>

                    {#each tier.tooltips as tooltip}
                        <div>
                            {tooltip}
                        </div>
                    {/each}
                </Card>
            {/if}
        {/each}
    </div>

    {#if card.enchantments.length > 0}
        <div class="font-semibold text-xl mt-4 mb-2">
            Enchantments
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {#each card.enchantments as enchantment}
                <Card size="xl">
                    <div class="text-lg font-semibold mb-2">
                        {enchantment.name}
                    </div>
                    {#each enchantment.tooltips as tooltip}
                        <div>{tooltip}</div>
                    {/each}
                </Card>
            {/each}
        </div>
    {/if}
</div>
