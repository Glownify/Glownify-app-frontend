import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Image,
  View,
} from 'react-native';

/**
 * AppButton - Reusable button component
 *
 * @param {string}   label          - Button label text
 * @param {function} onPress        - Press handler
 * @param {boolean}  loading        - Show loading spinner instead of label
 * @param {boolean}  disabled       - Disable the button
 * @param {'primary'|'outline'|'ghost'} variant - Visual style variant
 * @param {'sm'|'md'|'lg'}          size    - Button size
 * @param {object}   icon           - Optional: { source: require(...), width: 22, height: 22 } for image icon
 * @param {React.ReactNode} leftIcon  - Optional left icon component (e.g. <Feather name="..." />)
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
  // ── Variant styles ──────────────────────────────────────────────
  const variantContainer = {
    primary: 'bg-[#156778] border border-transparent',
    outline: 'bg-white border border-neutral-200',
    ghost:   'bg-transparent border border-transparent',
  };

  const variantLabel = {
    primary: 'text-white',
    outline: 'text-neutral-700',
    ghost:   'text-blue-500',
  };

  const variantSpinner = {
    primary: '#ffffff',
    outline: '#156778',
    ghost:   '#1E90FF',
  };

  // ── Size styles ─────────────────────────────────────────────────
  const sizeContainer = {
    sm: 'py-3 px-5',
    md: 'py-[18px] px-6',
    lg: 'py-5 px-8',
  };

  const sizeLabel = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      style={style}
      className={[
        'flex-row items-center justify-center rounded-full shadow-sm',
        variantContainer[variant],
        sizeContainer[size],
        isDisabled ? 'opacity-60' : 'opacity-100',
        className,
      ].join(' ')}
    >
      {loading ? (
        <ActivityIndicator color={variantSpinner[variant]} />
      ) : (
        <>
          {/* Left icon component */}
          {leftIcon && <View className="mr-3">{leftIcon}</View>}

          {/* Image icon (e.g. Google logo) */}
          {icon && (
            <Image
              source={icon.source}
              style={{ width: icon.width ?? 22, height: icon.height ?? 22 }}
              className="mr-3"
            />
          )}

          {/* Label */}
          {label && (
            <Text
              className={[
                'font-bold',
                variantLabel[variant],
                sizeLabel[size],
              ].join(' ')}
            >
              {label}
            </Text>
          )}

          {/* Right icon component */}
          {rightIcon && <View className="ml-3">{rightIcon}</View>}
        </>
      )}
    </TouchableOpacity>
  );
}