import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const SALES_TEAM = [
  {
    id: 1,
    referralId: 'SP-2025-001',
    name: 'Rajesh Kumar',
    salons: 15,
    commission: '₹45,000',
  },
  {
    id: 2,
    referralId: 'SP-2025-002',
    name: 'Priya Sharma',
    salons: 12,
    commission: '₹38,000',
  },
  {
    id: 3,
    referralId: 'SP-2025-003',
    name: 'Amit Patel',
    salons: 10,
    commission: '₹32,000',
  },
  {
    id: 4,
    referralId: 'SP-2025-004',
    name: 'Sneha Reddy',
    salons: 9,
    commission: '₹28,000',
  },
];

const SUBSCRIPTION_DATA = [
  { month: 'Jan', value: 40 },
  { month: 'Feb', value: 55 },
  { month: 'Mar', value: 50 },
  { month: 'Apr', value: 60 },
  { month: 'May', value: 75 },
  { month: 'Jun', value: 90 },
];

const PENDING_COMMISSIONS = [
  {
    id: 1,
    name: 'Rahul Sharma',
    referralId: 'SP-2025-001',
    amount: '₹45,000',
  },
  {
    id: 2,
    name: 'Priya Verma',
    referralId: 'SP-2025-002',
    amount: '₹82,500',
  },
  {
    id: 3,
    name: 'Amit Patel',
    referralId: 'SP-2025-003',
    amount: '₹38,500',
  },
];

const LOW_PERFORMERS = [
  { id: 1, name: 'Amit Patel', salons: 9 },
  { id: 2, name: 'Vikram Singh', salons: 6 },
];

