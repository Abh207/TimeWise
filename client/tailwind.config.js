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
        // Clean Green Timetable Theme Palette
        theme: {
          green600: 'var(--green-600)',
          green500: 'var(--green-500)',
          green100: 'var(--green-100)',
          green50: 'var(--green-50)',
          ink900: 'var(--ink-900)',
          ink500: 'var(--ink-500)',
          white: 'var(--white)',
          amber: 'var(--amber)',
          sky: 'var(--sky)',
          coral: 'var(--coral)',
          violet: 'var(--violet)',
        },
        // Direct color tokens
        emeraldGreen: {
          50: '#F3FAF5',
          100: '#E6F4EA',
          200: '#C3E8CE',
          300: '#8CD4A6',
          400: '#52BE80',
          500: '#3DB772',
          600: '#2E9E5E',
          700: '#237B49',
          800: '#1B5B37',
          900: '#144329',
        },
        ink: {
          900: '#1B2B22',
          700: '#3D4F45',
          500: '#6B7C72',
          300: '#A4B5AB',
          100: '#E4ECE7',
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
        'soft-green': '0 8px 24px rgba(46, 158, 94, 0.15)',
        'soft-green-lg': '0 16px 36px rgba(46, 158, 94, 0.22)',
        'soft-green-sm': '0 2px 8px rgba(46, 158, 94, 0.08)',
        'card': '0 4px 16px rgba(27, 43, 34, 0.06)',
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
