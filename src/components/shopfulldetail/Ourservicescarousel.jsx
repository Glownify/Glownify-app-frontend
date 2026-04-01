import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {S} from '../../theme';

const ITEM_SIZE = S.size.avatarLg + S.space.xs;
const ITEM_WIDTH = ITEM_SIZE + S.space.md;
const ACTIVE_DOT_SIZE = Math.max(4, Math.round(S.icon.xs / 2));

export default function OurServicesCarousel({
  services = [],
  activeCategory,
  onSelect,
}) {
  return (
    <View style={{gap: S.space.md}}>
      <View className="flex-row items-center justify-between">
        <Text
          className="text-neutral-900"
          style={{fontSize: S.fs.md, fontWeight: '700'}}>
          Our Services
        </Text>
        <Text
          className="text-neutral-400"
          style={{fontSize: S.fs.xs, fontWeight: '500'}}>
          {services.length} categories
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingRight: S.space.sm,
          gap: S.space.md,
        }}>
        {services.map(service => {
          const isActive = activeCategory === service.id;
          const initials = service.name.slice(0, 2).toUpperCase();

          return (
            <TouchableOpacity
              key={service.id}
              className="items-center"
              style={{width: ITEM_WIDTH, gap: S.space.xs}}
              activeOpacity={0.78}
              onPress={() => onSelect(service.id)}>
              <View
                className={isActive ? 'border-primary-600' : 'border-neutral-100'}
                style={{
                  width: ITEM_SIZE,
                  height: ITEM_SIZE,
                  borderRadius: ITEM_SIZE / 2,
                  borderWidth: 2,
                  padding: 2,
                }}>
                <View
                  className={`flex-1 items-center justify-center overflow-hidden rounded-full ${
                    service.image
                      ? 'bg-neutral-100'
                      : isActive
                      ? 'bg-primary-50'
                      : 'bg-neutral-100'
                  }`}>
                  {service.image ? (
                    <Image
                      source={{uri: service.image}}
                      className="h-full w-full"
                      resizeMode="cover"
                    />
                  ) : (
                    <Text
                      className={isActive ? 'text-primary-600' : 'text-neutral-400'}
                      style={{fontSize: S.fs.sm, fontWeight: '700'}}>
                      {initials}
                    </Text>
                  )}
                </View>
              </View>

              <Text
                className={`text-center ${
                  isActive ? 'text-primary-600' : 'text-neutral-500'
                }`}
                style={{fontSize: S.fs.xxs, fontWeight: '600'}}
                numberOfLines={2}>
                {service.name}
              </Text>

              {isActive ? (
                <View
                  className="bg-primary-600"
                  style={{
                    width: ACTIVE_DOT_SIZE,
                    height: ACTIVE_DOT_SIZE,
                    borderRadius: ACTIVE_DOT_SIZE / 2,
                  }}
                />
              ) : null}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
