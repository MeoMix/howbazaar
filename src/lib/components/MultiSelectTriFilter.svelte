<script lang="ts">
    import FilterTriToggle from "./FilterTriToggle.svelte";
    import type { Option, TriState } from "$lib/types";
    import { ButtonGroup, Label } from "flowbite-svelte";
    import RadioButton from "./RadioButton.svelte";

    let {
        label,
        options,
        triStates = $bindable(),
        isMatchAny = $bindable(),
    }: {
        label: string;
        options: Option[];
        triStates: Record<Option["value"], TriState>;
        isMatchAny?: boolean;
    } = $props();

    function handleToggle(value: Option["value"]) {
        // Cycle through states for the given tag
        triStates[value] =
            triStates[value] === "unset"
                ? "on"
                : triStates[value] === "on"
                  ? "off"
                  : "unset";
    }
</script>

<div>
    <div class="flex items-center gap-2 mb-2">
        <Label class="font-semibold text-lg dark:text-bazaar-tan700 inline-block"
            >{label}</Label
        >
        {#if isMatchAny !== undefined}
            <ButtonGroup>
                <RadioButton
                    value="isMatchAll"
                    group={isMatchAny ? "isMatchAny" : "isMatchAll"}
                    onClick={() => {
                        isMatchAny = false;
                    }}>Match All</RadioButton
                >
                <RadioButton
                    value="isMatchAny"
                    group={isMatchAny ? "isMatchAny" : "isMatchAll"}
                    onClick={() => {
                        isMatchAny = true;
                    }}>Match Any</RadioButton
                >
            </ButtonGroup>
        {/if}
    </div>

    <div class="flex flex-wrap gap-1">
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
