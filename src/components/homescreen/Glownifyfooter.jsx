import React from 'react';
import { View, Text } from 'react-native';

export default function GlownifyFooter() {
  return (
    <View className="items-center pb-lg pt-lg opacity-50">
      <View className="h-20 w-24 bg-primary-50 rounded-card items-center justify-center border border-primary-100">
        <Text className="text-2xl">✨</Text>
        <Text className="text-primary-600 text-xs font-semibold mt-1">
          Glownify
        </Text>
      </View>
    </View>
  );
}
