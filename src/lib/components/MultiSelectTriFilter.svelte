<script lang="ts">
    import FilterTriToggle from "./FilterTriToggle.svelte";
    import type { Option, TriState } from "$lib/types";
    import { Label, Toggle } from "flowbite-svelte";

    let {
        label,
        options,
        triStates = $bindable(),
        isMatchAny = $bindable(),
        onSelect,
    }: {
        label: string;
        options: Option[];
        triStates: Record<Option["value"], TriState>;
        isMatchAny?: boolean;
        onSelect?: (value: Record<Option["value"], TriState>) => void;
    } = $props();

    function handleToggle(value: Option["value"]) {
        // Cycle through states for the given tag
        triStates[value] =
            triStates[value] === "unset"
                ? "on"
                : triStates[value] === "on"
                  ? "off"
                  : "unset";

        if (onSelect) {
            onSelect(triStates);
        }
    }
</script>

<div>
    <div class="mb-2">
        <Label class="font-semibold text-lg dark:text-bazaar-tan700"
            >{label}</Label
        >
        {#if isMatchAny !== undefined}
            <Toggle
                class="mt-2 inline-flex dark:text-bazaar-tan700 "
                classDiv="dark:bg-bazaar-tan200 dark:after:bg-bazaar-tan700 peer-focus:ring-bazaar-orange dark:peer-focus:ring-bazaar-orange400 peer-checked:bg-bazaar-orange"
                checked={isMatchAny}
                on:click={() => {
                    isMatchAny = !isMatchAny;

                    if (onSelect) {
                        onSelect(triStates);
                    }
                }}
            >
                <svelte:fragment slot="offLabel">Match All</svelte:fragment>
                Match Any
            </Toggle>
        {/if}
    </div>

    <div class="flex flex-wrap gap-2">
        {#each options as option}
            <FilterTriToggle
                label={option.name}
                value={option.value}
                state={triStates[option.value] || "unset"}
                onClick={handleToggle}
            />
        {/each}
    </div>
</div>
