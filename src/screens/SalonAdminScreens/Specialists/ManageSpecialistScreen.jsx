import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AddSpecialistModal from './AddSpecialistScreen';

// ─── DUMMY DATA ───────────────────────────────────────────────────────────────
// 🔁 Replace with: const { specialists, loading, error } = useSelector(state => state.salonAdmin)
// 🔁 Add: useEffect(() => { dispatch(fetchSalonSpecialists()) }, [dispatch])
const DUMMY_SPECIALISTS = [
  {
    _id: '1',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    user: { name: 'Sophia Laurent', phone: '+1 (555) 012-3456' },
    expertise: ['Hair Coloring', 'Balayage', 'Keratin'],
    experienceYears: 8,
    certifications: ["L'Oréal Pro Certified", 'Wella Color Master', 'Redken Ambassador'],
    availability: [
      { day: 'Monday', start: '09:00', end: '17:00' },
      { day: 'Wednesday', start: '10:00', end: '18:00' },
      { day: 'Friday', start: '09:00', end: '15:00' },
      { day: 'Saturday', start: '10:00', end: '16:00' },
    ],
  },
  {
    _id: '2',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    user: { name: 'Marco Ricci', phone: '+1 (555) 987-6543' },
    expertise: ["Men's Cuts", 'Beard Styling', 'Hot Towel Shave'],
    experienceYears: 5,
    certifications: ['Barber Guild Certified', 'Schwarzkopf Pro'],
    availability: [
      { day: 'Tuesday', start: '11:00', end: '19:00' },
      { day: 'Thursday', start: '11:00', end: '19:00' },
      { day: 'Saturday', start: '09:00', end: '17:00' },
    ],
  },
  {
    _id: '3',
    image: '',
    user: { name: 'Aisha Nkemdi', phone: '+1 (555) 234-5678' },
    expertise: ['Braiding', 'Natural Hair', 'Protective Styles'],
    experienceYears: 12,
    certifications: [],
    availability: [
      { day: 'Monday', start: '08:00', end: '16:00' },
      { day: 'Tuesday', start: '08:00', end: '16:00' },
      { day: 'Friday', start: '08:00', end: '14:00' },
    ],
  },
];

