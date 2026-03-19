import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  workflowColors,
  workflowGradient,
  workflowRadius,
  workflowSpacing,
} from './theme';

type PrimaryTone = 'gradient' | 'accent' | 'success';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  iconName?: string;
  tone?: PrimaryTone;
  style?: StyleProp<ViewStyle>;
}

const solidToneMap: Record<Exclude<PrimaryTone, 'gradient'>, string> = {
  accent: workflowColors.accent,
  success: workflowColors.success,
};

const buttonContent = ({
  title,
  loading,
  iconName,
  textColor,
}: {
  title: string;
  loading?: boolean;
  iconName?: string;
  textColor: string;
}) => (
  <View style={styles.content}>
    <View style={styles.leftSlot}>
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : iconName ? (
        <Icon name={iconName} size={18} color={textColor} />
      ) : null}
    </View>
    <Text style={[styles.primaryText, { color: textColor }]}>{title}</Text>
    <View style={styles.rightSlot} />
  </View>
);

export function PrimaryButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  iconName,
  tone = 'gradient',
  style,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  if (tone === 'gradient' && !isDisabled) {
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={style}>
        <LinearGradient colors={workflowGradient} style={styles.primaryButton}>
          {buttonContent({
            title,
            loading,
            iconName,
            textColor: workflowColors.white,
          })}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  const backgroundColor = isDisabled
    ? '#CBD5E1'
    : solidToneMap[tone as Exclude<PrimaryTone, 'gradient'>] ??
      workflowColors.primaryStart;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      disabled={isDisabled}
      style={[styles.primaryButton, { backgroundColor }, style]}
    >
      {buttonContent({
        title,
        loading,
        iconName,
        textColor: workflowColors.white,
      })}
    </TouchableOpacity>
  );
}

export function SecondaryButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  iconName,
  style,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.secondaryButton,
        isDisabled && styles.secondaryDisabled,
        style,
      ]}
    >
      {buttonContent({
        title,
        loading,
        iconName,
        textColor: isDisabled ? workflowColors.muted : workflowColors.subtitle,
      })}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    minHeight: 56,
    borderRadius: workflowRadius.md,
    justifyContent: 'center',
    paddingHorizontal: workflowSpacing.md,
  },
  secondaryButton: {
    minHeight: 56,
    borderRadius: workflowRadius.md,
    justifyContent: 'center',
    paddingHorizontal: workflowSpacing.md,
    backgroundColor: workflowColors.white,
    borderWidth: 1,
    borderColor: workflowColors.border,
  },
  secondaryDisabled: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSlot: {
    width: 20,
    alignItems: 'flex-start',
  },
  rightSlot: {
    width: 20,
  },
  primaryText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
  },
});
