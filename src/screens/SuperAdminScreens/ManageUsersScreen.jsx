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
  FlatList,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const USERS_DATA = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    email: 'rajesh@salon.com',
    phone: '9876543210',
    role: 'Sales Person',
    status: 'Active',
    joinDate: '2025-01-15',
    avatar: '👨',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    email: 'priya@salon.com',
    phone: '9123456789',
    role: 'Sales Person',
    status: 'Active',
    joinDate: '2025-01-20',
    avatar: '👩',
  },
  {
    id: 3,
    name: 'Amit Patel',
    email: 'amit@salon.com',
    phone: '8765432109',
    role: 'Sales Person',
    status: 'Inactive',
    joinDate: '2025-01-10',
    avatar: '👨',
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    email: 'sneha@salon.com',
    phone: '9654321087',
    role: 'Salon Owner',
    status: 'Active',
    joinDate: '2025-02-01',
    avatar: '👩',
  },
];

const USER_ROLES = ['Sales Person', 'Salon Owner', 'Admin'];

export default function ManageUsersScreen() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Sales Person',
  });

  // Filter users based on tab and search
  const getFilteredUsers = () => {
    let filtered = USERS_DATA;

    if (activeTab === 'active') {
      filtered = filtered.filter((u) => u.status === 'Active');
    } else if (activeTab === 'inactive') {
      filtered = filtered.filter((u) => u.status === 'Inactive');
    }

    if (searchText) {
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(searchText.toLowerCase()) ||
          u.email.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return filtered;
  };

  const handleAddUser = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    Alert.alert('Success', `User ${formData.name} added successfully!`);
    setFormData({ name: '', email: '', phone: '', role: 'Sales Person' });
    setModalVisible(false);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });
    setModalVisible(true);
  };

  const handleDeleteUser = (userId) => {
    Alert.alert(
      'Delete User',
      'Are you sure you want to delete this user?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Success', 'User deleted successfully');
          },
        },
      ]
    );
  };

  const filteredUsers = getFilteredUsers();
  const statsData = {
    total: USERS_DATA.length,
    active: USERS_DATA.filter((u) => u.status === 'Active').length,
    inactive: USERS_DATA.filter((u) => u.status === 'Inactive').length,
    salesPersons: USERS_DATA.filter((u) => u.role === 'Sales Person').length,
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Manage Users</Text>
          <Text style={styles.headerSubtitle}>Control user accounts & permissions</Text>
        </View>
        <TouchableOpacity style={styles.addUserButton} onPress={() => setModalVisible(true)}>
          <Icon name="add" size={20} color="#fff" />
          <Text style={styles.addUserButtonText}>Add User</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={styles.statCardContent}>
              <Text style={styles.statCardLabel}>Total Users</Text>
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
              <Text style={styles.statCardLabel}>Inactive</Text>
              <Text style={styles.statCardValue}>{statsData.inactive}</Text>
            </View>
            <View style={[styles.statCardIcon, { backgroundColor: '#F4433620' }]}>
              <Icon name="alert-circle" size={24} color="#F44336" />
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statCardContent}>
              <Text style={styles.statCardLabel}>Sales Persons</Text>
              <Text style={styles.statCardValue}>{statsData.salesPersons}</Text>
            </View>
            <View style={[styles.statCardIcon, { backgroundColor: '#2196F320' }]}>
              <Icon name="trending-up" size={24} color="#2196F3" />
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Icon name="search" size={20} color="#999" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search users by name or email"
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
              All Users
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
            style={[styles.tab, activeTab === 'inactive' && styles.activeTab]}
            onPress={() => setActiveTab('inactive')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'inactive' && styles.activeTabText,
              ]}
            >
              Inactive
            </Text>
          </TouchableOpacity>
        </View>

        {/* Users List */}
        <View style={styles.usersSection}>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <View key={user.id} style={styles.userCard}>
                <View style={styles.userCardHeader}>
                  <View style={styles.userAvatar}>
                    <Text style={styles.userAvatarText}>{user.avatar}</Text>
                  </View>
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userEmail}>{user.email}</Text>
                  </View>
                  <View style={styles.userActions}>
                    <TouchableOpacity
                      onPress={() => handleEditUser(user)}
                      style={styles.actionButton}
                    >
                      <Icon name="pencil" size={18} color="#7C5FED" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDeleteUser(user.id)}
                      style={styles.actionButton}
                    >
                      <Icon name="trash" size={18} color="#F44336" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.userCardDetails}>
                  <View style={styles.userDetail}>
                    <Icon name="call" size={14} color="#999" />
                    <Text style={styles.userDetailText}>{user.phone}</Text>
                  </View>
                  <View style={styles.userDetail}>
                    <Icon name="briefcase" size={14} color="#999" />
                    <Text style={styles.userDetailText}>{user.role}</Text>
                  </View>
                  <View style={styles.userDetail}>
                    <View
                      style={[
                        styles.statusBadge,
                        {
                          backgroundColor:
                            user.status === 'Active' ? '#C8E6C9' : '#FFCCBC',
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusBadgeText,
                          {
                            color:
                              user.status === 'Active' ? '#2E7D32' : '#E65100',
                          },
                        ]}
                      >
                        {user.status}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.joinDate}>Joined {user.joinDate}</Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Icon name="search" size={48} color="#DDD" />
              <Text style={styles.emptyStateText}>No users found</Text>
              <Text style={styles.emptyStateSubtext}>Try adjusting your filters</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Add/Edit User Modal */}
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
                {selectedUser ? 'Edit User' : 'Add New User'}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  setSelectedUser(null);
                }}
              >
                <Icon name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalForm} showsVerticalScrollIndicator={false}>
              <Text style={styles.inputLabel}>Full Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter full name"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                placeholderTextColor="#999"
              />

              <Text style={styles.inputLabel}>Email *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter email"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                keyboardType="email-address"
                placeholderTextColor="#999"
              />

              <Text style={styles.inputLabel}>Phone *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter phone number"
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                keyboardType="phone-pad"
                placeholderTextColor="#999"
              />

              <Text style={styles.inputLabel}>Role *</Text>
              <View style={styles.roleSelector}>
                {USER_ROLES.map((role) => (
                  <TouchableOpacity
                    key={role}
                    style={[
                      styles.roleOption,
                      formData.role === role && styles.roleOptionSelected,
                    ]}
                    onPress={() => setFormData({ ...formData, role })}
                  >
                    <Text
                      style={[
                        styles.roleOptionText,
                        formData.role === role && styles.roleOptionTextSelected,
                      ]}
                    >
                      {role}
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
                  setSelectedUser(null);
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton} onPress={handleAddUser}>
                <Icon name="checkmark" size={18} color="#fff" />
                <Text style={styles.submitButtonText}>
                  {selectedUser ? 'Update' : 'Add'} User
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
  addUserButton: {
    flexDirection: 'row',
    backgroundColor: '#7C5FED',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
    gap: 4,
  },
  addUserButtonText: {
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
    backgroundColor: '#7C5FED',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
  },
  activeTabText: {
    color: '#fff',
  },
  usersSection: {
    gap: 12,
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  userCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  userAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E8D4F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatarText: {
    fontSize: 24,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },
  userEmail: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  userActions: {
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
  userCardDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  userDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  userDetailText: {
    fontSize: 11,
    color: '#666',
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
  joinDate: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
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
  roleSelector: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  roleOption: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  roleOptionSelected: {
    backgroundColor: '#7C5FED',
  },
  roleOptionText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666',
  },
  roleOptionTextSelected: {
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
    backgroundColor: '#7C5FED',
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