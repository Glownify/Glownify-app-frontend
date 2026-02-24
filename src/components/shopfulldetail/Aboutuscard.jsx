// components/AboutUsCard.jsx
import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * AboutUsCard
 * Props:
 *   aboutText   string    — body text
 *   badges      string[]  — highlight badges e.g. ["100% Hygienic", "Est. 2015"]
 *   expanded    boolean   — controlled open/close
 *   onToggle    () => void
 */
export default function AboutUsCard({
  aboutText,
  badges = [],
  expanded,
  onToggle,
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: expanded ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start();

    if (expanded) {
      fadeAnim.setValue(0);
      slideAnim.setValue(-8);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 280,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 60,
          friction: 10,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [expanded]);

  const chevronRotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View className="mx-4 mt-3 bg-white rounded-2xl border-t-2 border-t-pink-500 overflow-hidden border border-slate-100 shadow-sm elevation-3">

      {/* Header */}
      <TouchableOpacity
        className="flex-row items-center px-4 py-3.5 gap-2.5"
        onPress={onToggle}
        activeOpacity={0.75}
      >
        {/* Icon pill */}
        <View className="w-8 h-8 rounded-lg bg-pink-50 items-center justify-center">
          <Icon name="storefront-outline" size={16} color="#ec4899" />
        </View>

        <Text className="flex-1 text-sm font-bold text-gray-900 tracking-tight">
          About Us
        </Text>

        {/* Animated chevron — transform must stay inline */}
        <Animated.View style={{ transform: [{ rotate: chevronRotate }] }}>
          <View
            className={`w-[26px] h-[26px] rounded-full items-center justify-center ${
              expanded ? 'bg-pink-50' : 'bg-gray-100'
            }`}
          >
            <Icon
              name="chevron-down"
              size={14}
              color={expanded ? '#ec4899' : '#9CA3AF'}
            />
          </View>
        </Animated.View>
      </TouchableOpacity>

      {/* Divider */}
      {expanded && <View className="h-px bg-gray-50 mx-4" />}

      {/* Collapsible body — opacity/translateY must stay inline */}
      {expanded && (
        <Animated.View
          className="px-4 pt-3 pb-4"
          style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
        >
          <Text className="text-[13px] text-gray-500 leading-5">{aboutText}</Text>

          {badges.length > 0 && (
            <View className="flex-row flex-wrap mt-3 gap-2">
              {badges.map((badge, i) => (
                <View
                  key={i}
                  className="flex-row items-center gap-1 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-1"
                >
                  <Icon name="checkmark-circle" size={13} color="#10b981" />
                  <Text className="text-[11px] font-semibold text-emerald-900 tracking-wide">
                    {badge}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </Animated.View>
      )}
    </View>
  );
}