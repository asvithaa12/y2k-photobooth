/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        barbie: {
          primary: '#FF69B4', // Primary Pink
          baby: '#FFD6EC',    // Baby Pink
          light: '#FFEAF5',   // Light Pink
          hot: '#FF4FA3',     // Hot Pink
          gold: '#FFD700',    // Accent Gold
        }
      },
      fontFamily: {
        barbie: ['"Pacifico"', 'cursive', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-glow': 'pulse-glow 2s infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(255, 105, 180, 0.7)' },
          '100%': { transform: 'scale(1.05)', boxShadow: '0 0 20px 10px rgba(255, 105, 180, 0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        }
      }
    },
  },
  plugins: [],
}
