import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.44;

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
        width: CARD_WIDTH,
        marginRight: 12,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#f0f0f0',
        shadowColor: '#000',
        shadowOpacity: 0.07,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
      }}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Top — Square Thumbnail */}
      <View style={{ height: CARD_WIDTH * 0.85, position: 'relative' }}>
        <Image
          source={{ uri: imageUri }}
          style={{ width: '100%', height: '100%' }}
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

        {/* Discount badge — top left */}
        {discount && (
          <View
            style={{
              position: 'absolute',
              top: 8,
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

        {/* Rating and Location — bottom left/right */}
        <View
          style={{
            position: 'absolute',
            bottom: 8,
            left: 8,
            right: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.6)',
              paddingHorizontal: 6,
              paddingVertical: 4,
              borderRadius: 6,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 10, color: '#ffffff' }}>📍 2.5 km</Text>
          </View>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.6)',
              paddingHorizontal: 6,
              paddingVertical: 4,
              borderRadius: 6,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 10, color: '#ffffff' }}>
              ⭐ {rating} ({reviews})
            </Text>
          </View>
        </View>
      </View>

      {/* Bottom — Info */}
      <View style={{ padding: 10 }}>
        {/* Tags */}
        <Text
          style={{
            fontSize: 10,
            fontWeight: '700',
            color: '#0d9488',
            letterSpacing: 0.5,
            marginBottom: 4,
          }}
          numberOfLines={1}
        >
          {tags}
        </Text>

        {/* Name */}
        <Text
          style={{
            fontSize: 14,
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

        {/* Popular Services */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 }}>
          {['Hair Trim', 'Shave', 'Facial'].map((service, idx) => (
            <View
              key={idx}
              style={{
                backgroundColor: '#f3f4f6',
                paddingHorizontal: 6,
                paddingVertical: 2,
                borderRadius: 4,
                marginRight: 4,
                marginBottom: 4,
              }}
            >
              <Text style={{ fontSize: 10, color: '#4b5563' }}>{service}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}
