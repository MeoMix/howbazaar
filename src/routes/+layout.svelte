<script lang="ts">
    import "../app.css";

    import {
        DarkMode,
        Navbar,
        NavBrand,
        NavUl,
        NavLi,
        NavHamburger,
        Footer,
    } from "flowbite-svelte";
    import DiscordSolid from "flowbite-svelte-icons/DiscordSolid.svelte";
    import ClipboardOutline from "flowbite-svelte-icons/ClipboardOutline.svelte";
    import { onDestroy, onMount, type Snippet } from "svelte";
    import { page } from "$app/state";
    import { PUBLIC_CDN_URL } from "$env/static/public";
    import { DollarOutline } from "flowbite-svelte-icons";
    import { adsStore } from "$lib/stores/adsStore";
    import type { Unsubscriber } from "svelte/store";
    import UpdatedBadge from "$lib/components/UpdatedBadge.svelte";
    import { AVAILABLE_VERSIONS } from "$lib/constants";

    let isHamburgerMenuOpen = $state(false);
    const onNavLiClick = () => {
        isHamburgerMenuOpen = false;
    };

    let showAds = $state(false);
    let adScriptLoaded = $state(false);
    let adScriptLoadFailed = $state(false);
    let unsubscribe = $state<Unsubscriber>();
    let mediaQuery = $state<MediaQueryList>();
    let xlMediaQuery = $state<MediaQueryList>();
    let isLargeScreen = $state<boolean | undefined>();
    let isXlScreen = $state<boolean | undefined>();

    const mediaQueryCallback = async () => {
        isLargeScreen = window.matchMedia("(min-width: 1024px)").matches;
        isXlScreen = window.matchMedia("(min-width: 1280px)").matches;

        toggleAdVisibility();
    };

    const loadAdScript = (): Promise<void> => {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.type = "module";
            script.src = "https://js.rev.iq";
            script.dataset.domain = "howbazaar.gg";
            script.onload = () => {
                console.log("Ad script loaded");
                adScriptLoaded = true;
                resolve();
            };
            script.onerror = () => {
                adScriptLoadFailed = true;
                console.error("Failed to load ad script");
                reject();
            };

            document.head.appendChild(script);
        });
    };

    onMount(async () => {
        mediaQuery = window.matchMedia("(min-width: 1024px)");
        xlMediaQuery = window.matchMedia("(min-width: 1280px)");
        mediaQuery.addEventListener("change", mediaQueryCallback);
        xlMediaQuery.addEventListener("change", mediaQueryCallback);
        mediaQueryCallback();

        if (window.isAdBlockDisabled) {
            unsubscribe = adsStore.subscribe(async (state) => {
                showAds = state.showAds;

                if (showAds) {
                    await loadAdScript();
                    toggleAdVisibility();
                }
            });
        } else {
            adScriptLoadFailed = true;
        }
    });

    onDestroy(() => {
        unsubscribe?.();
        mediaQuery?.removeEventListener("change", mediaQueryCallback);
        xlMediaQuery?.removeEventListener("change", mediaQueryCallback);
    });

    let { children }: { children: Snippet } = $props();

    // Function to toggle the visibility of the injected ad element
    const toggleAdVisibility = () => {
        const adElement = document.querySelector(
            "[data-reviq-sticky-ad]",
        ) as HTMLElement;
        if (adElement) {
            if (showAds && isLargeScreen === false && !adScriptLoadFailed) {
                adElement.style.display = "flex";
            } else {
                adElement.style.display = "none";
            }
        }
    };
</script>

<svelte:head>
    <link rel="icon" href="{PUBLIC_CDN_URL}/favicon.avif" />
</svelte:head>

<div
    class="flex flex-col min-h-screen bg-white dark:bg-bazaar-background text-gray-900 dark:text-bazaar-tan700"
