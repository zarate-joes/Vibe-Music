/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'music-red': '#fc6568',
        'music-blue': '#2e4758',
        'music-grey': '#e6ebf7',
        'music-black': '#181324',
      },
    },
  },
  plugins: [],
}