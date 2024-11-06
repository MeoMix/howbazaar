<script lang="ts">
    import type { ClientSideCard } from "$lib/types";
    import { copyCardLink } from "$lib/stores/clipboard";
    
    // TODO: might be nice to tighten this type to Item
    export let card: ClientSideCard;

    const id = card.name.replace(/\s+/g, "_");
</script>

<div class="p-4 border border-gray-200 rounded-lg shadow-sm" id={id}>
    <div class="font-bold text-xl mb-2">
        {card.name}
        <button
            onclick={() => copyCardLink(id)}
            title="Copy link to this item"
        >
            🔗
        </button>
    </div>

    <div class="flex mb-1 text-gray-700 gap-4">
        <span class="font-semibold w-24 text-right">Heroes</span>
        <span>{card.heroes.join(", ")}</span>
    </div>

    <div class="flex mb-1 text-gray-700 gap-4">
        <span class="font-semibold w-24 text-right">Size</span>
        <span>{card.size}</span>
    </div>

    <div class="flex mb-1 text-gray-700 gap-4">
        <span class="font-semibold w-24 text-right">Tags</span>
        <span>{card.tags.join(", ")}</span>
    </div>

    <div class="flex mb-1 text-gray-700 gap-4">
        <span class="font-semibold w-24 text-right">Hidden Tags</span>
        <span>{card.hiddenTags.join(", ")}</span>
    </div>

    <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
        {#each Object.entries(card.tiers) as [tierType, tier]}
            {#if tierType !== "Legendary"}
                <div
                    class={tier.tooltips.length > 0
                        ? "p-2 rounded-lg bg-gray-100"
                        : ""}
                >
                    {#if tier.tooltips.length > 0}
                        <div class="font-semibold">
                            {tierType}
                        </div>

                        <ul class="ml-4 list-inside list-disc space-y-1">
                            {#each tier.attributes as attribute}
                                <li class="text-gray-600">
                                    <span class="font-medium"
                                        >{attribute.name}:</span
                                    >
                                    {attribute.value}
                                    {attribute.valueDescriptor}
                                </li>
                            {/each}

                            {#each tier.tooltips as tooltip}
                                <li class="text-gray-600">
                                    {tooltip}
                                </li>
                            {/each}
                        </ul>
                    {/if}
                </div>
            {/if}
        {/each}
    </div>
</div>
