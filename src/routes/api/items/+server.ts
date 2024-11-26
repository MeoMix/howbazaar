import { json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";
import type { ClientSideCardItem, ItemsApiResponse } from "$lib/types";
import { getHash } from "$lib/utils/dataUtils";
import { getItems } from "$lib/services/itemService";
import parsedItemCards from "$lib/processedItemCards.json" assert { type: "json" };

let serverVersion: string | undefined;

export const GET: RequestHandler = ({ url, request }) => {
    const items = getItems(parsedItemCards as ClientSideCardItem[]);
    serverVersion ??= getHash(items);

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

    const response: ItemsApiResponse = { data: items.sort((a, b) => a.name.localeCompare(b.name)), version: serverVersion };

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
