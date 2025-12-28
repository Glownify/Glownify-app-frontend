import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { getCart } from '../../utils/cartStorage';
import { SafeAreaView } from 'react-native-safe-area-context';

const CartItem = ({ studioName, services }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Text style={styles.studioName}>{studioName}</Text>
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

    <TouchableOpacity style={styles.dateButton}>
      <MaterialCommunityIcons name="calendar-month-outline" size={18} color="#8A56AC" />
      <Text style={styles.dateButtonText}>Select Date & Time</Text>
    </TouchableOpacity>
  </View>
);

export default function CartScreen() {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const data = await getCart();
      setCart(data);
    };
    loadCart();
  }, []);

  console.log('Cart Data:', cart);

  const cartData = [
    {
      studioName: "Glamour Beauty Studio",
      services: [
        { name: "Haircut & Styling", price: 299 },
        { name: "Hair Color (Full)", price: 299 },
        { name: "Gold Facial", price: 499 },
      ]
    },
    {
      studioName: "Elegance Spa & Salon",
      services: [
        { name: "Haircut & Styling", price: 299 },
        { name: "Hair Color (Full)", price: 299 },
        { name: "Gold Facial", price: 499 },
      ]
    },
    {
      studioName: "Radiance Beauty Bar",
      services: [
        { name: "Haircut & Styling", price: 299 },
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity><MaterialCommunityIcons name="chevron-left" size={30} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Your Cart</Text>
        <View style={{ width: 30 }} /> 
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Toggle Section */}
        <View style={styles.toggleCard}>
          <View>
            <Text style={styles.toggleTitle}>Use Same Date & Time</Text>
            <Text style={styles.toggleSub}>For all services</Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#8A56AC" }}
            thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>

        {/* List of Studios */}
        {cartData.map((item, index) => (
          <CartItem key={index} studioName={item.studioName} services={item.services} />
        ))}
      </ScrollView>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.payButton}>
          <Text style={styles.payButtonText}>Proceed to payment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff'
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
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
    backgroundColor: '#F9EFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  studioName: { fontWeight: 'bold', fontSize: 15, color: '#333' },
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
    paddingVertical: 8,
  },
  dateButtonText: { color: '#8A56AC', marginLeft: 8, fontWeight: '500' },
  footer: {
    flexDirection: 'row',
    padding: 15,
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