import { json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";
import type { MonsterEncounterDaysApiResponse } from "$lib/types";
import { getMonsterEncounterDays } from "$lib/services/monsterEncounterService";
import { getHash } from "$lib/utils/dataUtils";
import parsedItemCards from "$lib/db/parsedItemCards";
import parsedSkillCards from "$lib/db/parsedSkillCards";
import parsedCombatEncounterCards from "$lib/db/parsedCombatEncounterCards";
import parsedMonsters from "$lib/db/parsedMonsters";
import parsedDayHours from "$lib/db/parsedDayHours";

let serverVersion: string | undefined;

export const GET: RequestHandler = ({ url, request }) => {
    const monsterEncounterDays = getMonsterEncounterDays(parsedItemCards, parsedSkillCards, parsedCombatEncounterCards, parsedMonsters, parsedDayHours);
    serverVersion ??= getHash(monsterEncounterDays);

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

    const response: MonsterEncounterDaysApiResponse = {
        data: monsterEncounterDays.sort((a, b) => {
            if (a.day === "event" && b.day === "event") {
                return 0; // Both are "event", so they are equal
            }
            if (a.day === "event") {
                return 1; // "event" should come after any number
            }
            if (b.day === "event") {
                return -1; // "event" should come after any number
            }
            return a.day - b.day; // Both are numbers, so sort numerically
        }),
        version: serverVersion,
    };

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
