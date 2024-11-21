export async function fetchJson<T>(
    url: string,
    version: string,
): Promise<{ data: T; version: string }> {
    const urlObj = new URL(url, window.location.origin);

    urlObj.searchParams.append('version', version);

    const response = await fetch(urlObj.toString());

    if (response.status === 400) {
        throw new Error("HTTP error! status: 400 but should have requested valid data.");
    }

    // Handle 304 Not Modified
    if (response.status === 304) {
        throw new Error("HTTP error! status: 304 but no cached data available.");
    }

    // Handle other errors
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse and return data with new version
    const data = await response.json();
    const newEtag = response.headers.get("ETag");

    if (newEtag === null) {
        throw new Error(`Data returned without version header`);
    }

    return { data, version: newEtag };
}