import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ServiceCard({ service }) {
  return (
    <View style={styles.container}>
      <Image source={service.image} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={2}>{service.name}</Text>
          {service.discount && (
            <View style={styles.discountBadge}>
              <Icon name="pricetag" size={12} color="#F59E0B" />
              <Text style={styles.discountText}>{service.discount}</Text>
            </View>
          )}
        </View>

        <Text style={styles.price}>${service.price}</Text>
        <Text style={styles.duration}>{service.duration}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {service.description}
        </Text>
      </View>

      <TouchableOpacity style={styles.addButton}>
        <Icon name="add-circle" size={32} color="#156778" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  discountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  discountText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#F59E0B',
    marginLeft: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#156778',
    marginTop: 4,
  },
  duration: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  description: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});