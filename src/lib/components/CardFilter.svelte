<script lang="ts">
    import { Label, Button, Toggle } from "flowbite-svelte";

    let {
        label,
        options,
        selectedOptions = $bindable(),
        mustMatchAll = $bindable(),
    } = $props<{
        label: string;
        options: string[] | number[];
        selectedOptions: string[] | number[];
        mustMatchAll?: boolean;
    }>();

    const handleSelection = (selectedArray: string[], item: string) => {
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
                class="mt-2"
                checked={mustMatchAll}
                on:click={() => {
                    mustMatchAll = !mustMatchAll;
                }}>Must Match All</Toggle
            >
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
