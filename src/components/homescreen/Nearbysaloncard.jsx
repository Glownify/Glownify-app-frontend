import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const DUMMY_IMAGES = [
  'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&q=80', // barber/salon
  'https://images.unsplash.com/photo-1560066984-138daaa0c5d4?w=400&q=80', // salon interior
  'https://images.unsplash.com/photo-1633681122994-35f9e9b06f86?w=400&q=80', // luxury salon
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80', // pink salon
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
  const imageUri = image || DUMMY_IMAGES[index % DUMMY_IMAGES.length];

  return (
    <TouchableOpacity
      style={{
        marginHorizontal: 16,
        marginBottom: 12,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#f0f0f0',
        flexDirection: 'row',
        height: 110,
        shadowColor: '#000',
        shadowOpacity: 0.07,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
      }}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Left — Square Thumbnail */}
      <View style={{ width: 110, height: 110, position: 'relative' }}>
        <Image
          source={{ uri: imageUri }}
          style={{ width: 110, height: 110 }}
          resizeMode="cover"
        />

        {/* Heart — top right of image */}
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 7,
            right: 7,
            width: 26,
            height: 26,
            backgroundColor: '#ffffff',
            borderRadius: 13,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOpacity: 0.12,
            shadowRadius: 3,
            elevation: 2,
          }}
          onPress={() => {
            setFavorited(p => !p);
            onFavorite?.();
          }}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
        >
          <Text style={{ fontSize: 12 }}>{favorited ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>

        {/* Discount badge — bottom left */}
        {discount && (
          <View
            style={{
              position: 'absolute',
              bottom: 8,
              left: 8,
              backgroundColor: '#ef4444',
              borderRadius: 8,
              paddingHorizontal: 7,
              paddingVertical: 3,
            }}
          >
            <Text style={{ color: '#ffffff', fontSize: 10, fontWeight: '700' }}>
              {discount} Off
            </Text>
          </View>
        )}
      </View>

      {/* Right — Info */}
      <View style={{ flex: 1, paddingHorizontal: 12, paddingVertical: 12, justifyContent: 'center' }}>
        {/* Tags */}
        <Text
          style={{
            fontSize: 10,
            fontWeight: '700',
            color: '#0d9488',
            letterSpacing: 0.5,
            marginBottom: 4,
          }}
        >
          {tags}
        </Text>

        {/* Name */}
        <Text
          style={{
            fontSize: 13,
            fontWeight: '700',
            color: '#1a1a1a',
            marginBottom: 2,
          }}
          numberOfLines={1}
        >
          {name}
        </Text>

        {/* Address */}
        <Text
          style={{
            fontSize: 11,
            color: '#9ca3af',
            marginBottom: 8,
          }}
          numberOfLines={1}
        >
          {address}
        </Text>

        {/* Rating */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 11, marginRight: 3 }}>⭐</Text>
          <Text style={{ fontSize: 11, fontWeight: '600', color: '#374151' }}>
            {rating}{' '}
            <Text style={{ fontWeight: '400', color: '#9ca3af' }}>({reviews})</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}