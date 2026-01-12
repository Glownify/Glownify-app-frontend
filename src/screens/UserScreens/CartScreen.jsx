import React, { useState, useCallback, useEffect } from 'react';
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
  removeServiceFromCart,
  clearCart,
} from '../../utils/cartStorage';
import { hideCartPopup, setCart, setCartScreenFocused } from '../../redux/slices/cartSlice';
import { createBooking } from '../../redux/slices/bookingSlice';

// ... CartItem component remains largely the same, just minor style tweaks if needed ...
const CartItem = ({ item, onRemove, onRemoveService, navigation }) => {
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

    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={styles.servicePrice}>₹{s.price}</Text>
      <TouchableOpacity
        onPress={() =>
          onRemoveService(item.providerId, s._id, s.selectedMode)
        }
      >
        <Icon name="close-circle" size={18} color="#f44336" />
      </TouchableOpacity>
    </View>
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

    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={styles.servicePrice}>₹{s.price}</Text>
      <TouchableOpacity
        onPress={() =>
          onRemoveService(item.providerId, s._id, s.selectedMode)
        }
      >
        <Icon name="close-circle" size={18} color="#f44336" />
      </TouchableOpacity>
    </View>
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

  const [localCart, setLocalCart] = useState([]);
  const { loading } = useSelector(state => state.booking);


  // useFocusEffect(
  //   useCallback(() => {
  //     dispatch(hideCartPopup());
  //     loadCart();
  //   }, [])
  // );

  // Inside CartScreen component
useFocusEffect(
  useCallback(() => {
    // 1. Tell Redux we are on the Cart Screen (Hide Popup)
    dispatch(setCartScreenFocused(true));
    dispatch(hideCartPopup());
    
    loadCart();

    return () => {
      // 2. Tell Redux we left the Cart Screen (Allow Popup again)
      dispatch(setCartScreenFocused(false));
    };
  }, [dispatch])
);

  const loadCart = async () => {
    const data = await getCart(userId);
    setLocalCart(data);
    dispatch(setCart(data));
  };

  const isBookingDisabled = localCart.some(
  item => !item.selectedDate || !item.selectedTime
);


  const handleRemove = async (providerId) => {
    const updated = await removeFromCart(userId, providerId);
    setLocalCart(updated);
    dispatch(setCart(updated));
  };

  const handleRemoveService = async (providerId, serviceId, selectedMode) => {
  const updated = await removeServiceFromCart(
    userId,
    providerId,
    serviceId,
    selectedMode
  );

  setLocalCart(updated);
  dispatch(setCart(updated));
};

// Place this inside your CartScreen component function
const calculateTotals = () => {
  let subtotal = 0;
  let totalHomeFees = 0;
  const HOME_FEE_PER_SALON = 149;

  localCart.forEach(salonGroup => {
    // 1. Calculate price for all services in this salon group
    const salonServicesTotal = salonGroup.services.reduce(
      (sum, s) => sum + (Number(s.price) || 0), 
      0
    );
    subtotal += salonServicesTotal;

    // 2. Check if this specific salon has ANY home services
    const hasHomeService = salonGroup.services.some(s => s.selectedMode === 'home');
    
    // 3. If yes, add the fee once for this salon
    if (hasHomeService) {
      totalHomeFees += HOME_FEE_PER_SALON;
    }
  });

  return {
    subtotal,
    totalHomeFees,
    finalTotal: subtotal + totalHomeFees,
  };
};

const totals = calculateTotals();

  const handleBooking = () => {
    const payload = {
      bookings: localCart.map(item => ({
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
        setLocalCart([]);
        dispatch(setCart([]));
        dispatch(hideCartPopup());
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
          {localCart.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Icon name="cart-outline" size={60} color="#ccc" />
              <Text style={styles.emptyText}>Your cart is empty</Text>
            </View>
          ) : (
            localCart.map(item => (
              <CartItem
                key={item.providerId}
                item={item}
                onRemove={handleRemove}
                onRemoveService={handleRemoveService}
                navigation={navigation}
              />
            ))
          )}
        </ScrollView>

        {localCart.length > 0 && (
  <View style={styles.footerAction}>
    <View style={styles.priceContainer}>
      <View style={styles.priceRow}>
        <Text style={styles.priceLabel}>Items Subtotal</Text>
        <Text style={styles.priceValue}>₹{totals.subtotal}</Text>
      </View>

      {totals.totalHomeFees > 0 && (
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Home Visit Fees (Per Salon)</Text>
          <Text style={styles.priceValue}>₹{totals.totalHomeFees}</Text>
        </View>
      )}

      <View style={[styles.priceRow, styles.totalDivider]}>
        <Text style={styles.totalLabel}>Total Amount</Text>
        <Text style={styles.totalValue}>₹{totals.finalTotal}</Text>
      </View>
    </View>

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
        <Text style={styles.bookText}>
          Proceed to Book • ₹{totals.finalTotal}
        </Text>
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
  priceContainer: {
    marginBottom: 15,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  priceValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  totalDivider: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 10,
    paddingTop: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#156778',
  },
});