<script lang="ts">
    import { Label, Button, Toggle } from "flowbite-svelte";

    type OptionType = string | number;

    let {
        label,
        options,
        isSingleSelection = false,
        selectedOptions = $bindable(),
        mustMatchAll = $bindable(),
    }: {
        label: string;
        options: OptionType[];
        isSingleSelection?: boolean;
        selectedOptions: OptionType[];
        mustMatchAll?: boolean;
    } = $props();

    const handleSelection = (
        selectedArray: OptionType[],
        item: OptionType,
    ): OptionType[] => {
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
                outline={!selectedOptions.includes(option)}
                pill
                color={selectedOptions.includes(option) ? "primary" : "light"}
                on:click={() => {
                    selectedOptions = handleSelection(selectedOptions, option);
                }}
                class="transition-colors focus:outline-none border-2"
            >
                {option}
            </Button>
        {/each}
    </div>
</div>
