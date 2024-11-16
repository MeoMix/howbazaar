<script lang="ts">
    import { Button } from "flowbite-svelte";

    const {
        label,
        isEnabled,
        onClick,
    }: {
        label: string;
        isEnabled: boolean;
        onClick: () => void;
    } = $props();
</script>

<Button
    size="xs"
    outline={!isEnabled}
    pill
    color={isEnabled ? "primary" : "light"}
    on:click={onClick}
    class="transition-colors focus:outline-none border-2"
>
    {label}
</Button>
