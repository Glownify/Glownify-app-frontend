import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { BarChart, LineChart, PieChart } from 'react-native-gifted-charts';

import {
  ReportCard,
  ReportPeriodToggle,
  ReportSectionHeading,
  ReportStatCard,
  ReportStateCard,
  REPORT_COLORS,
  formatCount,
  formatCurrency,
} from '../../components/reports/ReportKit';
import {
  getIndividualProfessionalContext,
  getIndividualReportContent,
} from './utils/individualProfessional';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CHART_WIDTH = SCREEN_WIDTH - 64;
const PERIODS = ['day', 'week', 'month'];

function ServiceRow({ item, rank, maxBookings }) {
  const percentage = maxBookings > 0 ? (item.bookings / maxBookings) * 100 : 0;

  return (
    <View className="mb-3">
      <View className="flex-row items-center justify-between mb-1">
        <View className="flex-row items-center gap-2">
          <Text className="text-xs font-bold text-neutral-300 w-4">#{rank}</Text>
          <Text className="text-sm font-semibold text-neutral-700">{item.name}</Text>
        </View>
        <View className="flex-row items-center gap-3">
          <Text className="text-xs text-neutral-400">{item.bookings} bookings</Text>
          <Text className="text-sm font-bold text-neutral-800">
            {formatCurrency(item.revenue)}
          </Text>
        </View>
      </View>
      <View className="h-1.5 bg-pink-50 rounded-full overflow-hidden">
        <View
          className="h-full rounded-full"
          style={{ width: `${percentage}%`, backgroundColor: item.color }}
        />
      </View>
    </View>
  );
}

function HighlightRow({ item }) {
  return (
    <View className="flex-row items-center mb-3">
      <View
        className="w-10 h-10 rounded-full items-center justify-center mr-3"
        style={{ backgroundColor: `${item.color}18` }}
      >
        <Icon name={item.icon} size={18} color={item.color} />
      </View>
      <View className="flex-1">
        <Text className="text-sm font-semibold text-neutral-800">{item.title}</Text>
        <Text className="text-xs text-neutral-400 mt-0.5">{item.subtitle}</Text>
      </View>
      <Text className="text-sm font-bold text-neutral-800">{item.value}</Text>
    </View>
  );
}

