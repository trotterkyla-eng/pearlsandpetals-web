import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream:  '#fdf6f0',
        blush:  '#f2ddd5',
        rose:   '#d4a0a0',
        dusty:  '#c8a5a5',
        gold:   '#b8965a',
        'gold-light': '#d4b07a',
        bark:   '#6b4c3b',
        petal:  '#f9ece8',
      },
      fontFamily: {
        cinzel:   ['Cinzel', 'serif'],
        garamond: ['Cormorant Garamond', 'EB Garamond', 'serif'],
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'bloom':   'bloom 0.5s ease forwards',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        bloom: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
