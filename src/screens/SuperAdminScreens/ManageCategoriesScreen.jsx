import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const CATEGORIES_DATA = [
  {
    id: 1,
    name: 'Hair Styling',
    description: 'Hair cutting, coloring, and styling services',
    icon: '✂️',
    servicesCount: 12,
    salonsCount: 45,
    status: 'Active',
    createdDate: '2024-12-01',
  },
  {
    id: 2,
    name: 'Facial & Skincare',
    description: 'Facial treatments and skin care services',
    icon: '💆',
    servicesCount: 8,
    salonsCount: 38,
    status: 'Active',
    createdDate: '2024-12-05',
  },
  {
    id: 3,
    name: 'Makeup',
    description: 'Professional makeup and beauty services',
    icon: '💄',
    servicesCount: 10,
    salonsCount: 32,
    status: 'Active',
    createdDate: '2024-12-10',
  },
  {
    id: 4,
    name: 'Nail Care',
    description: 'Manicure, pedicure, and nail art services',
    icon: '💅',
    servicesCount: 6,
    salonsCount: 28,
    status: 'Active',
    createdDate: '2024-12-15',
  },
  {
    id: 5,
    name: 'Threading & Waxing',
    description: 'Hair removal and threading services',
    icon: '🧵',
    servicesCount: 5,
    salonsCount: 22,
    status: 'Inactive',
    createdDate: '2024-12-20',
  },
  {
    id: 6,
    name: 'Massage & Spa',
    description: 'Massage therapy and spa services',
    icon: '🧖',
    servicesCount: 7,
    salonsCount: 18,
    status: 'Active',
    createdDate: '2025-01-01',
  },
];

