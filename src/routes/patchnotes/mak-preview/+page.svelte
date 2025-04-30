<script lang="ts">
    import { PUBLIC_CDN_URL } from "$env/static/public";
    import { onMount } from "svelte";
    import { itemsStore } from "$lib/stores/itemsStore";
    import { skillsStore } from "$lib/stores/skillsStore";
    import type { ClientSideItemCard, ClientSideSkillCard } from "$lib/types";
    import { browser } from "$app/environment";
    import { invalidateAll } from "$app/navigation";
    import Tooltip from "$lib/components/Tooltip.svelte";
    import CardItem from "$lib/components/CardItem.svelte";
    import CardSkill from "$lib/components/CardSkill.svelte";
    import { tooltip, tooltipState } from "$lib/actions/tooltip.svelte";

    // Mark Mak preview as seen when the page loads
    onMount(async () => {
        if (browser) {
            await fetch("/api/mak-preview/mark-seen", { method: "POST" });
            invalidateAll();
        }
    });

    let items = $state([] as ClientSideItemCard[]);
    let skills = $state([] as ClientSideSkillCard[]);

    onMount(() => {
        const itemsUnsubscribe = itemsStore.subscribe((state) => {
            items = state.items;
        });

        const skillsUnsubscribe = skillsStore.subscribe((state) => {
            skills = state.skills;
        });

        return () => {
            itemsUnsubscribe();
            skillsUnsubscribe();
        };
    });

    // Helper function to find item/skill by name
    function findItemByName(name: string): ClientSideItemCard | undefined {
        return items.find((item) => item.name === name);
    }

    function findSkillByName(name: string): ClientSideSkillCard | undefined {
        return skills.find((skill) => skill.name === name);
    }
</script>

