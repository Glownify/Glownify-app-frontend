import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, ActivityIndicator, Platform, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCart, updateCartItem, removeFromCart } from '../../utils/cartStorage'; // Added removeFromCart
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { createBooking } from '../../redux/slices/bookingSlice';
import { clearCart } from '../../utils/cartStorage'; // Import clearCart utility

// Component for individual Cart Items
const CartItem = ({ providerId, providerName, services, navigation, selectedDate, selectedTime, onRemove }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Text style={styles.salonName}>{providerName}</Text>
      <TouchableOpacity onPress={() => onRemove(providerId)}>
        <Text style={styles.removeText}>Remove</Text>
      </TouchableOpacity>
    </View>

    {services.map((service, index) => (
      <View key={index} style={styles.serviceRow}>
        <Text style={styles.serviceName}>{service.name}</Text>
        <Text style={styles.servicePrice}>₹ {service.price}</Text>
      </View>
    ))}

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
        <MaterialCommunityIcons name="calendar-month-outline" size={18} color="#8A56AC" />
        <Text style={styles.dateButtonText}>Select Date & Time</Text>
      </TouchableOpacity>
    )}
  </View>
);

export default function CartScreen({ route }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [cart, setCart] = useState([]);
  const {loading, error} = useSelector(state => state.booking);

  const userId = user?._id || 'guest';

  // Load cart on mount
 useFocusEffect(
    useCallback(() => {
    loadCartData();
  }, [user])
);

  const loadCartData = async () => {
    const data = await getCart(userId);
    setCart(data || []);
  };

  // Listen for navigation params (returned from Date/Time selection)
  useEffect(() => {
    if (route.params?.providerId && route.params?.selectedDate) {
      const { providerId, selectedDate, selectedTime } = route.params;
      
      const updateCart = async () => {
        const updatedCart = await updateCartItem(userId, providerId, {
          selectedDate,
          selectedTime
        });
        setCart(updatedCart);
      };

      updateCart();
    }
  }, [route.params]);

  // Remove item handler
  const handleRemoveItem = async (providerId) => {
    const updatedCart = await removeFromCart(userId, providerId);
    setCart(updatedCart || []);
  };

  const handleCreateBooking = () => {
    const payload = {
      bookings: cart.map(item => ({
        providerId: item.providerId,
        services: item.services.map(s => s._id),
        bookingDate: item.selectedDate,
        timeSlot: { start: item.selectedTime, end: item.selectedTime },
        bookingType: "in_salon",
        serviceLocation: item.serviceLocation || null,
      })),
    };
    dispatch(createBooking(payload))
  .unwrap()
  .then(async () => {
    await clearCart(userId);   // ✅ storage
    setCart([]);               // ✅ UI
    navigation.navigate("HomeTab", { screen: "Bookings" }); // optional
  });
  };

  // Logic for UI states
  const isCartEmpty = cart.length === 0;
    const canBook = !isCartEmpty && cart.every(item => item.selectedDate);

  return (
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

        {/* Content Area */}
        <View style={styles.contentArea}>
          {isCartEmpty ? (
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons name="cart-off" size={80} color="#DDD" />
              <Text style={styles.emptyTitle}>Your cart is empty</Text>
              <Text style={styles.emptySub}>Looks like you haven't added any services yet.</Text>
              <TouchableOpacity 
                style={styles.browseButton} 
                onPress={() => navigation.navigate('HomeTab', { screen: 'HomeMain' })}
              >
                <Text style={styles.browseButtonText}>Browse Salons</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ScrollView contentContainerStyle={styles.scrollContent}>
              {cart.map((item, index) => (
                <CartItem
                  key={index}
                  providerId={item.providerId}
                  providerName={item.providerName}
                  services={item.services}
                  selectedDate={item.selectedDate}
                  selectedTime={item.selectedTime}
                  navigation={navigation}
                  onRemove={handleRemoveItem}
                />
              ))}
            </ScrollView>
          )}

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            {loading ? (
              <TouchableOpacity style={[styles.payButton, { opacity: 0.7 }]} disabled={true}>
                <ActivityIndicator size="small" color="#FFF" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.payButton, canBook ? {} : { backgroundColor: '#CCC' }]}
                onPress={handleCreateBooking}
                disabled={!canBook || loading}
              >
              <Text style={styles.payButtonText}>Book Now</Text>
            </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentArea: { flex: 1, backgroundColor: '#F8F8F8' },
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  salonName: { fontWeight: 'bold', fontSize: 15, color: '#333' },
  removeText: { color: '#FF5A5A', fontSize: 12, fontWeight: 'bold' },
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
  
  // Empty State Styles
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginTop: 20 },
  emptySub: { fontSize: 14, color: '#888', textAlign: 'center', marginTop: 10, marginBottom: 30 },
  browseButton: { backgroundColor: '#156778', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 25 },
  browseButtonText: { color: '#fff', fontWeight: 'bold' },

  footer: {
    flexDirection: 'row',
    padding: 15,
    paddingBottom: Platform.OS === 'ios' ? 30 : 15,
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