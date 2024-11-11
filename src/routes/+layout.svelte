<script lang="ts">
    import "../app.css";
    import { dev } from "$app/environment";
    import { inject } from "@vercel/analytics";
    inject({ mode: dev ? "development" : "production" });

    import { Tabs, TabItem, Toast, DarkMode, Navbar, NavBrand } from "flowbite-svelte";
    import { CheckCircleSolid } from "flowbite-svelte-icons";
    import type { Snippet } from "svelte";
    import { fly } from "svelte/transition";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { clipboardState } from "$lib/stores/clipboard";

    let toastStatus = $state(false);
    let toastClearTimeout: ReturnType<typeof setTimeout>;
    clipboardState.subscribe((value) => {
        clearTimeout(toastClearTimeout);
        toastStatus = value !== "";

        toastClearTimeout = setTimeout(() => toastStatus = false, 3000);
    });

    let { children }: { children: Snippet } = $props();

    let activeTabName = $state($page.url.pathname.replace(/^\//, '')|| "items");

    function setTab(tabName: string) {
        activeTabName = tabName;
        goto(`${tabName}`);
    }
</script>

<header class="flex-none w-full mx-auto bg-white dark:bg-slate-950">
    <Navbar>
        <NavBrand>
         <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white pl-4">
             How Bazaar
         </span>
        </NavBrand>
 
        <div class="flex items-center ml-auto">
            <DarkMode class="inline-block dark:hover:text-white hover:text-gray-900" />
        </div>
     </Navbar>
</header>

<div class={'relative min-h-screen flex flex-col'}>
    <div class="flex-grow overflow-y-auto p-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <Tabs tabStyle="underline">
            <TabItem title="Items" open={activeTabName === "items"} on:click={() => setTab("items")}>
                {@render children()}
            </TabItem>

            <TabItem title="Skills" open={activeTabName === "skills"} on:click={() => setTab("skills")}>
                {@render children()}
            </TabItem>

            <TabItem title="Monsters" open={activeTabName === "monsters"} on:click={() => setTab("monsters")}>
                {@render children()}
            </TabItem>

            <TabItem title="Contact & Upcoming Features" open={activeTabName === "contact"} on:click={() => setTab("contact")}>
                {@render children()}
            </TabItem>
        </Tabs>
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