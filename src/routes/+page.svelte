<script lang="ts">
    import type { ClientSideCard } from "$lib/types";
    import { Tabs, TabItem, Toast } from "flowbite-svelte";
    import { CheckCircleSolid } from "flowbite-svelte-icons";
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";

    let { data }: { data: { cards: ClientSideCard[] } } = $props();

    const heroOptions = ["Vanessa", "Dooley", "Pygmalien", "Common"];
    let selectedHero = $state("");

    let displayedEntries = $derived(
        selectedHero
            ? data.cards.filter((card) => card.heroes.includes(selectedHero))
            : data.cards,
    );

    let toastStatus = $state(false);
    onMount(() => {
        const hash = window.location.hash.slice(1);
        if (hash) {
            document
                .getElementById(hash)
                ?.scrollIntoView({ behavior: "smooth" });
        }
    });

    function formatId(name: string) {
        return name.replace(/\s+/g, "_");
    }

    function copyLink(id: string) {
        toastStatus = true;

        const url = `${window.location.origin}${window.location.pathname}#${id}`;
        navigator.clipboard.writeText(url);

        setTimeout(() => (toastStatus = false), 3000);
    }
</script>

<div class="relative min-h-screen flex flex-col">
    <div class="text-center mb-6">
        <h1 class="text-3xl font-bold">Welcome to How Bazaar!</h1>
    </div>

    <div class="flex-grow overflow-y-auto p-4">
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
                    {#each displayedEntries.filter((entry) => entry.type === "Item") as entry}
                        <li
                            class="p-4 border border-gray-200 rounded-lg shadow-sm"
                        >
                            <div class="font-bold text-xl mb-2">
                                {entry.name}
                                <button
                                    onclick={() =>
                                        copyLink(formatId(entry.name))}
                                    title="Copy link to this item"
                                >
                                    🔗
                                </button>
                            </div>

                            <div class="flex mb-1 text-gray-700 gap-4">
                                <span class="font-semibold w-24 text-right"
                                    >Heroes</span
                                >
                                <span>{entry.heroes.join(", ")}</span>
                            </div>

                            <div class="flex mb-1 text-gray-700 gap-4">
                                <span class="font-semibold w-24 text-right"
                                    >Size</span
                                >
                                <span>{entry.size}</span>
                            </div>

                            <div class="flex mb-1 text-gray-700 gap-4">
                                <span class="font-semibold w-24 text-right"
                                    >Tags</span
                                >
                                <span>{entry.tags.join(", ")}</span>
                            </div>

                            <div class="flex mb-1 text-gray-700 gap-4">
                                <span class="font-semibold w-24 text-right"
                                    >Hidden Tags</span
                                >
                                <span>{entry.hiddenTags.join(", ")}</span>
                            </div>

                            <div
                                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                            >
                                {#each Object.entries(entry.tiers) as [tierType, tier]}
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

                                                <ul
                                                    class="ml-4 list-inside list-disc space-y-1"
                                                >
                                                    {#each tier.attributes as attribute}
                                                        <li
                                                            class="text-gray-600"
                                                        >
                                                            <span
                                                                class="font-medium"
                                                                >{attribute.name}:</span
                                                            >
                                                            {attribute.value}
                                                            {attribute.valueDescriptor}
                                                        </li>
                                                    {/each}

                                                    {#each tier.tooltips as tooltip}
                                                        <li
                                                            class="text-gray-600"
                                                        >
                                                            {tooltip}
                                                        </li>
                                                    {/each}
                                                </ul>
                                            {/if}
                                        </div>
                                    {/if}
                                {/each}
                            </div>
                        </li>
                    {/each}
                </ul>
            </TabItem>

            <TabItem title="Skills">
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
                    {#each displayedEntries.filter((entry) => entry.type === "Skill") as entry}
                        <li
                            class="p-4 border border-gray-200 rounded-lg shadow-sm"
                        >
                            <div class="font-bold text-xl mb-2">
                                {entry.name}
                                <button
                                    onclick={() =>
                                        copyLink(formatId(entry.name))}
                                    title="Copy link to this item"
                                >
                                    🔗
                                </button>
                            </div>

                            <div class="flex mb-1 text-gray-700 gap-4">
                                <span class="font-semibold w-24 text-right"
                                    >Heroes</span
                                >
                                <span>{entry.heroes.join(", ")}</span>
                            </div>

                            <div class="flex mb-1 text-gray-700 gap-4">
                                <span class="font-semibold w-24 text-right"
                                    >Tags</span
                                >
                                <span>{entry.tags.join(", ")}</span>
                            </div>

                            <div class="flex mb-1 text-gray-700 gap-4">
                                <span class="font-semibold w-24 text-right"
                                    >Hidden Tags</span
                                >
                                <span>{entry.hiddenTags.join(", ")}</span>
                            </div>

                            <div
                                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                            >
                                {#each Object.entries(entry.tiers) as [tierType, tier]}
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

                                                <ul
                                                    class="ml-4 list-inside list-disc space-y-1"
                                                >
                                                    {#each tier.attributes as attribute}
                                                        <li
                                                            class="text-gray-600"
                                                        >
                                                            <span
                                                                class="font-medium"
                                                                >{attribute.name}:</span
                                                            >
                                                            {attribute.value}
                                                            {attribute.valueDescriptor}
                                                        </li>
                                                    {/each}

                                                    {#each tier.tooltips as tooltip}
                                                        <li
                                                            class="text-gray-600"
                                                        >
                                                            {tooltip}
                                                        </li>
                                                    {/each}
                                                </ul>
                                            {/if}
                                        </div>
                                    {/if}
                                {/each}
                            </div>
                        </li>
                    {/each}
                </ul>
            </TabItem>
        </Tabs>
    </div>

    <div class="fixed bottom-0 left-0 w-full flex justify-center p-4">
        <Toast
            position="bottom-left"
            color="green"
            transition={fly}
            params={{ y: 100, duration: 300 }}
            bind:toastStatus
        >
            <svelte:fragment slot="icon">
                <CheckCircleSolid class="w-5 h-5" />
                <span class="sr-only">Check icon</span>
            </svelte:fragment>
            Link copied to clipboard
        </Toast>
    </div>
</div>
