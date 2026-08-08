/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        brand: {
          blue: '#003A99',
          green: '#1A7F00',
          yellow: '#FFEB00',
          red: '#E31E24',
          black: '#1A1A1A',
        },
        // Primary aliases for easy use
        blue: '#003A99',
        green: '#1A7F00',
        yellow: '#FFEB00',
        red: '#E31E24',
        black: '#1A1A1A',
        // Gray scale
        gray: {
          50: '#F8F9FA',
          100: '#F0F1F3',
          200: '#E0E2E6',
          300: '#C0C4CC',
          400: '#9A9FA8',
          500: '#6C727D',
          600: '#4A4F59',
          700: '#33373F',
          800: '#1E2024',
        },
        // Keep compatibility with existing components
        primary: '#003A99',
        primaryDark: '#002A70',
        secondary: '#1A7F00',
        accent: '#FFEB00',
        dark: '#1A1A1A',
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        // Force all corners to be sharp/boxed
        none: '0',
        DEFAULT: '0',
        sm: '0',
        md: '0',
        lg: '0',
        xl: '0',
        '2xl': '0',
        '3xl': '0',
        full: '0', // Override rounded-full
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out',
        'slow-zoom': 'slowZoom 20s ease-in-out infinite alternate',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-10px)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      boxShadow: {
        'sharp': '2px 2px 0 rgba(0,0,0,0.1)',
        'sharp-lg': '4px 4px 0 rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
}
