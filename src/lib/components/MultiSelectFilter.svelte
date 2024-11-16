<script lang="ts">
    import { Label, Toggle } from "flowbite-svelte";
    import type { Option } from "$lib/types";
    import FilterToggle from "./FilterToggle.svelte";

    let {
        label,
        options,
        selectedOptionValues = $bindable(),
        mustMatchAll = $bindable(),
        onSelect,
    }: {
        label: string;
        options: Option[];
        selectedOptionValues: Option["value"][];
        mustMatchAll?: boolean;
        onSelect?: (value: Option["value"][]) => void;
    } = $props();

    const handleSelection = (
        selectedArray: Option["value"][],
        item: Option["value"],
    ): Option["value"][] => {
        // For multiple selection mode, toggle the item in the selected array
        if (selectedArray.includes(item)) {
            return selectedArray.filter((i) => i !== item);
        } else {
            return [...selectedArray, item];
        }
    };
</script>

<div>
    <div class="mb-2">
        <Label class="font-semibold text-lg">{label}</Label>
        {#if mustMatchAll !== undefined}
            <Toggle
                class="mt-2 inline-flex"
                checked={mustMatchAll}
                on:click={() => {
                    mustMatchAll = !mustMatchAll;

                    if (onSelect) {
                        onSelect(selectedOptionValues);
                    }
                }}
            >
                Must Match All
            </Toggle>
        {/if}
    </div>

    <div class="flex flex-wrap gap-2">
        {#each options as option}
            <FilterToggle
                isEnabled={selectedOptionValues.includes(option.value)}
                label={option.name}
                onClick={() => {
                    selectedOptionValues = handleSelection(
                        selectedOptionValues,
                        option.value,
                    );

                    if (onSelect) {
                        onSelect(selectedOptionValues);
                    }
                }}
            />
        {/each}
    </div>
</div>
