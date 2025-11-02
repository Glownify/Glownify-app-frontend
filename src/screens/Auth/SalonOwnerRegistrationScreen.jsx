import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';

const STEPS = {
  CONTACT: 1,
  SHOP: 2,
  VERIFICATION: 3,
};

const ID_TYPES = ['Aadhar', 'PAN', 'GST Certificate', 'Business License'];

export default function SalonOwnerRegistrationScreen({ navigation }) {
  const [currentStep, setCurrentStep] = useState(STEPS.CONTACT);
  const [loading, setLoading] = useState(false);

  // Step 1: Contact Details
  const [ownershipType, setOwnershipType] = useState('personal');
  const [ownerName, setOwnerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [shopName, setShopName] = useState('');
  const [partners, setPartners] = useState([{ id: 1, name: '', contact: '', whatsapp: '' }]);

  // Step 2: Shop Details
  const [shopImages, setShopImages] = useState([null, null, null, null]);
  const [completeAddress, setCompleteAddress] = useState('');
  const [locationSet, setLocationSet] = useState(false);
  const [salonCategory, setSalonCategory] = useState('');


  // Step 3: Verification
  const [idType, setIdType] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [idProof, setIdProof] = useState(null);

  // Upload shop image
  const handleUploadShopImage = (index) => {
    Alert.alert('Upload Image', 'Camera/Gallery - Mock', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Select',
        onPress: () => {
          const newImages = [...shopImages];
          newImages[index] = `https://via.placeholder.com/150?text=Shop${index + 1}`;
          setShopImages(newImages);
        },
      },
    ]);
  };

  // Add partner
  const addPartner = () => {
    if (partners.length < 2) {
      setPartners([
        ...partners,
        { id: partners.length + 1, name: '', contact: '', whatsapp: '' },
      ]);
    }
  };

  // Update partner
  const updatePartner = (index, field, value) => {
    const newPartners = [...partners];
    newPartners[index][field] = value;
    setPartners(newPartners);
  };

  // Remove partner
  const removePartner = (index) => {
    if (partners.length > 1) {
      setPartners(partners.filter((_, i) => i !== index));
    }
  };

  // Upload ID Proof
  const handleUploadIDProof = () => {
    Alert.alert('Upload ID Proof', 'File upload - Mock', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Select',
        onPress: () => setIdProof('ID_Proof_Document'),
      },
    ]);
  };

  // Set location on map
  const handleSetLocation = () => {
    Alert.alert('Location', 'Map picker - Mock', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Set Location',
        onPress: () => setLocationSet(true),
      },
    ]);
  };

  const handleNext = () => {
    if (currentStep === STEPS.CONTACT) {
      setCurrentStep(STEPS.SHOP);
    } else if (currentStep === STEPS.SHOP) {
      setCurrentStep(STEPS.VERIFICATION);
    }
  };

  const handleBack = () => {
    if (currentStep > STEPS.CONTACT) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation?.goBack();
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Registration submitted! Awaiting verification', [
        {
          text: 'OK',
          onPress: () => navigation?.navigate('Auth'),
        },
      ]);
    }, 2000);
  };

  const getStepStatus = (step) => {
    if (step < currentStep) return 'completed';
    if (step === currentStep) return 'active';
    return 'inactive';
  };

  const renderStepIndicator = (step, label) => {
    const status = getStepStatus(step);
    let bgColor = '#f0f0f0';
    let iconColor = '#999';

    if (status === 'completed') {
      bgColor = '#4CAF50';
      iconColor = '#fff';
    } else if (status === 'active') {
      bgColor = '#7C5FED';
      iconColor = '#fff';
    }

    return (
      <View key={step} style={styles.stepIndicatorContainer}>
        <View style={[styles.stepCircle, { backgroundColor: bgColor }]}>
          {status === 'completed' ? (
            <Icon name="checkmark" size={18} color={iconColor} />
          ) : (
            <Text style={[styles.stepNumber, { color: iconColor }]}>{step}</Text>
          )}
        </View>
        <Text style={styles.stepLabel}>{label}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Icon name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Earn with Us</Text>
          <Text style={styles.headerSubtitle}>(Partner Registration)</Text>
        </View>
      </View>

      {/* Step Indicators */}
      <View style={styles.stepIndicators}>
        {renderStepIndicator(1, 'Contact Details')}
        {renderStepIndicator(2, 'Shop Details')}
        {renderStepIndicator(3, 'Verification')}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* STEP 1: CONTACT DETAILS */}
        {currentStep === STEPS.CONTACT && (
          <View>
            <Text style={styles.sectionTitle}>Contact Details</Text>
            <Text style={styles.sectionSubtitle}>
              Tell us about your business ownership
            </Text>

            {/* Shop Ownership Type */}
            <Text style={styles.label}>Shop Ownership Type</Text>
            <View style={styles.ownershipContainer}>
              <TouchableOpacity
                style={[
                  styles.ownershipButton,
                  ownershipType === 'personal' && styles.ownershipButtonSelected,
                ]}
                onPress={() => setOwnershipType('personal')}
              >
                <Icon
                  name="person"
                  size={20}
                  color={ownershipType === 'personal' ? '#7C5FED' : '#999'}
                />
                <Text
                  style={[
                    styles.ownershipButtonText,
                    ownershipType === 'personal' && styles.ownershipButtonTextSelected,
                  ]}
                >
                  Personal
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.ownershipButton,
                  ownershipType === 'partnership' && styles.ownershipButtonSelected,
                ]}
                onPress={() => setOwnershipType('partnership')}
              >
                <Icon
                  name="people"
                  size={20}
                  color={ownershipType === 'partnership' ? '#7C5FED' : '#999'}
                />
                <Text
                  style={[
                    styles.ownershipButtonText,
                    ownershipType === 'partnership' && styles.ownershipButtonTextSelected,
                  ]}
                >
                  Partnership
                </Text>
              </TouchableOpacity>
            </View>

            {/* Owner Details */}
            <Text style={[styles.label, { marginTop: 20 }]}>Owner Details</Text>

            <Text style={styles.fieldLabel}>Owner Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter owner's full name"
              value={ownerName}
              onChangeText={setOwnerName}
            />

            <Text style={styles.fieldLabel}>Contact Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter contact number"
              value={contactNumber}
              onChangeText={setContactNumber}
              keyboardType="phone-pad"
            />

            <Text style={styles.fieldLabel}>WhatsApp Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter WhatsApp number"
              value={whatsappNumber}
              onChangeText={setWhatsappNumber}
              keyboardType="phone-pad"
            />



            {/* Shop Information */}
            <Text style={[styles.label, { marginTop: 20 }]}>Shop Information</Text>

            <Text style={styles.fieldLabel}>Shop/Salon Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your shop name"
              value={shopName}
              onChangeText={setShopName}
            />

            {/* Salon Category */}
            <Text style={styles.fieldLabel}>Salon Category *</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={salonCategory}
                onValueChange={(value) => setSalonCategory(value)}
                style={styles.picker}
                dropdownIconColor="#7C5FED"
                mode="dropdown"
              >
                <Picker.Item label="Select Category" value="" />
                <Picker.Item label="Men Salon" value="men" />
                <Picker.Item label="Women Salon" value="women" />
                <Picker.Item label="Unisex Salon" value="unisex" />
                <Picker.Item label="Beauty Parlour" value="beautyParlour" />
                <Picker.Item label="Spa" value="spa" />
                <Picker.Item label="Barbershop" value="barbershop" />
              </Picker>
            </View>

            {/* Partners Details (if Partnership) */}
            {ownershipType === 'partnership' && (
              <View style={{ marginTop: 20 }}>
                <Text style={styles.label}>Partners Details</Text>
                {partners.map((partner, index) => (
                  <View key={partner.id} style={styles.partnerCard}>
                    <Text style={styles.partnerTitle}>Partner {index + 1}</Text>

                    <Text style={styles.fieldLabel}>Partner Name</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter owner's full name"
                      value={partner.name}
                      onChangeText={(text) => updatePartner(index, 'name', text)}
                    />

                    <Text style={styles.fieldLabel}>Contact Number</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter contact number"
                      value={partner.contact}
                      onChangeText={(text) => updatePartner(index, 'contact', text)}
                      keyboardType="phone-pad"
                    />

                    <Text style={styles.fieldLabel}>WhatsApp Number</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter WhatsApp number"
                      value={partner.whatsapp}
                      onChangeText={(text) => updatePartner(index, 'whatsapp', text)}
                      keyboardType="phone-pad"
                    />

                    {partners.length > 1 && (
                      <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => removePartner(index)}
                      >
                        <Icon name="trash" size={16} color="#f44336" />
                        <Text style={styles.removeButtonText}>Remove</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ))}

                {partners.length < 2 && (
                  <TouchableOpacity
                    style={styles.addPartnerButton}
                    onPress={addPartner}
                  >
                    <Icon name="add-circle" size={20} color="#7C5FED" />
                    <Text style={styles.addPartnerButtonText}>Add Partner</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            {/* Next Button */}
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>Next</Text>
              <Icon name="arrow-forward" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        )}

        {/* STEP 2: SHOP DETAILS */}
        {currentStep === STEPS.SHOP && (
          <View>
            <Text style={styles.sectionTitle}>Shop Details</Text>
            <Text style={styles.sectionSubtitle}>Showcase your salon to customers</Text>

            {/* Shop Images */}
            <Text style={styles.label}>Shop Images *</Text>
            <Text style={styles.fieldLabel}>
              Upload 3-4 high-quality images of your salon
            </Text>

            <View style={styles.imagesGrid}>
              {shopImages.map((image, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.imageBox}
                  onPress={() => handleUploadShopImage(index)}
                >
                  {image ? (
                    <Image source={{ uri: image }} style={styles.imageBoxImage} />
                  ) : (
                    <Icon name="image" size={40} color="#999" />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Shop Location */}
            <Text style={[styles.label, { marginTop: 20 }]}>Shop Location *</Text>
            <Text style={styles.fieldLabel}>Help customers find you</Text>

            <Text style={styles.fieldLabel}>Complete Address *</Text>
            <TextInput
              style={[styles.input, { minHeight: 80, textAlignVertical: 'top' }]}
              placeholder="Shop No, Building, Street, Area, City, State, Pincode"
              value={completeAddress}
              onChangeText={setCompleteAddress}
              multiline
            />

            <Text style={styles.fieldLabel}>Set Location on Map</Text>
            <TouchableOpacity
              style={styles.mapBox}
              onPress={handleSetLocation}
            >
              {locationSet ? (
                <>
                  <Icon name="checkmark-circle" size={40} color="#4CAF50" />
                  <Text style={styles.mapBoxTextSuccess}>Location Set ✓</Text>
                </>
              ) : (
                <>
                  <Icon name="location" size={40} color="#999" />
                  <Text style={styles.mapBoxText}>Pin your exact location</Text>
                </>
              )}
            </TouchableOpacity>

            {/* Navigation Buttons */}
            <View style={styles.navButtons}>
              <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <Icon name="chevron-back" size={18} color="#7C5FED" />
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>Next</Text>
                <Icon name="arrow-forward" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* STEP 3: VERIFICATION */}
        {currentStep === STEPS.VERIFICATION && (
          <View>
            <Text style={styles.sectionTitle}>Verification Documents</Text>
            <Text style={styles.sectionSubtitle}>Upload your ID proof for verification</Text>

            {/* ID Proof Type */}
            <Text style={styles.label}>ID Proof Type *</Text>
            <TouchableOpacity
              style={styles.dropdownButton}
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
                style={[
                  styles.dropdownButtonText,
                  !idType && styles.dropdownPlaceholder,
                ]}
              >
                {idType || 'Select ID proof type'}
              </Text>
              <Icon name="chevron-down" size={18} color="#999" />
            </TouchableOpacity>

            {/* ID Number */}
            <Text style={styles.label}>ID Number *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter ID number"
              value={idNumber}
              onChangeText={setIdNumber}
            />

            {/* Upload ID Proof */}
            <Text style={styles.label}>Upload ID Proof *</Text>
            <TouchableOpacity
              style={styles.uploadBox}
              onPress={handleUploadIDProof}
            >
              <Icon name="cloud-upload" size={40} color="#7C5FED" />
              {idProof ? (
                <>
                  <Text style={styles.uploadedText}>✓ {idProof}</Text>
                  <Text style={styles.uploadSubtext}>PNG, JPG up to 5MB</Text>
                </>
              ) : (
                <>
                  <Text style={styles.uploadText}>Click to upload ID proof</Text>
                  <Text style={styles.uploadSubtext}>PNG, JPG up to 5MB</Text>
                </>
              )}
            </TouchableOpacity>

            {/* Navigation Buttons */}
            <View style={styles.navButtons}>
              <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <Icon name="chevron-back" size={18} color="#7C5FED" />
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <Text style={styles.submitButtonText}>Submit Registration</Text>
                    <Icon name="checkmark-circle" size={18} color="#fff" />
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#7C5FED',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  picker: {
    height: 50,
    color: '#333',
  },
  stepIndicators: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  stepIndicatorContainer: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: '700',
  },
  stepLabel: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
    width: 80,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#999',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    marginBottom: 16,
  },
  ownershipContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  ownershipButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#f0f0f0',
    alignItems: 'center',
    backgroundColor: '#fff',
    gap: 6,
  },
  ownershipButtonSelected: {
    borderColor: '#7C5FED',
    backgroundColor: '#f5f0ff',
  },
  ownershipButtonText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
  },
  ownershipButtonTextSelected: {
    color: '#7C5FED',
  },
  partnerCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  partnerTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    gap: 4,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginTop: 12,
  },
  removeButtonText: {
    color: '#f44336',
    fontSize: 12,
    fontWeight: '600',
  },
  addPartnerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#7C5FED',
    borderRadius: 8,
    marginBottom: 16,
  },
  addPartnerButtonText: {
    color: '#7C5FED',
    fontSize: 13,
    fontWeight: '600',
  },
  imagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  imageBox: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  imageBoxImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  mapBox: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingVertical: 40,
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  mapBoxText: {
    fontSize: 13,
    color: '#999',
    fontWeight: '600',
  },
  mapBoxTextSuccess: {
    fontSize: 13,
    color: '#4CAF50',
    fontWeight: '600',
  },
  dropdownButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dropdownButtonText: {
    fontSize: 14,
    color: '#333',
  },
  dropdownPlaceholder: {
    color: '#999',
  },
  uploadBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#7C5FED',
    borderStyle: 'dashed',
    paddingVertical: 30,
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  uploadText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  uploadedText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4CAF50',
  },
  uploadSubtext: {
    fontSize: 11,
    color: '#999',
  },
  nextButton: {
    backgroundColor: '#7C5FED',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
    marginVertical: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  navButtons: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 20,
  },
  backButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#7C5FED',
    gap: 4,
  },
  backButtonText: {
    color: '#7C5FED',
    fontSize: 14,
    fontWeight: '700',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#7C5FED',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});