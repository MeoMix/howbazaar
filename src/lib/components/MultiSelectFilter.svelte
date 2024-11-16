<script lang="ts">
    import { Label, Toggle } from "flowbite-svelte";
    import type { Option } from "$lib/types";
    import FilterToggle from "./FilterToggle.svelte";

    let {
        label,
        options,
        selectedOptionValues = $bindable(),
        isMatchAny = $bindable(),
        onSelect,
    }: {
        label: string;
        options: Option[];
        selectedOptionValues: Option["value"][];
        isMatchAny?: boolean;
        onSelect?: (value: Option["value"][]) => void;
    } = $props();

    const handleSelection = (
        selectedValues: Option["value"][],
        value: Option["value"],
    ): Option["value"][] => {
        return selectedValues.includes(value)
            ? selectedValues.filter((i) => i !== value)
            : [...selectedValues, value];
    };
</script>

<div>
    <div class="mb-2">
        <Label class="font-semibold text-lg">{label}</Label>
        {#if isMatchAny !== undefined}
            <Toggle
                class="mt-2 inline-flex"
                checked={isMatchAny}
                on:click={() => {
                    isMatchAny = !isMatchAny;

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
