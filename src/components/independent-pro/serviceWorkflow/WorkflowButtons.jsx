import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

import {S, getThemeColors} from '../../../theme';
import {moderateScale} from '../../../utils/responsive';

const BUTTON_HEIGHT = moderateScale(56);
const SLOT_WIDTH = moderateScale(20);

const buttonContent = ({
  title,
  loading,
  iconName,
  textColor,
}) => (
  <View className="flex-row items-center justify-between" style={{gap: S.space.sm}}>
    <View
      className="items-start justify-center"
      style={{width: SLOT_WIDTH, minHeight: SLOT_WIDTH}}>
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : iconName ? (
        <Icon name={iconName} size={S.icon.sm + 2} color={textColor} />
      ) : null}
    </View>
    <Text
      className="flex-1 text-center"
      style={{fontSize: S.fs.sm, fontWeight: '700', color: textColor}}>
      {title}
    </Text>
    <View style={{width: SLOT_WIDTH, minHeight: SLOT_WIDTH}} />
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
}) {
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const isDisabled = disabled || loading;

  const baseButtonStyle = {
    minHeight: BUTTON_HEIGHT,
    borderRadius: S.radius.xl,
    justifyContent: 'center',
    paddingHorizontal: S.space.lg,
  };

  if (tone === 'gradient' && !isDisabled) {
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={style}>
        <LinearGradient
          colors={[colors.primary[600], colors.primary[500]]}
          style={baseButtonStyle}>
          {buttonContent({
            title,
            loading,
            iconName,
            textColor: colors.white,
          })}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  const primaryClassName = isDisabled
    ? 'bg-neutral-300'
    : tone === 'success'
    ? 'bg-success-500'
    : tone === 'accent'
    ? 'bg-warning-500'
    : 'bg-primary-600';

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      disabled={isDisabled}
      className={`rounded-3xl ${primaryClassName}`}
      style={[baseButtonStyle, style]}>
      {buttonContent({
        title,
        loading,
        iconName,
        textColor: colors.white,
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
}) {
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      disabled={isDisabled}
      className={`rounded-3xl border ${
        isDisabled
          ? 'border-neutral-100 bg-neutral-50'
          : 'border-neutral-200 bg-surface'
      }`}
      style={[
        {
          minHeight: BUTTON_HEIGHT,
          borderRadius: S.radius.xl,
          justifyContent: 'center',
          paddingHorizontal: S.space.lg,
        },
        style,
      ]}>
      {buttonContent({
        title,
        loading,
        iconName,
        textColor: isDisabled ? colors.neutral[500] : colors.neutral[700],
      })}
    </TouchableOpacity>
  );
}