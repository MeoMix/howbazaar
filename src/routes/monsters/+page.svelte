<script lang="ts">
    import type { ClientSideMonsterEncounter } from "$lib/types";
    import type { PageData } from "./$types";
    import MonsterFilters from "$lib/components/MonsterFilters.svelte";
    import MonsterList from "$lib/components/MonsterList.svelte";
    import { tooltipState } from "$lib/actions/tooltip.svelte";
    import CardItem from "$lib/components/CardItem.svelte";
    import CardSkill from "$lib/components/CardSkill.svelte";
    import Tooltip from "$lib/components/Tooltip.svelte";

    const { data }: { data: PageData } = $props();

    let searchText = $state("");
    let selectedDay = $state(undefined) as number | undefined;

    let selectedMonsterEncounter = $state() as
        | ClientSideMonsterEncounter
        | undefined;

    function onSelectDay() {
        selectedMonsterEncounter = undefined;
    }
</script>

<svelte:head>
    <title>Monsters · How Bazaar</title>
</svelte:head>

{#if tooltipState.hoveredItem || tooltipState.hoveredSkill}
    <Tooltip x={tooltipState.x} y={tooltipState.y}>
        {#if tooltipState.hoveredItem}
            <CardItem
                card={tooltipState.hoveredItem}
                areEnchantmentsShown={false}
                showCopyLink={false}
            />
        {:else if tooltipState.hoveredSkill}
            <CardSkill card={tooltipState.hoveredSkill} showCopyLink={false} />
        {/if}
    </Tooltip>
{/if}

<div
    class="w-full max-w-full sm:max-w-(--breakpoint-sm) md:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-lg) xl:max-w-(--breakpoint-xl)"
>
    <div class="text-lg mt-4 text-red-500">
        I haven't updated monsters for the 5.0.0 Stelle release yet. Please DM
        me on Discord with screenshots of missing/incorrect encounters. Thank
        you!
        <br />
        <br />

        Ideally you would tell me this info:
        <br />
        <ul>
            <li>- Monster HP</li>
            <li>- Which day it appears on</li>
            <li>
                - Whether it appears in the first, second, or third slot for the
                day's encounter.
            </li>
            <li>- Name and Tier of all skills.</li>
            <li>- Names and Tier of all items.</li>
        </ul>

        I still need the changes for these previously existing monsters:
        <br />
        <ul>
            <li>
                <span class="line-through">- Haunted Kimono</span>
                <span class="text-green-500">Updated!</span>
            </li>
            <li>
                <span class="line-through">- Rogue Scrapper</span>
                <span class="text-green-500">Updated!</span>
            </li>
            <li>
                <span class="line-through">- Boarrior</span>
                <span class="text-green-500">Updated!</span>
            </li>
            <li>
                <span class="line-through">- Eccentric Etherwright</span>
                <span class="text-green-500">Updated!</span>
            </li>
            <li>
                <span class="line-through">- Giant Mosquito</span>
                <span class="text-green-500">Updated!</span>
            </li>
            <li>- Street Gamer</li>
            <li>- Foundation Weeper</li>
            <li>
                <span class="line-through">- Retiree</span>
                <span class="text-green-500">Updated!</span>
            </li>
            <li>
                <span class="line-through">-Dire Mosquito</span>
                <span class="text-green-500">Updated!</span>
            </li>
            <li>
                <span class="line-through">- Sergeant Suds</span>
                <span class="text-green-500">Updated!</span>
            </li>
            <li>
                <span class="line-through">- Ghost Pepper</span>
                <span class="text-green-500">Updated!</span>
            </li>
            <li>
                <span class="line-through">- Thug</span>
                <span class="text-green-500">Updated!</span>
            </li>
            <li>
                <span class="line-through">- Lord of the Wastes</span>
                <span class="text-green-500">Updated!</span>
            </li>
        </ul>

        I still need the changes for these new monsters:
        <br />
        <ul>
            <li>
                <span class="line-through">- Product Demostrator</span>
                <span class="text-green-500">Updated!</span>
            </li>
            <li>
                <span class="line-through">- Grandfather Klok</span>
                <span class="text-green-500">Updated!</span>
            </li>
            <li>
                <span class="line-through">- Cloudtop Officer</span>
                <span class="text-green-500">Updated!</span>
            </li>
            <li>
                <span class="line-through">- Cloudtop Admiral</span>
                <span class="text-green-500">Updated!</span>
            </li>
            <li>- Tortuga (Need HP only)</li>
            <li>
                <span class="line-through">- Test Subject Alpha</span>
                <span class="text-green-500">Updated!</span>
            </li>
            <li>
                <span class="line-through">- Infernal Dreadnought</span>
                <span class="text-green-500">Updated!</span>
            </li>
            <li>
                <span class="line-through">- Rex Spex</span>
                <span class="text-green-500">Updated!</span>
            </li>
            <li>
                <span class="line-through">- Dooltron</span>
                <span class="text-green-500">Updated!</span>
            </li>
            <li>
                <span class="line-through">- Awakened Primordial</span>
                <span class="text-green-500">Updated!</span>
            </li>
        </ul>
    </div>

    <MonsterFilters
        dayOptions={data.dayOptions}
        bind:searchText
        bind:selectedDay
        {onSelectDay}
    />

    <MonsterList
        serverVersion={data.version}
        {selectedDay}
        {searchText}
        {selectedMonsterEncounter}
        isHiddenWhenEmpty={false}
    />
</div>
