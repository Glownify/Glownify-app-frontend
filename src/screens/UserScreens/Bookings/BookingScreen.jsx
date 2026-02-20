import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { Calendar } from 'react-native-calendars';

// ============================================================
// DUMMY DATA - Replace with API response
// ============================================================
const DUMMY_SALON_DATA = {
  name: 'Glamour Salon & Spa',
  location: 'Gomti Nagar, Lucknow',
  totalSpecialists: 3, // Total specialists available in the salon
};

// Mock Bookings: Date -> Time -> Number of Bookings
const DUMMY_BOOKINGS = {
  '2026-02-21': {
    '10:00 AM': 3, // Full (3/3)
    '11:00 AM': 1, // Partial (1/3)
    '02:00 PM': 2, // Partial (2/3)
    '04:00 PM': 3, // Full (3/3)
  },
  '2026-02-22': {
    '09:00 AM': 1,
    '05:00 PM': 3,
  },
};

const TIME_SLOTS = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
  '07:00 PM',
  '08:00 PM',
];

export default function BookingScreen({ navigation, route }) {
  const { salonData } = route.params || {};
  const [selectedServiceMode, setSelectedServiceMode] = useState('salon');

  // Initialize with today's date formatted as YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState(null);

  // Reset time when date changes
  useEffect(() => {
    setSelectedTime(null);
  }, [selectedDate]);

  // ── helpers ────────────────────────────────────────────────
  const formatDateTitle = dateString => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
    });
  };

  const getSlotStatus = (date, time) => {
    const dateBookings = DUMMY_BOOKINGS[date];
    if (!dateBookings) return 'available'; // No bookings for this date

    const bookedCount = dateBookings[time] || 0;
    const totalCapacity =
      salonData?.totalSpecialists || DUMMY_SALON_DATA.totalSpecialists;

    if (bookedCount >= totalCapacity) {
      return 'booked'; // Full
    }

    // If we have bookings but less than capacity, it's still available (concurrent slots)
    // The user requirement: "if it is booked but there are two or more specialists... that can attend"
    // This implies it is effectively 'available'.
    return 'available';
  };

  // ── confirm booking ────────────────────────────────────────
  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Incomplete', 'Please select both a date and a time.');
      return;
    }

    console.log('Booking Details:', {
      serviceMode: selectedServiceMode,
      date: selectedDate,
      time: selectedTime,
    });

    // Pass visual format if needed, or just the raw strings
    navigation.navigate('CartScreen', {
      bookingDetails: {
        date: selectedDate,
        time: selectedTime,
        mode: selectedServiceMode,
      },
    });
  };

  const isReady = selectedDate && selectedTime;

  return (
    <SafeAreaView className="flex-1 bg-primary-50" edges={['top']}>
      {/* ── HEADER ─────────────────────────────────────────── */}
      <View className="bg-neutral-white px-md py-md border-b border-neutral-100">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mr-md"
          >
            <Icon name="chevron-back" size={24} color="#F472B6" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-neutral-700 flex-1 text-center mr-8">
            Choose Date & Time
          </Text>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* ── SALON INFO ──────────────────────────────────── */}
        <View className="items-center py-lg bg-neutral-white mb-md">
          <Text className="text-2xl font-bold text-neutral-900 mb-1">
            {salonData?.shopName || DUMMY_SALON_DATA.name}
          </Text>
          <Text className="text-neutral-500 text-base">
            {salonData?.location?.address || DUMMY_SALON_DATA.location}
          </Text>
        </View>

        {/* ── SERVICE MODE TOGGLE ──────────────────────────── */}
        <View className="mx-md mb-md">
          <View className="bg-neutral-white rounded-card p-md shadow-sm">
            <View className="flex-row gap-3 mb-md">
              <TouchableOpacity
                className={`flex-1 py-3 rounded-button ${
                  selectedServiceMode === 'salon'
                    ? 'bg-primary-400'
                    : 'bg-neutral-100 border border-neutral-200'
                }`}
                onPress={() => setSelectedServiceMode('salon')}
              >
                <Text
                  className={`text-center font-semibold text-base ${
                    selectedServiceMode === 'salon'
                      ? 'text-neutral-white'
                      : 'text-neutral-600'
                  }`}
                >
                  Visit Salon
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`flex-1 py-3 rounded-button ${
                  selectedServiceMode === 'home'
                    ? 'bg-primary-400'
                    : 'bg-neutral-100 border border-neutral-200'
                }`}
                onPress={() => setSelectedServiceMode('home')}
              >
                <Text
                  className={`text-center font-semibold text-base ${
                    selectedServiceMode === 'home'
                      ? 'text-neutral-white'
                      : 'text-neutral-600'
                  }`}
                >
                  Service at Home
                </Text>
              </TouchableOpacity>
            </View>
            <Text className="text-neutral-500 text-sm text-center">
              {selectedServiceMode === 'salon'
                ? 'You will visit the salon at selected time.'
                : 'Professional will visit your home at selected time.'}
            </Text>
          </View>
        </View>

        {/* ── CALENDAR ────────────────────────────────────── */}
        <View className="mx-md mb-md">
          <Text className="text-lg font-bold text-neutral-900 mb-3">
            Select Date
          </Text>
          <View className="bg-neutral-white rounded-card overflow-hidden shadow-sm">
            <Calendar
              current={selectedDate}
              onDayPress={day => setSelectedDate(day.dateString)}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  selectedColor: '#F472B6', // primary-400
                  selectedTextColor: '#ffffff',
                },
              }}
              minDate={today}
              theme={{
                todayTextColor: '#F472B6',
                arrowColor: '#F472B6',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '600',
              }}
            />
          </View>
        </View>

        {/* ── TIME SLOTS ──────────────────────────────────── */}
        <View className="mx-md">
          <Text className="text-lg font-bold text-neutral-900 mb-3">
            Select Time{' '}
            <Text className="text-sm font-normal text-neutral-500">
              ({formatDateTitle(selectedDate)})
            </Text>
          </Text>

          <View className="flex-row flex-wrap justify-between">
            {TIME_SLOTS.map((slot, index) => {
              const status = getSlotStatus(selectedDate, slot);
              const isSelected = selectedTime === slot;
              const isBooked = status === 'booked';

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => !isBooked && setSelectedTime(slot)}
                  style={{ width: '31%' }} // approx 3 columns
                  className={`mb-3 py-3 rounded-lg border items-center justify-center ${
                    isBooked
                      ? 'bg-neutral-100 border-neutral-200 opacity-50'
                      : isSelected
                      ? 'bg-primary-50 border-primary-400'
                      : 'bg-neutral-white border-neutral-200'
                  }`}
                  disabled={isBooked}
                >
                  <Text
                    className={`font-medium text-sm ${
                      isBooked
                        ? 'text-neutral-400 decoration-line-through'
                        : isSelected
                        ? 'text-primary-600'
                        : 'text-neutral-700'
                    }`}
                  >
                    {slot}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Legend */}
          <View className="flex-row justify-center gap-6 mt-2 mb-md">
            <View className="flex-row items-center gap-2">
              <View className="w-3 h-3 rounded-full bg-neutral-white border border-neutral-300" />
              <Text className="text-xs text-neutral-500">Available</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <View className="w-3 h-3 rounded-full bg-primary-50 border border-primary-400" />
              <Text className="text-xs text-neutral-500">Selected</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <View className="w-3 h-3 rounded-full bg-neutral-100 border border-neutral-200" />
              <Text className="text-xs text-neutral-500">Booked</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ── FIXED BOTTOM BUTTON ──────────────────────────────── */}
      <View className="absolute bottom-0 left-0 right-0 bg-neutral-white px-md py-md border-t border-neutral-100">
        <TouchableOpacity
          className={`py-md rounded-button items-center ${
            isReady ? 'bg-primary-400' : 'bg-neutral-200'
          }`}
          onPress={handleConfirm}
          disabled={!isReady}
          activeOpacity={isReady ? 0.8 : 1}
        >
          <Text
            className={`font-bold text-base ${
              isReady ? 'text-neutral-white' : 'text-neutral-400'
            }`}
          >
            Confirm Booking
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
