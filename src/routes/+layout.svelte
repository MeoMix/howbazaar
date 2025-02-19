<script lang="ts">
    import "../app.css";

    import {
        Toast,
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
    import CheckCircleOutline from "flowbite-svelte-icons/CheckCircleOutline.svelte";
    import DiscordSolid from "flowbite-svelte-icons/DiscordSolid.svelte";
    import { type Snippet } from "svelte";
    import { fly } from "svelte/transition";
    import { page } from "$app/stores";
    import { clipboardState } from "$lib/stores/clipboard";

    let toastStatus = $state(false);
    let toastClearTimeout: ReturnType<typeof setTimeout>;
    clipboardState.subscribe((value) => {
        clearTimeout(toastClearTimeout);
        toastStatus = value !== "";

        toastClearTimeout = setTimeout(() => (toastStatus = false), 3000);
    });

    let isHamburgerMenuOpen = $state(false);
    const onNavLiClick = () => {
        isHamburgerMenuOpen = false;
    };

    let { children }: { children: Snippet } = $props();
</script>

<div class="flex justify-center dark:bg-bazaar-background text-red-500">
    Updating to the February 19th patch will take longer than usual, sorry. The source
    for the data changed as Tempo obfuscates the client to prevent modding and
    begins work on providing an API.
</div>

<div
    class="flex flex-col min-h-screen bg-white dark:bg-bazaar-background text-gray-900 dark:text-bazaar-tan700"
>
    <Navbar
        class="sticky top-0 z-10 bg-white dark:bg-bazaar-background dark:text-bazaar-tan700"
    >
        <NavBrand
            href={`/items${$page.url.search}`}
            class="relative inline-block"
        >
            <span
                class="self-center whitespace-nowrap text-xl font-semibold dark:text-bazaar-tan700 hover:text-bazaar-orange dark:hover:text-bazaar-orange relative z-10"
            >
                How Bazaar
                <!-- <Badge border large color="green" class="whitespace-nowrap">
                    Updated Feb 05
                </Badge> -->
            </span>
        </NavBrand>

        <div class="flex md:order-2 items-center">
            <a
                href="https://discord.gg/VrGGFYEXXz"
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
                on:click={onNavLiClick}>Contact & Upcoming Features</NavLi
            >
        </NavUl>
        <div
            class="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-bazaar-orange"
        ></div>
    </Navbar>

    <div
        class="flex-grow px-2 sm:px-4 max-w-[120rem] w-full mx-auto overflow-y-hidden"
    >
        {@render children()}
    </div>

    <div class="fixed bottom-0 left-0 w-full flex justify-center">
        <Toast
            position="bottom-left"
            color={"green"}
            transition={fly}
            params={{ y: 100, duration: 300 }}
            divClass={`w-full max-w-xs p-4 text-gray-500 bg-white shadow dark:text-bazaar-tan700 dark:bg-bazaar-brown dark:shadow-bazaar-brown600 gap-3`}
            bind:toastStatus
        >
            <svelte:fragment slot="icon">
                <CheckCircleOutline class="w-5 h-5" />
            </svelte:fragment>
            <span>Link copied to clipboard</span>
        </Toast>
    </div>

    <Footer
        footerType="sitemap"
        class="py-6 bg-white dark:bg-bazaar-background"
    >
        <div
            class="h-[1px] my-6 bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-bazaar-orange"
        ></div>

        <div class="mx-auto text-center">
            <div>
                <h2
                    class="mb-4 text-sm font-semibold uppercase text-gray-400 dark:text-bazaar-tan300"
                >
                    Partner Websites
                </h2>
                <FooterLinkGroup
                    ulClass="text-gray-700 dark:text-bazaar-tan500"
                >
                    <FooterLink href="https://bazaarrank.com/" target="_blank">
                        Bazaar Rank - Legendary Player Rankings
                    </FooterLink>
                </FooterLinkGroup>
            </div>
        </div>
    </Footer>
</div>
