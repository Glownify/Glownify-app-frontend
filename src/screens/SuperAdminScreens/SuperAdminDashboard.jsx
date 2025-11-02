import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DashboardCard = ({ icon, title, value, onPress, color }) => (
  <TouchableOpacity style={[styles.card, { backgroundColor: color || '#fff' }]} onPress={onPress}>
    <Ionicons name={icon} size={32} color="#fff" />
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardValue}>{value}</Text>
  </TouchableOpacity>
);

export default function SuperAdminDashboard({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Salon Admin Dashboard</Text>
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        <DashboardCard
          icon="people-outline"
          title="Users"
          value="120"
          color="#6C63FF"
          onPress={() => navigation.navigate('ManageUsers')}
        />
        <DashboardCard
          icon="business-outline"
          title="Vendors"
          value="120"
          color="#FF6C63"
          onPress={() => console.log('Vendors pressed')}
        />
        <DashboardCard
          icon="cut-outline"
          title="Services"
          value="25"
          color="#00BFA6"
          onPress={() => console.log('Services pressed')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    height: 120,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  cardValue: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});
