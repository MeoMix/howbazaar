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

    // Map of label names to their corresponding icon components
    const iconMap: Record<string, any> = {
        // Ammo related
        Ammo: AmmoIcon,
        AmmoReference: AmmoIcon,

        // Burn related
        Burn: BurnIcon,
        BurnReference: BurnIcon,

        // Charge related
        Charge: ChargeIcon,

        // Crit related
        Crit: CritIcon,
        CritReference: CritIcon,

        // Damage related
        Damage: DamageIcon,
        DamageReference: DamageIcon,

        // Economy related
        EconomyReference: ValueIcon,
        Gold: ValueIcon,
        Value: ValueIcon,

        // Freeze related
        Freeze: FreezeIcon,
        FreezeReference: FreezeIcon,

        // Haste related
        Haste: HasteIcon,
        HasteReference: HasteIcon,

        // Heal related
        Heal: HealIcon,
        HealReference: HealIcon,

        // Health related
        Health: HealthIcon,
        HealthReference: HealthIcon,

        // Poison related
        Poison: PoisonIcon,
        PoisonReference: PoisonIcon,

        // Shield related
        Shield: ShieldIcon,
        ShieldReference: ShieldIcon,

        // Slow related
        Slow: SlowIcon,
        SlowReference: SlowIcon,
    };

    const {
        label,
        size = "default",
    }: {
        label: string;
        size?: "small" | "default" | "large";
    } = $props();

    // Get the icon component for the label
    const IconComponent = $derived(iconMap[label] || null);
</script>

<div class="flex items-center gap-1">
    {#if IconComponent}
        <IconComponent {size} />
    {/if}
    <span>{label}</span>
</div>
