import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const DUMMY_AVATARS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', // male
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80', // female
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80', // male 2
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80', // female 2
];

let avatarIndex = 0;

export default function IndependentProCard({ pro, onPress, index = 0 }) {
  const imageUri = pro.image || DUMMY_AVATARS[index % DUMMY_AVATARS.length];

  return (
    <TouchableOpacity
      style={{
        marginHorizontal: 16,
        marginBottom: 12,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 14,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#f0f0f0',
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
      }}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Avatar with rating badge */}
      <View style={{ marginRight: 14, position: 'relative' }}>
        <Image
          source={{ uri: imageUri }}
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            borderWidth: 2,
            borderColor: '#e6f7f5',
          }}
          resizeMode="cover"
        />
        {/* Rating badge — bottom center of avatar */}
        <View
          style={{
            position: 'absolute',
            bottom: -8,
            alignSelf: 'center',
            left: 0,
            right: 0,
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: '#16a34a',
              borderRadius: 10,
              paddingHorizontal: 6,
              paddingVertical: 2,
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1.5,
              borderColor: '#ffffff',
            }}
          >
            <Text style={{ color: '#ffffff', fontSize: 10, fontWeight: '700', marginRight: 2 }}>
              {pro.rating || '4.5'}
            </Text>
            <Text style={{ fontSize: 8 }}>⭐</Text>
          </View>
        </View>
      </View>

      {/* Details */}
      <View style={{ flex: 1, paddingTop: 2 }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '700',
            color: '#0d9488',
            marginBottom: 6,
          }}
        >
          {pro.name || 'Abhishek'}
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
          <Text style={{ fontSize: 11, color: '#9ca3af', marginRight: 4 }}>📍</Text>
          <Text style={{ fontSize: 11, color: '#9ca3af' }}>
            {pro.availability || 'Not available'}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
          <Text style={{ fontSize: 11, color: '#9ca3af', marginRight: 4 }}>🧳</Text>
          <Text style={{ fontSize: 11, color: '#9ca3af' }}>
            {pro.experience || '4 yrs Exp'}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 11, color: '#9ca3af', marginRight: 4 }}>✂️</Text>
          <Text style={{ fontSize: 11, color: '#9ca3af' }}>
            {pro.services || 'Hairs'} • {pro.gender || 'MALE'}
          </Text>
        </View>
      </View>

      {/* Arrow */}
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          backgroundColor: '#f4faf9',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 8,
        }}
      >
        <Text style={{ color: '#0d9488', fontSize: 18, fontWeight: '300', marginTop: -1 }}>›</Text>
      </View>
    </TouchableOpacity>
  );
}