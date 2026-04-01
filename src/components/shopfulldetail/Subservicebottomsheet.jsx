import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  PanResponder,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {S, getThemeColors} from '../../theme';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.72;
const DRAG_THRESHOLD = 80;
const SUB_IMAGE_SIZE = S.size.avatarMd + S.space.xs;
const CHECKBOX_SIZE = S.icon.sm + S.space.xs;

const DUMMY_SUB_SERVICES = {
  s1: [
    {
      _id: 's1-a',
      name: 'Women Cut',
      duration: '20 mins',
      price: 250,
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=200',
    },
    {
      _id: 's1-b',
      name: 'Men Cut',
      duration: '15 mins',
      price: 200,
      image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=200',
    },
    {
      _id: 's1-c',
      name: 'Blow Dry',
      duration: '20 mins',
      price: 300,
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200',
    },
    {_id: 's1-d', name: 'Trim and Style', duration: '15 mins', price: 150, image: null},
  ],
  s2: [
    {_id: 's2-a', name: 'Deep Conditioning', duration: '20 mins', price: 350, image: null},
    {
      _id: 's2-b',
      name: 'Keratin Treatment',
      duration: '30 mins',
      price: 600,
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200',
    },
  ],
  s3: [
    {_id: 's3-a', name: 'Global Color', duration: '45 mins', price: 800, image: null},
    {_id: 's3-b', name: 'Highlights', duration: '60 mins', price: 1200, image: null},
    {
      _id: 's3-c',
      name: 'Balayage',
      duration: '90 mins',
      price: 2000,
      image: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=200',
    },
  ],
};

const getSubServices = serviceId => DUMMY_SUB_SERVICES[serviceId] || [];
const formatCurrency = value => `Rs. ${Number(value || 0).toLocaleString('en-IN')}`;

