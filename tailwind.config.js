/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#262626', // Neutral 800 (Gris sólido amigable)
        surface: '#404040',    // Neutral 700 (Superficie gris más clara)
        border: '#525252',     // Neutral 600 (Bordes suaves)
        primary: '#10b981',    // Emerald 500
        secondary: '#D4AF37',  // Gold
        gold: {
          400: '#FACC15',
          500: '#EAB308',
          600: '#CA8A04',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}