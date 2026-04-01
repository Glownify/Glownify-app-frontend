import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import SalonCardItem from './Saloncarditem';
import {S} from '../../../theme';

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
    <View style={{gap: S.space.md}}>
      <View
        className="flex-row items-center justify-between"
        style={{paddingHorizontal: S.space.marginScreen}}
      >
        <Text
          className="text-neutral-800"
          style={{fontSize: S.fs.md, fontWeight: '700'}}
        >
          {selectedCategory === 'unisex' ? 'Unisex' : 'Nearby Salons'}
        </Text>
        <TouchableOpacity onPress={onViewAll} activeOpacity={0.8}>
          <Text
            className="text-primary-600"
            style={{fontSize: S.fs.sm, fontWeight: '500'}}
          >
            View all
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: S.space.marginScreen,
          gap: S.space.md,
          paddingVertical: S.space.xs,
        }}
      >
        {displayList.map((salon, index) => (
          <SalonCardItem
            key={salon._id}
            salon={salon}
            imageIndex={index}
            onPress={() => onSalonPress(salon._id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
