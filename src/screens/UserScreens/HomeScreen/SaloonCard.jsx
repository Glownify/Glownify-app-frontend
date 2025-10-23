import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SalonCard = ({ imageUrl, category, name, address, rating, reviews }) => (
  <View style={styles.card}>
    <TouchableOpacity style={styles.heartButton}>
      <Ionicons name="heart-outline" size={20} color="#EF4444" />
    </TouchableOpacity>
    <Image
      source={imageUrl}
      style={styles.image}
      defaultSource={require('../../../assets/featuredSaloon.png')}
    //   onError={(e) => (e.nativeEvent.target.src = 'https://placehold.co/300x200')}
    />
    <View style={styles.info}>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.name} numberOfLines={1}>{name}</Text>
      <Text style={styles.address} numberOfLines={1}>{address}</Text>
      <View style={styles.ratingRow}>
        <Ionicons name="star" size={14} color="#FACC15" />
        <Text style={styles.rating}>{rating}</Text>
        <Text style={styles.reviews}>({reviews})</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 16,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 16,
    padding: 4,
  },
  image: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  info: {
    padding: 12,
  },
  category: {
    fontSize: 10,
    color: '#156778',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginTop: 4,
  },
  address: {
    fontSize: 13,
    color: '#6B7280',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  rating: {
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 4,
    color: '#1F2937',
  },
  reviews: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 4,
  },
});

export default SalonCard;
