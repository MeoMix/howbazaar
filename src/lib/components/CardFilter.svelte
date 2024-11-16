<script lang="ts">
    import { Label, Button, Toggle } from "flowbite-svelte";
    import type { Option } from '$lib/types';

    let {
        label,
        options,
        isSingleSelection = false,
        selectedOptionValues = $bindable(),
        mustMatchAll = $bindable(),
    }: {
        label: string;
        options: Option[];
        isSingleSelection?: boolean;
        selectedOptionValues: Option["value"][];
        mustMatchAll?: boolean;
    } = $props();

    const handleSelection = (
        selectedArray: Option["value"][],
        item: Option["value"],
    ): Option["value"][] => {
        if (isSingleSelection) {
            // If single selection mode, return an array with only the selected item
            return selectedArray.includes(item) ? [] : [item];
        } else {
            // For multiple selection mode, toggle the item in the selected array
            if (selectedArray.includes(item)) {
                return selectedArray.filter((i) => i !== item);
            } else {
                return [...selectedArray, item];
            }
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
                }}
            >
                Must Match All
            </Toggle>
        {/if}
    </div>

    <div class="flex flex-wrap gap-2">
        {#each options as option}
            <Button
                size="xs"
                outline={!selectedOptionValues.includes(option.value)}
                pill
                color={selectedOptionValues.includes(option.value) ? "primary" : "light"}
                on:click={() => {
                    selectedOptionValues = handleSelection(selectedOptionValues, option.value);
                }}
                class="transition-colors focus:outline-none border-2"
            >
                {option.name}
            </Button>
        {/each}
    </div>
</div>
