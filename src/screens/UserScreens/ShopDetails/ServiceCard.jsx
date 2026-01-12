import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function ServiceCard({ provider, service }) {
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(0);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('ServiceDetails', { provider, service })
      }
      activeOpacity={0.8}
    >
      <Image source={service.imageURL} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={2}>
            {service.name}
          </Text>
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

      {/* <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('ServiceDetails', { provider, service })}
      >
        <Icon name="add-circle" size={32} color="#156778" />
      </TouchableOpacity> */}

      {quantity === 0 ? (
        /* ADD Button */
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setQuantity(1)}
        >
          <Text style={styles.addText}>ADD</Text>
        </TouchableOpacity>
      ) : (
        /* - 1 + Button */
        <View style={styles.counterContainer}>
          <TouchableOpacity
            onPress={() =>
              setQuantity(prev => {
                if (prev === 1) return 0;
                return prev - 1;
              })
            }
            style={styles.counterBtn}
          >
          
            <Text style={styles.counterText}>−</Text>
          </TouchableOpacity>

          <Text style={styles.quantityText}>{quantity}</Text>

          <TouchableOpacity
            onPress={() => setQuantity(prev => prev + 1)}
            style={styles.counterBtn}
          >
            <Text style={styles.counterText}>+</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
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
  addButton: {
    borderWidth: 1.5,
    borderColor: '#156778',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 28,
    backgroundColor: '#fff',
  },
  addText: {
    color: '#156778',
    fontWeight: '700',
    fontSize: 16,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#156778',
    borderRadius: 10,
    height: 40,
    marginTop: 20
    // paddingHorizontal: 7,
    // paddingVertical: 4,
  },
  counterBtn: {
    paddingHorizontal: 8,
    marginVertical: -20,
  },
  counterText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  quantityText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 10,
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
