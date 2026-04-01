import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {S} from '../../../theme';

export default function BookAtHomeBanner({onPress}) {
  return (
    <View style={{paddingHorizontal: S.space.marginScreen, gap: S.space.md}}>
      <Text
        className="text-center text-neutral-800"
        style={{fontSize: S.fs.lg, fontWeight: '700'}}
      >
        Book a Beautician/Barber at Home
      </Text>

      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        className="border border-neutral-200 bg-surface shadow-sm"
        style={{
          borderRadius: S.radius.xl,
          padding: S.space.lg,
        }}
      >
        <View className="flex-row items-start" style={{gap: S.space.md}}>
          <View
            className="items-center justify-center bg-success-50"
            style={{
              width: S.size.avatarMd,
              height: S.size.avatarMd,
              borderRadius: S.radius.lg,
            }}
          >
            <Text style={{fontSize: S.fs.xl}}>{'\u{1F469}'}</Text>
          </View>

          <View className="flex-1" style={{gap: S.space.xs}}>
            <Text
              className="text-success-700"
              style={{
                fontSize: S.fs.tiny,
                fontWeight: '700',
                letterSpacing: 0.8,
                textTransform: 'uppercase',
              }}
            >
              Step 1
            </Text>
            <Text
              className="text-neutral-900"
              style={{fontSize: S.fs.sm, fontWeight: '700'}}
            >
              Choose Your Beautician
            </Text>
            <Text
              className="text-neutral-500"
              style={{fontSize: S.fs.xs, lineHeight: S.fs.xs + S.space.sm}}
            >
              Browse available beauticians and pick your favorite one.
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
