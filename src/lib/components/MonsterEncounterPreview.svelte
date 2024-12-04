<script lang="ts">
    import type { ClientSideMonsterEncounter } from "$lib/types";
    import { removeSpecialCharacters } from "$lib/utils/stringUtils";

    const {
        monsterEncounter,
        toggleEncounter,
        isActive,
    }: {
        monsterEncounter: ClientSideMonsterEncounter;
        toggleEncounter: (encounter: ClientSideMonsterEncounter) => void;
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
    class={`p-2 pb-0 border rounded-lg border-bazaar-brown w-full flex flex-col md:flex-row items-center md:items-start group hover:text-bazaar-orange dark:hover:text-bazaar-orange dark:hover:border-bazaar-orange ${isActive ? "border-bazaar-orange text-bazaar-orange dark:text-bazaar-orange" : ""}`}
>
    <div
        class="max-w-24 relative rounded-t-full overflow-hidden transition-all transform w-[10rem] aspect-[1/1] md:mr-4"
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

    <div
        class="flex flex-col text-sm md:text-base lg:text-lg font-semibold text-center md:text-left md:flex-1"
    >
        <div class={`h-10 md:h-[fit]`}>
            {monsterEncounter.cardName}
        </div>

        <div class={`text-green-700 whitespace-nowrap mb-2 md:mb-0`}>
            {monsterEncounter.health} health
        </div>
    </div>
</button>
