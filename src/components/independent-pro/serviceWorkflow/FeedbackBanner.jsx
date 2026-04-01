import React from 'react';
import {Text, View, useColorScheme} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {S, getThemeColors} from '../../../theme';
import {moderateScale} from '../../../utils/responsive';

const toneMap = {
  error: {
    containerClassName: 'bg-error-50',
    textClassName: 'text-error-700',
    iconName: 'alert-circle-outline',
    iconColorKey: ['error', 600],
  },
  success: {
    containerClassName: 'bg-success-50',
    textClassName: 'text-success-700',
    iconName: 'checkmark-circle-outline',
    iconColorKey: ['success', 600],
  },
  info: {
    containerClassName: 'bg-info-50',
    textClassName: 'text-info-700',
    iconName: 'information-circle-outline',
    iconColorKey: ['info', 600],
  },
};

export default function FeedbackBanner({message, tone = 'error'}) {
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const config = toneMap[tone] ?? toneMap.error;
  const iconColor = colors[config.iconColorKey[0]][config.iconColorKey[1]];

  return (
    <View
      className={`flex-row items-start rounded-2xl ${config.containerClassName}`}
      style={{padding: S.space.md, gap: S.space.sm}}>
      <Icon name={config.iconName} size={moderateScale(18)} color={iconColor} />
      <Text
        className={`flex-1 ${config.textClassName}`}
        style={{
          fontSize: S.fs.xs,
          fontWeight: '600',
          lineHeight: S.fs.sm + 4,
        }}>
        {message}
      </Text>
    </View>
  );
}