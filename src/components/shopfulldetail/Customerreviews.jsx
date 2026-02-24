// components/CustomerReviews.jsx
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * CustomerReviews
 * Props:
 *   rating        number
 *   reviews       Array<{ id, userName, userAvatar, rating, comment }>
 *   onViewAll     () => void
 */
export default function CustomerReviews({ rating, reviews = [], onViewAll }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;

  return (
    <View className="mx-4 mt-6 mb-4 bg-white rounded-2xl border border-slate-100 border-t-2 border-t-pink-500 overflow-hidden shadow-sm">

      {/* Header */}
      <View className="px-4 pt-4 pb-3 flex-row items-center justify-between">
        <Text className="text-base font-bold text-gray-900">
          Customer Reviews
        </Text>
        <TouchableOpacity
          className="flex-row items-center gap-0.5"
          onPress={onViewAll}
          activeOpacity={0.7}
        >
          <Text className="text-[#EA8491] text-xs font-semibold">See all</Text>
          <Icon name="chevron-forward" size={12} color="#EA8491" />
        </TouchableOpacity>
      </View>

      {/* Rating summary card */}
      <View className="mx-4 mb-3 bg-amber-50 rounded-xl px-4 py-3 flex-row items-center gap-3">
        <Text className="text-4xl font-bold text-amber-500">
          {rating.toFixed(1)}
        </Text>
        <View className="gap-1">
          <View className="flex-row gap-0.5">
            {[1, 2, 3, 4, 5].map(star => (
              <Icon
                key={star}
                name={
                  star <= fullStars
                    ? 'star'
                    : star === fullStars + 1 && hasHalf
                    ? 'star-half'
                    : 'star-outline'
                }
                size={15}
                color="#F59E0B"
              />
            ))}
          </View>
          <Text className="text-xs text-amber-700 font-medium">
            Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
          </Text>
        </View>
      </View>

      {/* Divider */}
      <View className="h-px bg-gray-50 mx-4" />

      {/* Review rows */}
      {reviews.slice(0, 2).map((review, index) => (
        <TouchableOpacity
          key={review.id}
          className={`flex-row items-start px-4 py-3.5 gap-3 ${
            index < Math.min(reviews.length, 2) - 1
              ? 'border-b border-gray-50'
              : ''
          }`}
          activeOpacity={0.7}
        >
          {/* Avatar */}
          <View className="w-9 h-9 rounded-full bg-gray-100 overflow-hidden items-center justify-center flex-shrink-0">
            {review.userAvatar ? (
              <Image
                source={{ uri: review.userAvatar }}
                className="w-9 h-9"
                resizeMode="cover"
              />
            ) : (
              <Icon name="person" size={18} color="#9CA3AF" />
            )}
          </View>

          {/* Content */}
          <View className="flex-1 gap-0.5">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-semibold text-gray-800">
                {review.userName}
              </Text>
              {/* Mini star rating */}
              <View className="flex-row gap-px">
                {[1, 2, 3, 4, 5].map(s => (
                  <Icon
                    key={s}
                    name={s <= review.rating ? 'star' : 'star-outline'}
                    size={10}
                    color="#F59E0B"
                  />
                ))}
              </View>
            </View>
            <Text className="text-xs text-gray-500 leading-4" numberOfLines={2}>
              {review.comment}
            </Text>
          </View>
        </TouchableOpacity>
      ))}

      {/* Footer CTA */}
      {/* <TouchableOpacity
        className="mx-4 mb-4 mt-2 border border-[#EA8491] rounded-xl py-2.5 items-center"
        onPress={onViewAll}
        activeOpacity={0.75}
      >
        <Text className="text-[#EA8491] font-semibold text-sm">
          View All Reviews
        </Text>
      </TouchableOpacity> */}
    </View>
  );
}
