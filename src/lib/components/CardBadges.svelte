<script lang="ts">
    import { Badge } from "flowbite-svelte";
    import IconLabel from "./IconLabel.svelte";

    const {
        primaryBadges,
        secondaryBadges = [],
    }: {
        primaryBadges: { text: string; color?: string; showIcon?: boolean }[];
        secondaryBadges?: {
            text: string;
            color?: string;
            showIcon?: boolean;
        }[];
    } = $props();

    const getBadgeClasses = (color?: string) => {
        if (color) {
            return `dark:bg-tiers-${color}-900 text-tiers-${color}-400 dark:text-tiers-${color}-400 border-tiers-${color}-400 dark:border-tiers-${color}-400`;
        } else {
            return "dark:bg-bazaar-brown text-gray-500 dark:text-bazaar-tan700 dark:border-bazaar-brown600";
        }
    };

    const allBadges = $derived(
        [
            { list: primaryBadges, key: "primary" },
            { list: secondaryBadges, key: "secondary" },
        ].filter(({ list }) => list.length > 0),
    );
</script>

<div class="flex flex-col gap-2">
    {#each allBadges as { list, key } (key)}
        <div class="flex flex-wrap gap-2">
            {#each list as badge}
                <Badge rounded border class={getBadgeClasses(badge.color)}>
                    {#if badge.showIcon}
                        <IconLabel label={badge.text} />
                    {:else}
                        {badge.text}
                    {/if}
                </Badge>
            {/each}
        </div>
    {/each}
</div>
