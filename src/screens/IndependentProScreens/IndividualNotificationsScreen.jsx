import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  ReportCard,
  ReportStateCard,
  REPORT_COLORS,
} from '../../components/reports/ReportKit';
import { getIndividualNotifications } from './utils/individualProfessional';

const FILTERS = ['All', 'Unread'];

const typeStyles = {
  booking: { bg: '#fff1f2', color: '#e11d48', icon: 'calendar-outline' },
  wallet: { bg: '#ecfdf5', color: '#16a34a', icon: 'wallet-outline' },
  insight: { bg: '#eff6ff', color: '#2563eb', icon: 'analytics-outline' },
  default: { bg: '#f3f4f6', color: '#6b7280', icon: 'notifications-outline' },
};

function NotificationRow({ item, onToggleRead }) {
  const style = typeStyles[item.type] || typeStyles.default;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onToggleRead(item.id)}
      className="flex-row items-start mb-3 bg-white rounded-2xl p-4"
      style={{
        shadowColor: '#f9a8b8',
        shadowOpacity: 0.12,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
      }}
    >
      <View
        className="w-11 h-11 rounded-full items-center justify-center mr-3"
        style={{ backgroundColor: style.bg }}
      >
        <Icon name={style.icon} size={20} color={style.color} />
      </View>

      <View className="flex-1">
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-bold text-neutral-800 flex-1 pr-2">
            {item.title}
          </Text>
          {!item.read ? <View className="w-2.5 h-2.5 rounded-full bg-rose-500" /> : null}
        </View>
        <Text className="text-sm text-neutral-500 mt-1 leading-5">{item.message}</Text>
        <Text className="text-xs text-neutral-400 mt-2">{item.time}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function IndividualNotificationsScreen({ navigation }) {
  const { user } = useSelector(state => state.auth);
  const [activeFilter, setActiveFilter] = useState('All');
  const [notifications, setNotifications] = useState(() => getIndividualNotifications(user));

  const filtered = useMemo(() => {
    if (activeFilter === 'Unread') {
      return notifications.filter(item => !item.read);
    }

    return notifications;
  }, [activeFilter, notifications]);

  const unreadCount = notifications.filter(item => !item.read).length;

  const toggleRead = id => {
    setNotifications(current =>
      current.map(item => (item.id === id ? { ...item, read: !item.read } : item)),
    );
  };

  const markAllRead = () => {
    setNotifications(current => current.map(item => ({ ...item, read: true })));
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: REPORT_COLORS.bg }} edges={[]}>
      <StatusBar barStyle="dark-content" backgroundColor={REPORT_COLORS.bg} />

      <View
        className="flex-row items-center justify-between px-4 pt-2 pb-3"
        style={{ backgroundColor: REPORT_COLORS.bg }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Icon name="chevron-back" size={26} color={REPORT_COLORS.accent} />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-neutral-800">Notifications</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={markAllRead}>
          <Text className="text-sm font-semibold text-rose-500">Mark all read</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1"
        style={{ backgroundColor: REPORT_COLORS.bg }}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <ReportCard className="mt-1">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-xs font-bold text-rose-500 tracking-wider">
                INBOX SUMMARY
              </Text>
              <Text className="text-2xl font-extrabold text-neutral-800 mt-2">
                {unreadCount} unread
              </Text>
              <Text className="text-sm text-neutral-400 mt-1">
                Booking, wallet, and performance alerts for you.
              </Text>
            </View>
            <View className="w-14 h-14 rounded-full bg-rose-100 items-center justify-center">
              <Icon name="notifications-outline" size={26} color={REPORT_COLORS.accent} />
            </View>
          </View>

          <View className="flex-row gap-2 mt-5">
            {FILTERS.map(filter => {
              const active = activeFilter === filter;

              return (
                <TouchableOpacity
                  key={filter}
                  onPress={() => setActiveFilter(filter)}
                  className={`flex-1 py-2 rounded-full items-center ${active ? 'bg-rose-500' : 'bg-rose-50'}`}
                  activeOpacity={0.8}
                >
                  <Text
                    className={`text-sm font-semibold ${active ? 'text-white' : 'text-rose-500'}`}
                  >
                    {filter}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ReportCard>

        <View className="px-4">
          {filtered.length === 0 ? (
            <ReportStateCard
              icon="notifications-off-outline"
              title="All caught up"
              message={
                activeFilter === 'Unread'
                  ? 'There are no unread notifications right now.'
                  : 'New booking, payout, and profile insights will appear here.'
              }
            />
          ) : (
            filtered.map(item => (
              <NotificationRow key={item.id} item={item} onToggleRead={toggleRead} />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
