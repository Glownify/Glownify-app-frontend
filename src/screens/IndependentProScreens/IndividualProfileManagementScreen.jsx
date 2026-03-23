import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import { ReportCard, REPORT_COLORS } from '../../components/reports/ReportKit';
import { getIndividualProfessionalContext } from './utils/individualProfessional';

function SectionTitle({ title, subtitle }) {
  return (
    <View className="mb-3">
      <Text className="text-base font-bold text-neutral-800">{title}</Text>
      {subtitle ? <Text className="text-xs text-neutral-400 mt-0.5">{subtitle}</Text> : null}
    </View>
  );
}

function QuickLink({
  icon,
  label,
  value,
  onPress,
  color = '#e11d48',
  background = '#fff1f2',
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="flex-row items-center py-3 border-b border-rose-50"
    >
      <View
        className="w-10 h-10 rounded-full items-center justify-center mr-3"
        style={{ backgroundColor: background }}
      >
        <Icon name={icon} size={18} color={color} />
      </View>
      <Text className="text-sm font-semibold text-neutral-800 flex-1">{label}</Text>
      {value ? <Text className="text-xs text-neutral-400 mr-2">{value}</Text> : null}
      <Icon name="chevron-forward" size={16} color="#d1d5db" />
    </TouchableOpacity>
  );
}

