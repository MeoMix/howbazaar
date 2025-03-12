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

<div class="max-w-6xl mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
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
