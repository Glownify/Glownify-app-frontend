import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * RegistrationHeader - Red/coral header for the partner registration flow
 *
 * @param {string}   title       - Main title text (default: 'Earn with Us')
 * @param {string}   subtitle    - Subtitle text   (default: '(Partner Registration)')
 * @param {function} onBack      - Back button press handler
 * @param {string}   bgColor     - Background color (default: '#E91E63')
 * @param {string}   className   - Additional NativeWind className
 */
export default function RegistrationHeader({
  title = 'Earn with Us',
  subtitle = '(Partner Registration)',
  onBack,
  bgColor = '#E91E63',
  className = '',
}) {
  return (
    <View
      style={{ backgroundColor: bgColor }}
      className={`px-5 pt-5 pb-5 ${className}`}
    >
      <View className="flex-row items-center gap-3">
        <TouchableOpacity
          onPress={onBack}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={{
            width: 32,
            height: 32,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name="chevron-back" size={26} color="#fff" />
        </TouchableOpacity>
        <View className="flex-1">
          <Text style={{ fontSize: 20, fontWeight: '700', color: '#fff' }}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 1 }}>
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
}