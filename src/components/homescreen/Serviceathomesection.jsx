// components/Serviceathomsection.jsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import IndependentProCard from './Independentprocard';

const DUMMY_PROS = [
  {
    _id: 'dummy-pro-1',
    name: 'Abhishek',
    availability: 'Not available',
    experience: '4 yrs Exp',
    services: 'Hairs',
    gender: 'MALE',
    rating: '4.5',
    image: null,
  },
  {
    _id: 'dummy-pro-2',
    name: 'Priya Sharma',
    availability: 'Available now',
    experience: '6 yrs Exp',
    services: 'Makeup',
    gender: 'FEMALE',
    rating: '4.8',
    image: null,
  },
  {
    _id: 'dummy-pro-3',
    name: 'Rahul Verma',
    availability: 'Available now',
    experience: '3 yrs Exp',
    services: 'Facial',
    gender: 'MALE',
    rating: '4.3',
    image: null,
  },
  {
    _id: 'dummy-pro-4',
    name: 'Sneha Kulkarni',
    availability: 'Not available',
    experience: '8 yrs Exp',
    services: 'Waxing',
    gender: 'FEMALE',
    rating: '4.9',
    image: null,
  },
];

export default function ServiceAtHomeSection({
  independentProsList,
  onViewAll,
  onProPress,
}) {
  const displayList =
    independentProsList?.length > 0 ? independentProsList : DUMMY_PROS;

  return (
    <View className="mb-4">
      {/* Header */}
      <View className="px-4 flex-row items-center justify-between mb-3">
        <View>
          <Text className="text-base font-bold text-gray-900 uppercase">
            Home Service
          </Text>
          <Text className="text-xs text-gray-400 mt-0.5">
            {displayList.length} professionals nearby
          </Text>
        </View>
        <TouchableOpacity onPress={onViewAll}>
          <Text className="text-sm font-medium text-primary">View all</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal scroll — shows 2–2.5 cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: 16,
          paddingRight: 8,
          gap: 10,
          paddingVertical: 14,
        }}
        decelerationRate="fast"
        snapToInterval={158} // card width (148) + gap (10)
        snapToAlignment="start"
      >
        {displayList.map((pro, index) => (
          <IndependentProCard
            key={pro._id}
            pro={pro}
            index={index}
            onPress={() => onProPress?.(pro._id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
