import {StyleSheet} from 'react-native';

import {moderateScale} from '../utils/responsive';
import {S, lightColors} from './index';

export const workflowColors = {
  primaryStart: lightColors.primary[600],
  primaryEnd: lightColors.primary[500],
  accent: lightColors.warning[600],
  background: lightColors.neutral[50],
  card: lightColors.surface,
  text: lightColors.neutral[900],
  subtitle: lightColors.neutral[600],
  muted: lightColors.neutral[500],
  border: lightColors.neutral[100],
  success: lightColors.success[600],
  error: lightColors.error[500],
  successSoft: lightColors.success[50],
  errorSoft: lightColors.error[50],
  accentSoft: lightColors.warning[100],
  gradientSoft: lightColors.primary[50],
  overlay: 'rgba(0, 0, 0, 0.24)',
  white: lightColors.white,
};

export const workflowGradient = [
  workflowColors.primaryStart,
  workflowColors.primaryEnd,
];

export const workflowSpacing = {
  xs: S.space.sm,
  sm: S.space.md,
  md: S.space.lg,
  lg: S.space.xl,
  xl: S.space['2xl'],
  xxl: S.space['4xl'],
};

export const workflowRadius = {
  sm: S.radius.lg,
  md: S.radius.xl,
  lg: moderateScale(20),
  xl: moderateScale(28),
  pill: 999,
};

export const workflowShadow = {
  shadowColor: lightColors.black,
  shadowOffset: {width: 0, height: moderateScale(10)},
  shadowOpacity: 0.08,
  shadowRadius: moderateScale(20),
  elevation: 5,
};

export const workflowTypography = StyleSheet.create({
  pageTitle: {
    color: workflowColors.text,
    fontSize: S.fs.xl,
    fontWeight: '700',
  },
  sectionTitle: {
    color: workflowColors.text,
    fontSize: S.fs.lg,
    fontWeight: '700',
  },
  subtitle: {
    color: workflowColors.subtitle,
    fontSize: S.fs.sm,
    fontWeight: '500',
    lineHeight: S.fs.md + 6,
  },
  meta: {
    color: workflowColors.muted,
    fontSize: S.fs.xs,
    fontWeight: '400',
    lineHeight: S.fs.sm + 4,
  },
  body: {
    color: workflowColors.text,
    fontSize: S.fs.sm,
    fontWeight: '400',
    lineHeight: S.fs.md + 4,
  },
});
