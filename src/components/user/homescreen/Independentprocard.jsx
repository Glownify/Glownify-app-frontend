// components/Independentprocard.jsx
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const DUMMY_AVATARS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
];

const AvailabilityDot = ({ available }) => (
  <View
    className={`w-2 h-2 rounded-full mr-1.5 ${
      available ? 'bg-green-400' : 'bg-gray-300'
    }`}
  />
);

export default function IndependentProCard({ pro, onPress, index = 0 }) {
  const imageUri = pro.image || DUMMY_AVATARS[index % DUMMY_AVATARS.length];
  const isAvailable =
    pro.availability?.toLowerCase().includes('available now') ?? false;

  return (
    <TouchableOpacity
      className="bg-white rounded-2xl overflow-hidden border border-gray-100"
      style={{
        width: 148,
        shadowColor: '#000',
        shadowOpacity: 0.07,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
      }}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Top image section */}
      <View className="relative">
        <Image
          source={{ uri: imageUri }}
          className="w-full"
          style={{ height: 120 }}
          resizeMode="cover"
        />

        {/* Availability pill — top right */}
        <View
          className={`absolute top-2 right-2 flex-row items-center rounded-full px-2 py-0.5 ${
            isAvailable ? 'bg-green-500/90' : 'bg-black/40'
          }`}
        >
          <View className="w-1.5 h-1.5 rounded-full bg-white mr-1" />
          <Text className="text-white text-[10px] font-semibold">
            {isAvailable ? 'Available' : 'Busy'}
          </Text>
        </View>

        {/* Rating badge — bottom left */}
        <View className="absolute bottom-0 left-0 right-0 px-2 pb-2 flex-row justify-between items-end">
          <View className="bg-green-600 rounded-lg px-1.5 py-0.5 flex-row items-center gap-0.5">
            <Text className="text-white text-[11px] font-bold">
              {pro.rating || '4.5'}
            </Text>
            <Text className="text-[9px]">⭐</Text>
          </View>
          {/* Gender chip */}
          <View className="bg-black/30 rounded-lg px-1.5 py-0.5">
            <Text className="text-white text-[10px] font-semibold">
              {pro.gender || 'MALE'}
            </Text>
          </View>
        </View>
      </View>

      {/* Body */}
      <View className="px-3 pt-2.5 pb-3 gap-1.5">
        {/* Name */}
        <Text className="text-sm font-bold text-primary-700" numberOfLines={1}>
          {pro.name || 'Professional'}
        </Text>

        {/* Experience */}
        <View className="flex-row items-center">
          <Text className="text-[11px] mr-1">🧳</Text>
          <Text className="text-[11px] text-gray-400 font-medium">
            {pro.experience || '4 yrs Exp'}
          </Text>
        </View>

        {/* Services */}
        <View className="flex-row items-center">
          <Text className="text-[11px] mr-1">✂️</Text>
          <Text
            className="text-[11px] text-gray-400 font-medium"
            numberOfLines={1}
          >
            {pro.services || 'Hair'}
          </Text>
        </View>

        {/* Book button */}
        <TouchableOpacity
          className="mt-1 bg-primary-50 border border-primary-200 rounded-xl py-1.5 items-center"
          onPress={onPress}
          activeOpacity={0.8}
        >
          <Text className="text-primary-700 text-xs font-bold">Book Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
