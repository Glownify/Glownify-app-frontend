import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Alert,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "react-native-image-picker";
import {
  fetchAllCategories,
  createCategory,
  updateCategory,
} from "../../redux/slices/superAdminSlice";
import { uploadImageToCloudinary } from "../api/cloudinary";
import ErrorMessage from "../../components/ErrorMessage";
import Loader from "../../components/Loader";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ManageCategoriesScreen() {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.superAdmin
  );

  console.log("Categories:", categories);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(""); // URL after upload
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const openCreateModal = () => {
    setEditingCategory(null);
    setName("");
    setIcon("");
    setModalVisible(true);
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    setName(category.name);
    setIcon(category.icon || "");
    setModalVisible(true);
  };

  const handleSubmit = async () => {
  if (!name.trim()) return;
  const data = { name, icon };

  try {
    if (editingCategory) {
      await dispatch(updateCategory({ categoryId: editingCategory._id, data })).unwrap();
      Alert.alert("Success", "Category updated successfully!");
    } else {
      await dispatch(createCategory(data)).unwrap();
      Alert.alert("Success", "Category created successfully!");
    }
    setModalVisible(false);
  } catch (err) {
    Alert.alert("Error", err.message || "Something went wrong");
  }
};

  const pickImage = async () => {
    ImagePicker.launchImageLibrary({ mediaType: "photo" }, async (response) => {
      if (response.didCancel || response.errorCode) return;

      const file = response.assets[0];

      try {
        setUploading(true);
        const url = await uploadImageToCloudinary(file);
        setIcon(url); // save uploaded image URL in state
      } catch (err) {
        Alert.alert("Upload failed", err.message);
      } finally {
        setUploading(false);
      }
    });
  };

  const renderCategoryItem = ({ item }) => (
    <View style={styles.categoryCard}>
      {item.icon ? <Image source={{ uri: item.icon }} style={styles.icon} /> : null}
      <Text style={styles.categoryName}>{item.name}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => openEditModal(item)}
      >
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Manage Categories</Text>

      <Button title="Create Category" color="#156778" onPress={openCreateModal} />

      {loading && (
        <Loader />
      )}

      {error && (
        <ErrorMessage message={error.message} />
      )}

      {!loading && !error && (
        <FlatList
          data={categories}
          keyExtractor={(item) => item._id}
          renderItem={renderCategoryItem}
          contentContainerStyle={{ paddingBottom: 20, marginTop: 12 }}
        />
      )}

      {/* Modal for Create / Update */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {editingCategory ? "Update Category" : "Create Category"}
            </Text>

            <TextInput
              placeholder="Category Name"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />

            <Button
              title={uploading ? "Uploading..." : "Pick Icon"}
              onPress={pickImage}
              color="#156778"
              disabled={uploading}
            />

            {icon ? <Image source={{ uri: icon }} style={styles.previewIcon} /> : null}

            <View style={styles.buttonRow}>
              <Button
                title="Cancel"
                color="red"
                onPress={() => setModalVisible(false)}
              />
              <Button
                title={editingCategory ? "Update" : "Create"}
                onPress={handleSubmit}
                color="#156778"
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  categoryCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  categoryName: { fontSize: 16, marginLeft: 8, flex: 1 },
  editButton: {
    backgroundColor: "#156778",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  editText: { color: "#fff", fontSize: 14 },
  loadingContainer: { marginTop: 20, alignItems: "center" },
  errorContainer: { marginTop: 20, padding: 12, backgroundColor: "#ffe5e5", borderRadius: 8 },
  errorText: { color: "#ff3333" },
  overlay: { flex: 1, justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContainer: { margin: 20, padding: 20, backgroundColor: "#fff", borderRadius: 12, elevation: 5 },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 12 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  previewIcon: { width: 60, height: 60, marginVertical: 10, borderRadius: 8 },
  icon: { width: 40, height: 40, borderRadius: 6 },
});
