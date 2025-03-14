<script lang="ts">
    import type { ItemPatchNote, SkillPatchNote, Hero } from "$lib/types";
    import Select from "$lib/components/Select.svelte";
    import PatchNoteCard from "$lib/components/PatchNoteCard.svelte";
    import type { PageData } from "./$types";
    import { goto } from "$app/navigation";

    let { data }: { data: PageData } = $props();

    const items = $derived(
        Object.values(data.patchNotes.items) as ItemPatchNote[],
    );
    const skills = $derived(
        Object.values(data.patchNotes.skills) as SkillPatchNote[],
    );

    const versionOptions = $derived(
        data.versions.map((version) => ({
            name: version.label,
            value: version.version,
        })),
    );

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
</script>

<div
    class="w-full max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl"
>
    <div class="flex justify-between items-center my-6">
        <h1 class="text-3xl font-bold">Patch Notes</h1>
        <div class="w-48">
            <Select
                selectedOption={data.currentVersion}
                options={versionOptions}
                onSelectOption={handleVersionChange}
            />
        </div>
    </div>

    <div class="mb-8 space-y-4">
        <p>
            Item and Skill changes derived from game data to detect changes not
            mentioned in <a
                href="https://playthebazaar-cdn.azureedge.net/beta/PatchNotes.html"
                class="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
            >
                The Bazaar's official patch notes
            </a>.
        </p>
        <p>
            Changes are highlighted to show
            <span class="bg-[rgba(248,81,73,0.4)] px-1 rounded-sm"
                >what was removed</span
            >
            and
            <span class="bg-[rgba(46,160,67,0.4)] px-1 rounded-sm"
                >what was added</span
            >
        </p>
    </div>

    {#if Object.values(itemsByHero).some((group) => group.length > 0)}
        <h2 class="text-2xl font-bold mb-6">Items</h2>

        {#each Object.entries(itemsByHero) as [hero, heroItems]}
            {#if heroItems.length > 0}
                <div class="mb-8">
                    <h3 class="text-xl font-semibold mb-4">
                        {hero}
                    </h3>
                    {#each heroItems as patch}
                        <PatchNoteCard {patch} />
                    {/each}
                </div>
            {/if}
        {/each}
    {/if}

    {#if skills.length > 0}
        <h2 class="text-2xl font-bold mb-6 mt-8">Skills</h2>
        {#each skills as patch}
            <PatchNoteCard {patch} />
        {/each}
    {/if}
</div>
