<script lang="ts">
    import { Label, Button } from "flowbite-svelte";
    export let heroOptions: string[] = [];
    export let minimumTierOptions: string[] = [];
    export let tagOptions: string[] = [];
    export let hiddenTagOptions: string[] = [];
    
    export let selectedHeroes: string[] = [];
    export let selectedTiers: string[] = [];
    export let selectedTags: string[] = [];
    export let selectedHiddenTags: string[] = [];

    const handleSelection = (selectedArray: string[], item: string) => {
        if (selectedArray.includes(item)) {
            return selectedArray.filter((i) => i !== item);
        } else {
            return [...selectedArray, item];
        }
    };
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
    <div>
        <Label class="font-semibold text-lg">Heroes & Heroines</Label>
        <div class="flex flex-wrap gap-2 mt-2">
            {#each heroOptions as hero}
                <Button
                    size="xs"
                    outline={!selectedHeroes.includes(hero)}
                    pill
                    color={selectedHeroes.includes(hero) ? "primary" : "light"}
                    onclick={() => selectedHeroes = handleSelection(selectedHeroes, hero)}
                    class="transition-colors focus:outline-none border-2"
                >
                    {hero}
                </Button>
            {/each}
        </div>
    </div>

    <div>
        <Label class="font-semibold text-lg">Starting Tiers</Label>
        <div class="flex flex-wrap gap-2 mt-2">
            {#each minimumTierOptions as tier}
                <Button
                    size="xs"
                    outline={!selectedTiers.includes(tier)}
                    pill
                    color={selectedTiers.includes(tier) ? "primary" : "light"}
                    onclick={() => selectedTiers = handleSelection(selectedTiers, tier)}
                    class="transition-colors focus:outline-none border-2"
                >
                    {tier}
                </Button>
            {/each}
        </div>
    </div>

    <div>
        <Label class="font-semibold text-lg">Tags</Label>
        <div class="flex flex-wrap gap-2 mt-2">
            {#each tagOptions as tag}
                <Button
                    size="xs"
                    outline={!selectedTags.includes(tag)}
                    pill
                    color={selectedTags.includes(tag) ? "primary" : "light"}
                    onclick={() => selectedTags = handleSelection(selectedTags, tag)}
                    class="transition-colors focus:outline-none border-2"
                >
                    {tag}
                </Button>
            {/each}
        </div>
    </div>

    <div>
        <Label class="font-semibold text-lg">Hidden Tags</Label>
        <div class="flex flex-wrap gap-2 mt-2">
            {#each hiddenTagOptions as hiddenTag}
                <Button
                    size="xs"
                    outline={!selectedHiddenTags.includes(hiddenTag)}
                    pill
                    color={selectedHiddenTags.includes(hiddenTag) ? "primary" : "light"}
                    onclick={() => selectedHiddenTags = handleSelection(selectedHiddenTags, hiddenTag)}
                    class="transition-colors focus:outline-none border-2"
                >
                    {hiddenTag}
                </Button>
            {/each}
        </div>
    </div>
</div>
