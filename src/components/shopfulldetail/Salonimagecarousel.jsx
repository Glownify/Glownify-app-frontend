// components/SalonImageCarousel.jsx
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;

/**
 * SalonImageCarousel
 * Props:
 *   title       string
 *   images      string[]
 *   rating      number
 *   reviewCount number
 *   distance    string
 *   isFavourite boolean
 *   onBack      () => void
 *   onFavourite () => void
 *   onViewMap   () => void
 */
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  const goToIndex = (i) => {
    scrollRef.current?.scrollTo({ x: i * CARD_WIDTH, animated: true });
    setCurrentIndex(i);
  };

  return (
    <View className="mx-4 mt-4 rounded-3xl overflow-hidden" style={{ height: 280 }}>

      {/* ── Images ── */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={e =>
          setCurrentIndex(Math.round(e.nativeEvent.contentOffset.x / CARD_WIDTH))
        }
        scrollEventThrottle={16}
      >
        {images.map((uri, index) => (
          <Image
            key={index}
            source={{ uri }}
            style={{ width: CARD_WIDTH, height: 280 }}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      {/* ── Gradient overlays ── */}
      {/* Top fade */}
      <View
        pointerEvents="none"
        className="absolute top-0 left-0 right-0"
        style={{
          height: 90,
          background: 'transparent',
          backgroundImage:
            'linear-gradient(to bottom, rgba(0,0,0,0.55), transparent)',
          // RN fallback — use a solid semi-transparent for top
          backgroundColor: undefined,
        }}
      />
      {/* Bottom fade */}
      <View
        pointerEvents="none"
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: 100,
          backgroundColor: 'rgba(0,0,0,0)',
          // layered with the bottom info bar background
        }}
      />

      {/* ── Top bar: back + title + favourite ── */}
      <View className="absolute top-3 left-3 right-3 flex-row justify-between items-center">

        {/* Back button */}
        <TouchableOpacity
          className="w-9 h-9 rounded-full bg-black/40 items-center justify-center"
          onPress={onBack}
          activeOpacity={0.8}
        >
          <Icon name="chevron-back" size={20} color="#fff" />
        </TouchableOpacity>

        {/* Title pill — centered */}
        {title ? (
          <View
            className="flex-1 mx-3 bg-black/35 rounded-full px-4 py-1.5 items-center"
          >
            <Text
              className="text-white text-[14px] font-semibold"
              numberOfLines={1}
            >
              {title}
            </Text>
          </View>
        ) : (
          <View className="flex-1" />
        )}

        {/* Favourite */}
        <TouchableOpacity
          className={`w-9 h-9 rounded-full items-center justify-center ${
            isFavourite ? 'bg-[#EA8491]' : 'bg-black/40'
          }`}
          onPress={onFavourite}
          activeOpacity={0.8}
        >
          <Icon
            name={isFavourite ? 'heart' : 'heart-outline'}
            size={18}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      {/* ── Image counter badge (top-right corner below fav) ── */}
      {/* {images.length > 1 && (
        <View className="absolute top-14 right-3 bg-black/40 rounded-lg px-2 py-0.5">
          <Text className="text-white text-[11px] font-semibold">
            {currentIndex + 1} / {images.length}
          </Text>
        </View>
      )} */}

      {/* ── Dot indicators (tappable) ── */}
      {images.length > 1 && (
        <View className="absolute bottom-[52px] left-0 right-0 flex-row justify-center gap-1.5">
          {images.map((_, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => goToIndex(i)}
              activeOpacity={0.7}
            >
              <View
                style={{
                  height: 4,
                  borderRadius: 2,
                  width: currentIndex === i ? 20 : 6,
                  backgroundColor:
                    currentIndex === i ? '#fff' : 'rgba(255,255,255,0.45)',
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Bottom info row */}
      <View className="absolute bottom-3 left-3 right-3 flex-row items-center justify-between">
        {/* Rating pill */}
        <View className="flex-row items-center bg-black/40 rounded-xl px-3 py-1.5 gap-1">
          <Icon name="star" size={13} color="#FBBF24" />
          <Text className="text-white text-xs font-bold">{rating}</Text>
          <Text className="text-white/70 text-xs">({reviewCount})</Text>
        </View>

        {/* Distance + Map */}
        <View className="flex-row gap-2">
          <View className="flex-row items-center bg-black/40 rounded-xl px-3 py-1.5 gap-1">
            <Icon name="navigate-outline" size={12} color="#fff" />
            <Text className="text-white text-xs">{distance}</Text>
          </View>

          <TouchableOpacity
            className="flex-row items-center bg-[#EA8491] rounded-xl px-3 py-1.5 gap-1"
            onPress={onViewMap}
            activeOpacity={0.85}
          >
            <Icon name="map-outline" size={12} color="#fff" />
            <Text className="text-white text-xs font-semibold">Map</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}