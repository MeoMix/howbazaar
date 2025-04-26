<script>
    import { Button } from "flowbite-svelte";
    import { adsStore } from "$lib/stores/adsStore";
    import { onMount } from "svelte";

    let showAds = $state(false);

    onMount(() => {
        const unsubscribe = adsStore.subscribe((state) => {
            showAds = state.showAds;
        });

        return unsubscribe;
    });

    const buttonLabel = $derived(showAds ? "Hide Ads" : "Show Ads");

    function toggleAds() {
        adsStore.toggle();
    }
</script>

<svelte:head>
    <title>Donate · How Bazaar</title>
</svelte:head>

<div
    class="w-full max-w-full sm:max-w-(--breakpoint-sm) md:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-lg) xl:max-w-(--breakpoint-xl)"
>
    <div class="font-semibold text-4xl my-4 mt-8">So.</div>

    <div class="text-lg leading-loose">
        <p>
            You want to pay me some <span
                class="font-bold text-game-freeze">cold.</span
            > <span class="font-bold text-game-physical">hard.</span>
            <span class="font-bold text-game-poison">cash.</span>
            to say, <span class="font-semibold italic">"Thank you!"</span> for the
            service, do you?
        </p>
        <p>Well, who am I to try and stop you?</p>
        <p>Here's a link to my Ko-fi. Make it rain (or drizzle).</p>
    </div>

    <div class="my-4">
        <a
            class="text-3xl font-bold text-blue-600"
            target="_blank"
            href="https://ko-fi.com/hi_im_meo">https://ko-fi.com/hi_im_meo</a
        >
    </div>

    <div class="text-lg">I appreciate the support!</div>

    <div class="text-lg leading-loose">
        <div class="font-semibold text-3xl mt-8">P.S.</div>

        <p>
            I placed an ad on the website <span
                class="italic text-sm">(booo!)</span
            > as a means of offsetting server costs (~$150/mo).
        </p>

        <p>
            I've included a button here that you can
            click to make the ads go away <span class="italic text-sm"
                >(yaaaay!)</span
            >
        </p>

        <p>
            It'll be on the honor system, so no pressure to tip to get rid of
            the ads. Just click the button and they'll go away.
        </p>

        <p>
            If you feel a teensey bit of guilt for clicking the button without
            donating, that'd be cool.
        </p>
        <p>But no pressure. Really. None at all. Not even a little bit.</p>

        <p class="text-sm mt-12">
            ...just a lonely little tip link sitting there, wishing it were
            clicked by an honest, hard-working individual.
        </p>

        <Button
            size="xs"
            outline
            pill
            color={"red"}
            on:click={toggleAds}
            class="mt-4 transition-colors focus:outline-hidden border self-center w-auto"
        >
            {buttonLabel}
        </Button>

        <div class="font-bold text-red-500 mt-4">
            {"<3"}
        </div>
        <div>~ Meo</div>
    </div>
</div>
