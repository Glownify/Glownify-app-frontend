import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
];

export default function ServiceAtHomeSection({
  independentProsList,
  onViewAll,
  onProPress,
}) {
  const displayList =
    independentProsList?.length > 0 ? independentProsList : DUMMY_PROS;

  return (
    <View className="mb-lg">
      <View className="px-md flex-row items-center justify-between mb-3">
        <Text className="text-base font-semibold text-neutral-800">
          Service At Home
        </Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text className="text-sm font-medium text-secondary-teal">
            View all
          </Text>
        </TouchableOpacity>
      </View>

      {displayList.slice(0, 3).map(pro => (
        <IndependentProCard
          key={pro._id}
          pro={pro}
          onPress={() => onProPress(pro._id)}
        />
      ))}
    </View>
  );
}
