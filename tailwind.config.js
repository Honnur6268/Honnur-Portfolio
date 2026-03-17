/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
    extend: {
      colors: {
        brand: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          DEFAULT: '#eab308',
        },
        navy: {
          50: '#f1f5f9',
          100: '#e2e8f0',
          200: '#cbd5e1',
          300: '#94a3b8',
          400: '#64748b',
          500: '#475569',
          600: '#334155',
          700: '#1e293b',
          800: '#121a2b',
          900: '#0b0f1a',
          950: '#060911',
        },
        accent: {
          green: '#22c55e',
          cyan: '#06b6d4',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      animation: {
        'float': 'floatY 6s ease-in-out infinite',
        'float-delayed': 'floatY 6s ease-in-out 2s infinite',
        'float-slow': 'floatY 9s ease-in-out infinite',
        'float-reverse': 'floatYReverse 7s ease-in-out infinite',
        'spin-slow': 'spin 30s linear infinite',
        'spin-slower': 'spin 50s linear infinite',
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'glow-breathe': 'glowBreathe 4s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'orbit-reverse': 'orbit 28s linear infinite reverse',
        'orbit-slow': 'orbit 35s linear infinite',
        'bounce-gentle': 'bounceGentle 2.5s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'morph': 'morph 8s ease-in-out infinite',
        'gradient-shift': 'gradientShift 6s ease-in-out infinite',
        'dash': 'dash 2s ease-in-out infinite',
        'neon-pulse': 'neonPulse 2s ease-in-out infinite',
        'border-glow': 'borderGlow 3s ease-in-out infinite',
      },
      keyframes: {
        floatY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        floatYReverse: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(14px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px -5px rgba(234, 179, 8, 0.15)' },
          '50%': { boxShadow: '0 0 35px -5px rgba(234, 179, 8, 0.35)' },
        },
        glowBreathe: {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 1 },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        dash: {
          '0%': { strokeDashoffset: 100 },
          '100%': { strokeDashoffset: 0 },
        },
        neonPulse: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(234,179,8,0.2), 0 0 20px rgba(234,179,8,0.1)' },
          '50%': { boxShadow: '0 0 10px rgba(234,179,8,0.4), 0 0 40px rgba(234,179,8,0.2), 0 0 60px rgba(234,179,8,0.05)' },
        },
        borderGlow: {
          '0%, 100%': { borderColor: 'rgba(234,179,8,0.15)' },
          '50%': { borderColor: 'rgba(234,179,8,0.4)' },
        },
      },
      backgroundSize: {
        '300%': '300% 300%',
      },
    },
  },
  plugins: [],
};
