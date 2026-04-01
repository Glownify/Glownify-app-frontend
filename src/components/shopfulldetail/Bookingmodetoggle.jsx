import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {S} from '../../theme';

const MODES = [
  {key: 'home', label: 'Salon at Home'},
  {key: 'salon', label: 'Visit Salon'},
];

export default function BookingModeToggle({mode, onChange}) {
  return (
    <View
      className="bg-surface border border-neutral-100 shadow-sm"
      style={{borderRadius: S.radius.xl, padding: S.space.xs, elevation: 2}}>
      <View className="flex-row" style={{gap: S.space.xs}}>
        {MODES.map(option => {
          const isActive = mode === option.key;

          return (
            <TouchableOpacity
              key={option.key}
              className={`flex-1 items-center justify-center ${
                isActive ? 'bg-primary-600' : 'bg-base'
              }`}
              style={{
                borderRadius: S.radius.full,
                paddingHorizontal: S.space.md,
                paddingVertical: S.space.sm,
              }}
              activeOpacity={0.85}
              onPress={() => onChange(option.key)}>
              <Text
                className={isActive ? 'text-white' : 'text-neutral-500'}
                style={{fontSize: S.fs.sm, fontWeight: '600'}}>
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
