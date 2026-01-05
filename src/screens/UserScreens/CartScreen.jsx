import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, StatusBar, Platform } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCart, updateCartItem } from '../../utils/cartStorage';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { createBooking } from '../../redux/slices/bookingSlice';

// Added navigation prop to sub-component
const CartItem = ({ providerId, providerName, services, navigation, selectedDate, selectedTime }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Text style={styles.salonName}>{providerName}</Text>
      <TouchableOpacity>
        <Text style={styles.removeText}>Remove</Text>
      </TouchableOpacity>
    </View>

    {services.map((service, index) => (
      <View key={index} style={styles.serviceRow}>
        <Text style={styles.serviceName}>{service.name}</Text>
        <Text style={styles.servicePrice}>₹ {service.price}</Text>
      </View>
    ))}

    {/* 3. Conditional UI: Show Selection OR the Button */}
    {selectedDate ? (
      <TouchableOpacity
        onPress={() => navigation.navigate('SelectDateAndTime', { providerId })}
        style={[styles.dateButton, { backgroundColor: '#F9EFFF', borderColor: '#8A56AC' }]}
      >
        <MaterialCommunityIcons name="calendar-check" size={18} color="#8A56AC" />
        <View style={{ marginLeft: 8 }}>
          <Text style={{ color: '#8A56AC', fontWeight: 'bold', fontSize: 13 }}>
            Scheduled for: {selectedDate}
          </Text>
          <Text style={{ color: '#8A56AC', fontSize: 12 }}>
            Time Slot: {selectedTime}
          </Text>
        </View>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => navigation.navigate('SelectDateAndTime', { providerId })}
      >
        <MaterialCommunityIcons name="calendar-month-outline" size={18} color="#8                                                                                                                                                                                                                                                                                                                                                                 A56AC" />
        <Text style={styles.dateButtonText}>Select Date & Time</Text>
      </TouchableOpacity>
    )}
  </View>
);

export default function CartScreen({ route }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [isEnabled, setIsEnabled] = useState(true);
  const [cart, setCart] = useState([]);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  // 1. Listen for data coming back from SelectDateAndTime
  useEffect(() => {
    if (route.params?.providerId && route.params?.selectedDate) {
      const { providerId, selectedDate, selectedTime } = route.params;
      const userId = user?._id || 'guest';

      const updateCart = async () => {
        // 1. Update AsyncStorage
        const updatedCart = await updateCartItem(userId, providerId, {
          selectedDate,
          selectedTime
        });

        // 2. Update Local State so UI refreshes
        setCart(updatedCart);
      };

      updateCart();
    }
  }, [route.params]);

  useEffect(() => {
    const userId = user?._id || 'guest';
    const loadCart = async () => {
      const data = await getCart(userId);
      setCart(data || []);
    };
    loadCart();
  }, [user]);
  console.log("Cart Data:", cart);

  // 4. Booking Payload
  const payload = {
    bookings: cart.map(item => ({
      providerId: item.providerId,
      services: item.services.map(s => s._id),
      bookingDate: item.selectedDate, // "2025-01-01"
      timeSlot: { start: item.selectedTime, end: item.selectedTime }, // "1:00 PM"
      bookingType: "in_salon", // or "home_service"
      serviceLocation: item.serviceLocation || null,
    })),
  };

  const handleCreateBooking = () => {
    dispatch(createBooking(payload));
  }

  return (
    // Parent View background matches StatusBar/Header color
    <View style={{ flex: 1, backgroundColor: '#156778' }}>
      <StatusBar barStyle="light-content" backgroundColor="#156778" />

      <SafeAreaView edges={['top']} style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="chevron-left" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Your Cart</Text>
          <View style={{ width: 30 }} />
        </View>

        {/* Gray Background for content area */}
        <View style={styles.contentArea}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* List of Salons */}
            {cart.map((item, index) => (
              <CartItem
                key={index}
                providerId={item.providerId}
                providerName={item.providerName}
                services={item.services}
                selectedDate={item.selectedDate}
                selectedTime={item.selectedTime}
                navigation={navigation}
              />
            ))}
          </ScrollView>

          {/* Footer Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.payButton, { opacity: cart.every(i => i.selectedDate) ? 1 : 0.6 }]}
              disabled={!cart.every(i => i.selectedDate)}
              onPress={handleCreateBooking}
            >
              <Text style={styles.payButtonText}>Book</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentArea: { flex: 1, backgroundColor: '#F8F8F8' }, // This ensures the body is gray but header remains teal
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#156778'
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  scrollContent: { padding: 15 },
  toggleCard: {
    backgroundColor: '#F9EFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  toggleTitle: { fontWeight: 'bold', fontSize: 16, color: '#444' },
  toggleSub: { color: '#888', fontSize: 12 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    // Add light shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  salonName: { fontWeight: 'bold', fontSize: 15, color: '#333' },
  removeText: { color: '#FF5A5A', fontSize: 12 },
  serviceRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
  serviceName: { color: '#666', fontSize: 14 },
  servicePrice: { fontWeight: '600', color: '#8A56AC' },
  dateButton: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#8A56AC',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  dateButtonText: { color: '#8A56AC', marginLeft: 8, fontWeight: '500' },
  footer: {
    flexDirection: 'row',
    padding: 15,
    paddingBottom: Platform.OS === 'ios' ? 30 : 15, // Extra padding for iOS bottom bar
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: '#eee'
  },
  backButton: { backgroundColor: '#F0F0F0', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 8 },
  backButtonText: { color: '#666', fontWeight: 'bold' },
  payButton: { backgroundColor: '#8A56AC', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 8, flex: 1, marginLeft: 15, alignItems: 'center' },
  payButtonText: { color: '#fff', fontWeight: 'bold' },
});