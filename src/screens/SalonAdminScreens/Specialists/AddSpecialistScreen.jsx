import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

// Mock Specialists Data
const MOCK_SPECIALISTS = [
  {
    id: 1,
    name: 'Raj Kumar',
    expertise: 'Hair Cut',
    experience: 5,
    image: 'https://via.placeholder.com/80?text=Raj',
    certifications: ['Diploma in Hair Styling', 'Advanced Hair Coloring'],
    availability: [
      { day: 'Monday', start: '09:00 AM', end: '09:00 PM' },
      { day: 'Tuesday', start: '09:00 AM', end: '09:00 PM' },
      { day: 'Wednesday', start: '09:00 AM', end: '09:00 PM' },
      { day: 'Thursday', start: '09:00 AM', end: '09:00 PM' },
      { day: 'Friday', start: '09:00 AM', end: '09:00 PM' },
      { day: 'Saturday', start: '10:00 AM', end: '08:00 PM' },
    ],
  },
  {
    id: 2,
    name: 'Neha Singh',
    expertise: 'Hair Spa',
    experience: 3,
    image: 'https://via.placeholder.com/80?text=Neha',
    certifications: ['Certificate in Spa Therapy', 'Hair Treatment Specialist'],
    availability: [
      { day: 'Monday', start: '10:00 AM', end: '08:00 PM' },
      { day: 'Tuesday', start: '10:00 AM', end: '08:00 PM' },
      { day: 'Wednesday', start: '10:00 AM', end: '08:00 PM' },
      { day: 'Thursday', start: '10:00 AM', end: '08:00 PM' },
      { day: 'Friday', start: '10:00 AM', end: '08:00 PM' },
      { day: 'Saturday', start: '11:00 AM', end: '07:00 PM' },
      { day: 'Sunday', start: '11:00 AM', end: '06:00 PM' },
    ],
  },
  {
    id: 3,
    name: 'Arjun Reddy',
    expertise: 'Beard Trim',
    experience: 7,
    image: 'https://via.placeholder.com/80?text=Arjun',
    certifications: ['Master Barber', 'Beard Care Specialist'],
    availability: [
      { day: 'Monday', start: '09:00 AM', end: '09:00 PM' },
      { day: 'Tuesday', start: '09:00 AM', end: '09:00 PM' },
      { day: 'Wednesday', start: '09:00 AM', end: '09:00 PM' },
      { day: 'Thursday', start: '09:00 AM', end: '09:00 PM' },
      { day: 'Friday', start: '09:00 AM', end: '09:00 PM' },
      { day: 'Saturday', start: '10:00 AM', end: '08:00 PM' },
    ],
  },
];

export default function AddSpecialistScreen() {
  const [specialists, setSpecialists] = useState(MOCK_SPECIALISTS);
  const [expandedId, setExpandedId] = useState(null);

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Specialist',
      'Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setSpecialists(specialists.filter((s) => s.id !== id));
            Alert.alert('Success', 'Specialist removed');
          },
        },
      ]
    );
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const renderAvailabilityDay = (day) => (
    <View key={day.day} style={styles.availabilityItem}>
      <Text style={styles.dayText}>{day.day}</Text>
      <Text style={styles.timeText}>
        {day.start} - {day.end}
      </Text>
    </View>
  );

  const renderSpecialistCard = (specialist) => (
    <View key={specialist.id} style={styles.card}>
      {/* Header with Image and Basic Info */}
      <View style={styles.cardHeader}>
        <Image
          source={{ uri: specialist.image }}
          style={styles.specialistImage}
        />
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{specialist.name}</Text>
          <Text style={styles.expertise}>{specialist.expertise}</Text>
          <View style={styles.experienceRow}>
            <Icon name="briefcase" size={14} color="#156778" />
            <Text style={styles.experience}>{specialist.experience} years exp</Text>
          </View>
        </View>
      </View>

      {/* Certifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Certifications</Text>
        {specialist.certifications.map((cert, idx) => (
          <View key={idx} style={styles.certItem}>
            <Icon name="checkmark-circle" size={14} color="#4CAF50" />
            <Text style={styles.certText}>{cert}</Text>
          </View>
        ))}
      </View>

      {/* Availability Toggle */}
      <TouchableOpacity
        style={styles.expandButton}
        onPress={() => toggleExpand(specialist.id)}
      >
        <Text style={styles.expandButtonText}>
          {expandedId === specialist.id ? 'Hide' : 'Show'} Availability
        </Text>
        <Icon
          name={expandedId === specialist.id ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#156778"
        />
      </TouchableOpacity>

      {/* Availability (Expanded) */}
      {expandedId === specialist.id && (
        <View style={styles.availabilityContainer}>
          <Text style={styles.sectionTitle}>Weekly Schedule</Text>
          {specialist.availability.map(renderAvailabilityDay)}
        </View>
      )}

      {/* Delete Button */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(specialist.id)}
      >
        <Icon name="trash" size={16} color="#fff" />
        <Text style={styles.deleteButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Specialists</Text>
        <Text style={styles.count}>{specialists.length} Total</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {specialists.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name="person-outline" size={50} color="#ccc" />
            <Text style={styles.emptyText}>No specialists yet</Text>
          </View>
        ) : (
          specialists.map(renderSpecialistCard)
        )}
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
    backgroundColor: '#156778',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  count: {
    fontSize: 12,
    color: '#ddd',
    marginTop: 4,
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  specialistImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e0e0e0',
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  expertise: {
    fontSize: 13,
    color: '#156778',
    fontWeight: '600',
    marginTop: 2,
  },
  experienceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  experience: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  section: {
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  certItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  certText: {
    fontSize: 12,
    color: '#555',
    marginLeft: 8,
  },
  expandButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginVertical: 12,
  },
  expandButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#156778',
  },
  availabilityContainer: {
    marginVertical: 12,
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
  },
  availabilityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dayText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  timeText: {
    fontSize: 12,
    color: '#666',
  },
  deleteButton: {
    flexDirection: 'row',
    backgroundColor: '#f44336',
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
  },
  deleteButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 10,
  },
});