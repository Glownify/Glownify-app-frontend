import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { useDispatch } from "react-redux";
import { addSpecialist } from "../../../redux/slices/salonAdminSlice";
import { uploadImageToCloudinary } from "../../../api/claudinary";

// ─── TIME PICKER ─────────────────────────────────────────────────────────────
function TimePicker({ label, value, onSelect }) {
  const [open, setOpen] = useState(false);
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = ["00", "30"];
  const periods = ["AM", "PM"];

  return (
    <View className="mb-sm">
      <Text className="text-sm font-semibold text-teal-600 mb-1">{label}</Text>

      <TouchableOpacity
        className="flex-row justify-between items-center border border-neutral-200 rounded-input px-sm py-xs"
        onPress={() => setOpen(!open)}
        activeOpacity={0.7}
      >
        <Text className={value ? "text-neutral-900 text-sm" : "text-neutral-400 text-sm"}>
          {value || "Select Time"}
        </Text>
        <Icon name={open ? "chevron-up" : "time-outline"} size={18} color="#156778" />
      </TouchableOpacity>

      {open && (
        <View className="border border-neutral-200 rounded-input mt-1 bg-neutral-white overflow-hidden">
          <ScrollView nestedScrollEnabled style={{ maxHeight: 150 }}>
            {periods.map((p) =>
              hours.map((h) =>
                minutes.map((m) => {
                  const time = `${h}:${m} ${p}`;
                  return (
                    <TouchableOpacity
                      key={time}
                      className="py-xs px-sm border-b border-neutral-100"
                      onPress={() => {
                        onSelect(time);
                        setOpen(false);
                      }}
                    >
                      <Text className="text-sm text-teal-600">{time}</Text>
                    </TouchableOpacity>
                  );
                })
              )
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

// ─── EXPERTISE PICKER ────────────────────────────────────────────────────────
function ExpertisePicker({ selectedExpertise, onSelect }) {
  const expertiseList = ["Hair", "Skin", "Makeup", "Massage", "Nails", "Other"];

  const toggle = (exp) => {
    if (selectedExpertise.includes(exp))
      onSelect(selectedExpertise.filter((e) => e !== exp));
    else onSelect([...selectedExpertise, exp]);
  };

  return (
    <View className="mb-sm">
      <Text className="text-sm font-semibold text-teal-600 mb-xs">Expertise</Text>
      <View className="flex-row flex-wrap gap-2">
        {expertiseList.map((exp) => {
          const selected = selectedExpertise.includes(exp);
          return (
            <TouchableOpacity
              key={exp}
              className={`border rounded-input px-sm py-1 ${
                selected
                  ? "bg-teal-600 border-teal-600"
                  : "bg-neutral-white border-neutral-200"
              }`}
              onPress={() => toggle(exp)}
            >
              <Text
                className={`text-xs font-semibold ${
                  selected ? "text-neutral-white" : "text-neutral-600"
                }`}
              >
                {exp}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// ─── DAY PICKER ──────────────────────────────────────────────────────────────
function DayPicker({ selectedDays, onSelect }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const toggle = (day) => {
    if (selectedDays.includes(day))
      onSelect(selectedDays.filter((d) => d !== day));
    else onSelect([...selectedDays, day]);
  };

  return (
    <View className="mb-sm">
      <Text className="text-sm font-semibold text-teal-600 mb-xs">
        Available Days
      </Text>
      <View className="flex-row flex-wrap gap-2">
        {days.map((day) => {
          const selected = selectedDays.includes(day);
          return (
            <TouchableOpacity
              key={day}
              className={`border rounded-input px-sm py-1 ${
                selected
                  ? "bg-teal-600 border-teal-600"
                  : "bg-neutral-white border-neutral-200"
              }`}
              onPress={() => toggle(day)}
            >
              <Text
                className={`text-xs font-semibold ${
                  selected ? "text-neutral-white" : "text-neutral-600"
                }`}
              >
                {day}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// ─── MAIN MODAL ──────────────────────────────────────────────────────────────
export default function AddSpecialistModal({ visible, onClose }) {
  const dispatch = useDispatch();

  const emptyForm = {
    name: "",
    phone: "",
    email: "",
    expertise: [],
    experienceYears: "",
    image: "",
    certifications: [],
    certificateInput: "",
    availabilityDays: [],
    startTime: "",
    endTime: "",
  };

  const [form, setForm] = useState(emptyForm);
  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleAddCertificate = () => {
    if (!form.certificateInput.trim()) return;
    setForm({
      ...form,
      certifications: [...form.certifications, form.certificateInput.trim()],
      certificateInput: "",
    });
  };

  const handleRemoveCertificate = (index) => {
    const updated = [...form.certifications];
    updated.splice(index, 1);
    setForm({ ...form, certifications: updated });
  };

  const handlePickImage = () => {
    Alert.alert(
      "Upload Image",
      "Choose an option",
      [
        {
          text: "Camera",
          onPress: () =>
            launchCamera({ mediaType: "photo", quality: 0.7 }, (response) => {
              if (response.didCancel || response.errorCode) return;
              handleChange("image", response.assets[0].uri);
            }),
        },
        {
          text: "Gallery",
          onPress: () =>
            launchImageLibrary({ mediaType: "photo", quality: 0.7 }, (response) => {
              if (response.didCancel || response.errorCode) return;
              handleChange("image", response.assets[0].uri);
            }),
        },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.email || form.expertise.length === 0) {
      Alert.alert("Missing Fields", "Please fill all required fields.");
      return;
    }
    if (!form.startTime || !form.endTime || form.availabilityDays.length === 0) {
      Alert.alert("Missing Availability", "Please select days and time.");
      return;
    }

    let imageUrl = "";
    if (form.image) {
      try {
        imageUrl = await uploadImageToCloudinary(form.image);
      } catch (err) {
        Alert.alert("Error", "Image upload failed. Please try again.");
        return;
      }
    }

    const availability = form.availabilityDays.map((day) => ({
      day,
      start: form.startTime,
      end: form.endTime,
    }));

    const newSpecialist = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      expertise: form.expertise,
      experienceYears: Number(form.experienceYears) || 0,
      image: imageUrl || "",
      certifications: form.certifications,
      availability,
    };

    try {
      await dispatch(addSpecialist(newSpecialist)).unwrap();
      Alert.alert("Success", "Specialist added successfully.");
      onClose();
      setForm(emptyForm);
    } catch (err) {
      Alert.alert("Error", err || "Failed to add specialist. Please try again.");
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      {/* Overlay */}
      <View className="flex-1 bg-black/40 justify-center items-center px-md">

        {/* Modal Box */}
        <View className="bg-[#fff1f2] rounded-card p-md w-full max-h-[90%]">

          {/* Header */}
          <View className="flex-row justify-between items-center mb-sm">
            <Text className="text-lg font-bold text-teal-600">
              Add Specialist
            </Text>
            <TouchableOpacity onPress={onClose} className="p-1">
              <Icon name="close" size={22} color="#4b5563" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>

            {/* Image Upload */}
            <TouchableOpacity
              className="self-center mb-lg"
              onPress={handlePickImage}
              activeOpacity={0.8}
            >
              {form.image ? (
                <Image
                  source={{ uri: form.image }}
                  className="w-28 h-28 rounded-avatar"
                  style={{ borderWidth: 2, borderColor: "#156778" }}
                />
              ) : (
                <View
                  className="w-28 h-28 rounded-avatar bg-neutral-50 justify-center items-center"
                  style={{ borderWidth: 2, borderColor: "#156778" }}
                >
                  <Icon name="camera" size={28} color="#156778" />
                  <Text className="text-xs text-teal-600 mt-1 font-medium">
                    Upload Photo
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Name */}
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="#9ca3af"
              className="border border-neutral-200 rounded-input px-sm py-xs mb-sm text-sm text-neutral-900 bg-neutral-white"
              value={form.name}
              onChangeText={(v) => handleChange("name", v)}
            />

            {/* Phone */}
            <TextInput
              placeholder="Phone Number"
              placeholderTextColor="#9ca3af"
              className="border border-neutral-200 rounded-input px-sm py-xs mb-sm text-sm text-neutral-900 bg-neutral-white"
              keyboardType="phone-pad"
              value={form.phone}
              onChangeText={(v) => handleChange("phone", v)}
            />

            {/* Email */}
            <TextInput
              placeholder="Email Address"
              placeholderTextColor="#9ca3af"
              className="border border-neutral-200 rounded-input px-sm py-xs mb-sm text-sm text-neutral-900 bg-neutral-white"
              keyboardType="email-address"
              value={form.email}
              onChangeText={(v) => handleChange("email", v)}
            />

            {/* Expertise */}
            <ExpertisePicker
              selectedExpertise={form.expertise}
              onSelect={(v) => handleChange("expertise", v)}
            />

            {/* Experience */}
            <TextInput
              placeholder="Years of Experience"
              placeholderTextColor="#9ca3af"
              className="border border-neutral-200 rounded-input px-sm py-xs mb-sm text-sm text-neutral-900 bg-neutral-white"
              keyboardType="numeric"
              value={form.experienceYears}
              onChangeText={(v) => handleChange("experienceYears", v)}
            />

            {/* Certifications */}
            <View className="mb-sm">
              <Text className="text-sm font-semibold text-teal-600 mb-xs">
                Certifications
              </Text>

              {/* Input row */}
              <View className="flex-row items-center gap-x-2">
                <TextInput
                  placeholder="Enter certificate name"
                  placeholderTextColor="#9ca3af"
                  className="flex-1 border border-neutral-200 rounded-input px-sm py-xs text-sm text-neutral-900 bg-neutral-white"
                  value={form.certificateInput}
                  onChangeText={(v) => handleChange("certificateInput", v)}
                />
                <TouchableOpacity onPress={handleAddCertificate} className="p-1">
                  <Icon name="add-circle" size={28} color="#156778" />
                </TouchableOpacity>
              </View>

              {/* Added certifications */}
              {form.certifications.map((cert, idx) => (
                <View
                  key={idx}
                  className="flex-row justify-between items-center bg-neutral-100 px-sm py-xs rounded-input mt-xs"
                >
                  <Text className="text-sm font-medium text-teal-600 flex-1 mr-2">
                    {cert}
                  </Text>
                  <TouchableOpacity onPress={() => handleRemoveCertificate(idx)}>
                    <Icon name="close-circle" size={20} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Day Picker */}
            <DayPicker
              selectedDays={form.availabilityDays}
              onSelect={(days) => handleChange("availabilityDays", days)}
            />

            {/* Time Pickers */}
            <TimePicker
              label="Start Time"
              value={form.startTime}
              onSelect={(v) => handleChange("startTime", v)}
            />
            <TimePicker
              label="End Time"
              value={form.endTime}
              onSelect={(v) => handleChange("endTime", v)}
            />
          </ScrollView>

          {/* Submit */}
          <TouchableOpacity
            className="bg-teal-600 py-sm rounded-input items-center mt-sm"
            onPress={handleSubmit}
            activeOpacity={0.85}
          >
            <Text className="text-neutral-white font-bold text-sm">
              Add Specialist
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}