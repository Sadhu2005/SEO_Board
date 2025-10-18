/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00BFFF',
          dark: '#0099CC',
          light: '#33CCFF',
        },
        violet: {
          DEFAULT: '#8A2BE2',
          dark: '#6A1BB2',
          light: '#A855F7',
        },
        navy: {
          DEFAULT: '#0A0F1C',
          light: '#1A1F2C',
          dark: '#050A14',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00BFFF, 0 0 10px #00BFFF' },
          '100%': { boxShadow: '0 0 10px #00BFFF, 0 0 20px #00BFFF, 0 0 30px #8A2BE2' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

