import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'

const TabHeader = () => {
    const navigation = useNavigation();

    const Avatar = ({ initials, color, size = 48 }) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: color,
    }}
    className="items-center justify-center"
  >
    <Text
      style={{ fontSize: size * 0.33, color: '#9f1239', fontWeight: '700' }}
    >
      {initials}
    </Text>
  </View>
);
  return (
      <View className="bg-white px-4 flex-row items-center justify-between">
        <View className="flex-row items-center" style={{ gap: 12 }}>
          <Avatar initials="GS" color="#fecdd3" size={48} />
          <View>
            <Text className="text-neutral-400 text-sm">Welcome back,</Text>
            <Text
              className="text-neutral-800 font-bold"
              style={{ fontSize: 18 }}
            >
              Hello, Glamour Salon! 👋
            </Text>
          </View>
        </View>

        <TouchableOpacity
          className="w-10 h-10 rounded-full bg-primary-50 items-center justify-center"
          style={{ backgroundColor: '#fff1f2' }}
          onPress={() => navigation?.navigate('SalonNotifications')}
        >
          <Icon name="notifications" size={22} color="#f43f5e" />
          <View
            className="absolute items-center justify-center"
            style={{
              top: 0,
              right: 0,
              width: 18,
              height: 18,
              borderRadius: 9,
              backgroundColor: '#f43f5e',
            }}
          >
            <Text style={{ color: '#fff', fontSize: 10, fontWeight: '700' }}>
              3
            </Text>
          </View>
        </TouchableOpacity>
      </View>
  )
}

export default TabHeader