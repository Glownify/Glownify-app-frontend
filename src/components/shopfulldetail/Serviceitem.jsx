// components/ServiceItem.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * ServiceItem
 * Props:
 *   service      { _id, name, duration, salonPrice, homePrice, serviceMode, image, badge }
 *   selectedMode 'home' | 'salon'
 *   cartItems    Array<{ _id }>
 *   onAdd        (service) => void
 */
export default function ServiceItem({
  service,
  selectedMode,
  cartItems,
  onAdd,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const price =
    selectedMode === 'home' && service.homePrice != null
      ? service.homePrice
      : service.salonPrice;

  const isInCart = cartItems.some(c => c._id === service._id);
  const isUnavailable =
    selectedMode === 'home' && service.serviceMode === 'salon';

  return (
    <>
      {/* ── Service Row ── */}
      <View
        className={`flex-row items-center py-4 border-b border-gray-50 ${
          isUnavailable ? 'opacity-40' : ''
        }`}
      >
        {/* Thumbnail */}
        <View className="w-[60px] h-[60px] rounded-2xl overflow-hidden bg-gray-100 mr-3 flex-shrink-0 relative">
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

          {/* Info Icon over image */}
          <TouchableOpacity
            className="absolute bottom-1 right-1 w-5 h-5 bg-black/50 rounded-full items-center justify-center"
            activeOpacity={0.8}
            onPress={() => setModalVisible(true)}
          >
            <Icon name="information" size={12} color="#fff" />
          </TouchableOpacity>
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
            <Text className="text-gray-400 text-[10px] font-semibold">
              Salon only
            </Text>
          </View>
        )}
      </View>

      {/* ── Service Info Modal ── */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        statusBarTranslucent
        onRequestClose={() => setModalVisible(false)}
      >
        {/* Backdrop */}
        <Pressable
          className="flex-1 bg-black/40 justify-end"
          onPress={() => setModalVisible(false)}
        >
          {/* Sheet — stop propagation so tapping inside doesn't close */}
          <Pressable onPress={e => e.stopPropagation()}>
            <View className="bg-white rounded-t-3xl overflow-hidden">
              {/* Drag handle */}
              <View className="items-center pt-3 pb-1">
                <View className="w-10 h-1 rounded-full bg-gray-200" />
              </View>

              <ScrollView
                className="px-5 pt-3 pb-8"
                showsVerticalScrollIndicator={false}
                bounces={false}
              >
                {/* Hero image */}
                {service.image && (
                  <View className="w-full h-44 rounded-2xl overflow-hidden mb-4 bg-gray-100">
                    <Image
                      source={{ uri: service.image }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  </View>
                )}

                {/* Name + badge */}
                <View className="flex-row items-center flex-wrap gap-2 mb-1">
                  <Text className="text-gray-900 font-bold text-lg flex-shrink">
                    {service.name}
                  </Text>
                  {service.badge && (
                    <View className="bg-amber-50 border border-amber-100 rounded-md px-2 py-0.5">
                      <Text className="text-amber-600 text-xs font-bold tracking-wide">
                        {service.badge}
                      </Text>
                    </View>
                  )}
                </View>

                {/* Meta row */}
                <View className="flex-row items-center gap-4 mb-4">
                  <View className="flex-row items-center gap-1">
                    <Icon name="time-outline" size={13} color="#9CA3AF" />
                    <Text className="text-gray-400 text-xs">
                      {service.duration}
                    </Text>
                  </View>

                  {service.serviceMode === 'both' ? (
                    <View className="flex-row items-center gap-1">
                      <Icon name="location-outline" size={13} color="#9CA3AF" />
                      <Text className="text-gray-400 text-xs">
                        Home &amp; Salon
                      </Text>
                    </View>
                  ) : (
                    <View className="flex-row items-center gap-1">
                      <Icon name="location-outline" size={13} color="#9CA3AF" />
                      <Text className="text-gray-400 text-xs capitalize">
                        {service.serviceMode} only
                      </Text>
                    </View>
                  )}
                </View>

                {/* Description */}
                <Text className="text-gray-500 text-sm leading-relaxed mb-5">
                  A premium service tailored for you. Our skilled professionals
                  ensure the highest quality experience, using top-of-the-line
                  products suited to your needs.
                </Text>

                {/* Pricing card */}
                <View className="bg-pink-50 rounded-2xl p-4 mb-6 gap-2">
                  <Text className="text-gray-700 font-semibold text-xs uppercase tracking-widest mb-1">
                    Pricing
                  </Text>

                  {service.salonPrice != null && (
                    <View className="flex-row justify-between items-center">
                      <View className="flex-row items-center gap-1.5">
                        <Icon name="storefront-outline" size={14} color="#EA8491" />
                        <Text className="text-gray-600 text-sm">At Salon</Text>
                      </View>
                      <Text className="text-gray-900 font-bold text-sm">
                        ₹{service.salonPrice.toLocaleString()}
                      </Text>
                    </View>
                  )}

                  {service.homePrice != null && (
                    <View className="flex-row justify-between items-center">
                      <View className="flex-row items-center gap-1.5">
                        <Icon name="home-outline" size={14} color="#EA8491" />
                        <Text className="text-gray-600 text-sm">At Home</Text>
                      </View>
                      <Text className="text-gray-900 font-bold text-sm">
                        ₹{service.homePrice.toLocaleString()}
                      </Text>
                    </View>
                  )}
                </View>

                {/* Action buttons */}
                <View className="flex-row gap-3">
                  <TouchableOpacity
                    className="flex-1 py-3 rounded-xl border border-gray-200 items-center"
                    activeOpacity={0.7}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text className="text-gray-500 font-semibold text-sm">
                      Close
                    </Text>
                  </TouchableOpacity>

                  {!isUnavailable && (
                    <TouchableOpacity
                      className={`flex-1 py-3 rounded-xl items-center ${
                        isInCart ? 'bg-[#EA8491]' : 'bg-[#EA8491]'
                      }`}
                      activeOpacity={0.8}
                      onPress={() => {
                        onAdd(service);
                        setModalVisible(false);
                      }}
                    >
                      <Text className="text-white font-bold text-sm">
                        {isInCart ? '✓ Added' : '+ Add to Cart'}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </ScrollView>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}