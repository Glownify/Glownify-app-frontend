import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const SALES_PERSON = {
  id: 'SP-2025-001',
  name: 'Rajesh Kumar',
  referralId: 'SP-2025-001',
  profilePhoto: '👨',
};

const SALES_PERSON_REFERRAL_LINK = "https://salonstartup.com/ref/" + SALES_PERSON.referralId

// console.log(SALES_PERSON_REFERRAL_LINK)

const METRICS = [
  {
    id: 1,
    label: 'Total Salons Registered',
    value: '15',
    icon: 'storefront',
    color: '#7C5FED',
  },
  {
    id: 2,
    label: 'App Downloads from Referral',
    value: '42',
    icon: 'download',
    color: '#E91E63',
  },
  {
    id: 3,
    label: 'Total Commission Earned',
    value: '₹12,450',
    icon: 'cash',
    color: '#4CAF50',
  },
  {
    id: 4,
    label: 'Total Independant Professional',
    value: 13,
    icon: 'person',
    color: '#914cafff',
  }
];

const SALONS_BREAKDOWN = [
  {
    id: 1,
    salonName: 'Prime Salon & Spa',
    registrationDate: '2025-01-15',
    subscriptionPlan: 'Pro',
    commission: '₹3,000',
    paymentStatus: 'Paid',
  },
  {
    id: 2,
    salonName: 'Shine Beauty Studio',
    registrationDate: '2025-01-20',
    subscriptionPlan: 'Basic',
    commission: '₹2,000',
    paymentStatus: 'Pending',
  },
  {
    id: 3,
    salonName: 'Glam House',
    registrationDate: '2025-01-25',
    subscriptionPlan: 'Pro',
    commission: '₹3,000',
    paymentStatus: 'Paid',
  },
  {
    id: 4,
    salonName: 'Hair Craft',
    registrationDate: '2025-02-01',
    subscriptionPlan: 'Basic',
    commission: '₹2,000',
    paymentStatus: 'Pending',
  },
  {
    id: 5,
    salonName: 'Luxe Salon',
    registrationDate: '2025-02-05',
    subscriptionPlan: 'Enterprise',
    commission: '₹2,450',
    paymentStatus: 'Paid',
  },
];

const MONTHLY_SALES = [
  { month: 'Jan', value: 3 },
  { month: 'Feb', value: 5 },
  { month: 'Mar', value: 4 },
  { month: 'Apr', value: 2 },
  { month: 'May', value: 1 },
];


const shareOnWhatsApp = () => {
  const message = `Hey! Use my referral link to join: ${SALES_PERSON_REFERRAL_LINK}`;
  const url = `whatsapp://send?text=${encodeURIComponent(message)}`;

  Linking.openURL(url).catch(() => {
    Alert.alert('WhatsApp not installed');
  });
}

