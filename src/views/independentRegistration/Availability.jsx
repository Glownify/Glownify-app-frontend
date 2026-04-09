import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {S, theme} from '../../theme';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function AvailabilityStep({
  selectedDays,
  toggleDay,
  selectAllDays,
  weekdaysOnly,
  timeSlotsState,
  toggleTimeSlot,
  setTimeSlotsState,
  handleBack,
  handleNext,
}) {
  return (
    <View style={{gap: S.space.lg}}>
      <View style={{gap: S.space.xs}}>
        <Text className="text-2xl font-bold text-neutral-700">
          Available Days *
        </Text>
        <Text className="text-sm text-neutral-400">
          Select the days you're available for bookings
        </Text>
      </View>

      {/* Select All / Weekdays Buttons */}
      <View className="flex-row gap-sm">
        <TouchableOpacity
          className="flex-1 border border-primary-600 py-sm rounded-input"
          onPress={selectAllDays}
        >
          <Text className="text-sm font-semibold text-primary-600 text-center">
            Select All Days
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 border border-primary-600 py-sm rounded-input"
          onPress={weekdaysOnly}
        >
          <Text className="text-sm font-semibold text-primary-600 text-center">
            Weekdays Only
          </Text>
        </TouchableOpacity>
      </View>

      {/* Day Toggles */}
      <View className="flex-row flex-wrap gap-sm">
        {DAYS.map((day) => (
          <TouchableOpacity
            key={day}
            className={`flex-1 min-w-[60px] py-sm rounded-input border ${
              selectedDays.includes(day)
                ? 'bg-primary-600 border-primary-600'
                : 'bg-neutral-white border-neutral-200'
            }`}
            onPress={() => toggleDay(day)}
          >
            <Text
              className={`text-sm font-semibold text-center ${
                selectedDays.includes(day)
                  ? 'text-neutral-white'
                  : 'text-neutral-400'
              }`}
            >
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Days Selected Info */}
      <View className="flex-row items-center gap-sm bg-primary-100 p-md rounded-input">
        <Icon name="calendar" size={24} color={theme.colors.primary[600]} />
        <View className="flex-1">
          <Text className="text-sm font-semibold text-neutral-700">
            {selectedDays.length} days selected
          </Text>
          <Text className="text-xs text-neutral-500">
            {selectedDays.length === 0
              ? 'Select at least one day'
              : selectedDays.join(', ')}
          </Text>
        </View>
      </View>

      {/* Available Time Slots */}
      <View style={{gap: S.space.xs}}>
        <Text className="text-2xl font-bold text-neutral-700">
          Available Time Slots *
        </Text>
        <Text className="text-sm text-neutral-400">
          Choose your working hours - tap slots to toggle
        </Text>
      </View>

      <TouchableOpacity
        className="border border-primary-600 py-sm rounded-input"
        onPress={() =>
          setTimeSlotsState(
            timeSlotsState.map((slot) => ({ ...slot, selected: true }))
          )
        }
      >
        <Text className="text-sm font-semibold text-primary-600 text-center">
          Select All Slots
        </Text>
      </TouchableOpacity>

      <View className="gap-sm">
        {timeSlotsState.map((slot) => (
          <TouchableOpacity
            key={slot.id}
            className={`py-md px-md rounded-input border ${
              slot.selected
                ? 'bg-primary-600 border-primary-600'
                : 'bg-neutral-white border-neutral-200'
            }`}
            onPress={() => toggleTimeSlot(slot.id)}
          >
            <Text
              className={`text-sm font-semibold ${
                slot.selected ? 'text-neutral-white' : 'text-neutral-600'
              }`}
            >
              {slot.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Navigation Buttons */}
      <View className="flex-row gap-sm">
        <TouchableOpacity
          className="flex-1 flex-row items-center justify-center gap-xs border border-primary-600 py-md rounded-input"
          onPress={handleBack}
        >
          <Icon name="chevron-back" size={18} color={theme.colors.primary[600]} />
          <Text className="text-base font-bold text-primary-600">Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 flex-row items-center justify-center gap-xs bg-primary-600 py-md rounded-input"
          onPress={handleNext}
        >
          <Text className="text-base font-bold text-neutral-white">Next</Text>
          <Icon name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}