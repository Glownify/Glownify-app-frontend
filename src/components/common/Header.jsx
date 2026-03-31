import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  useColorScheme,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {S, getThemeColors} from '../../theme';

const getVariantStyles = colors => ({
  primary: {
    bg: 'bg-primary-600',
    border: 'border-primary-500',
    title: 'text-white',
    statusBar: 'light-content',
    statusBg: colors.primary[600],
    buttonBg: 'bg-white/15',
    buttonIcon: colors.white,
  },
  light: {
    bg: 'bg-surface',
    border: 'border-neutral-200',
    title: 'text-neutral-800',
    statusBar: 'dark-content',
    statusBg: colors.surface,
    buttonBg: 'bg-neutral-100',
    buttonIcon: colors.neutral[800],
  },
});

export default function AppHeader({
  title,
  onBack,
  rightElement,
  variant = 'primary',
  noBorder = false,
}) {
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const variants = getVariantStyles(colors);
  const currentVariant = variants[variant] ?? variants.primary;
  const buttonSize = S.space['5xl'];
  const iconHitSlop = {
    top: S.space.sm,
    bottom: S.space.sm,
    left: S.space.sm,
    right: S.space.sm,
  };

  return (
    <>
      <StatusBar
        barStyle={currentVariant.statusBar}
        backgroundColor={currentVariant.statusBg}
      />

      <View
        className={`${currentVariant.bg} ${!noBorder ? `border-b ${currentVariant.border}` : ''}`}
      >
        <View
          className="flex-row items-center justify-between"
          style={{
            minHeight: buttonSize + S.space.sm,
            padding: S.space.md,
            paddingHorizontal: S.space.marginScreen,
            gap: S.space.sm,
          }}
        >
          {onBack ? (
            <TouchableOpacity
              onPress={onBack}
              activeOpacity={0.8}
              className={`items-center justify-center ${currentVariant.buttonBg}`}
              style={{
                width: buttonSize,
                height: buttonSize,
                borderRadius: S.radius.full,
              }}
              hitSlop={iconHitSlop}
            >
              <Ionicons
                name="chevron-back"
                size={S.icon.lg}
                color={currentVariant.buttonIcon}
              />
            </TouchableOpacity>
          ) : (
            <View style={{width: buttonSize, height: buttonSize}} />
          )}

          <Text
            className={`flex-1 text-center font-semibold ${currentVariant.title}`}
            numberOfLines={1}
            style={{fontSize: S.fs.md}}
          >
            {title}
          </Text>

          {rightElement ? (
            <View
              className="items-end justify-center"
              style={{width: buttonSize, minHeight: buttonSize}}
            >
              {rightElement}
            </View>
          ) : (
            <View style={{width: buttonSize, height: buttonSize}} />
          )}
        </View>
      </View>
    </>
  );
}

export function HeaderIconButton({name, onPress, color, bgColor}) {
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const buttonSize = S.space['5xl'];
  const resolvedColor = color ?? colors.white;
  const resolvedBgColor = bgColor ?? 'rgba(255, 255, 255, 0.18)';
  const iconHitSlop = {
    top: S.space.sm,
    bottom: S.space.sm,
    left: S.space.sm,
    right: S.space.sm,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="items-center justify-center bg-white/15"
      style={{
        width: buttonSize,
        height: buttonSize,
        borderRadius: S.radius.full,
        ...(bgColor ? {backgroundColor: resolvedBgColor} : null),
      }}
      hitSlop={iconHitSlop}
    >
      <Ionicons name={name} size={S.icon.md} color={resolvedColor} />
    </TouchableOpacity>
  );
}
