/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Premium Royal Indigo palette
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5', // Core Primary - Royal Indigo
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        gray: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        }
      },
      fontFamily: {
        mono: ['Space Mono', 'monospace'],
        sans: ['Inter', 'SF Pro Display', 'sans-serif'],
        code: ['Fira Code', 'monospace'],
        display: ['Inter', 'SF Pro Display', 'sans-serif'], // Display font for headers
      },
      backdropBlur: {
        xs: '2px',
        xl: '20px',
        '2xl': '40px',
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'grid-shift': 'grid-shift 20s linear infinite',
        'counter': 'counter 2s ease-out forwards',
        'wave': 'wave 1.2s ease-in-out infinite',
        'scan': 'scan 4s linear infinite',
        'rotate-slow': 'rotate-slow 20s linear infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'pulse-wave': 'pulse-wave 2s ease-in-out infinite',
        'wave-flow': 'wave-flow 2s ease-in-out infinite',
        'speaker-pulse': 'speaker-pulse 3s ease-in-out infinite',
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
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
          '0%, 100%': { transform: 'scale(1)', opacity: '0.1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.3' },
        },
        'wave-flow': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'speaker-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.1)', opacity: '0.6' },
        },
        'blob': {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(79, 70, 229, 0.15)',
        'glow-primary-lg': '0 0 40px rgba(79, 70, 229, 0.25)',
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'soft-lg': '0 10px 40px -5px rgba(0, 0, 0, 0.08)',
        'soft-xl': '0 20px 40px -10px rgba(0, 0, 0, 0.1)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.05)',
        'inner-light': 'inset 0 0 20px rgba(0, 0, 0, 0.02)',
        'border-light': '0 0 1px rgba(0, 0, 0, 0.1), 0 0 2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};
