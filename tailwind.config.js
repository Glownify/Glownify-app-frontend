/** @type {import('tailwindcss').Config} */
const semanticScale = prefix => ({
  50: `var(--color-${prefix}-50)`,
  100: `var(--color-${prefix}-100)`,
  200: `var(--color-${prefix}-200)`,
  300: `var(--color-${prefix}-300)`,
  400: `var(--color-${prefix}-400)`,
  500: `var(--color-${prefix}-500)`,
  600: `var(--color-${prefix}-600)`,
  700: `var(--color-${prefix}-700)`,
  800: `var(--color-${prefix}-800)`,
  900: `var(--color-${prefix}-900)`,
});

module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        base: 'var(--color-base)',
        surface: 'var(--color-surface)',
        overlay: 'var(--color-overlay)',

        primaryLight: 'var(--color-primary-50)',

        primary: {
          DEFAULT: '#7c3aed',
          ...semanticScale('primary'),
        },

        info: {
          DEFAULT: '#2fa6ff',
          ...semanticScale('info'),
        },

        success: {
          DEFAULT: '#22c563',
          ...semanticScale('success'),
        },

        warning: {
          DEFAULT: '#ffc107',
          ...semanticScale('warning'),
        },

        error: {
          DEFAULT: '#eb5648',
          ...semanticScale('error'),
        },

        neutral: {
          DEFAULT: 'var(--color-neutral-500)',
          ...semanticScale('neutral'),
          white: '#ffffff',
          black: '#000000',
        },

        secondary: {
          pink: '#ec4899',
          orange: '#f97316',
          teal: '#14b8a6',
        },
      },

      fontFamily: {
        primary: ['Poppins', 'Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        arial: ['Arial', 'sans-serif'],
        regular: ['Inter-Regular', 'sans-serif'],
        medium: ['Inter-Medium', 'sans-serif'],
        semibold: ['Inter-SemiBold', 'sans-serif'],
        bold: ['Inter-Bold', 'sans-serif'],
      },

      spacing: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 20,
        '2xl': 24,
        '3xl': 28,
        '4xl': 32,
        '5xl': 40,
        '6xl': 48,
        '7xl': 64,
        '8xl': 80,
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
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.75,
        sm: 20,
        md: 24,
        lg: 28,
        xl: 32,
        '2xl': 36,
        '3xl': 40,
      },

      width: {
        '32px': 32,
        '40px': 40,
        sm: 120,
        md: 160,
        lg: 200,
        xl: 240,
        '2xl': 280,
        '3xl': 320,
      },

      borderRadius: {
        DEFAULT: 5,
        sm: 8,
        md: 10,
        lg: 12,
        xl: 16,
        button: 9999,
        card: 16,
        input: 12,
        avatar: 9999,
        '2xl': 20,
        '3xl': 24,
        '4xl': 32,
      },

      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT:
          '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        card: '0 18px 48px rgba(73, 29, 149, 0.12)',
      },

      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #7c3aed 0%, #1888f8 100%)',
        'gradient-soft': 'linear-gradient(135deg, #f7f3ff 0%, #eef9ff 100%)',
      },
    },
  },
  darkMode: 'media',
  plugins: [],
};
