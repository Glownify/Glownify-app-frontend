import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import SpecialistSelector from './SpecialistSelector';
import DatePicker from './DatePicker';
import TimeSlot from './TimeSlot';

// Mock Data
const specialists = [
  {
    id: '1',
    name: 'Ronald',
    image: require('../../../assets/featuredSalon.png'),
  },
  {
    id: '2',
    name: 'Merry',
    image: require('../../../assets/featuredSalon.png'),
  },
  {
    id: '3',
    name: 'Bella',
    image: require('../../../assets/featuredSalon.png'),
  },
  {
    id: '4',
    name: 'Joseph',
    image: require('../../../assets/featuredSalon.png'),
  },
  {
    id: '5',
    name: 'Sarah',
    image: require('../../../assets/featuredSalon.png'),
  },
];

const timeSlots = [
  '08:00 AM',
  '10:00 AM',
  '11:00 AM',
  '01:00 PM',
  '03:00 PM',
  '05:00 PM',
];

export default function BookingScreen({ navigation }) {
  const [selectedSpecialist, setSelectedSpecialist] = useState('1');
  const [selectedDate, setSelectedDate] = useState(10);
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [month, setMonth] = useState('March, 2021');
  const [notes, setNotes] = useState('');

  const handleMonthChange = direction => {
    // Handle month change logic here
    console.log('Month change:', direction);
  };

  const handleCheckout = () => {
    // Navigate to checkout or handle booking
    console.log('Checkout pressed');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#156778]" edges={['top']}>
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row justify-between items-center px-4 py-4 border-b border-[#F3F4F6]">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#156778" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-[#111827]">
            Book Service
          </Text>
          <View className="w-6" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 px-4 pt-5"
        >
          {/* Specialist */}
          <Text className="text-base font-semibold text-[#111827] mb-4 mt-2">
            Specialist
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-6"
          >
            {specialists.map(specialist => (
              <SpecialistSelector
                key={specialist.id}
                specialist={specialist}
                isSelected={selectedSpecialist === specialist.id}
                onPress={() => setSelectedSpecialist(specialist.id)}
              />
            ))}
          </ScrollView>

          {/* Date */}
          <Text className="text-base font-semibold text-[#111827] mb-4 mt-2">
            Date
          </Text>
          <DatePicker
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            month={month}
            onMonthChange={handleMonthChange}
          />

          {/* Time */}
          <Text className="text-base font-semibold text-[#111827] mb-4 mt-2">
            Time
          </Text>
          <View className="flex-row flex-wrap mb-6">
            {timeSlots.map(time => (
              <TimeSlot
                key={time}
                time={time}
                isSelected={selectedTime === time}
                onPress={() => setSelectedTime(time)}
              />
            ))}
          </View>

          {/* Notes */}
          <Text className="text-base font-semibold text-[#111827] mb-4 mt-2">
            Notes
          </Text>
          <TextInput
            className="bg-[#F9FAFB] rounded-xl p-4 text-sm text-[#111827] min-h-[100px] mb-[100px]"
            placeholder="Type your notes here"
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={4}
            value={notes}
            onChangeText={setNotes}
            textAlignVertical="top"
          />
        </ScrollView>

        {/* Bottom Bar */}
        <View
          className="absolute bottom-0 left-0 right-0 flex-row bg-white px-4 py-4 border-t border-[#E5E7EB]"
          style={{
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          <View className="flex-row items-center flex-1">
            <View className="w-12 h-12 rounded-full bg-[#E1F5FA] justify-center items-center mr-3">
              <Icon name="cart-outline" size={24} color="#156778" />
            </View>
            <View className="flex-1">
              <Text className="text-xs text-[#6B7280]">Total (1 Service)</Text>
              <Text className="text-lg font-bold text-[#111827]">₹ 2500</Text>
            </View>
          </View>

          <TouchableOpacity
            className="bg-[#156778] px-8 py-4 rounded-[25px] justify-center"
            onPress={handleCheckout}
          >
            <Text className="text-base font-semibold text-white">Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
