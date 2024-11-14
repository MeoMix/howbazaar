<script lang="ts">
    import type { MonsterEncounter as MonsterEncounterType } from "$lib/types";
    import { removeSpecialCharacters } from "$lib/utils/stringUtils";

    // TODO: fix typing of viewDetails
    const {
        monsterEncounter,
        toggleEncounter,
        isActive,
    }: {
        monsterEncounter: MonsterEncounterType;
        toggleEncounter: any;
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
    class="relative w-full h-full flex flex-col items-center justify-start"
>
    <div class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold mb-1 text-center w-full h-12 flex items-center justify-center overflow-hidden">
        {monsterEncounter.cardName}
    </div>

    <div class="relative rounded-full overflow-hidden transition-all transform group w-full max-w-[10rem] aspect-[1/1]">
        <img
            src={`/images/monsters/${sanitizedCardName}.avif`}
            alt={`${monsterEncounter.cardName}`}
            class={`absolute top-0 left-0 h-full w-full transition-all group-hover:scale-105 ${
                isActive ? "grayscale-[0%]" : "grayscale-[100%]"
            }`}
        />
        <div
            class="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        >
            <span class="text-white font-bold text-xs sm:text-sm md:text-base lg:text-lg">View</span>
        </div>
    </div>
</button>