// Removes spaces, dashes, apostrophes, and periods from input string.
export function removeSpecialCharacters(input: string): string {
    return input.replace(/[\s\-'.&]+/g, '');
}

export function getSanitizedFileName(file: string) {
    const lastDotIndex = file.lastIndexOf('.');
    if (lastDotIndex === -1) return removeSpecialCharacters(file); // No extension

    const name = file.slice(0, lastDotIndex); // Filename without extension
    const extension = file.slice(lastDotIndex); // Extension including the period

    return removeSpecialCharacters(name) + extension; // Sanitize name and add extension back
}