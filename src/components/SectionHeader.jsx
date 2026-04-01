import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {S} from '../theme';

export default function SectionHeader({title, showViewAll = true, onPress}) {
  return (
    <View
      className="flex-row items-center justify-between"
      style={{
        paddingHorizontal: S.space.lg,
        paddingVertical: S.space.sm,
        gap: S.space.md,
      }}>
      <Text
        className="flex-1 text-neutral-900"
        style={{fontSize: S.fs.lg, fontWeight: '700'}}>
        {title}
      </Text>

      {showViewAll ? (
        <TouchableOpacity onPress={onPress} activeOpacity={0.75}>
          <Text
            className="text-primary-600"
            style={{fontSize: S.fs.sm, fontWeight: '600'}}>
            View all
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
