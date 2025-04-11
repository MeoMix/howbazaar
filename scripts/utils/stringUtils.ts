// Removes spaces, dashes, apostrophes, and periods from input string.
export function removeSpecialCharacters(input: string): string {
    return input.replace(/[\s\-'.&]+/g, '');
}