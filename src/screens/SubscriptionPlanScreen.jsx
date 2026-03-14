/**
 * SubscriptionPlanScreen.jsx
 *
 * ✅ Dummy data seeded — swap with API response from subscriptionPlans (Redux).
 * ✅ UI matches SalonBookingsScreen aesthetics: pink BG, white cards, rose accents.
 * ✅ NativeWind className only — no StyleSheet.
 * ✅ Redux wiring preserved (subscribePlan, fetchSubscriptionPlans).
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { subscribePlan, fetchSubscriptionPlans } from '../redux/slices/subscriptionSlice';

// ─── Background colour — mirrors SalonBookingsScreen ─────────────────────────
const BG = '#fff1f2';

// ─── Dummy Plans ──────────────────────────────────────────────────────────────
// Replace / merge with `subscriptionPlans` from Redux once the API responds.
const DUMMY_PLANS = [
  {
    _id: 'plan_starter',
    name: 'Starter',
    price: 499,
    durationInDays: 30,
    badge: null,
    features: [
      'Up to 50 bookings / month',
      'Basic analytics dashboard',
      'Email support',
      '1 staff account',
    ],
  },
  {
    _id: 'plan_pro',
    name: 'Professional',
    price: 1199,
    durationInDays: 30,
    badge: 'Most Popular',
    features: [
      'Unlimited bookings',
      'Advanced analytics & reports',
      'Priority chat support',
      'Up to 5 staff accounts',
      'Custom notifications',
    ],
  },
  {
    _id: 'plan_growth',
    name: 'Growth',
    price: 2999,
    durationInDays: 90,
    badge: 'Best Value',
    features: [
      'Everything in Professional',
      'Home-service management',
      'Dedicated account manager',
      'Unlimited staff accounts',
      'White-label client app',
      'API access',
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getDurationText = days => {
  if (days <= 31) return '/ mo';
  if (days <= 92) return '/ 3 mo';
  if (days <= 366) return '/ yr';
  return `/ ${days} days`;
};

const BADGE_STYLE = {
  'Most Popular': { bg: 'bg-rose-100',   text: 'text-rose-600'   },
  'Best Value':   { bg: 'bg-orange-100', text: 'text-orange-500' },
};

// ─── Plan Card ────────────────────────────────────────────────────────────────
const PlanCard = ({ item, isSelected, onPress }) => {
  const badge = item.badge ? BADGE_STYLE[item.badge] : null;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.88}
      className={`bg-white rounded-2xl p-4 mb-4 border-2
        ${isSelected ? 'border-rose-400' : 'border-transparent'}`}
      style={{
        shadowColor: isSelected ? '#f9a8b8' : '#00000015',
        shadowOpacity: isSelected ? 0.35 : 0.1,
        shadowRadius: isSelected ? 16 : 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: isSelected ? 6 : 2,
      }}
    >
      {/* ── Top: name + badge + selected tick ── */}
      <View className="flex-row items-center justify-between mb-1">
        <Text className="text-lg font-bold text-neutral-800">{item.name}</Text>

        <View className="flex-row items-center gap-2">
          {badge && (
            <View className={`rounded-full px-2.5 py-0.5 ${badge.bg}`}>
              <Text className={`text-xs font-bold ${badge.text}`}>{item.badge}</Text>
            </View>
          )}
          {isSelected && (
            <View className="w-5 h-5 rounded-full bg-rose-500 items-center justify-center">
              <Icon name="checkmark" size={12} color="#fff" />
            </View>
          )}
        </View>
      </View>

      {/* ── Price row ── */}
      <View className="flex-row items-baseline gap-1 mb-3">
        <Text className="text-3xl font-extrabold text-rose-500">
          ₹{item.price.toLocaleString()}
        </Text>
        <Text className="text-sm text-neutral-400 font-medium">
          {getDurationText(item.durationInDays)}
        </Text>
      </View>

      {/* ── Divider ── */}
      <View className="h-px bg-pink-50 mb-3" />

      {/* ── Features ── */}
      <Text className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-2">
        What's included
      </Text>
      {item.features.map((feature, idx) => (
        <View key={idx} className="flex-row items-center gap-2 mb-1.5">
          <View className="w-4 h-4 rounded-full bg-green-50 items-center justify-center">
            <Icon name="checkmark" size={10} color="#16a34a" />
          </View>
          <Text className="text-sm text-neutral-600 flex-1">{feature}</Text>
        </View>
      ))}
    </TouchableOpacity>
  );
};

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function SubscriptionPlanScreen({ closeModal, navigation }) {
  // ── Redux ──
  const { subscriptionPlans, loading } = useSelector(state => state.subscription);
  const dispatch = useDispatch();

  // ── Use API data if available, else fall back to dummy data ──
  const plans =
    subscriptionPlans && subscriptionPlans.length > 0
      ? subscriptionPlans
      : DUMMY_PLANS;

  const [selectedPlanId, setSelectedPlanId] = useState(null);

  useEffect(() => {
    dispatch(fetchSubscriptionPlans());
  }, []);

  const handleClose = () => {
    if (typeof closeModal === 'function') return closeModal();
    if (navigation?.canGoBack?.()) return navigation.goBack();
  };

  const handleSubscribe = () => {
    if (!selectedPlanId) return;
    dispatch(subscribePlan(selectedPlanId));
    handleClose();
  };

  const selectedPlan = plans.find(p => p._id === selectedPlanId);

  return (
    <Modal visible={true} transparent animationType="slide">
      {/* ── Backdrop ── */}
      <View className="flex-1 bg-black/50">
        <SafeAreaView className="flex-1" style={{ backgroundColor: BG }}>

          {/* ── Header ── */}
          <View
            className="flex-row items-center justify-between px-4 pt-2 pb-3 bg-white border-b border-pink-100"
          >
            <TouchableOpacity onPress={handleClose} activeOpacity={0.7}>
              <Icon name="close" size={24} color="#e11d48" />
            </TouchableOpacity>
            <Text className="text-lg font-bold text-neutral-800">Choose Your Plan</Text>
            <View style={{ width: 24 }} />
          </View>

          {/* ── Body ── */}
          {loading ? (
            <View className="flex-1 items-center justify-center gap-3">
              <ActivityIndicator size="large" color="#e11d48" />
              <Text className="text-sm text-neutral-400 font-medium">Loading plans...</Text>
            </View>
          ) : (
            <FlatList
              data={plans}
              keyExtractor={item => item._id}
              renderItem={({ item }) => (
                <PlanCard
                  item={item}
                  isSelected={selectedPlanId === item._id}
                  onPress={() => setSelectedPlanId(item._id)}
                />
              )}
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingTop: 16,
                paddingBottom: 120,
              }}
              ListHeaderComponent={() => (
                <View className="items-center mb-5">
                  {/* Icon pill */}
                  <View className="w-14 h-14 rounded-full bg-rose-100 items-center justify-center mb-3">
                    <Icon name="sparkles-outline" size={28} color="#e11d48" />
                  </View>
                  <Text className="text-base font-semibold text-neutral-700">
                    Pick a plan that fits your salon
                  </Text>
                  <Text className="text-xs text-neutral-400 mt-0.5">
                    Cancel or change anytime
                  </Text>
                </View>
              )}
              showsVerticalScrollIndicator={false}
            />
          )}

          {/* ── Sticky Footer ── */}
          <View
            className="absolute bottom-0 left-0 right-0 bg-white border-t border-pink-100 px-4 pt-3 pb-6"
            style={{ elevation: 12 }}
          >
            {/* Selected plan summary */}
            {selectedPlan && (
              <View className="flex-row items-center justify-between mb-3 bg-pink-50 rounded-xl px-4 py-2.5">
                <Text className="text-sm font-semibold text-neutral-700">
                  {selectedPlan.name}
                </Text>
                <Text className="text-sm font-extrabold text-rose-500">
                  ₹{selectedPlan.price.toLocaleString()}
                  <Text className="font-normal text-neutral-400">
                    {' '}{getDurationText(selectedPlan.durationInDays)}
                  </Text>
                </Text>
              </View>
            )}

            <TouchableOpacity
              onPress={handleSubscribe}
              disabled={!selectedPlanId}
              activeOpacity={0.85}
              className={`rounded-xl py-3.5 items-center justify-center
                ${selectedPlanId ? 'bg-rose-500' : 'bg-neutral-200'}`}
            >
              <Text
                className={`text-base font-bold
                  ${selectedPlanId ? 'text-white' : 'text-neutral-400'}`}
              >
                {selectedPlanId ? 'Continue with ' + selectedPlan?.name : 'Select a Plan'}
              </Text>
            </TouchableOpacity>
          </View>

        </SafeAreaView>
      </View>
    </Modal>
  );
}