>
    <Navbar
        class="sticky top-0 z-10 bg-white dark:bg-bazaar-background dark:text-bazaar-tan700"
    >
        <div class="flex items-baseline">
            <NavBrand
                href={`/${page.url.search}`}
                class="relative inline-block"
            >
                <span
                    class="self-center whitespace-nowrap text-xl font-semibold dark:text-bazaar-tan700 hover:text-bazaar-orange dark:hover:text-bazaar-orange relative z-10"
                >
                    How Bazaar
                </span>
            </NavBrand>
        </div>

        <div class="flex md:order-2 items-center">
            <a
                href="/patchnotes"
                class="flex items-center gap-1 hover:text-gray-900 dark:text-bazaar-tan700 dark:hover:text-bazaar-orange dark:hover:bg-bazaar-brown p-2.5 rounded-lg"
            >
                <ClipboardOutline />
                <span
                    class={`relative text-xs font-medium  ${page.data.hasNewVersions ? "animate-pulse text-green-500 dark:text-green-500" : "text-gray-500 dark:text-bazaar-tan500"} whitespace-nowrap`}
                >
                    {AVAILABLE_VERSIONS[0].date}
                </span>
            </a>

            <a
                href="/tip"
                class="hover:text-gray-900 dark:text-bazaar-tan700 dark:hover:text-bazaar-orange dark:hover:bg-bazaar-brown p-2.5 rounded-lg"
            >
                <DollarOutline />
            </a>

            <a
                href="https://discord.gg/scWr32PJfv"
                target="_blank"
                class="hover:text-gray-900 dark:text-bazaar-tan700 dark:hover:text-bazaar-orange dark:hover:bg-bazaar-brown p-2.5 rounded-lg"
            >
                <DiscordSolid />
            </a>
            <DarkMode
                class="hover:text-gray-900 dark:text-bazaar-tan700 dark:hover:text-bazaar-orange dark:hover:bg-bazaar-brown"
            />
            <NavHamburger
                class="hover:text-gray-900 dark:text-bazaar-tan700 dark:hover:text-bazaar-orange dark:hover:bg-bazaar-brown"
                classMenu="outline-hidden"
                onClick={() => {
                    isHamburgerMenuOpen = !isHamburgerMenuOpen;
                }}
            />
        </div>

        <NavUl
            activeUrl={`${page.url.pathname}${page.url.search}`}
            nonActiveClass="dark:text-bazaar-tan700 md:dark:hover:text-bazaar-orange hover:bg-gray-200 dark:hover:bg-bazaar-brown hover:text-bazaar-orange dark:hover:text-bazaar-orange md:hover:bg-transparent md:dark:hover:bg-transparent"
            activeClass="text-bazaar-orange dark:text-bazaar-orange md:text-bazaar-orange md:dark:text-bazaar-orange bg-gray-200 dark:bg-bazaar-brown md:bg-transparent md:dark:bg-transparent"
            ulClass="flex flex-col mt-4 md:flex-row md:space-x-0 rtl:space-x-reverse md:mt-0 md:text-sm md:font-medium dark:bg-bazaar-background dark:border-bazaar-brown"
            slideParams={{ duration: 0 }}
            hidden={!isHamburgerMenuOpen}
        >
            <NavLi
                class="md:p-4"
                href={`/${page.url.search}`}
                on:click={onNavLiClick}>All</NavLi
            >
            <NavLi
                class="md:p-4"
                href={`/items${page.url.search}`}
                on:click={onNavLiClick}>Items</NavLi
            >
            <NavLi
                class="md:p-4"
                href={`/skills${page.url.search}`}
                on:click={onNavLiClick}>Skills</NavLi
            >
            <NavLi
                class="md:p-4"
                href={`/monsters${page.url.search}`}
                on:click={onNavLiClick}>Monsters</NavLi
            >
            <NavLi
                class="md:p-4"
                href={`/merchants${page.url.search}`}
                on:click={onNavLiClick}>Merchants</NavLi
            >
            <NavLi
                class="md:p-4"
                href={`/contact${page.url.search}`}
                on:click={onNavLiClick}>Contact</NavLi
            >
        </NavUl>
        <div
            class="absolute inset-x-0 bottom-0 h-[1px] bg-linear-to-r from-transparent via-gray-200 to-transparent dark:via-bazaar-orange"
        ></div>
    </Navbar>

    <div class="grow px-2 sm:px-4 max-w-[120rem] w-full mx-auto">
        <!-- Main container with flex layout -->
        <div class="flex justify-center w-full px-4">
            {@render children()}

            <!--
                Vertical banner ad - hidden on smaller screens, visible on lg and above
                Removes/adds the element entirely, rather than hiding, to ensure Google AdSense
                only tries to initialize the ad unit when it has a valid width.
            -->
            {#if showAds && isLargeScreen === true && !adScriptLoadFailed}
                <div
                    class="ml-4 sticky h-full top-[72px] pt-8 overflow-hidden"
                    style="width: {isXlScreen ? '300px' : '120px'};"
                >
                    <!--
                        Render two distinct divs rather than just updating ad-size to allow the injected Google Adsense iframe to be recreated.
                        In the future, it might be better to just go for 300x600 always and use overflow: hidden on the parent as long as 51% of the ad is visible.
                     -->
                    {#if isXlScreen}
                        <div
                            data-ad="right-rail-2"
                            data-ad-size="300x600"
                        ></div>
                    {:else}
                        <div
                            data-ad="right-rail-2"
                            data-ad-size="120x600"
                        ></div>
                    {/if}
                </div>
            {/if}
        </div>
    </div>

    <div
        class={`${showAds && !adScriptLoadFailed ? "mb-[100px] lg:mb-0" : ""}`}
    >
        <Footer
            footerType="sitemap"
            class={`py-6 bg-white dark:bg-bazaar-background`}
        >
            <div
                class="h-[1px] my-6 bg-linear-to-r from-transparent via-gray-200 to-transparent dark:via-bazaar-orange"
            ></div>

            <div class="mx-auto text-center">
                <UpdatedBadge />
            </div>
        </Footer>
    </div>
</div>
