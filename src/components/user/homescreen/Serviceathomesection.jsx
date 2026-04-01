import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import IndependentProCard from './Independentprocard';
import {S} from '../../../theme';
import {wp} from '../../../utils/responsive';

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

const CARD_WIDTH = wp(39);
const CARD_GAP = S.space.md;

export default function ServiceAtHomeSection({
  independentProsList,
  onViewAll,
  onProPress,
}) {
  const displayList =
    independentProsList?.length > 0 ? independentProsList : DUMMY_PROS;

  return (
    <View style={{gap: S.space.md}}>
      <View
        className="flex-row items-center justify-between"
        style={{paddingHorizontal: S.space.marginScreen}}
      >
        <View style={{gap: S.space.xs}}>
          <Text
            className="text-neutral-900"
            style={{fontSize: S.fs.md, fontWeight: '700'}}
          >
            Home Service
          </Text>
          <Text className="text-neutral-400" style={{fontSize: S.fs.xs}}>
            {displayList.length} professionals nearby
          </Text>
        </View>
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
          gap: CARD_GAP,
          paddingVertical: S.space.sm,
        }}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + CARD_GAP}
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
