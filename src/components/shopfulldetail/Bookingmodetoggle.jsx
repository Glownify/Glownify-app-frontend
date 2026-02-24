// components/BookingModeToggle.jsx
import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';

const ACTIVE_COLOR = '#EA8491';

/**
 * BookingModeToggle
 * Props:
 *   mode      'home' | 'salon'
 *   onChange  (mode: 'home' | 'salon') => void
 */
export default function BookingModeToggle({ mode, onChange }) {
  const translateX = useRef(new Animated.Value(mode === 'home' ? 0 : 1)).current;

  const handlePress = next => {
    Animated.spring(translateX, {
      toValue: next === 'home' ? 0 : 1,
      useNativeDriver: false,
    }).start();
    onChange(next);
  };

  return (
    <View className="mx-md mt-md">
      <View className="flex-row bg-neutral-white rounded-card p-2">
        <TouchableOpacity
          className="flex-1 py-2 items-center rounded-full"
          style={mode === 'home' ? { backgroundColor: ACTIVE_COLOR } : {}}
          onPress={() => handlePress('home')}
        >
          <Text
            className={`text-sm font-semibold ${
              mode === 'home' ? 'text-neutral-white' : 'text-neutral-500'
            }`}
          >
            Salon at Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 py-2 items-center rounded-full"
          style={mode === 'salon' ? { backgroundColor: ACTIVE_COLOR } : {}}
          onPress={() => handlePress('salon')}
        >
          <Text
            className={`text-sm font-semibold ${
              mode === 'salon' ? 'text-neutral-white' : 'text-neutral-500'
            }`}
          >
            Visit Salon
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}