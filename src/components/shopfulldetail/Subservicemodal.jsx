import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SubServiceModal({
  visible,
  service,
  onDismiss,
  onConfirm,
}) {
  const [selectedSubServices, setSelectedSubServices] = useState([]);

  // Dummy sub-services. Ideally, this comes from service.subServices
  const subServices = service
    ? [
        {
          _id: `${service._id}-sub1`,
          name: `${service.name} Basic`,
          price: service.salonPrice || 500,
        },
        {
          _id: `${service._id}-sub2`,
          name: `${service.name} Advanced`,
          price: (service.salonPrice || 500) + 200,
        },
        {
          _id: `${service._id}-sub3`,
          name: `${service.name} Premium`,
          price: (service.salonPrice || 500) + 500,
        },
      ]
    : [];

  useEffect(() => {
    if (visible) {
      setSelectedSubServices([]);
    }
  }, [visible]);

  const toggleSelection = sub => {
    setSelectedSubServices(prev => {
      if (prev.find(s => s._id === sub._id)) {
        return prev.filter(s => s._id !== sub._id);
      } else {
        return [...prev, sub];
      }
    });
  };

  const handleConfirm = () => {
    onConfirm(selectedSubServices);
  };

  if (!service) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onDismiss}
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>Select Options</Text>
            <TouchableOpacity onPress={onDismiss} style={styles.closeBtn}>
              <Icon name="close" size={24} color="#1F2937" />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>
            Choose sub-services for {service.name}
          </Text>

          <ScrollView style={styles.list}>
            {subServices.map(sub => {
              const isSelected = selectedSubServices.find(
                s => s._id === sub._id,
              );
              return (
                <TouchableOpacity
                  key={sub._id}
                  style={[styles.item, isSelected && styles.itemSelected]}
                  onPress={() => toggleSelection(sub)}
                >
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{sub.name}</Text>
                    <Text style={styles.itemPrice}>₹{sub.price}</Text>
                  </View>
                  <View
                    style={[
                      styles.checkbox,
                      isSelected && styles.checkboxSelected,
                    ]}
                  >
                    {isSelected && (
                      <Icon name="checkmark" size={16} color="#fff" />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[
                styles.confirmBtn,
                selectedSubServices.length === 0 && styles.disabledBtn,
              ]}
              disabled={selectedSubServices.length === 0}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmText}>
                Add {selectedSubServices.length}{' '}
                {selectedSubServices.length === 1 ? 'item' : 'items'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '70%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  closeBtn: {
    padding: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  list: {
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },
  itemSelected: {
    borderColor: '#EA8491',
    backgroundColor: '#FFF1F2',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EA8491',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#EA8491',
    borderColor: '#EA8491',
  },
  footer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  confirmBtn: {
    backgroundColor: '#EA8491',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  disabledBtn: {
    backgroundColor: '#F3F4F6',
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
