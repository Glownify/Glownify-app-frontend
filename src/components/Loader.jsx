import React from 'react';
import {ActivityIndicator, View, useColorScheme} from 'react-native';
import {S, getThemeColors} from '../theme';

export default function Loader() {
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);

  return (
    <View
      className="items-center justify-center"
      style={{padding: S.space.lg}}>
      <ActivityIndicator size="large" color={colors.primary[600]} />
    </View>
  );
}
