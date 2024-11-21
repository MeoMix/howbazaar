import { json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";
import { getVersionedItems } from "$lib/utils/dataUtils";

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

    return json(items,
        {
            headers: {
                "Cache-Control": `public, max-age=${clientETag ? "3600" : "31536000"}`, // Cache briefly if relying on etag otherwise for a long time
                "ETag": serverVersion,
            },
        }
    );
};
