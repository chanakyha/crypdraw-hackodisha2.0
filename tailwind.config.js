/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#091B18",
        secondary: "#0A1F1C",
        "btn-primary": "#036756",
        "box-color": "#091F1C",
        "bor-primary": "#004337",
      },
    },
  },
  plugins: [],
};
