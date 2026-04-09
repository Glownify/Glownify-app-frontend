import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import { fetchDashboardStats } from '../../redux/slices/salesExecutive';
import {S, theme} from '../../theme';
const SALES_PERSON = {
  id: 'SP-2025-001',
  name: 'Rajesh Kumar',
  referralId: 'SP-2025-001',
  profilePhoto: '👨',
};

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
    label: 'App Downloads',
    value: '42',
    icon: 'download',
    color: '#E91E63',
  },
  {
    id: 3,
    label: 'Total Commission',
    value: '₹12,450',
    icon: 'cash',
    color: '#4CAF50',
  },
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

export default function SalesExecutiveDashboardScreen() {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);
  const { summary, salesman } = useSelector((state) => state.salesExecutive);
  const [shareModalVisible, setShareModalVisible] = useState(false);

  const maxValue = Math.max(...MONTHLY_SALES.map((d) => d.value));
  const chartHeight = 100;
  const targetSalons = 20;
  const achievedSalons = 15;
  const progressPercentage = (achievedSalons / targetSalons) * 100;


  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-primary-700">
      <StatusBar backgroundColor={theme.colors.primary[700]} barStyle="light-content" />
      
      <View className="flex-1 bg-neutral-50">
        {/* Header */}
        <View
          className="flex-row items-center justify-between bg-surface border-b border-neutral-100"
          style={{padding: S.space.lg}}>
          <View className="flex-row items-center" style={{gap: S.space.md}}>
            <View
              className="items-center justify-center rounded-full bg-primary-100"
              style={{width: 45, height: 45}}>
              <Text style={{fontSize: S.fs.xl}}>{user?.profilePhoto || '👨'}</Text>
            </View>
            <View style={{gap: S.space.xs}}>
              <Text className="font-bold text-neutral-900" style={{fontSize: S.fs.md}}>
                {user?.name || 'Sales Executive'}
              </Text>
              <Text className="text-neutral-500" style={{fontSize: S.fs.xxs}}>Sales Executive</Text>
            </View>
          </View>
          <View className="bg-primary-600 rounded-md" style={{paddingHorizontal: S.space.md, paddingVertical: S.space.xs}}>
            <Text className="text-white font-bold" style={{fontSize: S.fs.xxs}}>
              {user?.roleDetails?.referralId || 'SP-XXXX'}
            </Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{padding: S.space.lg, gap: S.space.xl}}
          showsVerticalScrollIndicator={false}>
          {/* Metrics Overview */}
          <View className="flex-row" style={{gap: S.space.sm}}>
            {METRICS.map((metric) => (
              <View
                key={metric.id}
                className="flex-1 bg-surface rounded-lg items-center"
                style={{padding: S.space.sm}}>
                <View
                  className="items-center justify-center rounded-lg"
                  style={{width: 36, height: 36, backgroundColor: `${metric.color}20`}}>
                  <Icon name={metric.icon} size={20} color={metric.color} />
                </View>
                <Text
                  className="text-neutral-500 text-center"
                  style={{fontSize: S.fs.tiny, marginTop: S.space.xs}}>
                  {metric.label}
                </Text>
                <Text className="font-bold" style={{fontSize: S.fs.sm, color: metric.color}}>
                  {metric.value}
                </Text>
              </View>
            ))}
          </View>

          {/* Detailed Breakdown Table */}
          <View style={{gap: S.space.md}}>
            <Text className="font-bold text-neutral-900" style={{fontSize: S.fs.sm}}>Registration Breakdown</Text>
            <View className="bg-surface rounded-lg overflow-hidden">
              <View className="flex-row bg-neutral-50" style={{padding: S.space.sm}}>
                <Text className="font-bold text-neutral-500" style={{fontSize: S.fs.tiny, flex: 1.5}}>Salesman</Text>
                <Text className="font-bold text-neutral-500" style={{fontSize: S.fs.tiny, flex: 1}}>ReferralID</Text>
                <Text className="font-bold text-neutral-500" style={{fontSize: S.fs.tiny, flex: 1}}>Comm.</Text>
                <Text className="font-bold text-neutral-500" style={{fontSize: S.fs.tiny, flex: 1}}>Status</Text>
              </View>

             {salesman?.length > 0 ? (
  salesman.map((item) => (
    <View key={item._id || item.referralId} className="flex-row items-center border-t border-neutral-100" style={{padding: S.space.sm}}>
  <Text className="text-neutral-800" style={{fontSize: S.fs.xxs, flex: 1.5}} numberOfLines={1}>
    {item.name}
  </Text>

  <Text
    className="text-neutral-800"
    style={{fontSize: S.fs.xxs, flex: 1}}
    numberOfLines={1}
    ellipsizeMode="middle"
  >
    {item.referralId}
  </Text>

  <Text
    className="font-bold text-success-600 text-center"
    style={{width: 70, fontSize: S.fs.xxs}}
  >
    {item.commissionRate}%
  </Text>

  <View
    style={[
      {
        flex: 1,
        backgroundColor: item.status === 'active' ? '#C8E6C9' : '#FFE0B2',
        paddingVertical: 4,
        borderRadius: 4,
        alignItems: 'center',
      },
    ]}
  >
    <Text
      style={[
        {fontSize: S.fs.tiny, fontWeight: '700'},
        {
          color:
            item.status === 'active' ? '#2E7D32' : '#E65100',
        },
      ]}
    >
      {item.status.toUpperCase()}
    </Text>
  </View>
</View>
  ))
) : (
  <View style={{ padding: 20, alignItems: 'center' }}>
    <Text className="text-neutral-400" style={{ fontSize: 12 }}>
      No salesmen found
    </Text>
  </View>
)}

            </View>
          </View>

          {/* Monthly Growth Chart */}
          <View style={{gap: S.space.md}}>
            <Text className="font-bold text-neutral-900" style={{fontSize: S.fs.sm}}>Monthly Performance</Text>
            <View className="flex-row bg-surface rounded-lg" style={{padding: S.space.lg, height: 160}}>
              <View style={{justifyContent: 'space-between', marginRight: S.space.sm}}>
                {[5, 4, 3, 2, 1, 0].map(v => (
                  <Text key={v} className="text-neutral-400" style={{fontSize: S.fs.tiny, width: 15, textAlign: 'right'}}>{v}</Text>
                ))}
              </View>
              <View className="flex-1 flex-row items-end justify-around">
                {MONTHLY_SALES.map((data, index) => {
                  const barHeight = (data.value / maxValue) * chartHeight;
                  return (
                    <View key={index} className="items-center" style={{width: 30, gap: S.space.xs}}>
                      <View style={{height: barHeight, width: 15, borderRadius: 4, backgroundColor: theme.colors.primary[600]}} />
                      <Text className="text-neutral-400" style={{fontSize: S.fs.tiny}}>{data.month}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>

          {/* Target Tracking
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Monthly Target Goal</Text>
            <View style={styles.progressCard}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Salons Registered</Text>
                <Text style={styles.progressValue}>{achievedSalons} / {targetSalons}</Text>
              </View>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
              </View>
              <Text style={styles.progressPercentage}>{progressPercentage.toFixed(0)}% of Target Achieved</Text>
            </View>
          </View> */}

          {/* Quick Actions */}
          <View style={{gap: S.space.md}}>
            <Text className="font-bold text-neutral-900" style={{fontSize: S.fs.sm}}>Quick Actions</Text>
            <View style={{gap: S.space.sm}}>
              <TouchableOpacity
                className="flex-row items-center justify-center bg-primary-600 rounded-md"
                style={{padding: S.space.md, gap: S.space.sm}}>
                <Icon name="add-circle" size={20} color="#fff" />
                <Text className="font-semibold text-white" style={{fontSize: S.fs.xs}}>Register New Salon</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row items-center justify-center bg-surface rounded-md border border-primary-600"
                style={{padding: S.space.md, gap: S.space.sm}}
                onPress={() => setShareModalVisible(true)}
              >
                <Icon name="share-social" size={20} color={theme.colors.primary[600]} />
                <Text className="font-semibold text-primary-600" style={{fontSize: S.fs.xs}}>
                  Share Referral Link
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Share Referral Modal */}
      <Modal
        visible={shareModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShareModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 items-center justify-center" style={{padding: S.space.xl}}>
          <View className="bg-surface rounded-2xl w-full" style={{padding: S.space.lg, gap: S.space.lg}}>
            <View className="flex-row items-center justify-between">
              <Text className="font-bold text-neutral-900" style={{fontSize: S.fs.md}}>Referral System</Text>
              <TouchableOpacity onPress={() => setShareModalVisible(false)}>
                <Icon name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <View style={{gap: S.space.md}}>
              <Text className="font-semibold text-neutral-700" style={{fontSize: S.fs.xxs}}>Your Unique Link</Text>
              <View className="flex-row items-center bg-neutral-50 rounded-md" style={{padding: S.space.md, gap: S.space.sm}}>
                <Text className="flex-1 text-primary-600" style={{fontSize: S.fs.xxs}} numberOfLines={1}>
                  https://salonstartup.com/ref/{user?.roleDetails?.referralId}
                </Text>
                <TouchableOpacity>
                  <Icon name="copy" size={18} color={theme.colors.primary[600]} />
                </TouchableOpacity>
              </View>

              <Text className="font-semibold text-neutral-700" style={{fontSize: S.fs.xxs}}>Quick Share</Text>
              <View className="flex-row justify-around" style={{paddingVertical: S.space.sm}}>
                <ShareIcon name="logo-whatsapp" color="#25D366" label="WhatsApp" />
                <ShareIcon name="mail" color="#EA4335" label="Email" />
                <ShareIcon name="chatbubbles" color="#007AFF" label="SMS" />
              </View>
            </View>

            <View>
              <TouchableOpacity
                className="bg-primary-600 rounded-md items-center"
                style={{padding: S.space.md}}
                onPress={() => setShareModalVisible(false)}>
                <Text className="text-white font-bold">Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const ShareIcon = ({ name, color, label }) => (
  <TouchableOpacity style={{alignItems: 'center', gap: S.space.xs}}>
    <Icon name={name} size={32} color={color} />
    <Text className="text-neutral-500" style={{fontSize: S.fs.tiny}}>{label}</Text>
  </TouchableOpacity>
);