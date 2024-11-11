import type { ClientSideEnchantmentType, ClientSideTierType } from "$lib/types";

export function getEnchantmentClass(enchantmentName: ClientSideEnchantmentType) {
    const enchantmentClasses = {
        Heavy: 'text-enchantments-heavy',
        Icy: 'text-enchantments-icy',
        Turbo: 'text-enchantments-turbo',
        Shielded: 'text-enchantments-shielded',
        Restorative: 'text-enchantments-restorative',
        Toxic: 'text-enchantments-toxic',
        Fiery: 'text-enchantments-fiery',
        Shiny: 'text-enchantments-shiny',
        Deadly: 'text-enchantments-deadly',
        Radiant: 'text-enchantments-radiant',
        Obsidian: 'text-enchantments-obsidian',
        Golden: 'text-enchantments-golden',
    };

    return enchantmentClasses[enchantmentName];
}

export function getTierClass(tierType: ClientSideTierType) {
    const tierClasses = {
        Bronze: 'text-tiers-bronze',
        Silver: 'text-tiers-silver',
        Gold: 'text-tiers-gold',
        Diamond: 'text-tiers-diamond',
        Legendary: 'text-tiers-legendary',
    };

    return tierClasses[tierType];
}