<script lang="ts">
  import { Badge } from "flowbite-svelte";
  import { CloseCircleSolid, InfoCircleSolid } from "flowbite-svelte-icons";
  import { onMount } from "svelte";
  import type { Snippet } from "svelte";

  let {
    placeholder,
    value = $bindable(),
    onClear,
    actions,
  }: {
    placeholder: string;
    value: string;
    onClear: () => void;
    actions?: Snippet;
  } = $props();

  let inputElement: HTMLInputElement | null = null;

  function handleShortcut(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();

      if (inputElement) {
        inputElement.focus();
        inputElement.select();
      }
    }
  }

  onMount(() => {
    window.addEventListener("keydown", handleShortcut);

    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };
  });
</script>

<div class="flex flex-col gap-2 w-full">
  <div class="flex items-center gap-2">
    <div class="relative flex-1">
      <div
        class="flex items-center focus-within:ring-2 focus-within:ring-bazaar-orange focus-within:rounded-lg"
      >
        <!-- svelte-ignore a11y_autofocus -->
        <!-- 16px font size is important to prevent mobile safari from zooming in on the input -->
        <input
          bind:this={inputElement}
          autofocus
          autocorrect="off"
          spellcheck="false"
          type="text"
          {placeholder}
          bind:value
          class="text-[16px] block disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right p-2.5 bg-gray-50 text-gray-900 dark:text-bazaar-tan700 border border-gray-300 text-sm rounded-lg w-full pr-2 md:pr-12 focus:border-gray-300 dark:focus:border-bazaar-brown600 focus:ring-0 dark:bg-bazaar-brown dark:placeholder-bazaar-tan700 dark:border-bazaar-brown600"
        />
        <div
          class="absolute inset-y-0 right-2 flex items-center justify-center"
        >
          {#if value === ""}
            <Badge
              rounded
              border
              class="hidden md:flex bg-white dark:bg-bazaar-background text-gray-500 dark:text-bazaar-tan700 dark:border-bazaar-brown600"
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
    </div>

    {#if actions}
      <div class="shrink-0 flex items-center">
        {@render actions()}
      </div>
    {/if}
  </div>

  <div
    class="flex items-center mt-1 text-xs text-gray-500 dark:text-bazaar-tan700"
  >
    <InfoCircleSolid class="h-3 w-3 mr-1" />
    <span>Use | to search for multiple terms (e.g. "port | barrel")</span>
  </div>
</div>
