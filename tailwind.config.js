/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin';

const enchantments = {
  heavy: '#4B4B4B',       // Dark gray for Heavy
  icy: '#A0EFFF',         // Light icy blue for Icy
  turbo: '#FF5733',       // Vibrant orange-red for Turbo
  shielded: '#3A9AD9',    // Strong blue for Shielded
  restorative: '#7FBF7F', // Calming green for Restorative
  toxic: '#98FB98',       // Poisonous green for Toxic
  fiery: '#FF4500',       // Intense orange-red for Fiery
  shiny: '#FFD700',       // Gold for Shiny
  deadly: '#8B0000',      // Dark red for Deadly
  radiant: '#FFE48A',     // Soft yellow with a glow for Radiant
  obsidian: '#4A4A4A',    // Near-black for Obsidian
  golden: '#FFD700',      // Vibrant gold for Golden
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
      },
    },
  },
  safelist,
  plugins: [flowbitePlugin],
};