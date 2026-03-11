import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/Ionicons";

// ─── DUMMY DATA ───────────────────────────────────────────────────────────────
// 🔁 Replace with Redux:
// const { services = [], loading, error, categories = [] } = useSelector(state => state.salonAdmin)
// useEffect(() => { dispatch(fetchSalonServices()); dispatch(fetchAllCategories()); }, [dispatch])

const DUMMY_CATEGORIES = [
  { _id: "c1", name: "Hair Care",        gender: "unisex", icon: "cut-outline"            },
  { _id: "c2", name: "Skin Care",        gender: "women",  icon: "flower-outline"         },
  { _id: "c3", name: "Beard & Grooming", gender: "men",    icon: "man-outline"            },
  { _id: "c4", name: "Nail Art",         gender: "women",  icon: "color-palette-outline"  },
];

const DUMMY_SERVICES = [
  {
    _id: "s1", name: "Classic Haircut",
    category: { _id: "c1", name: "Hair Care", gender: "unisex", icon: "cut-outline" },
    price: 350, durationMins: 30, discountPercent: 10,
    description: "A clean, classic haircut styled to your preference.",
    serviceMode: "salon", status: "active", gender: "unisex",
    addOns: [
      { name: "Hair Wash", price: 100, duration: 10, isRecommended: true },
      { name: "Blow Dry",  price: 150, duration: 15, isRecommended: false },
    ],
  },
  {
    _id: "s2", name: "Balayage Coloring",
    category: { _id: "c1", name: "Hair Care", gender: "unisex", icon: "cut-outline" },
    price: 2500, durationMins: 120, discountPercent: 0,
    description: "Hand-painted highlights for a natural sun-kissed look.",
    serviceMode: "salon", status: "active", gender: "women", addOns: [],
  },
  {
    _id: "s3", name: "Beard Shaping",
    category: { _id: "c3", name: "Beard & Grooming", gender: "men", icon: "man-outline" },
    price: 200, durationMins: 20, discountPercent: 0,
    description: "Precision beard trim and shaping with hot towel finish.",
    serviceMode: "both", status: "inactive", gender: "men",
    addOns: [{ name: "Hot Towel", price: 50, duration: 5, isRecommended: true }],
  },
  {
    _id: "s4", name: "Deep Facial",
    category: { _id: "c2", name: "Skin Care", gender: "women", icon: "flower-outline" },
    price: 1200, durationMins: 60, discountPercent: 15,
    description: "Deep cleansing facial with exfoliation and moisturizing.",
    serviceMode: "home", status: "active", gender: "women", addOns: [],
  },
];

const LOADING = false; // 🔁 swap with Redux loading state
const ERROR   = null;  // 🔁 swap with Redux error state

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const genderBadge = (gender) => {
  switch (gender) {
    case "men":    return { bg: "bg-blue-500",    text: "text-neutral-white" };
    case "women":  return { bg: "bg-pink-500",    text: "text-neutral-white" };
    case "unisex": return { bg: "bg-purple-500",  text: "text-neutral-white" };
    default:       return { bg: "bg-neutral-400", text: "text-neutral-white" };
  }
};

const modeBadge = (mode) => {
  switch (mode) {
    case "salon": return { bg: "bg-success", icon: "business-outline" };
    case "home":  return { bg: "bg-warning", icon: "home-outline"     };
    default:      return { bg: "bg-info",    icon: "list-outline"     };
  }
};

const EMPTY_FORM = {
  name: "", category: "", price: "", durationMins: "30",
  discountPercent: "0", description: "", serviceMode: "salon", addOns: [],
};

