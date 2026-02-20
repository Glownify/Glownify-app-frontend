import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * RoleCard - Selectable role option card
 *
 * @param {string}   title        - Role title (e.g. 'Salon Owner')
 * @param {string}   description  - Short description of the role
 * @param {string}   iconName     - Ionicons icon name (e.g. 'storefront')
 * @param {string}   iconColor    - Icon and chevron color (e.g. '#156778')
 * @param {string}   iconBg       - Icon circle background color (e.g. '#E8F4F8')
 * @param {number}   iconSize     - Icon size (default: 40)
 * @param {function} onPress      - Press handler
 * @param {string}   className    - Additional NativeWind className for the card
 * @param {object}   style        - Inline style override for the card
 */
export default function RoleCard({
  title,
  description,
  iconName,
  iconColor,
  iconBg,
  iconSize = 40,
  onPress,
  className = '',
  style,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={style}
      className={`mx-4 mb-3 bg-white rounded-xl p-4 flex-row items-center justify-between shadow-sm ${className}`}
    >
      <View className="flex-1 flex-row items-center gap-3">
        {/* Icon circle */}
        <View
          style={{ backgroundColor: iconBg }}
          className="w-[60px] h-[60px] rounded-full justify-center items-center"
        >
          <Icon name={iconName} size={iconSize} color={iconColor} />
        </View>

        {/* Text */}
        <View className="flex-1">
          <Text className="text-[15px] font-bold text-[#333] mb-1">{title}</Text>
          <Text className="text-xs text-[#666] leading-4">{description}</Text>
        </View>
      </View>

      {/* Chevron */}
      <Icon name="chevron-forward" size={24} color={iconColor} />
    </TouchableOpacity>
  );
}