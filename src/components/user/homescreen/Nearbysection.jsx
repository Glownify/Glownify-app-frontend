import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import NearbySalonCard from './Nearbysaloncard';
import {S} from '../../../theme';

export default function NearbySection({
  title,
  data = [],
  onViewAll,
  onCardPress,
}) {
  const displayData =
    data.length > 0
      ? data
      : [
          {
            _id: 'placeholder-1',
            name: "Maroon's Luxury Salon",
            address: 'Kukatpally, Hyderabad',
            tags: 'HAIR • FACIAL',
            rating: '4.8',
            reviews: '3.7k',
            discount: '15%',
          },
          {
            _id: 'placeholder-2',
            name: "Maroon's Luxury Salon",
            address: 'Kukatpally, Hyderabad',
            tags: 'HAIR • FACIAL',
            rating: '4.8',
            reviews: '3.7k',
            discount: '15%',
          },
          {
            _id: 'placeholder-3',
            name: "Maroon's Luxury Salon",
            address: 'Kukatpally, Hyderabad',
            tags: 'HAIR • FACIAL',
            rating: '4.8',
            reviews: '3.7k',
            discount: '15%',
          },
          {
            _id: 'placeholder-4',
            name: "Maroon's Luxury Salon",
            address: 'Kukatpally, Hyderabad',
            tags: 'HAIR • FACIAL',
            rating: '4.8',
            reviews: '3.7k',
            discount: '15%',
          },
        ];

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
          {title}
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
        {displayData.map((item, index) => (
          <NearbySalonCard
            key={item._id || index}
            name={item.name}
            address={item.address}
            tags={item.tags}
            rating={item.rating}
            reviews={item.reviews}
            discount={item.discount}
            image={item.image}
            onPress={() => onCardPress(item)}
            index={index}
          />
        ))}
      </ScrollView>
    </View>
  );
}
