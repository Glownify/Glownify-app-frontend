import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.55;

const DUMMY_IMAGES = [
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80', // pink salon
  'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&q=80', // barber shop
  'https://images.unsplash.com/photo-1470259078422-826894b933aa?w=400&q=80', // beauty salon
];

export default function SalonCardItem({
  salon,
  selectedCategory,
  onPress,
  onFavorite,
  imageIndex = 0,
}) {
  const [isFavorited, setIsFavorited] = useState(false);

  const imageUri =
    salon.image || DUMMY_IMAGES[imageIndex % DUMMY_IMAGES.length];

  const handleFavorite = () => {
    setIsFavorited(prev => !prev);
    onFavorite?.();
  };

  return (
    <TouchableOpacity
      style={{
        width: CARD_WIDTH,
        marginRight: 12,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
      }}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* Image Area */}
      <View style={{ height: CARD_WIDTH * 0.85, position: 'relative' }}>
        <Image
          source={{ uri: imageUri }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />

        {/* Heart — top right */}
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: 32,
            height: 32,
            backgroundColor: '#ffffff',
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOpacity: 0.12,
            shadowRadius: 4,
            elevation: 2,
          }}
          onPress={handleFavorite}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={{ fontSize: 15 }}>{isFavorited ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>

        {/* Category label — bottom left */}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            paddingHorizontal: 10,
            paddingVertical: 6,
            backgroundColor: 'rgba(0,0,0,0.32)',
          }}
        >
          <Text
            style={{
              color: '#ffffff',
              fontSize: 10,
              fontWeight: '700',
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}
          >
            {selectedCategory === 'men' ? 'MEN' : 'WOMEN'}
          </Text>
        </View>
      </View>

      {/* Info */}
      <View style={{ padding: 10 }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '700',
            color: '#1a1a1a',
            marginBottom: 2,
          }}
          numberOfLines={1}
        >
          {salon.name || 'Evita Beauty Parlour'}
        </Text>
        <Text
          style={{
            fontSize: 11,
            color: '#9ca3af',
            marginBottom: 8,
          }}
          numberOfLines={1}
        >
          {salon.category || 'No categories available'}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 11, color: '#6b7280' }}>📍 </Text>
            <Text style={{ fontSize: 11, color: '#6b7280' }}>
              {salon.distance ? `${salon.distance} km` : '321.7 km'}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 11 }}>⭐ </Text>
            <Text style={{ fontSize: 11, fontWeight: '600', color: '#374151' }}>
              {salon.rating || '4.8'} ({salon.reviews || '200'})
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
