import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";

export default function ManageServicesScreen() {
  const mockCategories = [
    { _id: "1", name: "Haircut" },
    { _id: "2", name: "Wax" },
    { _id: "3", name: "Facial" },
    { _id: "4", name: "Massage" },
  ];

  const [services, setServices] = useState([
    {
      _id: "101",
      name: "Basic Haircut",
      category: { _id: "1", name: "Haircut" },
      price: 250,
      durationMins: 30,
      discountPercent: 10,
      description: "Includes wash and styling.",
      status: "active",
    },
    {
      _id: "102",
      name: "Full Wax",
      category: { _id: "2", name: "Wax" },
      price: 500,
      durationMins: 45,
      discountPercent: 5,
      description: "Full body wax for women.",
      status: "inactive",
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [durationMins, setDurationMins] = useState("30");
  const [discountPercent, setDiscountPercent] = useState("0");
  const [description, setDescription] = useState("");

  const openModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setName(service.name);
      setCategory(service.category._id);
      setPrice(service.price.toString());
      setDurationMins(service.durationMins.toString());
      setDiscountPercent(service.discountPercent.toString());
      setDescription(service.description || "");
    } else {
      setEditingService(null);
      setName("");
      setCategory("");
      setPrice("");
      setDurationMins("30");
      setDiscountPercent("0");
      setDescription("");
    }
    setModalVisible(true);
  };

  const handleSave = () => {
    if (!name || !category || !price) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    const selectedCategory = mockCategories.find((c) => c._id === category);
    const newService = {
      _id: editingService ? editingService._id : Date.now().toString(),
      name,
      category: selectedCategory,
      price: Number(price),
      durationMins: Number(durationMins),
      discountPercent: Number(discountPercent),
      description,
      status: editingService ? editingService.status : "active",
    };

    if (editingService) {
      setServices((prev) =>
        prev.map((s) => (s._id === editingService._id ? newService : s))
      );
    } else {
      setServices((prev) => [newService, ...prev]);
    }

    setModalVisible(false);
  };

  const handleDelete = (id) => {
    Alert.alert("Delete Service", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () =>
          setServices((prev) => prev.filter((item) => item._id !== id)),
      },
    ]);
  };

  const toggleStatus = (id) => {
    setServices((prev) =>
      prev.map((s) =>
        s._id === id
          ? { ...s, status: s.status === "active" ? "inactive" : "active" }
          : s
      )
    );
  };

  const renderServiceCard = (service) => (
    <View key={service._id} style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{service.name}</Text>
          <Text style={styles.categoryText}>{service.category.name}</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text
            style={[
              styles.statusText,
              { color: service.status === "active" ? "#4CAF50" : "#f44336" },
            ]}
          >
            {service.status === "active" ? "Active" : "Inactive"}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.rowBetween}>
          <Text style={styles.priceText}>₹{service.price}</Text>
          <Text style={styles.durationText}>
            ⏱ {service.durationMins} mins
          </Text>
        </View>
        {service.discountPercent > 0 && (
          <Text style={styles.discountText}>
            💸 {service.discountPercent}% off
          </Text>
        )}
      </View>

      <Text style={styles.desc}>{service.description}</Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#156778" }]}
          onPress={() => openModal(service)}
        >
          <Icon name="create-outline" size={16} color="#fff" />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#4CAF50" }]}
          onPress={() => toggleStatus(service._id)}
        >
          <Icon name="swap-horizontal-outline" size={16} color="#fff" />
          <Text style={styles.actionText}>Toggle</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#f44336" }]}
          onPress={() => handleDelete(service._id)}
        >
          <Icon name="trash-outline" size={16} color="#fff" />
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Services</Text>
        <Text style={styles.count}>{services.length} Total</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => openModal(null)}
        >
          <Icon name="add-circle-outline" size={18} color="#fff" />
          <Text style={styles.addButtonText}>Add Service</Text>
        </TouchableOpacity>

        {services.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name="cut-outline" size={50} color="#ccc" />
            <Text style={styles.emptyText}>No services yet</Text>
          </View>
        ) : (
          services.map(renderServiceCard)
        )}
      </ScrollView>

      {/* Add/Edit Modal */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {editingService ? "Edit Service" : "Add Service"}
          </Text>

          <TextInput
            placeholder="Service Name"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          <Picker
            selectedValue={category}
            onValueChange={setCategory}
            style={styles.input}
          >
            <Picker.Item label="Select Category" value="" />
            {mockCategories.map((cat) => (
              <Picker.Item key={cat._id} label={cat.name} value={cat._id} />
            ))}
          </Picker>

          <TextInput
            placeholder="Price"
            keyboardType="numeric"
            style={styles.input}
            value={price}
            onChangeText={setPrice}
          />

          <TextInput
            placeholder="Duration (mins)"
            keyboardType="numeric"
            style={styles.input}
            value={durationMins}
            onChangeText={setDurationMins}
          />

          <TextInput
            placeholder="Discount %"
            keyboardType="numeric"
            style={styles.input}
            value={discountPercent}
            onChangeText={setDiscountPercent}
          />

          <TextInput
            placeholder="Description"
            style={[styles.input, { height: 80 }]}
            multiline
            value={description}
            onChangeText={setDescription}
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: "#156778" }]}
              onPress={handleSave}
            >
              <Text style={styles.modalButtonText}>
                {editingService ? "Update" : "Add"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: "#f44336" }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: {
    backgroundColor: "#156778",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  count: { fontSize: 12, color: "#ddd", marginTop: 4 },
  scrollContent: { padding: 16 },
  addButton: {
    flexDirection: "row",
    backgroundColor: "#156778",
    borderRadius: 8,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    gap: 6,
  },
  addButtonText: { color: "#fff", fontWeight: "600", fontSize: 14 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerInfo: { flex: 1 },
  name: { fontSize: 16, fontWeight: "700", color: "#333" },
  categoryText: { fontSize: 13, color: "#156778", marginTop: 2 },
  statusContainer: { alignItems: "flex-end" },
  statusText: { fontSize: 13, fontWeight: "600" },
  section: { marginVertical: 8 },
  rowBetween: { flexDirection: "row", justifyContent: "space-between" },
  priceText: { fontSize: 15, fontWeight: "700", color: "#333" },
  durationText: { fontSize: 13, color: "#666" },
  discountText: { fontSize: 12, color: "#4CAF50", marginTop: 4 },
  desc: { fontSize: 12, color: "#555", marginVertical: 8 },
  actions: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 8,
    gap: 4,
  },
  actionText: { color: "#fff", fontWeight: "600", fontSize: 13 },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: { fontSize: 16, color: "#999", marginTop: 10 },
  modalContainer: { flex: 1, padding: 20, backgroundColor: "#fff" },
  modalTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  modalButtonText: { color: "#fff", fontWeight: "bold" },
});
