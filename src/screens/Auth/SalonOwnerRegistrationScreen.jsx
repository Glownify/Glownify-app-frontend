import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { uploadImageToCloudinary } from '../../api/claudinary';
import { signupSalonOwner } from '../../redux/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showSnackbar } from '../../redux/slices/snackbarSlice';
import {
  fetchStates,
  fetchCitiesByState,
} from '../../redux/slices/stateCitySlice';
import ContactDetailsStep from '../../views/salonOwnerRegistration/ContactDetails';
import ShopDetailsStep from '../../views/salonOwnerRegistration/ShopDetails';
import VerificationStep from '../../views/salonOwnerRegistration/Verification';

const STEPS = {
  CONTACT: 1,
  SHOP: 2,
  VERIFICATION: 3,
};

const ID_TYPES = ['Aadhar', 'PAN', 'GST Certificate', 'Business License'];
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regexPhoneNo = /^[6-9]\d{9}$/;

export default function SalonOwnerRegistration({ navigation }) {
  const dispatch = useDispatch();
  
  // Redux State
  const { states, citiesByState, isCitiesLoading } = useSelector(
    state => state.stateCity,
  );
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
  const [partners, setPartners] = useState([
    { id: 1, name: '', contact: '', whatsapp: '' },
  ]);
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

  // Load initial states
  useEffect(() => {
    dispatch(fetchStates());
  }, [dispatch]);

  // Fetch cities when state changes
  useEffect(() => {
    if (state) {
      dispatch(fetchCitiesByState(state));
    } else {
      setCity('');
    }
  }, [dispatch, state]);

  // Load initial location
  useEffect(() => {
    const loadLocation = async () => {
      try {
        const savedLocation = await AsyncStorage.getItem('userLocation');
        if (savedLocation) {
          const parsed = JSON.parse(savedLocation);
          console.log('🔥 User Location from AsyncStorage: ', parsed);
          setCurrentLocation(parsed);
        } else {
          console.log('⚠️ No saved location found');
        }
      } catch (error) {
        console.log('❌ Error loading location:', error);
      }
    };
    loadLocation();
  }, []);

  // Image Picker Logic
  const pickImage = async (type, index, isIDProof = false) => {
    const options = {
      mediaType: 'photo',
      maxWidth: 800,
      maxHeight: 800,
      quality: 0.8,
    };

    let result;
    if (type === 'camera') {
      result = await launchCamera(options);
    } else {
      result = await launchImageLibrary(options);
    }

    if (result.assets && result.assets.length > 0) {
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
      {
        text: 'Camera',
        onPress: () => pickImage('camera', index, false),
      },
      {
        text: 'Gallery',
        onPress: () => pickImage('gallery', index, false),
      },
    ]);
  };

  const handleUploadIDProof = () => {
    Alert.alert('Upload ID Proof', 'Choose an option', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Camera',
        onPress: () => pickImage('camera', null, true),
      },
      {
        text: 'Gallery',
        onPress: () => pickImage('gallery', null, true),
      },
    ]);
  };

  // Partner Management
  const addPartner = () => {
    if (partners.length < 2) {
      setPartners([
        ...partners,
        { id: partners.length + 1, name: '', contact: '', whatsapp: '' },
      ]);
    }
  };

  const updatePartner = (index, field, value) => {
    const newPartners = [...partners];
    newPartners[index][field] = value;
    setPartners(newPartners);
  };

  const removePartner = index => {
    if (partners.length > 1) {
      setPartners(partners.filter((_, i) => i !== index));
    }
  };

  // Location Handling
  const handleSetLocation = () => {
    if (!completeAddress || !city || !state || !pincode) {
      dispatch(
        showSnackbar({
          message:
            'Please fill complete address details before setting location.',
          type: 'error',
        }),
      );
      return;
    }
    if (!currentLocation.longitude || !currentLocation.latitude) {
      Alert.alert(
        'Missing Location',
        'Could not get your location coordinates. Please ensure location services are enabled.',
      );
      return;
    }

    const selectedStateObject = states.find(
      s => s.code === state || s._id === state,
    );
    const finalStateName = selectedStateObject
      ? selectedStateObject.name
      : state;

    const selectedCityObject = citiesByState.find(c => c._id === city);
    const finalCityName = selectedCityObject
      ? selectedCityObject.name
      : 'Unknown City';

    setLocationData({
      type: 'Point',
      coordinates: [currentLocation.longitude, currentLocation.latitude],
      address: completeAddress,
      city: finalCityName,
      state: finalStateName,
      pincode: pincode,
    });

    setLocationSet(true);
    dispatch(
      showSnackbar({
        message: `Location pinned to coordinates: Lat ${currentLocation.latitude.toFixed(
          4,
        )}, Lon ${currentLocation.longitude.toFixed(4)}`,
        type: 'success',
      }),
    );
  };

  const handleNext = () => {
    if (currentStep === STEPS.CONTACT) {
      if (
        !ownerName ||
        !ownerEmail ||
        !ownerPassword ||
        !contactNumber ||
        !shopName ||
        !salonCategory
      ) {
        dispatch(
          showSnackbar({
            message: 'Please fill all required fields in Contact Details.',
            type: 'error',
          }),
        );
        return;
      } else if (!regexEmail.test(ownerEmail)) {
        dispatch(
          showSnackbar({
            message: 'Please Enter a Valid Email.',
            type: 'error',
          }),
        );
        return;
      } else if (!regexPhoneNo.test(contactNumber)) {
        dispatch(
          showSnackbar({
            message: 'Please Enter a Valid Contact Number.',
            type: 'error',
          }),
        );
        return;
      }
      if (ownershipType === 'partnership') {
        const hasIncompletePartner = partners.some(p => !p.name || !p.contact);
        if (hasIncompletePartner) {
          dispatch(
            showSnackbar({
              message: 'Please fill in all partner name and contact details.',
              type: 'error',
            }),
          );
          return;
        }
      }
      setCurrentStep(STEPS.SHOP);
    } else if (currentStep === STEPS.SHOP) {
      if (galleryImages.filter(img => img !== null).length < 1) {
        return dispatch(
          showSnackbar({
            message: 'Please upload at least 1 salon image.',
            type: 'error',
          }),
        );
      }
      if (!locationSet) {
        return dispatch(
          showSnackbar({
            message: 'Please set your salon location.',
            type: 'error',
          }),
        );
      }
      if (!/^\d{6}$/.test(pincode)) {
        return dispatch(
          showSnackbar({
            message: 'Please enter a valid 6-digit pincode.',
            type: 'error',
          }),
        );
      }
      if (!state || !city) {
        return dispatch(
          showSnackbar({
            message: 'Please select a State and a City.',
            type: 'error',
          }),
        );
      }
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

  // Final Submission Logic
  const handleSubmit = async () => {
    if (!idType || !idNumber || !idImageUrl) {
      return dispatch(
        showSnackbar({
          message: 'Please complete ID verification.',
          type: 'error',
        }),
      );
    }

    if (
      !ownerName ||
      !ownerEmail ||
      !ownerPassword ||
      !contactNumber ||
      !shopName ||
      !salonCategory ||
      galleryImages.filter(img => img !== null).length < 1 ||
      !locationSet
    ) {
      return dispatch(
        showSnackbar({
          message: 'Please complete all required steps and fields.',
          type: 'error',
        }),
      );
    }

    setIsSubmitting(true);

    try {
      // Upload ID Image
      let finalIdImageUrl = null;
      if (idImageUrl) {
        dispatch(
          showSnackbar({ message: 'Uploading ID proof...', type: 'info' }),
        );
        finalIdImageUrl = await uploadImageToCloudinary(idImageUrl);
      }

      // Upload Shop Images
      const uploadedShopImageUrls = [];
      const imagesToUpload = galleryImages.filter(img => img !== null);
      if (imagesToUpload.length > 0) {
        dispatch(
          showSnackbar({
            message: `Uploading ${imagesToUpload.length} salon images...`,
            type: 'info',
          }),
        );
      }
      for (const image of imagesToUpload) {
        const uri = await uploadImageToCloudinary(image);
        uploadedShopImageUrls.push(uri);
      }

      // Prepare Final Salon Data
      const salonData = {
        shopName,
        shopType: ownershipType,
        salonCategory,
        galleryImages: uploadedShopImageUrls,
        location: locationData,
        partners:
          ownershipType === 'partnership'
            ? partners.map(({ id, ...rest }) => rest)
            : [],
        contactNumber,
        whatsappNumber,
        governmentId: {
          idType: idType,
          idNumber: idNumber,
          idImageUrl: finalIdImageUrl,
        },
        city: city,
      };

      // Dispatch Signup Redux Action
      const resultAction = await dispatch(
        signupSalonOwner({
          name: ownerName,
          email: ownerEmail,
          phone: contactNumber,
          password: ownerPassword,
          salonData,
        }),
      );

      if (signupSalonOwner.fulfilled.match(resultAction)) {
        console.log('Final Salon Data Sent:', salonData);
        dispatch(
          showSnackbar({
            message: 'Signup successful! Welcome aboard.',
            type: 'success',
          }),
        );
        navigation.goBack();
      } else {
        throw new Error(resultAction.payload || 'Signup failed');
      }
    } catch (err) {
      dispatch(
        showSnackbar({
          message:
            err.message || 'Something went wrong during submission or upload',
          type: 'error',
        }),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepStatus = step => {
    if (step < currentStep) return 'completed';
    if (step === currentStep) return 'active';
    return 'inactive';
  };

  const renderStepIndicator = (step, title) => {
    const status = getStepStatus(step);
    const isCompleted = status === 'completed';
    const isActive = status === 'active';

    return (
      <View key={step} className="flex-1 items-center">
        <View
          className={`w-8 h-8 rounded-full items-center justify-center ${
            isCompleted
              ? 'bg-success'
              : isActive
              ? 'bg-[#7C5FED]'
              : 'bg-neutral-200'
          }`}
        >
          {isCompleted ? (
            <Icon name="checkmark" size={16} color="#fff" />
          ) : (
            <Text
              className={`text-sm font-bold ${
                isActive ? 'text-neutral-white' : 'text-neutral-400'
              }`}
            >
              {step}
            </Text>
          )}
        </View>
        <Text
          className={`text-xs mt-xs text-center ${
            isActive ? 'text-neutral-700 font-semibold' : 'text-neutral-400'
          }`}
        >
          {title}
        </Text>
        {step < STEPS.VERIFICATION && (
          <View
            className={`absolute top-4 left-1/2 w-full h-[2px] ${
              isCompleted ? 'bg-success' : 'bg-neutral-200'
            }`}
            style={{ zIndex: -1 }}
          />
        )}
      </View>
    );
  };

  const isButtonDisabled = signUpLoading || isSubmitting;
  const showSpinner = signUpLoading || isSubmitting;

  return (
    <SafeAreaView className="flex-1 bg-neutral-50">
      {/* Header */}
      <View className="bg-[#7C5FED] px-md py-md">
        <View className="flex-row items-center gap-sm">
          <TouchableOpacity onPress={handleBack}>
            <Icon name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-lg font-bold text-neutral-white">
              Earn with Us
            </Text>
            <Text className="text-xs text-neutral-white/80">
              (Partner Registration)
            </Text>
          </View>
        </View>
      </View>

      {/* Step Indicators */}
      <View className="flex-row bg-neutral-white px-md py-lg border-b border-neutral-100">
        {renderStepIndicator(1, 'Contact Details')}
        {renderStepIndicator(2, 'Shop Details')}
        {renderStepIndicator(3, 'Verification')}
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* STEP 1: CONTACT DETAILS */}
        {currentStep === STEPS.CONTACT && (
          <ContactDetailsStep
            ownershipType={ownershipType}
            setOwnershipType={setOwnershipType}
            ownerName={ownerName}
            setOwnerName={setOwnerName}
            ownerEmail={ownerEmail}
            setOwnerEmail={setOwnerEmail}
            ownerPassword={ownerPassword}
            setOwnerPassword={setOwnerPassword}
            contactNumber={contactNumber}
            setContactNumber={setContactNumber}
            whatsappNumber={whatsappNumber}
            setWhatsappNumber={setWhatsappNumber}
            shopName={shopName}
            setShopName={setShopName}
            salonCategory={salonCategory}
            setSalonCategory={setSalonCategory}
            partners={partners}
            updatePartner={updatePartner}
            removePartner={removePartner}
            addPartner={addPartner}
            handleNext={handleNext}
          />
        )}

        {/* STEP 2: SHOP DETAILS */}
        {currentStep === STEPS.SHOP && (
          <ShopDetailsStep
            galleryImages={galleryImages}
            handleUploadShopImage={handleUploadShopImage}
            completeAddress={completeAddress}
            setCompleteAddress={setCompleteAddress}
            state={state}
            setState={setState}
            city={city}
            setCity={setCity}
            states={states}
            citiesByState={citiesByState}
            isCitiesLoading={isCitiesLoading}
            pincode={pincode}
            setPincode={setPincode}
            locationSet={locationSet}
            locationData={locationData}
            handleSetLocation={handleSetLocation}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        )}

        {/* STEP 3: VERIFICATION */}
        {currentStep === STEPS.VERIFICATION && (
          <VerificationStep
            idType={idType}
            setIdType={setIdType}
            idNumber={idNumber}
            setIdNumber={setIdNumber}
            idImageUrl={idImageUrl}
            handleUploadIDProof={handleUploadIDProof}
            handleBack={handleBack}
            handleSubmit={handleSubmit}
            isButtonDisabled={isButtonDisabled}
            showSpinner={showSpinner}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