export default function IndividualProfileManagementScreen({ navigation }) {
  const { user } = useSelector(state => state.auth);
  const professional = useMemo(
    () => getIndividualProfessionalContext(user),
    [user],
  );

  const [displayName, setDisplayName] = useState(professional.displayName);
  const [specialization, setSpecialization] = useState(professional.specialization);
  const [contactNumber, setContactNumber] = useState(professional.contactNumber);
  const [whatsappNumber, setWhatsappNumber] = useState(professional.whatsappNumber);
  const [serviceRadius, setServiceRadius] = useState('10');
  const [bio, setBio] = useState(
    `${professional.displayName} offers one-on-one beauty and grooming appointments with a focus on punctuality, comfort, and repeat-client experience.`,
  );

  const saveProfile = () => {
    Alert.alert(
      'Profile updated',
      'The management form is ready for API wiring. No salon-level fields were touched.',
    );
  };

  const address = [
    professional.location?.address,
    professional.location?.city,
    professional.location?.state,
  ]
    .filter(Boolean)
    .join(', ');

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
        <Text className="text-lg font-bold text-neutral-800">Profile Management</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={saveProfile}>
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
          <View className="items-center">
            <View style={{ position: 'relative' }}>
              {professional.profileImage ? (
                <Image
                  source={{ uri: professional.profileImage }}
                  style={{
                    width: 92,
                    height: 92,
                    borderRadius: 46,
                    borderWidth: 3,
                    borderColor: '#fecdd3',
                  }}
                />
              ) : (
                <View className="w-24 h-24 rounded-full bg-rose-100 items-center justify-center">
                  <Text className="text-2xl font-bold text-rose-500">
                    {displayName.slice(0, 1)}
                  </Text>
                </View>
              )}
              <View className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-rose-500 items-center justify-center border-2 border-white">
                <Icon name="camera-outline" size={16} color="#fff" />
              </View>
            </View>

            <Text className="text-xl font-extrabold text-neutral-800 mt-4">{displayName}</Text>
            <Text className="text-sm text-neutral-400 mt-1">{specialization}</Text>
            <View className="flex-row items-center gap-2 mt-3 bg-rose-50 rounded-full px-4 py-2">
              <Icon name="person-outline" size={14} color={REPORT_COLORS.accent} />
              <Text className="text-xs font-semibold text-rose-500">
                Single-professional profile only
              </Text>
            </View>
          </View>
        </ReportCard>

        <ReportCard>
          <SectionTitle
            title="Professional details"
            subtitle="Keep your public-facing profile updated for customer trust."
          />

          <Text className="text-xs font-semibold text-neutral-400 mb-1">Display name</Text>
          <TextInput
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="Your professional name"
            placeholderTextColor="#9ca3af"
            className="border border-rose-100 rounded-xl px-3 py-3 text-sm text-neutral-800 mb-3"
          />

          <Text className="text-xs font-semibold text-neutral-400 mb-1">Specialization</Text>
          <TextInput
            value={specialization}
            onChangeText={setSpecialization}
            placeholder="Hair, skin, makeup, grooming..."
            placeholderTextColor="#9ca3af"
            className="border border-rose-100 rounded-xl px-3 py-3 text-sm text-neutral-800 mb-3"
          />

          <Text className="text-xs font-semibold text-neutral-400 mb-1">About you</Text>
          <TextInput
            value={bio}
            onChangeText={setBio}
            multiline
            placeholder="Tell customers about your work style and strengths."
            placeholderTextColor="#9ca3af"
            className="border border-rose-100 rounded-xl px-3 py-3 text-sm text-neutral-800"
            style={{ minHeight: 100, textAlignVertical: 'top' }}
          />
        </ReportCard>

        <ReportCard>
          <SectionTitle title="Contact & service area" />

          <Text className="text-xs font-semibold text-neutral-400 mb-1">Primary phone</Text>
          <TextInput
            value={contactNumber}
            onChangeText={setContactNumber}
            placeholder="Phone number"
            placeholderTextColor="#9ca3af"
            className="border border-rose-100 rounded-xl px-3 py-3 text-sm text-neutral-800 mb-3"
          />

          <Text className="text-xs font-semibold text-neutral-400 mb-1">WhatsApp</Text>
          <TextInput
            value={whatsappNumber}
            onChangeText={setWhatsappNumber}
            placeholder="WhatsApp number"
            placeholderTextColor="#9ca3af"
            className="border border-rose-100 rounded-xl px-3 py-3 text-sm text-neutral-800 mb-3"
          />

          <Text className="text-xs font-semibold text-neutral-400 mb-1">Home service radius (km)</Text>
          <TextInput
            value={serviceRadius}
            onChangeText={setServiceRadius}
            placeholder="10"
            placeholderTextColor="#9ca3af"
            keyboardType="numeric"
            className="border border-rose-100 rounded-xl px-3 py-3 text-sm text-neutral-800"
          />

          {address ? (
            <View className="mt-4 bg-rose-50 rounded-2xl px-4 py-3 flex-row items-start">
              <Icon name="location-outline" size={18} color={REPORT_COLORS.accent} />
              <Text className="text-sm text-neutral-600 ml-2 flex-1">{address}</Text>
            </View>
          ) : null}
        </ReportCard>

        <ReportCard>
          <SectionTitle
            title="Quick management"
            subtitle="Everything here is scoped to your own professional account."
          />

          <QuickLink
            icon="clipboard-outline"
            label="Manage Services"
            value="Self only"
            onPress={() => navigation.navigate('IndividualManageServices')}
          />
          <QuickLink
            icon="calendar-outline"
            label="Manage Availability"
            value="Single schedule"
            onPress={() => navigation.navigate('IndividualAvailability')}
            color="#16a34a"
            background="#ecfdf5"
          />
          <QuickLink
            icon="notifications-outline"
            label="Notification Preferences"
            onPress={() => navigation.navigate('IndividualNotifications')}
            color="#2563eb"
            background="#eff6ff"
          />
          <QuickLink
            icon="bar-chart-outline"
            label="Earnings & Reports"
            onPress={() => navigation.navigate('IndividualEarnings')}
            color="#f97316"
            background="#fff7ed"
          />
        </ReportCard>

        <View className="px-4 mt-2">
          <TouchableOpacity
            onPress={saveProfile}
            className="bg-rose-500 rounded-full py-4 items-center"
            activeOpacity={0.85}
          >
            <Text className="text-white font-bold text-sm">Save Profile Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
