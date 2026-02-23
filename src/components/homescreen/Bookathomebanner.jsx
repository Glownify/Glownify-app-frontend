import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function BookAtHomeBanner({ onPress }) {
  return (
    <View className="px-4 pt-4 pb-2">
      {/* Title */}
      <Text className="text-lg font-bold text-neutral-800 text-center mb-3">
        Book a Beautician/Barber at Home
      </Text>

      {/* Step Card */}
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 16,
          borderWidth: 1,
          borderColor: '#e5e7eb',
          padding: 16,
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
          elevation: 2,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          {/* Icon Container */}
          <View
            style={{
              width: 52,
              height: 52,
              backgroundColor: '#f0faf8',
              borderRadius: 14,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            <Text style={{ fontSize: 26 }}>👩</Text>
          </View>

          {/* Text Content */}
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 11,
                fontWeight: '700',
                color: '#0d9488',
                letterSpacing: 0.8,
                textTransform: 'uppercase',
                marginBottom: 3,
              }}
            >
              STEP 1
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '700',
                color: '#1a1a1a',
                marginBottom: 4,
              }}
            >
              Choose Your Beautician
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#6b7280',
                lineHeight: 18,
              }}
            >
              Browse available beauticians and pick your favorite one.
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}