import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';

export default function PersonalInfoStep({
  profilePhoto,
  handleUploadPhoto,
  fullName,
  setFullName,
  email,
  setEmail,
  password,
  setPassword,
  gender,
  setGender,
  contact,
  setContact,
  experience,
  setExperience,
  categories,
  selectedSpecializations,
  handleSpecializationSelect,
  handleNext,
}) {
  return (
    <View>
      <Text className="text-2xl font-bold text-neutral-700">
        Personal Information
      </Text>
      <Text className="text-sm text-neutral-400 mt-1">
        Tell us about yourself
      </Text>

      {/* Profile Photo */}
      <View className="items-center mt-lg">
        <View className="relative">
          {profilePhoto ? (
            <Image
              source={{ uri: profilePhoto }}
              className="w-24 h-24 rounded-full"
            />
          ) : (
            <View className="w-24 h-24 rounded-full bg-[#FCE4EC] items-center justify-center">
              <Icon name="person" size={40} color="#E91E63" />
            </View>
          )}
          <TouchableOpacity
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#E91E63] items-center justify-center"
            onPress={handleUploadPhoto}
          >
            <Icon name="camera" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text className="text-sm text-neutral-600 mt-xs">
          Upload your profile photo *
        </Text>
      </View>

      {/* Form Fields */}
      <View className="gap-md mt-lg">
        <View>
          <Text className="text-sm text-neutral-600 mb-xs">Full Name *</Text>
          <TextInput
            className="bg-neutral-white border border-neutral-200 rounded-input px-md py-sm text-neutral-700"
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={setFullName}
            placeholderTextColor="#999"
          />
        </View>

        <View>
          <Text className="text-sm text-neutral-600 mb-xs">Email Address *</Text>
          <TextInput
            className="bg-neutral-white border border-neutral-200 rounded-input px-md py-sm text-neutral-700"
            placeholder="Enter your email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
        </View>

        <View>
          <Text className="text-sm text-neutral-600 mb-xs">Password *</Text>
          <TextInput
            className="bg-neutral-white border border-neutral-200 rounded-input px-md py-sm text-neutral-700"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#999"
          />
        </View>

        {/* Gender */}
        <View>
          <Text className="text-sm text-neutral-600 mb-xs">Gender *</Text>
          <View className="flex-row gap-sm">
            {['Male', 'Female', 'Other'].map((option) => (
              <TouchableOpacity
                key={option}
                className={`flex-1 py-sm px-md rounded-input border ${
                  gender === option
                    ? 'bg-[#FCE4EC] border-[#E91E63]'
                    : 'bg-neutral-white border-neutral-200'
                }`}
                onPress={() => setGender(option)}
              >
                <Text
                  className={`text-sm font-semibold text-center ${
                    gender === option ? 'text-[#E91E63]' : 'text-neutral-400'
                  }`}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View>
          <Text className="text-sm text-neutral-600 mb-xs">Contact Number *</Text>
          <TextInput
            className="bg-neutral-white border border-neutral-200 rounded-input px-md py-sm text-neutral-700"
            placeholder="Enter WhatsApp number"
            value={contact}
            onChangeText={setContact}
            keyboardType="phone-pad"
            placeholderTextColor="#999"
          />
        </View>

        <View>
          <Text className="text-sm text-neutral-600 mb-xs">
            Professional Experience *
          </Text>
          <TextInput
            className="bg-neutral-white border border-neutral-200 rounded-input px-md py-sm text-neutral-700"
            placeholder="E.g., 5 years"
            value={experience}
            onChangeText={setExperience}
            placeholderTextColor="#999"
          />
        </View>

        {/* Specialization */}
        <View>
          <Text className="text-sm text-neutral-600 mb-xs">
            Specialization Category *
          </Text>
          <View className="bg-neutral-white border border-neutral-200 rounded-input overflow-hidden">
            <Picker
              selectedValue={null}
              onValueChange={handleSpecializationSelect}
            >
              <Picker.Item label="Select Specialization" value={null} />
              {categories?.map((category) => (
                <Picker.Item
                  key={category._id}
                  label={`${category.name} ${category.gender}`}
                  value={category._id}
                />
              ))}
            </Picker>
          </View>

          {/* Selected Categories Display */}
          <View className="mt-sm">
            <Text className="text-sm font-semibold text-neutral-700 mb-xs">
              Selected Categories:
            </Text>
            {selectedSpecializations.length === 0 ? (
              <Text className="text-xs text-neutral-400">
                No categories selected
              </Text>
            ) : (
              <View className="gap-xs">
                {selectedSpecializations.map((id) => {
                  const c = categories.find((cat) => cat._id === id);
                  return (
                    <Text key={id} className="text-sm text-neutral-600">
                      • {c?.name} {c?.gender}
                    </Text>
                  );
                })}
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Next Button */}
      <TouchableOpacity
        className="flex-row items-center justify-center gap-xs bg-[#E91E63] py-md rounded-input mt-xl"
        onPress={handleNext}
      >
        <Text className="text-base font-bold text-neutral-white">Next</Text>
        <Icon name="arrow-forward" size={18} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}