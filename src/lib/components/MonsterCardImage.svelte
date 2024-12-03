<script lang="ts">
    import type { Size } from "$lib/types";
    import { removeSpecialCharacters } from "$lib/utils/stringUtils";

    const {
        name,
        type,
        size,
    }: {
        name: string;
        type: "items" | "skills";
        size: Size;
    } = $props();

    const sanitizedCardName = $derived(removeSpecialCharacters(name));

    function getWidthClass() {
        if (size === "Small") {
            return "w-1/3"; // 33.3333%
        } else if (size === "Medium") {
            return "w-2/3"; // 66.6667%
        } else if (size === "Large") {
            return "w-full"; // 100%
        }
    }
</script>

<div class="relative overflow-hidden rounded-md mx-auto w-full pb-[66.6667%]">
    {#if type !== "skills"}
        <img
            src={`/images/${type}/${sanitizedCardName}.avif`}
            alt={`${name} background`}
            class="absolute inset-0 w-full h-full object-cover blur-xl brightness-50"
            aria-hidden="true"
        />
    {/if}

    <img
        src={`/images/${type}/${sanitizedCardName}.avif`}
        alt={name}
        class={`${type === "skills" ? "rounded-full" : ""} absolute top-0 bottom-0 left-0 right-0 mx-auto ${getWidthClass()} h-full object-fill`}
    />
</div>
