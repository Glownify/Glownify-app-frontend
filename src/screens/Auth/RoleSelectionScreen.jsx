import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../components/common/Header';

export default function RoleSelectionScreen({ navigation }) {
  const handleRoleSelect = role => {
    if (role === 'salon_owner') {
      navigation?.navigate('SalonOwnerRegistration');
    } else if (role === 'independent') {
      navigation?.navigate('IndependentRegistration');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f5f5f5]">
      <View className="flex-1">
        {/* Header */}
        <Header title="Register As" onBack={() => navigation?.goBack()} />

        {/* Title */}
        <View>
          <Text className="text-2xl font-bold text-[#333] px-4 mt-5">
            Choose Your Role
          </Text>
          <Text className="text-sm text-[#999] px-4 mb-6 mt-1">
            Select how you'd like to join our platform
          </Text>
        </View>

        {/* Salon Owner Option */}
        <TouchableOpacity
          className="mx-4 mb-3 bg-white rounded-xl p-4 flex-row items-center justify-between shadow-sm"
          onPress={() => handleRoleSelect('salon_owner')}
        >
          <View className="flex-1 flex-row items-center gap-3">
            <View className="w-[60px] h-[60px] rounded-full justify-center items-center bg-[#E8F4F8]">
              <Icon name="storefront" size={40} color="#156778" />
            </View>
            <View className="flex-1">
              <Text className="text-[15px] font-bold text-[#333] mb-1">
                Salon Owner
              </Text>
              <Text className="text-xs text-[#666] leading-4">
                Register your salon and manage bookings, staff, and services
              </Text>
            </View>
          </View>
          <Icon name="chevron-forward" size={24} color="#156778" />
        </TouchableOpacity>

        {/* Independent Professional Option */}
        <TouchableOpacity
          className="mx-4 mb-3 bg-white rounded-xl p-4 flex-row items-center justify-between shadow-sm"
          onPress={() => handleRoleSelect('independent')}
        >
          <View className="flex-1 flex-row items-center gap-3">
            <View className="w-[60px] h-[60px] rounded-full justify-center items-center bg-[#FCE4EC]">
              <Icon name="person" size={40} color="#E91E63" />
            </View>
            <View className="flex-1">
              <Text className="text-[15px] font-bold text-[#333] mb-1">
                Independent Professional
              </Text>
              <Text className="text-xs text-[#666] leading-4">
                Freelance beautician/barber. Work independently and manage your
                schedule
              </Text>
            </View>
          </View>
          <Icon name="chevron-forward" size={24} color="#E91E63" />
        </TouchableOpacity>

        {/* Features Info */}
        <View className="mx-4 my-6 bg-white rounded-xl p-4">
          <Text className="text-base font-bold text-[#333] mb-4">
            Why Register With Us?
          </Text>

          <View className="flex-row items-start mb-3 gap-2.5">
            <Icon name="checkmark-circle" size={20} color="#4CAF50" />
            <View className="flex-1">
              <Text className="text-[13px] font-semibold text-[#333]">
                Easy Setup
              </Text>
              <Text className="text-xs text-[#999] mt-0.5 leading-4">
                Complete registration in just 3 steps
              </Text>
            </View>
          </View>

          <View className="flex-row items-start mb-3 gap-2.5">
            <Icon name="checkmark-circle" size={20} color="#4CAF50" />
            <View className="flex-1">
              <Text className="text-[13px] font-semibold text-[#333]">
                Instant Bookings
              </Text>
              <Text className="text-xs text-[#999] mt-0.5 leading-4">
                Start receiving customer bookings immediately
              </Text>
            </View>
          </View>

          <View className="flex-row items-start mb-3 gap-2.5">
            <Icon name="checkmark-circle" size={20} color="#4CAF50" />
            <View className="flex-1">
              <Text className="text-[13px] font-semibold text-[#333]">
                Secure & Verified
              </Text>
              <Text className="text-xs text-[#999] mt-0.5 leading-4">
                All professionals are verified for quality assurance
              </Text>
            </View>
          </View>

          <View className="flex-row items-start mb-3 gap-2.5">
            <Icon name="checkmark-circle" size={20} color="#4CAF50" />
            <View className="flex-1">
              <Text className="text-[13px] font-semibold text-[#333]">
                Dedicated Support
              </Text>
              <Text className="text-xs text-[#999] mt-0.5 leading-4">
                24/7 customer support for all your needs
              </Text>
            </View>
          </View>
        </View>

        {/* Back to Login */}
        <View className="absolute bottom-0 left-0 right-0 flex-row justify-center items-center py-4">
          <Text className="text-[13px] text-[#666]">Already registered? </Text>
          <TouchableOpacity onPress={() => navigation?.navigate('Login')}>
            <Text className="text-[13px] font-bold text-[#1E90FF]">Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>


    </SafeAreaView>
  );
}
