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
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'scale-in': {
          '0%': {
            opacity: '0',
            transform: 'translate(-50%, -50%) scale(0.5)'
          },
          '100%': {
            opacity: '0.1',
            transform: 'translate(-50%, -50%) scale(1)'
          }
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-in-delay': 'fade-in 0.5s ease-out 0.2s forwards',
        'fade-in-delay-2': 'fade-in 0.5s ease-out 0.4s forwards',
        'scale-in': 'scale-in 0.5s ease-out'
      }
    },
  },
  plugins: [],
} 