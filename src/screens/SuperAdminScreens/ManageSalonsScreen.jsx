import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const SALONS_DATA = [
  {
    id: 1,
    name: 'Prime Salon & Spa',
    owner: 'Rajesh Kumar',
    city: 'Mumbai',
    category: 'Premium',
    subscriptionPlan: 'Pro',
    status: 'Active',
    joinDate: '2025-01-15',
    revenue: '₹45,000',
  },
  {
    id: 2,
    name: 'Shine Beauty Studio',
    owner: 'Priya Sharma',
    city: 'Delhi',
    category: 'Standard',
    subscriptionPlan: 'Basic',
    status: 'Active',
    joinDate: '2025-01-20',
    revenue: '₹28,000',
  },
  {
    id: 3,
    name: 'Glam House',
    owner: 'Amit Patel',
    city: 'Bangalore',
    category: 'Premium',
    subscriptionPlan: 'Pro',
    status: 'Suspended',
    joinDate: '2025-01-10',
    revenue: '₹32,000',
  },
  {
    id: 4,
    name: 'Hair Craft',
    owner: 'Sneha Reddy',
    city: 'Hyderabad',
    category: 'Standard',
    subscriptionPlan: 'Basic',
    status: 'Active',
    joinDate: '2025-02-01',
    revenue: '₹18,000',
  },
  {
    id: 5,
    name: 'Luxe Salon',
    owner: 'Vikram Singh',
    city: 'Pune',
    category: 'Premium',
    subscriptionPlan: 'Enterprise',
    status: 'Active',
    joinDate: '2025-02-05',
    revenue: '₹62,000',
  },
];

const SUBSCRIPTION_PLANS = ['Basic', 'Standard', 'Pro', 'Enterprise'];
const CATEGORIES = ['Unisex Salon', 'Men Salon', 'Women Salon', 'Premium', 'Standard'];

