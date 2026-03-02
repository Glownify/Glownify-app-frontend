import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const CATEGORY_EMOJIS = ['💇', '🧖', '💅', '🎨', '🧴', '💄', '🧖‍♀️', '✨'];

export default function ServiceCategoriesSection({
  categories = [],
  onCategoryPress,
  onViewAll,
}) {
  const renderCategory = (category, index) => (
    <TouchableOpacity
      key={category.id}
      className="items-center"
      style={{ width: 72, marginRight: 12 }}
      onPress={() => onCategoryPress(category)}
      activeOpacity={0.75}
    >
      <View className="w-16 h-16 bg-primary-50 rounded-avatar items-center justify-center mb-1.5">
        <Text className="text-3xl">
          {CATEGORY_EMOJIS[index % CATEGORY_EMOJIS.length]}
        </Text>
      </View>
      <Text
        className="text-xs font-regular text-neutral-700 text-center"
        numberOfLines={1}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="mb-lg">
      {/* Section Header */}
      <View className="flex-row items-center justify-between mb-3 px-md">
        <Text className="text-base font-semibold text-neutral-800">
          What do you want to get?
        </Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text className="text-sm font-medium text-primary">View all</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal Scroll Row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 4 }}
      >
        {categories.map((cat, i) => renderCategory(cat, i))}
      </ScrollView>
    </View>
  );
}
