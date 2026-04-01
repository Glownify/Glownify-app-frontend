import React, {useState} from 'react';
import {
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {S, getThemeColors} from '../../theme';
import {moderateScale} from '../../utils/responsive';
import ServiceItem from './Serviceitem';

const SORT_OPTIONS = [
  {key: 'default', label: 'Default', icon: 'apps-outline'},
  {key: 'price_asc', label: 'Price: Low to High', icon: 'arrow-up-outline'},
  {key: 'price_desc', label: 'Price: High to Low', icon: 'arrow-down-outline'},
  {key: 'duration_asc', label: 'Shortest First', icon: 'time-outline'},
  {key: 'popular', label: 'Most Popular', icon: 'star-outline'},
];

function parseDurationMins(str = '') {
  const lower = str.toLowerCase();
  const hourMatch = lower.match(/(\d+(\.\d+)?)\s*hour/);
  const minMatch = lower.match(/(\d+)\s*min/);
  let total = 0;

  if (hourMatch) {
    total += parseFloat(hourMatch[1]) * 60;
  }
  if (minMatch) {
    total += parseInt(minMatch[1], 10);
  }

  return total || 0;
}

function effectivePrice(service, mode) {
  if (mode === 'home' && service.homePrice != null) {
    return service.homePrice;
  }

  return service.salonPrice ?? 0;
}

function sortServices(services, sortKey, mode) {
  const list = [...services];

  switch (sortKey) {
    case 'price_asc':
      return list.sort((a, b) => effectivePrice(a, mode) - effectivePrice(b, mode));
    case 'price_desc':
      return list.sort((a, b) => effectivePrice(b, mode) - effectivePrice(a, mode));
    case 'duration_asc':
      return list.sort(
        (a, b) => parseDurationMins(a.duration) - parseDurationMins(b.duration),
      );
    case 'popular':
      return list.sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0));
    default:
      return list;
  }
}

