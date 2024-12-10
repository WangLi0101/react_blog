/** @type {import('tailwindcss').Config} */
const typography = require('@tailwindcss/typography')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  corePlugins: {
    preflight: true, // 禁用 preflight 重置
  },
  theme: {
    extend: {
      colors: {
        primary: "#4B6BFB",
        'theme': {
          'bg': 'var(--bg)',
          'primary': 'var(--bg-primary)',
          'secondary': 'var(--bg-secondary)',
          'text': {
            'primary': 'var(--text-primary)',
            'secondary': 'var(--text-secondary)',
          }
        }
      },
      backgroundColor: {
        'theme': {
          'bg': 'var(--bg)',
          'primary': 'var(--bg-primary)',
          'secondary': 'var(--bg-secondary)',
        }
      },
      textColor: {
        'theme': {
          'primary': 'var(--text-primary)',
          'secondary': 'var(--text-secondary)',
        }
      },
      boxShadow: {
        "outline-emerald": "0 0 0 2px rgba(16, 185, 129, 0.2)",
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
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'var(--text-primary)',
            a: {
              color: 'var(--text-primary)',
              '&:hover': {
                color: '#4B6BFB',
              },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: 'var(--text-primary)',
            },
            blockquote: {
              color: 'var(--text-secondary)',
              borderLeftColor: '#4B6BFB',
            },
            code: {
              color: 'var(--text-primary)',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
            },
          },
        },
      },
    },
  },
  plugins: [
    typography,
  ],
} 