export default function ManageCategoriesScreen() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '✂️',
  });

  const EMOJI_OPTIONS = ['✂️', '💆', '💄', '💅', '🧵', '🧖', '💇', '👗', '👠', '💍'];

  // Filter categories based on tab and search
  const getFilteredCategories = () => {
    let filtered = CATEGORIES_DATA;

    if (activeTab === 'active') {
      filtered = filtered.filter((c) => c.status === 'Active');
    } else if (activeTab === 'inactive') {
      filtered = filtered.filter((c) => c.status === 'Inactive');
    }

    if (searchText) {
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(searchText.toLowerCase()) ||
          c.description.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return filtered;
  };

  const handleAddCategory = () => {
    if (!formData.name || !formData.description) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    Alert.alert(
      'Success',
      `Category ${formData.name} ${selectedCategory ? 'updated' : 'added'} successfully!`
    );
    setFormData({ name: '', description: '', icon: '✂️' });
    setSelectedCategory(null);
    setModalVisible(false);
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      icon: category.icon,
    });
    setModalVisible(true);
  };

  const handleDeleteCategory = (categoryId) => {
    Alert.alert(
      'Delete Category',
      'Are you sure you want to delete this category?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Success', 'Category deleted successfully');
          },
        },
      ]
    );
  };

  const handleToggleStatus = (categoryId) => {
    Alert.alert('Success', 'Category status updated');
  };

  const filteredCategories = getFilteredCategories();
  const statsData = {
    total: CATEGORIES_DATA.length,
    active: CATEGORIES_DATA.filter((c) => c.status === 'Active').length,
    inactive: CATEGORIES_DATA.filter((c) => c.status === 'Inactive').length,
    totalServices: CATEGORIES_DATA.reduce((sum, c) => sum + c.servicesCount, 0),
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Manage Categories</Text>
          <Text style={styles.headerSubtitle}>Salon service categories</Text>
        </View>
        <TouchableOpacity
          style={styles.addCategoryButton}
          onPress={() => {
            setSelectedCategory(null);
            setFormData({ name: '', description: '', icon: '✂️' });
            setModalVisible(true);
          }}
        >
          <Icon name="add" size={20} color="#fff" />
          <Text style={styles.addCategoryButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={styles.statCardContent}>
              <Text style={styles.statCardLabel}>Total Categories</Text>
              <Text style={styles.statCardValue}>{statsData.total}</Text>
            </View>
            <View style={[styles.statCardIcon, { backgroundColor: '#7C5FED20' }]}>
              <Icon name="pricetag" size={24} color="#7C5FED" />
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statCardContent}>
              <Text style={styles.statCardLabel}>Active</Text>
              <Text style={styles.statCardValue}>{statsData.active}</Text>
            </View>
            <View style={[styles.statCardIcon, { backgroundColor: '#4CAF5020' }]}>
              <Icon name="checkmark-circle" size={24} color="#4CAF50" />
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statCardContent}>
              <Text style={styles.statCardLabel}>Inactive</Text>
              <Text style={styles.statCardValue}>{statsData.inactive}</Text>
            </View>
            <View style={[styles.statCardIcon, { backgroundColor: '#FF980020' }]}>
              <Icon name="alert-circle" size={24} color="#FF9800" />
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statCardContent}>
              <Text style={styles.statCardLabel}>Total Services</Text>
              <Text style={styles.statCardValue}>{statsData.totalServices}</Text>
            </View>
            <View style={[styles.statCardIcon, { backgroundColor: '#2196F320' }]}>
              <Icon name="list" size={24} color="#2196F3" />
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Icon name="search" size={20} color="#999" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search categories"
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor="#999"
            />
            {searchText ? (
              <TouchableOpacity onPress={() => setSearchText('')}>
                <Icon name="close" size={20} color="#999" />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'all' && styles.activeTab]}
            onPress={() => setActiveTab('all')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'all' && styles.activeTabText,
              ]}
            >
              All Categories
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'active' && styles.activeTab]}
            onPress={() => setActiveTab('active')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'active' && styles.activeTabText,
              ]}
            >
              Active
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'inactive' && styles.activeTab]}
            onPress={() => setActiveTab('inactive')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'inactive' && styles.activeTabText,
              ]}
            >
              Inactive
            </Text>
          </TouchableOpacity>
        </View>

        {/* Categories Grid */}
        <View style={styles.categoriesSection}>
          {filteredCategories.length > 0 ? (
            <View style={styles.categoriesGrid}>
              {filteredCategories.map((category) => (
                <View key={category.id} style={styles.categoryCard}>
                  <View style={styles.categoryHeader}>
                    <View style={styles.categoryIconContainer}>
                      <Text style={styles.categoryIcon}>{category.icon}</Text>
                    </View>
                    <View style={styles.categoryActions}>
                      <TouchableOpacity
                        onPress={() => handleEditCategory(category)}
                        style={styles.actionButton}
                      >
                        <Icon name="pencil" size={16} color="#7C5FED" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleDeleteCategory(category.id)}
                        style={styles.actionButton}
                      >
                        <Icon name="trash" size={16} color="#F44336" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryDescription} numberOfLines={2}>
                    {category.description}
                  </Text>

                  <View style={styles.categoryStats}>
                    <View style={styles.statItem}>
                      <Icon name="list" size={14} color="#7C5FED" />
                      <Text style={styles.statItemText}>
                        {category.servicesCount} services
                      </Text>
                    </View>
                    <View style={styles.statItem}>
                      <Icon name="storefront" size={14} color="#E91E63" />
                      <Text style={styles.statItemText}>{category.salonsCount} salons</Text>
                    </View>
                  </View>

                  <View style={styles.categoryFooter}>
                    <View
                      style={[
                        styles.statusBadge,
                        {
                          backgroundColor:
                            category.status === 'Active' ? '#C8E6C9' : '#FFCCBC',
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusBadgeText,
                          {
                            color:
                              category.status === 'Active' ? '#2E7D32' : '#E65100',
                          },
                        ]}
                      >
                        {category.status}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.toggleButton}
                      onPress={() => handleToggleStatus(category.id)}
                    >
                      <Icon
                        name={category.status === 'Active' ? 'pause-circle' : 'play-circle'}
                        size={18}
                        color={category.status === 'Active' ? '#FF9800' : '#4CAF50'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Icon name="search" size={48} color="#DDD" />
              <Text style={styles.emptyStateText}>No categories found</Text>
              <Text style={styles.emptyStateSubtext}>Try adjusting your filters</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Add/Edit Category Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {selectedCategory ? 'Edit Category' : 'Add New Category'}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  setSelectedCategory(null);
                }}
              >
                <Icon name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalForm} showsVerticalScrollIndicator={false}>
              {/* Icon Selector */}
              <Text style={styles.inputLabel}>Select Icon</Text>
              <View style={styles.emojiGrid}>
                {EMOJI_OPTIONS.map((emoji) => (
                  <TouchableOpacity
                    key={emoji}
                    style={[
                      styles.emojiOption,
                      formData.icon === emoji && styles.emojiOptionSelected,
                    ]}
                    onPress={() => setFormData({ ...formData, icon: emoji })}
                  >
                    <Text style={styles.emojiText}>{emoji}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.inputLabel}>Category Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter category name"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                placeholderTextColor="#999"
              />

              <Text style={styles.inputLabel}>Description *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter category description"
                value={formData.description}
                onChangeText={(text) => setFormData({ ...formData, description: text })}
                multiline
                numberOfLines={4}
                placeholderTextColor="#999"
                textAlignVertical="top"
              />
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setModalVisible(false);
                  setSelectedCategory(null);
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton} onPress={handleAddCategory}>
                <Icon name="checkmark" size={18} color="#fff" />
                <Text style={styles.submitButtonText}>
                  {selectedCategory ? 'Update' : 'Add'} Category
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  addCategoryButton: {
    flexDirection: 'row',
    backgroundColor: '#2196F3',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
    gap: 4,
  },
  addCategoryButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 30,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  statCardContent: {
    flex: 1,
  },
  statCardLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500',
    marginBottom: 4,
  },
  statCardValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  statCardIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchSection: {
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    gap: 4,
    marginBottom: 16,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#2196F3',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
  },
  activeTabText: {
    color: '#fff',
  },
  categoriesSection: {
    gap: 12,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 24,
  },
  categoryActions: {
    flexDirection: 'row',
    gap: 6,
  },
  actionButton: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 11,
    color: '#999',
    marginBottom: 10,
    lineHeight: 15,
  },
  categoryStats: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f5f5f5',
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  statItemText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#666',
  },
  categoryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    flex: 1,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  toggleButton: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
    marginTop: 12,
  },
  emptyStateSubtext: {
    fontSize: 12,
    color: '#BBB',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  modalForm: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  emojiOption: {
    width: '22%',
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  emojiOptionSelected: {
    backgroundColor: '#E8D4F8',
    borderColor: '#7C5FED',
  },
  emojiText: {
    fontSize: 24,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
    marginBottom: 14,
  },
  textArea: {
    paddingVertical: 12,
    minHeight: 100,
  },
  modalFooter: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  submitButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },
});