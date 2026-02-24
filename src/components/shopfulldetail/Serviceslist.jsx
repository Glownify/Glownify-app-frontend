// components/ServicesList.jsx
import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ServiceItem from './Serviceitem';

/**
 * ServicesList
 * Props:
 *   services      Array<service>   — services for the active category
 *   selectedMode  'home' | 'salon'
 *   cartItems     Array<{ _id }>
 *   onAdd         (service) => void
 */
export default function ServicesList({ services = [], selectedMode, cartItems, onAdd }) {
  const availableCount = services.filter(
    s => !(selectedMode === 'home' && s.serviceMode === 'salon'),
  ).length;

  return (
    <View className="mx-4 mt-6">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-base font-bold text-gray-900">All Services</Text>

        <View className="flex-row items-center gap-1.5">
          {/* Available count chip */}
          {/* <View className="bg-pink-50 border border-pink-100 rounded-lg px-2.5 py-1">
            <Text className="text-[#EA8491] text-xs font-semibold">
              {availableCount} available
            </Text>
          </View> */}
          {/* Total */}
          <View className="bg-gray-100 rounded-lg px-2.5 py-1">
            <Text className="text-gray-500 text-xs font-medium">
              {services.length} total
            </Text>
          </View>
        </View>
      </View>

      {/* List card */}
      <View className="bg-white rounded-2xl border border-slate-100 border-t-2 border-t-pink-500 shadow-sm px-4 overflow-hidden">
        
        {services.length > 0 ? (
          services.map((service, index) => (
            <ServiceItem
              key={service._id}
              service={service}
              selectedMode={selectedMode}
              cartItems={cartItems}
              onAdd={onAdd}
            />
          ))
        ) : (
          <View className="py-10 items-center gap-2">
            <View className="w-14 h-14 rounded-full bg-gray-100 items-center justify-center">
              <Icon name="cut-outline" size={26} color="#D1D5DB" />
            </View>
            <Text className="text-gray-400 text-sm font-medium">
              No services in this category
            </Text>
            <Text className="text-gray-300 text-xs">
              Try selecting a different category
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}