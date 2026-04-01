import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {S} from '../../../theme';
import {moderateScale} from '../../../utils/responsive';

const CATEGORY_EMOJIS = [
  '\u{1F487}',
  '\u{1F9D6}',
  '\u{1F485}',
  '\u{1F3A8}',
  '\u{1F9FC}',
  '\u{1F484}',
  '\u2728',
  '\u{1F31F}',
];

const CATEGORY_WIDTH = moderateScale(72);
const CATEGORY_ICON_SIZE = moderateScale(64);

export default function ServiceCategoriesSection({
  categories = [],
  onCategoryPress,
  onViewAll,
}) {
  const renderCategory = (category, index) => (
    <TouchableOpacity
      key={category.id}
      className="items-center"
      style={{width: CATEGORY_WIDTH, gap: S.space.xs}}
      onPress={() => onCategoryPress(category)}
      activeOpacity={0.75}
    >
      <View
        className="items-center justify-center bg-primary-50"
        style={{
          width: CATEGORY_ICON_SIZE,
          height: CATEGORY_ICON_SIZE,
          borderRadius: S.radius.full,
        }}
      >
        <Text style={{fontSize: S.fs.xl}}>
          {CATEGORY_EMOJIS[index % CATEGORY_EMOJIS.length]}
        </Text>
      </View>
      <Text
        className="text-center text-neutral-700"
        numberOfLines={1}
        style={{fontSize: S.fs.xs}}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{gap: S.space.md}}>
      <View
        className="flex-row items-center justify-between"
        style={{paddingHorizontal: S.space.marginScreen}}
      >
        <Text
          className="text-neutral-800"
          style={{fontSize: S.fs.md, fontWeight: '600'}}
        >
          What do you want to get?
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
        {categories.map((cat, index) => renderCategory(cat, index))}
      </ScrollView>
    </View>
  );
}
