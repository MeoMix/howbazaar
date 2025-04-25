<script lang="ts">
    import type { Size } from "$lib/types";
    import { getImageUrl } from "$lib/utils/imageUtils";

    const {
        name,
        id,
        type,
        size,
    }: {
        name: string;
        id: string;
        type: "items";
        size: Size;
    } = $props();

    const imageUrl = $derived(getImageUrl(type, id));

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
    <img
        src={imageUrl}
        alt={`${name} background`}
        class="absolute inset-0 w-full h-full object-cover blur-xl brightness-50"
        aria-hidden="true"
    />

    <img
        src={imageUrl}
        alt={name}
        class={`absolute top-0 bottom-0 left-0 right-0 mx-auto ${getWidthClass()} h-full object-fill`}
    />
</div>