export default function IndividualReportScreen() {
  const navigation = useNavigation();
  const { user } = useSelector(state => state.auth);
  const [period, setPeriod] = useState('week');
  const [loading] = useState(false);
  const [error] = useState(null);

  const professional = useMemo(
    () => getIndividualProfessionalContext(user),
    [user],
  );
  const report = useMemo(() => getIndividualReportContent(user), [user]);
  const current = report.periods[period];
  const canGoBack = navigation?.canGoBack?.() ?? false;
  const maxBookings = Math.max(1, ...report.serviceMix.map(item => item.bookings));

  const isEmpty =
    !loading &&
    !error &&
    (!current || (current.earnings === 0 && current.completedBookings === 0));

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: REPORT_COLORS.bg }} edges={[]}>
      <StatusBar barStyle="dark-content" backgroundColor={REPORT_COLORS.bg} />

      <View
        className="flex-row items-center justify-between px-4 pt-2 pb-3"
        style={{ backgroundColor: REPORT_COLORS.bg }}
      >
        <TouchableOpacity
          onPress={() => (canGoBack ? navigation.goBack() : null)}
          activeOpacity={0.7}
          disabled={!canGoBack}
          style={{ opacity: canGoBack ? 1 : 0 }}
        >
          <Icon name="chevron-back" size={26} color={REPORT_COLORS.accent} />
        </TouchableOpacity>
        <View className="items-center">
          <Text className="text-lg font-bold text-neutral-800">View Report</Text>
          <Text className="text-xs text-neutral-400 mt-0.5">
            {professional.displayName}
          </Text>
        </View>
        <TouchableOpacity activeOpacity={0.7}>
          <Icon name="download-outline" size={22} color={REPORT_COLORS.accent} />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1"
        style={{ backgroundColor: REPORT_COLORS.bg }}
        contentContainerStyle={{ paddingTop: 4, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <ReportPeriodToggle options={PERIODS} value={period} onChange={setPeriod} />

        {loading ? (
          <ReportStateCard
            icon="bar-chart-outline"
            title="Loading your report"
            message="Fetching earnings, booking, and performance insights."
            loading
          />
        ) : error ? (
          <ReportStateCard
            icon="alert-circle-outline"
            title="Unable to load report"
            message="We couldn't fetch the latest report right now. Please try again."
            actionLabel="Retry"
            onAction={() => {}}
          />
        ) : isEmpty ? (
          <ReportStateCard
            icon="wallet-outline"
            title="No report data yet"
            message="Completed bookings and earnings will appear here once you start serving clients."
          />
        ) : (
          <>
            <View className="px-4 mb-4 gap-3">
              <View className="flex-row gap-3">
                <ReportStatCard
                  icon="cash-outline"
                  label="Earnings"
                  value={formatCurrency(current.earnings)}
                  diff={current.earningsDiff}
                  accent="#e11d48"
                />
                <ReportStatCard
                  icon="calendar-outline"
                  label="Completed"
                  value={formatCount(current.completedBookings)}
                  diff={current.bookingsDiff}
                  accent="#f97316"
                />
              </View>
              <View className="flex-row gap-3">
                <ReportStatCard
                  icon="people-outline"
                  label="Repeat Clients"
                  value={formatCount(current.repeatClients)}
                  diff={current.repeatClientsDiff}
                  accent="#0891b2"
                />
                <ReportStatCard
                  icon="receipt-outline"
                  label="Avg Service"
                  value={`₹${current.avgServiceValue}`}
                  diff={current.avgServiceValueDiff}
                  accent="#16a34a"
                />
              </View>
            </View>

            <ReportSectionHeading icon="bar-chart-outline" title="Earnings Overview" />
            <ReportCard>
              <BarChart
                data={current.revenueBar}
                width={CHART_WIDTH}
                height={180}
                barWidth={period === 'month' ? 28 : 22}
                spacing={period === 'month' ? 16 : 12}
                initialSpacing={8}
                endSpacing={8}
                roundedTop
                roundedBottom={false}
                noOfSections={4}
                yAxisThickness={0}
                xAxisThickness={1}
                xAxisColor={REPORT_COLORS.border}
                yAxisTextStyle={{ color: REPORT_COLORS.textMuted, fontSize: 10 }}
                xAxisLabelTextStyle={{ color: REPORT_COLORS.textMuted, fontSize: 10 }}
                xAxisLabelsHeight={18}
                xAxisLabelsVerticalShift={2}
                rulesColor={REPORT_COLORS.border}
                disablePress={false}
                renderTooltip={item => (
                  <View className="bg-rose-500 rounded-lg px-2 py-1 mb-1">
                    <Text className="text-white text-xs font-bold">
                      {formatCurrency(item.value)}
                    </Text>
                  </View>
                )}
              />
            </ReportCard>

            <ReportSectionHeading icon="trending-up-outline" title="Booking Trend" />
            <ReportCard>
              <LineChart
                data={current.bookingsLine}
                width={CHART_WIDTH}
                height={150}
                color={REPORT_COLORS.accent}
                thickness={2.5}
                dataPointsColor={REPORT_COLORS.accent}
                dataPointsRadius={4}
                startFillColor={REPORT_COLORS.accentSoft}
                endFillColor={REPORT_COLORS.bg}
                startOpacity={0.35}
                endOpacity={0.02}
                areaChart
                curved
                noOfSections={4}
                yAxisThickness={0}
                xAxisThickness={1}
                xAxisColor={REPORT_COLORS.border}
                yAxisTextStyle={{ color: REPORT_COLORS.textMuted, fontSize: 10 }}
                xAxisLabelTextStyle={{ color: REPORT_COLORS.textMuted, fontSize: 10 }}
                xAxisLabelsHeight={18}
                xAxisLabelsVerticalShift={2}
                rulesColor={REPORT_COLORS.border}
                hideDataPoints={false}
                adjustToWidth
                renderTooltip={item => (
                  <View className="bg-rose-500 rounded-lg px-2 py-1 mb-1">
                    <Text className="text-white text-xs font-bold">{item.value}</Text>
                  </View>
                )}
              />
              <View className="flex-row items-center gap-1.5 mt-2">
                <View className="w-3 h-1.5 rounded-full bg-rose-400" />
                <Text className="text-xs text-neutral-400">Completed bookings per period</Text>
              </View>
            </ReportCard>

            <ReportSectionHeading icon="pie-chart-outline" title="Service Mix" />
            <ReportCard>
              <View className="flex-row items-center gap-4">
                <PieChart
                  data={report.pieData}
                  donut
                  radius={68}
                  innerRadius={44}
                  innerCircleColor="#ffffff"
                  centerLabelComponent={() => (
                    <View className="items-center">
                      <Text className="text-lg font-extrabold text-neutral-800">
                        {report.serviceMix.length}
                      </Text>
                      <Text className="text-xs text-neutral-400">services</Text>
                    </View>
                  )}
                />

                <View className="flex-1 gap-2">
                  {report.serviceMix.map((item, index) => (
                    <View key={item.name} className="flex-row items-center gap-2">
                      <View
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <Text className="text-xs text-neutral-600 flex-1" numberOfLines={1}>
                        {item.name}
                      </Text>
                      <Text className="text-xs font-bold text-neutral-500">
                        {report.pieData[index]?.text}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </ReportCard>

            <ReportSectionHeading icon="sparkles-outline" title="Top Services" />
            <ReportCard>
              {report.serviceMix.map((item, index) => (
                <ServiceRow
                  key={item.name}
                  item={item}
                  rank={index + 1}
                  maxBookings={maxBookings}
                />
              ))}
            </ReportCard>

            <ReportSectionHeading icon="flash-outline" title="Performance Highlights" />
            <ReportCard>
              {report.highlights.map(item => (
                <HighlightRow key={item.title} item={item} />
              ))}
            </ReportCard>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
