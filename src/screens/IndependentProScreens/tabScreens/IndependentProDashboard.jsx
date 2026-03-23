import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import { initializeWorkflowFromBooking } from '../../../redux/slices/independentServiceWorkflowSlice';
import {
  getIndividualProfessionalContext,
  getIndividualReportContent,
  getIndividualWalletContent,
} from '../utils/individualProfessional';

const H_PAD = 16;
const SECTION_GAP = 24;

const QUICK_ACTIONS_ROW1 = [
  {
    icon: 'clipboard-outline',
    label: 'Services',
    iconColor: '#f43f5e',
    bg: '#fecdd3',
    navigateTo: 'IndividualManageServices',
  },
  {
    icon: 'person-outline',
    label: 'Profile',
    iconColor: '#0ea5e9',
    bg: '#e0f2fe',
    navigateTo: 'IndividualProfileManagement',
  },
  {
    icon: 'calendar-outline',
    label: 'Schedule',
    iconColor: '#10b981',
    bg: '#d1fae5',
    navigateTo: 'IndividualAvailability',
  },
  {
    icon: 'bar-chart-outline',
    label: 'Report',
    iconColor: '#ec4899',
    bg: '#fbcfe8',
    navigateTo: 'ViewReport',
  },
];

const QUICK_ACTIONS_ROW2 = [
  {
    icon: 'wallet-outline',
    label: 'Earnings',
    iconColor: '#f97316',
    bg: '#ffedd5',
    navigateTo: 'IndividualEarnings',
  },
  {
    icon: 'notifications-outline',
    label: 'Notifications',
    iconColor: '#8b5cf6',
    bg: '#ede9fe',
    navigateTo: 'IndividualNotifications',
  },
];

const cardShadow = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.06,
  shadowRadius: 10,
  elevation: 2,
};

function Avatar({ src, initials, color = '#fecdd3', size = 48 }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
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
        <Text style={{ fontSize: size * 0.33, color: '#9f1239', fontWeight: '700' }}>
          {initials}
        </Text>
      )}
    </View>
  );
}

