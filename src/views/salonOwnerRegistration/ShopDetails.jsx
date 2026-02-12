import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';

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
    <View>
      <Text className="text-2xl font-bold text-neutral-700">Shop Details</Text>
      <Text className="text-sm text-neutral-400 mt-1">
        Showcase your salon to customers
      </Text>

      {/* Shop Images */}
      <Text className="text-base font-semibold text-neutral-700 mt-lg">
        Shop Images *
      </Text>
      <Text className="text-sm text-neutral-600 mt-xs">
        Upload 1-4 high-quality images of your salon
      </Text>

      <View className="flex-row flex-wrap gap-sm mt-sm">
        {galleryImages.map((image, index) => (
          <TouchableOpacity
            key={index}
            className="w-[calc(50%-6px)] aspect-square bg-neutral-100 rounded-input items-center justify-center border-2 border-dashed border-neutral-300"
            onPress={() => handleUploadShopImage(index)}
          >
            {image ? (
              <Image
                source={{ uri: image }}
                className="w-full h-full rounded-input"
                resizeMode="cover"
              />
            ) : (
              <Icon name="image" size={40} color="#999" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Shop Location */}
      <Text className="text-base font-semibold text-neutral-700 mt-lg">
        Shop Location *
      </Text>
      <Text className="text-sm text-neutral-600 mt-xs">Help customers find you</Text>

      <View className="gap-md mt-sm">
        <View>
          <Text className="text-sm font-semibold text-neutral-700 mb-xs">
            Complete Address *
          </Text>
          <TextInput
            className="bg-neutral-white border border-neutral-200 rounded-input px-md py-sm text-neutral-700"
            placeholder="House No, Area, Road"
            value={completeAddress}
            onChangeText={setCompleteAddress}
          />
        </View>

        <View className="flex-row gap-sm">
          <View className="flex-1">
            <Text className="text-sm font-semibold text-neutral-700 mb-xs">State *</Text>
            <View className="bg-neutral-white border border-neutral-200 rounded-input overflow-hidden">
              <Picker
                selectedValue={state}
                onValueChange={(itemValue) => {
                  setState(itemValue);
                  setCity(''); // Reset city when state changes
                }}
                dropdownIconColor="#7C5FED"
                mode="dropdown"
              >
                <Picker.Item label="Select State" value="" />
                {states.map((s) => (
                  <Picker.Item key={s._id} label={s.name} value={s.code || s._id} />
                ))}
              </Picker>
            </View>
          </View>

          <View className="flex-1">
            <Text className="text-sm font-semibold text-neutral-700 mb-xs">City *</Text>
            <View className="bg-neutral-white border border-neutral-200 rounded-input overflow-hidden">
              {isCitiesLoading ? (
                <View className="flex-row items-center justify-center gap-xs py-md">
                  <ActivityIndicator size="small" color="#7C5FED" />
                  <Text className="text-xs text-neutral-400">Loading Cities...</Text>
                </View>
              ) : (
                <Picker
                  selectedValue={city}
                  onValueChange={setCity}
                  dropdownIconColor="#7C5FED"
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

        <View>
          <Text className="text-sm font-semibold text-neutral-700 mb-xs">Pincode *</Text>
          <TextInput
            className="bg-neutral-white border border-neutral-200 rounded-input px-md py-sm text-neutral-700"
            placeholder="Enter Pincode (6 digits)"
            keyboardType="numeric"
            maxLength={6}
            value={pincode}
            onChangeText={setPincode}
          />
        </View>

        <View>
          <Text className="text-sm text-neutral-600 mb-xs">
            Pin Exact Location on Map (using current coordinates)
          </Text>
          <TouchableOpacity
            className={`border-2 border-dashed rounded-input py-xl items-center justify-center gap-xs ${
              locationSet
                ? 'bg-success/10 border-success'
                : 'bg-neutral-50 border-neutral-300'
            }`}
            onPress={handleSetLocation}
          >
            {locationSet ? (
              <>
                <Icon name="checkmark-circle" size={40} color="#10b981" />
                <Text className="text-sm font-semibold text-success">
                  Location Set ✓
                </Text>
                <Text className="text-xs text-neutral-500 text-center px-md">
                  {locationData.address}, {locationData.city}
                </Text>
              </>
            ) : (
              <>
                <Icon name="location" size={40} color="#999" />
                <Text className="text-sm font-semibold text-neutral-600">
                  Click To Pin your exact location
                </Text>
                <Text className="text-xs text-neutral-400">
                  Ensure address is filled first
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Navigation Buttons */}
      <View className="flex-row gap-sm mt-xl">
        <TouchableOpacity
          className="flex-1 flex-row items-center justify-center gap-xs border border-[#7C5FED] py-md rounded-input"
          onPress={handleBack}
        >
          <Icon name="chevron-back" size={18} color="#7C5FED" />
          <Text className="text-base font-bold text-[#7C5FED]">Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 flex-row items-center justify-center gap-xs bg-[#7C5FED] py-md rounded-input"
          onPress={handleNext}
        >
          <Text className="text-base font-bold text-neutral-white">Next</Text>
          <Icon name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}