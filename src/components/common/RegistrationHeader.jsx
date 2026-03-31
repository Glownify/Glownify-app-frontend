import React from 'react';
import {View, Text, TouchableOpacity, useColorScheme} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {S, getThemeColors} from '../../theme';

/**
 * RegistrationHeader - Theme-aware header for partner registration flows
 *
 * @param {string}   title       - Main title text
 * @param {string}   subtitle    - Subtitle text
 * @param {function} onBack      - Back button press handler
 * @param {string}   bgColor     - Optional background color override
 * @param {string}   className   - Additional NativeWind className
 */
export default function RegistrationHeader({
  title = 'Earn with Us',
  subtitle = '(Partner Registration)',
  onBack,
  bgColor,
  className = '',
}) {
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const containerClassName = bgColor ? className : `bg-primary-600 ${className}`;

  return (
    <View
      className={containerClassName.trim()}
      style={[
        {
          padding: S.space.marginScreen,
        },
        bgColor ? {backgroundColor: bgColor} : null,
      ]}
    >
      <View className="flex-row items-center" style={{gap: S.space.sm}}>
        <TouchableOpacity
          onPress={onBack}
          activeOpacity={0.8}
          className="items-center justify-center bg-white/15"
          style={{
            width: S.space['5xl'],
            height: S.space['5xl'],
            borderRadius: S.radius.full,
          }}
          hitSlop={{
            top: S.space.sm,
            bottom: S.space.sm,
            left: S.space.sm,
            right: S.space.sm,
          }}
        >
          <Icon name="chevron-back" size={S.icon.lg} color={colors.white} />
        </TouchableOpacity>

        <View className="flex-1" style={{gap: S.space.xs}}>
          <Text
            className="text-white"
            style={{fontSize: S.fs.lg, fontWeight: '700'}}
          >
            {title}
          </Text>

          {subtitle ? (
            <Text
              className="text-white/80"
              style={{fontSize: S.fs.xs, lineHeight: S.fs.xs + S.space.xs}}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
}
