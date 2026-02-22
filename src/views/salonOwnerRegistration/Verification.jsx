import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {LabeledInput} from '../../components/common/Labeledinput';

const ACCENT = '#E91E63';

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
      <Text
        style={{
          fontSize: 26,
          fontWeight: '800',
          color: '#1F2937',
          marginBottom: 4,
        }}
      >
        Verification Documents
      </Text>
      <Text style={{ fontSize: 14, color: '#9CA3AF', marginBottom: 24 }}>
        Upload your ID proof for verification
      </Text>

      {/* ID Proof Type */}
      <View style={{ marginBottom: 16 }}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: '500',
            color: '#374151',
            marginBottom: 6,
          }}
        >
          ID Proof Type <Text style={{ color: ACCENT }}>*</Text>
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FAFAFA',
            borderWidth: 1,
            borderColor: '#E5E7EB',
            borderRadius: 12,
            paddingHorizontal: 14,
            paddingVertical: 14,
          }}
          onPress={() =>
            Alert.alert('Select ID Type', '', [
              ...ID_TYPES.map(type => ({
                text: type,
                onPress: () => setIdType(type),
              })),
              { text: 'Cancel', style: 'cancel' },
            ])
          }
          activeOpacity={0.8}
        >
          <Text
            style={{
              fontSize: 15,
              color: idType ? '#1F2937' : '#C0C0C0',
            }}
          >
            {idType || 'Select ID proof type'}
          </Text>
          <Icon name="chevron-down" size={18} color="#C0C0C0" />
        </TouchableOpacity>
      </View>

      {/* ID Number */}
      <LabeledInput
        label="ID Number"
        required
        placeholder="Enter ID number"
        value={idNumber}
        onChangeText={setIdNumber}
        autoCapitalize="characters"
      />

      {/* Upload ID Proof */}
      <View style={{ marginBottom: 28 }}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: '500',
            color: '#374151',
            marginBottom: 6,
          }}
        >
          Upload ID Proof <Text style={{ color: ACCENT }}>*</Text>
        </Text>
        <TouchableOpacity
          style={{
            borderWidth: 1.5,
            borderStyle: 'dashed',
            borderColor: idImageUrl ? ACCENT : '#D1D5DB',
            borderRadius: 14,
            paddingVertical: 32,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            backgroundColor: idImageUrl ? '#FFF0F5' : '#F9FAFB',
          }}
          onPress={handleUploadIDProof}
          activeOpacity={0.8}
        >
          {idImageUrl ? (
            <View style={{ alignItems: 'center', gap: 8 }}>
              <Image
                source={{ uri: idImageUrl }}
                style={{ width: 130, height: 82, borderRadius: 10 }}
                resizeMode="cover"
              />
              <Text
                style={{ fontSize: 13, fontWeight: '600', color: '#10b981' }}
              >
                ✓ Image Selected
              </Text>
              <Text style={{ fontSize: 12, color: '#9CA3AF' }}>
                Tap to change
              </Text>
            </View>
          ) : (
            <>
              <Icon name="cloud-upload-outline" size={40} color={ACCENT} />
              <Text
                style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}
              >
                Click to upload ID proof
              </Text>
              <Text style={{ fontSize: 12, color: '#9CA3AF' }}>
                PNG, JPG up to 5MB (Front/Back)
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
          <Text style={{ fontSize: 15, fontWeight: '700', color: ACCENT }}>
            Back
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            backgroundColor: isButtonDisabled ? '#F9A8C9' : ACCENT,
            paddingVertical: 16,
            borderRadius: 14,
            shadowColor: ACCENT,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 4,
          }}
          onPress={handleSubmit}
          disabled={isButtonDisabled}
          activeOpacity={0.85}
        >
          {showSpinner ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#fff' }}>
                Submit
              </Text>
              <Icon name="checkmark-circle" size={18} color="#fff" />
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
