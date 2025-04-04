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

// Add game effect colors
const gameEffects = {
  haste: 'rgb(0,236,195)',
  charge: 'rgb(0,236,195)',
  physical: 'rgb(245,80,61)',
  slow: 'rgb(203,159,110)',
  heal: 'rgb(142,234,49)',
  poison: 'rgb(14,190,79)',
  ammo: 'rgb(255,142,0)',
  freeze: 'rgb(63,200,247)',
  shield: 'rgb(244,207,32)',
  lifesteal: 'rgb(157,74,111)',
  value: 'rgb(255,205,25)',
  burn: 'rgb(255,159,69)',
  tag: 'rgb(152,168,254)',
};

// Colors used for patch note diffs
const patchnotes = {
  removed: 'rgba(248,81,73,0.4)',
  added: 'rgba(46,160,67,0.4)',
};

const ogTiers = {
  bronze: '#CD7F32',
  silver: '#C0C0C0',
  gold: '#FFD700',
  diamond: '#B9F2FF',
  legendary: '#FFAA33',
};

const tiers = {
  bronze: {
    50: '#fcf7ee',
    100: '#f5e8d0',
    200: '#e9d09e',
    300: '#deb46b',
    400: '#d69c49',
    500: '#cd7f32',
    600: '#b5622a',
    700: '#974826',
    800: '#7c3924',
    900: '#663121',
    950: '#3a170e',
  },
  silver: {
    50: '#f7f7f7',
    100: '#f0f0f0',
    200: '#e3e3e3',
    300: '#d1d1d1',
    400: '#c0c0c0',
    500: '#aaaaaa',
    600: '#969696',
    700: '#818181',
    800: '#6a6a6a',
    900: '#585858',
    950: '#333333',
  },
  gold: {
    50: '#fdfde9',
    100: '#fcfac5',
    200: '#fbf18d',
    300: '#f8e24c',
    400: '#f4d021',
    500: '#e4b60e',
    600: '#c58e09',
    700: '#9d650b',
    800: '#825011',
    900: '#6e4215',
    950: '#402208',
  },
  diamond: {
    50: '#ecfcff',
    100: '#b9f2ff',
    200: '#a3ebfe',
    300: '#64dbfc',
    400: '#1ec1f2',
    500: '#02a3d8',
    600: '#0481b6',
    700: '#0b6893',
    800: '#135577',
    900: '#144765',
    950: '#072e45',
  },
  legendary: {
    50: '#fff8eb',
    100: '#ffecc6',
    200: '#ffd788',
    300: '#ffbc4a',
    400: '#ffaa33',
    500: '#f97e07',
    600: '#dd5902',
    700: '#b73b06',
    800: '#942c0c',
    900: '#7a250d',
    950: '#461102',
  },
};

// Dynamically generate class strings for Tailwind safelist
const safelist = [
  'sr-only',
  ...Object.entries(enchantments).flatMap(([e]) => [
    `text-enchantments-${e}`,
    `border-enchantments-${e}`,
    `bg-enchantments-${e}`,
    `dark:text-enchantments-${e}`,
    `dark:border-enchantments-${e}`,
    `dark:bg-enchantments-${e}`,
  ]),
  ...Object.entries(gameEffects).flatMap(([effect]) => [
    `text-gameEffects-${effect}`,
    `border-gameEffects-${effect}`,
    `bg-gameEffects-${effect}`,
    `dark:text-gameEffects-${effect}`,
    `dark:border-gameEffects-${effect}`,
    `dark:bg-gameEffects-${effect}`,
  ]),
  ...Object.entries(patchnotes).flatMap(([type]) => [
    `text-patchnotes-${type}`,
    `border-patchnotes-${type}`,
    `bg-patchnotes-${type}`,
    `dark:text-patchnotes-${type}`,
    `dark:border-patchnotes-${type}`,
    `dark:bg-patchnotes-${type}`,
  ]),
  ...Object.entries(tiers).flatMap(([tier, shades]) =>
    Object.keys(shades).flatMap((shade) => [
      `text-tiers-${tier}-${shade}`,
      `border-tiers-${tier}-${shade}`,
      `bg-tiers-${tier}-${shade}`,
      `dark:text-tiers-${tier}-${shade}`,
      `dark:border-tiers-${tier}-${shade}`,
      `dark:bg-tiers-${tier}-${shade}`,
    ])
  ),
];

