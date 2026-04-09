import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {S, theme} from '../../theme';

const ID_TYPES = ['Aadhar', 'PAN', 'Driving License', 'Passport'];

export default function IndependentVerificationStep({
  idType,
  setIdType,
  idNumber,
  setIdNumber,
  idProof,
  handleUploadIDProof,
  handleBack,
  handleSubmit,
  isSubmitting,
}) {
  return (
    <View style={{gap: S.space.lg}}>
      <View style={{gap: S.space.xs}}>
        <Text className="text-2xl font-bold text-neutral-700">
          Verification Documents
        </Text>
        <Text className="text-sm text-neutral-400">
          Upload ID proof for verification
        </Text>
      </View>

      <View style={{gap: S.space.md}}>
        {/* ID Proof Type */}
        <View style={{gap: S.space.xs}}>
          <Text className="text-sm font-semibold text-neutral-700">
            ID Proof Type *
          </Text>
          <TouchableOpacity
            className="bg-neutral-white border border-neutral-200 rounded-input px-md py-sm flex-row items-center justify-between"
            onPress={() =>
              Alert.alert('Select ID Type', '', [
                ...ID_TYPES.map((type) => ({
                  text: type,
                  onPress: () => {
                    // Map to schema enum
                    let schemaType = type;
                    if (type === 'Driving License' || type === 'Passport') {
                      schemaType = 'DL';
                    } else if (type === 'Aadhar') {
                      schemaType = 'Aadhaar';
                    } else if (type === 'PAN') {
                      schemaType = 'PAN';
                    }
                    setIdType(schemaType);
                  },
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
            <Icon name="chevron-down" size={18} color={theme.colors.neutral[400]} />
          </TouchableOpacity>
        </View>

        {/* ID Number */}
        <View style={{gap: S.space.xs}}>
          <Text className="text-sm font-semibold text-neutral-700">
            ID Number *
          </Text>
          <TextInput
            className="bg-neutral-white border border-neutral-200 rounded-input px-md py-sm text-neutral-700"
            placeholder="Enter ID number"
            value={idNumber}
            onChangeText={setIdNumber}
            placeholderTextColor="#999"
          />
        </View>

        {/* Upload ID Proof */}
        <View style={{gap: S.space.xs}}>
          <Text className="text-sm font-semibold text-neutral-700">
            Upload ID Proof *
          </Text>
          <TouchableOpacity
            className={`border-2 border-dashed rounded-input py-xl items-center justify-center gap-xs ${
              idProof
                ? 'bg-primary-100 border-primary-600'
                : 'bg-neutral-50 border-neutral-300'
            }`}
            onPress={handleUploadIDProof}
          >
            <Icon name="cloud-upload" size={40} color={theme.colors.primary[600]} />
            {idProof ? (
              <>
                <Text className="text-sm font-semibold text-success">
                  ✓ ID Proof Selected
                </Text>
                <Text className="text-xs text-neutral-400">
                  Ready for upload
                </Text>
              </>
            ) : (
              <>
                <Text className="text-sm font-semibold text-neutral-600">
                  Click to upload ID proof
                </Text>
                <Text className="text-xs text-neutral-400">
                  PNG, JPG up to 5MB
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Navigation Buttons */}
      <View className="flex-row gap-sm">
        <TouchableOpacity
          className="flex-1 flex-row items-center justify-center gap-xs border border-primary-600 py-md rounded-input"
          onPress={handleBack}
          disabled={isSubmitting}
        >
          <Icon name="chevron-back" size={18} color={theme.colors.primary[600]} />
          <Text className="text-base font-bold text-primary-600">Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 flex-row items-center justify-center gap-xs bg-primary-600 py-md rounded-input"
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
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