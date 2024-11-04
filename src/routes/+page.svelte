<script lang="ts">
    import type { ClientSideCardItem } from "$lib/types";
    import { Tabs, TabItem } from "flowbite-svelte";

    let { data }: { data: { cardItems: ClientSideCardItem[] } } = $props();

    const heroOptions = ["Vanessa", "Dooley", "Pygmalien", "Common"];
    let selectedHero = $state("");

    let displayedEntries = $derived(
        selectedHero
            ? data.cardItems.filter((cardItem) =>
                  cardItem.heroes.includes(selectedHero),
              )
            : data.cardItems,
    );
</script>

<div class="text-center mb-6">
    <h1 class="text-3xl font-bold">Welcome to How Bazaar!</h1>
</div>

<Tabs>
    <TabItem title="Items" open={true}>
        <div class="mb-4">
            <label class="block font-semibold text-lg">
                Filter Items:
                <select
                    bind:value={selectedHero}
                    class="border border-gray-300 rounded-md p-2 ml-2 focus:outline-none focus:ring focus:border-blue-300"
                >
                    <option value="">All</option>
                    {#each heroOptions as hero}
                        <option value={hero}>{hero}</option>
                    {/each}
                </select>
            </label>
        </div>

        <ul class="space-y-4">
            {#each displayedEntries as entry}
                <li class="p-4 border border-gray-200 rounded-lg shadow-sm">
                    <div class="font-bold text-xl mb-2">{entry.name}</div>

                    <div class="flex mb-1 text-gray-700 gap-4">
                        <span class="font-semibold w-24 text-right">Heroes</span
                        >
                        <span>{entry.heroes.join(", ")}</span>
                    </div>

                    <div class="flex mb-1 text-gray-700 gap-4">
                        <span class="font-semibold w-24 text-right">Size</span>
                        <span>{entry.size}</span>
                    </div>

                    <div class="flex mb-1 text-gray-700 gap-4">
                        <span class="font-semibold w-24 text-right">Tags</span>
                        <span>{entry.tags.join(", ")}</span>
                    </div>

                    <div class="flex mb-1 text-gray-700 gap-4">
                        <span class="font-semibold w-24 text-right"
                            >Hidden Tags</span
                        >
                        <span>{entry.hiddenTags.join(", ")}</span>
                    </div>

                    <!-- Responsive grid for tiers -->
                    <div
                        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
                    >
                        {#each entry.tiers as tier}
                            <div class="p-2 rounded-lg bg-gray-100">
                                <div class="font-semibold">{tier.name}</div>

                                <ul
                                    class="ml-4 list-inside list-disc space-y-1"
                                >
                                    {#each tier.attributes as attribute}
                                        <li class="text-gray-600">
                                            <span class="font-medium"
                                                >{attribute.name}:</span
                                            >
                                            {attribute.value}
                                            {attribute.valueDescriptor}
                                        </li>
                                    {/each}

                                    {#each tier.abilityTexts as abilityText}
                                        <li class="text-gray-600">
                                            {abilityText}
                                        </li>
                                    {/each}
                                </ul>
                            </div>
                        {/each}
                    </div>
                </li>
            {/each}
        </ul>
    </TabItem>

    <TabItem title="Skills">
        <p class="text-gray-700">Coming Soon!</p>
    </TabItem>
</Tabs>
