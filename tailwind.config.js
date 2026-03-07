/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        dark: {
          50: '#f7f7f8',
          100: '#ececf1',
          200: '#d9d9e3',
          300: '#c5c5d2',
          400: '#acacbe',
          500: '#8e8ea0',
          600: '#6e6e80',
          700: '#4a4a5a',
          800: '#343541',
          900: '#202123',
          950: '#0d0d0f',
        },
        accent: {
          DEFAULT: '#6366f1',
          light: '#818cf8',
          dark: '#4f46e5',
        },
      },
    },
  },
  plugins: [],
}
