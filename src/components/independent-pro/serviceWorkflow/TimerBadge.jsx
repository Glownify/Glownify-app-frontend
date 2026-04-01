import React from 'react';
import {Text, View, useColorScheme} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {S, getThemeColors} from '../../../theme';
import {moderateScale} from '../../../utils/responsive';
import {formatElapsedTime} from '../../../utils/independentServiceWorkflow';

const ICON_WRAP_SIZE = moderateScale(34);

export default function TimerBadge({
  seconds,
  label = 'Service Timer',
}) {
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);

  return (
    <View
      className="self-center flex-row items-center rounded-full border border-neutral-100 bg-surface"
      style={{
        paddingHorizontal: S.space.lg,
        paddingVertical: S.space.sm,
        gap: S.space.sm,
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: moderateScale(8)},
        shadowOpacity: 0.08,
        shadowRadius: moderateScale(16),
        elevation: 4,
      }}>
      <View
        className="items-center justify-center rounded-full bg-primary-50"
        style={{width: ICON_WRAP_SIZE, height: ICON_WRAP_SIZE}}>
        <Icon name="time-outline" size={S.icon.sm + 2} color={colors.primary[600]} />
      </View>
      <View style={{gap: S.space.xs / 2}}>
        <Text
          className="text-neutral-500"
          style={{fontSize: S.fs.xs, fontWeight: '500'}}>
          {label}
        </Text>
        <Text
          className="text-neutral-900"
          style={{
            fontSize: S.fs.lg,
            fontWeight: '700',
            letterSpacing: 0.4,
          }}>
          {formatElapsedTime(seconds)}
        </Text>
      </View>
    </View>
  );
}