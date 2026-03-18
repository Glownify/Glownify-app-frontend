/**
 * IndependentProBillingDetail.jsx
 *
 * ✅ Adapted from BillingDetail for Independent Pro context.
 * ✅ Teal accent (#156778) replaces pink — Pro brand consistent.
 * ✅ Grand Total shown in teal (vs pink for salon).
 * ✅ Invoice number & date derived from booking when available.
 * ✅ Inline styles throughout (no NativeWind className for layout).
 *
 * 🔁 API integration:
 *   Pass real booking via route.params.booking
 *   handlePrint    → api.post('/pro/invoices/print', { bookingId })
 *   handleShare    → Share.share({ message: invoiceUrl })
 *   addService     → navigate to service picker, pass back selected service
 *   deleteService  → update local state, sync with backend on bill finalize
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

// ─── Constants ────────────────────────────────────────────────────────────────

const ACCENT  = '#156778';
const BG      = '#e8f6f8';

const cardShadow = {
  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 2 },
  elevation: 2,
};

// ─── Mock Data ────────────────────────────────────────────────────────────────
// 🔁 Replace MOCK_* with data from route.params.booking

const MOCK_SERVICES = [
  { id: 1, name: 'Keratin Base Treatment', price: 1800, qty: 1, icon: 'cut-outline',   iconColor: ACCENT,    iconBg: '#cffafe' },
  { id: 2, name: 'Blow Dry Finish',        price: 400,  qty: 1, icon: 'flash-outline', iconColor: '#f97316', iconBg: '#fff7ed' },
  { id: 3, name: 'Hair Wash',              price: 150,  qty: 1, icon: 'water-outline', iconColor: '#3b82f6', iconBg: '#dbeafe' },
];

const TIP_OPTIONS    = [20, 50, 100, 200];
const DISCOUNT_LABEL = 'Loyalty Discount';
const DISCOUNT_AMOUNT = 200;

const MOCK_CUSTOMER = {
  name:        'Priya S.',
  invoiceNo:   'INV-0042',
  date:        'Mar 18, 2026',
  time:        '11:00 AM',
  initials:    'PS',
  avatarColor: '#cffafe',
};

// ─── Avatar ───────────────────────────────────────────────────────────────────

const Avatar = ({ initials, color, size = 56 }) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: color,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Text style={{ fontSize: size * 0.33, color: '#0e7490', fontWeight: '700' }}>
      {initials}
    </Text>
  </View>
);

// ─── Service Row ──────────────────────────────────────────────────────────────

const ServiceRow = ({ service, onIncrement, onDecrement, onDelete }) => (
  <View
    style={{
      backgroundColor: '#fff',
      borderRadius: 16,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 14,
      paddingVertical: 14,
      marginBottom: 10,
      ...cardShadow,
    }}
  >
    {/* Icon */}
    <View
      style={{
        width: 46,
        height: 46,
        borderRadius: 14,
        backgroundColor: service.iconBg,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
      }}
    >
      <Icon name={service.icon} size={22} color={service.iconColor} />
    </View>

    {/* Name + Price */}
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 14, fontWeight: '600', color: '#1f2937' }}>
        {service.name}
      </Text>
      <Text style={{ color: ACCENT, fontWeight: '700', fontSize: 13, marginTop: 2 }}>
        ₹{(service.price * service.qty).toLocaleString()}
      </Text>
    </View>

    {/* Qty controls */}
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <TouchableOpacity
        onPress={() => onDecrement(service.id)}
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f9fafb',
          borderWidth: 1,
          borderColor: '#e5e7eb',
        }}
        activeOpacity={0.7}
      >
        <Icon name="remove" size={14} color="#374151" />
      </TouchableOpacity>

      <Text style={{ fontSize: 15, fontWeight: '700', color: '#1f2937', minWidth: 16, textAlign: 'center' }}>
        {service.qty}
      </Text>

      <TouchableOpacity
        onPress={() => onIncrement(service.id)}
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f9fafb',
          borderWidth: 1,
          borderColor: '#e5e7eb',
        }}
        activeOpacity={0.7}
      >
        <Icon name="add" size={14} color="#374151" />
      </TouchableOpacity>
    </View>

    {/* Delete */}
    <TouchableOpacity
      onPress={() => onDelete(service.id)}
      style={{
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9fafb',
        marginLeft: 10,
      }}
      activeOpacity={0.7}
    >
      <Icon name="trash-outline" size={16} color="#9ca3af" />
    </TouchableOpacity>
  </View>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function IndependentProBillingDetail({ navigation, route }) {
  // 🔁 Replace with data derived from route.params.booking
  const booking  = route?.params?.booking;
  const customer = booking
    ? {
        name:        booking.customerName,
        invoiceNo:   `INV-${String(booking.id).padStart(4, '0')}`,
        date:        booking.date,
        time:        booking.timeStart || booking.time,
        initials:    booking.initials,
        avatarColor: booking.avatarColor || '#cffafe',
      }
    : MOCK_CUSTOMER;

  const initialServices = booking?.services
    ? booking.services.map((s, i) => ({
        id:        s.id || i + 1,
        name:      s.name,
        price:     s.price,
        qty:       1,
        icon:      'cut-outline',
        iconColor: ACCENT,
        iconBg:    '#cffafe',
      }))
    : MOCK_SERVICES;

  const [services, setServices]         = useState(initialServices);
  const [selectedTip, setSelectedTip]   = useState(50);
  const [discountAmount]                = useState(DISCOUNT_AMOUNT);

  // ── Service helpers ──────────────────────────────────────────────────────

  const increment = id =>
    setServices(prev => prev.map(s => s.id === id ? { ...s, qty: s.qty + 1 } : s));

  const decrement = id =>
    setServices(prev => prev.map(s => s.id === id ? { ...s, qty: Math.max(1, s.qty - 1) } : s));

  const deleteService = id => {
    Alert.alert('Remove Service', 'Remove this service from the bill?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => setServices(prev => prev.filter(s => s.id !== id)),
      },
    ]);
  };

  const addService = () => Alert.alert('Add Service', 'Open service picker…');
  // 🔁 Replace with: navigation.navigate('ServicePicker', { onSelect: (s) => setServices(prev => [...prev, s]) })

  // ── Totals ────────────────────────────────────────────────────────────────

  const subtotal   = services.reduce((sum, s) => sum + s.price * s.qty, 0);
  const tip        = selectedTip;
  const grandTotal = subtotal + tip - discountAmount;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG }} edges={[]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* ── Top Nav ─────────────────────────────────────────────────────── */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#f3f4f6',
        }}
      >
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          style={{
            width: 36,
            height: 36,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 18,
            backgroundColor: '#e8f6f8',
          }}
        >
          <Icon name="arrow-back" size={20} color={ACCENT} />
        </TouchableOpacity>

        <Text style={{ fontSize: 17, fontWeight: '800', color: '#1f2937' }}>Create Bill</Text>

        <TouchableOpacity
          style={{
            width: 36,
            height: 36,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 18,
            backgroundColor: '#f9fafb',
          }}
        >
          <Icon name="ellipsis-vertical" size={20} color="#1f2937" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 150 }}
      >
        {/* ── Customer Info Card ──────────────────────────────────────── */}
        <View
          style={{
            marginHorizontal: 16,
            marginTop: 16,
            marginBottom: 20,
            backgroundColor: '#fff',
            borderRadius: 24,
            paddingHorizontal: 16,
            paddingVertical: 16,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 14,
            borderWidth: 1,
            borderColor: '#f3f4f6',
            ...cardShadow,
          }}
        >
          <Avatar initials={customer.initials} color={customer.avatarColor} size={56} />
          <View>
            <Text style={{ fontSize: 20, fontWeight: '800', color: '#1f2937' }}>
              {customer.name}
            </Text>
            <Text style={{ color: ACCENT, fontWeight: '700', fontSize: 13, marginTop: 2 }}>
              Bill #{customer.invoiceNo}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 5 }}>
              <Icon name="calendar-outline" size={12} color="#9ca3af" />
              <Text style={{ color: '#9ca3af', fontSize: 12 }}>
                {customer.date} • {customer.time}
              </Text>
            </View>
          </View>
        </View>

        {/* ── Services Section ────────────────────────────────────────── */}
        <View style={{ paddingHorizontal: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <Text style={{ fontSize: 20, fontWeight: '800', color: '#1f2937' }}>Services</Text>
            <View
              style={{
                paddingHorizontal: 12,
                paddingVertical: 4,
                borderRadius: 20,
                backgroundColor: '#e8f6f8',
              }}
            >
              <Text style={{ color: ACCENT, fontWeight: '700', fontSize: 12 }}>
                {services.length} ITEMS
              </Text>
            </View>
          </View>

          {services.map(service => (
            <ServiceRow
              key={service.id}
              service={service}
              onIncrement={increment}
              onDecrement={decrement}
              onDelete={deleteService}
            />
          ))}

          {/* Add Service */}
          <TouchableOpacity
            onPress={addService}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 16,
              paddingVertical: 14,
              marginBottom: 24,
              borderWidth: 1.5,
              borderColor: '#67e8f9',
              borderStyle: 'dashed',
              backgroundColor: '#f0fdfa',
              gap: 8,
            }}
            activeOpacity={0.8}
          >
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: ACCENT,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="add" size={16} color="#fff" />
            </View>
            <Text style={{ color: ACCENT, fontWeight: '700', fontSize: 15 }}>
              Add Service
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── Add a Tip ───────────────────────────────────────────────── */}
        <View style={{ paddingHorizontal: 16, marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: '800', color: '#1f2937', marginBottom: 12 }}>
            Add a Tip
          </Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            {TIP_OPTIONS.map(t => {
              const active = selectedTip === t;
              return (
                <TouchableOpacity
                  key={t}
                  onPress={() => setSelectedTip(t)}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 12,
                    borderRadius: 30,
                    borderWidth: active ? 2 : 1,
                    borderColor: active ? ACCENT : '#e5e7eb',
                    backgroundColor: active ? '#e8f6f8' : '#fff',
                  }}
                  activeOpacity={0.8}
                >
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: 14,
                      color: active ? ACCENT : '#374151',
                    }}
                  >
                    ₹{t}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ── Bill Summary ────────────────────────────────────────────── */}
        <View
          style={{
            marginHorizontal: 16,
            borderRadius: 24,
            padding: 20,
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#f3f4f6',
            ...cardShadow,
          }}
        >
          {/* Subtotal */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderBottomColor: '#f3f4f6',
            }}
          >
            <Text style={{ color: '#6b7280', fontSize: 14 }}>Subtotal</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <View style={{ paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20, backgroundColor: ACCENT }}>
                <Text style={{ color: '#fff', fontSize: 9, fontWeight: '800', letterSpacing: 0.5 }}>
                  PAID
                </Text>
              </View>
              <Text style={{ fontWeight: '600', fontSize: 14, color: '#1f2937' }}>
                ₹{subtotal.toLocaleString()}
              </Text>
            </View>
          </View>

          {/* Tip */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderBottomColor: '#f3f4f6',
            }}
          >
            <Text style={{ color: '#6b7280', fontSize: 14 }}>Tip Amount</Text>
            <Text style={{ fontWeight: '600', fontSize: 14, color: '#1f2937' }}>₹{tip}</Text>
          </View>

          {/* Discount */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderBottomColor: '#f3f4f6',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text style={{ color: '#6b7280', fontSize: 14 }}>Discount</Text>
              <View
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  borderRadius: 20,
                  backgroundColor: '#e8f6f8',
                  borderWidth: 1,
                  borderColor: '#99f6e4',
                }}
              >
                <Text style={{ color: ACCENT, fontSize: 10, fontWeight: '700' }}>
                  {DISCOUNT_LABEL}
                </Text>
              </View>
            </View>
            <Text style={{ color: '#f43f5e', fontWeight: '700', fontSize: 14 }}>
              - ₹{discountAmount}
            </Text>
          </View>

          {/* Grand Total */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 16,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '800', color: '#1f2937' }}>Grand Total</Text>
            <Text style={{ color: ACCENT, fontWeight: '800', fontSize: 26 }}>
              ₹{grandTotal.toLocaleString()}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* ── Bottom Actions ───────────────────────────────────────────────── */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#fff',
          paddingHorizontal: 16,
          paddingBottom: 32,
          paddingTop: 14,
          borderTopWidth: 1,
          borderTopColor: '#f3f4f6',
          elevation: 12,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: -4 },
        }}
      >
        {/* Print Bill */}
        <TouchableOpacity
          onPress={() => Alert.alert('Print', 'Sending to printer…')}
          // 🔁 Replace with: api.post('/pro/invoices/print', { bookingId: booking.id })
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 30,
            paddingVertical: 14,
            marginBottom: 10,
            backgroundColor: ACCENT,
            gap: 10,
          }}
          activeOpacity={0.85}
        >
          <Icon name="print-outline" size={20} color="#fff" />
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>Print Bill</Text>
        </TouchableOpacity>

        {/* Share Invoice */}
        <TouchableOpacity
          onPress={() => Alert.alert('Share', 'Opening share sheet…')}
          // 🔁 Replace with: Share.share({ message: invoiceUrl })
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          activeOpacity={0.75}
        >
          <Icon name="share-social-outline" size={17} color="#9ca3af" />
          <Text style={{ color: '#9ca3af', fontWeight: '600', fontSize: 14 }}>Share Invoice</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}