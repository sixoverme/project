/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sage-green': {
          DEFAULT: '#526D4E',
          dark: '#455B41',
          light: '#6B8A67',
          50: '#F2F5F2',
          100: '#E5EBE4',
          200: '#C2D1C0',
          300: '#9FB79C',
          400: '#7C9D78',
          500: '#526D4E',
          600: '#455B41',
          700: '#384834',
          800: '#2B3627',
          900: '#1E241A'
        }
      }
    },
  },
  plugins: [],
}