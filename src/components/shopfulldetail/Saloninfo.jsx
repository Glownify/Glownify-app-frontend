// components/SalonInfo.jsx
import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * SalonInfo
 * Props:
 *   name      string  — salon name
 *   tagline   string  — short subtitle
 *   openHours string  — e.g. "10:00 AM – 8:00 PM"
 */
export default function SalonInfo({ name, tagline, openHours }) {
  return (
    <View className="mx-4 mt-4">

      {/* Name + open badge */}
      <View className="flex-row items-start justify-between gap-2">
        <Text className="flex-1 text-2xl font-bold text-gray-900 leading-tight">
          {name}
        </Text>

        {/* Open badge */}
        <View className="flex-row items-center bg-emerald-50 border border-emerald-100 rounded-lg px-2.5 py-1 gap-1 mt-1">
          <View className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <Text className="text-[11px] font-bold text-emerald-700">Open</Text>
        </View>
      </View>

      {/* Tagline */}
      {tagline ? (
        <Text className="text-gray-400 text-sm mt-1">{tagline}</Text>
      ) : null}

      {/* Hours row */}
      <View className="flex-row items-center mt-2 gap-1.5">
        <Icon name="time-outline" size={13} color="#9CA3AF" />
        <Text className="text-gray-400 text-xs">{openHours}</Text>
      </View>

    </View>
  );
}