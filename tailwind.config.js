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
        background: '#f9fafb', // Gray 50 (Fondo claro)
        surface: '#ffffff',    // White (Tarjetas blancas)
        border: '#e5e7eb',     // Gray 200 (Bordes sutiles)
        primary: '#10b981',    // Emerald 500
        secondary: '#d97706',  // Amber 600 (Ajustado para mejor contraste en blanco)
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