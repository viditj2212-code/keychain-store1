/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
        display: ['var(--font-quera)', 'var(--font-inter)', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
        logo: ['var(--font-ragika)', 'var(--font-quera)', 'var(--font-inter)', 'sans-serif'],
        // Legacy support - map old names to new fonts
        space: ['var(--font-quera)', 'var(--font-inter)', 'sans-serif'],
        outfit: ['var(--font-inter)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        poppins: ['var(--font-inter)', 'sans-serif'],
        slab: ['var(--font-quera)', 'var(--font-inter)', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#fdf4f8',
          100: '#fce9f2',
          200: '#fad3e5',
          300: '#f7b0d0',
          400: '#f282b1',
          500: '#E37EAF',
          600: '#d84b8c',
          700: '#c2356f',
          800: '#a02b5b',
          900: '#85284e',
        },
        dark: {
          DEFAULT: '#060304',
          50: '#f5f5f4',
          100: '#e7e6e5',
          200: '#d1cfcc',
          300: '#b3afaa',
          400: '#918c85',
          500: '#78726b',
          600: '#635e59',
          700: '#524d49',
          800: '#46423e',
          900: '#3d3937',
          950: '#060304',
        },
      },
    },
  },
  plugins: [],
}