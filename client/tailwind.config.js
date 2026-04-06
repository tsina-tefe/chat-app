/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  theme: {
    extend: {
      colors: {
        darkBg: "#13111C",
        darkCard: "#1E1B29",
      },
    },
  },
  plugins: [],
};
