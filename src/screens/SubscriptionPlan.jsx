import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const DUMMY_PLANS = [
  {
    _id: 'plan1',
    name: 'Basic',
    price: 199,
    durationInDays: 30,
    features: ['Up to 5 staff members', 'Unlimited bookings', 'Customer management', 'Basic reporting'],
    isActive: true,
  },
  {
    _id: 'plan2',
    name: 'Pro',
    price: 499,
    durationInDays: 90,
    features: ['Everything in Basic', 'Up to 15 staff members', 'Advanced reporting', 'Email marketing integration', 'Service add-ons'],
    isActive: true,
  },
  {
    _id: 'plan3',
    name: 'Premium',
    price: 1999,
    durationInDays: 365,
    features: ['Everything in Pro', 'Unlimited staff members', 'Dedicated account manager', 'Inventory management', 'Priority support'],
    isActive: true,
  },
];

export default function SubscriptionScreen({ closeModal }) {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  const getDurationText = (days) => {
    if (days <= 31) return '/ month';
    if (days <= 92) return '/ 3 months';
    if (days <= 366) return '/ year';
    return `for ${days} days`;
  };

  useEffect(() => {
    const fetchPlans = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPlans(DUMMY_PLANS.filter((plan) => plan.isActive));
      setLoading(false);
    };
    fetchPlans();
  }, []);

  const renderPlanCard = ({ item }) => {
    const isSelected = selectedPlanId === item._id;
    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.selectedCard]}
        onPress={() => setSelectedPlanId(item._id)}
      >
        <Text style={styles.planName}>{item.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.planPrice}>₹{item.price}</Text>
          <Text style={styles.planDuration}>{getDurationText(item.durationInDays)}</Text>
        </View>
        <View style={styles.divider} />
        <Text style={styles.featuresTitle}>What's included:</Text>
        {item.features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Icon name="checkmark-circle-outline" size={18} color="#4CAF50" />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={true} transparent={true} animationType="slide">
      <View style={styles.modalBackdrop}>
        <SafeAreaView style={styles.container}>
          {/* Header with close button */}
          <View style={styles.header}>
            <TouchableOpacity onPress={closeModal}>
              <Icon name="close" size={28} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Choose Your Plan</Text>
            <View style={{ width: 28 }} />
          </View>

          {loading ? (
            <View style={styles.centeredContainer}>
              <ActivityIndicator size="large" color="#7C5FED" />
              <Text style={{ marginTop: 10 }}>Loading plans...</Text>
            </View>
          ) : (
            <FlatList
              data={plans}
              renderItem={renderPlanCard}
              keyExtractor={(item) => item._id}
              contentContainerStyle={styles.listContent}
              ListHeaderComponent={() => <Text style={styles.listHeader}>Select a plan to continue</Text>}
            />
          )}

          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.continueButton, !selectedPlanId && styles.disabledButton]}
              disabled={!selectedPlanId}
              onPress={() => console.log('Selected Plan ID:', selectedPlanId)}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  centeredContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e0e0e0' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#333' },
  listContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 100 },
  listHeader: { fontSize: 16, color: '#666', marginBottom: 16, textAlign: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 20, marginBottom: 16, borderWidth: 2, borderColor: 'transparent', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  selectedCard: { borderColor: '#7C5FED', elevation: 6, shadowOpacity: 0.2 },
  planName: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  priceContainer: { flexDirection: 'row', alignItems: 'baseline', marginTop: 8 },
  planPrice: { fontSize: 28, fontWeight: 'bold', color: '#7C5FED' },
  planDuration: { fontSize: 16, color: '#666', marginLeft: 4, fontWeight: '500' },
  divider: { height: 1, backgroundColor: '#e0e0e0', marginVertical: 16 },
  featuresTitle: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 12 },
  featureItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  featureText: { fontSize: 14, color: '#555', marginLeft: 10, flex: 1 },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, paddingBottom: 24, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e0e0e0' },
  continueButton: { backgroundColor: '#7C5FED', paddingVertical: 14, borderRadius: 8, alignItems: 'center' },
  disabledButton: { backgroundColor: '#ccc' },
  continueButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
