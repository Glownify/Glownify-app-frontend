import { StyleSheet } from 'react-native';

export const workflowColors = {
  primaryStart: '#4A6CF7',
  primaryEnd: '#6A8DFF',
  accent: '#FF7A45',
  background: '#F5F7FB',
  card: '#FFFFFF',
  text: '#1E293B',
  subtitle: '#475569',
  muted: '#94A3B8',
  border: '#E2E8F0',
  success: '#22C55E',
  error: '#EF4444',
  successSoft: '#E8FFF1',
  errorSoft: '#FFF1F2',
  accentSoft: '#FFF2EB',
  gradientSoft: '#EEF3FF',
  overlay: 'rgba(15, 23, 42, 0.44)',
  white: '#FFFFFF',
};

export const workflowGradient = [
  workflowColors.primaryStart,
  workflowColors.primaryEnd,
];

export const workflowSpacing = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

export const workflowRadius = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 28,
  pill: 999,
};

export const workflowShadow = {
  shadowColor: '#1E3A8A',
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.08,
  shadowRadius: 20,
  elevation: 5,
};

export const workflowTypography = StyleSheet.create({
  pageTitle: {
    color: workflowColors.text,
    fontSize: 24,
    fontWeight: '600',
  },
  sectionTitle: {
    color: workflowColors.text,
    fontSize: 20,
    fontWeight: '600',
  },
  subtitle: {
    color: workflowColors.subtitle,
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 22,
  },
  meta: {
    color: workflowColors.muted,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
  },
  body: {
    color: workflowColors.text,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
});
