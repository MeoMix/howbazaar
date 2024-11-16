/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        // flowbite-svelte
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
          900: '#A5371B'
        },
        tiers: {
          bronze: '#CD7F32',
          silver: '#C0C0C0',
          gold: '#FFD700',
          diamond: '#B9F2FF',
          legendary: '#FFAA33',
        },
        enchantments: {
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
        }
      }
    }
  },
  plugins: [flowbitePlugin],
}

