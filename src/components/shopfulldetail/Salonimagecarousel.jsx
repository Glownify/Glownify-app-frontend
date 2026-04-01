import React, {useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {S, getThemeColors} from '../../theme';
import {moderateScale} from '../../utils/responsive';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - S.space.lg * 2;
const CARD_HEIGHT = moderateScale(280);
const TOP_CONTROL_SIZE = S.icon.lg + S.space.sm;

export default function SalonImageCarousel({
  title = '',
  images = [],
  rating,
  reviewCount,
  distance,
  isFavourite = false,
  onBack,
  onFavourite,
  onViewMap,
}) {
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  const goToIndex = index => {
    scrollRef.current?.scrollTo({x: index * CARD_WIDTH, animated: true});
    setCurrentIndex(index);
  };

  return (
    <View
      className="overflow-hidden rounded-3xl border border-neutral-100 bg-neutral-100"
      style={{height: CARD_HEIGHT, borderRadius: S.radius.xl}}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={event =>
          setCurrentIndex(
            Math.round(event.nativeEvent.contentOffset.x / CARD_WIDTH),
          )
        }
        scrollEventThrottle={16}>
        {images.map((uri, index) => (
          <Image
            key={`${uri}-${index}`}
            source={{uri}}
            style={{width: CARD_WIDTH, height: CARD_HEIGHT}}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      <LinearGradient
        colors={['rgba(0,0,0,0.62)', 'rgba(0,0,0,0.08)', 'rgba(0,0,0,0)']}
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: moderateScale(108),
        }}
      />

      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)']}
        pointerEvents="none"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: moderateScale(132),
        }}
      />

      <View
        className="absolute flex-row items-center justify-between"
        style={{top: S.space.lg, left: S.space.lg, right: S.space.lg}}>
        <TouchableOpacity
          className="items-center justify-center rounded-full bg-black/40"
          style={{width: TOP_CONTROL_SIZE, height: TOP_CONTROL_SIZE}}
          onPress={onBack}
          activeOpacity={0.8}>
          <Icon name="chevron-back" size={S.icon.md} color={colors.white} />
        </TouchableOpacity>

        {title ? (
          <View
            className="flex-1 items-center rounded-full bg-black/35"
            style={{
              marginHorizontal: S.space.md,
              paddingHorizontal: S.space.lg,
              paddingVertical: S.space.sm,
            }}>
            <Text
              className="text-white"
              style={{fontSize: S.fs.sm, fontWeight: '600'}}
              numberOfLines={1}>
              {title}
            </Text>
          </View>
        ) : (
          <View className="flex-1" />
        )}

        <TouchableOpacity
          className={`items-center justify-center rounded-full ${
            isFavourite ? 'bg-primary-600' : 'bg-black/40'
          }`}
          style={{width: TOP_CONTROL_SIZE, height: TOP_CONTROL_SIZE}}
          onPress={onFavourite}
          activeOpacity={0.8}>
          <Icon
            name={isFavourite ? 'heart' : 'heart-outline'}
            size={S.icon.sm}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>

      {images.length > 1 ? (
        <View
          className="absolute left-0 right-0 flex-row justify-center"
          style={{bottom: moderateScale(54), gap: S.space.xs}}>
          {images.map((_, index) => {
            const isActive = currentIndex === index;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => goToIndex(index)}
                activeOpacity={0.75}>
                <View
                  style={{
                    width: isActive ? S.space.xl : S.space.xs + 2,
                    height: S.space.xs,
                    borderRadius: S.radius.full,
                    backgroundColor: isActive
                      ? colors.white
                      : 'rgba(255,255,255,0.45)',
                  }}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      ) : null}

      <View
        className="absolute flex-row items-center justify-between"
        style={{left: S.space.lg, right: S.space.lg, bottom: S.space.lg}}>
        <View
          className="flex-row items-center rounded-xl bg-black/40"
          style={{
            paddingHorizontal: S.space.md,
            paddingVertical: S.space.sm,
            gap: S.space.xs,
          }}>
          <Icon name="star" size={S.icon.xs + 2} color={colors.warning[500]} />
          <Text
            className="text-white"
            style={{fontSize: S.fs.xs, fontWeight: '700'}}>
            {rating}
          </Text>
          <Text className="text-white/70" style={{fontSize: S.fs.xs}}>
            ({reviewCount})
          </Text>
        </View>

        <View className="flex-row" style={{gap: S.space.sm}}>
          <View
            className="flex-row items-center rounded-xl bg-black/40"
            style={{
              paddingHorizontal: S.space.md,
              paddingVertical: S.space.sm,
              gap: S.space.xs,
            }}>
            <Icon
              name="navigate-outline"
              size={S.icon.xs + 2}
              color={colors.white}
            />
            <Text className="text-white" style={{fontSize: S.fs.xs}}>
              {distance}
            </Text>
          </View>

          <TouchableOpacity
            className="flex-row items-center rounded-xl bg-primary-600"
            style={{
              paddingHorizontal: S.space.md,
              paddingVertical: S.space.sm,
              gap: S.space.xs,
            }}
            onPress={onViewMap}
            activeOpacity={0.85}>
            <Icon name="map-outline" size={S.icon.xs + 2} color={colors.white} />
            <Text
              className="text-white"
              style={{fontSize: S.fs.xs, fontWeight: '600'}}>
              Map
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
