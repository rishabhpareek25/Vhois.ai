/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Premium monochromatic palette
        void: {
          DEFAULT: '#000000',      // Pure black
          50: '#0a0a0a',           // Near black
          100: '#1a1a1a',          // Deep charcoal
          200: '#2a2a2a',          // Charcoal
          300: '#3a3a3a',          // Dark grey
          400: '#4a4a4a',          // Medium dark grey
          500: '#5a5a5a',          // Medium grey
          600: '#6a6a6a',          // Light-ish grey
          700: '#7a7a7a',          // Light grey
          800: '#8a8a8a',          // Lighter grey
          900: '#9a9a9a',          // Even lighter grey
        },
        smoke: {
          DEFAULT: '#5f5f5f',      // Smoke
          light: '#8a8a8a',        // Light smoke
          dark: '#2a2a2a',         // Dark smoke
        },
        ash: {
          DEFAULT: '#d4d4d4',      // Ash
          light: '#e5e5e5',        // Light ash
          dark: '#b8b8b8',         // Dark ash
        },
        platinum: '#ffffff',         // Pure white
        silver: {
          DEFAULT: '#c0c0c0',      // Silver
          light: '#d1d1d1',        // Light silver
          dark: '#a0a0a0',         // Dark silver
        },
      },
      fontFamily: {
        mono: ['Space Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
        code: ['Fira Code', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'grid-shift': 'grid-shift 20s linear infinite',
        'counter': 'counter 2s ease-out forwards',
        'wave': 'wave 1.2s ease-in-out infinite',
        'glitch': 'glitch 0.3s ease-in-out infinite',
        'scan': 'scan 4s linear infinite',
        'rotate-slow': 'rotate-slow 20s linear infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'pulse-wave': 'pulse-wave 2s ease-in-out infinite',
        'wave-flow': 'wave-flow 2s ease-in-out infinite',
        'speaker-pulse': 'speaker-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'grid-shift': {
          '0%': { transform: 'perspective(500px) rotateX(5deg)' },
          '100%': { transform: 'perspective(500px) rotateX(-5deg)' },
        },
        'counter': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'wave': {
          '0%, 100%': { transform: 'scaleY(0.5)' },
          '50%': { transform: 'scaleY(1.5)' },
        },
        'glitch': {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        'scan': {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        },
        'rotate-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'morph': {
          '0%, 100%': { borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' },
          '50%': { borderRadius: '70% 30% 30% 70% / 70% 70% 30% 30%' },
        },
        'pulse-wave': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.5' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
        },
        'wave-flow': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'speaker-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.1)', opacity: '0.6' },
        },
      },
      boxShadow: {
        'glow-white': '0 0 20px rgba(255, 255, 255, 0.15)',
        'glow-white-lg': '0 0 40px rgba(255, 255, 255, 0.2)',
        'glow-grey': '0 0 20px rgba(160, 160, 160, 0.3)',
        'glow-smoke': '0 0 30px rgba(95, 95, 95, 0.25)',
        'inner-glow': 'inset 0 0 20px rgba(255, 255, 255, 0.05)',
        'border-glow': '0 0 1px rgba(255, 255, 255, 0.3), 0 0 2px rgba(255, 255, 255, 0.2)',
      },
    },
  },
  plugins: [],
};
