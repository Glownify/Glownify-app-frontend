import React, { useState, useEffect } from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { uploadImageToCloudinary } from '../../api/claudinary';
import { signupSalonOwner } from '../../redux/slices/authSlice';
import { showSnackbar } from '../../redux/slices/snackbarSlice';
import { fetchStates, fetchCitiesByState } from '../../redux/slices/stateCitySlice';

import RegistrationHeader from '../../components/common/RegistrationHeader';
import StepIndicator from '../../components/common/StepIndicator';
import ContactDetailsStep from '../../views/salonOwnerRegistration/ContactDetails';
import ShopDetailsStep from '../../views/salonOwnerRegistration/ShopDetails';
import VerificationStep from '../../views/salonOwnerRegistration/Verification';
import {S} from '../../theme';

const STEPS = { CONTACT: 1, SHOP: 2, VERIFICATION: 3 };

const STEP_CONFIG = [
  { step: 1, title: 'Contact Details' },
  { step: 2, title: 'Shop Details' },
  { step: 3, title: 'Verification' },
];

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regexPhoneNo = /^[6-9]\d{9}$/;

export default function SalonOwnerRegistration({ navigation }) {
  const dispatch = useDispatch();

  const { states, citiesByState, isCitiesLoading } = useSelector(state => state.stateCity);
  const { signUpLoading } = useSelector(state => state.auth);

  const [currentStep, setCurrentStep] = useState(STEPS.CONTACT);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1: Contact Details
  const [ownershipType, setOwnershipType] = useState('personal');
  const [ownerName, setOwnerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerPassword, setOwnerPassword] = useState('');
  const [shopName, setShopName] = useState('');
  const [partners, setPartners] = useState([{ id: 1, name: '', contact: '', whatsapp: '' }]);
  const [salonCategory, setSalonCategory] = useState('');

  // Step 2: Shop Details
  const [galleryImages, setGalleryImages] = useState([null, null]);
  const [completeAddress, setCompleteAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [locationSet, setLocationSet] = useState(false);
  const [locationData, setLocationData] = useState({});
  const [currentLocation, setCurrentLocation] = useState({});

  // Step 3: Verification
  const [idType, setIdType] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [idImageUrl, setIdImageUrl] = useState(null);

  // ── Effects ────────────────────────────────────────────────────
  useEffect(() => { dispatch(fetchStates()); }, [dispatch]);

  useEffect(() => {
    if (state) dispatch(fetchCitiesByState(state));
    else setCity('');
  }, [dispatch, state]);

  useEffect(() => {
    const loadLocation = async () => {
      try {
        const savedLocation = await AsyncStorage.getItem('userLocation');
        if (savedLocation) setCurrentLocation(JSON.parse(savedLocation));
      } catch (error) {
        console.log('❌ Error loading location:', error);
      }
    };
    loadLocation();
  }, []);

  // ── Image Picker ───────────────────────────────────────────────
  const pickImage = async (type, index, isIDProof = false) => {
    const options = { mediaType: 'photo', maxWidth: 800, maxHeight: 800, quality: 0.8 };
    const result = type === 'camera'
      ? await launchCamera(options)
      : await launchImageLibrary(options);

    if (result.assets?.length > 0) {
      const uri = result.assets[0].uri;
      if (isIDProof) {
        setIdImageUrl(uri);
      } else {
        const newImages = [...galleryImages];
        newImages[index] = uri;
        setGalleryImages(newImages);
      }
    }
  };

  const handleUploadShopImage = index => {
    Alert.alert('Upload Image', 'Choose an option', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Camera', onPress: () => pickImage('camera', index, false) },
      { text: 'Gallery', onPress: () => pickImage('gallery', index, false) },
    ]);
  };

  const handleUploadIDProof = () => {
    Alert.alert('Upload ID Proof', 'Choose an option', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Camera', onPress: () => pickImage('camera', null, true) },
      { text: 'Gallery', onPress: () => pickImage('gallery', null, true) },
    ]);
  };

  // ── Partner Management ─────────────────────────────────────────
  const addPartner = () => {
    if (partners.length < 2) {
      setPartners([...partners, { id: partners.length + 1, name: '', contact: '', whatsapp: '' }]);
    }
  };

  const updatePartner = (index, field, value) => {
    const updated = [...partners];
    updated[index][field] = value;
    setPartners(updated);
  };

  const removePartner = index => {
    if (partners.length > 1) setPartners(partners.filter((_, i) => i !== index));
  };

  // ── Location ───────────────────────────────────────────────────
  const handleSetLocation = () => {
    if (!completeAddress || !city || !state || !pincode) {
      dispatch(showSnackbar({ message: 'Please fill complete address details before setting location.', type: 'error' }));
      return;
    }
    if (!currentLocation.longitude || !currentLocation.latitude) {
      Alert.alert('Missing Location', 'Could not get your location coordinates. Please ensure location services are enabled.');
      return;
    }

    const finalStateName = states.find(s => s.code === state || s._id === state)?.name ?? state;
    const finalCityName = citiesByState.find(c => c._id === city)?.name ?? 'Unknown City';

    setLocationData({
      type: 'Point',
      coordinates: [currentLocation.longitude, currentLocation.latitude],
      address: completeAddress,
      city: finalCityName,
      state: finalStateName,
      pincode,
    });
    setLocationSet(true);
    dispatch(showSnackbar({
      message: `Location pinned: Lat ${currentLocation.latitude.toFixed(4)}, Lon ${currentLocation.longitude.toFixed(4)}`,
      type: 'success',
    }));
  };

  // ── Navigation ─────────────────────────────────────────────────
  const handleBack = () => {
    if (currentStep > STEPS.CONTACT) setCurrentStep(currentStep - 1);
    else navigation?.goBack();
  };

  const handleNext = () => {
    if (currentStep === STEPS.CONTACT) {
      if (!ownerName || !ownerEmail || !ownerPassword || !contactNumber || !shopName || !salonCategory) {
        dispatch(showSnackbar({ message: 'Please fill all required fields in Contact Details.', type: 'error' }));
        return;
      }
      if (!regexEmail.test(ownerEmail)) {
        dispatch(showSnackbar({ message: 'Please Enter a Valid Email.', type: 'error' }));
        return;
      }
      if (!regexPhoneNo.test(contactNumber)) {
        dispatch(showSnackbar({ message: 'Please Enter a Valid Contact Number.', type: 'error' }));
        return;
      }
      if (ownershipType === 'partnership' && partners.some(p => !p.name || !p.contact)) {
        dispatch(showSnackbar({ message: 'Please fill in all partner name and contact details.', type: 'error' }));
        return;
      }
      setCurrentStep(STEPS.SHOP);
    } else if (currentStep === STEPS.SHOP) {
      if (galleryImages.filter(Boolean).length < 1)
        return dispatch(showSnackbar({ message: 'Please upload at least 1 salon image.', type: 'error' }));
      if (!locationSet)
        return dispatch(showSnackbar({ message: 'Please set your salon location.', type: 'error' }));
      if (!/^\d{6}$/.test(pincode))
        return dispatch(showSnackbar({ message: 'Please enter a valid 6-digit pincode.', type: 'error' }));
      if (!state || !city)
        return dispatch(showSnackbar({ message: 'Please select a State and a City.', type: 'error' }));
      setCurrentStep(STEPS.VERIFICATION);
    }
  };

  // ── Submit ─────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!idType || !idNumber || !idImageUrl)
      return dispatch(showSnackbar({ message: 'Please complete ID verification.', type: 'error' }));

    setIsSubmitting(true);
    try {
      dispatch(showSnackbar({ message: 'Uploading ID proof...', type: 'info' }));
      const finalIdImageUrl = await uploadImageToCloudinary(idImageUrl);

      const imagesToUpload = galleryImages.filter(Boolean);
      if (imagesToUpload.length > 0)
        dispatch(showSnackbar({ message: `Uploading ${imagesToUpload.length} salon images...`, type: 'info' }));

      const uploadedShopImageUrls = await Promise.all(imagesToUpload.map(uploadImageToCloudinary));

      const salonData = {
        shopName,
        shopType: ownershipType,
        salonCategory,
        galleryImages: uploadedShopImageUrls,
        location: locationData,
        partners: ownershipType === 'partnership' ? partners.map(({ id, ...rest }) => rest) : [],
        contactNumber,
        whatsappNumber,
        governmentId: { idType, idNumber, idImageUrl: finalIdImageUrl },
        city,
      };

      const resultAction = await dispatch(
        signupSalonOwner({ name: ownerName, email: ownerEmail, phone: contactNumber, password: ownerPassword, salonData }),
      );

      if (signupSalonOwner.fulfilled.match(resultAction)) {
        dispatch(showSnackbar({ message: 'Signup successful! Welcome aboard.', type: 'success' }));
        navigation.goBack();
      } else {
        throw new Error(resultAction.payload || 'Signup failed');
      }
    } catch (err) {
      dispatch(showSnackbar({ message: err.message || 'Something went wrong during submission.', type: 'error' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const isButtonDisabled = signUpLoading || isSubmitting;

  return (
    <SafeAreaView className="flex-1 bg-base">

      {/* Header */}
      <RegistrationHeader onBack={handleBack} />

      {/* Step Indicator */}
      <StepIndicator steps={STEP_CONFIG} currentStep={currentStep} />

      <ScrollView
        contentContainerStyle={{padding: S.space.lg, paddingVertical: S.space['2xl']}}
        showsVerticalScrollIndicator={false}
      >
        {currentStep === STEPS.CONTACT && (
          <ContactDetailsStep
            ownershipType={ownershipType} setOwnershipType={setOwnershipType}
            ownerName={ownerName} setOwnerName={setOwnerName}
            ownerEmail={ownerEmail} setOwnerEmail={setOwnerEmail}
            ownerPassword={ownerPassword} setOwnerPassword={setOwnerPassword}
            contactNumber={contactNumber} setContactNumber={setContactNumber}
            whatsappNumber={whatsappNumber} setWhatsappNumber={setWhatsappNumber}
            shopName={shopName} setShopName={setShopName}
            salonCategory={salonCategory} setSalonCategory={setSalonCategory}
            partners={partners}
            updatePartner={updatePartner}
            removePartner={removePartner}
            addPartner={addPartner}
            handleNext={handleNext}
          />
        )}

        {currentStep === STEPS.SHOP && (
          <ShopDetailsStep
            galleryImages={galleryImages} handleUploadShopImage={handleUploadShopImage}
            completeAddress={completeAddress} setCompleteAddress={setCompleteAddress}
            state={state} setState={setState}
            city={city} setCity={setCity}
            states={states} citiesByState={citiesByState} isCitiesLoading={isCitiesLoading}
            pincode={pincode} setPincode={setPincode}
            locationSet={locationSet} locationData={locationData}
            handleSetLocation={handleSetLocation}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        )}

        {currentStep === STEPS.VERIFICATION && (
          <VerificationStep
            idType={idType} setIdType={setIdType}
            idNumber={idNumber} setIdNumber={setIdNumber}
            idImageUrl={idImageUrl}
            handleUploadIDProof={handleUploadIDProof}
            handleBack={handleBack}
            handleSubmit={handleSubmit}
            isButtonDisabled={isButtonDisabled}
            showSpinner={isButtonDisabled}
          />
        )}
      </ScrollView>

    </SafeAreaView>
  );
}