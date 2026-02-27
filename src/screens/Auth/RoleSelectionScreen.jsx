import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../components/common/Header';
import RoleCard from '../../components/RoleSelection/RoleCard';
import FeatureItem from '../../components/RoleSelection/FeatureItem';

const ROLES = [
  {
    key: 'salon_owner',
    title: 'Salon Owner',
    description:
      'Register your salon and manage bookings, staff, and services efficiently.',
    iconName: 'storefront',
    iconColor: '#2EC4B6',
    iconBg: '#E0F5F3',
    navigateTo: 'SalonOwnerRegistration',
  },
  {
    key: 'independent',
    title: 'Independent Professional',
    description:
      'Freelance beautician/barber. Work independently and manage your schedule.',
    iconName: 'person',
    iconColor: '#E91E63',
    iconBg: '#FCE4EC',
    navigateTo: 'IndependentRegistration',
  },
];

const FEATURES = [
  { title: 'Easy Setup', description: 'Complete registration in just 3 steps' },
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
  return (
    <SafeAreaView className="flex-1 bg-[#EEF3F3]">
      {/* ── Header ───────────────────────────────────────────────── */}
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm"
        >
          <Icon name="chevron-back" size={20} color="#333" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-base font-bold text-neutral-800 mr-10">
          Register As
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32, flexGrow: 1 }}
      >
        {/* ── Title ────────────────────────────────────────────────── */}
        <View className="px-5 mt-2 mb-6">
          <Text className="text-[32px] font-bold text-[#1a1a2e] leading-tight">
            Choose Your Role
          </Text>
          <Text className="text-base text-gray-500 mt-2">
            Select how you'd like to join our platform to get started.
          </Text>
        </View>

        {/* ── Role Cards ───────────────────────────────────────────── */}
        <View className="px-4 gap-4 mb-6">
          {ROLES.map(role => (
            <TouchableOpacity
              key={role.key}
              onPress={() => navigation?.navigate(role.navigateTo)}
              activeOpacity={0.85}
              className="bg-white rounded-2xl p-5 flex-row items-center gap-4 shadow-sm"
            >
              {/* Icon circle */}
              <View
                style={{ backgroundColor: role.iconBg }}
                className="w-16 h-16 rounded-full items-center justify-center"
              >
                <Icon name={role.iconName} size={28} color={role.iconColor} />
              </View>

              {/* Text */}
              <View className="flex-1">
                <Text className="text-base font-bold text-[#1a1a2e] mb-1">
                  {role.title}
                </Text>
                <Text className="text-sm text-gray-500 leading-5">
                  {role.description}
                </Text>
              </View>

              {/* Chevron */}
              <Icon name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Why Register ─────────────────────────────────────────── */}
        <View className="mx-4 bg-white rounded-2xl p-5 mb-8">
          <Text className="text-lg font-bold text-[#1a1a2e] mb-4">
            Why Register With Us?
          </Text>
          {FEATURES.map(feature => (
            <FeatureItem
              key={feature.title}
              title={feature.title}
              description={feature.description}
              iconName="checkmark-circle"
              iconColor="#4CAF50"
              iconSize={22}
            />
          ))}
        </View>

        {/* ── Sign In ──────────────────────────────────────────────── */}
        <Text className="text-center text-sm text-gray-400">
          Already registered?{' '}
          <Text
            onPress={() => navigation?.navigate('Login')}
            className="text-[#E91E63] font-bold"
          >
            Sign In
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
