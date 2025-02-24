<script lang="ts">
    import Icon from "./Icon.svelte";

    const {
        size = "default",
        class: className = "",
    }: {
        size?: "small" | "default" | "large";
        class?: string;
    } = $props();
</script>

<Icon {size} class={className}>
    <svg
        height="12"
        width="12"
        viewBox="0 0 18 18"
        xmlns="http://www.w3.org/2000/svg"
        class="text-gameEffects-poison"
    >
        <g>
            <path
                d="M16.75 6h-4.75V1.25c0-0.414-0.336-0.75-0.75-0.75H6.75c-0.414 0-0.75 0.336-0.75 0.75V6H1.25c-0.414 0-0.75 0.336-0.75 0.75v4.5c0 0.414 0.336 0.75 0.75 0.75H6v4.75c0 0.414 0.336 0.75 0.75 0.75h4.5c0.414 0 0.75-0.336 0.75-0.75v-5h4.75c0.414 0 0.75-0.336 0.75-0.75V6.75c0-0.414-0.336-0.75-0.75-0.75Z"
                class="fill-current"
            ></path>
        </g>
    </svg>
</Icon>
