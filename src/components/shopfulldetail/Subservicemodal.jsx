import React, {useEffect, useState} from 'react';
import {
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

const formatCurrency = value => `Rs. ${Number(value || 0).toLocaleString('en-IN')}`;

export default function SubServiceModal({
  visible,
  service,
  onDismiss,
  onConfirm,
}) {
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const [selectedSubServices, setSelectedSubServices] = useState([]);

  const subServices = service
    ? [
        {
          _id: `${service._id}-sub1`,
          name: `${service.name} Basic`,
          price: service.salonPrice || 500,
        },
        {
          _id: `${service._id}-sub2`,
          name: `${service.name} Advanced`,
          price: (service.salonPrice || 500) + 200,
        },
        {
          _id: `${service._id}-sub3`,
          name: `${service.name} Premium`,
          price: (service.salonPrice || 500) + 500,
        },
      ]
    : [];

  useEffect(() => {
    if (visible) {
      setSelectedSubServices([]);
    }
  }, [visible]);

  const toggleSelection = subService => {
    setSelectedSubServices(previous =>
      previous.find(item => item._id === subService._id)
        ? previous.filter(item => item._id !== subService._id)
        : [...previous, subService],
    );
  };

  if (!service) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onDismiss}>
      <View className="flex-1 justify-end bg-overlay">
        <Pressable className="flex-1" onPress={onDismiss} />

        <View
          className="rounded-t-3xl border-t border-neutral-100 bg-surface"
          style={{padding: S.space.lg, gap: S.space.lg}}>
          <View className="items-center">
            <View
              className="rounded-full bg-neutral-200"
              style={{width: S.space['2xl'], height: 4}}
            />
          </View>

          <View className="flex-row items-center justify-between">
            <View style={{gap: S.space.xs / 2}}>
              <Text
                className="text-neutral-900"
                style={{fontSize: S.fs.lg, fontWeight: '700'}}>
                Select Options
              </Text>
              <Text className="text-neutral-400" style={{fontSize: S.fs.xs}}>
                Choose sub-services for {service.name}
              </Text>
            </View>

            <TouchableOpacity onPress={onDismiss} activeOpacity={0.75}>
              <Icon name="close" size={S.icon.md} color={colors.neutral[700]} />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{gap: S.space.sm}}>
            {subServices.map(subService => {
              const isSelected = selectedSubServices.some(
                item => item._id === subService._id,
              );

              return (
                <TouchableOpacity
                  key={subService._id}
                  className={`flex-row items-center rounded-2xl border ${
                    isSelected
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-neutral-200 bg-base'
                  }`}
                  style={{padding: S.space.md, gap: S.space.md}}
                  onPress={() => toggleSelection(subService)}
                  activeOpacity={0.8}>
                  <View className="flex-1" style={{gap: S.space.xs / 2}}>
                    <Text
                      className="text-neutral-800"
                      style={{fontSize: S.fs.sm, fontWeight: '600'}}>
                      {subService.name}
                    </Text>
                    <Text
                      className="text-primary-600"
                      style={{fontSize: S.fs.xs, fontWeight: '700'}}>
                      {formatCurrency(subService.price)}
                    </Text>
                  </View>

                  <View
                    className={`items-center justify-center rounded-full border-2 ${
                      isSelected
                        ? 'border-primary-600 bg-primary-600'
                        : 'border-neutral-300 bg-base'
                    }`}
                    style={{width: S.icon.md + 4, height: S.icon.md + 4}}>
                    {isSelected ? (
                      <Icon
                        name="checkmark"
                        size={S.icon.xs + 2}
                        color={colors.white}
                      />
                    ) : null}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View className="border-t border-neutral-100" style={{paddingTop: S.space.lg}}>
            <TouchableOpacity
              className={selectedSubServices.length === 0 ? 'bg-neutral-200' : 'bg-primary-600'}
              style={{
                borderRadius: S.radius.xl,
                paddingVertical: S.space.lg,
                alignItems: 'center',
              }}
              disabled={selectedSubServices.length === 0}
              onPress={() => onConfirm(selectedSubServices)}
              activeOpacity={0.85}>
              <Text
                className={selectedSubServices.length === 0 ? 'text-neutral-400' : 'text-white'}
                style={{fontSize: S.fs.md, fontWeight: '700'}}>
                Add {selectedSubServices.length}{' '}
                {selectedSubServices.length === 1 ? 'item' : 'items'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
