<script lang="ts">
    import type { ClientSideItemCard } from "$lib/types";
    import Divider from "./Divider.svelte";
    import MerchantCardImage from "./MerchantCardImage.svelte";
    import CardBadges from "./CardBadges.svelte";
    import { tooltip } from "$lib/actions/tooltip.svelte";

    const {
        card,
    }: {
        card: ClientSideItemCard;
    } = $props();
</script>

<div
    class={`rounded-lg h-full relative text-gray-900 border dark:bg-bazaar-background dark:text-bazaar-tan700`}
    use:tooltip={{ item: card }}
>
    <MerchantCardImage
        name={card.name}
        id={card.id}
        type="items"
        size={card.size}
    />

    <div class="flex flex-col px-4 pb-4 py-2 relative">
        <div class="flex flex-col gap-2 relative">
            <div class="font-bold text-lg md:text-xl">
                {card.name}
            </div>
            <CardBadges
                primaryBadges={[
                    ...card.tags.map((text) => ({ text, showIcon: true })),
                ]}
            />

            <Divider />
        </div>
    </div>
</div>
