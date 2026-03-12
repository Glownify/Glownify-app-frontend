/**
 * ManageCategoriesScreen.jsx
 * Fully rewritten using NativeWind className only — no StyleSheet.
 * Theme tokens from tailwind.config.js used throughout.
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategories } from '../../redux/slices/salonAdminSlice';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_CATEGORIES = [
  {
    _id: '1',
    name: 'Haircut',
    icon: 'cut',
    gender: 'unisex',
    subcategories: ['Men', 'Women', 'Kids'],
    description: 'Hair cutting services',
  },
  {
    _id: '2',
    name: 'Hair Spa',
    icon: 'water',
    gender: 'unisex',
    subcategories: ['Oil Treatment', 'Protein Treatment'],
    description: 'Relaxing hair spa treatments',
  },
  {
    _id: '3',
    name: 'Facial',
    icon: 'rose',
    gender: 'women',
    subcategories: ['Hydrating', 'Brightening', 'Anti-Aging'],
    description: 'Professional facial treatments',
  },
  {
    _id: '4',
    name: 'Makeup',
    icon: 'sparkles',
    gender: 'women',
    subcategories: ['Bridal', 'Party', 'Casual'],
    description: 'Professional makeup services',
  },
  {
    _id: '5',
    name: 'Waxing',
    icon: 'flame',
    gender: 'women',
    subcategories: ['Full Body', 'Face', 'Legs'],
    description: 'Professional waxing services',
  },
  {
    _id: '6',
    name: 'Grooming',
    icon: 'people',
    gender: 'men',
    subcategories: ['Beard', 'Shaving', 'Massage'],
    description: 'Professional grooming services',
  },
];

const ICON_OPTIONS = [
  { label: 'Cut',      value: 'cut'      },
  { label: 'Water',    value: 'water'    },
  { label: 'Rose',     value: 'rose'     },
  { label: 'Sparkles', value: 'sparkles' },
  { label: 'Flame',    value: 'flame'    },
  { label: 'People',   value: 'people'   },
];

const GENDER_OPTIONS = [
  { label: 'Men',    value: 'men'    },
  { label: 'Women',  value: 'women'  },
  { label: 'Unisex', value: 'unisex' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const genderClasses = {
  men:    { bg: 'bg-info',          text: 'text-neutral-white' },
  women:  { bg: 'bg-primary-500',   text: 'text-neutral-white' },
  unisex: { bg: 'bg-teal-600',      text: 'text-neutral-white' },
};

// ─── Category Card ────────────────────────────────────────────────────────────

const CategoryCard = ({ category, onEdit, onDelete, onAddSubcategory, onDeleteSubcategory }) => {
  const gc = genderClasses[category.gender] ?? genderClasses.unisex;

  return (
    <View className="bg-neutral-white rounded-2xl p-4 mb-3 shadow-card">

      {/* Card Header */}
      <View className="flex-row items-start gap-3 mb-3">
        <View className="w-14 h-14 rounded-xl bg-teal-50 items-center justify-center">
          <Icon name={category.icon} size={28} color="#156778" />
        </View>

        <View className="flex-1">
          <Text className="text-base font-bold text-neutral-800">{category.name}</Text>
          <View className="flex-row items-center gap-2 mt-1.5">
            <View className={`px-2 py-1 rounded-lg ${gc.bg}`}>
              <Text className={`text-xs font-semibold uppercase tracking-wide ${gc.text}`}>
                {category.gender}
              </Text>
            </View>
            <Text className="text-xs text-neutral-400 font-medium">
              {category.subcategories.length} subcategories
            </Text>
          </View>
        </View>
      </View>

      {/* Description */}
      {!!category.description && (
        <Text className="text-xs text-neutral-500 mb-3 leading-relaxed">
          {category.description}
        </Text>
      )}

      {/* Subcategories */}
      {category.subcategories.length > 0 && (
        <View className="bg-neutral-50 rounded-xl p-3 mb-3 border-l-4 border-teal-600">
          <Text className="text-xs font-semibold text-neutral-700 mb-2">Subcategories</Text>
          {category.subcategories.map((sub, i) => (
            <View key={i} className="flex-row items-center justify-between py-1.5 px-2">
              <Text className="text-xs text-neutral-600">• {sub}</Text>
              <TouchableOpacity onPress={() => onDeleteSubcategory(category._id, sub)}>
                <Icon name="close-circle" size={18} color="#ef4444" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {/* Action Buttons */}
      <View className="flex-row gap-2 mt-1">
        <TouchableOpacity
          className="flex-1 flex-row items-center justify-center gap-1 bg-success py-2.5 rounded-xl"
          onPress={() => onAddSubcategory(category)}
          activeOpacity={0.85}
        >
          <Icon name="add-circle" size={15} color="#fff" />
          <Text className="text-xs font-semibold text-neutral-white">Add Sub</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 flex-row items-center justify-center gap-1 bg-teal-600 py-2.5 rounded-xl"
          onPress={() => onEdit(category)}
          activeOpacity={0.85}
        >
          <Icon name="create-outline" size={15} color="#fff" />
          <Text className="text-xs font-semibold text-neutral-white">Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 flex-row items-center justify-center gap-1 bg-error py-2.5 rounded-xl"
          onPress={() => onDelete(category._id)}
          activeOpacity={0.85}
        >
          <Icon name="trash-outline" size={15} color="#fff" />
          <Text className="text-xs font-semibold text-neutral-white">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function ManageCategoriesScreen({ navigation }) {
  const dispatch = useDispatch();
  const { categories = [] } = useSelector(state => state.salonAdmin);

  const [displayCategories, setDisplayCategories] = useState(MOCK_CATEGORIES);
  const [modalVisible, setModalVisible] = useState(false);
  const [subcategoryModalVisible, setSubcategoryModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [selectedCategoryForSubcategory, setSelectedCategoryForSubcategory] = useState(null);

  const [categoryForm, setCategoryForm] = useState({
    name: '', icon: 'cut', gender: 'unisex', description: '',
  });
  const [newSubcategory, setNewSubcategory] = useState('');

  useEffect(() => { dispatch(fetchAllCategories()); }, [dispatch]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const openAddModal = () => {
    setEditingCategory(null);
    setCategoryForm({ name: '', icon: 'cut', gender: 'unisex', description: '' });
    setModalVisible(true);
  };

  const openEditModal = cat => {
    setEditingCategory(cat);
    setCategoryForm({ name: cat.name, icon: cat.icon, gender: cat.gender, description: cat.description });
    setModalVisible(true);
  };

  const handleSave = () => {
    if (!categoryForm.name.trim()) { Alert.alert('Error', 'Please enter a category name'); return; }

    if (editingCategory) {
      setDisplayCategories(prev =>
        prev.map(c => c._id === editingCategory._id ? { ...c, ...categoryForm } : c),
      );
      Alert.alert('Success', 'Category updated');
    } else {
      setDisplayCategories(prev => [
        ...prev,
        { _id: Date.now().toString(), ...categoryForm, subcategories: [] },
      ]);
      Alert.alert('Success', 'Category added');
    }

    setModalVisible(false);
    setCategoryForm({ name: '', icon: 'cut', gender: 'unisex', description: '' });
  };

  const handleDelete = id => {
    Alert.alert('Delete Category', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive',
        onPress: () => {
          setDisplayCategories(prev => prev.filter(c => c._id !== id));
          Alert.alert('Success', 'Category deleted');
        },
      },
    ]);
  };

  const openSubcategoryModal = cat => {
    setSelectedCategoryForSubcategory(cat);
    setNewSubcategory('');
    setSubcategoryModalVisible(true);
  };

  const handleAddSubcategory = () => {
    if (!newSubcategory.trim()) { Alert.alert('Error', 'Please enter a subcategory name'); return; }
    if (selectedCategoryForSubcategory.subcategories.includes(newSubcategory)) {
      Alert.alert('Error', 'Subcategory already exists'); return;
    }

    setDisplayCategories(prev =>
      prev.map(c =>
        c._id === selectedCategoryForSubcategory._id
          ? { ...c, subcategories: [...c.subcategories, newSubcategory] }
          : c,
      ),
    );
    Alert.alert('Success', 'Subcategory added');
    setSubcategoryModalVisible(false);
    setNewSubcategory('');
  };

  const handleDeleteSubcategory = (catId, subName) => {
    Alert.alert('Delete Subcategory', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive',
        onPress: () => {
          setDisplayCategories(prev =>
            prev.map(c =>
              c._id === catId
                ? { ...c, subcategories: c.subcategories.filter(s => s !== subName) }
                : c,
            ),
          );
          Alert.alert('Success', 'Subcategory deleted');
        },
      },
    ]);
  };

  // ── Shared input class ────────────────────────────────────────────────────

  const inputClass =
    'bg-neutral-white border border-neutral-200 rounded-input px-3 py-2.5 text-sm text-neutral-800';

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <View className="flex-1 bg-neutral-100">

      {/* ── Header ── */}
      <View className="bg-teal-600 px-md py-4">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            className="w-9 h-9 rounded-full bg-white/20 items-center justify-center"
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Icon name="arrow-back" size={20} color="#fff" />
          </TouchableOpacity>
          <View>
            <Text className="text-xl font-bold text-neutral-white">Service Categories</Text>
            <Text className="text-xs text-teal-100 mt-0.5">Manage your service categories</Text>
          </View>
        </View>
      </View>

      {/* ── Add Button ── */}
      <TouchableOpacity
        className="flex-row items-center justify-center gap-2 bg-success mx-md my-3 py-3 rounded-xl"
        onPress={openAddModal}
        activeOpacity={0.85}
      >
        <Icon name="add-circle" size={20} color="#fff" />
        <Text className="text-neutral-white text-sm font-semibold">Add New Category</Text>
      </TouchableOpacity>

      {/* ── List ── */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {displayCategories.length === 0 ? (
          <View className="items-center justify-center py-16">
            <Icon name="folder-outline" size={60} color="#d1d5db" />
            <Text className="text-base text-neutral-400 mt-3">No categories yet</Text>
          </View>
        ) : (
          displayCategories.map(cat => (
            <CategoryCard
              key={cat._id}
              category={cat}
              onEdit={openEditModal}
              onDelete={handleDelete}
              onAddSubcategory={openSubcategoryModal}
              onDeleteSubcategory={handleDeleteSubcategory}
            />
          ))
        )}
      </ScrollView>

      {/* ══════════════════════════════════════════════════════════════════════
          Add / Edit Category Modal
      ══════════════════════════════════════════════════════════════════════ */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView className="flex-1 bg-neutral-100">
          <ScrollView showsVerticalScrollIndicator={false}>

            {/* Modal Header */}
            <View className="flex-row items-center justify-between px-md py-3 bg-neutral-white border-b border-neutral-100">
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="arrow-back" size={24} color="#156778" />
              </TouchableOpacity>
              <Text className="text-base font-bold text-neutral-800">
                {editingCategory ? 'Edit Category' : 'Add Category'}
              </Text>
              <View className="w-6" />
            </View>

            <View className="p-md">

              {/* Category Name */}
              <Text className="text-sm font-semibold text-neutral-700 mt-4 mb-2">
                Category Name <Text className="text-error">*</Text>
              </Text>
              <TextInput
                className={inputClass}
                placeholder="e.g., Haircut, Facial"
                placeholderTextColor="#9ca3af"
                value={categoryForm.name}
                onChangeText={text => setCategoryForm(f => ({ ...f, name: text }))}
              />

              {/* Icon Selection */}
              <Text className="text-sm font-semibold text-neutral-700 mt-5 mb-2">Icon</Text>
              <View className="flex-row flex-wrap gap-2">
                {ICON_OPTIONS.map(opt => {
                  const active = categoryForm.icon === opt.value;
                  return (
                    <TouchableOpacity
                      key={opt.value}
                      className={`items-center justify-center py-3 rounded-xl border-2 flex-1
                        ${active
                          ? 'bg-teal-600 border-teal-600'
                          : 'bg-neutral-50 border-neutral-200'}`}
                      style={{ minWidth: '30%' }}
                      onPress={() => setCategoryForm(f => ({ ...f, icon: opt.value }))}
                      activeOpacity={0.85}
                    >
                      <Icon
                        name={opt.value}
                        size={24}
                        color={active ? '#ffffff' : '#156778'}
                      />
                      <Text className={`text-xs mt-1.5 font-medium ${active ? 'text-neutral-white' : 'text-neutral-500'}`}>
                        {opt.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Gender Selection */}
              <Text className="text-sm font-semibold text-neutral-700 mt-5 mb-2">Gender</Text>
              <View className="flex-row gap-2.5">
                {GENDER_OPTIONS.map(opt => {
                  const active = categoryForm.gender === opt.value;
                  return (
                    <TouchableOpacity
                      key={opt.value}
                      className={`flex-1 items-center py-3 rounded-xl border-2
                        ${active
                          ? 'bg-teal-600 border-teal-600'
                          : 'bg-neutral-50 border-neutral-200'}`}
                      onPress={() => setCategoryForm(f => ({ ...f, gender: opt.value }))}
                      activeOpacity={0.85}
                    >
                      <Text className={`text-sm font-semibold ${active ? 'text-neutral-white' : 'text-neutral-500'}`}>
                        {opt.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Description */}
              <Text className="text-sm font-semibold text-neutral-700 mt-5 mb-2">Description</Text>
              <TextInput
                className={`${inputClass}`}
                style={{ height: 88, textAlignVertical: 'top' }}
                placeholder="Describe this category"
                placeholderTextColor="#9ca3af"
                value={categoryForm.description}
                onChangeText={text => setCategoryForm(f => ({ ...f, description: text }))}
                multiline
              />

              {/* Save Button */}
              <TouchableOpacity
                className="flex-row items-center justify-center gap-2 bg-teal-600 rounded-xl py-3.5 mt-6"
                onPress={handleSave}
                activeOpacity={0.85}
              >
                <Icon name="checkmark" size={20} color="#fff" />
                <Text className="text-neutral-white text-base font-bold">Save Category</Text>
              </TouchableOpacity>

            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* ══════════════════════════════════════════════════════════════════════
          Add Subcategory Modal
      ══════════════════════════════════════════════════════════════════════ */}
      <Modal
        visible={subcategoryModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setSubcategoryModalVisible(false)}
      >
        <SafeAreaView className="flex-1 bg-neutral-100">

          {/* Modal Header */}
          <View className="flex-row items-center justify-between px-md py-3 bg-neutral-white border-b border-neutral-100">
            <TouchableOpacity onPress={() => setSubcategoryModalVisible(false)}>
              <Icon name="arrow-back" size={24} color="#156778" />
            </TouchableOpacity>
            <Text className="text-sm font-bold text-neutral-800 flex-1 text-center" numberOfLines={1}>
              Add to {selectedCategoryForSubcategory?.name}
            </Text>
            <View className="w-6" />
          </View>

          <View className="p-md">
            <Text className="text-sm font-semibold text-neutral-700 mt-4 mb-2">
              Subcategory Name <Text className="text-error">*</Text>
            </Text>
            <TextInput
              className={inputClass}
              placeholder="e.g., Men, Women, Kids"
              placeholderTextColor="#9ca3af"
              value={newSubcategory}
              onChangeText={setNewSubcategory}
            />

            <TouchableOpacity
              className="flex-row items-center justify-center gap-2 bg-teal-600 rounded-xl py-3.5 mt-6"
              onPress={handleAddSubcategory}
              activeOpacity={0.85}
            >
              <Icon name="add" size={20} color="#fff" />
              <Text className="text-neutral-white text-base font-bold">Add Subcategory</Text>
            </TouchableOpacity>
          </View>

        </SafeAreaView>
      </Modal>

    </View>
  );
}