<script lang="ts">
    import {
        AmmoIcon,
        BurnIcon,
        ChargeIcon,
        CritIcon,
        DamageIcon,
        FreezeIcon,
        HasteIcon,
        HealIcon,
        HealthIcon,
        PoisonIcon,
        ShieldIcon,
        SlowIcon,
        ValueIcon,
    } from "./Icon";

    const {
        label,
    }: {
        label: string;
    } = $props();
</script>

<div class="flex items-center gap-1">
    {#if label === "Ammo" || label === "AmmoReference"}
        <AmmoIcon />
    {:else if label === "Burn" || label === "BurnReference"}
        <BurnIcon />
    {:else if label === "Charge"}
        <ChargeIcon />
    {:else if label === "Crit" || label === "CritReference"}
        <CritIcon />
    {:else if label === "Damage" || label === "DamageReference"}
        <DamageIcon />
    {:else if label === "EconomyReference" || label === "Gold" || label === "Value"}
        <ValueIcon />
    {:else if label === "Freeze" || label === "FreezeReference"}
        <FreezeIcon />
    {:else if label === "Haste" || label === "HasteReference"}
        <HasteIcon />
    {:else if label === "Heal" || label === "HealReference"}
        <HealIcon />
    {:else if label === "Health" || label === "HealthReference"}
        <HealthIcon />
    {:else if label === "Poison" || label === "PoisonReference"}
        <PoisonIcon />
    {:else if label === "Shield" || label === "ShieldReference"}
        <ShieldIcon />
    {:else if label === "Slow" || label === "SlowReference"}
        <SlowIcon />
    {/if}
    <span>{label}</span>
</div>
