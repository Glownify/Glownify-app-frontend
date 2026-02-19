import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

// ============================================================
// DUMMY DATA - Replace with API response
// ============================================================
const DUMMY_SALON_DATA = {
  name: 'Glamour Salon & Spa',
  location: 'Gomti Nagar, Lucknow',
};

export default function BookingScreen({ navigation, route }) {
  const { salonData, selectedService } = route.params || {};

  const [selectedServiceMode, setSelectedServiceMode] = useState('salon');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  // ── helpers ────────────────────────────────────────────────
  const formatDate = date =>
    date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  const formatDateShort = date =>
    date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });

  const formatTime = date =>
    date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

  // ── picker handlers ────────────────────────────────────────
  const handleDateConfirm = date => {
    setSelectedDate(date);
    setDatePickerVisible(false);
  };

  const handleTimeConfirm = time => {
    setSelectedTime(time);
    setTimePickerVisible(false);
  };

  // ── confirm booking ────────────────────────────────────────
  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) return;
    console.log('Booking Details:', {
      serviceMode: selectedServiceMode,
      date: selectedDate.toISOString().split('T')[0],
      time: formatTime(selectedTime),
    });
    navigation.navigate('CartScreen');
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
        <View className="items-center py-lg bg-neutral-white">
          <Text className="text-2xl font-bold text-neutral-900 mb-1">
            {salonData?.shopName || DUMMY_SALON_DATA.name}
          </Text>
          <Text className="text-neutral-500 text-base">
            {salonData?.location?.address || DUMMY_SALON_DATA.location}
          </Text>
        </View>

        {/* ── SERVICE MODE TOGGLE ──────────────────────────── */}
        <View className="mx-md mt-md">
          <View className="bg-neutral-white rounded-card p-md">
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

        {/* ── DATE & TIME PICKERS ──────────────────────────── */}
        <View className="mx-md mt-md">
          <View className="bg-neutral-white rounded-card p-md gap-4">
            <Text className="text-lg font-bold text-neutral-900">
              Select Date & Time
            </Text>

            {/* Date picker button */}
            <View className="gap-2">
              <Text className="text-sm font-medium text-neutral-600">
                Date <Text className="text-primary-400">*</Text>
              </Text>
              <TouchableOpacity
                onPress={() => setDatePickerVisible(true)}
                className={`flex-row items-center justify-between rounded-input px-4 py-3 border ${
                  selectedDate
                    ? 'bg-primary-50 border-primary-300'
                    : 'bg-neutral-50 border-neutral-200'
                }`}
                activeOpacity={0.7}
              >
                <View className="flex-row items-center gap-3">
                  <View
                    className={`w-9 h-9 rounded-full items-center justify-center ${
                      selectedDate ? 'bg-primary-400' : 'bg-neutral-100'
                    }`}
                  >
                    <Icon
                      name="calendar-outline"
                      size={18}
                      color={selectedDate ? '#fff' : '#9CA3AF'}
                    />
                  </View>
                  <Text
                    className={`text-base font-medium ${
                      selectedDate ? 'text-neutral-900' : 'text-neutral-400'
                    }`}
                  >
                    {selectedDate ? formatDate(selectedDate) : 'Select a date'}
                  </Text>
                </View>
                <Icon
                  name="chevron-forward"
                  size={18}
                  color={selectedDate ? '#F472B6' : '#9CA3AF'}
                />
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View className="h-px bg-neutral-100" />

            {/* Time picker button */}
            <View className="gap-2">
              <Text className="text-sm font-medium text-neutral-600">
                Time <Text className="text-primary-400">*</Text>
              </Text>
              <TouchableOpacity
                onPress={() => setTimePickerVisible(true)}
                className={`flex-row items-center justify-between rounded-input px-4 py-3 border ${
                  selectedTime
                    ? 'bg-primary-50 border-primary-300'
                    : 'bg-neutral-50 border-neutral-200'
                }`}
                activeOpacity={0.7}
              >
                <View className="flex-row items-center gap-3">
                  <View
                    className={`w-9 h-9 rounded-full items-center justify-center ${
                      selectedTime ? 'bg-primary-400' : 'bg-neutral-100'
                    }`}
                  >
                    <Icon
                      name="time-outline"
                      size={18}
                      color={selectedTime ? '#fff' : '#9CA3AF'}
                    />
                  </View>
                  <Text
                    className={`text-base font-medium ${
                      selectedTime ? 'text-neutral-900' : 'text-neutral-400'
                    }`}
                  >
                    {selectedTime ? formatTime(selectedTime) : 'Select a time'}
                  </Text>
                </View>
                <Icon
                  name="chevron-forward"
                  size={18}
                  color={selectedTime ? '#F472B6' : '#9CA3AF'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ── BOOKING SUMMARY (shown once both are selected) ── */}
        {isReady && (
          <View className="mx-md mt-md">
            <View className="bg-primary-50 border border-primary-200 rounded-card p-md">
              <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 rounded-input bg-primary-400 items-center justify-center">
                  <Icon
                    name="checkmark-circle-outline"
                    size={22}
                    color="#fff"
                  />
                </View>
                <View>
                  <Text className="text-xs text-primary-400 font-semibold uppercase tracking-wide mb-0.5">
                    Your Appointment
                  </Text>
                  <Text className="text-base font-bold text-neutral-900">
                    {formatDateShort(selectedDate)} · {formatTime(selectedTime)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
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
            Confirm Date & Time
          </Text>
        </TouchableOpacity>
      </View>

      {/* ── DATE PICKER MODAL ────────────────────────────────── */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisible(false)}
        minimumDate={new Date()}
        date={selectedDate || new Date()}
      />

      {/* ── TIME PICKER MODAL ────────────────────────────────── */}
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={() => setTimePickerVisible(false)}
        date={selectedTime || new Date()}
      />
    </SafeAreaView>
  );
}
