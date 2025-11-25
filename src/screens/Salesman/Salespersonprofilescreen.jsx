import { logout } from '../../redux/slices/authSlice';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const SALES_PERSON_PROFILE = {
  id: 'SP-2025-001',
  name: 'Rajesh Kumar',
  referralId: 'SP-2025-001',
  email: 'rajesh@salonstartup.com',
  phone: '9876543210',
  whatsapp: '9876543210',
  address: 'New Delhi, Delhi',
  joinDate: '2025-01-15',
  profilePhoto: '👨',
};

const PROFILE_STATS = [
  {
    id: 1,
    label: 'Total Salons',
    value: '15',
    icon: 'storefront',
    color: '#7C5FED',
  },
  {
    id: 2,
    label: 'Commissions Earned',
    value: '₹12,450',
    icon: 'cash',
    color: '#4CAF50',
  },
  {
    id: 3,
    label: 'Total Downloads',
    value: '42',
    icon: 'download',
    color: '#2196F3',
  },
];

export default function SalesPersonProfileScreen() {
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
    const navigation = useNavigation();
  const [profileData, setProfileData] = useState(SALES_PERSON_PROFILE);
  const [editFormData, setEditFormData] = useState(profileData);
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
  });

  const handleEditProfile = () => {
    if (!editFormData.name || !editFormData.email || !editFormData.phone) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    setProfileData(editFormData);
    setEditMode(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => dispatch(logout()),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        {!editMode && (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              setEditFormData(profileData);
              setEditMode(true);
            }}
          >
            <Icon name="pencil" size={18} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{profileData.profilePhoto}</Text>
          </View>

          {editMode ? (
            <View style={styles.editForm}>
              <Text style={styles.inputLabel}>Full Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter full name"
                value={editFormData.name}
                onChangeText={(text) =>
                  setEditFormData({ ...editFormData, name: text })
                }
                placeholderTextColor="#999"
              />

              <Text style={styles.inputLabel}>Email *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter email"
                value={editFormData.email}
                onChangeText={(text) =>
                  setEditFormData({ ...editFormData, email: text })
                }
                keyboardType="email-address"
                placeholderTextColor="#999"
              />

              <Text style={styles.inputLabel}>Phone *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter phone"
                value={editFormData.phone}
                onChangeText={(text) =>
                  setEditFormData({ ...editFormData, phone: text })
                }
                keyboardType="phone-pad"
                placeholderTextColor="#999"
              />

              <Text style={styles.inputLabel}>WhatsApp Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter WhatsApp number"
                value={editFormData.whatsapp}
                onChangeText={(text) =>
                  setEditFormData({ ...editFormData, whatsapp: text })
                }
                keyboardType="phone-pad"
                placeholderTextColor="#999"
              />

              <Text style={styles.inputLabel}>Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter address"
                value={editFormData.address}
                onChangeText={(text) =>
                  setEditFormData({ ...editFormData, address: text })
                }
                placeholderTextColor="#999"
              />

              <View style={styles.editButtonGroup}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setEditMode(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleEditProfile}
                >
                  <Icon name="checkmark" size={16} color="#fff" />
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{profileData.name}</Text>
              <View style={styles.referralBadge}>
                <Text style={styles.referralBadgeText}>{profileData.referralId}</Text>
              </View>

              <View style={styles.profileDetails}>
                <View style={styles.detailItem}>
                  <Icon name="mail" size={16} color="#7C5FED" />
                  <Text style={styles.detailText}>{profileData.email}</Text>
                </View>

                <View style={styles.detailItem}>
                  <Icon name="call" size={16} color="#7C5FED" />
                  <Text style={styles.detailText}>{profileData.phone}</Text>
                </View>

                <View style={styles.detailItem}>
                  <Icon name="logo-whatsapp" size={16} color="#25D366" />
                  <Text style={styles.detailText}>{profileData.whatsapp}</Text>
                </View>

                <View style={styles.detailItem}>
                  <Icon name="location" size={16} color="#7C5FED" />
                  <Text style={styles.detailText}>{profileData.address}</Text>
                </View>

                <View style={styles.detailItem}>
                  <Icon name="calendar" size={16} color="#7C5FED" />
                  <Text style={styles.detailText}>
                    Joined {new Date(profileData.joinDate).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Stats Cards */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Performance Overview</Text>
          <View style={styles.statsGrid}>
            {PROFILE_STATS.map((stat) => (
              <View key={stat.id} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                  <Icon name={stat.icon} size={24} color={stat.color} />
                </View>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={[styles.statValue, { color: stat.color }]}>
                  {stat.value}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Account Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <Icon name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.infoText}>Account is verified</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="shield" size={20} color="#4CAF50" />
              <Text style={styles.infoText}>Password secured</Text>
            </View>
          </View>
        </View>

        {/* Notification Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>

          <View style={styles.settingCard}>
            <View style={styles.settingContent}>
              <View style={styles.settingIcon}>
                <Icon name="mail" size={20} color="#2196F3" />
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Email Notifications</Text>
                <Text style={styles.settingSubtitle}>Receive email alerts</Text>
              </View>
            </View>
            <Switch
              value={notificationSettings.emailNotifications}
              onValueChange={(val) =>
                setNotificationSettings({
                  ...notificationSettings,
                  emailNotifications: val,
                })
              }
              trackColor={{ false: '#DDD', true: '#7C5FED40' }}
              thumbColor={
                notificationSettings.emailNotifications ? '#7C5FED' : '#999'
              }
            />
          </View>

          <View style={styles.settingCard}>
            <View style={styles.settingContent}>
              <View style={styles.settingIcon}>
                <Icon name="phone-portrait" size={20} color="#E91E63" />
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>SMS Notifications</Text>
                <Text style={styles.settingSubtitle}>Receive SMS updates</Text>
              </View>
            </View>
            <Switch
              value={notificationSettings.smsNotifications}
              onValueChange={(val) =>
                setNotificationSettings({
                  ...notificationSettings,
                  smsNotifications: val,
                })
              }
              trackColor={{ false: '#DDD', true: '#E91E6340' }}
              thumbColor={
                notificationSettings.smsNotifications ? '#E91E63' : '#999'
              }
            />
          </View>

          <View style={styles.settingCard}>
            <View style={styles.settingContent}>
              <View style={styles.settingIcon}>
                <Icon name="notifications" size={20} color="#FF9800" />
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Push Notifications</Text>
                <Text style={styles.settingSubtitle}>Receive push alerts</Text>
              </View>
            </View>
            <Switch
              value={notificationSettings.pushNotifications}
              onValueChange={(val) =>
                setNotificationSettings({
                  ...notificationSettings,
                  pushNotifications: val,
                })
              }
              trackColor={{ false: '#DDD', true: '#FF980040' }}
              thumbColor={
                notificationSettings.pushNotifications ? '#FF9800' : '#999'
              }
            />
          </View>
        </View>

        {/* Help & Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Help & Support</Text>

          <TouchableOpacity style={styles.optionCard}>
            <View style={styles.optionContent}>
              <View style={styles.optionIcon}>
                <Icon name="help-circle" size={20} color="#2196F3" />
              </View>
              <View>
                <Text style={styles.optionTitle}>Help Center</Text>
                <Text style={styles.optionSubtitle}>FAQs and guides</Text>
              </View>
            </View>
            <Icon name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionCard}>
            <View style={styles.optionContent}>
              <View style={styles.optionIcon}>
                <Icon name="document-text" size={20} color="#FF9800" />
              </View>
              <View>
                <Text style={styles.optionTitle}>Terms & Conditions</Text>
                <Text style={styles.optionSubtitle}>View our terms</Text>
              </View>
            </View>
            <Icon name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionCard}>
            <View style={styles.optionContent}>
              <View style={styles.optionIcon}>
                <Icon name="shield" size={20} color="#4CAF50" />
              </View>
              <View>
                <Text style={styles.optionTitle}>Privacy Policy</Text>
                <Text style={styles.optionSubtitle}>View our policy</Text>
              </View>
            </View>
            <Icon name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="log-out" size={20} color="#fff" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
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
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#7C5FED',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 30,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#7C5FED20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 40,
  },
  profileInfo: {
    alignItems: 'center',
    width: '100%',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  referralBadge: {
    backgroundColor: '#7C5FED',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 16,
  },
  referralBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  profileDetails: {
    width: '100%',
    gap: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    flex: 1,
  },
  editForm: {
    width: '100%',
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
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  editButtonGroup: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
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
  saveButton: {
    flex: 1,
    backgroundColor: '#7C5FED',
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  saveButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },
  statsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
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
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 10,
    color: '#999',
    marginBottom: 4,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  section: {
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  settingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  settingSubtitle: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  optionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  optionSubtitle: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#F44336',
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  logoutButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
});