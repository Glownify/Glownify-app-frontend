import React from 'react';
import {Text, TouchableOpacity, View, useColorScheme} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {S, getThemeColors} from '../../theme';

const PIN_WRAPPER_SIZE = S.size.avatarSm + S.space.sm;

export default function SalonAddressCard({address, onEdit}) {
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);

  return (
    <View
      className="bg-surface border border-t-2 border-neutral-100 border-t-primary-600 shadow-sm"
      style={{borderRadius: S.radius.xl, padding: S.space.lg, gap: S.space.md, elevation: 2}}>
      <Text
        className="text-neutral-400"
        style={{
          fontSize: S.fs.tiny,
          fontWeight: '600',
          letterSpacing: 1,
          textTransform: 'uppercase',
        }}>
        Your Address
      </Text>

      <View className="flex-row items-center" style={{gap: S.space.md}}>
        <View
          className="items-center justify-center rounded-2xl bg-primary-50"
          style={{width: PIN_WRAPPER_SIZE, height: PIN_WRAPPER_SIZE}}>
          <Icon name="location" size={S.icon.sm} color={colors.primary[600]} />
        </View>

        <Text
          className="flex-1 text-neutral-800"
          style={{fontSize: S.fs.sm, fontWeight: '500', lineHeight: S.fs.md + S.space.xs}}
          numberOfLines={2}>
          {address}
        </Text>

        <TouchableOpacity
          className="rounded-xl bg-primary-50"
          style={{
            paddingHorizontal: S.space.md,
            paddingVertical: S.space.sm,
          }}
          onPress={onEdit}
          activeOpacity={0.78}>
          <Text
            className="text-primary-600"
            style={{fontSize: S.fs.xs, fontWeight: '700'}}>
            Edit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
