/**
 * SalonBookingsScreen.jsx
 *
 * ✅ Original pink UI preserved exactly as designed.
 * ✅ Type toggle (Salon Visit / Home Service) always visible at top.
 * ✅ Bottom sheet removed.
 * ✅ Styled with NativeWind className only (no StyleSheet).
 *
 * Dependencies:
 *   nativewind  react-native-reanimated
 *   react-native-gesture-handler  react-native-vector-icons/Ionicons
 */

import React, {
  useState,
  useRef,
  useEffect,
} from 'react';
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

const MOCK_BOOKINGS = [
  {
    id: 1,
    customerName: 'Rahul P.',
    service: 'Bridal Makeup',
    specialist: 'Pooja S.',
    specialistIcon: 'timer-outline',
    date: 'May 13',
    time: '1:00 PM',
    duration: '2 hrs',
    status: 'pending',
    type: 'salon',
    isNew: true,
    amount: 5000,
    totalAmount: 2500,
    initials: 'RP',
    avatar: 'https://i.pravatar.cc/150?u=rahul',
  },
  {
    id: 2,
    customerName: 'Ayesha',
    service: 'Waxing + Facial',
    specialist: 'Priya',
    specialistIcon: 'location-outline',
    date: 'May 13',
    time: '12:00 PM',
    duration: '1.5 hr',
    status: 'pending',
    type: 'home',
    isNew: true,
    amount: 1800,
    totalAmount: 1800,
    initials: 'AY',
    avatar: 'https://i.pravatar.cc/150?u=ayesha',
  },
  {
    id: 3,
    customerName: 'Sunil',
    service: 'Hair Cut + Shave',
    specialist: 'Ajay',
    specialistIcon: 'person-circle-outline',
    date: 'May 13',
    time: '11:00 AM',
    duration: '1.5 hr',
    status: 'pending',
    type: 'salon',
    isNew: false,
    amount: 900,
    totalAmount: 900,
    initials: 'SU',
    avatar: 'https://i.pravatar.cc/150?u=sunil',
  },
  {
    id: 4,
    customerName: 'Mehak S.',
    service: 'Spa Manicure',
    specialist: 'Pooja S.',
    specialistIcon: 'storefront-outline',
    date: 'May 13',
    time: '10:30 AM',
    duration: '45 min',
    status: 'pending',
    type: 'home',
    isNew: false,
    amount: 600,
    totalAmount: 600,
    initials: 'MS',
    avatar: 'https://i.pravatar.cc/150?u=mehak',
  },
  {
    id: 5,
    customerName: 'Amit K.',
    service: 'Full Grooming',
    serviceSubtitle: '(Haircut, Shave, & Massage)',
    specialist: 'Rohit',
    specialistIcon: 'cut-outline',
    date: 'May 13',
    time: '10:00 AM',
    duration: '1.5 hrs',
    status: 'pending',
    type: 'salon',
    isNew: false,
    amount: 1500,
    totalAmount: 1500,
    initials: 'AK',
    avatar: 'https://i.pravatar.cc/150?u=amit2',
  },
  {
    id: 6,
    customerName: 'Anjali Verma',
    service: 'Coloring',
    specialist: 'Raj Kumar',
    specialistIcon: 'person-outline',
    date: 'May 16',
    time: '11:00 AM',
    duration: '2 hrs',
    status: 'accepted',
    type: 'home',
    isNew: false,
    amount: 2200,
    totalAmount: 2200,
    initials: 'AV',
    avatar: 'https://i.pravatar.cc/150?u=anjali',
  },
  {
    id: 7,
    customerName: 'Vikram Singh',
    service: 'Beard Trim',
    specialist: 'Arjun Reddy',
    specialistIcon: 'person-outline',
    date: 'May 10',
    time: '3:00 PM',
    duration: '30 min',
    status: 'completed',
    type: 'salon',
    isNew: false,
    amount: 800,
    totalAmount: 800,
    initials: 'VS',
    avatar: 'https://i.pravatar.cc/150?u=vikram',
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
      onPress={() => navigation.navigate('BookingDetail')}
      activeOpacity={0.92}
      className="bg-neutral-white rounded-2xl p-3.5 mb-3"
      style={{
        shadowColor: '#f9a8b8',
        shadowOpacity: 0.18,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
      }}
    >
      {/* Top row: avatar + name/service + NEW badge + amount */}
      <View className="flex-row items-start">
        <Avatar src={booking.avatar} initials={booking.initials} size={56} />

        <View className="flex-1 ml-3">
          {/* Name row */}
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

          {/* Service */}
          <Text className="text-sm text-neutral-500 mt-0.5">{booking.service}</Text>
          {booking.serviceSubtitle ? (
            <Text className="text-xs text-neutral-400 mt-0.5">{booking.serviceSubtitle}</Text>
          ) : null}

          {/* Date + Specialist + Amount inline */}
          <View className="flex-row items-center justify-between mt-2">
            <View className="flex-row items-center gap-1">
              <Icon name="calendar-outline" size={13} color="#9ca3af" />
              <Text className="text-xs text-neutral-500">
                {booking.date}, {booking.time}
              </Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Icon name="person-circle-outline" size={13} color="#9ca3af" />
              <Text className="text-xs text-neutral-500">{booking.specialist}</Text>
            </View>
            <Text className="text-base font-bold text-neutral-800">
              ₹ {booking.amount.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>

      {/* Divider */}
      <View className="h-px bg-pink-50 my-3" />

      {/* Bottom row */}
      <View className="flex-row items-center justify-between">
        {/* Left: Total + duration */}
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

        {/* Status badge for non-pending */}
        {!isPending && (
          <View
            className={`rounded-full px-3 py-1
              ${booking.status === 'accepted'  ? 'bg-green-50'  : ''}
              ${booking.status === 'completed' ? 'bg-blue-50'   : ''}
              ${booking.status === 'declined'  ? 'bg-red-50'    : ''}`}
          >
            <Text
              className={`text-xs font-bold capitalize
                ${booking.status === 'accepted'  ? 'text-success' : ''}
                ${booking.status === 'completed' ? 'text-info'    : ''}
                ${booking.status === 'declined'  ? 'text-error'   : ''}`}
            >
              {booking.status}
            </Text>
          </View>
        )}

        {/* Accept / Decline buttons */}
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
  const anim = useRef(new Animated.Value(value === 'salon' ? 0 : 1)).current;
  const halfW = (SCREEN_W - 32) / 2;

  useEffect(() => {
    Animated.spring(anim, {
      toValue: value === 'salon' ? 0 : 1,
      useNativeDriver: false,
      tension: 80,
      friction: 10,
    }).start();
  }, [value]);

  const thumbLeft = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [3, halfW + 3],
  });

  const OPTS = [
    { key: 'salon', icon: 'storefront-outline', label: 'Salon Visit'   },
    { key: 'home',  icon: 'home-outline',        label: 'Home Service' },
  ];

  return (
    <View className="flex-row bg-neutral-white rounded-2xl border border-neutral-200 p-0.5 mx-md relative overflow-hidden mb-3">
      <Animated.View
        className="absolute top-0.5 bottom-0.5 bg-primary-100 rounded-xl"
        style={{ left: thumbLeft, width: halfW - 6 }}
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
            <Icon
              name={opt.icon}
              size={14}
              color={active ? '#e11d48' : '#9ca3af'}
            />
            <Text
              className={`text-sm font-semibold
                ${active ? 'text-primary-600' : 'text-neutral-400'}`}
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
      className="rounded-full bg-pink-100 items-center justify-center mb-4"
      style={{ width: 72, height: 72 }}
    >
      <Icon name="calendar-outline" size={34} color="#f48fb1" />
    </View>
    <Text className="text-base font-bold text-neutral-700">No bookings here</Text>
    <Text className="text-sm text-neutral-400 mt-1">Nothing in "{tab}" yet</Text>
  </View>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function SalonBookingsScreen({ navigation }) {
  const [bookings, setBookings]       = useState(MOCK_BOOKINGS);
  const [activeTab, setActiveTab]     = useState('All');
  const [bookingType, setBookingType] = useState('salon'); // default to 'salon'

  const handleTypeChange = type => {
    setBookingType(type);
    setActiveTab('All');
  };

  const handleAccept = id => {
    Alert.alert('Booking Accepted', 'Specialist has been notified.');
    setBookings(prev =>
      prev.map(b => b.id === id ? { ...b, status: 'accepted' } : b),
    );
  };

  const handleDecline = id => {
    Alert.alert('Booking Declined', 'Customer has been notified.');
    setBookings(prev =>
      prev.map(b => b.id === id ? { ...b, status: 'declined' } : b),
    );
  };

  const pendingCount = bookings.filter(
    b => b.status === 'pending' && b.type === bookingType,
  ).length;

  const allowedStatuses = getStatusFilter(activeTab);
  const filtered = bookings.filter(b => {
    const statusMatch = allowedStatuses.includes(b.status);
    const typeMatch   = b.type === bookingType;
    return statusMatch && typeMatch;
  });

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: BG }} edges={[]}>
      <StatusBar barStyle="dark-content" backgroundColor={BG} />

      {/* ── Header ── */}
      <View
        className="flex-row items-center justify-between px-4 pt-2 pb-3"
        style={{ backgroundColor: BG }}
      >
        <TouchableOpacity onPress={() => navigation?.goBack()} activeOpacity={0.7}>
          <Icon name="chevron-back" size={26} color="#e91e63" />
        </TouchableOpacity>

        <Text className="text-lg font-bold text-neutral-800">New Booking Requests</Text>

        {/* Avatar with badge */}
        <View className="relative">
          <Avatar src="https://i.pravatar.cc/150?u=salon_admin_f" size={40} />
          <View
            className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-primary-500 border-2 items-center justify-center"
            style={{ borderColor: BG }}
          >
            <Text className="text-neutral-white text-xs font-bold" style={{ fontSize: 10 }}>
              3
            </Text>
          </View>
        </View>
      </View>

      {/* ── Type Toggle — always visible ── */}
      <TypeToggle value={bookingType} onChange={handleTypeChange} />

      {/* ── Pending count bar ── */}
      <View className="flex-row items-center justify-between mx-4 mb-3.5 bg-neutral-white py-3 px-4 rounded-xl">
        <View className="flex-row items-center gap-2">
          <View className="w-8 h-8 rounded-full bg-neutral-white items-center justify-center">
            <Icon name="time-outline" size={17} color="#f59e0b" />
          </View>
          <Text className="text-base font-semibold text-neutral-700">
            <Text className="font-extrabold text-neutral-800">{pendingCount}</Text>
            {' '}Pending Requests
          </Text>
        </View>
      </View>

      {/* ── Status Tabs ── */}
      <View className="flex-row px-4 mb-3.5 gap-2" style={{ backgroundColor: BG }}>
        {STATUS_TABS.map(tab => {
          const active = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full ${active ? 'bg-primary-400' : 'bg-neutral-white'}`}
              activeOpacity={0.8}
            >
              <Text
                className={`text-sm ${active ? 'font-bold text-neutral-white' : 'font-medium text-neutral-400'}`}
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