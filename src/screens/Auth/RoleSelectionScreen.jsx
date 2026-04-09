import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import FeatureItem from '../../components/RoleSelection/FeatureItem';
import {S, theme} from '../../theme';

const ROLES = [
  {
    key: 'salon_owner',
    title: 'Salon Owner',
    description:
      'Register your salon and manage bookings, staff, and services efficiently.',
    iconName: 'storefront',
    iconColor: '#14b8a6',
    iconBgClassName: 'bg-secondary-teal/15',
    navigateTo: 'SalonOwnerRegistration',
  },
  {
    key: 'independent',
    title: 'Independent Professional',
    description:
      'Freelance beautician/barber. Work independently and manage your schedule.',
    iconName: 'person',
    iconColor: theme.colors.primary[600],
    iconBgClassName: 'bg-primary-100',
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
    <SafeAreaView className="flex-1 bg-neutral-50">
      {/* ── Header ───────────────────────────────────────────────── */}
      <View
        className="flex-row items-center"
        style={{paddingHorizontal: S.space.lg, paddingVertical: S.space.lg}}>
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm"
        >
          <Icon name="chevron-back" size={20} color="#333" />
        </TouchableOpacity>
        <Text
          className="flex-1 text-center font-bold text-neutral-800"
          style={{fontSize: S.fs.md, marginRight: S.size.avatarSm}}>
          Register As
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: S.space['2xl'],
          flexGrow: 1,
          gap: S.space.xl,
        }}
      >
        {/* ── Title ────────────────────────────────────────────────── */}
        <View style={{paddingHorizontal: S.space.xl, gap: S.space.sm}}>
          <Text
            className="font-bold text-neutral-900 leading-tight"
            style={{fontSize: S.fs.xxl}}>
            Choose Your Role
          </Text>
          <Text className="text-neutral-500" style={{fontSize: S.fs.md}}>
            Select how you'd like to join our platform to get started.
          </Text>
        </View>

        {/* ── Role Cards ───────────────────────────────────────────── */}
        <View style={{paddingHorizontal: S.space.lg, gap: S.space.lg}}>
          {ROLES.map(role => (
            <TouchableOpacity
              key={role.key}
              onPress={() => navigation?.navigate(role.navigateTo)}
              activeOpacity={0.85}
              className="bg-surface rounded-2xl flex-row items-center shadow-sm"
              style={{padding: S.space.xl, gap: S.space.lg}}
            >
              {/* Icon circle */}
              <View
                className={`w-16 h-16 rounded-full items-center justify-center ${role.iconBgClassName}`}
              >
                <Icon name={role.iconName} size={28} color={role.iconColor} />
              </View>

              {/* Text */}
              <View className="flex-1" style={{gap: S.space.xs}}>
                <Text className="font-bold text-neutral-900" style={{fontSize: S.fs.md}}>
                  {role.title}
                </Text>
                <Text className="text-neutral-500 leading-5" style={{fontSize: S.fs.xs}}>
                  {role.description}
                </Text>
              </View>

              {/* Chevron */}
              <Icon name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Why Register ─────────────────────────────────────────── */}
        <View
          className="bg-surface rounded-2xl"
          style={{marginHorizontal: S.space.lg, padding: S.space.xl, gap: S.space.lg}}>
          <Text className="font-bold text-neutral-900" style={{fontSize: S.fs.md_h}}>
            Why Register With Us?
          </Text>
          {FEATURES.map(feature => (
            <FeatureItem
              key={feature.title}
              title={feature.title}
              description={feature.description}
              iconName="checkmark-circle"
              iconColor={theme.colors.success[500]}
              iconSize={22}
            />
          ))}
        </View>

        {/* ── Sign In ──────────────────────────────────────────────── */}
        <Text className="text-center text-neutral-400" style={{fontSize: S.fs.xs}}>
          Already registered?{' '}
          <Text
            onPress={() => navigation?.navigate('Login')}
            className="text-primary-600 font-bold"
          >
            Sign In
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