const LOADING = false; // 🔁 swap with Redux loading state
const ERROR = null;    // 🔁 swap with Redux error state

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function ManageSpecialistScreen() {
  // 🔁 Replace dummy state with Redux:
  // const dispatch = useDispatch();
  // const { specialists, loading, error } = useSelector(state => state.salonAdmin);
  // useEffect(() => { dispatch(fetchSalonSpecialists()); }, [dispatch]);
  const specialists = DUMMY_SPECIALISTS;
  const loading = LOADING;
  const error = ERROR;

  const [expandedId, setExpandedId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const toggleExpand = (id) => setExpandedId(expandedId === id ? null : id);

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Specialist',
      'Are you sure you want to remove this specialist?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // dispatch(deleteSpecialist(id));
            Alert.alert('Success', 'Specialist removed');
          },
        },
      ]
    );
  };

  // ── Availability Row ──────────────────────────────────────────────────────
  const renderAvailabilityDay = (day) => (
    <View
      key={day.day}
      className="flex-row justify-between items-center py-xs border-b border-neutral-100"
    >
      <Text className="text-xs font-semibold text-neutral-700 w-24">
        {day.day}
      </Text>
      <Text className="text-xs text-neutral-500 bg-neutral-white px-3 py-0.5 rounded-button border border-neutral-200">
        {day.start} – {day.end}
      </Text>
    </View>
  );

  // ── Specialist Card ───────────────────────────────────────────────────────
  const renderSpecialistCard = (specialist) => (
    <View
      key={specialist._id}
      className="bg-neutral-white rounded-card p-md mb-sm shadow-card border border-neutral-100"
    >
      {/* Card Header */}
      <View className="flex-row mb-lg">
        <Image
          source={{
            uri:
              specialist.image && specialist.image.trim() !== ''
                ? specialist.image
                : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          }}
          className="w-20 h-20 rounded-avatar bg-neutral-200"
          style={{ borderWidth: 2, borderColor: '#A3DBE3' }} // teal-200
        />

        <View className="flex-1 ml-sm justify-center gap-y-0.5">
          <Text className="text-base font-bold text-neutral-900">
            {specialist.user?.name || 'Unnamed Specialist'}
          </Text>

          <Text className="text-xs font-medium text-teal-600">
            {specialist.user?.phone || 'N/A'}
          </Text>

          <Text
            className="text-xs font-semibold text-teal-500"
            numberOfLines={1}
          >
            {specialist.expertise?.join(' · ') || 'No expertise'}
          </Text>

          <View className="flex-row items-center gap-x-1 mt-1">
            <Icon name="briefcase-outline" size={12} color="#156778" />
            <Text className="text-xs text-neutral-500">
              {specialist.experienceYears || 0} yrs exp
            </Text>
          </View>
        </View>
      </View>

      {/* Certifications */}
      <View className="mb-sm">
        <Text className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-xs">
          Certifications
        </Text>

        {specialist.certifications.length === 0 ? (
          <Text className="text-xs text-neutral-300">None on file</Text>
        ) : (
          <View className="flex-row flex-wrap gap-1.5">
            {specialist.certifications.map((cert, idx) => (
              <View
                key={idx}
                className="flex-row items-center bg-teal-50 border border-teal-100 px-xs py-1 rounded-button gap-x-1"
              >
                <Icon name="checkmark-circle" size={12} color="#156778" />
                <Text className="text-xs font-semibold text-teal-600">
                  {cert}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Availability Toggle */}
      <TouchableOpacity
        className="flex-row justify-between items-center py-sm border-t border-b border-neutral-100 my-sm"
        onPress={() => toggleExpand(specialist._id)}
        activeOpacity={0.7}
      >
        <Text className="text-xs font-bold text-teal-600">
          {expandedId === specialist._id ? 'Hide' : 'Show'} Availability
        </Text>
        <View className="flex-row items-center gap-x-1">
          <Text className="text-xs text-neutral-400">
            {specialist.availability.length} days
          </Text>
          <Icon
            name={
              expandedId === specialist._id ? 'chevron-up' : 'chevron-down'
            }
            size={16}
            color="#156778"
          />
        </View>
      </TouchableOpacity>

      {/* Availability Expanded */}
      {expandedId === specialist._id && (
        <View className="bg-neutral-50 rounded-2xl p-sm mb-sm border border-neutral-100">
          <Text className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-xs">
            Weekly Schedule
          </Text>
          {specialist.availability.length === 0 ? (
            <Text className="text-xs text-neutral-300">No schedule set</Text>
          ) : (
            specialist.availability.map(renderAvailabilityDay)
          )}
        </View>
      )}

      {/* Remove Button */}
      <TouchableOpacity
        className="flex-row bg-error py-sm rounded-input justify-center items-center gap-x-2 mt-xs"
        onPress={() => handleDelete(specialist._id)}
        activeOpacity={0.8}
      >
        <Icon name="trash-outline" size={15} color="#fff" />
        <Text className="text-sm font-bold text-neutral-white">
          Remove Specialist
        </Text>
      </TouchableOpacity>
    </View>
  );

  // ── Screen ────────────────────────────────────────────────────────────────
  return (
    <View className="flex-1 bg-[#fff1f2]">

      {/* Header */}
      <View className="bg-primary-500 px-md pt-xl pb-lg flex-row items-start justify-between">
        <View>
          <Text className="text-2xl font-bold text-neutral-white">
            Specialists
          </Text>
          <Text className="text-xs text-teal-100 mt-1">
            {specialists.length} team members
          </Text>
        </View>

        {!error && !loading && (
          <TouchableOpacity
            className="flex-row items-center bg-white/20 border border-white/30 rounded-input px-sm py-xs gap-x-1.5"
            onPress={() => setShowAddModal(true)}
            activeOpacity={0.8}
          >
            <Icon name="add-circle-outline" size={18} color="#fff" />
            <Text className="text-neutral-white font-bold text-sm">Add</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Body */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#156778" />
        </View>

      ) : error ? (
        <View className="flex-1 justify-center items-center px-xl">
          <Icon name="alert-circle-outline" size={52} color="#ef4444" />
          <Text className="text-error text-center text-sm mt-sm">{error}</Text>
        </View>

      ) : (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {specialists.length === 0 ? (
            <View className="flex-1 justify-center items-center py-16">
              <Icon name="person-outline" size={52} color="#d1d5db" />
              <Text className="text-neutral-400 text-base mt-sm">
                No specialists yet
              </Text>
            </View>
          ) : (
            specialists.map(renderSpecialistCard)
          )}
        </ScrollView>
      )}

      {/* Add Specialist Modal */}
      <AddSpecialistModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </View>
  );
}