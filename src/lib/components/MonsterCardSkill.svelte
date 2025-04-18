<script lang="ts">
    import type { ClientSideSkillCard, TierType } from "$lib/types";
    import Divider from "./Divider.svelte";
    import MonsterCardImage from "./MonsterCardImage.svelte";
    import CardBadges from "./CardBadges.svelte";
    import { tooltip } from "$lib/actions/tooltip.svelte";

    const {
        card,
        tierType,
    }: { card: ClientSideSkillCard; tierType: TierType } = $props();
</script>

<div
    class={`rounded-lg text-gray-900 border dark:bg-bazaar-background dark:text-bazaar-tan700 border-tiers-${tierType.toLowerCase()}-400 dark:border-tiers-${tierType.toLowerCase()}-400`}
    use:tooltip={{ skill: card }}
>
    <div class="flex items-start gap-4 py-2 pr-2">
        <div class="w-16 flex-shrink-0">
            <MonsterCardImage
                name={card.name}
                id={card.id}
                type="skills"
                size={card.size}
            />
        </div>

        <div class="flex flex-col">
            <div class="flex flex-col gap-2 relative">
                <div class="font-bold text-lg md:text-xl">
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
                    {tooltip}
                </div>
            {/each}
        </div>
    </div>
</div>
