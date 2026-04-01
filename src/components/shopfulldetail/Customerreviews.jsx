import React from 'react';
import {Image, Text, TouchableOpacity, View, useColorScheme} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {S, getThemeColors} from '../../theme';

const AVATAR_SIZE = S.size.avatarSm + S.space.sm;

export default function CustomerReviews({rating, reviews = [], onViewAll}) {
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;

  return (
    <View
      className="bg-surface border border-t-2 border-neutral-100 border-t-primary-600 overflow-hidden shadow-sm"
      style={{borderRadius: S.radius.xl, elevation: 2}}>
      <View style={{padding: S.space.lg, gap: S.space.lg}}>
        <View className="flex-row items-center justify-between">
          <Text
            className="text-neutral-900"
            style={{fontSize: S.fs.md, fontWeight: '700'}}>
            Customer Reviews
          </Text>

          <TouchableOpacity
            className="flex-row items-center"
            style={{gap: S.space.xs}}
            onPress={onViewAll}
            activeOpacity={0.75}>
            <Text
              className="text-primary-600"
              style={{fontSize: S.fs.xs, fontWeight: '600'}}>
              See all
            </Text>
            <Icon
              name="chevron-forward"
              size={S.icon.xs}
              color={colors.primary[600]}
            />
          </TouchableOpacity>
        </View>

        <View
          className="flex-row items-center rounded-2xl bg-warning-50"
          style={{padding: S.space.lg, gap: S.space.md}}>
          <Text
            className="text-warning-600"
            style={{fontSize: S.fs.xxl, fontWeight: '700'}}>
            {rating.toFixed(1)}
          </Text>

          <View style={{gap: S.space.xs}}>
            <View className="flex-row" style={{gap: S.space.xs / 2}}>
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
                  size={S.icon.xs + 2}
                  color={colors.warning[500]}
                />
              ))}
            </View>
            <Text
              className="text-warning-700"
              style={{fontSize: S.fs.xs, fontWeight: '500'}}>
              Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
            </Text>
          </View>
        </View>

        <View style={{gap: S.space.md}}>
          {reviews.slice(0, 2).map(review => (
            <TouchableOpacity
              key={review.id}
              className="flex-row items-start rounded-2xl border border-neutral-100 bg-base"
              style={{padding: S.space.md, gap: S.space.md}}
              activeOpacity={0.75}>
              <View
                className="items-center justify-center overflow-hidden rounded-full bg-neutral-100"
                style={{width: AVATAR_SIZE, height: AVATAR_SIZE}}>
                {review.userAvatar ? (
                  <Image
                    source={{uri: review.userAvatar}}
                    style={{width: AVATAR_SIZE, height: AVATAR_SIZE}}
                    resizeMode="cover"
                  />
                ) : (
                  <Icon name="person" size={S.icon.md} color={colors.neutral[400]} />
                )}
              </View>

              <View className="flex-1" style={{gap: S.space.xs}}>
                <View className="flex-row items-center justify-between">
                  <Text
                    className="text-neutral-800"
                    style={{fontSize: S.fs.sm, fontWeight: '600'}}>
                    {review.userName}
                  </Text>

                  <View className="flex-row" style={{gap: 2}}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <Icon
                        key={star}
                        name={star <= review.rating ? 'star' : 'star-outline'}
                        size={S.icon.xs}
                        color={colors.warning[500]}
                      />
                    ))}
                  </View>
                </View>

                <Text
                  className="text-neutral-500"
                  style={{fontSize: S.fs.xs, lineHeight: S.fs.sm + 2}}
                  numberOfLines={2}>
                  {review.comment}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}
