// components/shopfulldetail/Serviceslist.jsx
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  Pressable,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ServiceItem from './Serviceitem';

// ── Sort config ──────────────────────────────────────────────────────────────
const SORT_OPTIONS = [
  { key: 'default',       label: 'Default',        icon: 'apps-outline' },
  { key: 'price_asc',     label: 'Price: Low → High', icon: 'arrow-up-outline' },
  { key: 'price_desc',    label: 'Price: High → Low', icon: 'arrow-down-outline' },
  { key: 'duration_asc',  label: 'Shortest First',  icon: 'time-outline' },
  { key: 'popular',       label: 'Most Popular',    icon: 'star-outline' },
];

/**
 * Parse a duration string like "30 mins", "1 hour", "1.5 hours" → minutes (number)
 */
function parseDurationMins(str = '') {
  const lower = str.toLowerCase();
  const hourMatch = lower.match(/(\d+(\.\d+)?)\s*hour/);
  const minMatch = lower.match(/(\d+)\s*min/);
  let total = 0;
  if (hourMatch) total += parseFloat(hourMatch[1]) * 60;
  if (minMatch) total += parseInt(minMatch[1], 10);
  return total || 0;
}

/**
 * Get the effective display price for a service given the current booking mode.
 */
function effectivePrice(service, mode) {
  if (mode === 'home' && service.homePrice != null) return service.homePrice;
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
      // Put items with badges first as a proxy for popularity
      return list.sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0));
    default:
      return list; // preserve original order
  }
}

// ── Sort popover ─────────────────────────────────────────────────────────────
function SortModal({ visible, current, onSelect, onClose }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }}
        onPress={onClose}
      />
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          justifyContent: 'flex-end',
          pointerEvents: 'box-none',
        }}
      >
        <Pressable onPress={() => {}} style={{ marginHorizontal: 16, marginBottom: 100 }}>
          <View className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
              <Text className="text-sm font-bold text-gray-800">Sort by</Text>
              <TouchableOpacity onPress={onClose}>
                <Icon name="close" size={18} color="#9CA3AF" />
              </TouchableOpacity>
            </View>

            {/* Options */}
            {SORT_OPTIONS.map(option => {
              const selected = current === option.key;
              return (
                <TouchableOpacity
                  key={option.key}
                  onPress={() => {
                    onSelect(option.key);
                    onClose();
                  }}
                  className={`flex-row items-center px-4 py-3.5 gap-3 ${
                    selected ? 'bg-pink-50' : ''
                  }`}
                  activeOpacity={0.7}
                >
                  <View
                    className={`w-8 h-8 rounded-full items-center justify-center ${
                      selected ? 'bg-[#EA8491]' : 'bg-gray-100'
                    }`}
                  >
                    <Icon
                      name={option.icon}
                      size={15}
                      color={selected ? '#fff' : '#6B7280'}
                    />
                  </View>
                  <Text
                    className={`flex-1 text-sm ${
                      selected
                        ? 'text-[#EA8491] font-bold'
                        : 'text-gray-700 font-medium'
                    }`}
                  >
                    {option.label}
                  </Text>
                  {selected && (
                    <Icon name="checkmark" size={16} color="#EA8491" />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </Pressable>
      </View>
    </Modal>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
/**
 * ServicesList
 * Props:
 *   services      Array<service>   — services for the active category
 *   selectedMode  'home' | 'salon'
 *   cartItems     Array<{ _id }>
 *   onAdd         (service) => void
 */
export default function ServicesList({
  services = [],
  selectedMode,
  cartItems,
  onAdd,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState('default');
  const [sortModalVisible, setSortModalVisible] = useState(false);

  const activeSortLabel =
    SORT_OPTIONS.find(o => o.key === sortKey)?.label ?? 'Sort';
  const isSorted = sortKey !== 'default';

  // 1. Filter by mode and search
  const filtered = services.filter(
    s =>
      !(selectedMode === 'home' && s.serviceMode === 'salon') &&
      s.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // 2. Sort
  const displayedServices = sortServices(filtered, sortKey, selectedMode);

  return (
    <View className="mx-4 mt-6">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-base font-bold text-gray-900">All Services</Text>
        <View className="flex-row items-center gap-1.5">
          <View className="bg-gray-100 rounded-lg px-2.5 py-1">
            <Text className="text-gray-500 text-xs font-medium">
              {displayedServices.length} total
            </Text>
          </View>
        </View>
      </View>

      {/* Search & Sort */}
      <View className="flex-row items-center gap-2 mb-4">
        {/* Search input */}
        <View className="flex-1 flex-row items-center bg-white border border-gray-200 rounded-xl px-3 py-2">
          <Icon name="search-outline" size={18} color="#9CA3AF" />
          <TextInput
            placeholder="Search for a service..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 ml-2 text-sm text-gray-800 p-0"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="close-circle" size={16} color="#D1D5DB" />
            </TouchableOpacity>
          )}
        </View>

        {/* Sort button — highlights when a non-default sort is active */}
        <TouchableOpacity
          onPress={() => setSortModalVisible(true)}
          className={`p-2.5 rounded-xl border flex-row items-center gap-1 ${
            isSorted
              ? 'bg-[#EA8491] border-[#EA8491]'
              : 'bg-pink-50 border-pink-100'
          }`}
          activeOpacity={0.8}
        >
          <Icon
            name="options-outline"
            size={17}
            color={isSorted ? '#fff' : '#EA8491'}
          />
          {isSorted && (
            <Text className="text-white text-xs font-bold pr-0.5">
              {SORT_OPTIONS.find(o => o.key === sortKey)?.label.split(':')[0] ?? ''}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Active sort chip */}
      {isSorted && (
        <View className="flex-row items-center mb-3 gap-2">
          <View className="flex-row items-center bg-pink-50 border border-pink-200 rounded-full px-3 py-1 gap-1.5">
            <Icon name="funnel" size={11} color="#EA8491" />
            <Text className="text-[#EA8491] text-xs font-semibold">
              {activeSortLabel}
            </Text>
            <TouchableOpacity onPress={() => setSortKey('default')} hitSlop={8}>
              <Icon name="close-circle" size={13} color="#EA8491" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* List card */}
      <View className="bg-white rounded-2xl border border-slate-100 border-t-2 border-t-pink-500 shadow-sm px-4 overflow-hidden">
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
          <View className="py-10 items-center gap-2">
            <View className="w-14 h-14 rounded-full bg-gray-100 items-center justify-center">
              <Icon name="cut-outline" size={26} color="#D1D5DB" />
            </View>
            <Text className="text-gray-400 text-sm font-medium">
              No services found
            </Text>
            <Text className="text-gray-300 text-xs">
              {searchQuery
                ? 'Try a different search term'
                : 'Try selecting a different category'}
            </Text>
          </View>
        )}
      </View>

      {/* Sort modal */}
      <SortModal
        visible={sortModalVisible}
        current={sortKey}
        onSelect={setSortKey}
        onClose={() => setSortModalVisible(false)}
      />
    </View>
  );
}