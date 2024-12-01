/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'outline-emerald': '0 0 0 2px rgba(16, 185, 129, 0.2)',
      },
    },
  },
  plugins: [],
} 