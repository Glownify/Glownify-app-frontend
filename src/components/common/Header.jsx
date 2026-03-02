import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

/**
 * AppHeader — Generic header used across all screens.
 *
 * Props:
 * @param {string}        title          — Screen title (center)
 * @param {function}      onBack         — If provided, shows a back chevron on the left
 * @param {ReactNode}     rightElement   — Optional custom element on the right (icon, text, etc.)
 * @param {string}        variant        — 'primary' (default) | 'light'
 *                                          'primary' → rose bg, white text (matches teal/primary screens)
 *                                          'light'   → white bg, dark text
 * @param {boolean}       noBorder       — Suppress bottom border (default false)
 */

const VARIANTS = {
  primary: {
    bg:          'bg-primary',
    statusBar:   'light-content',
    statusBg:    '#f43f5e',
    title:       'text-neutral-white',
    backBg:      'rgba(255,255,255,0.18)',
    backIcon:    '#ffffff',
    border:      'border-primary-400',
    rightBg:     'rgba(255,255,255,0.18)',
    rightIcon:   '#ffffff',
  },
  light: {
    bg:          'bg-neutral-white',
    statusBar:   'dark-content',
    statusBg:    '#ffffff',
    title:       'text-neutral-800',
    backBg:      '#f3f4f6',
    backIcon:    '#1f2937',
    border:      'border-neutral-200',
    rightBg:     '#f3f4f6',
    rightIcon:   '#1f2937',
  },
};

export default function AppHeader({
  title,
  onBack,
  rightElement,
  variant = 'primary',
  noBorder = false,
}) {
  const insets = useSafeAreaInsets();
  const v = VARIANTS[variant] ?? VARIANTS.primary;

  return (
    <>
      <StatusBar barStyle={v.statusBar} backgroundColor={v.statusBg} />

      <View
        className={`${v.bg} ${!noBorder ? `border-b ${v.border}` : ''}`}
        style={{  }}
      >
        <View className="flex-row items-center justify-between px-md py-sm">

          {/* ── Left — Back button or spacer ── */}
          {onBack ? (
            <TouchableOpacity
              onPress={onBack}
              className="w-10 h-10 rounded-full items-center justify-center"
              style={{ backgroundColor: v.backBg }}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="chevron-back" size={22} color={v.backIcon} />
            </TouchableOpacity>
          ) : (
            <View className="w-10" />
          )}

          {/* ── Centre — Title ── */}
          <Text
            className={`text-base font-semibold ${v.title} flex-1 text-center`}
            numberOfLines={1}
          >
            {title}
          </Text>

          {/* ── Right — Custom element or spacer ── */}
          {rightElement ? (
            <View className="w-10 items-end">{rightElement}</View>
          ) : (
            <View className="w-10" />
          )}

        </View>
      </View>
    </>
  );
}

/**
 * Convenience hook — returns a pre-built icon button for the right slot.
 * Usage:
 *   const heartBtn = useHeaderIconButton('heart-outline', () => toggleFav(), '#f43f5e');
 *   <AppHeader rightElement={heartBtn} ... />
 */
export function HeaderIconButton({ name, onPress, color = '#ffffff', bgColor }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-10 h-10 rounded-full items-center justify-center"
      style={{ backgroundColor: bgColor ?? 'rgba(255,255,255,0.18)' }}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <Ionicons name={name} size={20} color={color} />
    </TouchableOpacity>
  );
}