import React from 'react';
import {Text, View, useColorScheme} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {S, getThemeColors} from '../../theme';

const STATUS_DOT_SIZE = Math.max(6, Math.round(S.icon.xs / 1.5));

export default function SalonInfo({name, tagline, openHours}) {
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);

  return (
    <View style={{gap: S.space.sm}}>
      <View className="flex-row items-start justify-between" style={{gap: S.space.sm}}>
        <Text
          className="flex-1 text-neutral-900"
          style={{fontSize: S.fs.xl, fontWeight: '700', lineHeight: S.fs.xxl}}>
          {name}
        </Text>

        <View
          className="flex-row items-center rounded-xl border border-success-100 bg-success-50"
          style={{
            paddingHorizontal: S.space.sm + S.space.xs,
            paddingVertical: S.space.xs,
            gap: S.space.xs,
          }}>
          <View
            className="rounded-full bg-success-500"
            style={{width: STATUS_DOT_SIZE, height: STATUS_DOT_SIZE}}
          />
          <Text
            className="text-success-700"
            style={{fontSize: S.fs.xxs, fontWeight: '700'}}>
            Open
          </Text>
        </View>
      </View>

      {tagline ? (
        <Text className="text-neutral-500" style={{fontSize: S.fs.sm}}>
          {tagline}
        </Text>
      ) : null}

      <View className="flex-row items-center" style={{gap: S.space.xs}}>
        <Icon name="time-outline" size={S.icon.xs + 2} color={colors.neutral[400]} />
        <Text className="text-neutral-400" style={{fontSize: S.fs.xs}}>
          {openHours}
        </Text>
      </View>
    </View>
  );
}
