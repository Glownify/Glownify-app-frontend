import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllUsers } from '../../redux/slices/superAdminSlice';

export default function ManageUsersScreen() {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.superAdmin.users) || [];
  const loading = useSelector((state) => state.superAdmin.loading);

  const [activeTab, setActiveTab] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Customer', // fixed role
  });

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const getFilteredUsers = () => {
    let filtered = usersData;

    if (activeTab === 'active') filtered = filtered.filter(u => u.status === 'Active');
    if (activeTab === 'blocked') filtered = filtered.filter(u => u.status === 'Blocked');

    if (searchText) {
      filtered = filtered.filter(
        u => u.name.toLowerCase().includes(searchText.toLowerCase()) ||
             u.email.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredUsers = getFilteredUsers();

  const statsData = {
    total: usersData.length,
    active: usersData.filter(u => u.status === 'Active').length,
    blocked: usersData.filter(u => u.status === 'Blocked').length,
    customers: usersData.length,
  };

  const handleAddUser = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    Alert.alert(
      'Success',
      selectedUser ? `User ${formData.name} updated successfully!` : `User ${formData.name} added successfully!`
    );
    setFormData({ name: '', email: '', phone: '', role: 'Customer' });
    setSelectedUser(null);
    setModalVisible(false);
  };

  const handleEditUser = user => {
    setSelectedUser(user);
    setFormData({ name: user.name, email: user.email, phone: user.phone, role: 'Customer' });
    setModalVisible(true);
  };

  const handleDeleteUser = userId => {
    Alert.alert('Delete User', 'Are you sure you want to delete this user?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => Alert.alert('Success', 'User deleted successfully'),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Manage Users</Text>
          <Text style={styles.headerSubtitle}>Control customer accounts</Text>
        </View>
        <TouchableOpacity style={styles.addUserButton} onPress={() => setModalVisible(true)}>
          <Icon name="add" size={20} color="#fff" />
          <Text style={styles.addUserButtonText}>Add User</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={styles.statCardContent}>
              <Text style={styles.statCardLabel}>Total Customers</Text>
              <Text style={styles.statCardValue}>{statsData.total}</Text>
            </View>
            <View style={[styles.statCardIcon, { backgroundColor: '#7C5FED20' }]}>
              <Icon name="people" size={24} color="#7C5FED" />
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
              <Text style={styles.statCardLabel}>Blocked</Text>
              <Text style={styles.statCardValue}>{statsData.blocked}</Text>
            </View>
            <View style={[styles.statCardIcon, { backgroundColor: '#F4433620' }]}>
              <Icon name="alert-circle" size={24} color="#F44336" />
            </View>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Icon name="search" size={20} color="#999" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search customers by name or email"
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor="#999"
            />
            {searchText && (
              <TouchableOpacity onPress={() => setSearchText('')}>
                <Icon name="close" size={20} color="#999" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity style={[styles.tab, activeTab === 'all' && styles.activeTab]} onPress={() => setActiveTab('all')}>
            <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, activeTab === 'active' && styles.activeTab]} onPress={() => setActiveTab('active')}>
            <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, activeTab === 'blocked' && styles.activeTab]} onPress={() => setActiveTab('blocked')}>
            <Text style={[styles.tabText, activeTab === 'blocked' && styles.activeTabText]}>Blocked</Text>
          </TouchableOpacity>
        </View>

        {/* Users */}
        {loading ? (
          <View style={{ padding: 20 }}><Text>Loading customers...</Text></View>
        ) : (
          <View style={styles.usersSection}>
            {filteredUsers.length > 0 ? filteredUsers.map(user => (
              <View key={user._id} style={styles.userCard}>
                <View style={styles.userCardHeader}>
                  <View style={styles.userAvatar}><Text style={styles.userAvatarText}>👤</Text></View>
                 <View style={styles.userInfo}>
  <Text style={styles.userName}>{user.name}</Text>
  
  <TouchableOpacity onPress={() => Linking.openURL(`mailto:${user.email}`)}>
    <Text style={[styles.userEmail, { color: '#2196F3' }]}>{user.email}</Text>
  </TouchableOpacity>
</View>
                  <View style={styles.userActions}>
                    <TouchableOpacity onPress={() => handleEditUser(user)} style={styles.actionButton}>
                      <Icon name="pencil" size={18} color="#7C5FED" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteUser(user._id)} style={styles.actionButton}>
                      <Icon name="trash" size={18} color="#F44336" />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.userCardDetails}>
                  <View style={styles.userDetail}>
  <Icon name="call" size={14} color="#999" />
  <TouchableOpacity onPress={() => Linking.openURL(`tel:${user.phone}`)}>
    <Text style={[styles.userDetailText, { color: '#2196F3' }]}>{user.phone}</Text>
  </TouchableOpacity>
</View>
                  <View style={styles.userDetail}>
                    <View style={[styles.statusBadge, { backgroundColor: user.status === 'Active' ? '#C8E6C9' : '#FFCCBC' }]}>
                      <Text style={[styles.statusBadgeText, { color: user.status === 'Active' ? '#2E7D32' : '#E65100' }]}>{user.status}</Text>
                    </View>
                  </View>
                  <Text style={styles.joinDate}>Joined {new Date(user.createdAt).toLocaleDateString()}</Text>
                </View>
              </View>
            )) : (
              <View style={styles.emptyState}>
                <Icon name="search" size={48} color="#DDD" />
                <Text style={styles.emptyStateText}>No customers found</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* Add/Edit Modal */}
      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedUser ? 'Edit Customer' : 'Add New Customer'}</Text>
              <TouchableOpacity onPress={() => { setModalVisible(false); setSelectedUser(null); }}>
                <Icon name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalForm} showsVerticalScrollIndicator={false}>
              <Text style={styles.inputLabel}>Full Name *</Text>
              <TextInput style={styles.input} placeholder="Enter full name" value={formData.name} onChangeText={text => setFormData({...formData, name: text})} placeholderTextColor="#999" />

              <Text style={styles.inputLabel}>Email *</Text>
              <TextInput style={styles.input} placeholder="Enter email" value={formData.email} onChangeText={text => setFormData({...formData, email: text})} keyboardType="email-address" placeholderTextColor="#999" />

              <Text style={styles.inputLabel}>Phone *</Text>
              <TextInput style={styles.input} placeholder="Enter phone number" value={formData.phone} onChangeText={text => setFormData({...formData, phone: text})} keyboardType="phone-pad" placeholderTextColor="#999" />
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => { setModalVisible(false); setSelectedUser(null); }}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton} onPress={handleAddUser}>
                <Icon name="checkmark" size={18} color="#fff" />
                <Text style={styles.submitButtonText}>{selectedUser ? 'Update' : 'Add'} Customer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // (Keep your existing styles as-is, no changes needed)
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#333' },
  headerSubtitle: { fontSize: 12, color: '#999', marginTop: 2 },
  addUserButton: { flexDirection: 'row', backgroundColor: '#7C5FED', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6, alignItems: 'center', gap: 4 },
  addUserButtonText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  scrollContent: { paddingHorizontal: 16, paddingVertical: 16, paddingBottom: 30 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  statCard: { width: '48%', backgroundColor: '#fff', borderRadius: 10, padding: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 2, elevation: 1 },
  statCardContent: { flex: 1 },
  statCardLabel: { fontSize: 11, color: '#999', fontWeight: '500', marginBottom: 4 },
  statCardValue: { fontSize: 18, fontWeight: '700', color: '#333' },
  statCardIcon: { width: 40, height: 40, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  searchSection: { marginBottom: 16 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, gap: 8 },
  searchInput: { flex: 1, fontSize: 14, color: '#333' },
  tabsContainer: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 8, gap: 4, marginBottom: 16, padding: 4 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 6 },
  activeTab: { backgroundColor: '#7C5FED' },
  tabText: { fontSize: 12, fontWeight: '600', color: '#999' },
  activeTabText: { color: '#fff' },
  usersSection: { gap: 12 },
  userCard: { backgroundColor: '#fff', borderRadius: 10, padding: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 2, elevation: 1 },
  userCardHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  userAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#E8D4F8', justifyContent: 'center', alignItems: 'center' },
  userAvatarText: { fontSize: 24 },
  userInfo: { flex: 1 },
  userName: { fontSize: 14, fontWeight: '700', color: '#333' },
  userEmail: { fontSize: 11, color: '#999', marginTop: 2 },
  userActions: { flexDirection: 'row', gap: 8 },
  actionButton: { width: 32, height: 32, borderRadius: 6, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' },
  userCardDetails: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  userDetail: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  userDetailText: { fontSize: 11, color: '#666' },
  statusBadge: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 4 },
  statusBadgeText: { fontSize: 10, fontWeight: '600' },
  joinDate: { fontSize: 10, color: '#999', marginTop: 4 },
  emptyState: { alignItems: 'center', paddingVertical: 40 },
  emptyStateText: { fontSize: 14, fontWeight: '600', color: '#999', marginTop: 12 },
  emptyStateSubtext: { fontSize: 12, color: '#BBB', marginTop: 4 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingTop: 16, maxHeight: '90%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  modalTitle: { fontSize: 16, fontWeight: '700', color: '#333' },
  modalForm: { paddingHorizontal: 16, paddingVertical: 16 },
  inputLabel: { fontSize: 12, fontWeight: '600', color: '#333', marginBottom: 6 },
  input: { backgroundColor: '#f5f5f5', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, color: '#333', marginBottom: 14 },
  roleSelector: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  roleOption: { flex: 1, paddingVertical: 10, borderRadius: 8, backgroundColor: '#f5f5f5', alignItems: 'center' },
  roleOptionSelected: { backgroundColor: '#7C5FED' },
  roleOptionText: { fontSize: 11, fontWeight: '600', color: '#666' },
  roleOptionTextSelected: { color: '#fff' },
  modalFooter: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  cancelButton: { flex: 1, paddingVertical: 10, borderRadius: 8, borderWidth: 1, borderColor: '#DDD', alignItems: 'center' },
  cancelButtonText: { fontSize: 13, fontWeight: '600', color: '#666' },
  submitButton: { flex: 1, backgroundColor: '#7C5FED', paddingVertical: 10, borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4 },
  submitButtonText: { fontSize: 13, fontWeight: '600', color: '#fff' },
});
