/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Example content paths...
    "./public/**/*.html",
    "./src/**/*.{js,jsx,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        palanquin: ["Palanquin", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        alef: ["Alef", "sans-serif"],
        alumni: ["Alumni Sans Pinstripe", "sans-serif"],
        antic: ["Antic Slab", "sans-serif"],
        arima: ["Arima", "sans-serif"],
        athiti: ["Athiti", "sans-serif"],
        advent: ["Advent Pro", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui"), require('tailwind-scrollbar')({ nocompatible: true })],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "valentine",
      "halloween",
      "nord",
      "retro",
      "pastel",
    ],
  },
};
