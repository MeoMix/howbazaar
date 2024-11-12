<script lang="ts">
    import "../app.css";
    import { dev } from "$app/environment";
    import { inject } from "@vercel/analytics";
    inject({ mode: dev ? "development" : "production" });

    import { Toast, DarkMode, Navbar, NavBrand, NavUl, NavLi, NavHamburger } from "flowbite-svelte";
    import { CheckCircleSolid } from "flowbite-svelte-icons";
    import { onMount, type Snippet } from "svelte";
    import { fly } from "svelte/transition";
    import { page } from "$app/stores";
    import { clipboardState } from "$lib/stores/clipboard";

    let toastStatus = $state(false);
    let toastClearTimeout: ReturnType<typeof setTimeout>;
    clipboardState.subscribe((value) => {
        clearTimeout(toastClearTimeout);
        toastStatus = value !== "";

        toastClearTimeout = setTimeout(() => toastStatus = false, 3000);
    });

    let { children }: { children: Snippet } = $props();

    const activeUrl = $derived($page.url.pathname);
    const searchParams = $derived($page.url.searchParams);
</script>

<Navbar class="sticky top-0 z-10 border-b bg-white dark:bg-gray-800">
    <NavBrand href={`/items?${searchParams}`}>
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            How Bazaar
        </span>
    </NavBrand>
    
    <div class="flex md:order-2">
        <DarkMode class="hover:text-gray-900 dark:hover:text-white" />
        <NavHamburger class="hover:text-gray-900 dark:hover:text-white" />
    </div>

    <NavUl {activeUrl}>
        <NavLi href={`/items?${searchParams}`}>Items</NavLi>
        <NavLi href={`/skills?${searchParams}`}>Skills</NavLi>
        <NavLi href={`/monsters?${searchParams}`}>Monsters</NavLi>
        <NavLi href={`/contact?${searchParams}`}>Contact & Upcoming Features</NavLi>
    </NavUl>
</Navbar>

<div class="relative min-h-screen flex flex-col text-gray-900 dark:text-gray-100 ">
    <div class="flex-grow overflow-y-auto px-2 sm:px-4 max-w-[120rem] w-full mx-auto">
        {@render children()}
    </div>

    <div class="fixed bottom-0 left-0 w-full flex justify-center p-4">
        <Toast
            position="bottom-left"
            color={"green"}
            transition={fly}
            params={{ y: 100, duration: 300 }}
            bind:toastStatus
        >
            <svelte:fragment slot="icon">
                <CheckCircleSolid class="w-5 h-5 text-gray-900 dark:text-gray-100" />
                <span class="sr-only">Check icon</span>
            </svelte:fragment>
            <span class="text-gray-900 dark:text-gray-100">Link copied to clipboard</span>
        </Toast>
    </div>
</div>

<div class="mx-auto text-center bg-yellow-400 border-4 border-black p-4 max-w-xs">
    <img src="https://viluukiao9kyljph.public.blob.vercel-storage.com/webring.webp" loading="lazy" alt="Join the Webring" class="mx-auto mb-4 border-2 border-black">

    <a href="https://bazaarrank.com/" target="_blank" class="inline-block mx-2 my-2 py-2 px-4 bg-orange-500 text-white border-2 border-black font-bold uppercase shadow-lg hover:bg-green-500">
        Visit Our Partner Site - Bazaarrank
    </a>
    <small class="block mt-2 text-gray-600">More sites coming soon!</small>
    <small class="block mt-2 text-gray-600">(Also this is kind of a joke, you don't have a virus, but if you want to check out The Bazaar leaderboards, click above.)</small>
</div>
