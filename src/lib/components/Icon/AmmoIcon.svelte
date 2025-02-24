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
        class="text-gameEffects-ammo"
    >
        <g>
            <path
                d="M10.25 14.25V3.75C10.25 3.19772 9.80228 2.75 9.25 2.75H8.75C8.19772 2.75 7.75 3.19772 7.75 3.75L7.75 14.25C7.75 14.8023 8.19772 15.25 8.75 15.25H9.25C9.80228 15.25 10.25 14.8023 10.25 14.25Z"
                class="fill-current stroke-current"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
            ></path>
            <path
                d="M15.75 14.25V3.75C15.75 3.19772 15.3023 2.75 14.75 2.75H14.25C13.6977 2.75 13.25 3.19772 13.25 3.75V14.25C13.25 14.8023 13.6977 15.25 14.25 15.25H14.75C15.3023 15.25 15.75 14.8023 15.75 14.25Z"
                class="fill-current stroke-current"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
            ></path>
            <path
                d="M4.75 14.25L4.75 3.75C4.75 3.19772 4.30228 2.75 3.75 2.75H3.25C2.69772 2.75 2.25 3.19772 2.25 3.75L2.25 14.25C2.25 14.8023 2.69772 15.25 3.25 15.25H3.75C4.30228 15.25 4.75 14.8023 4.75 14.25Z"
                class="fill-current stroke-current"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
            ></path>
        </g>
    </svg>
</Icon>
