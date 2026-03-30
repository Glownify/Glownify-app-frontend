import {Appearance} from 'react-native';
import {darkColors, getThemeColors} from './index';

const palette = getThemeColors(Appearance.getColorScheme());

const Colors = {
  primary: palette.primary[600],
  primaryLight: palette.primary[50],
  secondary: palette.primary[200],

  textPrimary: palette.neutral[900],
  textSecondary: palette.neutral[600],
  textLight: palette.white,
  textMuted: palette.neutral[400],

  white: palette.white,
  black: palette.black,

  cardBackground: palette.surface,
  border: palette.neutral[100],

  success: palette.success[500],
  danger: palette.error[500],
  warning: palette.warning[500],
  error: palette.error[500],

  bgLight: palette.base,
  bgDark: darkColors.base,

  accent: palette.info[500],
};

export default Colors;
