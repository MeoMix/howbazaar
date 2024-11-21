import { getVersionedSkills } from "$lib/utils/dataUtils";
import { getCardFilterOptions } from "$lib/utils/filterUtils";

export async function load() {
    // Don't send skills as part of `load` to save on bandwidth. Just send the version so client can conditionally hit API.
    const { skills, version } = getVersionedSkills();
    const { heroOptions, tagOptions, minimumTierOptions } = getCardFilterOptions(skills)

    return {
        heroOptions,
        tagOptions,
        minimumTierOptions,
        version,
    };
}