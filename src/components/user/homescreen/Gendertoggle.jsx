import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function GenderToggle({ selectedCategory, onSelect }) {
  return (
    <View className="bg-neutral-white py-3 px-md">
      <View className="flex-row bg-primary-50 rounded-button p-2">
        <TouchableOpacity
          className={`flex-1 flex-row items-center justify-center py-3 px-md rounded-button ${
            selectedCategory === 'women' ? 'bg-primary' : ''
          }`}
          onPress={() => onSelect('women')}
          activeOpacity={0.8}
        >
          <Text className="text-base mr-2">👩</Text>
          <Text
            className={`text-base font-semibold ${
              selectedCategory === 'women'
                ? 'text-neutral-white'
                : 'text-neutral-600'
            }`}
          >
            Women
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 flex-row items-center justify-center py-3 px-md rounded-button ${
            selectedCategory === 'men' ? 'bg-primary' : ''
          }`}
          onPress={() => onSelect('men')}
          activeOpacity={0.8}
        >
          <Text className="text-base mr-2">👨</Text>
          <Text
            className={`text-base font-semibold ${
              selectedCategory === 'men'
                ? 'text-neutral-white'
                : 'text-neutral-600'
            }`}
          >
            Men
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
