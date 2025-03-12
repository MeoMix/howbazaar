<script lang="ts">
    import type {
        ItemPatchNote,
        SkillPatchNote,
    } from "$lib/types";
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

    function handleVersionChange(version: string) {
        goto(`?version=${version}`, { invalidateAll: true });
    }
</script>

<div class="w-full max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
    <div class="flex justify-between items-center my-6">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-bazaar-tan700">
            Patch Notes
        </h1>
        <div class="w-48">
            <Select
                selectedOption={data.currentVersion}
                options={versionOptions}
                onSelectOption={handleVersionChange}
            />
        </div>
    </div>

    <div class="text-gray-600 dark:text-bazaar-tan300 mb-8 text-sm">
        Item and Skill changes derived from game data rather than manually maintained.
        <br />
        Full patch notes can be found on <a href="https://playthebazaar-cdn.azureedge.net/beta/PatchNotes.html" class="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">The Bazaar's website</a>.
    </div>

    {#if items.length > 0}
        <h2
            class="text-2xl font-bold mb-6 text-gray-900 dark:text-bazaar-tan700"
        >
            Items
        </h2>
        {#each items as patch}
            <PatchNoteCard {patch} />
        {/each}
    {/if}

    {#if skills.length > 0}
        <h2
            class="text-2xl font-bold mb-6 mt-8 text-gray-900 dark:text-bazaar-tan700"
        >
            Skills
        </h2>
        {#each skills as patch}
            <PatchNoteCard {patch} />
        {/each}
    {/if}

    {#if items.length === 0 && skills.length === 0}
        <div class="text-center text-gray-500 dark:text-bazaar-tan300 py-8">
            No changes in this patch.
        </div>
    {/if}
</div>
