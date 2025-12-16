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
        background: '#09090b', // Zinc 950 (Gris oscuro fondo)
        surface: '#18181b',    // Zinc 900 (Gris superficie)
        border: '#27272a',     // Zinc 800 (Gris bordes)
        primary: '#10b981',    // Emerald 500 (Verde Eco/Acción)
        secondary: '#D4AF37',  // Gold (Dorado Premium/Valor)
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