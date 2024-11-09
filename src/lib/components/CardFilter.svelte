<script lang="ts">
    import { Label, Button } from "flowbite-svelte";

    let { label, options, selectedOptions = $bindable() } = $props<{
        label: string;
        options: string[] | number[];
        selectedOptions: string[] | number[];
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
    <Label class="font-semibold text-lg">{label}</Label>
    <div class="flex flex-wrap gap-2 mt-2">
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