<svelte:head>
    <title>Mak Preview · How Bazaar</title>
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
    <div class="mb-6">
        <h1 class="text-3xl font-bold my-6">Mak Preview</h1>

        <div>
            The Bazaar's newest hero, <span
                class="font-bold text-game-poison">Mak</span
            >, is just around the corner—and
            <em class="text-bazaar-orange">How Bazaar</em> got early access to a
            handful of their new items! I'm thrilled to be able to share these with
            you and dive into some of the interesting new mechanics and synergies
            they introduce. Let's take a look at what this potion-slinging alchemist
            has in store.
        </div>
    </div>

    <!-- Athanor -->
    <div class="mb-6">
        <img
            src={`${PUBLIC_CDN_URL}images/preview/thumbnail-Mak-Athanor.avif?v=1`}
            alt="Athanor"
        />

        <div class="mt-4">
            <p class="mb-4">
                <span class="font-bold text-bazaar-orange">Athanor</span> is an
                <span class="font-bold text-game-value">Economy</span>
                item for Mak which brews a
                <span class="text-game-tag font-bold">Potion</span> each day!
            </p>
            <ul class="list-disc list-inside">
                <li>
                    Starting at <span class="font-bold text-tiers-bronze-500"
                        >Bronze</span
                    > makes this a fantastic early pickup. It helps kick-start your
                    economy and gives you an immediate build-around target.
                </li>
                <li>
                    Feels spiritually similar to <em
                        class="font-bold text-blue-500 cursor-pointer"
                        use:tooltip={{ item: findItemByName("Port") }}>Port</em
                    >—reloading your items and giving you a small item each day.
                    Will it be as powerful as Port was in its heyday? Only time
                    will tell!
                </li>
                <li>
                    There are eight Mak potions already in the game:
                    <em
                        class="font-bold text-blue-500 cursor-pointer"
                        use:tooltip={{
                            item: findItemByName("Bottled Lightning"),
                        }}>Bottled Lightning</em
                    >,
                    <em
                        class="font-bold text-blue-500 cursor-pointer"
                        use:tooltip={{ item: findItemByName("Energy Potion") }}
                        >Energy Potion</em
                    >,
                    <em
                        class="font-bold text-blue-500 cursor-pointer"
                        use:tooltip={{ item: findItemByName("Fire Potion") }}
                        >Fire Potion</em
                    >,
                    <em
                        class="font-bold text-blue-500 cursor-pointer"
                        use:tooltip={{ item: findItemByName("Frost Potion") }}
                        >Frost Potion</em
                    >,
                    <em
                        class="font-bold text-blue-500 cursor-pointer"
                        use:tooltip={{ item: findItemByName("Noxious Potion") }}
                        >Noxious Potion</em
                    >,
                    <em
                        class="font-bold text-blue-500 cursor-pointer"
                        use:tooltip={{ item: findItemByName("Rainbow Potion") }}
                        >Rainbow Potion</em
                    >,
                    <em
                        class="font-bold text-blue-500 cursor-pointer"
                        use:tooltip={{ item: findItemByName("Shield Potion") }}
                        >Shield Potion</em
                    >, and
                    <em
                        class="font-bold text-blue-500 cursor-pointer"
                        use:tooltip={{
                            item: findItemByName("Sleeping Potion"),
                        }}>Sleeping Potion</em
                    >. Athanor makes building around these items much more
                    viable.
                </li>
                <li>
                    This item clearly reinforces Mak's identity as a
                    potion-focused hero. Expect potion strategies to be more
                    than just a side gimmick—they're central to how Mak plays.
                </li>
            </ul>
        </div>
    </div>

    <!-- Boiling Flask -->
    <div class="mb-6">
        <img
            src={`${PUBLIC_CDN_URL}images/preview/thumbnail-mak-BoilingFlask.avif?v=1`}
            alt="Boiling Flask"
        />

        <div class="mt-4">
            <p class="mb-4">
                <strong class="text-bazaar-orange">Boiling Flask</strong> scales
                the power of your board by giving
                <span class="font-bold text-game-tag">+1 Multicast</span>
                to adjacent
                <span class="font-bold text-game-tag">Potions</span>.
            </p>
            <ul class="list-disc list-inside">
                <li>
                    It combos beautifully with <strong
                        class="text-bazaar-orange">Athanor</strong
                    >. More potions with more multicast means more burn
                    triggers!
                </li>
                <li>
                    Its long cooldown means its active effect won't trigger
                    often—but when it does, nearby potions should be out of
                    ammo, letting you reload without waste.
                </li>
                <li>
                    The <span class="font-bold text-game-tag">Tool</span>
                    tag unlocks a few more possibilities for this item. Keep an eye
                    out for the
                    <em
                        class="font-bold text-blue-500 cursor-pointer"
                        use:tooltip={{ skill: findSkillByName("Re-Tooled") }}
                        >Re-Tooled</em
                    >
                    and
                    <em
                        class="font-bold text-blue-500 cursor-pointer"
                        use:tooltip={{ skill: findSkillByName("Retool") }}
                        >Retool</em
                    >
                    skills!
                </li>
            </ul>
        </div>
    </div>

    <!-- Bottled Explosion -->
    <div class="mb-6">
        <img
            src={`${PUBLIC_CDN_URL}images/preview/thumbnail-mak-BottledExplosion.avif?v=1`}
            alt="Bottled Explosion"
        />

        <div class="mt-4">
            <p class="mb-4">
                <strong class="text-bazaar-orange">Bottled Explosion</strong>
                has the potential to scale to crazy amounts of
                <span class="font-bold text-game-damage">Damage</span>
                if you can keep it full of
                <span class="font-bold text-game-ammo">Ammo</span>.
            </p>
            <ul class="list-disc list-inside">
                <li>
                    It pairs beautifully with <strong class="text-bazaar-orange"
                        >Boiling Flask</strong
                    >, stacking its damage more quickly and reliably thanks to
                    multicast and ammo reload.
                </li>
                <li>
                    Also shines alongside <em
                        class="font-bold text-blue-500 cursor-pointer"
                        use:tooltip={{ item: findItemByName("Poppy Field") }}
                        >Poppy Field</em
                    >
                    and possibly
                    <em
                        class="font-bold text-blue-500 cursor-pointer"
                        use:tooltip={{
                            item: findItemByName("Mortar & Pestle"),
                        }}>Mortar & Pestle</em
                    >, if you're running a more potion-heavy deck.
                </li>
                <li>
                    If you've played with <em
                        class="font-bold text-blue-500 cursor-pointer"
                        use:tooltip={{ item: findItemByName("Atlas Stone") }}
                        >Atlas Stone</em
                    >, this will feel familiar.
                    <strong class="text-bazaar-orange">Bottled Explosion</strong
                    > gets a shorter cooldown and higher base damage in exchange
                    for having to deal with ammo shortages.
                </li>
            </ul>
        </div>
    </div>

    <!-- Covetous Raven -->
    <div class="mb-6">
        <img
            src={`${PUBLIC_CDN_URL}images/preview/thumbnail-mak-CovetousRaven.avif?v=1`}
            alt="Covetous Raven"
        />

        <div class="mt-4">
            <p class="mb-4">
                <strong class="text-bazaar-orange">Covetous Raven</strong> is
                the first <em class="text-bazaar-orange">The Bazaar</em> item to
                reference
                <em class="font-semibold text-game-tag">Enchanted</em> items
                specifically! How exciting!
            </p>
            <ul class="list-disc list-inside">
                <li>
                    Notably, this item won't trigger off of itself—even if it's
                    enchanted. You'll need to do a little more work to create an
                    overpowered synergy.
                </li>
                <li>
                    The recent addition of free, enchanted items makes this more
                    viable than it might've been in the past. One enchanted item
                    isn't likely to be good enough to carry you to 10 wins, but
                    with a couple this item will trigger constantly!
                </li>
                <li>
                    It's the third <span class="font-bold text-game-tag"
                        >Friend</span
                    >
                    for Mak, joining
                    <em
                        class="font-bold text-blue-500 cursor-pointer"
                        use:tooltip={{ item: findItemByName("Leeches") }}
                        >Leeches</em
                    >
                    and
                    <em
                        class="font-bold text-blue-500 cursor-pointer"
                        use:tooltip={{ item: findItemByName("Venomander") }}
                        >Venomander</em
                    >. As Mak's friend count continues to grow, we'll need to
                    keep our eyes peeled for any potential synergies.
                </li>
            </ul>
        </div>
    </div>
</div>
