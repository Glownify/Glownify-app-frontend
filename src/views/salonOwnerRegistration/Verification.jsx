import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ID_TYPES = [
  'Aadhaar Card',
  'PAN Card',
  'Driving License',
  'Voter ID',
  'Passport',
];

export default function VerificationStep({
  idType,
  setIdType,
  idNumber,
  setIdNumber,
  idImageUrl,
  handleUploadIDProof,
  handleBack,
  handleSubmit,
  isButtonDisabled,
  showSpinner,
}) {
  return (
    <View>
      <Text className="text-2xl font-bold text-neutral-700">
        Verification Documents
      </Text>
      <Text className="text-sm text-neutral-400 mt-1">
        Upload your ID proof for verification
      </Text>

      <View className="gap-md mt-lg">
        {/* ID Proof Type */}
        <View>
          <Text className="text-sm font-semibold text-neutral-700 mb-xs">
            ID Proof Type *
          </Text>
          <TouchableOpacity
            className="bg-neutral-white border border-neutral-200 rounded-input px-md py-sm flex-row items-center justify-between"
            onPress={() =>
              Alert.alert('Select ID Type', '', [
                ...ID_TYPES.map((type) => ({
                  text: type,
                  onPress: () => setIdType(type),
                })),
                { text: 'Cancel', style: 'cancel' },
              ])
            }
          >
            <Text
              className={`text-sm ${
                idType ? 'text-neutral-700' : 'text-neutral-400'
              }`}
            >
              {idType || 'Select ID proof type'}
            </Text>
            <Icon name="chevron-down" size={18} color="#999" />
          </TouchableOpacity>
        </View>

        {/* ID Number */}
        <View>
          <Text className="text-sm font-semibold text-neutral-700 mb-xs">
            ID Number *
          </Text>
          <TextInput
            className="bg-neutral-white border border-neutral-200 rounded-input px-md py-sm text-neutral-700"
            placeholder="Enter ID number"
            value={idNumber}
            onChangeText={setIdNumber}
          />
        </View>

        {/* Upload ID Proof */}
        <View>
          <Text className="text-sm font-semibold text-neutral-700 mb-xs">
            Upload ID Proof *
          </Text>
          <TouchableOpacity
            className={`border-2 border-dashed rounded-input py-xl items-center justify-center gap-xs ${
              idImageUrl
                ? 'bg-[#F5F0FF] border-[#7C5FED]'
                : 'bg-neutral-50 border-neutral-300'
            }`}
            onPress={handleUploadIDProof}
          >
            {idImageUrl ? (
              <View className="items-center gap-xs">
                <Image
                  source={{ uri: idImageUrl }}
                  className="w-32 h-20 rounded-input"
                  resizeMode="cover"
                />
                <Text className="text-sm font-semibold text-success">
                  ✓ Image Selected
                </Text>
                <Text className="text-xs text-neutral-400">Tap to change</Text>
              </View>
            ) : (
              <>
                <Icon name="cloud-upload" size={40} color="#7C5FED" />
                <Text className="text-sm font-semibold text-neutral-600">
                  Click to upload ID proof
                </Text>
                <Text className="text-xs text-neutral-400">
                  PNG, JPG up to 5MB (Front/Back)
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
          onPress={handleSubmit}
          disabled={isButtonDisabled}
        >
          {showSpinner ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text className="text-base font-bold text-neutral-white">
                Submit Registration
              </Text>
              <Icon name="checkmark-circle" size={18} color="#fff" />
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}