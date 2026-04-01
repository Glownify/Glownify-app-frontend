import React from 'react';
import {View, Text} from 'react-native';
import {S} from '../../../theme';
import {moderateScale} from '../../../utils/responsive';

export default function GlownifyFooter() {
  return (
    <View
      className="items-center opacity-50"
      style={{padding: S.space.lg}}
    >
      <View
        className="items-center justify-center border border-primary-100 bg-primary-50"
        style={{
          width: moderateScale(96),
          height: moderateScale(80),
          borderRadius: S.radius.xl,
          gap: S.space.xs,
        }}
      >
        <Text style={{fontSize: S.fs.xl}}>{'\u2728'}</Text>
        <Text
          className="text-primary-600"
          style={{fontSize: S.fs.xs, fontWeight: '600'}}
        >
          Glownify
        </Text>
      </View>
    </View>
  );
}