export default function SalesTeamManagement() {
  const [activeTab, setActiveTab] = useState('sales');

  const maxValue = Math.max(...SUBSCRIPTION_DATA.map((d) => d.value));
  const chartHeight = 120;

  const renderSalesTeam = () => (
    <View style={styles.tabContent}>
      <TouchableOpacity style={styles.addButton}>
        <Icon name="add" size={18} color="#fff" />
        <Text style={styles.addButtonText}>Register New Sales Person</Text>
      </TouchableOpacity>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, { flex: 1.5 }]}>Referral ID</Text>
        <Text style={[styles.tableHeaderText, { flex: 2 }]}>Sales Person</Text>
        <Text style={[styles.tableHeaderText, { flex: 1 }]}>Salons</Text>
        <Text style={[styles.tableHeaderText, { flex: 1.5 }]}>Commission</Text>
      </View>

      {/* Table Rows */}
      {SALES_TEAM.map((person) => (
        <View key={person.id} style={styles.tableRow}>
          <Text style={[styles.tableCell, { flex: 1.5 }]}>{person.referralId}</Text>
          <Text style={[styles.tableCell, { flex: 2 }]}>{person.name}</Text>
          <View style={[styles.salonBadge, { flex: 1 }]}>
            <Text style={styles.salonBadgeText}>{person.salons}</Text>
          </View>
          <Text style={[styles.tableCell, { flex: 1.5, color: '#4CAF50' }]}>
            {person.commission}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderSubscriptions = () => (
    <View style={styles.tabContent}>
      <Text style={styles.chartTitle}>Subscriptions Sold per Month</Text>

      {/* Bar Chart */}
      <View style={styles.chartContainer}>
        <View style={styles.chartYAxis}>
          <Text style={styles.chartLabel}>100</Text>
          <Text style={styles.chartLabel}>75</Text>
          <Text style={styles.chartLabel}>50</Text>
          <Text style={styles.chartLabel}>25</Text>
          <Text style={styles.chartLabel}>0</Text>
        </View>

        <View style={styles.chartBars}>
          {SUBSCRIPTION_DATA.map((data, index) => {
            const barHeight = (data.value / maxValue) * chartHeight;
            return (
              <View key={index} style={styles.barWrapper}>
                <View
                  style={[
                    styles.bar,
                    { height: barHeight, backgroundColor: '#7C5FED' },
                  ]}
                />
                <Text style={styles.barLabel}>{data.month}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Total Subscriptions</Text>
          <Text style={styles.statValue}>370</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Avg per Month</Text>
          <Text style={styles.statValue}>61.7</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Growth</Text>
          <Text style={[styles.statValue, { color: '#4CAF50' }]}>+125%</Text>
        </View>
      </View>
    </View>
  );

  const renderRevenue = () => (
    <View style={styles.tabContent}>
      <Text style={styles.chartTitle}>Revenue Distribution by Sales Person</Text>

      {/* Pie Chart (Mock) */}
      <View style={styles.pieChartContainer}>
        <View style={styles.pieChart}>
          <View style={[styles.piePiece, { backgroundColor: '#7C5FED', width: '25%' }]} />
          <View style={[styles.piePiece, { backgroundColor: '#E91E63', width: '23%' }]} />
          <View style={[styles.piePiece, { backgroundColor: '#2196F3', width: '17%' }]} />
          <View style={[styles.piePiece, { backgroundColor: '#FF9800', width: '19%' }]} />
          <View style={[styles.piePiece, { backgroundColor: '#4CAF50', width: '16%' }]} />
        </View>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#7C5FED' }]} />
          <Text style={styles.legendText}>Rajesh Kumi: 25%</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#E91E63' }]} />
          <Text style={styles.legendText}>Arma: 23%</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#2196F3' }]} />
          <Text style={styles.legendText}>Others: -</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#FF9800' }]} />
          <Text style={styles.legendText}>Sneha Reddy: 17%</Text>
        </View>
      </View>

      {/* Top Performer */}
      <View style={styles.performerCard}>
        <View style={styles.performerHeader}>
          <Icon name="trending-up" size={20} color="#4CAF50" />
          <Text style={styles.performerTitle}>Top Performer</Text>
        </View>
        <View style={styles.performerContent}>
          <View style={styles.performerAvatar} />
          <View style={styles.performerInfo}>
            <Text style={styles.performerName}>Priya Verma</Text>
            <Text style={styles.performerSubtext}>SP-2025-002</Text>
          </View>
        </View>
        <View style={styles.performerStats}>
          <View style={styles.performerStat}>
            <Text style={styles.performerStatLabel}>Salons Registered</Text>
            <Text style={styles.performerStatValue}>18</Text>
          </View>
          <View style={styles.performerStat}>
            <Text style={styles.performerStatLabel}>Subscriptions Sold</Text>
            <Text style={styles.performerStatValue}>15</Text>
          </View>
          <View style={styles.performerStat}>
            <Text style={styles.performerStatLabel}>Commission Earned</Text>
            <Text style={styles.performerStatValue}>₹82,500</Text>
          </View>
        </View>
      </View>

      {/* Low Performers Alert */}
      <View style={styles.alertCard}>
        <View style={styles.alertHeader}>
          <Icon name="alert-circle" size={20} color="#FF9800" />
          <Text style={styles.alertTitle}>Low Performance Alert</Text>
        </View>
        {LOW_PERFORMERS.map((person) => (
          <View key={person.id} style={styles.alertItem}>
            <View style={styles.alertItemContent}>
              <Text style={styles.alertItemName}>{person.name}</Text>
              <Text style={styles.alertItemSubtext}>{person.salons} salons</Text>
            </View>
            <TouchableOpacity style={styles.alertButton}>
              <Text style={styles.alertButtonText}>Alert</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );

  const renderCommissions = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionSubtitle}>Awaiting approval</Text>

      {PENDING_COMMISSIONS.map((commission) => (
        <View key={commission.id} style={styles.commissionCard}>
          <View style={styles.commissionInfo}>
            <Text style={styles.commissionName}>{commission.name}</Text>
            <Text style={styles.commissionId}>{commission.referralId}</Text>
          </View>
          <Text style={styles.commissionAmount}>{commission.amount}</Text>
        </View>
      ))}
    </View>
  );

  return (
  <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#156778' }}>
    <StatusBar backgroundColor="#156778" barStyle="light-content" />
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sales Team Management</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'sales' && styles.activeTab]}
          onPress={() => setActiveTab('sales')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'sales' && styles.activeTabText,
            ]}
          >
            Sales Team
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'subscriptions' && styles.activeTab]}
          onPress={() => setActiveTab('subscriptions')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'subscriptions' && styles.activeTabText,
            ]}
          >
            Subscriptions
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'revenue' && styles.activeTab]}
          onPress={() => setActiveTab('revenue')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'revenue' && styles.activeTabText,
            ]}
          >
            Revenue
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'commissions' && styles.activeTab]}
          onPress={() => setActiveTab('commissions')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'commissions' && styles.activeTabText,
            ]}
          >
            Commissions
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {activeTab === 'sales' && renderSalesTeam()}
        {activeTab === 'subscriptions' && renderSubscriptions()}
        {activeTab === 'revenue' && renderRevenue()}
        {activeTab === 'commissions' && renderCommissions()}
      </ScrollView>
    </View>
  </SafeAreaView>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#7C5FED',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
  },
  activeTabText: {
    color: '#7C5FED',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 30,
  },
  tabContent: {
    gap: 16,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#999',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 8,
  },
  tableHeaderText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#666',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  tableCell: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  salonBadge: {
    backgroundColor: '#E8D4F8',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  salonBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7C5FED',
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  chartContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    minHeight: 200,
  },
  chartYAxis: {
    justifyContent: 'space-between',
    marginRight: 12,
  },
  chartLabel: {
    fontSize: 10,
    color: '#999',
    width: 30,
    textAlign: 'right',
  },
  chartBars: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    gap: 8,
  },
  barWrapper: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  bar: {
    width: '100%',
    borderRadius: 4,
  },
  barLabel: {
    fontSize: 10,
    color: '#999',
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 6,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  pieChartContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 24,
  },
  pieChart: {
    width: 120,
    height: 120,
    borderRadius: 60,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  piePiece: {
    height: '100%',
  },
  legend: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  performerCard: {
    backgroundColor: '#7C5FED',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  performerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  performerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  performerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  performerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  performerInfo: {
    flex: 1,
  },
  performerName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  performerSubtext: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  performerStats: {
    flexDirection: 'row',
    gap: 8,
  },
  performerStat: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  performerStatLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
  },
  performerStatValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
  },
  alertCard: {
    backgroundColor: '#FFF3CD',
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  alertTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#333',
  },
  alertItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  alertItemContent: {
    flex: 1,
  },
  alertItemName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  alertItemSubtext: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },
  alertButton: {
    borderWidth: 1,
    borderColor: '#FF9800',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  alertButtonText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FF9800',
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#999',
    marginBottom: 12,
  },
  commissionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  commissionInfo: {
    flex: 1,
  },
  commissionName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  commissionId: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  commissionAmount: {
    fontSize: 13,
    fontWeight: '700',
    color: '#333',
  },
});
