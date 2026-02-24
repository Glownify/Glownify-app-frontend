// components/ServiceItem.jsx
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * ServiceItem
 * Props:
 *   service      { _id, name, duration, salonPrice, homePrice, serviceMode, image, badge }
 *   selectedMode 'home' | 'salon'
 *   cartItems    Array<{ _id }>
 *   onAdd        (service) => void
 */
export default function ServiceItem({ service, selectedMode, cartItems, onAdd }) {
  const price =
    selectedMode === 'home' && service.homePrice != null
      ? service.homePrice
      : service.salonPrice;

  const isInCart = cartItems.some(c => c._id === service._id);
  const isUnavailable = selectedMode === 'home' && service.serviceMode === 'salon';

  return (
    <View
      className={`flex-row items-center py-4 border-b border-gray-50 ${
        isUnavailable ? 'opacity-40' : ''
      }`}
    >
      {/* Thumbnail */}
      <View className="w-[60px] h-[60px] rounded-2xl overflow-hidden bg-gray-100 mr-3 flex-shrink-0">
        {service.image ? (
          <Image
            source={{ uri: service.image }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <View className="flex-1 items-center justify-center bg-pink-50">
            <Icon name="cut-outline" size={22} color="#EA8491" />
          </View>
        )}
      </View>

      {/* Details */}
      <View className="flex-1 gap-0.5">
        {/* Name + badge */}
        <View className="flex-row items-center flex-wrap gap-1.5">
          <Text className="text-gray-900 font-semibold text-sm flex-shrink">
            {service.name}
          </Text>
          {service.badge && (
            <View className="bg-amber-50 border border-amber-100 rounded-md px-1.5 py-0.5">
              <Text className="text-amber-600 text-[10px] font-bold tracking-wide">
                {service.badge}
              </Text>
            </View>
          )}
        </View>

        {/* Duration */}
        <View className="flex-row items-center gap-1">
          <Icon name="time-outline" size={11} color="#9CA3AF" />
          <Text className="text-gray-400 text-xs">{service.duration}</Text>
        </View>

        {/* Price */}
        <Text className="text-gray-900 font-bold text-sm">
          ₹{price.toLocaleString()}
        </Text>
      </View>

      {/* CTA */}
      {!isUnavailable ? (
        <TouchableOpacity
          className={`ml-2 px-4 py-2 rounded-xl border ${
            isInCart
              ? 'bg-[#EA8491] border-[#EA8491]'
              : 'bg-white border-[#EA8491]'
          }`}
          onPress={() => onAdd(service)}
          activeOpacity={0.8}
        >
          <Text
            className={`text-xs font-bold ${
              isInCart ? 'text-white' : 'text-[#EA8491]'
            }`}
          >
            {isInCart ? '✓ Added' : '+ Add'}
          </Text>
        </TouchableOpacity>
      ) : (
        <View className="ml-2 bg-gray-100 rounded-lg px-2.5 py-1.5">
          <Text className="text-gray-400 text-[10px] font-semibold">Salon only</Text>
        </View>
      )}
    </View>
  );
}