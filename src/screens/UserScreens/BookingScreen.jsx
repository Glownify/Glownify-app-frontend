import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

// Mock Bookings Data
const MOCK_BOOKINGS = [
  {
    id: 1,
    salonName: 'Modern Cuts',
    services: 'Haircut + Beard Trim',
    date: 'Sunday, October 12, 2025',
    time: '2:00 PM',
    location: '123 Main Street',
    price: 350,
    status: 'confirmed',
    type: 'upcoming',
  },
  {
    id: 2,
    salonName: 'Modern Cuts',
    services: 'Haircut + Beard Trim',
    date: 'Sunday, October 12, 2025',
    time: '2:00 PM',
    location: '123 Main Street',
    price: 350,
    status: 'pending',
    type: 'upcoming',
  },
  {
    id: 3,
    salonName: 'Vaishali Salon & Spa',
    services: 'Hair Spa',
    date: 'Saturday, October 5, 2025',
    time: '11:00 AM',
    location: '456 Park Road',
    price: 500,
    status: 'completed',
    type: 'past',
  },
  {
    id: 4,
    salonName: 'Premium Beauty',
    services: 'Coloring',
    date: 'Friday, October 3, 2025',
    time: '3:00 PM',
    location: '789 Oak Avenue',
    price: 800,
    status: 'completed',
    type: 'past',
  },
];

export default function UserBookingsScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('upcoming');

  const filteredBookings = MOCK_BOOKINGS.filter(
    (booking) => booking.type === activeTab
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return '#4CAF50';
      case 'pending':
        return '#FFC107';
      case 'completed':
        return '#2196F3';
      case 'cancelled':
        return '#f44336';
      default:
        return '#999';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'confirmed':
        return '#E8F5E9';
      case 'pending':
        return '#FFF9C4';
      case 'completed':
        return '#E3F2FD';
      case 'cancelled':
        return '#FFEBEE';
      default:
        return '#f5f5f5';
    }
  };

  const handleCall = (booking) => {
    Alert.alert('Call', `Calling salon for booking ${booking.id}`);
  };

  const handleCancel = (booking) => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => Alert.alert('Cancelled', 'Booking has been cancelled'),
        },
      ]
    );
  };

  const handleViewDetails = (booking) => {
    Alert.alert(
      'View Details',
      `Booking Details:\n${booking.salonName}\n${booking.services}\n${booking.date} at ${booking.time}`
    );
  };

  const renderBookingCard = (booking) => (
    <View key={booking.id} style={styles.card}>
      {/* Header with Salon Name and Status */}
      <View style={styles.cardHeader}>
        <View style={styles.salonHeader}>
          <Text style={styles.salonName}>{booking.salonName}</Text>
          <Text style={styles.services}>{booking.services}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusBgColor(booking.status) },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              { color: getStatusColor(booking.status) },
            ]}
          >
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Text>
        </View>
      </View>

      {/* Booking Details */}
      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Icon name="calendar" size={16} color="#666" />
          <Text style={styles.detailText}>{booking.date}</Text>
        </View>

        <View style={styles.detailItem}>
          <Icon name="time" size={16} color="#666" />
          <Text style={styles.detailText}>{booking.time}</Text>
        </View>

        <View style={styles.detailItem}>
          <Icon name="location" size={16} color="#666" />
          <Text style={styles.detailText}>{booking.location}</Text>
        </View>
      </View>

      {/* Price and Action Buttons */}
      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.currencySymbol}>₹</Text>
          <Text style={styles.price}>{booking.price}</Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.callButton}
            onPress={() => handleCall(booking)}
          >
            <Icon name="call" size={16} color="#156778" />
            <Text style={styles.callButtonText}>Call</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => handleCancel(booking)}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.viewDetailsButton}
            onPress={() => handleViewDetails(booking)}
          >
            <Text style={styles.viewDetailsButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
          <StatusBar barStyle="light-content" backgroundColor="#156778" />
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack()}>
          <Icon name="chevron-back" size={24} color="#ffffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Bookings</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'upcoming' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'upcoming' && styles.activeTabText,
            ]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'past' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('past')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'past' && styles.activeTabText,
            ]}
          >
            Past
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bookings List */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filteredBookings.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name="calendar-outline" size={50} color="#ccc" />
            <Text style={styles.emptyText}>No {activeTab} bookings</Text>
          </View>
        ) : (
          filteredBookings.map(renderBookingCard)
        )}
      </ScrollView>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#156778',
  },
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
    backgroundColor: '#156778',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffffff',
  },
  backButton: {
    padding: 8,
  },
  headerPlaceholder: {
    width: 24,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#e8e8e8',
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 20,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 16,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#999',
  },
  activeTabText: {
    color: '#333',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  salonHeader: {
    flex: 1,
  },
  salonName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  services: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  details: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingVertical: 12,
    marginVertical: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  detailText: {
    fontSize: 13,
    color: '#555',
    marginLeft: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currencySymbol: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginLeft: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#156778',
    borderRadius: 6,
  },
  callButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#156778',
  },
  cancelButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
  },
  cancelButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  viewDetailsButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#156778',
    borderRadius: 6,
  },
  viewDetailsButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 10,
  },
});