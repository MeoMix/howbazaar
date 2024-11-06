import { writable } from 'svelte/store';

export const clipboardState = writable("");

export async function copyCardLink(cardId: string) {
    const url = `${window.location.origin}${window.location.pathname}#${cardId}`;
    await navigator.clipboard.writeText(url);

    clipboardState.set(url);
}