export default function SalesPersonDashboard({navigation}) {
  const [shareModalVisible, setShareModalVisible] = useState(false);

  const maxValue = Math.max(...MONTHLY_SALES.map((d) => d.value));
  const chartHeight = 100;
  const targetSalons = 20;
  const achievedSalons = 15;
  const progressPercentage = (achievedSalons / targetSalons) * 100;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.profilePhoto}>
            <Text style={styles.profilePhotoText}>{SALES_PERSON.profilePhoto}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{SALES_PERSON.name}</Text>
            <Text style={styles.referralLabel}>Referral ID</Text>
          </View>
        </View>
        <View style={styles.referralIdBadge}>
          <Text style={styles.referralIdText}>{SALES_PERSON.referralId}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Metrics Overview - 4 Cards */}
        <View style={styles.metricsGrid}>
          {METRICS.map((metric) => (
            <TouchableOpacity key={metric.id} style={styles.metricCard} onPress={()=>{metric.id == 1 ? navigation.navigate("MySalonsScreen") : console.log("id!=1")}} >
              <View style={[styles.metricIcon, { backgroundColor: `${metric.color}20` }]}>
                <Icon name={metric.icon} size={24} color={metric.color} />
              </View>
              <Text style={styles.metricLabel}>{metric.label}</Text>
              <Text style={[styles.metricValue, { color: metric.color }]}>
                {metric.value}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Detailed Breakdown Table */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detailed Breakdown</Text>
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, { flex: 1.5 }]}>Salon Name</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Reg. Date</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Plan</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Commission</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Status</Text>
            </View>

            {SALONS_BREAKDOWN.map((salon) => (
              <View key={salon.id} style={styles.tableRow}>
                <Text
                  style={[styles.tableCell, { flex: 1.5 }]}
                  numberOfLines={1}
                >
                  {salon.salonName}
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>
                  {new Date(salon.registrationDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </Text>
                <View style={[styles.planBadge, { flex: 1 }]}>
                  <Text style={styles.planBadgeText}>{salon.subscriptionPlan}</Text>
                </View>
                <Text style={[styles.tableCell, { flex: 1, color: '#4CAF50', fontWeight: '600' }]}>
                  {salon.commission}
                </Text>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        salon.paymentStatus === 'Paid' ? '#C8E6C9' : '#FFE0B2',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusBadgeText,
                      {
                        color: salon.paymentStatus === 'Paid' ? '#2E7D32' : '#E65100',
                      },
                    ]}
                  >
                    {salon.paymentStatus}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Analytics Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Monthly Sales Growth</Text>
          <View style={styles.chartContainer}>
            <View style={styles.chartYAxis}>
              <Text style={styles.chartLabel}>5</Text>
              <Text style={styles.chartLabel}>4</Text>
              <Text style={styles.chartLabel}>3</Text>
              <Text style={styles.chartLabel}>2</Text>
              <Text style={styles.chartLabel}>1</Text>
              <Text style={styles.chartLabel}>0</Text>
            </View>

            <View style={styles.chartBars}>
              {MONTHLY_SALES.map((data, index) => {
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
        </View>

        {/* Target vs Achieved */}
        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Target vs Achieved</Text>
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Salons Registered</Text>
              <Text style={styles.progressValue}>
                {achievedSalons} / {targetSalons}
              </Text>
            </View>
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${progressPercentage}%` },
                ]}
              />
            </View>
            <Text style={styles.progressPercentage}>{progressPercentage.toFixed(0)}% Complete</Text>
          </View>
        </View> */}

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="add-circle" size={20} color="#fff" />
              <Text style={styles.actionButtonText}>Register New Salon</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.actionButtonSecondary]}
              onPress={() => setShareModalVisible(true)}
            >
              <Icon name="share-social" size={20} color="#7C5FED" />
              <Text style={[styles.actionButtonText, styles.actionButtonTextSecondary]}>
                Share Referral Link
              </Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={[styles.actionButton, styles.actionButtonSecondary]}
            >
              <Icon name="cash" size={20} color="#7C5FED" />
              <Text style={[styles.actionButtonText, styles.actionButtonTextSecondary]}>
                Withdraw Commission
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </ScrollView>

      {/* Share Referral Modal */}
      <Modal
        visible={shareModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShareModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Share Referral Link</Text>
              <TouchableOpacity onPress={() => setShareModalVisible(false)}>
                <Icon name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <View style={styles.referralLinkContainer}>
                <Text style={styles.referralLinkLabel}>Your Referral Link</Text>
                <View style={styles.referralLinkBox}>
                  <Text style={styles.referralLink}>
                    {SALES_PERSON_REFERRAL_LINK}
                  </Text>
                  <TouchableOpacity style={styles.copyButton}>
                    <Icon name="copy" size={18} color="#7C5FED" />
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.shareMethodsLabel}>Share Via</Text>
              <View style={styles.shareMethodsGrid}>
                <TouchableOpacity style={styles.shareMethod} onPress={()=> shareOnWhatsApp()} >
                  <Icon name="logo-whatsapp" size={32} color="#25D366" />
                  <Text style={styles.shareMethodText}>WhatsApp</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.shareMethod}>
                  <Icon name="mail" size={32} color="#EA4335" />
                  <Text style={styles.shareMethodText}>Email</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.shareMethod}>
                  <Icon name="share-social" size={32} color="#1F2937" />
                  <Text style={styles.shareMethodText}>More</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShareModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  profilePhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#7C5FED20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePhotoText: {
    fontSize: 28,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  referralLabel: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  referralIdBadge: {
    backgroundColor: '#7C5FED',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  referralIdText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 30,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 10,
    color: '#999',
    marginBottom: 6,
    textAlign: 'center',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f5f5f5',
    gap: 8,
  },
  tableHeaderCell: {
    fontSize: 10,
    fontWeight: '700',
    color: '#666',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    gap: 8,
    alignItems: 'center',
  },
  tableCell: {
    fontSize: 11,
    color: '#333',
    fontWeight: '500',
  },
  planBadge: {
    backgroundColor: '#E8D4F8',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 4,
    alignItems: 'center',
  },
  planBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#7C5FED',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 4,
    alignItems: 'center',
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  chartContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    minHeight: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  chartYAxis: {
    justifyContent: 'space-between',
    marginRight: 12,
  },
  chartLabel: {
    fontSize: 10,
    color: '#999',
    width: 20,
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
  progressCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  progressLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  progressValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#7C5FED',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#7C5FED',
    borderRadius: 4,
  },
  progressPercentage: {
    fontSize: 11,
    color: '#999',
  },
  actionsContainer: {
    gap: 10,
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: '#7C5FED',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  actionButtonSecondary: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#7C5FED',
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },
  actionButtonTextSecondary: {
    color: '#7C5FED',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  modalBody: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  referralLinkContainer: {
    marginBottom: 20,
  },
  referralLinkLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  referralLinkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    gap: 8,
  },
  referralLink: {
    flex: 1,
    fontSize: 12,
    color: '#7C5FED',
    fontWeight: '600',
  },
  copyButton: {
    padding: 6,
  },
  shareMethodsLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  shareMethodsGrid: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
    marginBottom: 16,
  },
  shareMethod: {
    alignItems: 'center',
    gap: 8,
  },
  shareMethodText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666',
  },
  modalFooter: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  closeButton: {
    backgroundColor: '#7C5FED',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
});