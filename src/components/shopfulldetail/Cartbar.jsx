// components/CartBar.jsx
import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * CartBar — fixed bottom bar
 * Props:
 *   cartItems    Array<{ _id, salonPrice, homePrice }>
 *   bookingMode  'home' | 'salon'
 *   onContinue   () => void
 */
export default function CartBar({ cartItems = [], bookingMode, onContinue }) {
  const slideAnim = useRef(new Animated.Value(80)).current;
  const hasItems = cartItems.length > 0;

  const cartTotal = cartItems.reduce(
    (sum, item) =>
      sum +
      (bookingMode === 'home' && item.homePrice != null
        ? item.homePrice
        : item.salonPrice),
    0,
  );

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: 0,
      tension: 60,
      friction: 10,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      className="absolute bottom-0 left-0 right-0"
      style={{ transform: [{ translateY: slideAnim }] }}
    >
      {/* Gradient fade above bar */}
      <View className="h-6 bg-transparent" pointerEvents="none" />

      <View className="bg-white px-4 pt-3 pb-5 border-t border-gray-100 shadow-lg">
        {hasItems ? (
          <TouchableOpacity
            className="bg-[#EA8491] rounded-2xl flex-row items-center justify-between px-5 py-4"
            onPress={onContinue}
            activeOpacity={0.85}
          >
            {/* Left: price + count badge */}
            <View className="flex-row items-center gap-2">
              <View className="bg-white/20 rounded-lg px-2 py-0.5">
                <Text className="text-white text-xs font-bold">
                  {cartItems.length} {cartItems.length > 1 ? 'items' : 'item'}
                </Text>
              </View>
              <Text className="text-white text-base font-semibold">
                ₹{cartTotal.toLocaleString()}
              </Text>
            </View>

            {/* Right: CTA */}
            <View className="flex-row items-center gap-1.5">
              <Text className="text-white font-bold text-base">Continue</Text>
              <Icon name="arrow-forward" size={16} color="white" />
            </View>
          </TouchableOpacity>
        ) : (
          <View className="rounded-2xl border-2 border-dashed border-gray-200 py-4 items-center flex-row justify-center gap-2">
            <Icon name="bag-outline" size={18} color="#D1D5DB" />
            <Text className="text-gray-400 font-semibold text-sm">
              Select a service to continue
            </Text>
          </View>
        )}
      </View>
    </Animated.View>
  );
}