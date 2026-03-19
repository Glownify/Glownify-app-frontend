import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  workflowColors,
  workflowRadius,
  workflowSpacing,
} from './theme';

type FeedbackTone = 'error' | 'success' | 'info';

interface FeedbackBannerProps {
  message: string;
  tone?: FeedbackTone;
}

const toneMap = {
  error: {
    backgroundColor: workflowColors.errorSoft,
    iconColor: workflowColors.error,
    textColor: '#B42318',
    iconName: 'alert-circle-outline',
  },
  success: {
    backgroundColor: workflowColors.successSoft,
    iconColor: workflowColors.success,
    textColor: '#0F9F48',
    iconName: 'checkmark-circle-outline',
  },
  info: {
    backgroundColor: workflowColors.gradientSoft,
    iconColor: workflowColors.primaryStart,
    textColor: workflowColors.primaryStart,
    iconName: 'information-circle-outline',
  },
};

export default function FeedbackBanner({
  message,
  tone = 'error',
}: FeedbackBannerProps) {
  const config = toneMap[tone];

  return (
    <View style={[styles.container, { backgroundColor: config.backgroundColor }]}>
      <Icon name={config.iconName} size={18} color={config.iconColor} />
      <Text style={[styles.message, { color: config.textColor }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: workflowRadius.sm,
    paddingHorizontal: workflowSpacing.sm,
    paddingVertical: workflowSpacing.sm,
  },
  message: {
    flex: 1,
    marginLeft: workflowSpacing.xs,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
  },
});
