/**
 * SalonReportScreen.jsx
 *
 * ✅ Pink BG (#fff1f2) — matches SalonBookingsScreen & SubscriptionPlanScreen.
 * ✅ Charts via react-native-gifted-charts (BarChart, LineChart, PieChart).
 * ✅ Period toggle: Week / Month / Year.
 * ✅ Stat cards, top services list, top specialists list.
 * ✅ NativeWind className only — no StyleSheet.
 * ✅ All data is dummy — replace with API/Redux selectors as needed.
 *
 * Dependencies:
 *   react-native-gifted-charts  react-native-linear-gradient
 *   react-native-svg  nativewind  react-native-vector-icons/Ionicons
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { BarChart, LineChart, PieChart } from 'react-native-gifted-charts';

const BG       = '#fff1f2';
const ROSE     = '#e11d48';
const ROSE_LIGHT = '#fda4af';
const SCREEN_W = Dimensions.get('window').width;
const CHART_W  = SCREEN_W - 64; // card padding: 16 margin each side + 16 inner pad each side

// ─── Dummy Data — swap with Redux / API ───────────────────────────────────────

const DATA = {
  week: {
    revenue:     12400,
    revenueDiff: +8.4,
    bookings:    47,
    bookingsDiff: +12.1,
    newClients:  9,
    newClientsDiff: +3.2,
    avgTicket:   264,
    avgTicketDiff: -2.1,

    revenueBar: [
      { value: 1200, label: 'Mon', frontColor: ROSE_LIGHT },
      { value: 1850, label: 'Tue', frontColor: ROSE },
      { value: 980,  label: 'Wed', frontColor: ROSE_LIGHT },
      { value: 2100, label: 'Thu', frontColor: ROSE },
      { value: 1750, label: 'Fri', frontColor: ROSE_LIGHT },
      { value: 2800, label: 'Sat', frontColor: ROSE },
      { value: 1720, label: 'Sun', frontColor: ROSE_LIGHT },
    ],

    bookingsLine: [
      { value: 5,  label: 'Mon' },
      { value: 9,  label: 'Tue' },
      { value: 6,  label: 'Wed' },
      { value: 11, label: 'Thu' },
      { value: 8,  label: 'Fri' },
      { value: 14, label: 'Sat' },
      { value: 8,  label: 'Sun' },
    ],
  },

  month: {
    revenue:     58300,
    revenueDiff: +14.2,
    bookings:    214,
    bookingsDiff: +9.7,
    newClients:  38,
    newClientsDiff: +22.0,
    avgTicket:   272,
    avgTicketDiff: +4.3,

    revenueBar: [
      { value: 8200,  label: 'W1',  frontColor: ROSE_LIGHT },
      { value: 14500, label: 'W2',  frontColor: ROSE },
      { value: 17400, label: 'W3',  frontColor: ROSE },
      { value: 18200, label: 'W4',  frontColor: ROSE_LIGHT },
    ],

    bookingsLine: [
      { value: 44, label: 'W1' },
      { value: 62, label: 'W2' },
      { value: 58, label: 'W3' },
      { value: 50, label: 'W4' },
    ],
  },

  year: {
    revenue:     694000,
    revenueDiff: +21.6,
    bookings:    2580,
    bookingsDiff: +18.3,
    newClients:  430,
    newClientsDiff: +31.0,
    avgTicket:   269,
    avgTicketDiff: +2.8,

    revenueBar: [
      { value: 42000, label: 'Jan', frontColor: ROSE_LIGHT },
      { value: 38000, label: 'Feb', frontColor: ROSE_LIGHT },
      { value: 51000, label: 'Mar', frontColor: ROSE },
      { value: 62000, label: 'Apr', frontColor: ROSE },
      { value: 74000, label: 'May', frontColor: ROSE },
      { value: 68000, label: 'Jun', frontColor: ROSE_LIGHT },
      { value: 55000, label: 'Jul', frontColor: ROSE_LIGHT },
      { value: 72000, label: 'Aug', frontColor: ROSE },
      { value: 80000, label: 'Sep', frontColor: ROSE },
      { value: 66000, label: 'Oct', frontColor: ROSE_LIGHT },
      { value: 43000, label: 'Nov', frontColor: ROSE_LIGHT },
      { value: 43000, label: 'Dec', frontColor: ROSE_LIGHT },
    ],

    bookingsLine: [
      { value: 180, label: 'Jan' },
      { value: 160, label: 'Feb' },
      { value: 210, label: 'Mar' },
      { value: 240, label: 'Apr' },
      { value: 290, label: 'May' },
      { value: 265, label: 'Jun' },
      { value: 220, label: 'Jul' },
      { value: 270, label: 'Aug' },
      { value: 305, label: 'Sep' },
      { value: 260, label: 'Oct' },
      { value: 180, label: 'Nov' },
      { value: 180, label: 'Dec' },
    ],
  },
};

const TOP_SERVICES = [
  { name: 'Bridal Makeup',    bookings: 38, revenue: 190000, color: '#e11d48' },
  { name: 'Hair Colour',      bookings: 54, revenue: 118800, color: '#f97316' },
  { name: 'Facial + Cleanup', bookings: 71, revenue: 106500, color: '#fb7185' },
  { name: 'Waxing',           bookings: 93, revenue: 83700,  color: '#fda4af' },
  { name: 'Spa Manicure',     bookings: 49, revenue: 73500,  color: '#fecdd3' },
];

const PIE_DATA = [
  { value: 38, color: '#e11d48', text: '18%' },
  { value: 54, color: '#f97316', text: '26%' },
  { value: 71, color: '#fb7185', text: '34%' },
  { value: 49, color: '#fda4af', text: '22%' },
];

const TOP_SPECIALISTS = [
  { name: 'Pooja S.',    bookings: 64, rating: 4.9, initials: 'PS', revenue: 128000 },
  { name: 'Priya M.',    bookings: 57, rating: 4.8, initials: 'PM', revenue: 102600 },
  { name: 'Ajay R.',     bookings: 49, rating: 4.7, initials: 'AR', revenue: 88200  },
  { name: 'Rohit K.',    bookings: 44, rating: 4.6, initials: 'RK', revenue: 79200  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = n =>
  n >= 100000
    ? `₹${(n / 100000).toFixed(1)}L`
    : n >= 1000
    ? `₹${(n / 1000).toFixed(1)}k`
    : `₹${n}`;

const fmtCount = n =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`;

// ─── Section Heading ──────────────────────────────────────────────────────────

const SectionHeading = ({ icon, title }) => (
  <View className="flex-row items-center gap-2 mb-3 px-4">
    <View className="w-7 h-7 rounded-full bg-rose-100 items-center justify-center">
      <Icon name={icon} size={14} color={ROSE} />
    </View>
    <Text className="text-base font-bold text-neutral-800">{title}</Text>
  </View>
);

// ─── Stat Card ────────────────────────────────────────────────────────────────

const StatCard = ({ icon, label, value, diff, accent }) => {
  const up = diff >= 0;
  return (
    <View
      className="bg-white rounded-2xl p-4 flex-1"
      style={{
        shadowColor: '#f9a8b8',
        shadowOpacity: 0.15,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
      }}
    >
      <View
        className="w-9 h-9 rounded-full items-center justify-center mb-2"
        style={{ backgroundColor: accent + '22' }}
      >
        <Icon name={icon} size={17} color={accent} />
      </View>
      <Text className="text-2xl font-extrabold text-neutral-800">{value}</Text>
      <Text className="text-xs text-neutral-400 font-medium mt-0.5">{label}</Text>

      <View className="flex-row items-center gap-1 mt-2">
        <Icon
          name={up ? 'trending-up-outline' : 'trending-down-outline'}
          size={13}
          color={up ? '#16a34a' : '#dc2626'}
        />
        <Text
          className={`text-xs font-bold ${up ? 'text-green-600' : 'text-red-500'}`}
        >
          {up ? '+' : ''}{diff}%
        </Text>
        <Text className="text-xs text-neutral-300">vs last</Text>
      </View>
    </View>
  );
};

// ─── Card Wrapper ─────────────────────────────────────────────────────────────

const Card = ({ children, className: cls = '' }) => (
  <View
    className={`bg-white rounded-2xl mx-4 p-4 mb-4 ${cls}`}
    style={{
      shadowColor: '#f9a8b8',
      shadowOpacity: 0.13,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 3 },
      elevation: 2,
    }}
  >
    {children}
  </View>
);

// ─── Period Toggle ────────────────────────────────────────────────────────────

const PERIODS = ['week', 'month', 'year'];

const PeriodToggle = ({ value, onChange }) => (
  <View className="flex-row bg-white rounded-xl border border-neutral-100 p-0.5 mx-4 mb-4">
    {PERIODS.map(p => {
      const active = value === p;
      return (
        <TouchableOpacity
          key={p}
          onPress={() => onChange(p)}
          className={`flex-1 py-2 rounded-lg items-center
            ${active ? 'bg-rose-500' : ''}`}
          activeOpacity={0.8}
        >
          <Text
            className={`text-sm font-semibold capitalize
              ${active ? 'text-white' : 'text-neutral-400'}`}
          >
            {p}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

// ─── Top Service Row ──────────────────────────────────────────────────────────

const ServiceRow = ({ item, rank, maxBookings }) => {
  const pct = (item.bookings / maxBookings) * 100;
  return (
    <View className="mb-3">
      <View className="flex-row items-center justify-between mb-1">
        <View className="flex-row items-center gap-2">
          <Text className="text-xs font-bold text-neutral-300 w-4">#{rank}</Text>
          <Text className="text-sm font-semibold text-neutral-700">{item.name}</Text>
        </View>
        <View className="flex-row items-center gap-3">
          <Text className="text-xs text-neutral-400">{item.bookings} bookings</Text>
          <Text className="text-sm font-bold text-neutral-800">{fmt(item.revenue)}</Text>
        </View>
      </View>
      {/* Progress bar */}
      <View className="h-1.5 bg-pink-50 rounded-full overflow-hidden">
        <View
          className="h-full rounded-full"
          style={{ width: `${pct}%`, backgroundColor: item.color }}
        />
      </View>
    </View>
  );
};

