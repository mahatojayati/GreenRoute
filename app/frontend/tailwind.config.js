/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F1F8F4',
          100: '#DCEFE3',
          200: '#B8DFC6',
          500: '#2E5A44', // primary brand color
          600: '#264A38',
          700: '#1E3B2C',
          800: '#162C21',
          900: '#0E1D16',
        },
        slate: {
          950: '#1A252F',
          900: '#2C3E50', // primary text color
        },
        accent: {
          blue: '#2980B9',
          orange: '#E67E22',
          red: '#C0392B',
          green: '#27AE60',
        },
        background: '#F8F9FA',
        surface: '#FFFFFF',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(44, 62, 80, 0.04)',
        'card': '0 4px 20px -2px rgba(44, 62, 80, 0.06)',
        'elevated': '0 10px 30px -5px rgba(46, 90, 68, 0.12)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-in': 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
