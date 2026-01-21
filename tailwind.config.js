/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0078ff',
          light: '#3d8bff',
          dark: '#005fcc',
        },
        secondary: {
          DEFAULT: '#9028ff',
          light: '#a85dff',
          dark: '#6c1ecc',
        },
        accent: {
          emerald: '#10b981',
          emeraldLight: '#34d399',
          emeraldDark: '#059669',
          cyan: '#06b6d4',
          cyanLight: '#22d3ee',
          cyanDark: '#0891b2',
        },
        dark: {
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
        },
        text: {
          primary: '#e2e8f0',
          secondary: '#94a3b8',
          muted: '#64748b',
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '104': '26rem',
        '112': '28rem',
        '128': '32rem',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'pulse-glow': {
          '0%': { boxShadow: '0 0 0 0 rgba(0, 120, 255, 0.4)' },
          '70%': { boxShadow: '0 0 0 10px rgba(0, 120, 255, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(0, 120, 255, 0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'bounce-subtle': 'bounce-subtle 2s infinite',
        'pulse-glow': 'pulse-glow 2s infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.glass-card': {
          backgroundColor: 'rgba(30, 41, 59, 0.7)',
          backdropFilter: 'blur(10px)',
          borderColor: 'rgba(148, 163, 184, 0.1)',
          borderWidth: '1px',
          borderRadius: '0.75rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          transitionProperty: 'all',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDuration: '150ms',
          '&:hover': {
            backgroundColor: 'rgba(30, 41, 59, 0.8)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          },
        },
        '.btn-primary': {
          backgroundColor: '#0078ff',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          fontWeight: '600',
          transitionProperty: 'all',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDuration: '150ms',
          '&:hover': {
            backgroundColor: '#005fcc',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
          '&:focus': {
            outline: '2px solid transparent',
            outlineOffset: '2px',
            ring: '2px',
            ringColor: '#0078ff',
            ringOpacity: '0.5',
          },
        },
        '.btn-secondary': {
          backgroundColor: '#9028ff',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          fontWeight: '600',
          transitionProperty: 'all',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDuration: '150ms',
          '&:hover': {
            backgroundColor: '#6c1ecc',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
          '&:focus': {
            outline: '2px solid transparent',
            outlineOffset: '2px',
            ring: '2px',
            ringColor: '#9028ff',
            ringOpacity: '0.5',
          },
        },
        '.btn-glass': {
          backgroundColor: 'rgba(30, 41, 59, 0.5)',
          color: '#e2e8f0',
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          fontWeight: '600',
          borderWidth: '1px',
          borderColor: 'rgba(148, 163, 184, 0.2)',
          transitionProperty: 'all',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDuration: '150ms',
          '&:hover': {
            backgroundColor: 'rgba(30, 41, 59, 0.7)',
            borderColor: 'rgba(148, 163, 184, 0.4)',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
          '&:focus': {
            outline: '2px solid transparent',
            outlineOffset: '2px',
            ring: '2px',
            ringColor: 'rgba(148, 163, 184, 0.3)',
          },
        },
      });
    },
  ],
};