<script lang="ts">
    import type { ClientSideSize } from "$lib/types";
    import { removeSpecialCharacters } from "$lib/utils/stringUtils";

    const {
        name,
        type,
        size,
    }: {
        name: string;
        type: "items" | "skills";
        size: ClientSideSize;
    } = $props();

    const sanitizedCardName = $derived(removeSpecialCharacters(name));
</script>

<div class="relative overflow-hidden rounded-t-md">
    <div
        class="absolute inset-0 bg-cover bg-center blur-xl brightness-50"
        style={`background-image: url('/images/${type}/${sanitizedCardName}.avif');`}
    ></div>

    <img
        src={`/images/${type}/${sanitizedCardName}.avif`}
        alt={name}
        class="relative h-[200px] mx-auto"
        width={size === "Small" ? 100 : size === "Medium" ? 200 : 300}
    />
</div>
