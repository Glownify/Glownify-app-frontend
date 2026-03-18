import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

// ─── Constants ────────────────────────────────────────────────────────────────

const H_PAD = 16;
const SECTION_GAP = 24;

// ─── Mock Data ────────────────────────────────────────────────────────────────
// TODO: Replace all MOCK_* with real API calls
// e.g. const stats = await api.get('/pro/dashboard/stats')

const MOCK_PRO_STATS = {
  todayEarnings: 3200,
  bookedToday: 8,
  pendingRequests: 3,
  completedToday: 5,
  rating: 4.8,
  totalClients: 241,
};

const MOCK_UPCOMING_BOOKINGS = [
  {
    id: 1,
    customer: 'Priya S.',
    service: 'Hair Cut & Style',
    duration: '45 min',
    amount: 800,
    status: 'pending',
    time: 'Today, 11:00 AM',
    avatar: 'https://i.pravatar.cc/150?u=priya',
  },
  {
    id: 2,
    customer: 'Ritu M.',
    service: 'Keratin Treatment',
    duration: '2 hr',
    amount: 2500,
    status: 'pending',
    time: 'Today, 1:30 PM',
    avatar: 'https://i.pravatar.cc/150?u=ritu',
  },
  {
    id: 3,
    customer: 'Sonal K.',
    service: 'Blow Dry',
    duration: '30 min',
    amount: 400,
    status: 'accepted',
    time: 'Today, 3:00 PM',
    avatar: 'https://i.pravatar.cc/150?u=sonal',
  },
];

const MOCK_REVIEWS = [
  {
    id: 1,
    name: 'Kavya R.',
    rating: 5,
    text: 'Absolutely loved my hair transformation! Very skilled and professional.',
    initials: 'KR',
    avatarColor: '#a5f3fc',
    date: 'Mar 14',
  },
  {
    id: 2,
    name: 'Deepa N.',
    rating: 4,
    text: 'Great experience, the keratin treatment was done perfectly.',
    initials: 'DN',
    avatarColor: '#bbf7d0',
    date: 'Mar 12',
  },
];

const MOCK_SERVICES = [
  { id: 1, name: 'Hair Cut', price: 500, duration: '30 min', bookings: 42 },
  { id: 2, name: 'Keratin', price: 2500, duration: '2 hr', bookings: 28 },
  { id: 3, name: 'Blow Dry', price: 400, duration: '30 min', bookings: 35 },
];

// Row 1 — 4 compact quick actions
const QUICK_ACTIONS_ROW1 = [
  {
    icon: 'cut-outline',
    label: 'Add Service',
    iconColor: '#f43f5e',
    bg: '#fecdd3',
    navigateTo: 'AddService',
  },
  {
    icon: 'eye-outline',
    label: 'My Profile',
    iconColor: '#0ea5e9',
    bg: '#e0f2fe',
    navigateTo: 'ProProfile',
  },
  {
    icon: 'calendar-outline',
    label: 'Schedule',
    iconColor: '#10b981',
    bg: '#d1fae5',
    navigateTo: 'ProSchedule',
  },
  {
    icon: 'bar-chart-outline',
    label: 'Earnings',
    iconColor: '#ec4899',
    bg: '#fbcfe8',
    navigateTo: 'ProEarnings',
  },
];

// Row 2 — 2 wide actions
const QUICK_ACTIONS_ROW2 = [
  {
    icon: 'share-outline',
    label: 'Share Profile',
    iconColor: '#f97316',
    bg: '#ffedd5',
    navigateTo: 'ShareProfile',
  },
  {
    icon: 'trophy-outline',
    label: 'Achievements',
    iconColor: '#8b5cf6',
    bg: '#ede9fe',
    navigateTo: 'Achievements',
  },
];

