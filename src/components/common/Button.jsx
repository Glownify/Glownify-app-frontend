import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Image,
  View,
  useColorScheme,
} from 'react-native';
import {S, getThemeColors} from '../../theme';

const VARIANT_STYLES = {
  primary: {
    container: 'bg-primary-600 border-primary-600',
    label: 'text-white',
  },
  outline: {
    container: 'bg-surface border-neutral-200',
    label: 'text-neutral-700',
  },
  ghost: {
    container: 'bg-transparent border-transparent',
    label: 'text-primary-600',
  },
};

const SIZE_STYLES = {
  sm: {
    minHeight: S.space['5xl'],
    paddingHorizontal: S.space.xl,
    labelSize: S.fs.sm,
  },
  md: {
    minHeight: S.space['6xl'],
    paddingHorizontal: S.space.gutter,
    labelSize: S.fs.md,
  },
  lg: {
    minHeight: S.space['7xl'],
    paddingHorizontal: S.space['2xl'],
    labelSize: S.fs.lg,
  },
};

/**
 * AppButton - Reusable button component
 *
 * @param {string}   label          - Button label text
 * @param {function} onPress        - Press handler
 * @param {boolean}  loading        - Show loading spinner instead of label
 * @param {boolean}  disabled       - Disable the button
 * @param {'primary'|'outline'|'ghost'} variant - Visual style variant
 * @param {'sm'|'md'|'lg'} size     - Button size
 * @param {object}   icon           - Optional: { source: require(...), width: 22, height: 22 }
 * @param {React.ReactNode} leftIcon  - Optional left icon component
 * @param {React.ReactNode} rightIcon - Optional right icon component
 * @param {string}   className      - Additional NativeWind className overrides
 * @param {object}   style          - Additional inline style overrides
 */
export default function AppButton({
  label,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  size = 'md',
  icon,
  leftIcon,
  rightIcon,
  className = '',
  style,
}) {
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const variantStyles = VARIANT_STYLES[variant] ?? VARIANT_STYLES.primary;
  const sizeStyles = SIZE_STYLES[size] ?? SIZE_STYLES.md;
  const isDisabled = disabled || loading;

  const spinnerColor =
    variant === 'primary'
      ? colors.white
      : variant === 'outline'
      ? colors.neutral[700]
      : colors.primary[600];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      style={[
        {
          minHeight: sizeStyles.minHeight,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          borderRadius: S.radius.full,
          gap: S.space.sm,
        },
        style,
      ]}
      className={[
        'flex-row items-center justify-center border shadow-sm',
        variantStyles.container,
        isDisabled ? 'opacity-60' : 'opacity-100',
        className,
      ].join(' ')}
    >
      {loading ? (
        <ActivityIndicator color={spinnerColor} />
      ) : (
        <>
          {leftIcon ? <View>{leftIcon}</View> : null}

          {icon ? (
            <Image
              source={icon.source}
              style={{
                width: icon.width ?? S.icon.md,
                height: icon.height ?? S.icon.md,
              }}
            />
          ) : null}

          {label ? (
            <Text
              className={`font-bold ${variantStyles.label}`}
              style={{fontSize: sizeStyles.labelSize}}
            >
              {label}
            </Text>
          ) : null}

          {rightIcon ? <View>{rightIcon}</View> : null}
        </>
      )}
    </TouchableOpacity>
  );
}
