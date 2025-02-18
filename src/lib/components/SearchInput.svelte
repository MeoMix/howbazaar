<script lang="ts">
    import { Badge } from "flowbite-svelte";
    import { CloseCircleSolid } from "flowbite-svelte-icons";
    import { onMount } from "svelte";

    let {
        placeholder,
        value = $bindable(),
        onClear,
    }: {
        placeholder: string;
        value: string;
        onClear: () => void;
    } = $props();

    let inputElement: HTMLInputElement | null = null;

    function focusInput() {
        inputElement?.focus();
    }

    function handleShortcut(event: KeyboardEvent) {
        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {
            event.preventDefault();
            focusInput();
        }
    }

    onMount(() => {
        window.addEventListener("keydown", handleShortcut);

        return () => {
            window.removeEventListener("keydown", handleShortcut);
        };
    });
</script>

<div class="relative flex-1">
    <!-- svelte-ignore a11y_autofocus -->
    <input
        bind:this={inputElement}
        autofocus
        type="text"
        {placeholder}
        bind:value
        class="block disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right p-2.5 bg-gray-50 text-gray-900 dark:text-white border border-gray-300 text-sm rounded-lg w-full pr-12 focus:border-bazaar-orange focus:ring-bazaar-orange dark:focus:border-bazaar-orange dark:focus:ring-bazaar-orange dark:bg-bazaar-brown dark:placeholder-bazaar-tan700 dark:border-bazaar-brown600"
    />
    <div class="absolute inset-y-0 right-2 flex items-center justify-center">
        {#if value === ""}
          <Badge
            rounded
            border
            class="bg-white dark:bg-bazaar-background text-gray-500 dark:text-bazaar-tan700 dark:border-bazaar-brown600"
            >ctrl + k</Badge
          >
        {:else}
          <button
            onclick={onClear}
            type="button"
            class="flex items-center justify-center w-10 h-full text-gray-500 dark:text-bazaar-tan700 hover:text-gray-900 dark:hover:text-bazaar-orange"
          >
            <CloseCircleSolid class="h-4 w-4" />
          </button>
        {/if}
      </div>
</div>