function StatCard({ icon, iconBg, iconColor, value, label, onPress }) {
  return (
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
          backgroundColor: iconBg,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name={icon} size={16} color={iconColor} />
      </View>
      <View>
        <Text style={{ fontSize: 16, fontWeight: '800', color: '#111827' }}>{value}</Text>
        <Text
          numberOfLines={1}
          style={{ fontSize: 10, color: '#6b7280', fontWeight: '600', marginTop: 2 }}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function QuickActionBtn({ action, style, onPress }) {
  return (
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
}

export default function IndependentProDashboard({ navigation }) {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const professional = useMemo(
    () => getIndividualProfessionalContext(user),
    [user],
  );
  const report = useMemo(() => getIndividualReportContent(user), [user]);
  const wallet = useMemo(() => getIndividualWalletContent(user), [user]);
  const [refreshing, setRefreshing] = useState(false);
  const [bookings] = useState([
    {
      id: 1,
      customerName: 'Rhea Kapoor',
      service: 'Bridal Makeup',
      duration: '2 hr',
      amount: 4800,
      status: 'pending',
      date: 'Mar 19',
      time: '11:00 AM',
      timeStart: '11:00 AM',
      timeEnd: '1:00 PM',
      type: 'home',
      initials: 'RK',
      avatar: 'https://i.pravatar.cc/150?u=rhea',
      services: [
        { id: 1, name: 'Bridal Makeup', price: 4200 },
        { id: 2, name: 'Lashes', price: 600 },
      ],
    },
    {
      id: 2,
      customerName: 'Megha S.',
      service: 'Hair Styling',
      duration: '45 min',
      amount: 900,
      status: 'accepted',
      date: 'Mar 19',
      time: '2:30 PM',
      timeStart: '2:30 PM',
      timeEnd: '3:15 PM',
      type: 'location',
      initials: 'MS',
      avatar: 'https://i.pravatar.cc/150?u=megha',
      services: [{ id: 1, name: 'Hair Styling', price: 900 }],
    },
    {
      id: 3,
      customerName: 'Ananya R.',
      service: 'Skin Care Session',
      duration: '1 hr',
      amount: 1300,
      status: 'completed',
      date: 'Mar 18',
      time: '4:00 PM',
      timeStart: '4:00 PM',
      timeEnd: '5:00 PM',
      type: 'location',
      initials: 'AR',
      avatar: 'https://i.pravatar.cc/150?u=ananya',
      services: [{ id: 1, name: 'Skin Care Session', price: 1300 }],
    },
  ]);

  const week = report.periods.week;
  const unreadNotifications = 2;

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  const launchWorkflow = () => {
    dispatch(initializeWorkflowFromBooking());
    navigation.navigate('IndividualBookingsTab', {
      screen: 'ArriveScreen',
    });
  };

  const stats = [
    {
      icon: 'calendar-outline',
      iconBg: '#fecdd3',
      iconColor: '#f43f5e',
      value: week.completedBookings,
      label: 'Booked',
      onPress: () =>
        navigation.navigate('IndividualBookingsTab', {
          screen: 'IndividualBookingsHome',
        }),
    },
    {
      icon: 'time-outline',
      iconBg: '#ffedd5',
      iconColor: '#f97316',
      value: bookings.filter(item => item.status === 'pending').length,
      label: 'Pending',
      onPress: () =>
        navigation.navigate('IndividualBookingsTab', {
          screen: 'IndividualBookingsHome',
          params: { initialTab: 'All' },
        }),
    },
    {
      icon: 'checkmark-circle-outline',
      iconBg: '#d1fae5',
      iconColor: '#10b981',
      value: bookings.filter(item => item.status === 'completed').length,
      label: 'Done',
      onPress: () =>
        navigation.navigate('IndividualBookingsTab', {
          screen: 'IndividualBookingsHome',
          params: { initialTab: 'Completed' },
        }),
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff1f2' }} edges={[]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff1f2" />

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
            Hello, {professional.firstName}
          </Text>
          <Text style={{ fontSize: 13, color: '#9ca3af', marginTop: 4 }}>
            {professional.specialization} - {professional.location?.city || 'Independent Pro'}
          </Text>
        </View>

        <TouchableOpacity
          style={{ position: 'relative' }}
          onPress={() => navigation.navigate('IndividualNotifications')}
        >
          <Avatar
            src={professional.profileImage}
            initials={professional.firstName.slice(0, 1)}
            size={44}
          />
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
              borderColor: '#fff1f2',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontSize: 10, fontWeight: '700' }}>
              {unreadNotifications}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#f43f5e"
            colors={['#f43f5e']}
          />
        }
      >
        <View
          style={{
            marginHorizontal: H_PAD,
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
              Start today's{'\n'}service workflow
            </Text>
            <TouchableOpacity
              style={{
                marginTop: 12,
                alignSelf: 'flex-start',
                borderRadius: 50,
                backgroundColor: '#f43f5e',
                paddingHorizontal: 20,
                paddingVertical: 9,
              }}
              activeOpacity={0.85}
              onPress={launchWorkflow}
            >
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 13 }}>
                Open Flow
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            marginHorizontal: H_PAD,
            marginTop: SECTION_GAP,
            borderRadius: 20,
            overflow: 'hidden',
            backgroundColor: '#fff',
            paddingHorizontal: 20,
            paddingVertical: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            ...cardShadow,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: '#111827',
                fontWeight: 'bold',
                fontSize: 18,
                lineHeight: 24,
              }}
            >
              Today's Earnings{'\n'}
              <Text style={{ color: '#f43f5e', fontSize: 28 }}>
                ₹ {wallet.withdrawalReady.toLocaleString()}
              </Text>
            </Text>
            <TouchableOpacity
              style={{
                marginTop: 12,
                alignSelf: 'flex-start',
                borderRadius: 50,
                backgroundColor: '#fff1f2',
                paddingHorizontal: 20,
                paddingVertical: 9,
              }}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('IndividualEarnings')}
            >
              <Text style={{ color: '#f43f5e', fontWeight: '700', fontSize: 13 }}>
                View Wallet
              </Text>
            </TouchableOpacity>
          </View>

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
            <Text style={{ color: '#6b7280', fontSize: 11, fontWeight: '600' }}>
              Available
            </Text>
          </View>
        </View>

        <View
          style={{
            marginHorizontal: H_PAD,
            marginTop: SECTION_GAP,
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'space-between',
          }}
        >
          {stats.map(item => (
            <StatCard
              key={item.label}
              icon={item.icon}
              iconBg={item.iconBg}
              iconColor={item.iconColor}
              value={item.value}
              label={item.label}
              onPress={item.onPress}
            />
          ))}
        </View>

        <View style={{ marginHorizontal: H_PAD, marginTop: SECTION_GAP }}>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            {QUICK_ACTIONS_ROW1.map(action => (
              <QuickActionBtn
                key={action.label}
                action={action}
                onPress={() => navigation.navigate(action.navigateTo)}
                style={{ flex: 1, flexDirection: 'column', gap: 4 }}
              />
            ))}
          </View>

          <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
            {QUICK_ACTIONS_ROW2.map(action => (
              <QuickActionBtn
                key={action.label}
                action={action}
                onPress={() => navigation.navigate(action.navigateTo)}
                style={{ flex: 1, gap: 4 }}
              />
            ))}
          </View>
        </View>

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
              Recent Bookings
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('IndividualBookingsTab', {
                  screen: 'IndividualBookingsHome',
                })
              }
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Text style={{ color: '#f43f5e', fontSize: 14, fontWeight: '600' }}>
                View All
              </Text>
              <Icon name="chevron-forward" size={16} color="#f43f5e" />
            </TouchableOpacity>
          </View>

          {bookings.map(booking => (
            <TouchableOpacity
              key={booking.id}
              onPress={() => navigation.navigate('IndividualBookingDetail', { booking })}
              activeOpacity={0.85}
              style={{
                backgroundColor: '#fff',
                borderRadius: 14,
                padding: 14,
                marginBottom: 12,
                ...cardShadow,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                  }}
                >
                  <Avatar src={booking.avatar} initials={booking.initials} size={48} />
                  <View style={{ marginLeft: 12, flex: 1 }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: '#1f2937',
                        fontSize: 15,
                      }}
                    >
                      {booking.customerName}
                    </Text>
                    <Text style={{ color: '#9ca3af', fontSize: 13, marginTop: 2 }}>
                      {booking.service} - {booking.duration}
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
                <Text style={{ color: '#9ca3af', fontSize: 12 }}>
                  {booking.date}, {booking.time}
                </Text>
                <View
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderRadius: 999,
                    backgroundColor:
                      booking.status === 'pending'
                        ? '#fff7ed'
                        : booking.status === 'accepted'
                        ? '#ecfdf5'
                        : '#eff6ff',
                  }}
                >
                  <Text
                    style={{
                      color:
                        booking.status === 'pending'
                          ? '#f97316'
                          : booking.status === 'accepted'
                          ? '#16a34a'
                          : '#2563eb',
                      fontSize: 11,
                      fontWeight: '700',
                      textTransform: 'capitalize',
                    }}
                  >
                    {booking.status}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

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
              Performance Snapshot
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('ViewReport')}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Text style={{ color: '#f43f5e', fontSize: 14, fontWeight: '600' }}>
                View Report
              </Text>
              <Icon name="chevron-forward" size={16} color="#f43f5e" />
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 14,
              padding: 14,
              marginBottom: 12,
              ...cardShadow,
            }}
          >
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-sm font-semibold text-neutral-800">Weekly summary</Text>
              <Text className="text-xs text-neutral-400">
                ₹{week.earnings.toLocaleString()} earned
              </Text>
            </View>

            {report.highlights.slice(0, 3).map(item => (
              <View key={item.title} className="flex-row items-center mb-3">
                <View
                  className="w-9 h-9 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: `${item.color}18` }}
                >
                  <Icon name={item.icon} size={16} color={item.color} />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-neutral-800">{item.title}</Text>
                  <Text className="text-xs text-neutral-400 mt-0.5">{item.subtitle}</Text>
                </View>
                <Text className="text-sm font-bold text-neutral-800">{item.value}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
