import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart } from 'react-native-gifted-charts';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  ReportCard,
  ReportSectionHeading,
  ReportStatCard,
  ReportStateCard,
  REPORT_COLORS,
  formatCurrency,
  formatCount,
} from '../../components/reports/ReportKit';
import {
  getIndividualProfessionalContext,
  getIndividualReportContent,
  getIndividualWalletContent,
} from './utils/individualProfessional';

const CHART_WIDTH = Dimensions.get('window').width - 64;

function TransactionRow({ item }) {
  const credited = Number(item.amount) >= 0;

  return (
    <View className="flex-row items-center py-3 border-b border-rose-50">
      <View
        className="w-10 h-10 rounded-full items-center justify-center mr-3"
        style={{ backgroundColor: credited ? '#dcfce7' : '#fee2e2' }}
      >
        <Icon
          name={credited ? 'arrow-down-outline' : 'arrow-up-outline'}
          size={18}
          color={credited ? '#16a34a' : '#dc2626'}
        />
      </View>
      <View className="flex-1">
        <Text className="text-sm font-semibold text-neutral-800">{item.label}</Text>
        <Text className="text-xs text-neutral-400 mt-0.5">{item.date}</Text>
      </View>
      <Text
        className={`text-sm font-bold ${credited ? 'text-green-600' : 'text-red-500'}`}
      >
        {credited ? '+' : '-'}₹{Math.abs(Number(item.amount)).toLocaleString()}
      </Text>
    </View>
  );
}

export default function IndividualEarningsScreen({ navigation }) {
  const { user } = useSelector(state => state.auth);
  const [loading] = useState(false);
  const [error] = useState(null);
  const professional = useMemo(
    () => getIndividualProfessionalContext(user),
    [user],
  );
  const report = useMemo(() => getIndividualReportContent(user), [user]);
  const wallet = useMemo(() => getIndividualWalletContent(user), [user]);

  const monthly = report.periods.month;
  const noEarnings =
    wallet.balance === 0 &&
    wallet.pendingPayout === 0 &&
    monthly.earnings === 0 &&
    wallet.transactions.length === 0;

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
        <Text className="text-lg font-bold text-neutral-800">Earnings & Wallet</Text>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => Alert.alert('Withdraw', 'Withdrawal flow is not wired yet.')}
        >
          <Icon name="wallet-outline" size={22} color={REPORT_COLORS.accent} />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1"
        style={{ backgroundColor: REPORT_COLORS.bg }}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <ReportStateCard
            icon="cash-outline"
            title="Loading wallet data"
            message="Fetching balances, payouts, and recent transactions."
            loading
          />
        ) : error ? (
          <ReportStateCard
            icon="alert-circle-outline"
            title="Unable to load wallet"
            message="Please try again in a moment."
            actionLabel="Retry"
            onAction={() => {}}
          />
        ) : noEarnings ? (
          <ReportStateCard
            icon="wallet-outline"
            title="No earnings yet"
            message="Your completed services and payouts will show up here once you start receiving bookings."
          />
        ) : (
          <>
            <ReportCard className="mt-1">
              <View className="flex-row items-start justify-between">
                <View className="flex-1 pr-4">
                  <Text className="text-xs font-bold text-rose-500 tracking-wider">
                    AVAILABLE BALANCE
                  </Text>
                  <Text className="text-3xl font-extrabold text-neutral-800 mt-2">
                    ₹{wallet.balance.toLocaleString()}
                  </Text>
                  <Text className="text-sm text-neutral-400 mt-1">
                    {professional.displayName} - ready for withdrawal
                  </Text>
                </View>

                <View
                  className="w-14 h-14 rounded-full items-center justify-center"
                  style={{ backgroundColor: '#fff1f2' }}
                >
                  <Icon name="wallet-outline" size={26} color={REPORT_COLORS.accent} />
                </View>
              </View>

              <View className="flex-row gap-3 mt-5">
                <View className="flex-1 bg-rose-50 rounded-2xl px-4 py-3">
                  <Text className="text-xs text-neutral-400 font-semibold">Pending payout</Text>
                  <Text className="text-lg font-bold text-neutral-800 mt-1">
                    ₹{wallet.pendingPayout.toLocaleString()}
                  </Text>
                </View>
                <View className="flex-1 bg-emerald-50 rounded-2xl px-4 py-3">
                  <Text className="text-xs text-neutral-400 font-semibold">Ready today</Text>
                  <Text className="text-lg font-bold text-neutral-800 mt-1">
                    ₹{wallet.withdrawalReady.toLocaleString()}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                className="mt-5 bg-rose-500 rounded-full py-3 items-center"
                activeOpacity={0.85}
                onPress={() => Alert.alert('Withdraw', 'Withdrawal flow is not wired yet.')}
              >
                <Text className="text-white font-bold text-sm">Request Withdrawal</Text>
              </TouchableOpacity>
            </ReportCard>

            <View className="px-4 mb-4 gap-3">
              <View className="flex-row gap-3">
                <ReportStatCard
                  icon="cash-outline"
                  label="This Month"
                  value={formatCurrency(monthly.earnings)}
                  diff={monthly.earningsDiff}
                  accent="#e11d48"
                />
                <ReportStatCard
                  icon="calendar-outline"
                  label="Completed"
                  value={formatCount(monthly.completedBookings)}
                  diff={monthly.bookingsDiff}
                  accent="#f97316"
                />
              </View>
              <View className="flex-row gap-3">
                <ReportStatCard
                  icon="repeat-outline"
                  label="Repeat Clients"
                  value={formatCount(monthly.repeatClients)}
                  diff={monthly.repeatClientsDiff}
                  accent="#0891b2"
                />
                <ReportStatCard
                  icon="trophy-outline"
                  label="Lifetime Earnings"
                  value={formatCurrency(wallet.lifetimeEarnings)}
                  diff={6.2}
                  accent="#16a34a"
                />
              </View>
            </View>

            <ReportSectionHeading icon="trending-up-outline" title="Monthly Earnings Trend" />
            <ReportCard>
              <LineChart
                data={monthly.bookingsLine.map((item, index) => ({
                  ...item,
                  value: monthly.revenueBar[index]?.value || 0,
                }))}
                width={CHART_WIDTH}
                height={170}
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
                adjustToWidth
                renderTooltip={item => (
                  <View className="bg-rose-500 rounded-lg px-2 py-1 mb-1">
                    <Text className="text-white text-xs font-bold">
                      {formatCurrency(item.value)}
                    </Text>
                  </View>
                )}
              />
              <Text className="text-xs text-neutral-400 mt-3">
                Daily booking value converted into your weekly payout trend.
              </Text>
            </ReportCard>

            <ReportSectionHeading icon="swap-horizontal-outline" title="Recent Transactions" />
            <ReportCard>
              {wallet.transactions.map(item => (
                <TransactionRow key={item.id} item={item} />
              ))}
            </ReportCard>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