// ─── SCREEN ───────────────────────────────────────────────────────────────────
export default function ManageServicesScreen() {
  // 🔁 Replace local state below with Redux selectors + dispatch
  const [services, setServices] = useState(DUMMY_SERVICES);
  const categories               = DUMMY_CATEGORIES;
  const loading                  = LOADING;
  const error                    = ERROR;

  const [modalVisible, setModalVisible]   = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [genderFilter, setGenderFilter]   = useState("all");
  const [form, setForm]                   = useState(EMPTY_FORM);
  const [showAddOnForm, setShowAddOnForm] = useState(false);

  const setField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  // ── Add-on helpers ──────────────────────────────────────────────────────
  const addNewAddOn = () => {
    setField("addOns", [
      ...form.addOns,
      { id: Date.now().toString(), name: "", price: "", duration: "0", isRecommended: false },
    ]);
    setShowAddOnForm(true);
  };

  const updateAddOn = (i, field, value) => {
    const updated = form.addOns.map((a, idx) => idx === i ? { ...a, [field]: value } : a);
    setField("addOns", updated);
  };

  const removeAddOn = (i) => {
    Alert.alert("Remove Add-on", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove", style: "destructive",
        onPress: () => {
          const updated = form.addOns.filter((_, idx) => idx !== i);
          setField("addOns", updated);
          if (updated.length === 0) setShowAddOnForm(false);
        },
      },
    ]);
  };

  const toggleRecommended = (i) => {
    const updated = form.addOns.map((a, idx) =>
      idx === i ? { ...a, isRecommended: !a.isRecommended } : a
    );
    setField("addOns", updated);
  };

  // ── Open / close modal ──────────────────────────────────────────────────
  const openModal = (service = null) => {
    if (service) {
      const catId = typeof service.category === "string"
        ? service.category : service.category?._id;
      setEditingService(service);
      setForm({
        name:            service.name || "",
        category:        catId || "",
        price:           service.price != null ? String(service.price) : "",
        durationMins:    service.durationMins != null ? String(service.durationMins) : "30",
        discountPercent: service.discountPercent != null ? String(service.discountPercent) : "0",
        description:     service.description || "",
        serviceMode:     service.serviceMode || "salon",
        addOns: (service.addOns || []).map((a) => ({
          id:            a._id || Date.now().toString(),
          name:          a.name || "",
          price:         a.price != null ? String(a.price) : "",
          duration:      a.duration != null ? String(a.duration) : "0",
          isRecommended: a.isRecommended || false,
        })),
      });
      setShowAddOnForm((service.addOns || []).length > 0);
    } else {
      setEditingService(null);
      setForm(EMPTY_FORM);
      setShowAddOnForm(false);
    }
    setModalVisible(true);
  };

  const closeModal = () => { setModalVisible(false); setEditingService(null); };

  // ── Save ────────────────────────────────────────────────────────────────
  const handleSave = () => {
    if (!form.name || !form.category || !form.price) {
      Alert.alert("Error", "Please fill all required fields.");
      return;
    }
    // 🔁 Replace with: dispatch(editingService ? updateServiceItem(...) : createServiceItem(...))
    Alert.alert("Success", editingService ? "Service updated!" : "Service added!");
    closeModal();
  };

  // ── Delete ──────────────────────────────────────────────────────────────
  const handleDelete = (id) => {
    Alert.alert("Delete Service", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete", style: "destructive",
        onPress: () => {
          // 🔁 Replace with: dispatch(deleteServiceItem(id))
          setServices((prev) => prev.filter((s) => s._id !== id));
        },
      },
    ]);
  };

  // ── Toggle status ───────────────────────────────────────────────────────
  const toggleStatus = (service) => {
    // 🔁 Replace with: dispatch(updateServiceItem({ serviceId: service._id, updateData: { status: ... } }))
    setServices((prev) =>
      prev.map((s) =>
        s._id === service._id
          ? { ...s, status: s.status === "active" ? "inactive" : "active" }
          : s
      )
    );
  };

  // ── Filter ──────────────────────────────────────────────────────────────
  const filteredServices = genderFilter === "all" ? services : services.filter((s) => {
    const g = s.gender
      || (typeof s.category === "object" && s.category?.gender)
      || categories.find((c) => c._id === s.category)?.gender;
    return g === genderFilter || g === "unisex";
  });

  // ─── SERVICE CARD ─────────────────────────────────────────────────────────
  const renderCard = (service) => {
    const catObj   = typeof service.category === "object"
      ? service.category
      : categories.find((c) => c._id === service.category);
    const gender   = service.gender || catObj?.gender;
    const gs       = genderBadge(gender);
    const ms       = modeBadge(service.serviceMode);

    return (
      <View key={service._id} className="bg-neutral-white rounded-card p-md mb-sm shadow-card border border-neutral-100">

        {/* Top row */}
        <View className="flex-row justify-between items-start mb-xs">
          <View className="flex-1 mr-sm">
            <Text className="text-base font-bold text-neutral-800">{service.name}</Text>
            <View className="flex-row flex-wrap items-center gap-1.5 mt-1">
              {catObj?.icon && <Icon name={catObj.icon} size={13} color="#156778" />}
              <Text className="text-xs font-semibold text-teal-600">{catObj?.name}</Text>

              {gender && (
                <View className={`${gs.bg} px-2 py-0.5 rounded-button`}>
                  <Text className={`${gs.text} text-xs font-bold uppercase`}>{gender}</Text>
                </View>
              )}

              {service.serviceMode && (
                <View className={`${ms.bg} flex-row items-center gap-x-0.5 px-2 py-0.5 rounded-button`}>
                  <Icon name={ms.icon} size={10} color="#fff" />
                  <Text className="text-neutral-white text-xs font-bold capitalize ml-0.5">
                    {service.serviceMode}
                  </Text>
                </View>
              )}
            </View>
          </View>

          <View className={`px-2 py-0.5 rounded-button ${service.status === "active" ? "bg-teal-50" : "bg-neutral-100"}`}>
            <Text className={`text-xs font-bold ${service.status === "active" ? "text-success" : "text-neutral-400"}`}>
              {service.status === "active" ? "Active" : "Inactive"}
            </Text>
          </View>
        </View>

        {/* Price / duration / discount */}
        <View className="flex-row justify-between items-center py-xs border-t border-b border-neutral-100 my-xs">
          <Text className="text-base font-bold text-neutral-900">₹{service.price}</Text>
          <Text className="text-xs text-neutral-500">⏱ {service.durationMins} mins</Text>
          {service.discountPercent > 0 && (
            <View className="bg-teal-50 px-2 py-0.5 rounded-button">
              <Text className="text-xs font-bold text-success">💸 {service.discountPercent}% off</Text>
            </View>
          )}
        </View>

        {/* Add-ons preview */}
        {service.addOns?.length > 0 && (
          <View className="mb-xs">
            <View className="flex-row items-center gap-x-1 mb-1">
              <Icon name="add-circle-outline" size={13} color="#156778" />
              <Text className="text-xs font-bold text-teal-600">
                {service.addOns.length} Add-on{service.addOns.length > 1 ? "s" : ""}
              </Text>
            </View>
            <View className="flex-row flex-wrap gap-1.5">
              {service.addOns.slice(0, 2).map((a, idx) => (
                <View key={idx} className="flex-row items-center bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-button gap-x-0.5">
                  <Text className="text-xs text-teal-600 font-medium">{a.name} (+₹{a.price})</Text>
                  {a.isRecommended && <Icon name="star" size={10} color="#f59e0b" />}
                </View>
              ))}
              {service.addOns.length > 2 && (
                <Text className="text-xs text-neutral-400 italic self-center">
                  +{service.addOns.length - 2} more
                </Text>
              )}
            </View>
          </View>
        )}

        {/* Description */}
        {service.description && (
          <Text className="text-xs text-neutral-500 mb-xs leading-5" numberOfLines={2}>
            {service.description}
          </Text>
        )}

        {/* Actions */}
        <View className="flex-row gap-x-2 mt-xs">
          {[
            { label: "Edit",   icon: "create-outline",         bg: "bg-teal-600",    fn: () => openModal(service)      },
            { label: "Toggle", icon: "swap-horizontal-outline", bg: "bg-success",    fn: () => toggleStatus(service)   },
            { label: "Delete", icon: "trash-outline",           bg: "bg-error",      fn: () => handleDelete(service._id) },
          ].map(({ label, icon, bg, fn }) => (
            <TouchableOpacity
              key={label}
              className={`flex-1 flex-row justify-center items-center gap-x-1 ${bg} py-xs rounded-input`}
              onPress={fn}
              activeOpacity={0.8}
            >
              <Icon name={icon} size={14} color="#fff" />
              <Text className="text-neutral-white text-xs font-bold">{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  // ─── RENDER ───────────────────────────────────────────────────────────────
  return (
    <View className="flex-1 bg-neutral-100">

      {/* Header */}
      <View className="bg-teal-600 px-md pt-xl pb-lg">
        <Text className="text-2xl font-bold text-neutral-white">Services</Text>
        <Text className="text-xs text-teal-100 mt-1">{services.length} Total</Text>
      </View>

      {/* Gender filter */}
      <View className="bg-neutral-white px-md py-sm border-b border-neutral-200">
        <Text className="text-xs font-semibold text-neutral-400 mb-xs">Filter by Gender</Text>
        <View className="flex-row gap-x-2">
          {["all", "men", "women", "unisex"].map((g) => {
            const active = genderFilter === g;
            return (
              <TouchableOpacity
                key={g}
                className={`flex-1 items-center py-1 rounded-input border ${
                  active ? "bg-teal-600 border-teal-600" : "bg-neutral-white border-neutral-300"
                }`}
                onPress={() => setGenderFilter(g)}
              >
                <Text className={`text-xs font-bold capitalize ${active ? "text-neutral-white" : "text-teal-600"}`}>
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Error */}
      {error && (
        <Text className="text-error text-center text-sm px-md py-sm">{error}</Text>
      )}

      {/* List */}
      {!loading && !error && (
        <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>

          <TouchableOpacity
            className="flex-row justify-center items-center gap-x-2 bg-teal-600 rounded-input py-sm mb-sm"
            onPress={() => openModal(null)}
            activeOpacity={0.85}
          >
            <Icon name="add-circle-outline" size={18} color="#fff" />
            <Text className="text-neutral-white font-bold text-sm">Add Service</Text>
          </TouchableOpacity>

          {filteredServices.length === 0 ? (
            <View className="flex-1 justify-center items-center py-16">
              <Icon name="cut-outline" size={52} color="#d1d5db" />
              <Text className="text-neutral-400 text-base mt-sm text-center">
                {genderFilter === "all" ? "No services yet" : `No ${genderFilter} services found`}
              </Text>
            </View>
          ) : (
            filteredServices.map(renderCard)
          )}
        </ScrollView>
      )}

      {/* ─── Add / Edit Modal ──────────────────────────────────────────────── */}
      <Modal visible={modalVisible} animationType="slide" transparent={false}>
        <View className="flex-1 bg-neutral-white">
          <ScrollView showsVerticalScrollIndicator={false}>

            {/* Modal header */}
            <View className="flex-row justify-between items-center px-md pt-xl pb-sm border-b border-neutral-100">
              <Text className="text-xl font-bold text-teal-600">
                {editingService ? "Edit Service" : "Add Service"}
              </Text>
              <TouchableOpacity onPress={closeModal} className="p-1">
                <Icon name="close-circle" size={28} color="#ef4444" />
              </TouchableOpacity>
            </View>

            {/* Basic Info */}
            <View className="px-md py-lg border-b border-neutral-100">
              <Text className="text-lg font-bold text-neutral-800 mb-sm">Basic Information</Text>

              <TextInput
                placeholder="Service Name *"
                placeholderTextColor="#9ca3af"
                className="border border-neutral-200 rounded-input px-sm py-xs mb-sm text-sm text-neutral-900"
                value={form.name}
                onChangeText={(v) => setField("name", v)}
              />

              {/* Category picker */}
              <Text className="text-xs font-semibold text-neutral-500 mb-1">Select Category *</Text>
              <View className="border border-neutral-200 rounded-input bg-neutral-50 overflow-hidden mb-sm">
                <Picker selectedValue={form.category} onValueChange={(v) => setField("category", v)}>
                  <Picker.Item label="-- Select Category --" value="" />
                  {categories.map((cat) => (
                    <Picker.Item key={cat._id} label={`${cat.name} (${cat.gender})`} value={cat._id} />
                  ))}
                </Picker>
              </View>

              {/* Selected category pill */}
              {form.category && (() => {
                const cat = categories.find((c) => c._id === form.category);
                const gs  = genderBadge(cat?.gender);
                return (
                  <View className="flex-row items-center gap-x-2 bg-teal-50 border border-teal-100 px-sm py-xs rounded-input mb-sm">
                    <Icon name="information-circle-outline" size={15} color="#156778" />
                    <Text className="text-xs font-bold text-teal-600">{cat?.name}</Text>
                    <View className={`${gs.bg} px-2 py-0.5 rounded-button`}>
                      <Text className={`${gs.text} text-xs font-bold uppercase`}>{cat?.gender}</Text>
                    </View>
                  </View>
                );
              })()}

              {/* Price + Duration */}
              <View className="flex-row gap-x-2">
                <TextInput
                  placeholder="Price (₹) *"
                  placeholderTextColor="#9ca3af"
                  keyboardType="numeric"
                  className="flex-1 border border-neutral-200 rounded-input px-sm py-xs mb-sm text-sm text-neutral-900"
                  value={form.price}
                  onChangeText={(v) => setField("price", v)}
                />
                <TextInput
                  placeholder="Duration (mins)"
                  placeholderTextColor="#9ca3af"
                  keyboardType="numeric"
                  className="flex-1 border border-neutral-200 rounded-input px-sm py-xs mb-sm text-sm text-neutral-900"
                  value={form.durationMins}
                  onChangeText={(v) => setField("durationMins", v)}
                />
              </View>

              <TextInput
                placeholder="Discount %"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
                className="border border-neutral-200 rounded-input px-sm py-xs mb-sm text-sm text-neutral-900"
                value={form.discountPercent}
                onChangeText={(v) => setField("discountPercent", v)}
              />

              <TextInput
                placeholder="Description"
                placeholderTextColor="#9ca3af"
                multiline
                numberOfLines={3}
                className="border border-neutral-200 rounded-input px-sm py-xs mb-sm text-sm text-neutral-900"
                style={{ height: 80, textAlignVertical: "top" }}
                value={form.description}
                onChangeText={(v) => setField("description", v)}
              />

              {/* Service mode */}
              <Text className="text-xs font-semibold text-neutral-500 mb-xs">Service Mode *</Text>
              <View className="flex-row gap-x-2">
                {["salon", "home", "both"].map((mode) => {
                  const active = form.serviceMode === mode;
                  return (
                    <TouchableOpacity
                      key={mode}
                      className={`flex-1 items-center py-xs rounded-input border ${
                        active ? "bg-teal-600 border-teal-600" : "bg-neutral-white border-neutral-300"
                      }`}
                      onPress={() => setField("serviceMode", mode)}
                    >
                      <Text className={`text-xs font-bold capitalize ${active ? "text-neutral-white" : "text-teal-600"}`}>
                        {mode}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Add-ons */}
            <View className="px-md py-lg border-b border-neutral-100">
              <View className="flex-row justify-between items-center mb-sm">
                <View className="flex-row items-baseline gap-x-2">
                  <Text className="text-lg font-bold text-neutral-800">Add-ons</Text>
                  <Text className="text-xs text-neutral-400 italic">(Optional)</Text>
                </View>
                {!showAddOnForm && (
                  <TouchableOpacity
                    className="flex-row items-center gap-x-1 px-sm py-1 rounded-input border border-teal-600"
                    onPress={() => setShowAddOnForm(true)}
                  >
                    <Icon name="add-circle" size={17} color="#156778" />
                    <Text className="text-xs font-bold text-teal-600">Add</Text>
                  </TouchableOpacity>
                )}
              </View>

              {showAddOnForm && (
                <>
                  {form.addOns.map((addon, i) => (
                    <View key={addon.id || i} className="bg-neutral-50 border border-neutral-200 rounded-card p-sm mb-sm">
                      <View className="flex-row justify-between items-center mb-xs">
                        <Text className="text-sm font-bold text-teal-600">Add-on #{i + 1}</Text>
                        <View className="flex-row items-center gap-x-sm">
                          <TouchableOpacity onPress={() => toggleRecommended(i)}>
                            <Icon
                              name={addon.isRecommended ? "star" : "star-outline"}
                              size={20}
                              color={addon.isRecommended ? "#f59e0b" : "#9ca3af"}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => removeAddOn(i)}>
                            <Icon name="trash" size={20} color="#ef4444" />
                          </TouchableOpacity>
                        </View>
                      </View>

                      <TextInput
                        placeholder="Add-on Name *"
                        placeholderTextColor="#9ca3af"
                        className="border border-neutral-200 rounded-input px-sm py-xs mb-xs text-sm text-neutral-900 bg-neutral-white"
                        value={addon.name}
                        onChangeText={(v) => updateAddOn(i, "name", v)}
                      />

                      <View className="flex-row gap-x-2">
                        <TextInput
                          placeholder="Price (₹) *"
                          placeholderTextColor="#9ca3af"
                          keyboardType="numeric"
                          className="flex-1 border border-neutral-200 rounded-input px-sm py-xs text-sm text-neutral-900 bg-neutral-white"
                          value={addon.price}
                          onChangeText={(v) => updateAddOn(i, "price", v)}
                        />
                        <TextInput
                          placeholder="Duration (mins)"
                          placeholderTextColor="#9ca3af"
                          keyboardType="numeric"
                          className="flex-1 border border-neutral-200 rounded-input px-sm py-xs text-sm text-neutral-900 bg-neutral-white"
                          value={addon.duration}
                          onChangeText={(v) => updateAddOn(i, "duration", v)}
                        />
                      </View>

                      {addon.isRecommended && (
                        <View className="flex-row items-center gap-x-1 bg-yellow-50 border border-yellow-100 px-2 py-0.5 rounded-button self-start mt-xs">
                          <Icon name="star" size={11} color="#f59e0b" />
                          <Text className="text-xs font-bold text-warning">Recommended</Text>
                        </View>
                      )}
                    </View>
                  ))}

                  <TouchableOpacity
                    className="flex-row justify-center items-center gap-x-2 py-sm rounded-input border border-teal-600 bg-neutral-white"
                    onPress={addNewAddOn}
                  >
                    <Icon name="add" size={18} color="#156778" />
                    <Text className="text-sm font-bold text-teal-600">Add Another Add-on</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>

            {/* Modal actions */}
            <View className="flex-row gap-x-sm px-md py-lg">
              <TouchableOpacity
                className="flex-1 flex-row justify-center items-center gap-x-2 bg-teal-600 py-sm rounded-input"
                onPress={handleSave}
                activeOpacity={0.85}
              >
                <Icon name="checkmark-circle" size={18} color="#fff" />
                <Text className="text-neutral-white font-bold text-sm">
                  {editingService ? "Update" : "Add Service"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 flex-row justify-center items-center gap-x-2 bg-error py-sm rounded-input"
                onPress={closeModal}
                activeOpacity={0.85}
              >
                <Icon name="close-circle" size={18} color="#fff" />
                <Text className="text-neutral-white font-bold text-sm">Cancel</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}