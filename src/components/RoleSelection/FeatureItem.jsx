import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * FeatureItem - A single checkmark feature row
 *
 * @param {string} title       - Bold feature title
 * @param {string} description - Subtitle/description text
 * @param {string} iconName    - Ionicons icon name (default: 'checkmark-circle')
 * @param {string} iconColor   - Icon color (default: '#4CAF50')
 * @param {number} iconSize    - Icon size (default: 20)
 * @param {string} className   - Additional NativeWind className for the wrapper
 */
export default function FeatureItem({
  title,
  description,
  iconName = 'checkmark-circle',
  iconColor = '#4CAF50',
  iconSize = 20,
  className = '',
}) {
  return (
    <View className={`flex-row items-start mb-3 gap-2.5 ${className}`}>
      <Icon name={iconName} size={iconSize} color={iconColor} />
      <View className="flex-1">
        <Text className="text-[13px] font-semibold text-[#333]">{title}</Text>
        <Text className="text-xs text-[#999] mt-0.5 leading-4">{description}</Text>
      </View>
    </View>
  );
}