import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import AppHeader from '../../components/common/Header';
// import { fetchUserBookings } from '../../redux/slices/bookingSlice'; // TODO: uncomment

// ─── Dummy Data (replace entirely with API response from bookingSlice) ───────
const DUMMY_BOOKINGS = [
  {
    _id: 'bk_001',
    shopName: 'Priya Sharma',
    speciality: 'Hair & Skin Expert',
    serviceItems: [
      { service: { name: 'Haircut & Styling' } },
      { service: { name: 'Facial Treatment' } },
    ],
    totalAmount: 748,
    bookingDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    timeSlot: { start: '11:00 AM' },
    bookingType: 'home',
    status: 'confirmed',
  },
  {
    _id: 'bk_002',
    shopName: 'Neha Kapoor',
    speciality: 'Nail & Spa Specialist',
    serviceItems: [{ service: { name: 'Manicure & Pedicure' } }],
    totalAmount: 799,
    bookingDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    timeSlot: { start: '2:30 PM' },
    bookingType: 'home',
    status: 'pending',
  },
  {
    _id: 'bk_003',
    shopName: 'Riya Mehta',
    speciality: 'Bridal & Makeup Artist',
    serviceItems: [
      { service: { name: 'Bridal Makeup' } },
      { service: { name: 'Threading' } },
    ],
    totalAmount: 2598,
    bookingDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    timeSlot: { start: '10:00 AM' },
    bookingType: 'home',
    status: 'completed',
  },
  {
    _id: 'bk_004',
    shopName: 'Sunita Rao',
    speciality: 'Ayurveda & Spa Expert',
    serviceItems: [{ service: { name: 'Full Body Spa' } }],
    totalAmount: 149,
    bookingDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    timeSlot: { start: '4:00 PM' },
    bookingType: 'home',
    status: 'cancelled',
  },
  {
    _id: 'bk_005',
    shopName: 'Anjali Singh',
    speciality: 'Hair & Color Specialist',
    serviceItems: [
      { service: { name: 'Hair Coloring' } },
      { service: { name: 'Haircut & Styling' } },
    ],
    totalAmount: 1299,
    bookingDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    timeSlot: { start: '1:00 PM' },
    bookingType: 'in_salon',
    status: 'completed',
  },
];
// ─────────────────────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  confirmed: { label: 'Confirmed', bg: 'bg-green-50',  text: 'text-green-600',  bar: '#16a34a', icon: 'checkmark-circle' },
  pending:   { label: 'Pending',   bg: 'bg-yellow-50', text: 'text-yellow-600', bar: '#ca8a04', icon: 'time' },
  completed: { label: 'Completed', bg: 'bg-blue-50',   text: 'text-blue-600',   bar: '#2563eb', icon: 'checkmark-done-circle' },
  cancelled: { label: 'Cancelled', bg: 'bg-red-50',    text: 'text-red-500',    bar: '#ef4444', icon: 'close-circle' },
};

const TOP_BAR_COLOR = {
  confirmed: 'bg-success',
  pending:   'bg-warning',
  completed: 'bg-info',
  cancelled: 'bg-error',
};

const formatDate = iso => {
  const d = new Date(iso);
  const today     = new Date();
  const tomorrow  = new Date(); tomorrow.setDate(today.getDate() + 1);
  const yesterday = new Date(); yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === today.toDateString())     return 'Today';
  if (d.toDateString() === tomorrow.toDateString())  return 'Tomorrow';
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

