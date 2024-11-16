<script lang="ts">
    import { Label } from "flowbite-svelte";
    import type { Option } from "$lib/types";
    import FilterToggle from "./FilterToggle.svelte";

    let {
        label,
        options,
        selectedOptionValue = $bindable(),
        onSelect,
    }: {
        label: string;
        options: Option[];
        selectedOptionValue: Option["value"] | undefined;
        onSelect?: (value: Option["value"] | undefined) => void;
    } = $props();
</script>

<div>
    <div class="mb-2">
        <Label class="font-semibold text-lg">{label}</Label>
    </div>

    <div class="flex flex-wrap gap-2">
        {#each options as option}
            <FilterToggle
                isEnabled={selectedOptionValue === option.value}
                label={option.name}
                onClick={() => {
                    const newValue =
                        selectedOptionValue === option.value
                            ? undefined
                            : option.value;
                    selectedOptionValue = newValue;

                    if (onSelect) {
                        onSelect(newValue);
                    }
                }}
            />
        {/each}
    </div>
</div>
