<script>
    import { Badge } from "flowbite-svelte";
    import { AVAILABLE_VERSIONS } from "$lib/constants";
</script>

<Badge border large color="green" class="ml-2 whitespace-nowrap">
    Live Version - {AVAILABLE_VERSIONS[0].label}
</Badge>
