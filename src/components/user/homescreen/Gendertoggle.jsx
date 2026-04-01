import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {S} from '../../../theme';

export default function GenderToggle({selectedCategory, onSelect}) {
  return (
    <View
      className="bg-surface"
      style={{paddingHorizontal: S.space.marginScreen}}
    >
      <View
        className="flex-row bg-primary-50"
        style={{
          padding: S.space.xs,
          borderRadius: S.radius.full,
          gap: S.space.xs,
        }}
      >
        <TouchableOpacity
          className={`flex-1 flex-row items-center justify-center ${
            selectedCategory === 'women' ? 'bg-primary-600' : 'bg-transparent'
          }`}
          style={{
            minHeight: S.space['6xl'],
            paddingHorizontal: S.space.md,
            borderRadius: S.radius.full,
            gap: S.space.sm,
          }}
          onPress={() => onSelect('women')}
          activeOpacity={0.8}
        >
          <Text style={{fontSize: S.fs.md}}>{'\u{1F469}'}</Text>
          <Text
            className={
              selectedCategory === 'women'
                ? 'text-white'
                : 'text-neutral-600'
            }
            style={{fontSize: S.fs.md, fontWeight: '600'}}
          >
            Women
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 flex-row items-center justify-center ${
            selectedCategory === 'men' ? 'bg-primary-600' : 'bg-transparent'
          }`}
          style={{
            minHeight: S.space['6xl'],
            paddingHorizontal: S.space.md,
            borderRadius: S.radius.full,
            gap: S.space.sm,
          }}
          onPress={() => onSelect('men')}
          activeOpacity={0.8}
        >
          <Text style={{fontSize: S.fs.md}}>{'\u{1F468}'}</Text>
          <Text
            className={
              selectedCategory === 'men' ? 'text-white' : 'text-neutral-600'
            }
            style={{fontSize: S.fs.md, fontWeight: '600'}}
          >
            Men
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
