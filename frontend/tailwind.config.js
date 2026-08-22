/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#fdfbf7',
          100: '#f7f2e6',
          200: '#eddcb5',
          300: '#e1c699',
          400: '#d0aa78',
          500: '#bc8f59',
          600: '#a37248',
          700: '#84573b',
          800: '#6d4634',
          900: '#5a3b2e',
        },
        ink: {
          DEFAULT: '#241e17',
          muted: '#685e52',
          light: '#8c7e6e',
          faint: '#d0c6b6',
        },
        brass: {
          DEFAULT: '#b8860b',
          amber: '#8b3a0f',
          light: '#d4af37',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
