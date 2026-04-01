import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {S, getThemeColors} from '../../theme';
import {moderateScale} from '../../utils/responsive';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const HERO_GAP = S.space.sm;
const CARD_PADDING = S.space.lg;
const HERO_IMG_WIDTH =
  (SCREEN_WIDTH - S.space.lg * 2 - CARD_PADDING * 2 - HERO_GAP) / 2;
const HERO_IMG_HEIGHT = HERO_IMG_WIDTH * 1.08;
const THUMB_SIZE = moderateScale(88);
const MAX_THUMBS = 6;

export default function SalonGallery({images = []}) {
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (!images || images.length === 0) {
    return null;
  }

  const heroImages = images.slice(0, 2);
  const remainingImages = images.slice(2);
  const visibleThumbs = remainingImages.slice(0, MAX_THUMBS);
  const hiddenCount = remainingImages.length - visibleThumbs.length;

  const openLightbox = index => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  return (
    <View style={{gap: S.space.md}}>
      <View className="flex-row items-center justify-between">
        <Text
          className="text-neutral-900"
          style={{fontSize: S.fs.md, fontWeight: '700'}}>
          Gallery
        </Text>
        <Text
          className="text-neutral-400"
          style={{fontSize: S.fs.xs, fontWeight: '500'}}>
          {images.length} photos
        </Text>
      </View>

      <View
        className="border border-t-2 border-neutral-100 border-t-primary-600 bg-surface shadow-sm"
        style={{
          borderRadius: S.radius.xl,
          padding: CARD_PADDING,
          gap: S.space.md,
          elevation: 2,
        }}>
        <View className="flex-row" style={{gap: HERO_GAP}}>
          {heroImages.map((uri, index) => (
            <TouchableOpacity
              key={`${uri}-${index}`}
              style={{
                flex: 1,
                height: HERO_IMG_HEIGHT,
                borderRadius: S.radius.xl,
                overflow: 'hidden',
              }}
              onPress={() => openLightbox(index)}
              activeOpacity={0.88}>
              <Image source={{uri}} style={{width: '100%', height: '100%'}} />
              <View className="absolute inset-0 bg-black/10" />
              {index === 0 ? (
                <View
                  className="absolute rounded-xl bg-primary-600"
                  style={{
                    top: S.space.sm,
                    left: S.space.sm,
                    paddingHorizontal: S.space.sm,
                    paddingVertical: S.space.xs,
                  }}>
                  <Text
                    className="text-white"
                    style={{fontSize: S.fs.tiny, fontWeight: '700'}}>
                    Featured
                  </Text>
                </View>
              ) : null}
            </TouchableOpacity>
          ))}
        </View>

        {visibleThumbs.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{gap: S.space.sm}}>
            {visibleThumbs.map((uri, index) => {
              const isLastVisible = index === visibleThumbs.length - 1;
              return (
                <TouchableOpacity
                  key={`${uri}-${index + 2}`}
                  style={{
                    width: THUMB_SIZE,
                    height: THUMB_SIZE,
                    borderRadius: S.radius.lg,
                    overflow: 'hidden',
                  }}
                  onPress={() => openLightbox(index + 2)}
                  activeOpacity={0.85}>
                  <Image
                    source={{uri}}
                    style={{width: '100%', height: '100%'}}
                    resizeMode="cover"
                  />
                  {hiddenCount > 0 && isLastVisible ? (
                    <View className="absolute inset-0 items-center justify-center bg-black/55">
                      <Text
                        className="text-white"
                        style={{fontSize: S.fs.md, fontWeight: '700'}}>
                        +{hiddenCount}
                      </Text>
                    </View>
                  ) : null}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : null}
      </View>

      <Modal
        visible={lightboxIndex !== null}
        transparent
        animationType="fade"
        onRequestClose={closeLightbox}
        statusBarTranslucent>
        <View
          className="flex-1 items-center justify-center"
          style={{backgroundColor: 'rgba(0,0,0,0.92)'}}>
          <Pressable className="absolute inset-0" onPress={closeLightbox} />

          {lightboxIndex !== null ? (
            <View
              className="items-center justify-center"
              style={{
                width: SCREEN_WIDTH,
                height: SCREEN_HEIGHT * 0.78,
              }}>
              <Image
                source={{uri: images[lightboxIndex]}}
                style={{
                  width: SCREEN_WIDTH - S.space.lg * 2,
                  height: '100%',
                  borderRadius: S.radius.xl,
                }}
                resizeMode="contain"
              />

              <View
                className="absolute self-center rounded-full bg-white/15"
                style={{
                  bottom: -S.space.lg,
                  paddingHorizontal: S.space.md,
                  paddingVertical: S.space.xs,
                }}>
                <Text
                  className="text-white"
                  style={{fontSize: S.fs.xs, fontWeight: '600'}}>
                  {lightboxIndex + 1} / {images.length}
                </Text>
              </View>

              {lightboxIndex > 0 ? (
                <TouchableOpacity
                  className="absolute items-center justify-center rounded-full bg-white/15"
                  style={{
                    left: S.space.sm,
                    width: moderateScale(44),
                    height: moderateScale(44),
                  }}
                  onPress={() => setLightboxIndex(index => index - 1)}
                  activeOpacity={0.8}>
                  <Icon name="chevron-back" size={S.icon.md} color={colors.white} />
                </TouchableOpacity>
              ) : null}

              {lightboxIndex < images.length - 1 ? (
                <TouchableOpacity
                  className="absolute items-center justify-center rounded-full bg-white/15"
                  style={{
                    right: S.space.sm,
                    width: moderateScale(44),
                    height: moderateScale(44),
                  }}
                  onPress={() => setLightboxIndex(index => index + 1)}
                  activeOpacity={0.8}>
                  <Icon
                    name="chevron-forward"
                    size={S.icon.md}
                    color={colors.white}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          ) : null}

          <TouchableOpacity
            className="absolute items-center justify-center rounded-full bg-white/15"
            style={{
              top: moderateScale(52),
              right: S.space.lg,
              width: moderateScale(40),
              height: moderateScale(40),
            }}
            onPress={closeLightbox}
            activeOpacity={0.8}>
            <Icon name="close" size={S.icon.sm} color={colors.white} />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
