import React from 'react';
import {Text, View, useColorScheme} from 'react-native';

import {S, getThemeColors} from '../../../theme';
import {moderateScale} from '../../../utils/responsive';

const toneMap = {
  success: {
    containerClassName: 'bg-success-50',
    textClassName: 'text-success-700',
    dotColorKey: ['success', 500],
  },
  error: {
    containerClassName: 'bg-error-50',
    textClassName: 'text-error-700',
    dotColorKey: ['error', 500],
  },
  accent: {
    containerClassName: 'bg-warning-50',
    textClassName: 'text-warning-700',
    dotColorKey: ['warning', 600],
  },
};

export default function StatusIndicator({label, tone = 'success'}) {
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const config = toneMap[tone] ?? toneMap.success;
  const dotColor = colors[config.dotColorKey[0]][config.dotColorKey[1]];

  return (
    <View
      className={`self-start flex-row items-center rounded-full ${config.containerClassName}`}
      style={{
        paddingHorizontal: S.space.md,
        paddingVertical: S.space.xs,
        gap: S.space.xs,
      }}>
      <View
        style={{
          width: moderateScale(8),
          height: moderateScale(8),
          borderRadius: moderateScale(4),
          backgroundColor: dotColor,
        }}
      />
      <Text
        className={config.textClassName}
        style={{fontSize: S.fs.xs, fontWeight: '700'}}>
        {label}
      </Text>
    </View>
  );
}