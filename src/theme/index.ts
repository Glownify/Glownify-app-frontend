import {Appearance} from 'react-native';
import type {ColorSchemeName} from 'react-native';
import {S} from './scale';

export {S};

const baseLightColors = {
  white: '#ffffff',
  black: '#000000',
  base: '#ffffff',
  surface: '#ffffff',
  overlay: 'rgba(0, 0, 0, 0.2)',

  primary: {
    50: '#f7f3ff',
    100: '#f1e9fe',
    200: '#e5d6fe',
    300: '#d0b5fd',
    400: '#b48bfa',
    500: '#955cf6',
    600: '#7c3aed',
    700: '#6928d9',
    800: '#5821b6',
    900: '#491d95',
  },

  info: {
    50: '#eef9ff',
    100: '#d9f1ff',
    200: '#bbe8ff',
    300: '#8cdbff',
    400: '#56c4ff',
    500: '#2fa6ff',
    600: '#1888f8',
    700: '#106bda',
    800: '#155ab8',
    900: '#174e91',
  },

  success: {
    50: '#f0fdf4',
    100: '#dcfce8',
    200: '#bbf7d2',
    300: '#86efaf',
    400: '#4ade85',
    500: '#22c563',
    600: '#16a34e',
    700: '#157f40',
    800: '#166537',
    900: '#14532f',
  },

  warning: {
    50: '#ffffea',
    100: '#fffbc5',
    200: '#fff885',
    300: '#ffee46',
    400: '#ffdf1b',
    500: '#ffc107',
    600: '#e29400',
    700: '#bb6902',
    800: '#985108',
    900: '#7c420b',
  },

  error: {
    50: '#fef3f2',
    100: '#fde5e3',
    200: '#fdcfcb',
    300: '#faaea7',
    400: '#f57f74',
    500: '#eb5648',
    600: '#ce3426',
    700: '#b52c20',
    800: '#96281e',
    900: '#7d271f',
  },

  neutral: {
    50: '#f5f5f6',
    100: '#e6e6e7',
    200: '#cfcfd2',
    300: '#adadb3',
    400: '#84848c',
    500: '#71717a',
    600: '#5a5a60',
    700: '#4d4c52',
    800: '#434347',
    900: '#3c3b3e',
    white: '#ffffff',
    black: '#000000',
  },
} as const;

export const darkColors = {
  white: '#ffffff',
  black: '#000000',
  base: '#000000',
  surface: '#0f0f12',
  overlay: 'rgba(255, 255, 255, 0.1)',

  primary: {
    50: '#2e1c46',
    100: '#3c2562',
    200: '#4a2e7e',
    300: '#5b3a9c',
    400: '#6b47b8',
    500: '#7c3aed',
    600: '#8e58f1',
    700: '#a278f4',
    800: '#b89cf7',
    900: '#d2c2fa',
  },

  info: {
    50: '#122436',
    100: '#16304a',
    200: '#1c3d63',
    300: '#234e7d',
    400: '#2a62a0',
    500: '#2fa6ff',
    600: '#56b6ff',
    700: '#7dcaff',
    800: '#a3dcff',
    900: '#c9ecff',
  },

  success: {
    50: '#0d2617',
    100: '#123621',
    200: '#18482c',
    300: '#1f5a39',
    400: '#277347',
    500: '#22c563',
    600: '#4cd383',
    700: '#74e0a3',
    800: '#9dedc1',
    900: '#c7f9dd',
  },

  warning: {
    50: '#332d14',
    100: '#463f1d',
    200: '#5a5227',
    300: '#726a33',
    400: '#8d823e',
    500: '#ffc107',
    600: '#ffcf47',
    700: '#ffdc70',
    800: '#ffe89b',
    900: '#fff4c6',
  },

  error: {
    50: '#2d1413',
    100: '#401b19',
    200: '#552320',
    300: '#6a2c28',
    400: '#873833',
    500: '#eb5648',
    600: '#f17868',
    700: '#f59b8e',
    800: '#f9bcb2',
    900: '#fdd9d3',
  },

  neutral: {
    50: '#18181b',
    100: '#27272a',
    200: '#3f3f46',
    300: '#52525b',
    400: '#71717a',
    500: '#a1a1aa',
    600: '#d4d4d8',
    700: '#e4e4e7',
    800: '#f4f4f5',
    900: '#fafafa',
    white: '#ffffff',
    black: '#000000',
  },
} as const;

export const lightColors = baseLightColors;
export type ThemeColors = typeof baseLightColors;

export const palettes = {
  light: lightColors,
  dark: darkColors,
} as const;

export const getThemeColors = (
  scheme: ColorSchemeName = Appearance.getColorScheme(),
): ThemeColors => {
  return scheme === 'dark' ? darkColors : lightColors;
};

export const theme = {
  S,
  colors: lightColors,
  darkColors,
  palettes,
  getThemeColors,
};
