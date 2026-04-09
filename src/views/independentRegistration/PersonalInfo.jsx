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
import {S, theme} from '../../theme';

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
    <View style={{gap: S.space.lg}}>
      <View style={{gap: S.space.xs}}>
        <Text className="font-bold text-neutral-700" style={{fontSize: S.fs.xl}}>
          Personal Information
        </Text>
        <Text className="text-neutral-400" style={{fontSize: S.fs.xs}}>
          Tell us about yourself
        </Text>
      </View>

      {/* Profile Photo */}
      <View className="items-center" style={{gap: S.space.xs}}>
        <View className="relative">
          {profilePhoto ? (
            <Image
              source={{ uri: profilePhoto }}
              className="w-24 h-24 rounded-full"
            />
          ) : (
            <View className="w-24 h-24 rounded-full bg-primary-100 items-center justify-center">
              <Icon name="person" size={40} color={theme.colors.primary[600]} />
            </View>
          )}
          <TouchableOpacity
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary-600 items-center justify-center"
            onPress={handleUploadPhoto}
          >
            <Icon name="camera" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text className="text-neutral-600" style={{fontSize: S.fs.xs}}>
          Upload your profile photo *
        </Text>
      </View>

      {/* Form Fields */}
      <View style={{gap: S.space.md}}>
        <View style={{gap: S.space.xs}}>
          <Text className="text-neutral-600" style={{fontSize: S.fs.xs}}>Full Name *</Text>
          <TextInput
            className="bg-neutral-white border border-neutral-200 rounded-input px-md text-neutral-700"
            style={{paddingVertical: S.space.sm}}
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={setFullName}
            placeholderTextColor="#999"
          />
        </View>

        <View style={{gap: S.space.xs}}>
          <Text className="text-neutral-600" style={{fontSize: S.fs.xs}}>Email Address *</Text>
          <TextInput
            className="bg-neutral-white border border-neutral-200 rounded-input px-md text-neutral-700"
            style={{paddingVertical: S.space.sm}}
            placeholder="Enter your email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
        </View>

        <View style={{gap: S.space.xs}}>
          <Text className="text-neutral-600" style={{fontSize: S.fs.xs}}>Password *</Text>
          <TextInput
            className="bg-neutral-white border border-neutral-200 rounded-input px-md text-neutral-700"
            style={{paddingVertical: S.space.sm}}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#999"
          />
        </View>

        {/* Gender */}
        <View style={{gap: S.space.xs}}>
          <Text className="text-neutral-600" style={{fontSize: S.fs.xs}}>Gender *</Text>
          <View className="flex-row gap-sm">
            {['Male', 'Female', 'Other'].map((option) => (
              <TouchableOpacity
                key={option}
                className={`flex-1 py-sm px-md rounded-input border ${
                  gender === option
                    ? 'bg-primary-100 border-primary-600'
                    : 'bg-neutral-white border-neutral-200'
                }`}
                onPress={() => setGender(option)}
              >
                <Text
                  className={`text-sm font-semibold text-center ${
                    gender === option ? 'text-primary-600' : 'text-neutral-400'
                  }`}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{gap: S.space.xs}}>
          <Text className="text-neutral-600" style={{fontSize: S.fs.xs}}>Contact Number *</Text>
          <TextInput
            className="bg-neutral-white border border-neutral-200 rounded-input px-md text-neutral-700"
            style={{paddingVertical: S.space.sm}}
            placeholder="Enter WhatsApp number"
            value={contact}
            onChangeText={setContact}
            keyboardType="phone-pad"
            placeholderTextColor="#999"
          />
        </View>

        <View style={{gap: S.space.xs}}>
          <Text className="text-neutral-600" style={{fontSize: S.fs.xs}}>
            Professional Experience *
          </Text>
          <TextInput
            className="bg-neutral-white border border-neutral-200 rounded-input px-md text-neutral-700"
            style={{paddingVertical: S.space.sm}}
            placeholder="E.g., 5 years"
            value={experience}
            onChangeText={setExperience}
            placeholderTextColor="#999"
          />
        </View>

        {/* Specialization */}
        <View style={{gap: S.space.sm}}>
          <Text className="text-neutral-600" style={{fontSize: S.fs.xs}}>
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
          <View style={{gap: S.space.xs}}>
            <Text className="font-semibold text-neutral-700" style={{fontSize: S.fs.xs}}>
              Selected Categories:
            </Text>
            {selectedSpecializations.length === 0 ? (
              <Text className="text-neutral-400" style={{fontSize: S.fs.xxs}}>
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
        className="flex-row items-center justify-center gap-xs bg-primary-600 py-md rounded-input"
        onPress={handleNext}
      >
        <Text className="text-base font-bold text-neutral-white">Next</Text>
        <Icon name="arrow-forward" size={18} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}