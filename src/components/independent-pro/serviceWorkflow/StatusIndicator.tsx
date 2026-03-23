import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  workflowColors,
  workflowRadius,
  workflowSpacing,
} from './theme';

type StatusTone = 'success' | 'error' | 'accent';

interface StatusIndicatorProps {
  label: string;
  tone?: StatusTone;
}

const toneMap = {
  success: {
    dot: workflowColors.success,
    background: workflowColors.successSoft,
    text: '#0F9F48',
  },
  error: {
    dot: workflowColors.error,
    background: workflowColors.errorSoft,
    text: workflowColors.error,
  },
  accent: {
    dot: workflowColors.accent,
    background: workflowColors.accentSoft,
    text: workflowColors.accent,
  },
};

export default function StatusIndicator({
  label,
  tone = 'success',
}: StatusIndicatorProps) {
  const config = toneMap[tone];

  return (
    <View style={[styles.container, { backgroundColor: config.background }]}>
      <View style={[styles.dot, { backgroundColor: config.dot }]} />
      <Text style={[styles.label, { color: config.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: workflowRadius.pill,
    paddingHorizontal: workflowSpacing.sm,
    paddingVertical: 7,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: workflowSpacing.xs,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
});
