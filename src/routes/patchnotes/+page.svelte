<script lang="ts">
    import type { ItemPatchNote, SkillPatchNote, Hero } from "$lib/types";
    import Select from "$lib/components/Select.svelte";
    import PatchNoteCard from "$lib/components/PatchNoteCard.svelte";
    import type { PageData } from "./$types";
    import { goto, invalidateAll } from "$app/navigation";
    import { browser } from "$app/environment";
    import { onMount } from "svelte";

    let { data }: { data: PageData } = $props();

    let viewMode = $state(data.viewMode);

    // Mark versions as seen when the page loads
    // Do this client-side to avoid marking seen during pre-rendering because user might not actually visit the page
    onMount(async () => {
        if (browser) {
            await fetch('/api/patchnotes/mark-seen', { method: 'POST' });
            invalidateAll();
        }
    });

    const items = $derived(
        Object.values(data.patchNotes.items) as ItemPatchNote[],
    );
    const skills = $derived(
        Object.values(data.patchNotes.skills)
            .sort((a, b) => a.metadata.name.localeCompare(b.metadata.name)) as SkillPatchNote[],
    );

    const versionOptions = $derived(
        data.versions.map((version) => ({
            name: version.label,
            value: version.version,
        })),
    );

    const viewOptions = [
        { name: "Compact", value: "compact" },
        { name: "Card", value: "full" },
    ];

    // Group items by hero
    const itemsByHero = $derived.by(() => {
        const heroes: Hero[] = [
            "Common",
            "Dooley",
            "Jules",
            "Mak",
            "Pygmalien",
            "Stelle",
            "Vanessa",
        ];
        const grouped: Record<Hero, ItemPatchNote[]> = {} as Record<
            Hero,
            ItemPatchNote[]
        >;

        // Initialize groups
        heroes.forEach((hero) => {
            grouped[hero] = [];
        });

        // Group items by hero
        items.forEach((item) => {
            const hero = item.metadata.currentHero;

            if (hero && hero in grouped) {
                grouped[hero].push(item);
            }
        });

        // Sort items within each group by name
        Object.values(grouped).forEach((group) => {
            group.sort((a, b) =>
                a.metadata.name.localeCompare(b.metadata.name),
            );
        });

        return grouped;
    });

    function handleVersionChange(version: string) {
        goto(`?version=${version}`, { invalidateAll: true });
    }

    function handleViewChange(view: string) {
        viewMode = view as "full" | "compact";
        
        if (browser) {
            // Set cookie with 1 year expiry
            document.cookie = `patchNotesViewMode=${view};path=/;max-age=31536000`;
        }
        
        // Reload the page to get the new cookie value
        goto(window.location.pathname, { invalidateAll: true });
    }
</script>

<svelte:head>
    <title>Patch Notes · How Bazaar</title>
</svelte:head>

<div
    class="w-full max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl"
>
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 my-6">
        <h1 class="text-3xl font-bold whitespace-nowrap">Patch Notes</h1>
        <div class="flex flex-wrap items-center gap-4">
            <div class="w-32">
                <Select
                    selectedOption={viewMode}
                    options={viewOptions}
                    onSelectOption={handleViewChange}
                />
            </div>
            <div class="w-48">
                <Select
                    selectedOption={data.currentVersion}
                    options={versionOptions}
                    onSelectOption={handleVersionChange}
                />
            </div>
        </div>
    </div>

    <div class="mb-6 space-y-1">
        <p>
            Item and Skill changes based on game data; detects changes not
            mentioned in <a
                href="https://playthebazaar-cdn.azureedge.net/thebazaar/PatchNotes.html"
                class="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
            >
                The Bazaar's official patch notes
            </a>.
        </p>
        <p>
            Changes are highlighted to show
            <span class="bg-patchnotes-removed px-1 rounded-sm"
                >what was removed</span
            >
            and
            <span class="bg-patchnotes-added px-1 rounded-sm"
                >what was added.</span
            >
        </p>
    </div>

    {#if Object.values(itemsByHero).some((group) => group.length > 0)}
        {#each Object.entries(itemsByHero) as [hero, heroItems]}
            {#if heroItems.length > 0}
                <div class="mb-2">
                    <h2 class="text-2xl font-bold mb-2">
                        {hero} Items
                    </h2>
                    <div class={`${viewMode === "compact" ? "grid grid-cols-1 md:grid-cols-2 gap-2" : "space-y-2"}`}>
                        {#each heroItems as patch}
                            <PatchNoteCard {viewMode} {patch} />
                        {/each}
                    </div>
                </div>
            {/if}
        {/each}
    {/if}

    {#if skills.length > 0}
        <h2 class="text-2xl font-bold mb-2">Skills</h2>
        <div class={`${viewMode === "compact" ? "grid grid-cols-1 md:grid-cols-2 gap-2" : "space-y-2"}`}>
            {#each skills as patch}
                <PatchNoteCard {viewMode} {patch} />
            {/each}
        </div>
    {/if}
</div>