function SortModal({visible, current, onSelect, onClose, colors}) {
  if (!visible) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent>
      <Pressable className="flex-1 justify-end bg-overlay" onPress={onClose}>
        <Pressable onPress={() => {}}>
          <View
            className="rounded-t-3xl border-t border-neutral-100 bg-surface shadow-lg"
            style={{padding: S.space.lg, gap: S.space.lg}}>
            <View className="items-center">
              <View
                className="rounded-full bg-neutral-200"
                style={{width: S.space['2xl'], height: 4}}
              />
            </View>

            <View className="flex-row items-center justify-between">
              <Text
                className="text-neutral-900"
                style={{fontSize: S.fs.lg, fontWeight: '700'}}>
                Sort by
              </Text>
              <TouchableOpacity onPress={onClose} activeOpacity={0.75}>
                <Icon name="close" size={S.icon.sm} color={colors.neutral[500]} />
              </TouchableOpacity>
            </View>

            <View style={{gap: S.space.sm}}>
              {SORT_OPTIONS.map(option => {
                const isSelected = current === option.key;

                return (
                  <TouchableOpacity
                    key={option.key}
                    className={`flex-row items-center rounded-2xl border ${
                      isSelected
                        ? 'border-primary-100 bg-primary-50'
                        : 'border-neutral-100 bg-base'
                    }`}
                    style={{padding: S.space.md, gap: S.space.md}}
                    onPress={() => {
                      onSelect(option.key);
                      onClose();
                    }}
                    activeOpacity={0.8}>
                    <View
                      className={`items-center justify-center rounded-full ${
                        isSelected ? 'bg-primary-600' : 'bg-neutral-100'
                      }`}
                      style={{
                        width: S.icon.lg + S.space.sm,
                        height: S.icon.lg + S.space.sm,
                      }}>
                      <Icon
                        name={option.icon}
                        size={S.icon.sm}
                        color={isSelected ? colors.white : colors.neutral[500]}
                      />
                    </View>

                    <Text
                      className={`flex-1 ${
                        isSelected ? 'text-primary-600' : 'text-neutral-700'
                      }`}
                      style={{
                        fontSize: S.fs.sm,
                        fontWeight: isSelected ? '700' : '500',
                      }}>
                      {option.label}
                    </Text>

                    {isSelected ? (
                      <Icon
                        name="checkmark"
                        size={S.icon.sm}
                        color={colors.primary[600]}
                      />
                    ) : null}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export default function ServicesList({
  services = [],
  selectedMode,
  cartItems,
  onAdd,
}) {
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState('default');
  const [sortModalVisible, setSortModalVisible] = useState(false);

  const activeSortLabel =
    SORT_OPTIONS.find(option => option.key === sortKey)?.label ?? 'Sort';
  const isSorted = sortKey !== 'default';

  const filtered = services.filter(
    service =>
      !(selectedMode === 'home' && service.serviceMode === 'salon') &&
      service.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const displayedServices = sortServices(filtered, sortKey, selectedMode);

  return (
    <View style={{gap: S.space.md}}>
      <View className="flex-row items-center justify-between">
        <Text
          className="text-neutral-900"
          style={{fontSize: S.fs.md, fontWeight: '700'}}>
          All Services
        </Text>

        <View
          className="rounded-xl bg-neutral-100"
          style={{
            paddingHorizontal: S.space.sm + S.space.xs,
            paddingVertical: S.space.xs,
          }}>
          <Text
            className="text-neutral-500"
            style={{fontSize: S.fs.xs, fontWeight: '500'}}>
            {displayedServices.length} total
          </Text>
        </View>
      </View>

      <View className="flex-row items-center" style={{gap: S.space.sm}}>
        <View
          className="flex-1 flex-row items-center rounded-2xl border border-neutral-200 bg-surface"
          style={{
            minHeight: S.space['6xl'],
            paddingHorizontal: S.space.md,
            gap: S.space.sm,
          }}>
          <Icon name="search-outline" size={S.icon.sm} color={colors.neutral[400]} />
          <TextInput
            placeholder="Search for a service..."
            placeholderTextColor={colors.neutral[400]}
            className="flex-1 text-neutral-800"
            style={{fontSize: S.fs.sm, padding: 0}}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 ? (
            <TouchableOpacity onPress={() => setSearchQuery('')} activeOpacity={0.75}>
              <Icon
                name="close-circle"
                size={S.icon.sm}
                color={colors.neutral[300]}
              />
            </TouchableOpacity>
          ) : null}
        </View>

        <TouchableOpacity
          onPress={() => setSortModalVisible(true)}
          className={`flex-row items-center rounded-2xl border ${
            isSorted
              ? 'border-primary-600 bg-primary-600'
              : 'border-primary-100 bg-primary-50'
          }`}
          style={{
            paddingHorizontal: S.space.md,
            paddingVertical: S.space.sm + 1,
            gap: S.space.xs,
          }}
          activeOpacity={0.82}>
          <Icon
            name="options-outline"
            size={S.icon.sm}
            color={isSorted ? colors.white : colors.primary[600]}
          />
          {isSorted ? (
            <Text
              className="text-white"
              style={{fontSize: S.fs.xs, fontWeight: '700'}}>
              {activeSortLabel.split(':')[0]}
            </Text>
          ) : null}
        </TouchableOpacity>
      </View>

      {isSorted ? (
        <View
          className="self-start flex-row items-center rounded-full border border-primary-100 bg-primary-50"
          style={{
            paddingHorizontal: S.space.md,
            paddingVertical: S.space.xs,
            gap: S.space.xs,
          }}>
          <Icon name="funnel" size={S.icon.xs + 1} color={colors.primary[600]} />
          <Text
            className="text-primary-600"
            style={{fontSize: S.fs.xs, fontWeight: '600'}}>
            {activeSortLabel}
          </Text>
          <TouchableOpacity onPress={() => setSortKey('default')} hitSlop={S.space.sm}>
            <Icon
              name="close-circle"
              size={S.icon.xs + 2}
              color={colors.primary[600]}
            />
          </TouchableOpacity>
        </View>
      ) : null}

      <View
        className="overflow-hidden border border-t-2 border-neutral-100 border-t-primary-600 bg-surface shadow-sm"
        style={{borderRadius: S.radius.xl, paddingHorizontal: S.space.lg, elevation: 2}}>
        {displayedServices.length > 0 ? (
          displayedServices.map(service => (
            <ServiceItem
              key={service._id}
              service={service}
              selectedMode={selectedMode}
              cartItems={cartItems}
              onAdd={onAdd}
            />
          ))
        ) : (
          <View className="items-center" style={{padding: S.space['6xl'], gap: S.space.sm}}>
            <View
              className="items-center justify-center rounded-full bg-neutral-100"
              style={{width: moderateScale(56), height: moderateScale(56)}}>
              <Icon name="cut-outline" size={S.icon.lg + 2} color={colors.neutral[300]} />
            </View>
            <Text
              className="text-neutral-400"
              style={{fontSize: S.fs.sm, fontWeight: '500'}}>
              No services found
            </Text>
            <Text className="text-neutral-300" style={{fontSize: S.fs.xs}}>
              {searchQuery
                ? 'Try a different search term'
                : 'Try selecting a different category'}
            </Text>
          </View>
        )}
      </View>

      <SortModal
        visible={sortModalVisible}
        current={sortKey}
        onSelect={setSortKey}
        onClose={() => setSortModalVisible(false)}
        colors={colors}
      />
    </View>
  );
}
