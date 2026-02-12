import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Header({ title, onBack }) {
  return (
    <View className="flex-row justify-between items-center px-4 py-3 border-b border-[#f0f0f0]">
      {onBack && (
        <TouchableOpacity className="bg-gray-300 p-1.5 rounded-full" onPress={onBack}>
          <Icon name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
      )}
      <Text className="text-base font-bold text-[#333]">{title}</Text>
      <View className="w-6" />
    </View>
  );
}