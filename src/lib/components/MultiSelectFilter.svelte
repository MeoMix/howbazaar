<script lang="ts">
    import { Label } from "flowbite-svelte";
    import type { Option } from "$lib/types";
    import FilterToggle from "./FilterToggle.svelte";

    let {
        label,
        options,
        selectedOptionValues = $bindable(),
        onSelect,
    }: {
        label: string;
        options: Option[];
        selectedOptionValues: Option["value"][];
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
    <Label class="mb-2 font-semibold text-lg dark:text-bazaar-tan700"
        >{label}</Label
    >

    <div class="flex flex-wrap gap-1">
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
