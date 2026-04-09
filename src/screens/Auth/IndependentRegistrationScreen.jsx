import React, { useEffect, useState } from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { signupIndependentProfessional } from '../../redux/slices/authSlice';
import { fetchAllCategories } from '../../redux/slices/categoriesSlice';
import { showSnackbar } from '../../redux/slices/snackbarSlice';
import { uploadImageToCloudinary } from '../../api/claudinary';

import RegistrationHeader from '../../components/common/RegistrationHeader';
import StepIndicator from '../../components/common/StepIndicator';
import PersonalInfoStep from '../../views/independentRegistration/PersonalInfo';
import AvailabilityStep from '../../views/independentRegistration/Availability';
import IndependentVerificationStep from '../../views/independentRegistration/Verification';
import {S, theme} from '../../theme';

const STEPS = { PERSONAL: 1, AVAILABILITY: 2, VERIFICATION: 3 };

const STEP_CONFIG = [
  { step: 1, title: 'Personal Info' },
  { step: 2, title: 'Availability' },
  { step: 3, title: 'Verification' },
];

const TIME_SLOTS = [
  { id: 'morning',   label: 'Full Morning (9am-12pm)',   start: '09:00', end: '12:00' },
  { id: 'afternoon', label: 'Full Afternoon (12pm-5pm)', start: '12:00', end: '17:00' },
  { id: 'evening',   label: 'Full Evening (5pm-8pm)',    start: '17:00', end: '20:00' },
];

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function IndependentRegistrationScreen({ navigation }) {
  const dispatch = useDispatch();
  const { signUpLoading } = useSelector(state => state.auth);
  const { categories } = useSelector(state => state.categories);

  const [currentStep, setCurrentStep] = useState(STEPS.PERSONAL);

  // Step 1: Personal Info
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [contact, setContact] = useState('');
  const [experience, setExperience] = useState('');
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);

  // Step 2: Availability
  const [selectedDays, setSelectedDays] = useState([]);
  const [timeSlotsState, setTimeSlotsState] = useState(
    TIME_SLOTS.map(slot => ({ ...slot, selected: false })),
  );

  // Step 3: Verification
  const [idType, setIdType] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [idProof, setIdProof] = useState(null);

  // ── Effects ────────────────────────────────────────────────────
  useEffect(() => { dispatch(fetchAllCategories()); }, [dispatch]);

  // ── Image Picker ───────────────────────────────────────────────
  const pickImage = async (type, isIDProof = false) => {
    const options = { mediaType: 'photo', maxWidth: 800, maxHeight: 800, quality: 0.8 };
    const result = type === 'camera'
      ? await launchCamera(options)
      : await launchImageLibrary(options);

    if (result.assets?.length > 0) {
      const uri = result.assets[0].uri;
      isIDProof ? setIdProof(uri) : setProfilePhoto(uri);
    }
  };

  const handleUploadPhoto = () => {
    Alert.alert('Upload Image', 'Choose an option', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Camera',  onPress: () => pickImage('camera', false) },
      { text: 'Gallery', onPress: () => pickImage('gallery', false) },
    ]);
  };

  const handleUploadIDProof = () => {
    Alert.alert('Upload ID Proof', 'Choose an option', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Camera',  onPress: () => pickImage('camera', true) },
      { text: 'Gallery', onPress: () => pickImage('gallery', true) },
    ]);
  };

  // ── Specializations ────────────────────────────────────────────
  const handleSpecializationSelect = value => {
    if (!value) return;
    setSelectedSpecializations(prev =>
      prev.includes(value) ? prev.filter(id => id !== value) : [...prev, value],
    );
  };

  // ── Day Management ─────────────────────────────────────────────
  const toggleDay = day => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day],
    );
  };
  const selectAllDays = () => setSelectedDays(DAYS);
  const weekdaysOnly  = () => setSelectedDays(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);

  // ── Time Slots ─────────────────────────────────────────────────
  const toggleTimeSlot = slotId => {
    setTimeSlotsState(prev =>
      prev.map(slot => slot.id === slotId ? { ...slot, selected: !slot.selected } : slot),
    );
  };

  // ── Navigation ─────────────────────────────────────────────────
  const handleBack = () => {
    if (currentStep > STEPS.PERSONAL) setCurrentStep(currentStep - 1);
    else navigation?.goBack();
  };

  const handleNext = () => {
    if (currentStep === STEPS.PERSONAL) {
      if (!fullName || !gender || !contact || !experience || !profilePhoto) {
        dispatch(showSnackbar({
          message: 'Please fill all required personal fields, including a profile photo.',
          type: 'error',
        }));
        return;
      }
      setCurrentStep(STEPS.AVAILABILITY);
    } else if (currentStep === STEPS.AVAILABILITY) {
      const hasSelectedDay  = selectedDays.length > 0;
      const hasSelectedSlot = timeSlotsState.some(slot => slot.selected);
      if (!hasSelectedDay || !hasSelectedSlot) {
        dispatch(showSnackbar({
          message: 'Please select at least one available day and time slot.',
          type: 'error',
        }));
        return;
      }
      setCurrentStep(STEPS.VERIFICATION);
    }
  };

  // ── Data Helpers ───────────────────────────────────────────────
  const mapAvailabilityToSchema = () => {
    const selectedSlots = timeSlotsState.filter(slot => slot.selected);
    return selectedDays.flatMap(day =>
      selectedSlots.map(slot => ({ day, start: slot.start, end: slot.end })),
    );
  };

  const getExperienceYears = expString => {
    const match = expString.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  // ── Submit ─────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!idType || !idNumber || !idProof) {
      dispatch(showSnackbar({ message: 'Please fill all required verification fields.', type: 'error' }));
      return;
    }

    try {
      dispatch(showSnackbar({ message: 'Uploading profile photo...', type: 'info' }));
      const profilePhotoUrl = await uploadImageToCloudinary(profilePhoto);

      dispatch(showSnackbar({ message: 'Uploading ID proof...', type: 'info' }));
      const idProofUrl = await uploadImageToCloudinary(idProof);

      const independentData = {
        gender: gender.toLowerCase(),
        experienceYears: getExperienceYears(experience),
        profilePhoto: profilePhotoUrl,
        availability: mapAvailabilityToSchema(),
        specializations: selectedSpecializations,
        governmentId: { idType, idNumber, idImageUrl: idProofUrl },
      };

      const resultAction = await dispatch(
        signupIndependentProfessional({
          name: fullName,
          email,
          phone: contact,
          password,
          independentData,
        }),
      );

      if (signupIndependentProfessional.fulfilled.match(resultAction)) {
        dispatch(showSnackbar({
          message: 'Registration submitted! You are now logged in. Awaiting admin verification.',
          type: 'success',
        }));
        navigation?.navigate('MainApp');
      } else {
        dispatch(showSnackbar({
          message: resultAction.payload || 'An unknown error occurred during signup.',
          type: 'error',
        }));
      }
    } catch (error) {
      dispatch(showSnackbar({
        message: error.message || 'Failed to complete registration due to an upload error.',
        type: 'error',
      }));
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-base">

      {/* Header */}
      <RegistrationHeader
        title="Earn with Us"
        subtitle="(Independent Beautician / Barber Registration)"
        onBack={handleBack}
        bgColor={theme.colors.primary[600]}
      />

      {/* Step Indicator */}
      <StepIndicator
        steps={STEP_CONFIG}
        currentStep={currentStep}
        activeColor={theme.colors.primary[600]}
      />

      <ScrollView
        contentContainerStyle={{padding: S.space.lg, paddingVertical: S.space['2xl']}}
        showsVerticalScrollIndicator={false}
      >
        {currentStep === STEPS.PERSONAL && (
          <PersonalInfoStep
            profilePhoto={profilePhoto}
            handleUploadPhoto={handleUploadPhoto}
            fullName={fullName} setFullName={setFullName}
            email={email} setEmail={setEmail}
            password={password} setPassword={setPassword}
            gender={gender} setGender={setGender}
            contact={contact} setContact={setContact}
            experience={experience} setExperience={setExperience}
            categories={categories}
            selectedSpecializations={selectedSpecializations}
            handleSpecializationSelect={handleSpecializationSelect}
            handleNext={handleNext}
          />
        )}

        {currentStep === STEPS.AVAILABILITY && (
          <AvailabilityStep
            selectedDays={selectedDays}
            toggleDay={toggleDay}
            selectAllDays={selectAllDays}
            weekdaysOnly={weekdaysOnly}
            timeSlotsState={timeSlotsState}
            toggleTimeSlot={toggleTimeSlot}
            setTimeSlotsState={setTimeSlotsState}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        )}

        {currentStep === STEPS.VERIFICATION && (
          <IndependentVerificationStep
            idType={idType} setIdType={setIdType}
            idNumber={idNumber} setIdNumber={setIdNumber}
            idProof={idProof}
            handleUploadIDProof={handleUploadIDProof}
            handleBack={handleBack}
            handleSubmit={handleSubmit}
            isSubmitting={signUpLoading}
          />
        )}
      </ScrollView>

    </SafeAreaView>
  );
}