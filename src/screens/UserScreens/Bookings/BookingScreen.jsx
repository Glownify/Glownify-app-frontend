import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

// ============================================================
// DUMMY DATA - Replace with API response
// ============================================================
const DUMMY_SALON_DATA = {
  name: 'Glamour Salon & Spa', // TODO: Use salonData.shopName from API
  location: 'Gomti Nagar, Lucknow', // TODO: Use salonData.location.address from API
};

const DUMMY_DATES = [
  { day: 'Wed', date: 24, month: 'April', year: 2024 },
  { day: 'Thu', date: 25, month: 'April', year: 2024 },
  { day: 'Fri', date: 26, month: 'April', year: 2024 },
  { day: 'Sat', date: 27, month: 'April', year: 2024 },
  { day: 'Sun', date: 28, month: 'April', year: 2024 },
];

// TODO: Fetch available time slots from API based on selected date
const TIME_SLOTS = {
  morning: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
  afternoon: ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM'],
  evening: ['3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'],
  night: ['6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM'],
};

export default function BookingScreen({ navigation, route }) {
  // TODO: Get salon data from route params or Redux
  const { salonData, selectedService } = route.params || {};
  
  const [selectedServiceMode, setSelectedServiceMode] = useState('salon'); // 'salon' or 'home'
  const [selectedDate, setSelectedDate] = useState(25);
  const [selectedMonth, setSelectedMonth] = useState('April 2024');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [showFullCalendar, setShowFullCalendar] = useState(false);

  const handleConfirm = () => {
    // TODO: Navigate to checkout with booking details
    console.log('Booking Details:', {
      serviceMode: selectedServiceMode,
      date: selectedDate,
      time: selectedTime,
    });
    navigation.navigate('BookingComplete');
  };

  const handleMonthChange = (direction) => {
    // TODO: Implement month navigation logic
    console.log('Month change:', direction);
  };

  // Format selected date for display
  const getFormattedDate = () => {
    const dateObj = DUMMY_DATES.find(d => d.date === selectedDate);
    if (!dateObj) return '';
    return `${dateObj.day}, ${dateObj.date} ${dateObj.month}`;
  };

  const getShortFormattedDate = () => {
    const dateObj = DUMMY_DATES.find(d => d.date === selectedDate);
    if (!dateObj) return '';
    return `${dateObj.day}, ${dateObj.date} ${dateObj.month.substring(0, 3)}`;
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-50" edges={['top']}>
      {/* ============================================================
          HEADER
          ============================================================ */}
      <View className="bg-neutral-white px-md py-md border-b border-neutral-100">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-md">
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
        {/* ============================================================
            SALON INFO SECTION
            ============================================================ */}
        {/* TODO: Use salonData from API */}
        <View className="items-center py-lg bg-neutral-white">
          <Text className="text-2xl font-bold text-neutral-900 mb-1">
            {salonData?.shopName || DUMMY_SALON_DATA.name}
          </Text>
          <Text className="text-neutral-500 text-base">
            {salonData?.location?.address || DUMMY_SALON_DATA.location}
          </Text>
        </View>

        {/* ============================================================
            SERVICE MODE TOGGLE
            ============================================================ */}
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
                <Text className={`text-center font-semibold text-base ${
                  selectedServiceMode === 'salon' ? 'text-neutral-white' : 'text-neutral-600'
                }`}>
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
                <Text className={`text-center font-semibold text-base ${
                  selectedServiceMode === 'home' ? 'text-neutral-white' : 'text-neutral-600'
                }`}>
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

        {/* ============================================================
            CALENDAR SECTION
            ============================================================ */}
        {/* TODO: Fetch available dates from API based on salon's working days */}
        <View className="mx-md mt-md">
          <View className="bg-neutral-white rounded-card p-md">
            {/* Month Navigation */}
            <View className="flex-row justify-between items-center mb-md">
              <TouchableOpacity onPress={() => handleMonthChange('prev')}>
                <Icon name="chevron-back" size={24} color="#9CA3AF" />
              </TouchableOpacity>
              <Text className="text-lg font-bold text-neutral-900">{selectedMonth}</Text>
              <TouchableOpacity onPress={() => handleMonthChange('next')}>
                <Icon name="chevron-forward" size={24} color="#9CA3AF" />
              </TouchableOpacity>
            </View>

            {/* Date Selector */}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 12 }}
            >
              {DUMMY_DATES.map((dateItem, index) => {
                const isSelected = selectedDate === dateItem.date;
                return (
                  <TouchableOpacity
                    key={index}
                    className={`items-center px-4 py-3 rounded-input min-w-[70px] ${
                      isSelected 
                        ? 'bg-primary-400' 
                        : 'bg-neutral-50 border border-neutral-200'
                    }`}
                    onPress={() => setSelectedDate(dateItem.date)}
                  >
                    <Text className={`text-sm font-medium mb-1 ${
                      isSelected ? 'text-neutral-white' : 'text-neutral-500'
                    }`}>
                      {dateItem.day}
                    </Text>
                    <Text className={`text-2xl font-bold ${
                      isSelected ? 'text-neutral-white' : 'text-neutral-900'
                    }`}>
                      {dateItem.date}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>

        {/* ============================================================
            TIME SLOT SECTION
            ============================================================ */}
        {/* TODO: Fetch available time slots from API based on selected date */}
        <View className="mx-md mt-md">
          <View className="bg-neutral-white rounded-card p-md">
            <Text className="text-lg font-bold text-neutral-900 mb-md">
              Select Time Slot
            </Text>

            {/* Morning Slots */}
            <Text className="text-base font-semibold text-neutral-600 mb-3">Morning</Text>
            <View className="flex-row flex-wrap gap-2 mb-lg">
              {TIME_SLOTS.morning.map((time, index) => {
                const isSelected = selectedTime === time;
                return (
                  <TouchableOpacity
                    key={index}
                    className={`px-5 py-3 rounded-button ${
                      isSelected 
                        ? 'bg-primary-400' 
                        : 'bg-neutral-50 border border-neutral-200'
                    }`}
                    onPress={() => setSelectedTime(time)}
                  >
                    <Text className={`text-sm font-medium ${
                      isSelected ? 'text-neutral-white' : 'text-neutral-700'
                    }`}>
                      {time}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Afternoon Slots */}
            <Text className="text-base font-semibold text-neutral-600 mb-3">Afternoon</Text>
            <View className="flex-row flex-wrap gap-2 mb-lg">
              {TIME_SLOTS.afternoon.map((time, index) => {
                const isSelected = selectedTime === time;
                return (
                  <TouchableOpacity
                    key={index}
                    className={`px-5 py-3 rounded-button ${
                      isSelected 
                        ? 'bg-primary-400' 
                        : 'bg-neutral-50 border border-neutral-200'
                    }`}
                    onPress={() => setSelectedTime(time)}
                  >
                    <Text className={`text-sm font-medium ${
                      isSelected ? 'text-neutral-white' : 'text-neutral-700'
                    }`}>
                      {time}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Evening Slots */}
            <Text className="text-base font-semibold text-neutral-600 mb-3">Evening</Text>
            <View className="flex-row flex-wrap gap-2 mb-lg">
              {TIME_SLOTS.evening.map((time, index) => {
                const isSelected = selectedTime === time;
                return (
                  <TouchableOpacity
                    key={index}
                    className={`px-5 py-3 rounded-button ${
                      isSelected 
                        ? 'bg-primary-400' 
                        : 'bg-neutral-50 border border-neutral-200'
                    }`}
                    onPress={() => setSelectedTime(time)}
                  >
                    <Text className={`text-sm font-medium ${
                      isSelected ? 'text-neutral-white' : 'text-neutral-700'
                    }`}>
                      {time}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Night Slots */}
            <Text className="text-base font-semibold text-neutral-600 mb-3">Night</Text>
            <View className="flex-row flex-wrap gap-2">
              {TIME_SLOTS.night.map((time, index) => {
                const isSelected = selectedTime === time;
                return (
                  <TouchableOpacity
                    key={index}
                    className={`px-5 py-3 rounded-button ${
                      isSelected 
                        ? 'bg-primary-400' 
                        : 'bg-neutral-50 border border-neutral-200'
                    }`}
                    onPress={() => setSelectedTime(time)}
                  >
                    <Text className={`text-sm font-medium ${
                      isSelected ? 'text-neutral-white' : 'text-neutral-700'
                    }`}>
                      {time}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        {/* ============================================================
            SELECTED DATE SUMMARY (Expandable)
            ============================================================ */}
        <TouchableOpacity 
          className="mx-md mt-md"
          onPress={() => setShowFullCalendar(!showFullCalendar)}
        >
          <View className="bg-neutral-white rounded-card p-md flex-row justify-between items-center">
            <Text className="text-base font-semibold">
              <Text className="text-primary-400">{getFormattedDate()}</Text>
            </Text>
            <Icon 
              name={showFullCalendar ? "chevron-up" : "chevron-down"} 
              size={20} 
              color="#9CA3AF" 
            />
          </View>
        </TouchableOpacity>

        {/* ============================================================
            BOOKING CONFIRMATION SUMMARY
            ============================================================ */}
        <View className="mx-md mt-md mb-md">
          <View className="bg-neutral-white rounded-card p-md">
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-input bg-primary-50 items-center justify-center mr-3">
                <Icon name="calendar-outline" size={20} color="#F472B6" />
              </View>
              <Text className="text-base font-semibold text-neutral-900">
                {getShortFormattedDate()} | {selectedTime}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ============================================================
          FIXED BOTTOM BUTTON
          ============================================================ */}
      <View className="absolute bottom-0 left-0 right-0 bg-neutral-white px-md py-md border-t border-neutral-100">
        <TouchableOpacity 
          className="bg-primary-400 py-md rounded-button items-center"
          onPress={handleConfirm}
        >
          <Text className="text-neutral-white font-bold text-base">
            Confirm Date & Time
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}