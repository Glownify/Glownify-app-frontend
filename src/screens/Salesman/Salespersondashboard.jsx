import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardStats } from '../../redux/slices/salesmanSlice';
import SalesmanSheet from './SalesmanSheet';
import {
  buildRecentRegistrations,
  buildSalesmanSummary,
  buildSalesmanUser,
  formatCompactCurrency,
  formatCurrency,
  formatShortDate,
  salesmanGrowth,
  salesmanTasks,
  salesmanTheme,
  mergeDashboardSummary,
} from './salesmanData';

const MetricCard = ({ label, value, icon, accent, subtitle, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.88}
    disabled={!onPress}
    onPress={onPress}
    style={styles.metricCard}
  >
    <View style={[styles.metricIcon, { backgroundColor: `${accent}12` }]}>
      <Icon name={icon} size={18} color={accent} />
    </View>
    <Text style={styles.metricLabel}>{label}</Text>
    <Text style={[styles.metricValue, { color: accent }]}>{value}</Text>
    {subtitle ? <Text style={styles.metricSubtitle}>{subtitle}</Text> : null}
  </TouchableOpacity>
);

const SectionHeader = ({ title, actionLabel, onPress }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {actionLabel ? (
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <Text style={styles.sectionAction}>{actionLabel}</Text>
      </TouchableOpacity>
    ) : null}
  </View>
);

const GrowthChart = ({ data }) => {
  const maxValue = Math.max(...data.map(item => item.value), 1);

  return (
    <View style={styles.chartRow}>
      {data.map(item => {
        const barHeight = Math.max((item.value / maxValue) * 112, 10);

        return (
          <View key={item.month} style={styles.chartColumn}>
            <Text style={styles.chartValue}>{item.value}</Text>
            <View style={styles.chartBarTrack}>
              <View style={[styles.chartBar, { height: barHeight }]} />
            </View>
            <Text style={styles.chartLabel}>{item.month}</Text>
          </View>
        );
      })}
    </View>
  );
};

const TaskCard = ({ item, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.9}
    onPress={onPress}
    style={styles.taskCard}
  >
    <View style={[styles.taskStripe, { backgroundColor: item.color }]} />
    <View style={styles.taskBody}>
      <View style={styles.taskTopRow}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskDue}>{item.dueLabel}</Text>
      </View>
      <Text style={styles.taskSubtitle}>{item.subtitle}</Text>
    </View>
  </TouchableOpacity>
);

const RegistrationRow = ({ item }) => {
  const isPaid = String(item.status).toLowerCase() === 'paid';

  return (
    <View style={styles.registrationRow}>
      <Text style={styles.registrationSalonCell} numberOfLines={1}>
        {item.salonName}
      </Text>
      <Text style={styles.registrationDate}>{formatShortDate(item.date)}</Text>
      <View
        style={[
          styles.registrationBadge,
          {
            backgroundColor: isPaid
              ? salesmanTheme.successSoft
              : salesmanTheme.warningSoft,
          },
        ]}
      >
        <Text
          style={[
            styles.registrationBadgeText,
            { color: isPaid ? salesmanTheme.success : salesmanTheme.warning },
          ]}
        >
          {isPaid ? 'PAID' : 'PENDING'}
        </Text>
      </View>
    </View>
  );
};

const QuickAction = ({ icon, title, subtitle, onPress, accent }) => (
  <TouchableOpacity
    activeOpacity={0.88}
    onPress={onPress}
    style={styles.quickActionCard}
  >
    <View style={[styles.quickActionIcon, { backgroundColor: `${accent}16` }]}>
      <Icon name={icon} size={18} color={accent} />
    </View>
    <View style={styles.quickActionCopy}>
      <Text style={styles.quickActionTitle}>{title}</Text>
      <Text style={styles.quickActionSubtitle}>{subtitle}</Text>
    </View>
    <Icon name="chevron-forward" size={18} color="#98A2B3" />
  </TouchableOpacity>
);

const SheetAction = ({ icon, title, subtitle, color, onPress }) => (
  <TouchableOpacity activeOpacity={0.88} onPress={onPress} style={styles.sheetAction}>
    <View style={[styles.sheetActionIcon, { backgroundColor: `${color}16` }]}>
      <Icon name={icon} size={18} color={color} />
    </View>
    <View style={styles.sheetActionCopy}>
      <Text style={styles.sheetActionTitle}>{title}</Text>
      <Text style={styles.sheetActionSubtitle}>{subtitle}</Text>
    </View>
  </TouchableOpacity>
);

