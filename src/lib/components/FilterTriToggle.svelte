<script lang="ts">
    import type { TriState, Option } from "$lib/types";
    import { Button } from "flowbite-svelte";

    const {
        label,
        state,
        value,
        onClick,
    }: {
        label: string;
        state: TriState;
        value: Option["value"];
        onClick: (value: Option["value"]) => void;
    } = $props();

    function getColor() {
        if (state === "unset") {
            return "light";
        } else if (state === "on") {
            return "green";
        } else if (state === "off") {
            return "red";
        }
    }
</script>

<Button
    size="xs"
    outline={state === "unset"}
    pill
    color={getColor()}
    on:click={() => onClick(value)}
    class="transition-colors focus:outline-none border-2"
>
    {label}
</Button>