/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        saira: ['"Saira Extra Condensed"'],
        sono: ['Sono'],
      },
      colors: {
        myYellow: '#b1b70d',
      },
      screens: {
        small: '320px',
      },
    },
  },
  plugins: [],
};
