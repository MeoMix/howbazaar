import { json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";
import { getHash } from "$lib/utils/dataUtils";
import type { ClientSideCard, ClientSideCardSkill, SkillsApiResponse } from "$lib/types";
import parsedCards from "$lib/processedCards.json" assert { type: "json" };

let skillsHash: string | undefined;

function getVersionedSkills(): { skills: ClientSideCardSkill[]; version: string; } {
    const skills = (parsedCards as ClientSideCard[])
        .filter((card): card is ClientSideCardSkill => card.type === "Skill");

    if (skillsHash === undefined) {
        skillsHash = getHash(skills);
    }

    return {
        skills: skills.sort((a, b) => a.name.localeCompare(b.name)),
        version: skillsHash,
    };
}

export const GET: RequestHandler = ({ url, request }) => {
    const { skills, version: serverVersion } = getVersionedSkills();

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

    const response: SkillsApiResponse = { data: skills, version: serverVersion };

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