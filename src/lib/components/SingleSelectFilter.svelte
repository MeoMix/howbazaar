<script lang="ts">
    import { Label, Button } from "flowbite-svelte";
    import type { Option } from "$lib/types";

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
            <Button
                size="xs"
                outline={selectedOptionValue !== option.value}
                pill
                color={selectedOptionValue === option.value
                    ? "primary"
                    : "light"}
                on:click={() => {
                    const newValue =
                        selectedOptionValue === option.value
                            ? undefined
                            : option.value;
                    selectedOptionValue = newValue;

                    if (onSelect) {
                        onSelect(newValue);
                    }
                }}
                class="transition-colors focus:outline-none border-2"
            >
                {option.name}
            </Button>
        {/each}
    </div>
</div>
