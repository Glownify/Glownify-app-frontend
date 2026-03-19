import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { formatElapsedTime } from './utils';
import {
  workflowColors,
  workflowRadius,
  workflowShadow,
  workflowSpacing,
} from './theme';

interface TimerBadgeProps {
  seconds: number;
  label?: string;
}

export default function TimerBadge({
  seconds,
  label = 'Service Timer',
}: TimerBadgeProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Icon name="time-outline" size={18} color={workflowColors.primaryStart} />
      </View>
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{formatElapsedTime(seconds)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: workflowSpacing.md,
    paddingVertical: workflowSpacing.sm,
    borderRadius: workflowRadius.pill,
    backgroundColor: workflowColors.white,
    ...workflowShadow,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: workflowColors.gradientSoft,
    marginRight: workflowSpacing.sm,
  },
  label: {
    color: workflowColors.muted,
    fontSize: 12,
    fontWeight: '500',
  },
  value: {
    color: workflowColors.text,
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.4,
    marginTop: 2,
  },
});
