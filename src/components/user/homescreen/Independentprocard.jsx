import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useColorScheme,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {S, getThemeColors} from '../../../theme';
import {moderateScale, wp} from '../../../utils/responsive';

const CARD_WIDTH = wp(39);
const IMAGE_HEIGHT = moderateScale(120);

const DUMMY_AVATARS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
];

function AvailabilityDot({available}) {
  return (
    <View
      className={available ? 'bg-white' : 'bg-neutral-200'}
      style={{
        width: S.space.xs + S.space.xs,
        height: S.space.xs + S.space.xs,
        borderRadius: S.radius.full,
      }}
    />
  );
}

export default function IndependentProCard({pro, onPress, index = 0}) {
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const imageUri = pro.image || DUMMY_AVATARS[index % DUMMY_AVATARS.length];
  const isAvailable =
    pro.availability?.toLowerCase().includes('available now') ?? false;

  return (
    <TouchableOpacity
      className="overflow-hidden border border-neutral-100 bg-surface"
      style={{
        width: CARD_WIDTH,
        borderRadius: S.radius.xl,
        shadowColor: colors.black,
        shadowOpacity: 0.07,
        shadowRadius: moderateScale(8),
        shadowOffset: {width: 0, height: 2},
        elevation: 3,
      }}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View className="relative">
        <Image
          source={{uri: imageUri}}
          style={{width: '100%', height: IMAGE_HEIGHT}}
          resizeMode="cover"
        />

        <View
          className={`absolute right-0 top-0 flex-row items-center rounded-full ${
            isAvailable ? 'bg-success-600/90' : 'bg-black/40'
          }`}
          style={{
            margin: S.space.sm,
            paddingHorizontal: S.space.sm,
            paddingVertical: S.space.xs / 2,
            gap: S.space.xs,
          }}
        >
          <AvailabilityDot available={isAvailable} />
          <Text
            className="text-white"
            style={{fontSize: S.fs.tiny, fontWeight: '600'}}
          >
            {isAvailable ? 'Available' : 'Busy'}
          </Text>
        </View>

        <View
          className="absolute bottom-0 left-0 right-0 flex-row items-end justify-between"
          style={{padding: S.space.sm, gap: S.space.sm}}
        >
          <View
            className="flex-row items-center bg-success-700"
            style={{
              paddingHorizontal: S.space.xs,
              paddingVertical: S.space.xs / 2,
              borderRadius: S.radius.md,
              gap: S.space.xs / 2,
            }}
          >
            <Text
              className="text-white"
              style={{fontSize: S.fs.xs, fontWeight: '700'}}
            >
              {pro.rating || '4.5'}
            </Text>
            <Ionicons name="star" size={S.icon.xs} color={colors.white} />
          </View>

          <View
            className="bg-black/30"
            style={{
              paddingHorizontal: S.space.xs,
              paddingVertical: S.space.xs / 2,
              borderRadius: S.radius.md,
            }}
          >
            <Text
              className="text-white"
              style={{fontSize: S.fs.tiny, fontWeight: '600'}}
            >
              {(pro.gender || 'Male').toUpperCase()}
            </Text>
          </View>
        </View>
      </View>

      <View
        className="bg-surface"
        style={{padding: S.space.md, gap: S.space.sm}}
      >
        <Text
          className="text-primary-700"
          numberOfLines={1}
          style={{fontSize: S.fs.sm, fontWeight: '700'}}
        >
          {pro.name || 'Professional'}
        </Text>

        <View className="flex-row items-center" style={{gap: S.space.xs}}>
          <Ionicons
            name="briefcase-outline"
            size={S.icon.xs}
            color={colors.neutral[400]}
          />
          <Text
            className="text-neutral-400"
            style={{fontSize: S.fs.tiny, fontWeight: '500'}}
          >
            {pro.experience || '4 yrs Exp'}
          </Text>
        </View>

        <View className="flex-row items-center" style={{gap: S.space.xs}}>
          <Ionicons
            name="cut-outline"
            size={S.icon.xs}
            color={colors.neutral[400]}
          />
          <Text
            className="text-neutral-400"
            numberOfLines={1}
            style={{fontSize: S.fs.tiny, fontWeight: '500'}}
          >
            {pro.services || 'Hair'}
          </Text>
        </View>

        <TouchableOpacity
          className="items-center justify-center border border-primary-200 bg-primary-50"
          style={{
            minHeight: S.space['5xl'],
            borderRadius: S.radius.lg,
          }}
          onPress={onPress}
          activeOpacity={0.8}
        >
          <Text
            className="text-primary-700"
            style={{fontSize: S.fs.xs, fontWeight: '700'}}
          >
            Book Now
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