export default function ManageSalonsScreen() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSalon, setSelectedSalon] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    owner: '',
    city: '',
    category: 'Standard',
    subscriptionPlan: 'Basic',
  });

  // Filter salons based on tab and search
  const getFilteredSalons = () => {
    let filtered = SALONS_DATA;

    if (activeTab === 'active') {
      filtered = filtered.filter((s) => s.status === 'Active');
    } else if (activeTab === 'suspended') {
      filtered = filtered.filter((s) => s.status === 'Suspended');
    }

    if (searchText) {
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(searchText.toLowerCase()) ||
          s.city.toLowerCase().includes(searchText.toLowerCase()) ||
          s.owner.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return filtered;
  };

  const handleAddSalon = () => {
    if (!formData.name || !formData.owner || !formData.city) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    Alert.alert('Success', `Salon ${formData.name} ${selectedSalon ? 'updated' : 'added'} successfully!`);
    setFormData({ name: '', owner: '', city: '', category: 'Standard', subscriptionPlan: 'Basic' });
    setSelectedSalon(null);
    setModalVisible(false);
  };

  const handleEditSalon = (salon) => {
    setSelectedSalon(salon);
    setFormData({
      name: salon.name,
      owner: salon.owner,
      city: salon.city,
      category: salon.category,
      subscriptionPlan: salon.subscriptionPlan,
    });
    setModalVisible(true);
  };

  const handleDeleteSalon = (salonId) => {
    Alert.alert(
      'Delete Salon',
      'Are you sure you want to delete this salon?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Success', 'Salon deleted successfully');
          },
        },
      ]
    );
  };

  const handleSuspendSalon = (salonId) => {
    Alert.alert('Suspend Salon', 'Are you sure you want to suspend this salon?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Suspend',
        style: 'destructive',
        onPress: () => {
          Alert.alert('Success', 'Salon suspended successfully');
        },
      },
    ]);
  };

  const filteredSalons = getFilteredSalons();
  const statsData = {
    total: SALONS_DATA.length,
    active: SALONS_DATA.filter((s) => s.status === 'Active').length,
    suspended: SALONS_DATA.filter((s) => s.status === 'Suspended').length,
    revenue: SALONS_DATA.reduce((sum, s) => {
      const amount = parseInt(s.revenue.replace(/[^\d]/g, ''));
      return sum + amount;
    }, 0),
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Manage Salons</Text>
          <Text style={styles.headerSubtitle}>Salon registrations & subscriptions</Text>
        </View>
        <TouchableOpacity
          style={styles.addSalonButton}
          onPress={() => {
            setSelectedSalon(null);
            setFormData({ name: '', owner: '', city: '', category: 'Standard', subscriptionPlan: 'Basic' });
            setModalVisible(true);
          }}
        >
          <Icon name="add" size={20} color="#fff" />
          <Text style={styles.addSalonButtonText}>Add Salon</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={styles.statCardContent}>
              <Text style={styles.statCardLabel}>Total Salons</Text>
              <Text style={styles.statCardValue}>{statsData.total}</Text>
            </View>
            <View style={[styles.statCardIcon, { backgroundColor: '#7C5FED20' }]}>
              <Icon name="storefront" size={24} color="#7C5FED" />
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statCardContent}>
              <Text style={styles.statCardLabel}>Active</Text>
              <Text style={styles.statCardValue}>{statsData.active}</Text>
            </View>
            <View style={[styles.statCardIcon, { backgroundColor: '#4CAF5020' }]}>
              <Icon name="checkmark-circle" size={24} color="#4CAF50" />
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statCardContent}>
              <Text style={styles.statCardLabel}>Suspended</Text>
              <Text style={styles.statCardValue}>{statsData.suspended}</Text>
            </View>
            <View style={[styles.statCardIcon, { backgroundColor: '#FF980020' }]}>
              <Icon name="alert-circle" size={24} color="#FF9800" />
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statCardContent}>
              <Text style={styles.statCardLabel}>Total Revenue</Text>
              <Text style={styles.statCardValue}>₹{(statsData.revenue / 100000).toFixed(1)}L</Text>
            </View>
            <View style={[styles.statCardIcon, { backgroundColor: '#4CAF5020' }]}>
              <Icon name="cash" size={24} color="#4CAF50" />
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Icon name="search" size={20} color="#999" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search salons by name or city"
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor="#999"
            />
            {searchText ? (
              <TouchableOpacity onPress={() => setSearchText('')}>
                <Icon name="close" size={20} color="#999" />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'all' && styles.activeTab]}
            onPress={() => setActiveTab('all')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'all' && styles.activeTabText,
              ]}
            >
              All Salons
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'active' && styles.activeTab]}
            onPress={() => setActiveTab('active')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'active' && styles.activeTabText,
              ]}
            >
              Active
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'suspended' && styles.activeTab]}
            onPress={() => setActiveTab('suspended')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'suspended' && styles.activeTabText,
              ]}
            >
              Suspended
            </Text>
          </TouchableOpacity>
        </View>

        {/* Salons List */}
        <View style={styles.salonsSection}>
          {filteredSalons.length > 0 ? (
            filteredSalons.map((salon) => (
              <View key={salon.id} style={styles.salonCard}>
                <View style={styles.salonCardHeader}>
                  <View style={styles.salonIconContainer}>
                    <Icon name="storefront" size={24} color="#fff" />
                  </View>
                  <View style={styles.salonInfo}>
                    <Text style={styles.salonName}>{salon.name}</Text>
                    <Text style={styles.salonOwner}>Owner: {salon.owner}</Text>
                  </View>
                  <View style={styles.salonActions}>
                    <TouchableOpacity
                      onPress={() => handleEditSalon(salon)}
                      style={styles.actionButton}
                    >
                      <Icon name="pencil" size={18} color="#7C5FED" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDeleteSalon(salon.id)}
                      style={styles.actionButton}
                    >
                      <Icon name="trash" size={18} color="#F44336" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.salonCardDetails}>
                  <View style={styles.detailRow}>
                    <View style={styles.detailItem}>
                      <Icon name="location" size={14} color="#999" />
                      <Text style={styles.detailText}>{salon.city}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Icon name="pricetag" size={14} color="#999" />
                      <Text style={styles.detailText}>{salon.category}</Text>
                    </View>
                  </View>

                  <View style={styles.detailRow}>
                    <View style={styles.planBadge}>
                      <Text style={styles.planBadgeText}>{salon.subscriptionPlan}</Text>
                    </View>
                    <View
                      style={[
                        styles.statusBadge,
                        {
                          backgroundColor:
                            salon.status === 'Active' ? '#C8E6C9' : '#FFE0B2',
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusBadgeText,
                          {
                            color:
                              salon.status === 'Active' ? '#2E7D32' : '#E65100',
                          },
                        ]}
                      >
                        {salon.status}
                      </Text>
                    </View>
                    <Text style={styles.revenueText}>{salon.revenue}</Text>
                  </View>

                  <View style={styles.actionRow}>
                    <Text style={styles.joinDate}>Joined {salon.joinDate}</Text>
                    {salon.status === 'Active' && (
                      <TouchableOpacity
                        style={styles.suspendButton}
                        onPress={() => handleSuspendSalon(salon.id)}
                      >
                        <Icon name="alert" size={14} color="#FF9800" />
                        <Text style={styles.suspendButtonText}>Suspend</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Icon name="search" size={48} color="#DDD" />
              <Text style={styles.emptyStateText}>No salons found</Text>
              <Text style={styles.emptyStateSubtext}>Try adjusting your filters</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Add/Edit Salon Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {selectedSalon ? 'Edit Salon' : 'Add New Salon'}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  setSelectedSalon(null);
                }}
              >
                <Icon name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalForm} showsVerticalScrollIndicator={false}>
              <Text style={styles.inputLabel}>Salon Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter salon name"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                placeholderTextColor="#999"
              />

              <Text style={styles.inputLabel}>Owner Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter owner name"
                value={formData.owner}
                onChangeText={(text) => setFormData({ ...formData, owner: text })}
                placeholderTextColor="#999"
              />

              <Text style={styles.inputLabel}>City *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter city"
                value={formData.city}
                onChangeText={(text) => setFormData({ ...formData, city: text })}
                placeholderTextColor="#999"
              />

              <Text style={styles.inputLabel}>Category</Text>
              <View style={styles.optionsContainer}>
                {CATEGORIES.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.optionButton,
                      formData.category === cat && styles.optionButtonSelected,
                    ]}
                    onPress={() => setFormData({ ...formData, category: cat })}
                  >
                    <Text
                      style={[
                        styles.optionButtonText,
                        formData.category === cat && styles.optionButtonTextSelected,
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.inputLabel}>Subscription Plan</Text>
              <View style={styles.optionsContainer}>
                {SUBSCRIPTION_PLANS.map((plan) => (
                  <TouchableOpacity
                    key={plan}
                    style={[
                      styles.optionButton,
                      formData.subscriptionPlan === plan && styles.optionButtonSelected,
                    ]}
                    onPress={() => setFormData({ ...formData, subscriptionPlan: plan })}
                  >
                    <Text
                      style={[
                        styles.optionButtonText,
                        formData.subscriptionPlan === plan && styles.optionButtonTextSelected,
                      ]}
                    >
                      {plan}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setModalVisible(false);
                  setSelectedSalon(null);
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton} onPress={handleAddSalon}>
                <Icon name="checkmark" size={18} color="#fff" />
                <Text style={styles.submitButtonText}>
                  {selectedSalon ? 'Update' : 'Add'} Salon
                </Text>
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
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  addSalonButton: {
    flexDirection: 'row',
    backgroundColor: '#E91E63',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
    gap: 4,
  },
  addSalonButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 30,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  statCardContent: {
    flex: 1,
  },
  statCardLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500',
    marginBottom: 4,
  },
  statCardValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  statCardIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchSection: {
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    gap: 4,
    marginBottom: 16,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#E91E63',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
  },
  activeTabText: {
    color: '#fff',
  },
  salonsSection: {
    gap: 12,
  },
  salonCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  salonCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  salonIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#E91E63',
    justifyContent: 'center',
    alignItems: 'center',
  },
  salonInfo: {
    flex: 1,
  },
  salonName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },
  salonOwner: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  salonActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  salonCardDetails: {
    gap: 10,
  },
  detailRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 11,
    color: '#666',
  },
  planBadge: {
    backgroundColor: '#E8D4F8',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  planBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#7C5FED',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  revenueText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4CAF50',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  joinDate: {
    fontSize: 10,
    color: '#999',
  },
  suspendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FF9800',
  },
  suspendButtonText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FF9800',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
    marginTop: 12,
  },
  emptyStateSubtext: {
    fontSize: 12,
    color: '#BBB',
    marginTop: 4,
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
    maxHeight: '90%',
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
  modalForm: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
    marginBottom: 14,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  optionButtonSelected: {
    backgroundColor: '#E91E63',
    borderColor: '#E91E63',
  },
  optionButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666',
  },
  optionButtonTextSelected: {
    color: '#fff',
  },
  modalFooter: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#E91E63',
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  submitButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },
});