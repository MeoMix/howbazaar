<script lang="ts">
    import Divider from "$lib/components/Divider.svelte";

    // TODO: Don't hardcode this client-side
    const dayTiersMap = {
        "1": {
            Bronze: 1.0,
            Silver: 0.0,
            Gold: 0.0,
            Diamond: 0.0,
        },
        "2": {
            Bronze: 0.9,
            Silver: 0.1,
            Gold: 0.0,
            Diamond: 0.0,
        },
        "3": {
            Bronze: 0.8,
            Silver: 0.2,
            Gold: 0.0,
            Diamond: 0.0,
        },
        "4": {
            Bronze: 0.7,
            Silver: 0.3,
            Gold: 0.0,
            Diamond: 0.0,
        },
        "5": {
            Bronze: 0.55,
            Silver: 0.4,
            Gold: 0.05,
            Diamond: 0.0,
        },
        "6": {
            Bronze: 0.4,
            Silver: 0.5,
            Gold: 0.1,
            Diamond: 0.0,
        },
        "7": {
            Bronze: 0.3,
            Silver: 0.5,
            Gold: 0.2,
            Diamond: 0.0,
        },
        "8": {
            Bronze: 0.25,
            Silver: 0.45,
            Gold: 0.3,
            Diamond: 0.0,
        },
        "9": {
            Bronze: 0.1,
            Silver: 0.4,
            Gold: 0.4,
            Diamond: 0.1,
        },
        "10": {
            Bronze: 0.0,
            Silver: 0.3,
            Gold: 0.5,
            Diamond: 0.2,
        },
        "11": {
            Bronze: 0.0,
            Silver: 0.3,
            Gold: 0.5,
            Diamond: 0.2,
        },
        "12": {
            Bronze: 0.0,
            Silver: 0.3,
            Gold: 0.5,
            Diamond: 0.2,
        },
        "13": {
            Bronze: 0.0,
            Silver: 0.3,
            Gold: 0.5,
            Diamond: 0.2,
        },
        "14": {
            Bronze: 0.0,
            Silver: 0.3,
            Gold: 0.5,
            Diamond: 0.2,
        },
        "15": {
            Bronze: 0.0,
            Silver: 0.3,
            Gold: 0.5,
            Diamond: 0.2,
        },
        "16": {
            Bronze: 0.0,
            Silver: 0.3,
            Gold: 0.5,
            Diamond: 0.2,
        },
        "17": {
            Bronze: 0.0,
            Silver: 0.3,
            Gold: 0.5,
            Diamond: 0.2,
        },
        "18": {
            Bronze: 0.0,
            Silver: 0.3,
            Gold: 0.5,
            Diamond: 0.2,
        },
        "19": {
            Bronze: 0.0,
            Silver: 0.3,
            Gold: 0.5,
            Diamond: 0.2,
        },
        "20": {
            Bronze: 0.0,
            Silver: 0.3,
            Gold: 0.5,
            Diamond: 0.2,
        },
    };

    const formatPercentage = (value: number): string =>
        value === 0 ? "-" : `${Math.round(value * 100)}%`;
</script>

<div
    class="mx-auto w-full max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg"
>
    <div class="text-lg my-4">
        <div>
            I'll add some actual shop information to this page soon™, but
            people have been frequently asking for the drop %s.
        </div>

        <div>
            This table describes, for a given day, what the likelihood is of
            seeing a given tier of item in a typical shop.
        </div>
    </div>

    <div class="overflow-x-auto">
        <table
            class="table-auto border-collapse border border-gray-300 w-full dark:border-bazaar-tan200"
        >
            <thead class="bg-gray-100 dark:bg-bazaar-brown">
                <tr>
                    <th
                        class="border border-gray-300 dark:border-bazaar-tan200 px-4 py-2 text-left text-gray-900 dark:text-bazaar-tan700"
                        >Day</th
                    >
                    <th
                        class="border border-gray-300 dark:border-bazaar-tan200 px-4 py-2 text-left text-gray-900 dark:text-bazaar-tan700"
                        >Bronze</th
                    >
                    <th
                        class="border border-gray-300 dark:border-bazaar-tan200 px-4 py-2 text-left text-gray-900 dark:text-bazaar-tan700"
                        >Silver</th
                    >
                    <th
                        class="border border-gray-300 dark:border-bazaar-tan200 px-4 py-2 text-left text-gray-900 dark:text-bazaar-tan700"
                        >Gold</th
                    >
                    <th
                        class="border border-gray-300 dark:border-bazaar-tan200 px-4 py-2 text-left text-gray-900 dark:text-bazaar-tan700"
                        >Diamond</th
                    >
                </tr>
            </thead>
            <tbody>
                {#each Object.entries(dayTiersMap) as [day, tiers]}
                    <tr
                        class="odd:bg-white even:bg-gray-50 dark:odd:bg-bazaar-brown600 dark:even:bg-bazaar-brown"
                    >
                        <td
                            class="border border-gray-300 dark:border-bazaar-tan200 px-4 py-2 text-gray-900 dark:text-bazaar-tan700"
                            >{day}</td
                        >
                        <td
                            class="border border-gray-300 dark:border-bazaar-tan200 px-4 py-2 text-gray-900 dark:text-bazaar-tan700"
                            >{formatPercentage(tiers.Bronze)}</td
                        >
                        <td
                            class="border border-gray-300 dark:border-bazaar-tan200 px-4 py-2 text-gray-900 dark:text-bazaar-tan700"
                            >{formatPercentage(tiers.Silver)}</td
                        >
                        <td
                            class="border border-gray-300 dark:border-bazaar-tan200 px-4 py-2 text-gray-900 dark:text-bazaar-tan700"
                            >{formatPercentage(tiers.Gold)}</td
                        >
                        <td
                            class="border border-gray-300 dark:border-bazaar-tan200 px-4 py-2 text-gray-900 dark:text-bazaar-tan700"
                            >{formatPercentage(tiers.Diamond)}</td
                        >
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
