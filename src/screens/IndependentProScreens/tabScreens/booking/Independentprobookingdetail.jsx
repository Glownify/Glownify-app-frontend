/**
 * IndependentProBookingDetail.jsx
 *
 * ✅ Adapted from BookingDetail for Independent Pro context.
 * ✅ Teal accent (#156778) replaces pink — Pro brand consistent.
 * ✅ Specialist row replaced with "You (Independent Pro)" row.
 * ✅ Inline styles throughout (no NativeWind className for layout).
 *
 * 🔁 API integration:
 *   Pass real booking via route.params.booking
 *   handleCreateBill → navigate with booking id for real invoice generation
 *   handleReschedule → dispatch(rescheduleBooking({ id, newSlot }))
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
// 🔁 Replace with route.params.booking from navigation or Redux selector

const MOCK_BOOKING = {
  id: 1,
  customerName: 'Priya S.',
  service: 'Keratin Treatment',
  status: 'accepted', // pending | accepted | completed | declined
  date: 'Mar 18, 2026',
  timeStart: '11:00 AM',
  timeEnd: '1:00 PM',
  duration: '2 hrs',
  type: 'location', // 'location' | 'home'
  address: '12 MG Road, Bengaluru, KA',
  services: [
    { id: 1, name: 'Keratin Base Treatment', price: 1800 },
    { id: 2, name: 'Blow Dry Finish',        price: 400  },
    { id: 3, name: 'Hair Wash',              price: 150  },
  ],
  notes: '"Client has fine hair. Used mild keratin formula. Requested extra shine serum. Very happy with the result."',
  initials: 'PS',
  avatarColor: '#cffafe',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  completed: { label: 'COMPLETED', bg: '#f0fdf4', text: '#10b981' },
  accepted:  { label: 'ACCEPTED',  bg: '#f0fdfa', text: '#156778' },
  pending:   { label: 'PENDING',   bg: '#fffbeb', text: '#f59e0b' },
  declined:  { label: 'CANCELLED', bg: '#fff1f2', text: '#f43f5e' },
};

// ─── Avatar ───────────────────────────────────────────────────────────────────

const Avatar = ({ initials, color, size = 72 }) => (
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
    <Text style={{ fontSize: size * 0.32, color: '#0e7490', fontWeight: '700' }}>
      {initials}
    </Text>
  </View>
);

// ─── Section Label ────────────────────────────────────────────────────────────

const SectionLabel = ({ title, action, onAction }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
    <Text style={{ color: '#9ca3af', fontSize: 11, fontWeight: '700', letterSpacing: 1.4 }}>
      {title}
    </Text>
    {action && (
      <TouchableOpacity onPress={onAction} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <Icon name="pencil" size={13} color={ACCENT} />
        <Text style={{ color: ACCENT, fontWeight: '700', fontSize: 13 }}>{action}</Text>
      </TouchableOpacity>
    )}
  </View>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function IndependentProBookingDetail({ navigation, route }) {
  const booking = route?.params?.booking ?? MOCK_BOOKING;
  const [notes, setNotes] = useState(booking.notes);

  const statusCfg  = STATUS_CONFIG[booking.status] ?? STATUS_CONFIG.pending;
  const grandTotal = booking.services.reduce((sum, s) => sum + s.price, 0);

  const handleCall       = () => Alert.alert('Call', `Calling ${booking.customerName}…`);
  const handleMessage    = () => Alert.alert('Message', `Opening chat with ${booking.customerName}…`);
  const handleReschedule = () => Alert.alert('Reschedule', 'Open reschedule flow…');
  const handleRebook     = () => Alert.alert('Rebook', 'Rebooking appointment…');
  const handleCreateBill = () => navigation.navigate('IndependentProBillingDetail', { booking });

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

        <Text style={{ fontSize: 17, fontWeight: '800', color: '#1f2937' }}>
          Booking Details
        </Text>

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
        contentContainerStyle={{ paddingBottom: 130 }}
      >
        {/* ── Customer Hero ────────────────────────────────────────────── */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 24,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <View>
            <Avatar initials={booking.initials} color={booking.avatarColor} size={72} />
            {booking.status === 'completed' && (
              <View
                style={{
                  position: 'absolute',
                  bottom: 2,
                  right: 2,
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: ACCENT,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 2,
                  borderColor: '#fff',
                }}
              >
                <Icon name="checkmark" size={13} color="#fff" />
              </View>
            )}
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 24, fontWeight: '800', color: '#1f2937' }}>
              {booking.customerName}
            </Text>
            <Text style={{ fontSize: 14, color: '#6b7280', marginTop: 2 }}>
              {booking.service}
            </Text>
            {/* Service type pill */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                marginTop: 6,
                alignSelf: 'flex-start',
                backgroundColor: booking.type === 'home' ? '#fff7ed' : '#f0fdfa',
                borderRadius: 20,
                paddingHorizontal: 10,
                paddingVertical: 3,
              }}
            >
              <Icon
                name={booking.type === 'home' ? 'home-outline' : 'storefront-outline'}
                size={12}
                color={booking.type === 'home' ? '#f97316' : ACCENT}
              />
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '700',
                  color: booking.type === 'home' ? '#f97316' : ACCENT,
                }}
              >
                {booking.type === 'home' ? "At Client's Home" : 'At My Location'}
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: statusCfg.bg,
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 6,
            }}
          >
            <Text style={{ color: statusCfg.text, fontSize: 11, fontWeight: '700', letterSpacing: 0.6 }}>
              {statusCfg.label}
            </Text>
          </View>
        </View>

        {/* ── Booking Information ──────────────────────────────────────── */}
        <View
          style={{
            marginHorizontal: 16,
            borderRadius: 24,
            padding: 20,
            marginBottom: 14,
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#f3f4f6',
            ...cardShadow,
          }}
        >
          <SectionLabel title="BOOKING INFORMATION" />

          {/* Date + Time */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 14 }}>
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                backgroundColor: '#e8f6f8',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="calendar" size={22} color={ACCENT} />
            </View>
            <View>
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#1f2937' }}>
                {booking.date}
              </Text>
              <Text style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>
                {booking.timeStart} – {booking.timeEnd} ({booking.duration})
              </Text>
            </View>
          </View>

          {/* Address (for home bookings) */}
          {booking.type === 'home' && booking.address && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: 14,
                marginBottom: 16,
              }}
            >
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  backgroundColor: '#fff7ed',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon name="location" size={22} color="#f97316" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 13, fontWeight: '700', color: '#1f2937' }}>
                  Client's Address
                </Text>
                <Text style={{ fontSize: 13, color: '#6b7280', marginTop: 2, lineHeight: 18 }}>
                  {booking.address}
                </Text>
              </View>
            </View>
          )}

          {/* Pro self-row */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 14,
              paddingHorizontal: 14,
              paddingVertical: 12,
              backgroundColor: '#f0fdfa',
              gap: 12,
            }}
          >
            <Avatar initials="YO" color="#cffafe" size={44} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#1f2937' }}>
                You (Independent Pro)
              </Text>
              <Text style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>
                Assigned Professional
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleMessage}
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: ACCENT,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="chatbubble" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Service Summary ──────────────────────────────────────────── */}
        <View
          style={{
            marginHorizontal: 16,
            borderRadius: 24,
            padding: 20,
            marginBottom: 14,
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#f3f4f6',
            ...cardShadow,
          }}
        >
          <SectionLabel title="SERVICE SUMMARY" />

          {booking.services.map((service, index) => (
            <View key={service.id}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: 12,
                }}
              >
                <Text style={{ fontSize: 15, color: '#374151' }}>{service.name}</Text>
                <Text style={{ fontSize: 15, fontWeight: '600', color: '#1f2937' }}>
                  ₹{service.price.toLocaleString()}
                </Text>
              </View>
              {index < booking.services.length - 1 && (
                <View style={{ height: 1, backgroundColor: '#f3f4f6' }} />
              )}
            </View>
          ))}

          <View style={{ height: 1.5, backgroundColor: '#e5e7eb', marginVertical: 12 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 17, fontWeight: '800', color: '#1f2937' }}>Grand Total</Text>
            <Text style={{ color: ACCENT, fontWeight: '800', fontSize: 22 }}>
              ₹{grandTotal.toLocaleString()}
            </Text>
          </View>
        </View>

        {/* ── Additional Notes ─────────────────────────────────────────── */}
        <View style={{ marginHorizontal: 16, marginBottom: 20 }}>
          <SectionLabel
            title="ADDITIONAL NOTES"
            action="Edit"
            onAction={() => Alert.alert('Edit', 'Open notes editor')}
          />
          <View
            style={{
              borderRadius: 16,
              padding: 16,
              backgroundColor: '#f0fdfa',
              borderWidth: 1,
              borderColor: '#99f6e4',
            }}
          >
            <Text style={{ color: '#374151', fontSize: 14, lineHeight: 22, fontStyle: 'italic' }}>
              {notes}
            </Text>
          </View>
        </View>

        {/* ── Quick Actions ────────────────────────────────────────────── */}
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 16,
            marginBottom: 20,
            borderRadius: 24,
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#f3f4f6',
            overflow: 'hidden',
            ...cardShadow,
          }}
        >
          {[
            { icon: 'call-outline',      label: 'Call',       color: ACCENT,     onPress: handleCall       },
            { icon: 'chatbubble-outline', label: 'Message',    color: '#10b981',  onPress: handleMessage    },
            { icon: 'calendar-outline',  label: 'Reschedule', color: '#6b7280',  onPress: handleReschedule },
          ].map((action, idx, arr) => (
            <TouchableOpacity
              key={action.label}
              onPress={action.onPress}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 16,
                borderRightWidth: idx < arr.length - 1 ? 1 : 0,
                borderRightColor: '#f3f4f6',
              }}
              activeOpacity={0.75}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: action.color + '18',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 6,
                }}
              >
                <Icon name={action.icon} size={20} color={action.color} />
              </View>
              <Text style={{ color: '#374151', fontSize: 12, fontWeight: '600' }}>
                {action.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* ── Bottom CTA Buttons ───────────────────────────────────────────── */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#fff',
          paddingHorizontal: 16,
          paddingBottom: 28,
          paddingTop: 12,
          flexDirection: 'row',
          gap: 12,
          borderTopWidth: 1,
          borderTopColor: '#f3f4f6',
          elevation: 10,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: -4 },
        }}
      >
        {/* Rebook */}
        <TouchableOpacity
          onPress={handleRebook}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 30,
            paddingVertical: 14,
            borderWidth: 1.5,
            borderColor: ACCENT,
            backgroundColor: '#fff',
            gap: 8,
          }}
          activeOpacity={0.8}
        >
          <Icon name="refresh" size={18} color={ACCENT} />
          <Text style={{ color: ACCENT, fontWeight: '700', fontSize: 15 }}>Rebook</Text>
        </TouchableOpacity>

        {/* Create Bill */}
        <TouchableOpacity
          onPress={handleCreateBill}
          style={{
            flex: 2,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 30,
            paddingVertical: 14,
            backgroundColor: ACCENT,
            gap: 8,
          }}
          activeOpacity={0.85}
        >
          <Icon name="receipt-outline" size={18} color="#fff" />
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}>Create Bill</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}