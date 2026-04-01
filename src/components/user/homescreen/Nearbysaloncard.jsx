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
  'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&q=80',
  'https://images.unsplash.com/photo-1560066984-138daaa0c5d4?w=400&q=80',
  'https://images.unsplash.com/photo-1633681122994-35f9e9b06f86?w=400&q=80',
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80',
];

export default function NearbySalonCard({
  name = "Maroon's Luxury Salon",
  address = 'Kukatpally, Hyderabad',
  tags = 'HAIR • FACIAL',
  rating = '4.8',
  reviews = '3.7k',
  discount = '15%',
  image,
  onPress,
  onFavorite,
  index = 0,
}) {
  const [favorited, setFavorited] = useState(false);
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const imageUri = image || DUMMY_IMAGES[index % DUMMY_IMAGES.length];

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
        elevation: 2,
      }}
      onPress={onPress}
      activeOpacity={0.85}
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
            top: S.space.xs + 3,
            right: S.space.xs + 3,
            width: moderateScale(32),
            height: moderateScale(32),
            borderRadius: S.radius.full,
          }}
          onPress={() => {
            setFavorited(prev => !prev);
            onFavorite?.();
          }}
          hitSlop={{
            top: S.space.sm,
            bottom: S.space.sm,
            left: S.space.sm,
            right: S.space.sm,
          }}
        >
          <Ionicons
            name={favorited ? 'heart' : 'heart-outline'}
            size={S.icon.sm}
            color={favorited ? colors.primary[600] : colors.neutral[500]}
          />
        </TouchableOpacity>

        {discount ? (
          <View
            className="absolute bg-error-500"
            style={{
              top: S.space.sm,
              left: S.space.sm,
              paddingHorizontal: S.space.xs + 3,
              paddingVertical: S.space.xs / 2,
              borderRadius: S.radius.sm,
            }}
          >
            <Text
              className="text-white"
              style={{fontSize: S.fs.tiny, fontWeight: '700'}}
            >
              {discount} Off
            </Text>
          </View>
        ) : null}

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
              2.5 km
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
              {rating} ({reviews})
            </Text>
          </View>
        </View>
      </View>

      <View style={{padding: S.space.sm, gap: S.space.xs}}>
        <Text
          className="text-primary-600"
          numberOfLines={1}
          style={{
            fontSize: S.fs.tiny,
            fontWeight: '700',
            letterSpacing: 0.5,
          }}
        >
          {tags}
        </Text>

        <Text
          className="text-neutral-900"
          numberOfLines={1}
          style={{fontSize: S.fs.sm, fontWeight: '700'}}
        >
          {name}
        </Text>

        <Text
          className="text-neutral-400"
          numberOfLines={1}
          style={{fontSize: S.fs.xs}}
        >
          {address}
        </Text>

        <View className="flex-row flex-wrap" style={{gap: S.space.xs}}>
          {['Hair Trim', 'Shave', 'Facial'].map(service => (
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