function SubServiceItem({item, selected, onToggle, colors}) {
  return (
    <TouchableOpacity
      className={`flex-row items-center rounded-2xl border ${
        selected
          ? 'border-primary-600 bg-primary-50'
          : 'border-neutral-100 bg-base'
      }`}
      style={{padding: S.space.md, gap: S.space.md}}
      onPress={() => onToggle(item)}
      activeOpacity={0.8}>
      {item.image ? (
        <Image
          source={{uri: item.image}}
          style={{
            width: SUB_IMAGE_SIZE,
            height: SUB_IMAGE_SIZE,
            borderRadius: S.radius.md,
          }}
        />
      ) : (
        <View
          className="items-center justify-center rounded-2xl bg-primary-50"
          style={{width: SUB_IMAGE_SIZE, height: SUB_IMAGE_SIZE}}>
          <Icon name="cut-outline" size={S.icon.md} color={colors.primary[600]} />
        </View>
      )}

      <View className="flex-1" style={{gap: S.space.xs}}>
        <Text
          className="text-neutral-900"
          style={{fontSize: S.fs.sm, fontWeight: '600'}}>
          {item.name}
        </Text>
        <Text className="text-neutral-400" style={{fontSize: S.fs.xs}}>
          {item.duration}
        </Text>
      </View>

      <View className="items-end" style={{gap: S.space.xs}}>
        <Text
          className="text-primary-600"
          style={{fontSize: S.fs.sm, fontWeight: '700'}}>
          {formatCurrency(item.price)}
        </Text>

        <View
          className={`items-center justify-center rounded-lg border-2 ${
            selected
              ? 'border-primary-600 bg-primary-600'
              : 'border-neutral-300 bg-base'
          }`}
          style={{width: CHECKBOX_SIZE, height: CHECKBOX_SIZE}}>
          {selected ? (
            <Icon name="checkmark" size={S.icon.xs + 2} color={colors.white} />
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function SubServiceBottomSheet({
  visible,
  service,
  onDismiss,
  onConfirm,
}) {
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const translateY = useRef(new Animated.Value(SHEET_HEIGHT)).current;
  const [selected, setSelected] = useState([]);
  const subServices = service ? getSubServices(service._id) : [];

  const open = () =>
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      damping: 22,
      stiffness: 200,
    }).start();

  const close = callback =>
    Animated.timing(translateY, {
      toValue: SHEET_HEIGHT,
      duration: 260,
      useNativeDriver: true,
    }).start(() => callback?.());

  useEffect(() => {
    if (visible) {
      setSelected([]);
      open();
    } else {
      translateY.setValue(SHEET_HEIGHT);
    }
  }, [translateY, visible]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 5,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > DRAG_THRESHOLD) {
          close(onDismiss);
        } else {
          open();
        }
      },
    }),
  ).current;

  const toggleItem = item => {
    setSelected(previous =>
      previous.find(subService => subService._id === item._id)
        ? previous.filter(subService => subService._id !== item._id)
        : [...previous, item],
    );
  };

  const totalPrice = selected.reduce((sum, item) => sum + item.price, 0);

  const handleConfirm = () => {
    close(() => onConfirm(selected));
  };

  const handleDismiss = () => {
    close(onDismiss);
  };

  if (!visible && !service) {
    return null;
  }

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={handleDismiss}>
      <Pressable className="absolute inset-0 bg-black/45" onPress={handleDismiss} />

      <Animated.View
        className="absolute bottom-0 left-0 right-0 rounded-t-3xl border-t border-neutral-100 bg-surface shadow-lg"
        style={{height: SHEET_HEIGHT, transform: [{translateY}]}}>
        <View {...panResponder.panHandlers} className="items-center" style={{padding: S.space.md}}>
          <View
            className="rounded-full bg-neutral-200"
            style={{width: S.space['2xl'], height: 4}}
          />
        </View>

        <View style={{paddingHorizontal: S.space.lg, gap: S.space.xs}}>
          <View className="flex-row items-center justify-between">
            <View style={{gap: S.space.xs / 2}}>
              <Text
                className="text-neutral-900"
                style={{fontSize: S.fs.lg, fontWeight: '700'}}>
                {service?.name}
              </Text>
              <Text className="text-neutral-400" style={{fontSize: S.fs.xs}}>
                {subServices.length} options | {service?.duration}
              </Text>
            </View>

            <TouchableOpacity
              className="items-center justify-center rounded-full bg-neutral-100"
              style={{width: S.icon.lg + S.space.sm, height: S.icon.lg + S.space.sm}}
              onPress={handleDismiss}
              activeOpacity={0.75}>
              <Icon name="close" size={S.icon.sm} color={colors.neutral[600]} />
            </TouchableOpacity>
          </View>

          <Text className="text-neutral-400" style={{fontSize: S.fs.xs}}>
            Select one or more add-ons for this service.
          </Text>
        </View>

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: S.space.lg,
            paddingTop: S.space.md,
            paddingBottom: S.space.lg,
            gap: S.space.sm,
          }}>
          {subServices.length > 0 ? (
            subServices.map(item => (
              <SubServiceItem
                key={item._id}
                item={item}
                selected={!!selected.find(subService => subService._id === item._id)}
                onToggle={toggleItem}
                colors={colors}
              />
            ))
          ) : (
            <View className="items-center" style={{padding: S.space['5xl'], gap: S.space.xs}}>
              <Text
                className="text-neutral-500"
                style={{fontSize: S.fs.sm, fontWeight: '600'}}>
                No sub-services available.
              </Text>
              <Text className="text-neutral-400" style={{fontSize: S.fs.xs}}>
                This service will be added as-is.
              </Text>
            </View>
          )}
        </ScrollView>

        <View
          className="border-t border-neutral-100 bg-surface"
          style={{padding: S.space.lg, paddingBottom: S.space['2xl'], gap: S.space.sm}}>
          {selected.length > 0 ? (
            <View className="flex-row items-center justify-between">
              <Text
                className="text-neutral-500"
                style={{fontSize: S.fs.xs, fontWeight: '500'}}>
                {selected.length} selected
              </Text>
              <Text
                className="text-primary-600"
                style={{fontSize: S.fs.sm, fontWeight: '700'}}>
                {formatCurrency(totalPrice)}
              </Text>
            </View>
          ) : null}

          <TouchableOpacity
            className="items-center rounded-2xl bg-primary-600"
            style={{paddingVertical: S.space.lg}}
            onPress={handleConfirm}
            activeOpacity={0.85}>
            <Text
              className="text-white"
              style={{fontSize: S.fs.md, fontWeight: '700'}}>
              {selected.length > 0
                ? `Add ${selected.length} to Cart`
                : 'Add to Cart'}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
}