// Stats config
const STATS_CONFIG = [
  {
    key: 'bookedToday',
    label: 'Booked',
    icon: 'calendar-outline',
    iconColor: '#f43f5e',
    iconBg: '#fecdd3',
    navigateTo: 'ProBookings',
  },
  {
    key: 'pendingRequests',
    label: 'Pending',
    icon: 'time-outline',
    iconColor: '#f97316',
    iconBg: '#ffedd5',
    navigateTo: 'ProPending',
  },
  {
    key: 'completedToday',
    label: 'Done Today',
    icon: 'checkmark-circle-outline',
    iconColor: '#10b981',
    iconBg: '#d1fae5',
    navigateTo: 'ProCompleted',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const cardShadow = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.06,
  shadowRadius: 10,
  elevation: 2,
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const Avatar = ({ src, initials, color, size = 48 }) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: color || '#a5f3fc',
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {src ? (
      <Image
        source={{ uri: src }}
        style={{ width: '100%', height: '100%', borderRadius: size / 2 }}
        resizeMode="cover"
      />
    ) : (
      <Text
        style={{ fontSize: size * 0.33, color: '#0e7490', fontWeight: '700' }}
      >
        {initials}
      </Text>
    )}
  </View>
);

// ── Stat Card ─────────────────────────────────────────────────────────────────

const StatCard = ({ config, value, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    style={{
      flex: 1,
      gap: 5,
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 14,
      paddingVertical: 10,
      paddingHorizontal: 10,
      flexDirection: 'row',
      ...cardShadow,
    }}
  >
    <View
      style={{
        width: 32,
        height: 32,
        borderRadius: 10,
        backgroundColor: config.iconBg,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon name={config.icon} size={16} color={config.iconColor} />
    </View>
    <View>
      <Text style={{ fontSize: 16, fontWeight: '800', color: '#111827' }}>
        {value}
      </Text>
      <Text
        numberOfLines={1}
        style={{ fontSize: 10, color: '#6b7280', fontWeight: '600', marginTop: 2 }}
      >
        {config.label}
      </Text>
    </View>
  </TouchableOpacity>
);

// ── Quick Action Button ───────────────────────────────────────────────────────

const QuickActionBtn = ({ action, style, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.7}
    style={[
      {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: action.bg,
        borderRadius: 14,
        padding: 12,
        elevation: 1,
      },
      style,
    ]}
    onPress={onPress}
  >
    <View>
      <Icon name={action.icon} size={20} color={action.iconColor} />
    </View>
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 12,
          fontWeight: '600',
          color: '#374151',
        }}
      >
        {action.label}
      </Text>
    </View>
  </TouchableOpacity>
);

// ── Service Row ───────────────────────────────────────────────────────────────

const ServiceRow = ({ service, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    style={{
      backgroundColor: '#fff',
      borderRadius: 14,
      padding: 14,
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      ...cardShadow,
    }}
  >
    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          backgroundColor: '#fecdd3',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 12,
        }}
      >
        <Icon name="cut-outline" size={18} color="#f43f5e" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: '700', color: '#1f2937', fontSize: 14 }}>
          {service.name}
        </Text>
        <Text style={{ color: '#9ca3af', fontSize: 12, marginTop: 2 }}>
          {service.duration} • {service.bookings} bookings
        </Text>
      </View>
    </View>
    <View style={{ alignItems: 'flex-end' }}>
      <Text style={{ fontWeight: '800', color: '#1f2937', fontSize: 15 }}>
        ₹{service.price.toLocaleString()}
      </Text>
      <Icon name="chevron-forward" size={14} color="#9ca3af" style={{ marginTop: 2 }} />
    </View>
  </TouchableOpacity>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function IndependentProDashboard({ navigation }) {
  const [bookings, setBookings] = useState(MOCK_UPCOMING_BOOKINGS);
  const [refreshing, setRefreshing] = useState(false);

  // ── API Integration Points ─────────────────────────────────────────────────
  // TODO: Replace with real data fetcher
  // const fetchDashboardData = async () => {
  //   const [stats, bookingsData, reviewsData, servicesData] = await Promise.all([
  //     api.get('/pro/stats'),
  //     api.get('/pro/bookings/upcoming'),
  //     api.get('/pro/reviews/recent'),
  //     api.get('/pro/services'),
  //   ]);
  //   setStats(stats.data);
  //   setBookings(bookingsData.data);
  //   ...
  // };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // TODO: await fetchDashboardData();
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const handleAccept = id =>
    setBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, status: 'accepted' } : b)),
    );
  // TODO: await api.patch(`/pro/bookings/${id}/accept`)

  const handleDecline = id =>
    setBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, status: 'declined' } : b)),
    );
  // TODO: await api.patch(`/pro/bookings/${id}/decline`)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8f6f8' }} >


      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#156778"
            colors={['#156778']}
          />
        }
      >

              {/* ── Header ─────────────────────────────────────────────────────── */}
      <View
        style={{
          paddingHorizontal: H_PAD,
          paddingTop: 12,
          paddingBottom: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1f2937' }}>
            Hello, Raj Kumar 👋
          </Text>
          {/* Rating Badge */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
            <Icon name="star" size={13} color="#fbbf24" />
            <Text style={{ fontSize: 13, fontWeight: '700', color: '#374151', marginLeft: 3 }}>
              {MOCK_PRO_STATS.rating}
            </Text>
            <Text style={{ fontSize: 12, color: '#9ca3af', marginLeft: 4 }}>
              • {MOCK_PRO_STATS.totalClients} clients
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={{ position: 'relative' }}
          onPress={() => navigation?.navigate('ProNotifications')}
        >
          <Avatar src="https://i.pravatar.cc/150?u=raj_pro" size={44} />
          <View
            style={{
              position: 'absolute',
              top: -2,
              right: -2,
              width: 18,
              height: 18,
              borderRadius: 9,
              backgroundColor: '#f43f5e',
              borderWidth: 2,
              borderColor: '#e8f6f8',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontSize: 10, fontWeight: '700' }}>
              2
            </Text>
          </View>
        </TouchableOpacity>
      </View>
        {/* ── Promotional / Availability Banner ──────────────────────── */}
        <View
          style={{
            marginHorizontal: H_PAD,
            marginTop: SECTION_GAP - 8,
            borderRadius: 20,
            overflow: 'hidden',
            backgroundColor: '#111827',
            paddingHorizontal: 20,
            paddingVertical: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 18,
                lineHeight: 24,
              }}
            >
              Today's Earnings{'\n'}
              <Text style={{ color: '#5eead4', fontSize: 26 }}>
                ₹ {MOCK_PRO_STATS.todayEarnings.toLocaleString()}
              </Text>
            </Text>
            <TouchableOpacity
              onPress={() => navigation?.navigate('ProEarnings')}
              style={{
                marginTop: 12,
                alignSelf: 'flex-start',
                borderRadius: 50,
                backgroundColor: '#156778',
                paddingHorizontal: 20,
                paddingVertical: 9,
              }}
              activeOpacity={0.85}
            >
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 13 }}>
                View Details
              </Text>
            </TouchableOpacity>
          </View>

          {/* Availability toggle */}
          <View style={{ alignItems: 'center' }}>
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: '#10b981',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 6,
              }}
            >
              <Icon name="checkmark-circle" size={32} color="#fff" />
            </View>
            <Text style={{ color: '#d1d5db', fontSize: 11, fontWeight: '600' }}>
              Available
            </Text>
            {/* TODO: Toggle availability via api.patch('/pro/availability') */}
          </View>
        </View>

        {/* ── Stats Cards ─────────────────────────────────────────────── */}
        <View
          style={{
            marginHorizontal: H_PAD,
            marginTop: SECTION_GAP,
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'space-between',
          }}
        >
          {STATS_CONFIG.map(config => (
            <StatCard
              key={config.key}
              config={config}
              value={MOCK_PRO_STATS[config.key]}
              onPress={() => navigation?.navigate(config.navigateTo)}
            />
          ))}
        </View>

        {/* ── Quick Actions ───────────────────────────────────────────── */}
        <View style={{ marginHorizontal: H_PAD, marginTop: SECTION_GAP }}>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            {QUICK_ACTIONS_ROW1.map(action => (
              <QuickActionBtn
                key={action.label}
                action={action}
                onPress={() => navigation?.navigate?.(action.navigateTo)}
                style={{ flex: 1, flexDirection: 'column', gap: 4 }}
              />
            ))}
          </View>
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
            {QUICK_ACTIONS_ROW2.map(action => (
              <QuickActionBtn
                key={action.label}
                action={action}
                onPress={() => navigation?.navigate?.(action.navigateTo)}
                style={{ flex: 1, gap: 4 }}
              />
            ))}
          </View>
        </View>

        {/* ── Upcoming Bookings ───────────────────────────────────────── */}
        <View style={{ marginHorizontal: H_PAD, marginTop: SECTION_GAP }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 14,
            }}
          >
            <Text style={{ fontWeight: 'bold', color: '#1f2937', fontSize: 18 }}>
              Upcoming Bookings
            </Text>
            <TouchableOpacity
              onPress={() => navigation?.navigate('ProBookings')}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Text style={{ color: '#156778', fontSize: 14, fontWeight: '600' }}>
                View All
              </Text>
              <Icon name="chevron-forward" size={16} color="#156778" />
            </TouchableOpacity>
          </View>

          {bookings.map(booking => (
            <View
              key={booking.id}
              style={{
                backgroundColor: '#fff',
                borderRadius: 14,
                padding: 14,
                marginBottom: 12,
                ...cardShadow,
              }}
            >
              {/* Status pill (shown when not pending) */}
              {booking.status !== 'pending' && (
                <View
                  style={{
                    alignSelf: 'flex-start',
                    backgroundColor:
                      booking.status === 'accepted' ? '#d1fae5' : '#fee2e2',
                    borderRadius: 20,
                    paddingHorizontal: 10,
                    paddingVertical: 3,
                    marginBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: '700',
                      color: booking.status === 'accepted' ? '#059669' : '#e11d48',
                      textTransform: 'capitalize',
                    }}
                  >
                    {booking.status}
                  </Text>
                </View>
              )}

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <Avatar src={booking.avatar} size={48} />
                  <View style={{ marginLeft: 12, flex: 1 }}>
                    <Text style={{ fontWeight: 'bold', color: '#1f2937', fontSize: 15 }}>
                      {booking.customer}
                    </Text>
                    <Text style={{ color: '#9ca3af', fontSize: 13, marginTop: 2 }}>
                      {booking.service} • {booking.duration}
                    </Text>
                  </View>
                </View>
                <Text style={{ fontWeight: 'bold', color: '#1f2937', fontSize: 15 }}>
                  ₹ {booking.amount.toLocaleString()}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 14,
                  paddingTop: 14,
                  borderTopWidth: 1,
                  borderTopColor: '#f3f4f6',
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name="time-outline" size={13} color="#9ca3af" />
                  <Text style={{ color: '#9ca3af', fontSize: 12, marginLeft: 4 }}>
                    {booking.time}
                  </Text>
                </View>

                {booking.status === 'pending' && (
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <TouchableOpacity
                      onPress={() => handleAccept(booking.id)}
                      style={{
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        borderRadius: 10,
                        backgroundColor: '#059669',
                      }}
                    >
                      <Text style={{ color: '#fff', fontWeight: '700', fontSize: 12 }}>
                        Accept
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDecline(booking.id)}
                      style={{
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        borderRadius: 10,
                        backgroundColor: '#e11d48',
                      }}
                    >
                      <Text style={{ color: '#fff', fontWeight: '700', fontSize: 12 }}>
                        Decline
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* ── My Services ─────────────────────────────────────────────── */}
        <View style={{ marginHorizontal: H_PAD, marginTop: SECTION_GAP }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 14,
            }}
          >
            <Text style={{ fontWeight: 'bold', color: '#1f2937', fontSize: 18 }}>
              My Services
            </Text>
            <TouchableOpacity
              onPress={() => navigation?.navigate('ProServices')}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Text style={{ color: '#156778', fontSize: 14, fontWeight: '600' }}>
                Manage
              </Text>
              <Icon name="chevron-forward" size={16} color="#156778" />
            </TouchableOpacity>
          </View>

          {MOCK_SERVICES.map(service => (
            <ServiceRow
              key={service.id}
              service={service}
              onPress={() => navigation?.navigate('ProServiceDetail', { service })}
            />
          ))}
        </View>

        {/* ── Recent Reviews ──────────────────────────────────────────── */}
        <View style={{ marginHorizontal: H_PAD, marginTop: SECTION_GAP }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 14,
            }}
          >
            <Text style={{ fontWeight: 'bold', color: '#1f2937', fontSize: 18 }}>
              Recent Reviews
            </Text>
            <TouchableOpacity
              onPress={() => navigation?.navigate('ProReviews')}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Text style={{ color: '#156778', fontSize: 14, fontWeight: '600' }}>
                View All
              </Text>
              <Icon name="chevron-forward" size={16} color="#156778" />
            </TouchableOpacity>
          </View>

          {MOCK_REVIEWS.map(review => (
            <View
              key={review.id}
              style={{
                backgroundColor: '#fff',
                borderRadius: 14,
                padding: 14,
                marginBottom: 12,
                ...cardShadow,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <Avatar
                  initials={review.initials}
                  color={review.avatarColor}
                  size={44}
                />
                <View style={{ marginLeft: 12, flex: 1 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ fontWeight: 'bold', color: '#1f2937', fontSize: 15 }}>
                        {review.name}
                      </Text>
                      <View style={{ flexDirection: 'row', marginLeft: 8 }}>
                        {[1, 2, 3, 4, 5].map(i => (
                          <Icon
                            key={i}
                            name="star"
                            size={10}
                            color={i <= review.rating ? '#fbbf24' : '#e5e7eb'}
                          />
                        ))}
                      </View>
                    </View>
                    <Text style={{ color: '#9ca3af', fontSize: 12 }}>
                      {review.date}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: '#6b7280',
                      marginTop: 4,
                      fontSize: 13,
                      lineHeight: 18,
                    }}
                  >
                    {review.text}
                  </Text>
                </View>
                <Icon
                  name="chevron-forward"
                  size={16}
                  color="#9ca3af"
                  style={{ marginLeft: 4 }}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}