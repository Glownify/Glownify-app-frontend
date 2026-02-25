// components/shopfulldetail/Subservicebottomsheet.jsx
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.72;
const DRAG_THRESHOLD = 80;

// ── Dummy sub-services per service id (replace with API) ──────────────────
const DUMMY_SUB_SERVICES = {
  s1: [
    { _id: 's1-a', name: 'Women Cut', duration: '20 mins', price: 250, image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=200' },
    { _id: 's1-b', name: 'Men Cut', duration: '15 mins', price: 200, image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=200' },
    { _id: 's1-c', name: 'Blow Dry', duration: '20 mins', price: 300, image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200' },
    { _id: 's1-d', name: 'Trim & Style', duration: '15 mins', price: 150, image: null },
  ],
  s2: [
    { _id: 's2-a', name: 'Deep Conditioning', duration: '20 mins', price: 350, image: null },
    { _id: 's2-b', name: 'Keratin Treatment', duration: '30 mins', price: 600, image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200' },
  ],
  s3: [
    { _id: 's3-a', name: 'Global Color', duration: '45 mins', price: 800, image: null },
    { _id: 's3-b', name: 'Highlights', duration: '60 mins', price: 1200, image: null },
    { _id: 's3-c', name: 'Balayage', duration: '90 mins', price: 2000, image: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=200' },
  ],
};

const getSubServices = serviceId => DUMMY_SUB_SERVICES[serviceId] || [];

const CheckIcon = () => (
  <View style={styles.checkIcon}>
    <Text style={styles.checkText}>✓</Text>
  </View>
);

const SubServiceItem = ({ item, selected, onToggle }) => (
  <TouchableOpacity
    style={[styles.subItem, selected && styles.subItemSelected]}
    onPress={() => onToggle(item)}
    activeOpacity={0.75}
  >
    {item.image ? (
      <Image source={{ uri: item.image }} style={styles.subItemImage} />
    ) : (
      <View style={[styles.subItemImage, styles.subItemImagePlaceholder]}>
        <Text style={styles.placeholderEmoji}>✂️</Text>
      </View>
    )}
    <View style={styles.subItemInfo}>
      <Text style={styles.subItemName}>{item.name}</Text>
      <Text style={styles.subItemDuration}>{item.duration}</Text>
    </View>
    <View style={styles.subItemRight}>
      <Text style={styles.subItemPrice}>₹{item.price}</Text>
      <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
        {selected && <CheckIcon />}
      </View>
    </View>
  </TouchableOpacity>
);

export default function SubServiceBottomSheet({ visible, service, onDismiss, onConfirm }) {
  const translateY = useRef(new Animated.Value(SHEET_HEIGHT)).current;
  const [selected, setSelected] = useState([]);
  const subServices = service ? getSubServices(service._id) : [];

  const open = () =>
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      damping: 22,
      stiffness: 200,
    }).start();

  const close = (cb) =>
    Animated.timing(translateY, {
      toValue: SHEET_HEIGHT,
      duration: 280,
      useNativeDriver: true,
    }).start(cb);

  useEffect(() => {
    if (visible) {
      setSelected([]);
      open();
    } else {
      translateY.setValue(SHEET_HEIGHT);
    }
  }, [visible]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gs) => Math.abs(gs.dy) > 5,
      onPanResponderMove: (_, gs) => {
        if (gs.dy > 0) translateY.setValue(gs.dy);
      },
      onPanResponderRelease: (_, gs) => {
        if (gs.dy > DRAG_THRESHOLD) {
          close(onDismiss);
        } else {
          open();
        }
      },
    })
  ).current;

  const toggleItem = item => {
    setSelected(prev =>
      prev.find(s => s._id === item._id)
        ? prev.filter(s => s._id !== item._id)
        : [...prev, item],
    );
  };

  const totalPrice = selected.reduce((sum, s) => sum + s.price, 0);

  const handleConfirm = () => {
    close(() => onConfirm(selected));
  };

  const handleDismiss = () => {
    close(onDismiss);
  };

  if (!visible && !service) return null;

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={handleDismiss}>
      {/* Backdrop */}
      <Pressable style={styles.backdrop} onPress={handleDismiss} />

      <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
        {/* Drag handle */}
        <View {...panResponder.panHandlers} style={styles.dragArea}>
          <View style={styles.dragHandle} />
        </View>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>{service?.name}</Text>
            <Text style={styles.headerSub}>
              {subServices.length} options • {service?.duration}
            </Text>
          </View>
          <TouchableOpacity onPress={handleDismiss} style={styles.closeBtn}>
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.hint}>Select one or more sub-services to add</Text>

        {/* Sub-services list */}
        <ScrollView
          style={styles.list}
          contentContainerStyle={{ paddingBottom: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {subServices.length > 0 ? (
            subServices.map(item => (
              <SubServiceItem
                key={item._id}
                item={item}
                selected={!!selected.find(s => s._id === item._id)}
                onToggle={toggleItem}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No sub-services available.</Text>
              <Text style={styles.emptySubText}>This service will be added as-is.</Text>
            </View>
          )}
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          {selected.length > 0 && (
            <View style={styles.footerSummary}>
              <Text style={styles.footerCount}>{selected.length} selected</Text>
              <Text style={styles.footerTotal}>₹{totalPrice}</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.confirmBtn}
            onPress={handleConfirm}
          >
            <Text style={styles.confirmBtnText}>
              {selected.length > 0
                ? `Add ${selected.length} to Cart`
                : 'Add to Cart'}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: SHEET_HEIGHT,
    backgroundColor: '#FFF8F7',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
  },
  dragArea: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 4,
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D4A5A0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D1B1A',
    letterSpacing: -0.3,
  },
  headerSub: {
    fontSize: 13,
    color: '#9B6E6A',
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F2E0DE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    fontSize: 14,
    color: '#7A4540',
    fontWeight: '600',
  },
  hint: {
    fontSize: 12,
    color: '#B08A86',
    paddingHorizontal: 20,
    marginBottom: 12,
    marginTop: 2,
  },
  list: {
    flex: 1,
    paddingHorizontal: 16,
  },
  subItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: 'transparent',
    shadowColor: '#C4837C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  subItemSelected: {
    borderColor: '#C4605A',
    backgroundColor: '#FFF1F0',
  },
  subItemImage: {
    width: 52,
    height: 52,
    borderRadius: 10,
    marginRight: 12,
  },
  subItemImagePlaceholder: {
    backgroundColor: '#F2E0DE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderEmoji: {
    fontSize: 22,
  },
  subItemInfo: {
    flex: 1,
  },
  subItemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D1B1A',
  },
  subItemDuration: {
    fontSize: 12,
    color: '#9B6E6A',
    marginTop: 3,
  },
  subItemRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  subItemPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#C4605A',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#D4A5A0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxSelected: {
    borderColor: '#C4605A',
    backgroundColor: '#C4605A',
  },
  checkIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 15,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9B6E6A',
  },
  emptySubText: {
    fontSize: 13,
    color: '#B08A86',
    marginTop: 4,
  },
  footer: {
    padding: 16,
    paddingBottom: 28,
    borderTopWidth: 1,
    borderTopColor: '#F2E0DE',
    gap: 10,
  },
  footerSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  footerCount: {
    fontSize: 13,
    color: '#9B6E6A',
    fontWeight: '500',
  },
  footerTotal: {
    fontSize: 15,
    fontWeight: '700',
    color: '#C4605A',
  },
  confirmBtn: {
    backgroundColor: '#C4605A',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
  },
  confirmBtnDisabled: {
    backgroundColor: '#D4A5A0',
  },
  confirmBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});