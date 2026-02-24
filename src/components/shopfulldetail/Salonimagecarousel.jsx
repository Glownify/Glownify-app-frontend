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
const CARD_WIDTH = width - 32; // 16px margin each side

/**
 * SalonImageCarousel
 * Props:
 *   images      string[]   — gallery image URIs
 *   rating      number     — e.g. 4.8
 *   reviewCount number     — e.g. 120
 *   distance    string     — e.g. "2.5 km away"
 *   isFavourite boolean
 *   onBack      () => void
 *   onFavourite () => void
 *   onViewMap   () => void
 */
export default function SalonImageCarousel({
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

  return (
    <View className="mx-4 mt-4 rounded-3xl overflow-hidden" style={{ height: 260 }}>

      {/* Scrollable images */}
      <ScrollView
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
            style={{ width: CARD_WIDTH, height: 260 }}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      {/* Dark gradient overlay (bottom) */}
      <View
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: 'transparent',
          // RN doesn't support CSS gradient; use a semi-opaque overlay
          backgroundColor: 'rgba(0,0,0,0)',
        }}
        pointerEvents="none"
      />

      {/* Top controls — back & favourite */}
      <View className="absolute top-3 left-3 right-3 flex-row justify-between">
        <TouchableOpacity
          className="w-9 h-9 rounded-full bg-black/30 items-center justify-center"
          onPress={onBack}
          activeOpacity={0.8}
        >
          <Icon name="chevron-back" size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          className={`w-9 h-9 rounded-full items-center justify-center ${
            isFavourite ? 'bg-[#EA8491]' : 'bg-black/30'
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

      {/* Dot indicators */}
      {images.length > 1 && (
        <View className="absolute bottom-14 left-0 right-0 flex-row justify-center gap-1">
          {images.map((_, i) => (
            <View
              key={i}
              className={`h-1 rounded-full ${
                currentIndex === i ? 'bg-white w-5' : 'bg-white/40 w-1'
              }`}
            />
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