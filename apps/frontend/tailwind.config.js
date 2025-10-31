/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0D0D0D",      //fondo ppal oscuro
        purpleNeon: "#A020F0",
        fucsiaNeon: "#FF00FF",
        accent: "#D946EF",         //tono intermedio-fucsia-violeta
      },
      backgroundImage: {
        "gradient-neon": "linear-gradient(90deg, #A020F0, #FF00FF, #D946EF)",
      },
      boxShadow: {
        neon: "0 0 4px #A020F0, 0 0 8px #FF00FF"
      },
      fontFamiliy: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
    },
  },
  plugins: [],
}

