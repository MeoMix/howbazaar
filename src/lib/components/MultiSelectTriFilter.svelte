<script lang="ts">
    import FilterTriToggle from "./FilterTriToggle.svelte";
    import type { Option, TriState } from "$lib/types";
    import { Label } from "flowbite-svelte";
    import Switch from "./Switch.svelte";

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
            <Switch
                isChecked={isMatchAny}
                onClick={() => {
                    isMatchAny = !isMatchAny;

                    if (onSelect) {
                        onSelect(triStates);
                    }
                }}
                label="Match Any"
                offLabel="Match All"
            />
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