export default function BookingScreen({ navigation }) {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('upcoming');

  // TODO: swap these two lines once API slice is wired up
  // const { bookings, loading } = useSelector(state => state.booking);
  const bookings = DUMMY_BOOKINGS;
  const loading  = false;

  // TODO: uncomment to auto-fetch on screen focus
  // useFocusEffect(
  //   React.useCallback(() => { dispatch(fetchUserBookings()); }, [dispatch])
  // );

  const now      = new Date();
  const filtered = bookings.filter(b =>
    activeTab === 'upcoming'
      ? new Date(b.bookingDate) >= now
      : new Date(b.bookingDate) < now,
  );

  const upcomingCount = bookings.filter(b => new Date(b.bookingDate) >= now).length;
  const pastCount     = bookings.filter(b => new Date(b.bookingDate) <  now).length;

  // ── Booking Card ────────────────────────────────────────────────────────────
  const renderCard = booking => {
    const status    = booking.status || 'pending';
    const cfg       = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
    const barColor  = TOP_BAR_COLOR[status] ?? 'bg-neutral-300';
    const services  = booking.serviceItems?.map(s => s.service?.name).join(' · ') || '—';
    const isUpcoming = new Date(booking.bookingDate) >= now;

    return (
      <TouchableOpacity
        key={booking._id}
        activeOpacity={0.88}
        className="bg-neutral-white rounded-2xl mb-sm overflow-hidden"
        style={{ elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } }}
        onPress={() => {
          // TODO: navigation.navigate('BookingDetail', { bookingId: booking._id })
        }}
      >
        {/* Coloured accent bar at top */}
        <View className={`h-1 w-full ${barColor}`} />

        <View className="px-md pt-sm pb-md">

          {/* ── Row 1: Name + Status ── */}
          <View className="flex-row items-start justify-between mb-sm">
            <View className="flex-1 mr-sm">
              {/* TODO: replace with booking.professional.name */}
              <Text className="text-base font-bold text-neutral-900" numberOfLines={1}>
                {booking.shopName}
              </Text>
              {/* TODO: replace with booking.professional.speciality */}
              <Text className="text-xs text-neutral-400 mt-0.5">{booking.speciality}</Text>
            </View>

            <View className={`flex-row items-center px-2.5 py-1 rounded-full ${cfg.bg}`}>
              <Ionicons name={cfg.icon} size={12} color={cfg.bar} />
              <Text className={`text-xs font-semibold ml-1 ${cfg.text}`}>{cfg.label}</Text>
            </View>
          </View>

          {/* ── Row 2: Services pill ── */}
          <View className="flex-row items-center bg-neutral-50 px-sm py-2 rounded-xl mb-sm">
            <Ionicons name="cut-outline" size={13} color="#9ca3af" />
            {/* TODO: replace with API serviceItems */}
            <Text className="text-xs text-neutral-600 ml-1.5 flex-1 font-medium" numberOfLines={1}>
              {services}
            </Text>
          </View>

          {/* ── Row 3: Date / Time / Mode ── */}
          <View className="flex-row items-center flex-wrap gap-x-3 mb-sm">
            <View className="flex-row items-center">
              <Ionicons name="calendar-outline" size={13} color="#6b7280" />
              <Text className="text-xs text-neutral-600 ml-1 font-medium">
                {formatDate(booking.bookingDate)}
                {/* TODO: booking.bookingDate from API */}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="time-outline" size={13} color="#6b7280" />
              <Text className="text-xs text-neutral-600 ml-1 font-medium">
                {booking.timeSlot?.start || 'TBD'}
                {/* TODO: booking.timeSlot.start from API */}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons
                name={booking.bookingType === 'in_salon' ? 'storefront-outline' : 'home-outline'}
                size={13}
                color="#6b7280"
              />
              <Text className="text-xs text-neutral-600 ml-1 font-medium">
                {booking.bookingType === 'in_salon' ? 'At Salon' : 'Home Visit'}
              </Text>
            </View>
          </View>

          {/* ── Divider ── */}
          <View className="h-px bg-neutral-100 mb-sm" />

          {/* ── Row 4: Amount + CTAs ── */}
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-xs text-neutral-400">
                {isUpcoming ? 'Amount Due' : 'Amount Paid'}
              </Text>
              {/* TODO: booking.totalAmount from API */}
              <Text className="text-base font-black text-neutral-900 mt-0.5">₹{booking.totalAmount}</Text>
            </View>

            <View className="flex-row gap-2">
              {isUpcoming ? (
                <>
                  <TouchableOpacity
                    className="flex-row items-center px-sm py-1.5 rounded-xl border border-neutral-200"
                    onPress={() => {
                      // TODO: dispatch reschedule action / navigate to reschedule screen
                    }}
                  >
                    <Ionicons name="calendar-outline" size={13} color="#6b7280" />
                    <Text className="text-xs font-semibold text-neutral-600 ml-1">Reschedule</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="flex-row items-center px-sm py-1.5 rounded-xl bg-primary"
                    onPress={() => {
                      // TODO: open dialer with booking.professional.phone
                    }}
                  >
                    <Ionicons name="call-outline" size={13} color="#fff" />
                    <Text className="text-xs font-bold text-neutral-white ml-1">Call</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  {status === 'completed' && (
                    <TouchableOpacity
                      className="flex-row items-center px-sm py-1.5 rounded-xl border border-neutral-200"
                      onPress={() => {
                        // TODO: navigation.navigate('WriteReview', { bookingId: booking._id })
                      }}
                    >
                      <Ionicons name="star-outline" size={13} color="#f59e0b" />
                      <Text className="text-xs font-semibold text-neutral-600 ml-1">Review</Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    className="flex-row items-center px-sm py-1.5 rounded-xl bg-primary"
                    onPress={() => {
                      // TODO: navigation.navigate('ProfessionalDetails', { professionalId: booking.professionalId })
                    }}
                  >
                    <Ionicons name="refresh-outline" size={13} color="#fff" />
                    <Text className="text-xs font-bold text-neutral-white ml-1">Rebook</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>

        </View>
      </TouchableOpacity>
    );
  };

  // ── Empty State ─────────────────────────────────────────────────────────────
  const renderEmpty = () => (
    <View className="items-center justify-center py-24">
      <View
        className="w-20 h-20 rounded-3xl bg-neutral-white items-center justify-center mb-md"
        style={{ elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } }}
      >
        <Ionicons name="calendar-outline" size={36} color="#d1d5db" />
      </View>
      <Text className="text-base font-bold text-neutral-700">
        No {activeTab} bookings
      </Text>
      <Text className="text-sm text-neutral-400 mt-1 text-center px-xl leading-5">
        {activeTab === 'upcoming'
          ? 'Book a professional and your appointments will appear here.'
          : 'Your completed and cancelled bookings will show up here.'}
      </Text>
      {activeTab === 'upcoming' && (
        <TouchableOpacity
          className="mt-lg bg-primary px-xl py-sm rounded-2xl"
          onPress={() => navigation?.navigate('Home')}
        >
          <Text className="text-neutral-white font-bold text-sm">Browse Professionals</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  // ── Screen ──────────────────────────────────────────────────────────────────
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-primary">
      <StatusBar backgroundColor="#f43f5e" barStyle="light-content" />

      <AppHeader title="My Bookings" onBack={() => navigation?.goBack()} noBorder={true} />

      {/* Header */}
      {/* <View className="flex-row items-center justify-between px-md py-sm bg-primary ">
        <TouchableOpacity
          className="w-10 h-10 rounded-full items-center justify-center"
          style={{ backgroundColor: 'rgba(255,255,255,0.18)' }}
          onPress={() => navigation?.goBack()}
        >
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text className="text-base font-semibold text-neutral-white">My Bookings</Text>
        <View className="w-10" />
      </View> */}

      {/* Tab Switcher */}
      <View className="flex-row mx-md mt-sm mb-md rounded-full p-1 bg-primary-400">
        {[
          { key: 'upcoming', icon: 'calendar-outline', count: upcomingCount },
          { key: 'past',     icon: 'time-outline',     count: pastCount     },
        ].map(({ key, icon, count }) => {
          const isActive = activeTab === key;
          return (
            <TouchableOpacity
              key={key}
              className={`flex-1 py-2 rounded-full items-center flex-row justify-center ${isActive ? 'bg-neutral-white' : ''}`}
              style={isActive ? { elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, shadowOffset: { width: 0, height: 1 } } : {}}
              onPress={() => setActiveTab(key)}
            >
              <Ionicons name={icon} size={14} color={isActive ? '#f43f5e' : 'rgba(255,255,255,0.65)'} />
              <Text className={`text-sm font-semibold ml-1.5 ${isActive ? 'text-primary' : 'text-neutral-white'}`}
                style={!isActive ? { opacity: 0.7 } : {}}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Text>
              <View className={`ml-1.5 w-5 h-5 rounded-full items-center justify-center ${isActive ? 'bg-primary' : ''}`}
                style={!isActive ? { backgroundColor: 'rgba(255,255,255,0.25)' } : {}}
              >
                <Text className="text-white text-xs font-bold">{count}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Content */}
      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 60 }} />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 bg-neutral-100 rounded-t-3xl"
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 32 }}
        >
          {filtered.length === 0 ? renderEmpty() : filtered.map(renderCard)}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}