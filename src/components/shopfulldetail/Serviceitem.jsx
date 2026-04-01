import React, {useState} from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {S, getThemeColors} from '../../theme';
import {moderateScale} from '../../utils/responsive';

const THUMB_SIZE = S.size.avatarMd + S.space.md;
const INFO_BUTTON_SIZE = S.icon.sm + S.space.md;

const formatCurrency = value => `Rs. ${Number(value || 0).toLocaleString('en-IN')}`;

export default function ServiceItem({
  service,
  selectedMode,
  cartItems,
  onAdd,
}) {
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const [modalVisible, setModalVisible] = useState(false);

  const price =
    selectedMode === 'home' && service.homePrice != null
      ? service.homePrice
      : service.salonPrice ?? service.homePrice ?? 0;

  const isInCart = cartItems.some(item => item._id === service._id);
  const isUnavailable =
    selectedMode === 'home' && service.serviceMode === 'salon';

  return (
    <>
      <View
        className={`flex-row items-center border-b border-neutral-100 ${
          isUnavailable ? 'opacity-45' : ''
        }`}
        style={{paddingVertical: S.space.lg, gap: S.space.md}}>
        <View
          className="relative overflow-hidden rounded-2xl bg-neutral-100"
          style={{width: THUMB_SIZE, height: THUMB_SIZE}}>
          {service.image ? (
            <Image
              source={{uri: service.image}}
              className="h-full w-full"
              resizeMode="cover"
            />
          ) : (
            <View className="flex-1 items-center justify-center bg-primary-50">
              <Icon name="cut-outline" size={S.icon.md} color={colors.primary[600]} />
            </View>
          )}

          <Pressable
            className="absolute items-center justify-center rounded-full bg-black/60"
            style={({pressed}) => ({
              right: S.space.xs,
              bottom: S.space.xs,
              width: INFO_BUTTON_SIZE,
              height: INFO_BUTTON_SIZE,
              opacity: pressed ? 0.7 : 1,
            })}
            onPress={() => setModalVisible(true)}
            hitSlop={S.space.sm}>
            <Icon name="information" size={S.icon.xs + 2} color={colors.white} />
          </Pressable>
        </View>

        <View className="flex-1" style={{gap: S.space.xs}}>
          <View className="flex-row flex-wrap items-center" style={{gap: S.space.xs}}>
            <Text
              className="flex-shrink text-neutral-900"
              style={{fontSize: S.fs.sm, fontWeight: '600'}}>
              {service.name}
            </Text>

            {service.badge ? (
              <View
                className="rounded-lg border border-warning-100 bg-warning-50"
                style={{
                  paddingHorizontal: S.space.xs + 2,
                  paddingVertical: S.space.xs / 1.5,
                }}>
                <Text
                  className="text-warning-700"
                  style={{fontSize: S.fs.tiny, fontWeight: '700'}}>
                  {service.badge}
                </Text>
              </View>
            ) : null}
          </View>

          <View className="flex-row items-center" style={{gap: S.space.xs}}>
            <Icon name="time-outline" size={S.icon.xs + 1} color={colors.neutral[400]} />
            <Text className="text-neutral-400" style={{fontSize: S.fs.xs}}>
              {service.duration}
            </Text>
          </View>

          <Text
            className="text-neutral-900"
            style={{fontSize: S.fs.sm, fontWeight: '700'}}>
            {formatCurrency(price)}
          </Text>
        </View>

        {!isUnavailable ? (
          <Pressable
            className={`items-center justify-center rounded-xl border ${
              isInCart
                ? 'border-primary-600 bg-primary-600'
                : 'border-primary-200 bg-base'
            }`}
            style={({pressed}) => ({
              minWidth: moderateScale(82),
              paddingHorizontal: S.space.md,
              paddingVertical: S.space.sm,
              opacity: pressed ? 0.75 : 1,
            })}
            onPress={() => onAdd(service)}
            hitSlop={S.space.sm}>
            <Text
              className={isInCart ? 'text-white' : 'text-primary-600'}
              style={{fontSize: S.fs.xs, fontWeight: '700'}}>
              {isInCart ? 'Added' : '+ Add'}
            </Text>
          </Pressable>
        ) : (
          <View
            className="rounded-xl bg-neutral-100"
            style={{
              paddingHorizontal: S.space.sm + S.space.xs,
              paddingVertical: S.space.sm,
            }}>
            <Text
              className="text-neutral-400"
              style={{fontSize: S.fs.tiny, fontWeight: '600'}}>
              Salon only
            </Text>
          </View>
        )}
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        statusBarTranslucent
        onRequestClose={() => setModalVisible(false)}>
        <Pressable
          className="flex-1 justify-end bg-black/40"
          onPress={() => setModalVisible(false)}>
          <Pressable onPress={event => event.stopPropagation()}>
            <View className="rounded-t-3xl bg-surface">
              <View className="items-center" style={{padding: S.space.md}}>
                <View
                  className="rounded-full bg-neutral-200"
                  style={{width: S.space['2xl'], height: 4}}
                />
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={{
                  padding: S.space.lg,
                  paddingTop: 0,
                  gap: S.space.lg,
                }}>
                {service.image ? (
                  <View
                    className="overflow-hidden rounded-2xl bg-neutral-100"
                    style={{height: moderateScale(176)}}>
                    <Image
                      source={{uri: service.image}}
                      className="h-full w-full"
                      resizeMode="cover"
                    />
                  </View>
                ) : null}

                <View style={{gap: S.space.sm}}>
                  <View
                    className="flex-row flex-wrap items-center"
                    style={{gap: S.space.sm}}>
                    <Text
                      className="flex-shrink text-neutral-900"
                      style={{fontSize: S.fs.lg, fontWeight: '700'}}>
                      {service.name}
                    </Text>

                    {service.badge ? (
                      <View
                        className="rounded-lg border border-warning-100 bg-warning-50"
                        style={{
                          paddingHorizontal: S.space.sm,
                          paddingVertical: S.space.xs / 1.5,
                        }}>
                        <Text
                          className="text-warning-700"
                          style={{fontSize: S.fs.xs, fontWeight: '700'}}>
                          {service.badge}
                        </Text>
                      </View>
                    ) : null}
                  </View>

                  <View className="flex-row flex-wrap items-center" style={{gap: S.space.md}}>
                    <View className="flex-row items-center" style={{gap: S.space.xs}}>
                      <Icon
                        name="time-outline"
                        size={S.icon.xs + 2}
                        color={colors.neutral[400]}
                      />
                      <Text className="text-neutral-400" style={{fontSize: S.fs.xs}}>
                        {service.duration}
                      </Text>
                    </View>

                    <View className="flex-row items-center" style={{gap: S.space.xs}}>
                      <Icon
                        name="location-outline"
                        size={S.icon.xs + 2}
                        color={colors.neutral[400]}
                      />
                      <Text className="text-neutral-400" style={{fontSize: S.fs.xs}}>
                        {service.serviceMode === 'both'
                          ? 'Home and Salon'
                          : `${service.serviceMode} only`}
                      </Text>
                    </View>
                  </View>
                </View>

                <Text
                  className="text-neutral-500"
                  style={{fontSize: S.fs.sm, lineHeight: S.fs.lg + 4}}>
                  A premium service tailored for you. Our professionals focus on
                  comfort, hygiene, and high-quality products suited to your
                  needs.
                </Text>

                <View
                  className="rounded-2xl bg-primary-50"
                  style={{padding: S.space.lg, gap: S.space.md}}>
                  <Text
                    className="text-neutral-700"
                    style={{
                      fontSize: S.fs.xs,
                      fontWeight: '600',
                      letterSpacing: 1,
                      textTransform: 'uppercase',
                    }}>
                    Pricing
                  </Text>

                  {service.salonPrice != null ? (
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center" style={{gap: S.space.xs}}>
                        <Icon
                          name="storefront-outline"
                          size={S.icon.xs + 2}
                          color={colors.primary[600]}
                        />
                        <Text className="text-neutral-600" style={{fontSize: S.fs.sm}}>
                          At Salon
                        </Text>
                      </View>
                      <Text
                        className="text-neutral-900"
                        style={{fontSize: S.fs.sm, fontWeight: '700'}}>
                        {formatCurrency(service.salonPrice)}
                      </Text>
                    </View>
                  ) : null}

                  {service.homePrice != null ? (
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center" style={{gap: S.space.xs}}>
                        <Icon
                          name="home-outline"
                          size={S.icon.xs + 2}
                          color={colors.primary[600]}
                        />
                        <Text className="text-neutral-600" style={{fontSize: S.fs.sm}}>
                          At Home
                        </Text>
                      </View>
                      <Text
                        className="text-neutral-900"
                        style={{fontSize: S.fs.sm, fontWeight: '700'}}>
                        {formatCurrency(service.homePrice)}
                      </Text>
                    </View>
                  ) : null}
                </View>

                <View className="flex-row" style={{gap: S.space.md}}>
                  <TouchableOpacity
                    className="flex-1 items-center rounded-xl border border-neutral-200 bg-base"
                    style={{paddingVertical: S.space.lg}}
                    activeOpacity={0.75}
                    onPress={() => setModalVisible(false)}>
                    <Text
                      className="text-neutral-500"
                      style={{fontSize: S.fs.sm, fontWeight: '600'}}>
                      Close
                    </Text>
                  </TouchableOpacity>

                  {!isUnavailable ? (
                    <TouchableOpacity
                      className="flex-1 items-center rounded-xl bg-primary-600"
                      style={{paddingVertical: S.space.lg}}
                      activeOpacity={0.82}
                      onPress={() => {
                        onAdd(service);
                        setModalVisible(false);
                      }}>
                      <Text
                        className="text-white"
                        style={{fontSize: S.fs.sm, fontWeight: '700'}}>
                        {isInCart ? 'Added' : 'Add to Cart'}
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </ScrollView>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
