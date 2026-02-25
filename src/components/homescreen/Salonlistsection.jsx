import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import SalonCardItem from './Saloncarditem';

const DUMMY_SALONS = [
  {
    _id: 'dummy-salon-1',
    name: 'Evita Beauty Parlour',
    category: 'No categories available',
    distance: '321.7',
    rating: '4.8',
    reviews: '200',
    image: null,
  },
  {
    _id: 'dummy-salon-2',
    name: 'Refine Glo Salon',
    category: 'No categories available',
    distance: '321.7',
    rating: '4.6',
    reviews: '150',
    image: null,
  },
  {
    _id: 'dummy-salon-3',
    name: 'Luxe Beauty Studio',
    category: 'No categories available',
    distance: '500',
    rating: '4.7',
    reviews: '320',
    image: null,
  },
];

export default function SalonListSection({
  salonList,
  selectedCategory,
  onViewAll,
  onSalonPress,
}) {
  const displayList = salonList?.length > 0 ? salonList : DUMMY_SALONS;

  return (
    <View className="mb-lg">
      <View className="px-md flex-row items-center justify-between mb-3">
        <Text className="text-base font-bold text-neutral-800 uppercase">
          {selectedCategory === 'unisex' ? 'Unisex' : 'Nearby Salons'}
        </Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text className="text-sm font-medium text-secondary-teal">
            View all
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10 }}
      >
        {displayList.map((salon, index) => (
          <SalonCardItem
            key={salon._id}
            salon={salon}
            selectedCategory={selectedCategory}
            imageIndex={index}
            onPress={() => onSalonPress(salon._id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
