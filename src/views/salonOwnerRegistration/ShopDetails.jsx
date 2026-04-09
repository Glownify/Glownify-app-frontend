import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import {LabeledInput} from '../../components/common/Labeledinput';
import {S, theme} from '../../theme';

const ACCENT = theme.colors.primary[600]; 

export default function ShopDetailsStep({
  galleryImages,
  handleUploadShopImage,
  completeAddress,
  setCompleteAddress,
  state,
  setState,
  city,
  setCity,
  states,
  citiesByState,
  isCitiesLoading,
  pincode,
  setPincode,
  locationSet,
  locationData,
  handleSetLocation,
  handleBack,
  handleNext,
}) {
  return (
    <View style={{gap: S.space.lg}}>
      <View style={{gap: S.space.xs}}>
        <Text style={{ fontSize: 26, fontWeight: '800', color: '#1F2937' }}>
          Shop Details
        </Text>
        <Text style={{ fontSize: 14, color: '#9CA3AF' }}>
          Showcase your salon to customers
        </Text>
      </View>

      {/* Shop Images */}
      <Text style={{ fontSize: 15, fontWeight: '700', color: '#1F2937' }}>
        Shop Images <Text style={{ color: ACCENT }}>*</Text>
      </Text>
      <Text style={{ fontSize: 13, color: '#6B7280' }}>
        Upload 1–4 high-quality images of your salon
      </Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
        {galleryImages.map((image, index) => (
          <TouchableOpacity
            key={index}
            style={{
              width: '47%',
              aspectRatio: 1,
              backgroundColor: '#F9FAFB',
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1.5,
              borderStyle: 'dashed',
              borderColor: image ? ACCENT : '#D1D5DB',
              overflow: 'hidden',
            }}
            onPress={() => handleUploadShopImage(index)}
            activeOpacity={0.8}
          >
            {image ? (
              <Image
                source={{ uri: image }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            ) : (
              <Icon name="image-outline" size={36} color="#D1D5DB" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Shop Location */}
      <Text style={{ fontSize: 15, fontWeight: '700', color: '#1F2937' }}>
        Shop Location <Text style={{ color: ACCENT }}>*</Text>
      </Text>
      <Text style={{ fontSize: 13, color: '#6B7280' }}>
        Help customers find you
      </Text>

      <View style={{gap: S.space.lg}}>
        <LabeledInput
          label="Complete Address"
          required
          placeholder="House No, Area, Road"
          value={completeAddress}
          onChangeText={setCompleteAddress}
          autoCapitalize="words"
        />

        {/* State & City row */}
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 13, fontWeight: '500', color: '#374151' }}>
              State <Text style={{ color: ACCENT }}>*</Text>
            </Text>
            <View
              style={{
                backgroundColor: '#FAFAFA',
                borderWidth: 1,
                borderColor: '#E5E7EB',
                borderRadius: 12,
                overflow: 'hidden',
              }}
            >
              <Picker
                selectedValue={state}
                onValueChange={(itemValue) => {
                  setState(itemValue);
                  setCity('');
                }}
                dropdownIconColor={ACCENT}
                mode="dropdown"
              >
                <Picker.Item label="Select State" value="" />
                {states.map((s) => (
                  <Picker.Item key={s._id} label={s.name} value={s.code || s._id} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 13, fontWeight: '500', color: '#374151' }}>
              City <Text style={{ color: ACCENT }}>*</Text>
            </Text>
            <View
              style={{
                backgroundColor: '#FAFAFA',
                borderWidth: 1,
                borderColor: '#E5E7EB',
                borderRadius: 12,
                overflow: 'hidden',
              }}
            >
              {isCitiesLoading ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 14 }}>
                  <ActivityIndicator size="small" color={ACCENT} />
                  <Text style={{ fontSize: 12, color: '#9CA3AF' }}>Loading...</Text>
                </View>
              ) : (
                <Picker
                  selectedValue={city}
                  onValueChange={setCity}
                  dropdownIconColor={ACCENT}
                  mode="dropdown"
                  enabled={!!state && citiesByState.length > 0}
                >
                  <Picker.Item
                    label={
                      !state
                        ? 'Select State First'
                        : citiesByState.length === 0
                        ? 'No Cities Found'
                        : 'Select City'
                    }
                    value=""
                  />
                  {citiesByState.map((c) => (
                    <Picker.Item key={c._id} label={c.name} value={c._id} />
                  ))}
                </Picker>
              )}
            </View>
          </View>
        </View>

        <LabeledInput
          label="Pincode"
          required
          placeholder="Enter Pincode (6 digits)"
          value={pincode}
          onChangeText={setPincode}
          keyboardType="numeric"
          maxLength={6}
        />
      </View>

      {/* Pin on Map */}
      <View style={{gap: S.space.sm}}>
        <Text style={{ fontSize: 13, color: '#6B7280' }}>
          Pin Exact Location on Map (using current coordinates)
        </Text>
        <TouchableOpacity
          style={{
            borderWidth: 1.5,
            borderStyle: 'dashed',
            borderColor: locationSet ? '#10b981' : '#D1D5DB',
            borderRadius: 14,
            paddingVertical: 28,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            backgroundColor: locationSet ? '#F0FDF4' : '#F9FAFB',
          }}
          onPress={handleSetLocation}
          activeOpacity={0.8}
        >
          {locationSet ? (
            <>
              <Icon name="checkmark-circle" size={40} color="#10b981" />
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#10b981' }}>
                Location Set ✓
              </Text>
              <Text style={{ fontSize: 12, color: '#6B7280', textAlign: 'center', paddingHorizontal: 16 }}>
                {locationData.address}, {locationData.city}
              </Text>
            </>
          ) : (
            <>
              <Icon name="location-outline" size={40} color="#D1D5DB" />
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
                Click To Pin your exact location
              </Text>
              <Text style={{ fontSize: 12, color: '#9CA3AF' }}>
                Ensure address is filled first
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Navigation Buttons */}
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            borderWidth: 1.5,
            borderColor: ACCENT,
            paddingVertical: 16,
            borderRadius: 14,
          }}
          onPress={handleBack}
          activeOpacity={0.8}
        >
          <Icon name="chevron-back" size={18} color={ACCENT} />
          <Text style={{ fontSize: 15, fontWeight: '700', color: ACCENT }}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            backgroundColor: ACCENT,
            paddingVertical: 16,
            borderRadius: 14,
            shadowColor: ACCENT,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 4,
          }}
          onPress={handleNext}
          activeOpacity={0.85}
        >
          <Text style={{ fontSize: 15, fontWeight: '700', color: '#fff' }}>Next Step</Text>
          <Icon name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
