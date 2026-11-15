/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        peach: {
          50: '#FDF1EA',
          100: '#FBE3D6',
          300: '#F5C7B0',
          400: '#EFAE8F',
          600: '#D9805A',
          800: '#A24E27',
          DEFAULT: '#F5C7B0',
          on: '#2A1810',
        },
        'on-peach': '#2A1810',
        // Theme tokens mapped to peach palette
        theme: {
          peach50: 'var(--peach-50)',
          peach100: 'var(--peach-100)',
          peach300: 'var(--peach-300)',
          peach400: 'var(--peach-400)',
          peach600: 'var(--peach-600)',
          peach800: 'var(--peach-800)',
          onPeach: 'var(--on-peach)',
          green600: 'var(--peach-600)',
          green500: 'var(--peach-300)',
          green100: 'var(--peach-100)',
          green50: 'var(--peach-50)',
          ink900: 'var(--ink-900)',
          ink500: 'var(--ink-500)',
          white: 'var(--white)',
          amber: 'var(--amber)',
          sky: 'var(--sky)',
          coral: 'var(--coral)',
          violet: 'var(--violet)',
        },
        // Direct emeraldGreen tokens remapped to peach
        emeraldGreen: {
          50: '#FDF1EA',
          100: '#FBE3D6',
          200: '#F9D5C3',
          300: '#F5C7B0',
          400: '#EFAE8F',
          500: '#E29775',
          600: '#D9805A',
          700: '#BA6540',
          800: '#A24E27',
          900: '#7A3515',
        },
        ink: {
          900: '#1B1917',
          700: '#44403C',
          500: '#78716C',
          300: '#A8A29E',
          100: '#F5F5F4',
        },
        chip: {
          amber: '#F5A524',
          sky: '#4DA3FF',
          coral: '#FF7A6B',
          violet: '#8B7CF6',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        'lg-card': '20px',
        'md-card': '14px',
      },
      boxShadow: {
        'soft-peach': '0 8px 24px rgba(245, 199, 176, 0.35)',
        'soft-peach-lg': '0 16px 36px rgba(217, 128, 90, 0.22)',
        'soft-peach-sm': '0 2px 8px rgba(245, 199, 176, 0.2)',
        'soft-green': '0 8px 24px rgba(245, 199, 176, 0.35)',
        'soft-green-lg': '0 16px 36px rgba(217, 128, 90, 0.22)',
        'soft-green-sm': '0 2px 8px rgba(245, 199, 176, 0.2)',
        'card': '0 4px 16px rgba(42, 24, 16, 0.06)',
      },
      animation: {
        'marquee-left': 'marquee-left var(--marquee-duration, 45s) linear infinite',
        'marquee-right': 'marquee-right var(--marquee-duration, 45s) linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'marquee-left': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-right': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
