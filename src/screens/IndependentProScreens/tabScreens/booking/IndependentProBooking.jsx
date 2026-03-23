/**
 * IndependentProBooking.jsx
 *
 * ✅ Adapted from SalonBookingsScreen for Independent Pro context.
 * ✅ Pink salon-owner-aligned design applied for Individual Pro parity.
 * ✅ Type toggle (At My Location / At Client's Home) always visible at top.
 * ✅ Bottom sheet removed.
 * ✅ Styled with NativeWind className only (no StyleSheet).
 *
 * 🔁 API integration:
 *   Replace MOCK_BOOKINGS with: dispatch(fetchProBookings())
 *   Replace handleAccept/handleDecline with: dispatch(updateBookingStatus({ id, status }))
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const SCREEN_W = Dimensions.get('window').width;

// ─── Constants ────────────────────────────────────────────────────────────────

const BG = '#fff1f2';

// ─── Mock Data ────────────────────────────────────────────────────────────────
// 🔁 Replace with: const { bookings, loading } = useSelector(state => state.independentPro)
// 🔁 useEffect(() => { dispatch(fetchProBookings()) }, [dispatch])

const MOCK_BOOKINGS = [
  {
    id: 1,
    customerName: 'Priya S.',
    service: 'Keratin Treatment',
    date: 'Mar 18',
    time: '11:00 AM',
    duration: '2 hrs',
    status: 'pending',
    type: 'location',
    isNew: true,
    amount: 2500,
    totalAmount: 2500,
    initials: 'PS',
    avatar: 'https://i.pravatar.cc/150?u=priya',
  },
  {
    id: 2,
    customerName: 'Amit K.',
    service: 'Beard Shaping',
    date: 'Mar 18',
    time: '9:30 AM',
    duration: '30 min',
    status: 'pending',
    type: 'home',
    isNew: true,
    amount: 250,
    totalAmount: 250,
    initials: 'AK',
    avatar: 'https://i.pravatar.cc/150?u=amit',
  },
  {
    id: 3,
    customerName: 'Sneha R.',
    service: 'Deep Facial',
    date: 'Mar 18',
    time: '10:00 AM',
    duration: '1 hr',
    status: 'pending',
    type: 'location',
    isNew: false,
    amount: 1200,
    totalAmount: 1020,
    serviceSubtitle: '(15% discount applied)',
    initials: 'SR',
    avatar: 'https://i.pravatar.cc/150?u=sneha',
  },
  {
    id: 4,
    customerName: 'Ritu M.',
    service: 'Hair Cut & Style',
    date: 'Mar 18',
    time: '1:00 PM',
    duration: '45 min',
    status: 'pending',
    type: 'home',
    isNew: false,
    amount: 800,
    totalAmount: 800,
    initials: 'RM',
    avatar: 'https://i.pravatar.cc/150?u=ritu',
  },
  {
    id: 5,
    customerName: 'Kavya L.',
    service: 'Bridal Makeup',
    serviceSubtitle: '(Full Package)',
    date: 'Mar 19',
    time: '8:00 AM',
    duration: '3 hrs',
    status: 'pending',
    type: 'home',
    isNew: false,
    amount: 5000,
    totalAmount: 5000,
    initials: 'KL',
    avatar: 'https://i.pravatar.cc/150?u=kavya',
  },
  {
    id: 6,
    customerName: 'Vikram S.',
    service: 'Massage Therapy',
    date: 'Mar 20',
    time: '3:00 PM',
    duration: '1 hr',
    status: 'accepted',
    type: 'location',
    isNew: false,
    amount: 1000,
    totalAmount: 1000,
    initials: 'VS',
    avatar: 'https://i.pravatar.cc/150?u=vikram',
  },
  {
    id: 7,
    customerName: 'Deepa N.',
    service: 'Nail Art',
    date: 'Mar 14',
    time: '2:00 PM',
    duration: '1 hr',
    status: 'completed',
    type: 'location',
    isNew: false,
    amount: 700,
    totalAmount: 700,
    initials: 'DN',
    avatar: 'https://i.pravatar.cc/150?u=deepa',
  },
];

const STATUS_TABS = ['All', 'Ongoing', 'Completed', 'Cancelled'];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getStatusFilter = tab => {
  switch (tab) {
    case 'Ongoing':   return ['accepted'];
    case 'Completed': return ['completed'];
    case 'Cancelled': return ['declined'];
    default:          return ['pending', 'accepted', 'completed', 'declined'];
  }
};

// ─── Avatar ───────────────────────────────────────────────────────────────────

const Avatar = ({ src, initials, size = 56 }) => (
  <View
    className="bg-neutral-200 overflow-hidden items-center justify-center"
    style={{ width: size, height: size, borderRadius: size / 2 }}
  >
    {src ? (
      <Image
        source={{ uri: src }}
        style={{ width: size, height: size, borderRadius: size / 2 }}
        resizeMode="cover"
      />
    ) : (
      <Text style={{ fontSize: size * 0.32, color: '#374151', fontWeight: '700' }}>
        {initials}
      </Text>
    )}
  </View>
);

// ─── Booking Card ─────────────────────────────────────────────────────────────

const BookingCard = ({ booking, onAccept, onDecline }) => {
  const navigation = useNavigation();
  const isPending = booking.status === 'pending';

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('IndividualBookingDetail', { booking })}
      activeOpacity={0.92}
      className="bg-neutral-white rounded-2xl p-3.5 mb-3"
      style={{
        shadowColor: '#f9a8b8',
        shadowOpacity: 0.16,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
      }}
    >
      {/* Top row */}
      <View className="flex-row items-start">
        <Avatar src={booking.avatar} initials={booking.initials} size={56} />

        <View className="flex-1 ml-3">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-bold text-neutral-800">
              {booking.customerName}
            </Text>
            {booking.isNew && (
              <View className="bg-orange-100 rounded-full px-2.5 py-0.5">
                <Text className="text-xs font-bold text-secondary-orange">New</Text>
              </View>
            )}
          </View>

          <Text className="text-sm text-neutral-500 mt-0.5">{booking.service}</Text>
          {booking.serviceSubtitle ? (
            <Text className="text-xs text-neutral-400 mt-0.5">{booking.serviceSubtitle}</Text>
          ) : null}

          <View className="flex-row items-center justify-between mt-2">
            <View className="flex-row items-center gap-1">
              <Icon name="calendar-outline" size={13} color="#9ca3af" />
              <Text className="text-xs text-neutral-500">
                {booking.date}, {booking.time}
              </Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Icon
                name={booking.type === 'home' ? 'home-outline' : 'storefront-outline'}
                size={13}
                color="#9ca3af"
              />
              <Text className="text-xs text-neutral-500">
                {booking.type === 'home' ? "Client's Home" : 'My Location'}
              </Text>
            </View>
            <Text className="text-base font-bold text-neutral-800">
              ₹ {booking.amount.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>

      {/* Divider */}
      <View style={{ height: 1, backgroundColor: '#fce7f3', marginVertical: 12 }} />

      {/* Bottom row */}
      <View className="flex-row items-center justify-between">
        {isPending && (
          <View className="flex-row items-center gap-2">
            <Text className="text-xs text-neutral-400 font-medium">Total</Text>
            <Text className="text-sm font-bold text-neutral-700">
              ₹{booking.totalAmount.toLocaleString()}
            </Text>
            <View className="w-px h-3.5 bg-neutral-200" />
            <Text className="text-xs text-neutral-400">{booking.duration}</Text>
          </View>
        )}

        {!isPending && (
          <View
            style={{
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 4,
              backgroundColor:
                booking.status === 'accepted'  ? '#d1fae5' :
                booking.status === 'completed' ? '#dbeafe' :
                booking.status === 'declined'  ? '#fee2e2' : '#f3f4f6',
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: '700',
                textTransform: 'capitalize',
                color:
                  booking.status === 'accepted'  ? '#059669' :
                  booking.status === 'completed' ? '#2563eb' :
                  booking.status === 'declined'  ? '#e11d48' : '#6b7280',
              }}
            >
              {booking.status}
            </Text>
          </View>
        )}

        {isPending && (
          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={() => onAccept(booking.id)}
              className="px-4 py-2 rounded-xl bg-success"
            >
              <Text className="text-neutral-white font-bold text-xs">Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onDecline(booking.id)}
              className="px-4 py-2 rounded-xl bg-error"
            >
              <Text className="text-neutral-white font-bold text-xs">Decline</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

// ─── Animated Type Toggle ─────────────────────────────────────────────────────

const TypeToggle = ({ value, onChange }) => {
  const anim  = useRef(new Animated.Value(value === 'location' ? 0 : 1)).current;
  const halfW = (SCREEN_W - 32) / 2;

  useEffect(() => {
    Animated.spring(anim, {
      toValue: value === 'location' ? 0 : 1,
      useNativeDriver: false,
      tension: 80,
      friction: 10,
    }).start();
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  const thumbLeft = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [3, halfW + 3],
  });

  const OPTS = [
    { key: 'location', icon: 'storefront-outline', label: 'At My Location'   },
    { key: 'home',     icon: 'home-outline',        label: "At Client's Home" },
  ];

  return (
    <View
      className="flex-row bg-neutral-white rounded-2xl border border-neutral-200 p-0.5 mx-md relative overflow-hidden mb-3"
    >
      <Animated.View
        style={{
          position: 'absolute',
          top: 2,
          bottom: 2,
          left: thumbLeft,
          width: halfW - 6,
          backgroundColor: '#fff1f2',
          borderRadius: 12,
        }}
      />
      {OPTS.map(opt => {
        const active = value === opt.key;
        return (
          <TouchableOpacity
            key={opt.key}
            className="flex-1 flex-row items-center justify-center gap-1.5 py-2 z-10"
            onPress={() => onChange(opt.key)}
            activeOpacity={0.8}
          >
            <Icon name={opt.icon} size={14} color={active ? '#e11d48' : '#9ca3af'} />
            <Text
              style={{
                fontSize: 13,
                fontWeight: '600',
                color: active ? '#e11d48' : '#9ca3af',
              }}
            >
              {opt.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// ─── Empty State ──────────────────────────────────────────────────────────────

const EmptyState = ({ tab }) => (
  <View className="items-center justify-center py-20">
    <View
      style={{
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: '#fff1f2',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
      }}
    >
      <Icon name="calendar-outline" size={34} color="#f43f5e" />
    </View>
    <Text className="text-base font-bold text-neutral-700">No bookings here</Text>
    <Text className="text-sm text-neutral-400 mt-1">Nothing in "{tab}" yet</Text>
  </View>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function IndependentProBooking({ navigation, route }) {
  const [bookings, setBookings]       = useState(MOCK_BOOKINGS);
  const [activeTab, setActiveTab]     = useState('All');
  const [bookingType, setBookingType] = useState('location');

  useEffect(() => {
    const requestedTab = route?.params?.initialTab;
    if (requestedTab && STATUS_TABS.includes(requestedTab)) {
      setActiveTab(requestedTab);
    }
  }, [route?.params?.initialTab]);

  const handleTypeChange = type => {
    setBookingType(type);
    setActiveTab('All');
  };

  const handleAccept = id => {
    // 🔁 Replace with: dispatch(updateBookingStatus({ id, status: 'accepted' }))
    Alert.alert('Booking Accepted', 'Client has been notified.');
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'accepted' } : b));
  };

  const handleDecline = id => {
    // 🔁 Replace with: dispatch(updateBookingStatus({ id, status: 'declined' }))
    Alert.alert('Booking Declined', 'Client has been notified.');
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'declined' } : b));
  };

  const pendingCount = bookings.filter(
    b => b.status === 'pending' && b.type === bookingType,
  ).length;

  const allowedStatuses = getStatusFilter(activeTab);
  const filtered = bookings.filter(b =>
    allowedStatuses.includes(b.status) && b.type === bookingType,
  );

  return (
    <SafeAreaView className="flex-1 py-4" style={{ backgroundColor: BG }} edges={[]}>
      <StatusBar barStyle="dark-content" backgroundColor={BG} />

      {/* ── Header ── */}
      <View
        className="flex-row items-center justify-between px-4 pb-3"
        style={{ backgroundColor: BG }}
      >
        <TouchableOpacity onPress={() => navigation?.goBack()} activeOpacity={0.7}>
          <Icon name="chevron-back" size={26} color="#f43f5e" />
        </TouchableOpacity>

        <Text className="text-lg font-bold text-neutral-800">My Bookings</Text>

        <View style={{ position: 'relative' }}>
          <Avatar src="https://i.pravatar.cc/150?u=raj_pro" size={40} />
          <View
            style={{
              position: 'absolute',
              top: -2,
              right: -2,
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: '#f43f5e',
              borderWidth: 2,
              borderColor: BG,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontSize: 10, fontWeight: '700' }}>
              {pendingCount}
            </Text>
          </View>
        </View>
      </View>

      {/* ── Type Toggle ── */}
      <TypeToggle value={bookingType} onChange={handleTypeChange} />

      {/* ── Pending count bar ── */}
      <View
        className="flex-row items-center mx-4 mb-3.5 bg-neutral-white py-3 px-4 rounded-xl"
        style={{ gap: 8 }}
      >
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: '#fff7ed',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name="time-outline" size={17} color="#f59e0b" />
        </View>
        <Text className="text-base font-semibold text-neutral-700">
          <Text className="font-extrabold text-neutral-800">{pendingCount}</Text>
          {' '}Pending Requests
        </Text>
      </View>

      {/* ── Status Tabs ── */}
      <View className="flex-row px-4 mb-3.5 gap-2" style={{ backgroundColor: BG }}>
        {STATUS_TABS.map(tab => {
          const active = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 20,
                backgroundColor: active ? '#f43f5e' : '#fff',
              }}
              activeOpacity={0.8}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: active ? '700' : '500',
                  color: active ? '#fff' : '#9ca3af',
                }}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ── Booking List ── */}
      <ScrollView
        className="flex-1"
        style={{ backgroundColor: BG }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 4, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {filtered.length === 0 ? (
          <EmptyState tab={activeTab} />
        ) : (
          filtered.map(booking => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onAccept={handleAccept}
              onDecline={handleDecline}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
