import { json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";
import { getHash } from "$lib/utils/dataUtils";
import type { SkillsApiResponse } from "$lib/types";
import { getSkills } from "$lib/services/skillService";
import parsedItemCards from "$lib/db/parsedItemCards";
import parsedSkillCards from "$lib/db/parsedSkillCards";
import parsedCombatEncounterCards from "$lib/db/parsedCombatEncounterCards";
import parsedMonsters from "$lib/db/parsedMonsters";
import parsedDayHours from "$lib/db/parsedDayHours";

let serverVersion: string | undefined;

export const GET: RequestHandler = ({ url, request }) => {
    const skills = getSkills(parsedSkillCards, parsedItemCards, parsedCombatEncounterCards, parsedMonsters, parsedDayHours);
    serverVersion ??= getHash(skills);

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

    // TODO: Should I move sorting to before hashing since client doesn't resort?
    const response: SkillsApiResponse = { data: skills.sort((a, b) => a.name.localeCompare(b.name)), version: serverVersion };

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