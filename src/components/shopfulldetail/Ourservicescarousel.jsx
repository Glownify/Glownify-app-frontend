// components/OurServicesCarousel.jsx
import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * OurServicesCarousel
 * Props:
 *   services        Array<{ id, name, image: string|null }>
 *   activeCategory  string | null   — currently selected category id
 *   onSelect        (id: string) => void
 */
export default function OurServicesCarousel({
  services = [],
  activeCategory,
  onSelect,
}) {
  return (
    <View className="mt-5">
      <View className="flex-row items-center justify-between mx-4 mb-3">
        <Text className="text-base font-bold text-gray-900">Our Services</Text>
        <Text className="text-xs text-gray-400 font-medium">
          {services.length} categories
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingRight: 24,
          gap: 14,
        }}
      >
        {services.map(service => {
          const isActive = activeCategory === service.id;
          const initials = service.name.slice(0, 2).toUpperCase();

          return (
            <TouchableOpacity
              key={service.id}
              className="items-center"
              style={{ width: 68 }}
              activeOpacity={0.75}
              onPress={() => onSelect(service.id)}
            >
              {/* Ring + image */}
              <View
                className={`w-[68px] h-[68px] rounded-full p-[2px] ${
                  isActive
                    ? 'border-2 border-[#EA8491]'
                    : 'border-2 border-transparent'
                }`}
              >
                <View className="flex-1 rounded-full overflow-hidden bg-gray-100 items-center justify-center">
                  {service.image ? (
                    <Image
                      source={{ uri: service.image }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  ) : (
                    <View
                      className={`flex-1 w-full items-center justify-center ${
                        isActive ? 'bg-pink-50' : 'bg-gray-100'
                      }`}
                    >
                      <Text
                        className={`text-sm font-bold ${
                          isActive ? 'text-[#EA8491]' : 'text-gray-400'
                        }`}
                      >
                        {initials}
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              {/* Label */}
              <Text
                className={`text-[11px] font-semibold mt-1.5 text-center ${
                  isActive ? 'text-[#EA8491]' : 'text-gray-500'
                }`}
                numberOfLines={2}
              >
                {service.name}
              </Text>

              {/* Active dot */}
              {isActive && (
                <View className="w-1 h-1 rounded-full bg-[#EA8491] mt-1" />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