export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/flowbite-svelte/dist/badge/Badge.svelte',
    './node_modules/flowbite-svelte/dist/button-group/ButtonGroup.svelte',
    './node_modules/flowbite-svelte/dist/buttons/Button.svelte',
    './node_modules/flowbite-svelte/dist/cards/Card.svelte',
    './node_modules/flowbite-svelte/dist/darkmode/DarkMode.svelte',
    './node_modules/flowbite-svelte/dist/dropdown/Dropdown.svelte',
    './node_modules/flowbite-svelte/dist/dropdown/DropdownItem.svelte',
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
        // Palette generated from Fiery
        red: {
          '50': '#fef3f2',
          '100': '#ffe5e1',
          '200': '#ffcfc8',
          '300': '#ffada2',
          '400': '#fd7d6c',
          '500': '#f5523c',
          '600': '#e23720',
          '700': '#bf2a16',
          '800': '#9d2717',
          '900': '#82261a',
          '950': '#470f08',
        },

        'green': {
          '50': '#effef4',
          '100': '#dafee6',
          '200': '#b7fbcf',
          '300': '#7ff6a9',
          '400': '#40e87c',
          '500': '#17d05a',
          '600': '#0ebe4e',
          '700': '#0e873a',
          '800': '#116a33',
          '900': '#10572c',
          '950': '#023116',
        },

        'neongreen': {
          '50': '#f4ffe6',
          '100': '#e6fdca',
          '200': '#cffb9b',
          '300': '#aef561',
          '400': '#8fea31',
          '500': '#6fd012',
          '600': '#54a60a',
          '700': '#407e0d',
          '800': '#356410',
          '900': '#2f5413',
          '950': '#152f04',
        },

        'orange': {
          '50': '#fff5ed',
          '100': '#ffe9d5',
          '200': '#ffcba4',
          '300': '#ffab72',
          '400': '#fd7d3a',
          '500': '#fc5a13',
          '600': '#ed3f09',
          '700': '#c42c0a',
          '800': '#9c2410',
          '900': '#7d2011',
          '950': '#440d06',
        },

        enchantments,
        gameEffects,
        patchnotes,
        tiers,
        bazaar: {
          background: '#150c0b',
          orange400: '#ea8e16',
          orange: '#ff9c1c',
          tan200: '#453e3d',
          tan300: '#7c6d5f',
          tan700: '#f0cead',
          tan500: '#e4b181',
          tan900: '#fbddb3',
          brown: '#443027',
          brown600: '#5a4024'
        },

        //     --tan-200: #453e3d;
        // --tan-250: #56442b;
        // --tan-300: #7c6d5f;
        // --tan-400: #b19268;
        // --tan-425: #d0a277;
        // --tan-450: #dcaa7d;
        // --tan-500: #e4b181;
        // --tan-550: #f8c598;
        // --tan-600: #e9d2b0;
        // --tan-700: #f0cead;
        // --tan-750: #f6dfb2;
        // --tan-800: #fbcf92;
        // --tan-850: #f3cdac;
        // --tan-900: #fbddb3;
        // --tan-925: #ffe0b2;
        // --tan-950: #fae4c8;


        // --brown-100: #140b04;
        // --brown-150: #140E11;
        // --brown-200: #150c0b;
        // --brown-225: #22130e;
        // --brown-250: #201615;
        // --brown-275: #251304;
        // --brown-300: #21191b;
        // --brown-315: #231b19;
        // --brown-325: #262126;
        // --brown-350: #2a2124;
        // --brown-375: #311f11;
        // --brown-380: #381B0A;
        // --brown-390: #312C31;
        // --brown-395: #373237;
        // --brown-400: #413631;
        // --brown-425: #3d2c1c;
        // --brown-450: #3d2d1f;
        // --brown-475: #443027;
        // --brown-500: #4d3928;
        // --brown-550: #522d11;
        // --brown-600: #5a4024;
        // --brown-650: #614738;
        // --brown-700: #694626;
        // --brown-750: #784642;
        // --brown-775: #a56838;
        // --brown-800: #b2703b;
        // --brown-850: #d78347;
        // --brown-900: #cb915a;
      },
    },
  },
  safelist,
  plugins: [flowbitePlugin],
};
