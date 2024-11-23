<script lang="ts">
    import type { MonsterEncounter } from "$lib/types";
    import { removeSpecialCharacters } from "$lib/utils/stringUtils";

    const {
        monsterEncounter,
        toggleEncounter,
        isActive,
    }: {
        monsterEncounter: MonsterEncounter;
        toggleEncounter: (encounter: MonsterEncounter) => void;
        isActive: boolean;
    } = $props();
    const sanitizedCardName = $derived(
        removeSpecialCharacters(monsterEncounter.cardName),
    );

    function viewDetails() {
        toggleEncounter(monsterEncounter);
    }
</script>

<button
    onclick={viewDetails}
    class={`w-full flex flex-col items-center group hover:text-bazaar-orange dark:hover:text-bazaar-orange ${isActive ? "text-bazaar-orange dark:text-bazaar-orange" : ""}`}
>
    <div
        class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold mb-1 text-center w-full h-12 flex items-center justify-center overflow-hidden"
    >
        {monsterEncounter.cardName}
    </div>

    <div
        class="relative rounded-t-full overflow-hidden transition-all transform w-full max-w-[10rem] aspect-[1/1]"
        style="clip-path: inset(0 0 10px 0 round 0 0 5% 5%);"
    >
        <img
            src={`/images/monsters/${sanitizedCardName}.avif`}
            alt={`${monsterEncounter.cardName}`}
            class={`absolute top-0 left-0 h-full w-full transition-all scale-110 group-hover:scale-[125%] ${isActive ? "scale-[125%]" : ""}`}
            loading="lazy"
        />
        <div
            class="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        >
            <span
                class="text-white font-bold text-xs sm:text-sm md:text-base lg:text-lg"
                >View</span
            >
        </div>
    </div>
</button>
