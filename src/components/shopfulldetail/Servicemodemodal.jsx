// components/ServiceModeModal.jsx
import React from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * ServiceModeModal
 * Props:
 *   visible        boolean
 *   selectedMode   'home' | 'salon' | null
 *   onSelectMode   (mode: 'home' | 'salon') => void
 *   onConfirm      () => void
 *   onDismiss      () => void
 */
export default function ServiceModeModal({
  visible,
  selectedMode,
  onSelectMode,
  onConfirm,
  onDismiss,
}) {
  if (!visible) return null;

  const Option = ({ mode, icon, label, description }) => {
    const isSelected = selectedMode === mode;
    return (
      <TouchableOpacity
        className={`flex-row items-center p-4 rounded-2xl border-2 mb-3 gap-3 ${
          isSelected ? 'bg-pink-50 border-[#EA8491]' : 'border-gray-100 bg-gray-50'
        }`}
        onPress={() => onSelectMode(mode)}
        activeOpacity={0.75}
      >
        {/* Icon circle */}
        <View
          className={`w-10 h-10 rounded-xl items-center justify-center ${
            isSelected ? 'bg-[#EA8491]' : 'bg-gray-200'
          }`}
        >
          <Icon name={icon} size={18} color={isSelected ? '#fff' : '#9CA3AF'} />
        </View>

        {/* Text */}
        <View className="flex-1">
          <Text
            className={`text-sm font-bold ${
              isSelected ? 'text-[#EA8491]' : 'text-gray-700'
            }`}
          >
            {label}
          </Text>
          <Text className="text-xs text-gray-400 mt-0.5">{description}</Text>
        </View>

        {/* Check */}
        {isSelected && (
          <View className="w-5 h-5 rounded-full bg-[#EA8491] items-center justify-center">
            <Icon name="checkmark" size={12} color="#fff" />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={onDismiss}>
      <View className="absolute inset-0 bg-black/50 justify-end">
        <TouchableWithoutFeedback>
          <View className="bg-white rounded-t-3xl px-5 pt-5 pb-8">

            {/* Handle bar */}
            <View className="w-10 h-1 rounded-full bg-gray-200 self-center mb-5" />

            {/* Header */}
            <View className="flex-row items-center justify-between mb-5">
              <Text className="text-lg font-bold text-gray-900">
                Choose Service Mode
              </Text>
              <TouchableOpacity
                className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
                onPress={onDismiss}
              >
                <Icon name="close" size={16} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* Options */}
            <Option
              mode="salon"
              icon="storefront-outline"
              label="At Salon"
              description="Visit the salon for your service"
            />
            <Option
              mode="home"
              icon="home-outline"
              label="At Home"
              description="Professional comes to your doorstep"
            />

            {/* Confirm */}
            <TouchableOpacity
              className={`mt-2 rounded-2xl py-4 items-center ${
                selectedMode ? 'bg-[#EA8491]' : 'bg-gray-200'
              }`}
              disabled={!selectedMode}
              onPress={onConfirm}
              activeOpacity={0.85}
            >
              <Text
                className={`font-bold text-base ${
                  selectedMode ? 'text-white' : 'text-gray-400'
                }`}
              >
                {selectedMode ? 'Confirm Selection' : 'Select a Mode'}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
}