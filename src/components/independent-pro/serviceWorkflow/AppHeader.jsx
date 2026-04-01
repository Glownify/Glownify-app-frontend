import React from 'react';
import {Text, TouchableOpacity, View, useColorScheme} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import {S, getThemeColors} from '../../../theme';
import {moderateScale} from '../../../utils/responsive';

const ACTION_SIZE = moderateScale(42);

export default function AppHeader({
  title,
  subtitle,
  onBack,
  rightContent,
  showBackButton = true,
}) {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);

  return (
    <LinearGradient
      colors={[colors.primary[600], colors.primary[500]]}
      style={{
        paddingTop: insets.top + S.space.sm,
        paddingHorizontal: S.space.lg,
        paddingBottom: S.space.lg,
        borderBottomLeftRadius: S.radius.xl,
        borderBottomRightRadius: S.radius.xl,
      }}>
      <View className="flex-row items-center" style={{gap: S.space.md}}>
        {showBackButton ? (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onBack}
            className="items-center justify-center rounded-full bg-white/15"
            style={{
              width: ACTION_SIZE,
              height: ACTION_SIZE,
              borderRadius: ACTION_SIZE / 2,
            }}>
            <Icon name="chevron-back" size={S.icon.md + 2} color={colors.white} />
          </TouchableOpacity>
        ) : (
          <View style={{width: ACTION_SIZE, height: ACTION_SIZE}} />
        )}

        <View className="flex-1" style={{gap: S.space.xs / 2}}>
          <Text
            className="text-white"
            style={{fontSize: S.fs.lg, fontWeight: '700'}}>
            {title}
          </Text>
          {subtitle ? (
            <Text
              className="text-white/80"
              style={{fontSize: S.fs.xs, fontWeight: '500'}}>
              {subtitle}
            </Text>
          ) : null}
        </View>

        <View className="items-end" style={{minWidth: ACTION_SIZE}}>
          {rightContent ?? <View style={{width: ACTION_SIZE, height: ACTION_SIZE}} />}
        </View>
      </View>
    </LinearGradient>
  );
}