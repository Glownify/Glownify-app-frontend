import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import { ReportCard, REPORT_COLORS } from '../../components/reports/ReportKit';
import { getIndividualProfessionalContext } from './utils/individualProfessional';

function DayRow({ item, onToggle, onChange }) {
  return (
    <View className="bg-white rounded-2xl p-4 mb-3">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-sm font-bold text-neutral-800">{item.day}</Text>
          <Text className="text-xs text-neutral-400 mt-0.5">
            {item.enabled ? 'Available for new bookings' : 'Marked unavailable'}
          </Text>
        </View>
        <Switch
          value={item.enabled}
          onValueChange={() => onToggle(item.day)}
          trackColor={{ false: '#e5e7eb', true: '#fecdd3' }}
          thumbColor={item.enabled ? '#e11d48' : '#ffffff'}
        />
      </View>

      <View className="flex-row gap-3 mt-4">
        <View className="flex-1">
          <Text className="text-xs font-semibold text-neutral-400 mb-1">Start</Text>
          <TextInput
            value={item.start}
            editable={item.enabled}
            onChangeText={value => onChange(item.day, 'start', value)}
            placeholder="09:00"
            placeholderTextColor="#9ca3af"
            className="border border-rose-100 rounded-xl px-3 py-3 text-sm text-neutral-800"
            style={{ backgroundColor: item.enabled ? '#fff' : '#f9fafb' }}
          />
        </View>
        <View className="flex-1">
          <Text className="text-xs font-semibold text-neutral-400 mb-1">End</Text>
          <TextInput
            value={item.end}
            editable={item.enabled}
            onChangeText={value => onChange(item.day, 'end', value)}
            placeholder="18:00"
            placeholderTextColor="#9ca3af"
            className="border border-rose-100 rounded-xl px-3 py-3 text-sm text-neutral-800"
            style={{ backgroundColor: item.enabled ? '#fff' : '#f9fafb' }}
          />
        </View>
      </View>
    </View>
  );
}

export default function IndividualAvailabilityScreen({ navigation }) {
  const { user } = useSelector(state => state.auth);
  const professional = useMemo(
    () => getIndividualProfessionalContext(user),
    [user],
  );
  const [availability, setAvailability] = useState(professional.availability);
  const [acceptingHomeService, setAcceptingHomeService] = useState(
    professional.offersHomeService,
  );

  const activeDays = availability.filter(item => item.enabled).length;

  const toggleDay = day => {
    setAvailability(current =>
      current.map(item =>
        item.day === day ? { ...item, enabled: !item.enabled } : item,
      ),
    );
  };

  const changeValue = (day, key, value) => {
    setAvailability(current =>
      current.map(item => (item.day === day ? { ...item, [key]: value } : item)),
    );
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: REPORT_COLORS.bg }} edges={[]}>
      <StatusBar barStyle="dark-content" backgroundColor={REPORT_COLORS.bg} />

      <View
        className="flex-row items-center justify-between px-4 pt-2 pb-3"
        style={{ backgroundColor: REPORT_COLORS.bg }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Icon name="chevron-back" size={26} color={REPORT_COLORS.accent} />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-neutral-800">Schedule</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            Alert.alert('Saved', 'Availability changes are ready to be connected to the API.')
          }
        >
          <Text className="text-sm font-semibold text-rose-500">Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1"
        style={{ backgroundColor: REPORT_COLORS.bg }}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <ReportCard className="mt-1">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-4">
              <Text className="text-xs font-bold text-rose-500 tracking-wider">
                AVAILABILITY SUMMARY
              </Text>
              <Text className="text-2xl font-extrabold text-neutral-800 mt-2">
                {activeDays} active days
              </Text>
              <Text className="text-sm text-neutral-400 mt-1">
                Single-professional schedule mapped with your profile only.
              </Text>
            </View>
            <View className="w-14 h-14 rounded-full bg-rose-100 items-center justify-center">
              <Icon name="calendar-outline" size={26} color={REPORT_COLORS.accent} />
            </View>
          </View>

          <View className="mt-5 bg-rose-50 rounded-2xl px-4 py-3 flex-row items-center justify-between">
            <View className="flex-1 pr-3">
              <Text className="text-sm font-bold text-neutral-800">Home service</Text>
              <Text className="text-xs text-neutral-400 mt-1">
                Allow customers to book at their location.
              </Text>
            </View>
            <Switch
              value={acceptingHomeService}
              onValueChange={setAcceptingHomeService}
              trackColor={{ false: '#e5e7eb', true: '#fecdd3' }}
              thumbColor={acceptingHomeService ? '#e11d48' : '#ffffff'}
            />
          </View>
        </ReportCard>

        <View className="px-4">
          {availability.map(item => (
            <DayRow
              key={item.day}
              item={item}
              onToggle={toggleDay}
              onChange={changeValue}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
