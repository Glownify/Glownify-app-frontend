import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons'; // Switched to Ionicons for consistency
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import {
  getCart,
  removeFromCart,
  clearCart,
} from '../../utils/cartStorage';
import { createBooking } from '../../redux/slices/bookingSlice';

// ... CartItem component remains largely the same, just minor style tweaks if needed ...
const CartItem = ({ item, onRemove, navigation }) => {
  const grouped = item.services.reduce(
    (acc, s) => {
      if (s.selectedMode === 'home') acc.home.push(s);
      else acc.salon.push(s);
      return acc;
    },
    { salon: [], home: [] }
  );

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.salonName}>{item.providerName}</Text>
        <TouchableOpacity onPress={() => onRemove(item.providerId)}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>

      {grouped.salon.length > 0 && (
        <>
          <Text style={styles.modeHeader}>✂️ At Salon</Text>
          {grouped.salon.map(s => (
            <View key={s._id} style={styles.serviceRow}>
              <Text style={styles.serviceName}>{s.name}</Text>
              <Text style={styles.servicePrice}>₹{s.price}</Text>
            </View>
          ))}
        </>
      )}

      {grouped.home.length > 0 && (
        <>
          <Text style={styles.modeHeader}>🏠 At Home</Text>
          {grouped.home.map(s => (
            <View key={s._id} style={styles.serviceRow}>
              <Text style={styles.serviceName}>{s.name}</Text>
              <Text style={styles.servicePrice}>₹{s.price}</Text>
            </View>
          ))}
        </>
      )}

      <TouchableOpacity
        style={styles.dateBtn}
        onPress={() =>
          navigation.navigate('SelectDateAndTime', {
            providerId: item.providerId,
          })
        }
      >
        <MaterialCommunityIcons name="calendar-clock" size={18} color="#156778" />
        <Text style={styles.dateBtnText}>
          {item.selectedDate
            ? `${item.selectedDate} | ${item.selectedTime}`
            : 'Select Date & Time'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default function CartScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const userId = user?._id || 'guest';

  const [cart, setCart] = useState([]);
  const { loading } = useSelector(state => state.booking);

  useFocusEffect(
    useCallback(() => {
      loadCart();
    }, [])
  );

  const loadCart = async () => {
    const data = await getCart(userId);
    setCart(data);
  };

  const isBookingDisabled = cart.some(
  item => !item.selectedDate || !item.selectedTime
);


  const handleRemove = async (providerId) => {
    const updated = await removeFromCart(userId, providerId);
    setCart(updated);
  };

  const handleBooking = () => {
    const payload = {
      bookings: cart.map(item => ({
        providerId: item.providerId,
        bookingDate: item.selectedDate,
        timeSlot: { start: item.selectedTime, end: item.selectedTime },
        services: item.services.map(s => ({
          serviceId: s._id,
          mode: s.selectedMode,
        })),
      })),
    };

    dispatch(createBooking(payload))
      .unwrap()
      .then(async () => {
        await clearCart(userId);
        setCart([]);
        navigation.navigate('HomeTab', { screen: 'Bookings' });
      });
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#156778" />
      
      {/* Matching Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {cart.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Icon name="cart-outline" size={60} color="#ccc" />
              <Text style={styles.emptyText}>Your cart is empty</Text>
            </View>
          ) : (
            cart.map(item => (
              <CartItem
                key={item.providerId}
                item={item}
                onRemove={handleRemove}
                navigation={navigation}
              />
            ))
          )}
        </ScrollView>

        {cart.length > 0 && (
          <View style={styles.footerAction}>
           <TouchableOpacity
  style={[
    styles.bookBtn,
    (loading || isBookingDisabled) && { opacity: 0.5 },
  ]}
  onPress={handleBooking}
  disabled={loading || isBookingDisabled}
>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.bookText}>Proceed to Book</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
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
    backgroundColor: '#f5f5f5', // Light grey background like bookings
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#156778',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  backButton: {
    padding: 8,
  },
  headerPlaceholder: {
    width: 40,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    // Matching shadow from bookings
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 10,
    marginBottom: 10,
  },
  salonName: { 
    fontWeight: '700', 
    fontSize: 16,
    color: '#333'
  },
  removeText: { 
    color: '#f44336', 
    fontSize: 12, 
    fontWeight: '600' 
  },
  modeHeader: {
    marginTop: 8,
    fontWeight: '700',
    color: '#156778',
    fontSize: 13,
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    paddingLeft: 20,
  },
  serviceName: { color: '#555', fontSize: 14 },
  servicePrice: { fontWeight: '600', color: '#333' },
  dateBtn: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateBtnText: { 
    marginLeft: 8, 
    color: '#156778', 
    fontWeight: '600',
    fontSize: 14
  },
  footerAction: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  bookBtn: {
    backgroundColor: '#156778',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#156778',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  bookText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 12,
  },
});