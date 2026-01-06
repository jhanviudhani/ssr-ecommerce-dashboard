/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f97316", // orange
        sidebar: "#020617", // dark blue/black
      },
    },
  },
  plugins: [],
};