// ─── Specialist Row ───────────────────────────────────────────────────────────

const SpecialistRow = ({ item, rank }) => (
  <View className="flex-row items-center mb-3">
    <Text className="text-xs font-bold text-neutral-300 w-5">#{rank}</Text>
    {/* Avatar */}
    <View className="w-9 h-9 rounded-full bg-rose-100 items-center justify-center mr-3">
      <Text className="text-xs font-bold text-rose-600">{item.initials}</Text>
    </View>
    <View className="flex-1">
      <Text className="text-sm font-semibold text-neutral-800">{item.name}</Text>
      <View className="flex-row items-center gap-1 mt-0.5">
        <Icon name="star" size={11} color="#f59e0b" />
        <Text className="text-xs text-neutral-400">{item.rating}</Text>
        <Text className="text-neutral-200 mx-1">·</Text>
        <Text className="text-xs text-neutral-400">{item.bookings} bookings</Text>
      </View>
    </View>
    <Text className="text-sm font-bold text-neutral-800">{fmt(item.revenue)}</Text>
  </View>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function SalonReportScreen() {
  const navigation = useNavigation();
  const [period, setPeriod] = useState('month');
  const d = DATA[period];

  const barSpacing = period === 'year' ? 6 : 12;
  const barWidth   = period === 'year' ? 18 : 28;

  const maxBookings = Math.max(...TOP_SERVICES.map(s => s.bookings));
  const canGoBack = navigation?.canGoBack?.() ?? false;

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: BG }} edges={[]}>
      <StatusBar barStyle="dark-content" backgroundColor={BG} />

      {/* ── Header ── */}
      <View
        className="flex-row items-center justify-between px-4 pt-2 pb-3"
        style={{ backgroundColor: BG }}
      >
        <TouchableOpacity
          onPress={() => (canGoBack ? navigation.goBack() : null)}
          activeOpacity={0.7}
          disabled={!canGoBack}
          style={{ opacity: canGoBack ? 1 : 0 }}
        >
          <Icon name="chevron-back" size={26} color={ROSE} />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-neutral-800">Salon Reports</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Icon name="download-outline" size={22} color={ROSE} />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1"
        style={{ backgroundColor: BG }}
        contentContainerStyle={{ paddingTop: 4, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >

        {/* ── Period Toggle ── */}
        <PeriodToggle value={period} onChange={setPeriod} />

        {/* ── Stat Cards (2×2 grid) ── */}
        <View className="px-4 mb-4 gap-3">
          <View className="flex-row gap-3">
            <StatCard
              icon="cash-outline"
              label="Revenue"
              value={fmt(d.revenue)}
              diff={d.revenueDiff}
              accent="#e11d48"
            />
            <StatCard
              icon="calendar-outline"
              label="Bookings"
              value={fmtCount(d.bookings)}
              diff={d.bookingsDiff}
              accent="#f97316"
            />
          </View>
          <View className="flex-row gap-3">
            <StatCard
              icon="people-outline"
              label="New Clients"
              value={d.newClients}
              diff={d.newClientsDiff}
              accent="#0891b2"
            />
            <StatCard
              icon="receipt-outline"
              label="Avg Ticket"
              value={`₹${d.avgTicket}`}
              diff={d.avgTicketDiff}
              accent="#16a34a"
            />
          </View>
        </View>

        {/* ── Revenue Bar Chart ── */}
        <SectionHeading icon="bar-chart-outline" title="Revenue Overview" />
        <Card>
          <BarChart
            data={d.revenueBar}
            width={CHART_W}
            height={180}
            barWidth={barWidth}
            spacing={barSpacing}
            initialSpacing={8}
            endSpacing={8}
            roundedTop
            roundedBottom={false}
            noOfSections={4}
            yAxisThickness={0}
            xAxisThickness={1}
            xAxisColor="#fce7f3"
            yAxisTextStyle={{ color: '#9ca3af', fontSize: 10 }}
            xAxisLabelTextStyle={{ color: '#9ca3af', fontSize: 10 }}
            xAxisLabelsHeight={18}
            xAxisLabelsVerticalShift={2}
            hideRules={false}
            rulesColor="#fce7f3"
            rulesType="solid"
            disablePress={false}
            renderTooltip={(item) => (
              <View className="bg-rose-500 rounded-lg px-2 py-1 mb-1">
                <Text className="text-white text-xs font-bold">{fmt(item.value)}</Text>
              </View>
            )}
          />
        </Card>

        {/* ── Bookings Line Chart ── */}
        <SectionHeading icon="trending-up-outline" title="Booking Trend" />
        <Card>
          <LineChart
            data={d.bookingsLine}
            width={CHART_W}
            height={150}
            color={ROSE}
            thickness={2.5}
            dataPointsColor={ROSE}
            dataPointsRadius={4}
            startFillColor="#fda4af"
            endFillColor="#fff1f2"
            startOpacity={0.35}
            endOpacity={0.02}
            areaChart
            curved
            noOfSections={4}
            yAxisThickness={0}
            xAxisThickness={1}
            xAxisColor="#fce7f3"
            yAxisTextStyle={{ color: '#9ca3af', fontSize: 10 }}
            xAxisLabelTextStyle={{ color: '#9ca3af', fontSize: 10 }}
            xAxisLabelsHeight={18}
            xAxisLabelsVerticalShift={2}
            rulesColor="#fce7f3"
            rulesType="solid"
            hideDataPoints={false}
            adjustToWidth
            renderTooltip={(item) => (
              <View className="bg-rose-500 rounded-lg px-2 py-1 mb-1">
                <Text className="text-white text-xs font-bold">{item.value}</Text>
              </View>
            )}
          />
          <View className="flex-row items-center gap-1.5 mt-2">
            <View className="w-3 h-1.5 rounded-full bg-rose-400" />
            <Text className="text-xs text-neutral-400">Bookings per period</Text>
          </View>
        </Card>

        {/* ── Service Mix Pie ── */}
        <SectionHeading icon="pie-chart-outline" title="Service Mix" />
        <Card>
          <View className="flex-row items-center gap-4">
            {/* Pie */}
            <PieChart
              data={PIE_DATA}
              donut
              radius={68}
              innerRadius={44}
              innerCircleColor="#ffffff"
              centerLabelComponent={() => (
                <View className="items-center">
                  <Text className="text-lg font-extrabold text-neutral-800">
                    {TOP_SERVICES.length}
                  </Text>
                  <Text className="text-xs text-neutral-400">services</Text>
                </View>
              )}
            />
            {/* Legend */}
            <View className="flex-1 gap-2">
              {TOP_SERVICES.slice(0, 4).map((s, i) => (
                <View key={i} className="flex-row items-center gap-2">
                  <View
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  <Text
                    className="text-xs text-neutral-600 flex-1"
                    numberOfLines={1}
                  >
                    {s.name}
                  </Text>
                  <Text className="text-xs font-bold text-neutral-500">
                    {PIE_DATA[i]?.text}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </Card>

        {/* ── Top Services ── */}
        <SectionHeading icon="sparkles-outline" title="Top Services" />
        <Card>
          {TOP_SERVICES.map((s, i) => (
            <ServiceRow key={i} item={s} rank={i + 1} maxBookings={maxBookings} />
          ))}
        </Card>

        {/* ── Top Specialists ── */}
        <SectionHeading icon="ribbon-outline" title="Top Specialists" />
        <Card>
          {TOP_SPECIALISTS.map((s, i) => (
            <SpecialistRow key={i} item={s} rank={i + 1} />
          ))}
        </Card>

      </ScrollView>
    </SafeAreaView>
  );
}