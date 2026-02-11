/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
          DEFAULT: '#f43f5e',
        },

        secondary: {
          pink: '#ec4899',
          orange: '#f97316',
        },

        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          white: '#ffffff',
          black: '#000000',
        },

        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
      },

      fontFamily: {
        primary: 'Inter',
      },

      fontSize: {
        xs: 12,
        sm: 14,
        base: 16,
        lg: 18,
        xl: 20,
        '2xl': 24,
        '3xl': 30,
        '4xl': 36,
      },

      lineHeight: {
        sm: 20,
        md: 24,
        lg: 28,
        xl: 32,
        '2xl': 36,
        '3xl': 40,
      },

      width:{
        '32px': 32,
        '40px': 40,
        sm : 120,
        md : 160,
        lg : 200,
        xl : 240,
        '2xl' : 280,
        '3xl' : 320,
      },

      spacing: {
        xs: 8,
        sm: 12,
        md: 16,
        lg: 20,
        xl: 24,
        '2xl': 28,
        '3xl': 32,
      },

      borderRadius: {
        button: 9999,
        card: 16,
        input: 12,
        avatar: 9999,
      },
    },
  },
  plugins: [],
};
