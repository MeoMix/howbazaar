import { json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";
import type { ClientSideCard, ClientSideCardItem, ItemsApiResponse } from "$lib/types";
import parsedCards from "$lib/processedCards.json" assert { type: "json" };
import { getHash } from "$lib/utils/dataUtils";

let itemsHash: string | undefined;
function getVersionedItems(): { items: ClientSideCardItem[]; version: string; } {
    const items = (parsedCards as ClientSideCard[])
        .filter((card): card is ClientSideCardItem => card.type === "Item");

    if (itemsHash === undefined) {
        itemsHash = getHash(items);
    }

    return {
        items: items.sort((a, b) => a.name.localeCompare(b.name)),
        version: itemsHash,
    };
}

export const GET: RequestHandler = ({ url, request }) => {
    const { items, version: serverVersion } = getVersionedItems();

    // Check for requested version via query parameter
    const requestedVersion = url.searchParams.get("version");
    if (requestedVersion && requestedVersion !== serverVersion) {
        return new Response("Invalid version requested", { status: 400 });
    }

    // Check for ETag header and respond with 304 if it matches the server version
    const clientETag = request.headers.get("If-None-Match");
    if (clientETag === serverVersion) {
        return new Response(null, { status: 304 });
    }

    const response: ItemsApiResponse = { data: items, version: serverVersion };

    return json(response,
        {
            headers: {
                "Cache-Control": `public, max-age=${clientETag ? "3600" : "31536000"}`, // Cache briefly if relying on etag otherwise for a long time
                // TODO: This gets stripped off when serving through Vercel
                "ETag": serverVersion,
            },
        }
    );
};
