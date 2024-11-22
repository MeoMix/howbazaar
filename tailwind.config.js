/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin';

// Regular Color; F6D9AB
const enchantments = {
  heavy: '#CCA06E',       // Bazaar's Slow
  icy: '#3EC8F8',         // Bazaar's Freeze
  turbo: '#00EAC2',       // Bazaar's Haste
  shielded: '#F4D021',    // Bazaar's Shield
  restorative: '#8FEA31', // Bazaar's Heal
  toxic: '#0EBE4E',       // Bazaar's Poison
  fiery: '#FA943E',       // Bazaar's Burn Orange
  shiny: '#F6D9AB',       // Bazaar's Regular
  deadly: '#F5523C',      // Bazaar's Crit
  radiant: '#F6D9AB',     // Bazaar's Regular
  obsidian: '#F6D9AB',    // Bazaar's Regular
  golden: '#F4D021',      // Bazaar's Value
};

const tiers = {
  bronze: '#CD7F32',
  silver: '#C0C0C0',
  gold: '#FFD700',
  diamond: '#B9F2FF',
  legendary: '#FFAA33',
};

// Dynamically generate class strings for Tailwind safelist
const safelist = [
  ...Object.keys(enchantments).map(e => `text-enchantments-${e}`),
  ...Object.keys(enchantments).map(e => `border-enchantments-${e}`),
  ...Object.keys(tiers).map(t => `text-tiers-${t}`),
  ...Object.keys(tiers).map(t => `border-tiers-${t}`),
];

export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/flowbite-svelte/dist/badge/Badge.svelte',
    './node_modules/flowbite-svelte/dist/button-group/ButtonGroup.svelte',
    './node_modules/flowbite-svelte/dist/buttons/Button.svelte',
    './node_modules/flowbite-svelte/dist/cards/Card.svelte',
    './node_modules/flowbite-svelte/dist/darkmode/DarkMode.svelte',
    './node_modules/flowbite-svelte/dist/footer/Footer.svelte',
    './node_modules/flowbite-svelte/dist/footer/FooterLink.svelte',
    './node_modules/flowbite-svelte/dist/footer/FooterLinkGroup.svelte',
    './node_modules/flowbite-svelte/dist/forms/Label.svelte',
    './node_modules/flowbite-svelte/dist/forms/Input.svelte',
    './node_modules/flowbite-svelte/dist/forms/Toggle.svelte',
    './node_modules/flowbite-svelte/dist/forms/InputAddon.svelte',
    './node_modules/flowbite-svelte/dist/toast/Toast.svelte',
    './node_modules/flowbite-svelte/dist/navbar/*.svelte',
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF5F2',
          100: '#FFF1EE',
          200: '#FFE4DE',
          300: '#FFD5CC',
          400: '#FFBCAD',
          500: '#FE795D',
          600: '#EF562F',
          700: '#EB4F27',
          800: '#CC4522',
          900: '#A5371B',
        },
        enchantments,
        tiers,
        bazaar: {
          background: '#150c0b',
          orange: '#ff9c1c',
          tan: '#f0cead'
        }
      },
    },
  },
  safelist,
  plugins: [flowbitePlugin],
};