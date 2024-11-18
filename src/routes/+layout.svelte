<script lang="ts">
    import "../app.css";
    import { dev } from "$app/environment";
    import { inject } from "@vercel/analytics";
    inject({ mode: dev ? "development" : "production" });

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
    } from "flowbite-svelte";
    import CheckCircleOutline from "flowbite-svelte-icons/CheckCircleOutline.svelte";
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

    let { children }: { children: Snippet } = $props();
</script>

<div
    class="flex flex-col min-h-screen bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
>
    <Navbar class="sticky top-0 z-10 border-b bg-white dark:bg-gray-800">
        <NavBrand href={`/items${$page.url.search}`}>
            <span
                class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
            >
                How Bazaar
            </span>
        </NavBrand>

        <div class="flex md:order-2 items-center">
            <DarkMode class="hover:text-gray-900 dark:hover:text-white" />
            <NavHamburger class="hover:text-gray-900 dark:hover:text-white" />
        </div>

        <NavUl activeUrl={$page.url.pathname}>
            <NavLi href={`/items${$page.url.search}`}>Items</NavLi>
            <NavLi href={`/skills${$page.url.search}`}>Skills</NavLi>
            <NavLi href={`/monsters${$page.url.search}`}>Monsters</NavLi>
            <NavLi href={`/contact${$page.url.search}`}
                >Contact & Upcoming Features</NavLi
            >
        </NavUl>
    </Navbar>

    <div
        class="flex-grow px-2 sm:px-4 max-w-[120rem] w-full mx-auto overflow-y-auto"
    >
        {@render children()}
    </div>

    <div class="fixed bottom-0 left-0 w-full flex justify-center">
        <Toast
            position="bottom-left"
            color={"green"}
            transition={fly}
            params={{ y: 100, duration: 300 }}
            bind:toastStatus
        >
            <svelte:fragment slot="icon">
                <CheckCircleOutline
                    class="w-5 h-5 text-gray-900 dark:text-gray-100"
                />
                <span class="sr-only">Check icon</span>
            </svelte:fragment>
            <span class="text-gray-900 dark:text-gray-100"
                >Link copied to clipboard</span
            >
        </Toast>
    </div>

    <Footer
        footerType="sitemap"
        class="bg-white dark:bg-gray-800 py-6 border-t text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 divide-gray-200 dark:divide-gray-700 "
    >
        <div class="mx-auto text-center">
            <div>
                <h2 class="mb-4 text-sm font-semibold text-gray-400 uppercase">
                    Partner Websites
                </h2>
                <FooterLinkGroup ulClass="text-gray-700 dark:text-gray-300">
                    <FooterLink href="https://bazaarrank.com/" target="_blank">
                        Bazaar Rank - Legendary Player Rankings
                    </FooterLink>
                </FooterLinkGroup>
            </div>
        </div>
    </Footer>
</div>
