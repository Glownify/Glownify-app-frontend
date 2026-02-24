// components/SalonAddressCard.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * SalonAddressCard
 * Props:
 *   address   string      — display address
 *   onEdit    () => void  — triggered when "Edit" is pressed
 */
export default function SalonAddressCard({ address, onEdit }) {
  return (
    <View className="mx-4 mt-3 bg-white rounded-2xl border border-slate-100 border-t-2 border-t-pink-500 shadow-sm overflow-hidden">

      {/* Top label strip */}
      <View className="bg-gray-50 px-4 py-1.5 border-b border-gray-100">
        <Text className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase">
          Your Address
        </Text>
      </View>

      {/* Address row */}
      <View className="flex-row items-center px-4 py-3 gap-3">

        {/* Pin icon */}
        <View className="w-9 h-9 rounded-xl bg-pink-50 items-center justify-center flex-shrink-0">
          <Icon name="location" size={17} color="#EA8491" />
        </View>

        {/* Address text */}
        <Text
          className="flex-1 text-gray-800 text-sm font-medium leading-5"
          numberOfLines={2}
        >
          {address}
        </Text>

        {/* Edit button */}
        <TouchableOpacity
          className="bg-pink-50 rounded-lg px-3 py-1.5"
          onPress={onEdit}
          activeOpacity={0.7}
        >
          <Text className="text-[#EA8491] text-xs font-bold">Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}