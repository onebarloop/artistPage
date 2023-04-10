/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sono: ['Sono'],
        inconsolata: ['Inconsolata'],
      },
      colors: {
        myYellow: '#b1b70d',
      },
      screens: {
        small: '320px',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
};
