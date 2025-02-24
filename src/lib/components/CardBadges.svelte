<script lang="ts">
    import { Badge } from "flowbite-svelte";
    import IconLabel from "./IconLabel.svelte";

    const {
        primaryBadges,
        secondaryBadges = [],
    }: {
        primaryBadges: { text: string; color?: string }[];
        secondaryBadges?: { text: string; color?: string }[];
    } = $props();

    const getBadgeClasses = (color?: string) => {
        if (color) {
            return `dark:bg-tiers-${color}-900 text-tiers-${color}-400 dark:text-tiers-${color}-400 border-tiers-${color}-400 dark:border-tiers-${color}-400`;
        } else {
            return "dark:bg-bazaar-brown text-gray-500 dark:text-bazaar-tan700 dark:border-bazaar-brown600";
        }
    };
</script>

<div class="flex flex-col gap-2">
    <div class="flex flex-wrap gap-2">
        {#each primaryBadges as primaryBadge}
            <Badge rounded border class={getBadgeClasses(primaryBadge.color)}>
                <IconLabel label={primaryBadge.text} />
            </Badge>
        {/each}
    </div>

    {#if secondaryBadges.length > 0}
        <div class="flex flex-wrap gap-2">
            {#each secondaryBadges as secondaryBadge}
                <Badge
                    rounded
                    border
                    class={getBadgeClasses(secondaryBadge.color)}
                >
                    <IconLabel label={secondaryBadge.text} />
                </Badge>
            {/each}
        </div>
    {/if}
</div>
