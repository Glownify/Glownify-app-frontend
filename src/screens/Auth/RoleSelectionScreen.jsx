import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/common/Header';
import RoleCard from '../../components/RoleSelection/RoleCard';
import FeatureItem from '../../components/RoleSelection/FeatureItem';

const ROLES = [
  {
    key: 'salon_owner',
    title: 'Salon Owner',
    description: 'Register your salon and manage bookings, staff, and services',
    iconName: 'storefront',
    iconColor: '#156778',
    iconBg: '#E8F4F8',
    navigateTo: 'SalonOwnerRegistration',
  },
  {
    key: 'independent',
    title: 'Independent Professional',
    description: 'Freelance beautician/barber. Work independently and manage your schedule',
    iconName: 'person',
    iconColor: '#E91E63',
    iconBg: '#FCE4EC',
    navigateTo: 'IndependentRegistration',
  },
];

const FEATURES = [
  {
    title: 'Easy Setup',
    description: 'Complete registration in just 3 steps',
  },
  {
    title: 'Instant Bookings',
    description: 'Start receiving customer bookings immediately',
  },
  {
    title: 'Secure & Verified',
    description: 'All professionals are verified for quality assurance',
  },
  {
    title: 'Dedicated Support',
    description: '24/7 customer support for all your needs',
  },
];

export default function RoleSelectionScreen({ navigation }) {
  const handleRoleSelect = navigateTo => {
    navigation?.navigate(navigateTo);
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

        {/* Role Cards */}
        {ROLES.map(role => (
          <RoleCard
            key={role.key}
            title={role.title}
            description={role.description}
            iconName={role.iconName}
            iconColor={role.iconColor}
            iconBg={role.iconBg}
            onPress={() => handleRoleSelect(role.navigateTo)}
          />
        ))}

        {/* Features Info */}
        <View className="mx-4 my-6 bg-white rounded-xl p-4">
          <Text className="text-base font-bold text-[#333] mb-4">
            Why Register With Us?
          </Text>
          {FEATURES.map(feature => (
            <FeatureItem
              key={feature.title}
              title={feature.title}
              description={feature.description}
            />
          ))}
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