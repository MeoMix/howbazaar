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
        FooterLinkGroup,
        FooterLink,
        Badge,
    } from "flowbite-svelte";
    import DiscordSolid from "flowbite-svelte-icons/DiscordSolid.svelte";
    import ClipboardOutline from "flowbite-svelte-icons/ClipboardOutline.svelte";
    import { onDestroy, onMount, tick, type Snippet } from "svelte";
    import { page } from "$app/stores";
    import { PUBLIC_CDN_URL } from "$env/static/public";
    import { DollarOutline } from "flowbite-svelte-icons";
    import { adsStore } from "$lib/stores/adsStore";
    import type { Unsubscriber } from "svelte/store";
    import UpdatedBadge from "$lib/components/UpdatedBadge.svelte";

    let isHamburgerMenuOpen = $state(false);
    const onNavLiClick = () => {
        isHamburgerMenuOpen = false;
    };

    let showAds = $state(false);
    let adSenseLoadFailed = $state(false);
    let unsubscribe = $state<Unsubscriber>();
    let verticalAdContainer = $state<HTMLElement>();
    let observer = $state<MutationObserver>();
    let mediaQuery = $state<MediaQueryList>();
    let isLargeScreen = $state<boolean | undefined>();

    const mediaQueryCallback = async () => {
        isLargeScreen = window.matchMedia("(min-width: 1024px)").matches;

        if (showAds) {
            // Wait for `isLargeScreen` to redraw the ad unit
            await tick();
            setupAds();
        }
    };

    const loadAdSenseScript = (): Promise<void> => {
        return new Promise((resolve, reject) => {
            if (window.adsbygoogle) {
                resolve();
                return;
            }

            const script = document.createElement("script");
            script.async = true;
            script.src =
                "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6020599814166575";
            script.crossOrigin = "anonymous";
            script.onload = () => resolve();
            script.onerror = () => {
                adSenseLoadFailed = true;
                console.error("Failed to load AdSense script");
                reject();
            };

            document.head.appendChild(script);
        });
    };

    const setupAds = () => {
        if (!window.adsbygoogle) {
            return;
        }

        try {
            if (window.adsbygoogle?.loaded && window.adsbygoogle?.pageState) {
                window.adsbygoogle.push({});
            } else {
                adSenseLoadFailed = true;
                console.error("AdSense failed to load:");
            }
        } catch (e) {
            console.error("AdSense failed to load:", e);
            adSenseLoadFailed = true;
        }

        observer?.disconnect();

        observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (
                    mutation.type === "attributes" &&
                    mutation.attributeName === "style"
                ) {
                    const targetElement = mutation.target as HTMLElement;
                    // Prevent Google AdSense from overwriting the height properties.
                    targetElement.style.height = "";
                    targetElement.style.minHeight = "";
                }
            });
        });

        let currentElement: HTMLElement | undefined | null =
            verticalAdContainer;
        while (currentElement && currentElement !== document.documentElement) {
            observer.observe(currentElement, {
                attributes: true,
                attributeFilter: ["style"],
            });
            currentElement = currentElement.parentElement; // Move up the DOM tree
        }
    };

    onMount(async () => {
        mediaQuery = window.matchMedia("(min-width: 1024px)");
        mediaQuery.addEventListener("change", mediaQueryCallback);
        mediaQueryCallback();

        loadAdSenseScript().then(() => {
            unsubscribe = adsStore.subscribe(async (state) => {
                showAds = state.showAds;

                if (showAds) {
                    await tick();
                    setupAds();
                }
            });
        });
    });

    onDestroy(() => {
        unsubscribe?.();

        // Disconnect the mutation observer when component is destroyed
        observer?.disconnect();
        mediaQuery?.removeEventListener("change", mediaQueryCallback);
    });

    let { children }: { children: Snippet } = $props();
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
                href={`/${$page.url.search}`}
                class="relative inline-block"
            >
                <span
                    class="self-center whitespace-nowrap text-xl font-semibold dark:text-bazaar-tan700 hover:text-bazaar-orange dark:hover:text-bazaar-orange relative z-10"
                >
                    How Bazaar
                </span>
            </NavBrand>
            <UpdatedBadge />
        </div>

        <div class="flex md:order-2 items-center">
            <a
                href="/patchnotes"
                class="hover:text-gray-900 dark:text-bazaar-tan700 dark:hover:text-bazaar-orange dark:hover:bg-bazaar-brown p-2.5 rounded-lg"
            >
                <ClipboardOutline />
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
                classMenu="outline-none"
                onClick={() => {
                    isHamburgerMenuOpen = !isHamburgerMenuOpen;
                }}
            />
        </div>

        <NavUl
            activeUrl={`${$page.url.pathname}${$page.url.search}`}
            nonActiveClass="dark:text-bazaar-tan700 md:dark:hover:text-bazaar-orange hover:bg-gray-200 dark:hover:bg-bazaar-brown hover:text-bazaar-orange dark:hover:text-bazaar-orange md:hover:bg-transparent md:dark:hover:bg-transparent"
            activeClass="text-bazaar-orange dark:text-bazaar-orange md:text-bazaar-orange md:dark:text-bazaar-orange bg-gray-200 dark:bg-bazaar-brown md:bg-transparent md:dark:bg-transparent"
            ulClass="flex flex-col mt-4 md:flex-row md:space-x-0 rtl:space-x-reverse md:mt-0 md:text-sm md:font-medium dark:bg-bazaar-background dark:border-bazaar-brown"
            slideParams={{ duration: 0 }}
            hidden={!isHamburgerMenuOpen}
        >
            <NavLi
                class="md:p-4"
                href={`/${$page.url.search}`}
                on:click={onNavLiClick}>All</NavLi
            >
            <NavLi
                class="md:p-4"
                href={`/items${$page.url.search}`}
                on:click={onNavLiClick}>Items</NavLi
            >
            <NavLi
                class="md:p-4"
                href={`/skills${$page.url.search}`}
                on:click={onNavLiClick}>Skills</NavLi
            >
            <NavLi
                class="md:p-4"
                href={`/monsters${$page.url.search}`}
                on:click={onNavLiClick}>Monsters</NavLi
            >
            <NavLi
                class="md:p-4"
                href={`/contact${$page.url.search}`}
                on:click={onNavLiClick}>Contact</NavLi
            >
        </NavUl>
        <div
            class="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-bazaar-orange"
        ></div>
    </Navbar>

    <div class="flex-grow px-2 sm:px-4 max-w-[120rem] w-full mx-auto">
        <!-- Main container with flex layout -->
        <div class="flex justify-center w-full px-4">
            {@render children()}

            <!--
                Vertical banner ad - hidden on smaller screens, visible on lg and above
                Removes/adds the element entirely, rather than hiding, to ensure Google AdSense
                only tries to initialize the ad unit when it has a valid width.
            -->
            {#if showAds && isLargeScreen === true && !adSenseLoadFailed}
                <div
                    bind:this={verticalAdContainer}
                    class="ml-4 sticky h-full top-[72px] pt-8"
                >
                    <div
                        class="bg-gray-100 border border-gray-200 rounded-lg overflow-hidden"
                    >
                        <ins
                            class="adsbygoogle w-[120px] xl:w-[300px] max-h-[600px]"
                            style="display:block"
                            data-ad-client="ca-pub-6020599814166575"
                            data-ad-slot="3801324847"
                            data-ad-format="vertical"
                        ></ins>
                    </div>
                </div>
            {/if}
        </div>
    </div>

    {#if showAds && isLargeScreen === false && !adSenseLoadFailed}
        <!-- Fixed horizontal banner ad for smaller screens (visible on md and below) -->
        <div class="fixed bottom-0 left-0 right-0 w-full z-50">
            <div class="bg-gray-100 border-t border-gray-200 shadow-lg">
                <ins
                    class="adsbygoogle w-full h-[100px]"
                    style="display:block;"
                    data-ad-client="ca-pub-6020599814166575"
                    data-ad-slot="6216601165"
                    data-ad-format="horizontal"
                >
                </ins>
            </div>
        </div>
    {/if}

    <div class={`${showAds && !adSenseLoadFailed ? "mb-[100px] lg:mb-0" : ""}`}>
        <Footer
            footerType="sitemap"
            class={`py-6 bg-white dark:bg-bazaar-background`}
        >
            <div
                class="h-[1px] my-6 bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-bazaar-orange"
            ></div>

            <div class="mx-auto text-center">
                <UpdatedBadge />
            </div>
        </Footer>
    </div>
</div>
