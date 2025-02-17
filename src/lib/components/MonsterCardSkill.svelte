<script lang="ts">
    import type { ClientSideSkillCard, TierType } from "$lib/types";
    import { Card } from "flowbite-svelte";
    import Divider from "./Divider.svelte";
    import MonsterCardImage from "./MonsterCardImage.svelte";

    const {
        card,
        tierType,
    }: { card: ClientSideSkillCard; tierType: TierType } = $props();
</script>

<Card
    padding="none"
    class={`text-gray-900 border dark:text-white dark:bg-bazaar-background dark:text-bazaar-tan700 border-tiers-${tierType.toLowerCase()}-400 dark:border-tiers-${tierType.toLowerCase()}-400`}
>
    <div class="flex items-start gap-4 py-2 pr-2">
        <div class="w-16 flex-shrink-0">
            <MonsterCardImage name={card.name} type="skills" size={card.size} />
        </div>

        <div class="flex flex-col">
            <div class="font-bold text-lg md:text-xl">
                {card.name}
            </div>

            <Divider />

            {#each card.tiers[tierType].tooltips as tooltip}
                <div class="text-sm md:text-base">
                    {tooltip}
                </div>
            {/each}
        </div>
    </div>
</Card>
