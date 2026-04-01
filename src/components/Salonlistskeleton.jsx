import React from 'react';
import {View} from 'react-native';
import {moderateScale, wp} from '../utils/responsive';
import {S} from '../theme';
import {Skeleton} from './Skeleton';

const CARD_WIDTH = wp(55);

export default function SalonListSkeleton() {
  return (
    <View style={{gap: S.space.md}}>
      <View
        className="flex-row items-center justify-between"
        style={{paddingHorizontal: S.space.lg}}>
        <Skeleton style={{width: moderateValue(80), height: moderateValue(16), borderRadius: S.radius.sm}} />
        <Skeleton style={{width: moderateValue(52), height: moderateValue(14), borderRadius: S.radius.sm}} />
      </View>

      <View
        className="flex-row"
        style={{paddingHorizontal: S.space.lg, gap: S.space.md}}>
        {[0, 1].map(index => (
          <View
            key={index}
            className="overflow-hidden rounded-2xl border border-neutral-100 bg-surface"
            style={{width: CARD_WIDTH, borderRadius: S.radius.xl}}>
            <Skeleton
              style={{width: CARD_WIDTH, height: CARD_WIDTH * 0.85, borderRadius: 0}}
            />

            <View style={{padding: S.space.sm, gap: S.space.xs}}>
              <Skeleton
                style={{
                  width: CARD_WIDTH * 0.7,
                  height: moderateValue(13),
                  borderRadius: S.radius.sm,
                }}
              />
              <Skeleton
                style={{
                  width: CARD_WIDTH * 0.5,
                  height: moderateValue(11),
                  borderRadius: S.radius.sm,
                }}
              />

              <View className="flex-row items-center justify-between">
                <Skeleton
                  style={{
                    width: moderateValue(60),
                    height: moderateValue(11),
                    borderRadius: S.radius.sm,
                  }}
                />
                <Skeleton
                  style={{
                    width: moderateValue(70),
                    height: moderateValue(11),
                    borderRadius: S.radius.sm,
                  }}
                />
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

function moderateValue(value) {
  return moderateScale(value, 0.35);
}
