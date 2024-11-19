<script lang="ts">
    import { Badge } from "flowbite-svelte";

    const {
        primaryBadges,
        secondaryBadges = [],
    }: {
        primaryBadges: { text: string; color?: string }[];
        secondaryBadges?: { text: string; color?: string }[];
    } = $props();

    const getBadgeClasses = (color?: string) => {
        if (color) {
            return `text-tiers-${color} border-tiers-${color}`;
        }
        return "";
    };
</script>

<div class="flex flex-col gap-2">
    <div class="flex flex-wrap gap-2">
        {#each primaryBadges as primaryBadge}
            <Badge
                rounded
                border
                class={getBadgeClasses(primaryBadge.color)}
                {...primaryBadge.color ? { color: "none" } : { color: "dark" }}
            >
                {primaryBadge.text}
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
                    {...secondaryBadge.color ? { color: "none" } : { color: "dark" }}
                >
                    {secondaryBadge.text}
                </Badge>
            {/each}
        </div>
    {/if}
</div>
