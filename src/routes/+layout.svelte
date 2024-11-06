<script lang="ts">
    import "../app.css";
    import { dev } from "$app/environment";
    import { inject } from "@vercel/analytics";
    inject({ mode: dev ? "development" : "production" });

    import { Tabs, TabItem, Toast } from "flowbite-svelte";
    import { CheckCircleSolid } from "flowbite-svelte-icons";
    import { onMount } from "svelte";
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

    onMount(() => {
        const hash = window.location.hash.slice(1);
        if (hash) {

            document
                .getElementById(hash)
                ?.scrollIntoView({ behavior: "smooth" });
        }
    });

    let activeTabName = $state($page.url.pathname.replace(/^\//, '')|| "items");

    function setTab(tabName: string) {
        activeTabName = tabName;
        goto(`${tabName}`);
    }
</script>

<div class="relative min-h-screen flex flex-col">
    <div class="text-center mb-6">
        <h1 class="text-3xl font-bold">Welcome to How Bazaar!</h1>
    </div>

    <div class="flex-grow overflow-y-auto p-4">
        <Tabs>
            <TabItem title="Items" open={activeTabName === "items"} on:click={() => setTab("items")}>  
                {@render children()}
            </TabItem>

            <TabItem title="Skills" open={activeTabName === "skills"} on:click={() => setTab("skills")}>
                {@render children()}
            </TabItem>
        </Tabs>
    </div>

    <div class="fixed bottom-0 left-0 w-full flex justify-center p-4">
        <Toast
            position="bottom-left"
            color="green"
            transition={fly}
            params={{ y: 100, duration: 300 }}
            bind:toastStatus
        >
            <svelte:fragment slot="icon">
                <CheckCircleSolid class="w-5 h-5" />
                <span class="sr-only">Check icon</span>
            </svelte:fragment>
            Link copied to clipboard
        </Toast>
    </div>
</div>