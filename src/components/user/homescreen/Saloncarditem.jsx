import React, {useState} from 'react';
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

const CARD_WIDTH = wp(44);
const THUMB_HEIGHT = CARD_WIDTH * 0.85;

const DUMMY_IMAGES = [
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80',
  'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&q=80',
  'https://images.unsplash.com/photo-1470259078422-826894b933aa?w=400&q=80',
];

export default function SalonCardItem({
  salon,
  onPress,
  onFavorite,
  imageIndex = 0,
}) {
  const [isFavorited, setIsFavorited] = useState(false);
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const imageUri =
    salon.image || DUMMY_IMAGES[imageIndex % DUMMY_IMAGES.length];

  const handleFavorite = () => {
    setIsFavorited(prev => !prev);
    onFavorite?.();
  };

  return (
    <TouchableOpacity
      className="overflow-hidden bg-surface shadow-sm"
      style={{
        width: CARD_WIDTH,
        borderRadius: S.radius.xl,
        shadowColor: colors.black,
        shadowOpacity: 0.08,
        shadowRadius: moderateScale(8),
        shadowOffset: {width: 0, height: 2},
        elevation: 3,
      }}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View className="relative" style={{height: THUMB_HEIGHT}}>
        <Image
          source={{uri: imageUri}}
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
        />

        <TouchableOpacity
          className="absolute items-center justify-center bg-surface shadow-sm"
          style={{
            top: S.space.sm,
            right: S.space.sm,
            width: moderateScale(32),
            height: moderateScale(32),
            borderRadius: S.radius.full,
          }}
          onPress={handleFavorite}
          hitSlop={{
            top: S.space.sm,
            bottom: S.space.sm,
            left: S.space.sm,
            right: S.space.sm,
          }}
        >
          <Ionicons
            name={isFavorited ? 'heart' : 'heart-outline'}
            size={S.icon.sm}
            color={isFavorited ? colors.primary[600] : colors.neutral[500]}
          />
        </TouchableOpacity>

        <View
          className="absolute bottom-0 left-0 right-0 flex-row items-center justify-between"
          style={{padding: S.space.sm, gap: S.space.sm}}
        >
          <View
            className="flex-row items-center bg-black/60"
            style={{
              paddingHorizontal: S.space.xs + 2,
              paddingVertical: S.space.xs / 2 + 1,
              borderRadius: S.radius.sm,
              gap: S.space.xs / 2,
            }}
          >
            <Ionicons name="location" size={S.icon.xs} color={colors.white} />
            <Text className="text-white" style={{fontSize: S.fs.tiny}}>
              {salon.distance ? `${salon.distance} km` : '321.7 km'}
            </Text>
          </View>
          <View
            className="flex-row items-center bg-black/60"
            style={{
              paddingHorizontal: S.space.xs + 2,
              paddingVertical: S.space.xs / 2 + 1,
              borderRadius: S.radius.sm,
              gap: S.space.xs / 2,
            }}
          >
            <Ionicons name="star" size={S.icon.xs} color={colors.white} />
            <Text className="text-white" style={{fontSize: S.fs.tiny}}>
              {salon.rating || '4.8'} ({salon.reviews || '200'})
            </Text>
          </View>
        </View>
      </View>

      <View style={{padding: S.space.sm, gap: S.space.xs}}>
        <Text
          className="text-neutral-900"
          numberOfLines={1}
          style={{fontSize: S.fs.sm, fontWeight: '700'}}
        >
          {salon.name || 'Evita Beauty Parlour'}
        </Text>
        <Text
          className="text-neutral-400"
          numberOfLines={1}
          style={{fontSize: S.fs.xs}}
        >
          {salon.category || 'No categories available'}
        </Text>

        <View className="flex-row flex-wrap" style={{gap: S.space.xs}}>
          {['Haircut', 'Massage', 'Facial'].map(service => (
            <View
              key={service}
              className="bg-neutral-100"
              style={{
                paddingHorizontal: S.space.xs + 2,
                paddingVertical: S.space.xs / 2,
                borderRadius: S.radius.sm,
              }}
            >
              <Text
                className="text-neutral-600"
                style={{fontSize: S.fs.tiny}}
              >
                {service}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}
