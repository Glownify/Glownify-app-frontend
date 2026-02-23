import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import NearbySalonCard from './Nearbysaloncard';

export default function NearbySection({ title, data = [], onViewAll, onCardPress }) {
  const displayData = data.length > 0 ? data : [
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
    <View className="">
      <View className="px-md flex-row items-center justify-between mb-3">
        <Text className="text-base font-semibold text-neutral-800">{title}</Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text className="text-sm font-medium text-secondary-teal">View all</Text>
        </TouchableOpacity>
      </View>

      {displayData.map((item, index) => (
        <View key={item._id || index} className={index < displayData.length - 1 ? 'mb-3' : ''}>
          <NearbySalonCard
            name={item.name}
            address={item.address}
            tags={item.tags}
            rating={item.rating}
            reviews={item.reviews}
            discount={item.discount}
            image={item.image}
            onPress={() => onCardPress(item)}
          />
        </View>
      ))}
    </View>
  );
}