export default function SalesPersonDashboard({ navigation }) {
  const dispatch = useDispatch();
  const authUser = useSelector(state => state.auth.user);
  const {
    summary: apiSummary,
    recentSalons,
    monthlySalesGrowth,
    loading,
  } = useSelector(state => state.salesman);

  const [shareSheetVisible, setShareSheetVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  const user = buildSalesmanUser(authUser);
  const fallbackSummary = buildSalesmanSummary();
  const summary = mergeDashboardSummary(apiSummary);
  const progressRatio =
    summary.targetTotal > 0 ? summary.targetAchieved / summary.targetTotal : 0;
  const growthData = monthlySalesGrowth?.length
    ? monthlySalesGrowth
    : salesmanGrowth;
  const recentRegistrations = recentSalons?.length
    ? recentSalons.slice(0, 4).map(item => ({
        id: item.id || item._id || item.salonName,
        salonName: item.salonName || item.name || 'New registration',
        date: item.date || item.createdAt || new Date().toISOString(),
        status: item.status || 'pending',
      }))
    : buildRecentRegistrations();
  const referralLink = `https://glownify.app/join/${user.referralId}`;
  const shareMessage = `Join Glownify with my referral code ${user.referralId}. Start here: ${referralLink}`;

  const metricCards = [
    {
      key: 'active',
      label: 'Active salons',
      value: String(summary.activeSalons),
      icon: 'storefront-outline',
      accent: salesmanTheme.brand,
      subtitle: `${summary.totalSalons} total partners`,
      onPress: () => navigation.navigate('SalesSalonsTab'),
    },
    {
      key: 'pipeline',
      label: 'Pipeline value',
      value: formatCompactCurrency(summary.pipelineValue),
      icon: 'stats-chart-outline',
      accent: salesmanTheme.accent,
      subtitle: 'Open opportunities',
      onPress: () => navigation.navigate('SalesLeadsTab'),
    },
    {
      key: 'earnings',
      label: 'Commission earned',
      value: formatCompactCurrency(summary.totalEarnings),
      icon: 'wallet-outline',
      accent: salesmanTheme.success,
      subtitle: `${summary.commissionRate}% avg. rate`,
    },
    {
      key: 'followups',
      label: 'Follow ups due',
      value: String(summary.followUpsDue),
      icon: 'notifications-outline',
      accent: salesmanTheme.info,
      subtitle: 'Needs attention today',
      onPress: () => navigation.navigate('SalesLeadsTab', { filter: 'due' }),
    },
  ];

  const handleOpenUrl = async (url, fallbackMessage) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('Unable to open', fallbackMessage);
    }
  };

  const handleShareSystem = async () => {
    try {
      await Share.share({ message: shareMessage });
    } catch (error) {
      Alert.alert('Share unavailable', 'Could not open the share menu right now.');
    }
  };

  const handleShareWhatsApp = () =>
    handleOpenUrl(
      `whatsapp://send?text=${encodeURIComponent(shareMessage)}`,
      'WhatsApp is not available on this device.',
    );

  const handleShareEmail = () =>
    handleOpenUrl(
      `mailto:?subject=${encodeURIComponent(
        'Join Glownify',
      )}&body=${encodeURIComponent(shareMessage)}`,
      'A mail app is not configured on this device.',
    );

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <StatusBar
        backgroundColor={salesmanTheme.brandDark}
        barStyle="light-content"
      />

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={[salesmanTheme.brandDark, salesmanTheme.brand]}
          style={styles.heroCard}
        >
          <View style={styles.heroTopRow}>
            <View style={styles.heroIdentity}>
              <View style={styles.heroAvatar}>
                <Text style={styles.heroAvatarText}>
                  {user.name?.charAt(0)?.toUpperCase() || 'S'}
                </Text>
              </View>
              <View style={styles.flexOne}>
                <Text style={styles.heroGreeting}>Good to see you</Text>
                <Text style={styles.heroName}>{user.name}</Text>
                <Text style={styles.heroMeta}>Territory: {user.territory}</Text>
              </View>
            </View>

            <View style={styles.heroPill}>
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.heroPillText}>{user.referralId}</Text>
              )}
            </View>
          </View>

          <View style={styles.heroStats}>
            <View style={styles.heroStatCard}>
              <Text style={styles.heroStatLabel}>Quarter target</Text>
              <Text style={styles.heroStatValue}>
                {summary.targetAchieved}/{summary.targetTotal}
              </Text>
            </View>
            <View style={styles.heroStatCard}>
              <Text style={styles.heroStatLabel}>Expected pipeline</Text>
              <Text style={styles.heroStatValue}>
                {formatCompactCurrency(summary.pipelineValue)}
              </Text>
            </View>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.min(progressRatio * 100, 100)}%` },
              ]}
            />
          </View>
          <Text style={styles.progressLabel}>
            {Math.round(progressRatio * 100)}% of this quarter goal already closed
          </Text>
        </LinearGradient>

        <View style={styles.metricGrid}>
          {metricCards.map(item => (
            <MetricCard
              key={item.key}
              label={item.label}
              value={item.value}
              icon={item.icon}
              accent={item.accent}
              subtitle={item.subtitle}
              onPress={item.onPress}
            />
          ))}
        </View>

        <SectionHeader title="Quick Actions" />
        <View style={styles.quickActionList}>
          <QuickAction
            icon="add-circle-outline"
            title="Register a new salon"
            subtitle="Start a new onboarding flow from field or referral leads."
            accent={salesmanTheme.brand}
            onPress={() => navigation.navigate('SalesmanRegisterSalon')}
          />
          <QuickAction
            icon="flash-outline"
            title="Review lead pipeline"
            subtitle={`${fallbackSummary.followUpsDue} opportunities need follow-up soon.`}
            accent={salesmanTheme.accent}
            onPress={() => navigation.navigate('SalesLeadsTab', { filter: 'due' })}
          />
          <QuickAction
            icon="share-social-outline"
            title="Share referral link"
            subtitle="Send your code to prospects through WhatsApp, email, or share sheet."
            accent={salesmanTheme.info}
            onPress={() => setShareSheetVisible(true)}
          />
        </View>

        <SectionHeader
          title="Today's Follow Ups"
          actionLabel="View leads"
          onPress={() => navigation.navigate('SalesLeadsTab', { filter: 'due' })}
        />
        <View style={styles.taskList}>
          {salesmanTasks.map(task => (
            <TaskCard
              key={task.id}
              item={task}
              onPress={() =>
                navigation.navigate('SalesLeadsTab', {
                  filter: 'due',
                  leadId: task.leadId,
                })
              }
            />
          ))}
        </View>

        <SectionHeader
          title="Recent Registrations"
          actionLabel="Open salons"
          onPress={() => navigation.navigate('SalesSalonsTab')}
        />
        <View style={styles.tableCard}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderSalonText}>Salon</Text>
            <Text style={styles.tableHeaderText}>Date</Text>
            <Text style={styles.tableHeaderText}>Payout</Text>
          </View>
          {recentRegistrations.map(item => (
            <RegistrationRow key={item.id} item={item} />
          ))}
        </View>

        <SectionHeader title="Sales Momentum" />
        <View style={styles.growthCard}>
          <View style={styles.growthCardHeader}>
            <View>
              <Text style={styles.growthTitle}>Monthly onboarding trend</Text>
              <Text style={styles.growthSubtitle}>
                Healthy growth across live and onboarding-ready salons
              </Text>
            </View>
            <View style={styles.growthHighlight}>
              <Text style={styles.growthHighlightText}>
                {formatCurrency(summary.totalEarnings)}
              </Text>
              <Text style={styles.growthHighlightLabel}>Total commission</Text>
            </View>
          </View>
          <GrowthChart data={growthData} />
        </View>
      </ScrollView>

      <SalesmanSheet
        visible={shareSheetVisible}
        onClose={() => setShareSheetVisible(false)}
        title="Share your referral link"
        subtitle="Every salon or studio that signs up through your referral keeps your pipeline warm."
        footer={
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={handleShareSystem}
            style={styles.sheetPrimaryButton}
          >
            <Text style={styles.sheetPrimaryButtonText}>Open Share Menu</Text>
          </TouchableOpacity>
        }
      >
        <View style={styles.referralCard}>
          <Text style={styles.referralLabel}>Referral Code</Text>
          <Text style={styles.referralCode}>{user.referralId}</Text>
          <Text style={styles.referralLink} numberOfLines={1}>
            {referralLink}
          </Text>
        </View>
        <SheetAction
          icon="logo-whatsapp"
          title="Send on WhatsApp"
          subtitle="Share the referral link directly with a salon owner."
          color="#22C55E"
          onPress={handleShareWhatsApp}
        />
        <SheetAction
          icon="mail-outline"
          title="Send by email"
          subtitle="Open the default mail app with a pre-filled invite."
          color={salesmanTheme.info}
          onPress={handleShareEmail}
        />
      </SalesmanSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: salesmanTheme.background,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 36,
  },
  heroCard: {
    borderRadius: 28,
    padding: 20,
    marginTop: 12,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  heroIdentity: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  heroAvatar: {
    width: 52,
    height: 52,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  heroAvatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  flexOne: {
    flex: 1,
  },
  heroGreeting: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.78)',
  },
  heroName: {
    marginTop: 2,
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  heroMeta: {
    marginTop: 3,
    fontSize: 12,
    color: 'rgba(255,255,255,0.78)',
  },
  heroPill: {
    minWidth: 88,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
  heroPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  heroStats: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 22,
  },
  heroStatCard: {
    flex: 1,
    padding: 14,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  heroStatLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.78)',
  },
  heroStatValue: {
    marginTop: 6,
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    marginTop: 18,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#FDE68A',
  },
  progressLabel: {
    marginTop: 10,
    fontSize: 12,
    color: 'rgba(255,255,255,0.82)',
  },
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
    marginTop: 16,
  },
  metricCard: {
    width: '48.2%',
    padding: 16,
    borderRadius: 22,
    backgroundColor: salesmanTheme.surface,
    shadowColor: '#101828',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
  },
  metricIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricLabel: {
    marginTop: 14,
    fontSize: 12,
    color: salesmanTheme.muted,
  },
  metricValue: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: '700',
  },
  metricSubtitle: {
    marginTop: 4,
    fontSize: 11,
    color: '#98A2B3',
  },
  sectionHeader: {
    marginTop: 24,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: salesmanTheme.ink,
  },
  sectionAction: {
    fontSize: 13,
    fontWeight: '600',
    color: salesmanTheme.brand,
  },
  quickActionList: {
    gap: 12,
  },
  quickActionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    borderRadius: 22,
    backgroundColor: salesmanTheme.surface,
  },
  quickActionIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionCopy: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: salesmanTheme.ink,
  },
  quickActionSubtitle: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 18,
    color: salesmanTheme.muted,
  },
  taskList: {
    gap: 10,
  },
  taskCard: {
    flexDirection: 'row',
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: salesmanTheme.surface,
  },
  taskStripe: {
    width: 6,
  },
  taskBody: {
    flex: 1,
    padding: 15,
  },
  taskTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  taskTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: salesmanTheme.ink,
  },
  taskDue: {
    fontSize: 11,
    fontWeight: '700',
    color: salesmanTheme.brand,
  },
  taskSubtitle: {
    marginTop: 6,
    fontSize: 12,
    lineHeight: 18,
    color: salesmanTheme.muted,
  },
  tableCard: {
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: salesmanTheme.surface,
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F8FAFC',
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 11,
    fontWeight: '700',
    color: '#98A2B3',
    textTransform: 'uppercase',
  },
  tableHeaderSalonText: {
    flex: 1.55,
    fontSize: 11,
    fontWeight: '700',
    color: '#98A2B3',
    textTransform: 'uppercase',
  },
  registrationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#F2F4F7',
  },
  registrationCell: {
    fontSize: 13,
    fontWeight: '600',
    color: salesmanTheme.ink,
  },
  registrationSalonCell: {
    flex: 1.55,
    fontSize: 13,
    fontWeight: '600',
    color: salesmanTheme.ink,
  },
  registrationDate: {
    flex: 1,
    fontSize: 12,
    color: salesmanTheme.muted,
  },
  registrationBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  registrationBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  growthCard: {
    padding: 18,
    borderRadius: 26,
    backgroundColor: salesmanTheme.surface,
  },
  growthCardHeader: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  growthTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: salesmanTheme.ink,
  },
  growthSubtitle: {
    marginTop: 4,
    maxWidth: 210,
    fontSize: 12,
    lineHeight: 18,
    color: salesmanTheme.muted,
  },
  growthHighlight: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: salesmanTheme.brandSoft,
  },
  growthHighlightText: {
    fontSize: 15,
    fontWeight: '700',
    color: salesmanTheme.brand,
  },
  growthHighlightLabel: {
    marginTop: 2,
    fontSize: 11,
    color: salesmanTheme.muted,
  },
  chartRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  chartColumn: {
    alignItems: 'center',
    flex: 1,
  },
  chartValue: {
    marginBottom: 8,
    fontSize: 11,
    color: salesmanTheme.muted,
  },
  chartBarTrack: {
    width: 18,
    height: 112,
    justifyContent: 'flex-end',
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: '#E4E7EC',
  },
  chartBar: {
    width: '100%',
    borderRadius: 999,
    backgroundColor: salesmanTheme.brand,
  },
  chartLabel: {
    marginTop: 10,
    fontSize: 11,
    fontWeight: '600',
    color: salesmanTheme.muted,
  },
  referralCard: {
    padding: 16,
    borderRadius: 20,
    backgroundColor: salesmanTheme.brandSoft,
  },
  referralLabel: {
    fontSize: 12,
    color: salesmanTheme.muted,
  },
  referralCode: {
    marginTop: 6,
    fontSize: 24,
    fontWeight: '700',
    color: salesmanTheme.brand,
  },
  referralLink: {
    marginTop: 8,
    fontSize: 12,
    color: salesmanTheme.muted,
  },
  sheetAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 6,
  },
  sheetActionIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetActionCopy: {
    flex: 1,
  },
  sheetActionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: salesmanTheme.ink,
  },
  sheetActionSubtitle: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 18,
    color: salesmanTheme.muted,
  },
  sheetPrimaryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: salesmanTheme.brand,
  },
  sheetPrimaryButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
