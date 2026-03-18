import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
// 🔁 Uncomment for Redux integration:
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   fetchProServices,
//   fetchAllCategories,
//   createServiceItem,
//   updateServiceItem,
//   deleteServiceItem,
// } from '../../redux/slices/independentProSlice';
// import Loader from '../../components/Loader';

// ─── Constants ────────────────────────────────────────────────────────────────

const H_PAD = 16;

// ─── Mock Data ────────────────────────────────────────────────────────────────
// 🔁 Replace with Redux selectors:
// const { services, loading, error, categories } = useSelector(state => state.independentPro);
// useEffect(() => { dispatch(fetchProServices()); dispatch(fetchAllCategories()); }, [dispatch]);

const DUMMY_CATEGORIES = [
  { _id: 'c1', name: 'Hair Care',        gender: 'unisex', icon: 'cut-outline'           },
  { _id: 'c2', name: 'Skin & Facial',    gender: 'women',  icon: 'flower-outline'        },
  { _id: 'c3', name: 'Beard & Grooming', gender: 'men',    icon: 'man-outline'           },
  { _id: 'c4', name: 'Nail Art',         gender: 'women',  icon: 'color-palette-outline' },
  { _id: 'c5', name: 'Massage',          gender: 'unisex', icon: 'body-outline'          },
];

const DUMMY_SERVICES = [
  {
    _id: 's1',
    name: 'Classic Haircut',
    category: { _id: 'c1', name: 'Hair Care', gender: 'unisex', icon: 'cut-outline' },
    price: 500,
    durationMins: 30,
    discountPercent: 10,
    description: 'A clean, classic haircut styled to your preference.',
    serviceMode: 'salon',
    status: 'active',
    gender: 'unisex',
    addOns: [
      { name: 'Hair Wash',  price: 100, duration: 10, isRecommended: true  },
      { name: 'Blow Dry',   price: 150, duration: 15, isRecommended: false },
    ],
  },
  {
    _id: 's2',
    name: 'Keratin Treatment',
    category: { _id: 'c1', name: 'Hair Care', gender: 'unisex', icon: 'cut-outline' },
    price: 2500,
    durationMins: 120,
    discountPercent: 0,
    description: 'Deep nourishing keratin treatment for smooth, frizz-free hair.',
    serviceMode: 'salon',
    status: 'active',
    gender: 'women',
    addOns: [],
  },
  {
    _id: 's3',
    name: 'Beard Shaping',
    category: { _id: 'c3', name: 'Beard & Grooming', gender: 'men', icon: 'man-outline' },
    price: 250,
    durationMins: 20,
    discountPercent: 0,
    description: 'Precision beard trim and shaping with hot towel finish.',
    serviceMode: 'both',
    status: 'inactive',
    gender: 'men',
    addOns: [{ name: 'Hot Towel', price: 50, duration: 5, isRecommended: true }],
  },
  {
    _id: 's4',
    name: 'Deep Facial',
    category: { _id: 'c2', name: 'Skin & Facial', gender: 'women', icon: 'flower-outline' },
    price: 1200,
    durationMins: 60,
    discountPercent: 15,
    description: 'Deep cleansing facial with exfoliation and moisturizing.',
    serviceMode: 'home',
    status: 'active',
    gender: 'women',
    addOns: [],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const cardShadow = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.06,
  shadowRadius: 10,
  elevation: 2,
};

const getGenderColors = gender => {
  switch (gender) {
    case 'men':    return { bg: '#dbeafe', text: '#1d4ed8' };
    case 'women':  return { bg: '#fce7f3', text: '#be185d' };
    case 'unisex': return { bg: '#ede9fe', text: '#7c3aed' };
    default:       return { bg: '#f3f4f6', text: '#6b7280' };
  }
};

const getModeColors = mode => {
  switch (mode) {
    case 'salon': return { bg: '#d1fae5', text: '#065f46', icon: 'business-outline' };
    case 'home':  return { bg: '#fef3c7', text: '#92400e', icon: 'home-outline'     };
    default:      return { bg: '#dbeafe', text: '#1e40af', icon: 'list-outline'     };
  }
};

const EMPTY_FORM = {
  name: '', category: '', price: '', durationMins: '30',
  discountPercent: '0', description: '', serviceMode: 'salon', addOns: [],
};

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function IndependentProManageServicesScreen({ navigation }) {
  // 🔁 Replace with Redux:
  // const dispatch = useDispatch();
  // const { services, loading, error, categories } = useSelector(state => state.independentPro);
  const [services, setServices]     = useState(DUMMY_SERVICES);
  const categories                   = DUMMY_CATEGORIES;
  const loading                      = false; // 🔁 from Redux
  const error                        = null;  // 🔁 from Redux

  const [modalVisible, setModalVisible]     = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [genderFilter, setGenderFilter]     = useState('all');
  const [form, setForm]                     = useState(EMPTY_FORM);
  const [showAddOnForm, setShowAddOnForm]   = useState(false);

  // 🔁 Uncomment for real data fetch:
  // useEffect(() => {
  //   dispatch(fetchProServices());
  //   dispatch(fetchAllCategories());
  // }, [dispatch]);

  const setField = (key, value) => setForm(f => ({ ...f, [key]: value }));

  // ── Add-on helpers ──────────────────────────────────────────────────────────

  const addNewAddOn = () => {
    setField('addOns', [
      ...form.addOns,
      { id: Date.now().toString(), name: '', price: '', duration: '0', isRecommended: false },
    ]);
    setShowAddOnForm(true);
  };

  const updateAddOn = (i, field, value) => {
    const updated = form.addOns.map((a, idx) => idx === i ? { ...a, [field]: value } : a);
    setField('addOns', updated);
  };

  const removeAddOn = i => {
    Alert.alert('Remove Add-on', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove', style: 'destructive',
        onPress: () => {
          const updated = form.addOns.filter((_, idx) => idx !== i);
          setField('addOns', updated);
          if (updated.length === 0) setShowAddOnForm(false);
        },
      },
    ]);
  };

  const toggleRecommended = i => {
    const updated = form.addOns.map((a, idx) =>
      idx === i ? { ...a, isRecommended: !a.isRecommended } : a,
    );
    setField('addOns', updated);
  };

  // ── Modal open/close ────────────────────────────────────────────────────────

  const openModal = (service = null) => {
    if (service) {
      const catId = typeof service.category === 'string'
        ? service.category : service.category?._id;
      setEditingService(service);
      setForm({
        name:            service.name || '',
        category:        catId || '',
        price:           service.price != null ? String(service.price) : '',
        durationMins:    service.durationMins != null ? String(service.durationMins) : '30',
        discountPercent: service.discountPercent != null ? String(service.discountPercent) : '0',
        description:     service.description || '',
        serviceMode:     service.serviceMode || 'salon',
        addOns: (service.addOns || []).map(a => ({
          id: a._id || Date.now().toString(),
          name: a.name || '',
          price: a.price != null ? String(a.price) : '',
          duration: a.duration != null ? String(a.duration) : '0',
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

  // ── Save ────────────────────────────────────────────────────────────────────

  const handleSave = async () => {
    if (!form.name || !form.category || !form.price) {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }

    const serviceData = {
      name:            form.name,
      category:        form.category,
      price:           Number(form.price),
      durationMins:    Number(form.durationMins),
      discountPercent: Number(form.discountPercent),
      description:     form.description,
      serviceMode:     form.serviceMode,
      addOns:          form.addOns,
      providerType:    'IndependentPro',
    };

    // 🔁 Replace with Redux dispatch:
    // try {
    //   if (editingService) {
    //     await dispatch(updateServiceItem({ serviceId: editingService._id, updateData: serviceData })).unwrap();
    //   } else {
    //     await dispatch(createServiceItem(serviceData)).unwrap();
    //   }
    //   dispatch(fetchProServices());
    // } catch (err) {
    //   Alert.alert('Error', err?.message || String(err));
    //   return;
    // }

    Alert.alert('Success', editingService ? 'Service updated!' : 'Service added!');
    closeModal();
  };

  // ── Delete ──────────────────────────────────────────────────────────────────

  const handleDelete = id => {
    Alert.alert('Delete Service', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive',
        onPress: () => {
          // 🔁 Replace with: dispatch(deleteServiceItem(id)).then(() => dispatch(fetchProServices()))
          setServices(prev => prev.filter(s => s._id !== id));
        },
      },
    ]);
  };

  // ── Toggle status ───────────────────────────────────────────────────────────

  const toggleStatus = service => {
    // 🔁 Replace with:
    // dispatch(updateServiceItem({ serviceId: service._id, updateData: { status: service.status === 'active' ? 'inactive' : 'active' } }))
    //   .then(() => dispatch(fetchProServices()));
    setServices(prev =>
      prev.map(s =>
        s._id === service._id
          ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' }
          : s,
      ),
    );
  };

  // ── Filter ──────────────────────────────────────────────────────────────────

  const filteredServices = genderFilter === 'all' ? services : services.filter(s => {
    const g = s.gender
      || (typeof s.category === 'object' && s.category?.gender)
      || categories.find(c => c._id === s.category)?.gender;
    return g === genderFilter || g === 'unisex';
  });

  // ─── Service Card ─────────────────────────────────────────────────────────

  const renderCard = service => {
    const catObj  = typeof service.category === 'object'
      ? service.category
      : categories.find(c => c._id === service.category);
    const gender  = service.gender || catObj?.gender;
    const gColors = getGenderColors(gender);
    const mColors = getModeColors(service.serviceMode);

    return (
      <View
        key={service._id}
        style={{
          backgroundColor: '#fff',
          borderRadius: 16,
          padding: 14,
          marginBottom: 12,
          ...cardShadow,
        }}
      >
        {/* Top row: name + status */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: '800', color: '#111827' }}>
              {service.name}
            </Text>

            {/* Badges row */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 6, marginTop: 5 }}>
              {catObj?.icon && (
                <Icon name={catObj.icon} size={13} color="#156778" />
              )}
              {catObj?.name && (
                <Text style={{ fontSize: 12, fontWeight: '600', color: '#156778' }}>
                  {catObj.name}
                </Text>
              )}

              {gender && (
                <View style={{ backgroundColor: gColors.bg, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20 }}>
                  <Text style={{ fontSize: 10, fontWeight: '700', color: gColors.text, textTransform: 'uppercase' }}>
                    {gender}
                  </Text>
                </View>
              )}

              {service.serviceMode && (
                <View style={{
                  backgroundColor: mColors.bg,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  borderRadius: 20,
                  gap: 3,
                }}>
                  <Icon name={mColors.icon} size={10} color={mColors.text} />
                  <Text style={{ fontSize: 10, fontWeight: '700', color: mColors.text, textTransform: 'capitalize' }}>
                    {service.serviceMode}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Status pill */}
          <View style={{
            backgroundColor: service.status === 'active' ? '#d1fae5' : '#f3f4f6',
            paddingHorizontal: 10,
            paddingVertical: 3,
            borderRadius: 20,
          }}>
            <Text style={{
              fontSize: 11,
              fontWeight: '700',
              color: service.status === 'active' ? '#059669' : '#9ca3af',
            }}>
              {service.status === 'active' ? 'Active' : 'Inactive'}
            </Text>
          </View>
        </View>

        {/* Price / Duration / Discount */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 10,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: '#f3f4f6',
          marginVertical: 6,
        }}>
          <Text style={{ fontSize: 16, fontWeight: '800', color: '#111827' }}>
            ₹{service.price.toLocaleString()}
          </Text>
          <Text style={{ fontSize: 12, color: '#6b7280' }}>
            ⏱ {service.durationMins} mins
          </Text>
          {service.discountPercent > 0 && (
            <View style={{ backgroundColor: '#d1fae5', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20 }}>
              <Text style={{ fontSize: 11, fontWeight: '700', color: '#059669' }}>
                💸 {service.discountPercent}% off
              </Text>
            </View>
          )}
        </View>

        {/* Add-ons preview */}
        {service.addOns?.length > 0 && (
          <View style={{ marginBottom: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 5 }}>
              <Icon name="add-circle-outline" size={13} color="#156778" />
              <Text style={{ fontSize: 12, fontWeight: '700', color: '#156778' }}>
                {service.addOns.length} Add-on{service.addOns.length > 1 ? 's' : ''}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
              {service.addOns.slice(0, 2).map((a, idx) => (
                <View
                  key={idx}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#f0fdfa',
                    borderWidth: 1,
                    borderColor: '#99f6e4',
                    paddingHorizontal: 8,
                    paddingVertical: 3,
                    borderRadius: 20,
                    gap: 4,
                  }}
                >
                  <Text style={{ fontSize: 11, color: '#0d9488', fontWeight: '600' }}>
                    {a.name} (+₹{a.price})
                  </Text>
                  {a.isRecommended && <Icon name="star" size={10} color="#f59e0b" />}
                </View>
              ))}
              {service.addOns.length > 2 && (
                <Text style={{ fontSize: 11, color: '#9ca3af', fontStyle: 'italic', alignSelf: 'center' }}>
                  +{service.addOns.length - 2} more
                </Text>
              )}
            </View>
          </View>
        )}

        {/* Description */}
        {service.description ? (
          <Text style={{ fontSize: 12, color: '#6b7280', lineHeight: 18, marginBottom: 10 }} numberOfLines={2}>
            {service.description}
          </Text>
        ) : null}

        {/* Action buttons */}
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {[
            { label: 'Edit',   icon: 'create-outline',          bg: '#156778', fn: () => openModal(service)        },
            { label: 'Toggle', icon: 'swap-horizontal-outline',  bg: '#059669', fn: () => toggleStatus(service)    },
            { label: 'Delete', icon: 'trash-outline',            bg: '#e11d48', fn: () => handleDelete(service._id) },
          ].map(({ label, icon, bg, fn }) => (
            <TouchableOpacity
              key={label}
              onPress={fn}
              activeOpacity={0.8}
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 4,
                backgroundColor: bg,
                paddingVertical: 8,
                borderRadius: 10,
              }}
            >
              <Icon name={icon} size={14} color="#fff" />
              <Text style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8f6f8' }} >

      {/* Header */}
      <View style={{ backgroundColor: '#e8f6f8', paddingHorizontal: H_PAD, paddingTop: 12, paddingBottom: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1f2937' }}>My Services</Text>
        <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>
          {services.length} Total
        </Text>
      </View>

      {/* Gender Filter */}
      <View style={{
        backgroundColor: '#e8f6f8',
        paddingHorizontal: H_PAD,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
      }}>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#6b7280', marginBottom: 8 }}>
          Filter by Gender
        </Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {['all', 'men', 'women', 'unisex'].map(g => {
            const active = genderFilter === g;
            return (
              <TouchableOpacity
                key={g}
                onPress={() => setGenderFilter(g)}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  paddingVertical: 7,
                  borderRadius: 10,
                  borderWidth: 1.5,
                  borderColor: active ? '#f43f5e' : '#e5e7eb',
                  backgroundColor: active ? '#f43f5e' : '#fff',
                }}
              >
                <Text style={{
                  fontSize: 12,
                  fontWeight: '700',
                  color: active ? '#fff' : '#6b7280',
                  textTransform: 'capitalize',
                }}>
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Error */}
      {error ? (
        <Text style={{ color: '#e11d48', textAlign: 'center', padding: 16 }}>{error}</Text>
      ) : null}

      {/* List */}
      {!loading && !error && (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: H_PAD, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Add Service button */}
          <TouchableOpacity
            onPress={() => openModal(null)}
            activeOpacity={0.85}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 8,
              backgroundColor: '#f43f5e',
              borderRadius: 12,
              paddingVertical: 12,
              marginBottom: 12,
            }}
          >
            <Icon name="add-circle-outline" size={18} color="#fff" />
            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 14 }}>Add Service</Text>
          </TouchableOpacity>

          {filteredServices.length === 0 ? (
            <View style={{ alignItems: 'center', paddingTop: 60 }}>
              <Icon name="cut-outline" size={52} color="#d1d5db" />
              <Text style={{ color: '#9ca3af', fontSize: 15, marginTop: 12, textAlign: 'center' }}>
                {genderFilter === 'all' ? 'No services yet' : `No ${genderFilter} services found`}
              </Text>
            </View>
          ) : (
            filteredServices.map(renderCard)
          )}
        </ScrollView>
      )}

      {/* ── Add / Edit Modal ──────────────────────────────────────────────── */}
      <Modal visible={modalVisible} animationType="slide" transparent={false}>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <ScrollView showsVerticalScrollIndicator={false}>

            {/* Modal header */}
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: H_PAD,
              paddingTop: 52,
              paddingBottom: 16,
              borderBottomWidth: 1,
              borderBottomColor: '#f3f4f6',
            }}>
              <Text style={{ fontSize: 20, fontWeight: '800', color: '#111827' }}>
                {editingService ? 'Edit Service' : 'Add Service'}
              </Text>
              <TouchableOpacity onPress={closeModal} style={{ padding: 4 }}>
                <Icon name="close-circle" size={28} color="#e11d48" />
              </TouchableOpacity>
            </View>

            {/* ── Basic Information ─────────────────────────────────────── */}
            <View style={{
              paddingHorizontal: H_PAD,
              paddingVertical: 20,
              borderBottomWidth: 1,
              borderBottomColor: '#f3f4f6',
            }}>
              <Text style={{ fontSize: 16, fontWeight: '800', color: '#1f2937', marginBottom: 14 }}>
                Basic Information
              </Text>

              <TextInput
                placeholder="Service Name *"
                placeholderTextColor="#9ca3af"
                style={{
                  borderWidth: 1,
                  borderColor: '#e5e7eb',
                  borderRadius: 12,
                  paddingHorizontal: 14,
                  paddingVertical: 11,
                  marginBottom: 12,
                  fontSize: 14,
                  color: '#111827',
                  backgroundColor: '#fafafa',
                }}
                value={form.name}
                onChangeText={v => setField('name', v)}
              />

              {/* Category Picker */}
              <Text style={{ fontSize: 12, fontWeight: '600', color: '#6b7280', marginBottom: 6 }}>
                Select Category *
              </Text>
              <View style={{
                borderWidth: 1,
                borderColor: '#e5e7eb',
                borderRadius: 12,
                backgroundColor: '#fafafa',
                overflow: 'hidden',
                marginBottom: 12,
              }}>
                <Picker
                  selectedValue={form.category}
                  onValueChange={v => setField('category', v)}
                >
                  <Picker.Item label="-- Select Category --" value="" />
                  {categories.map(cat => (
                    <Picker.Item
                      key={cat._id}
                      label={`${cat.name} (${cat.gender})`}
                      value={cat._id}
                    />
                  ))}
                </Picker>
              </View>

              {/* Selected category pill */}
              {form.category ? (() => {
                const cat    = categories.find(c => c._id === form.category);
                const gColor = getGenderColors(cat?.gender);
                return (
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                    backgroundColor: '#f0fdfa',
                    borderWidth: 1,
                    borderColor: '#99f6e4',
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 10,
                    marginBottom: 12,
                  }}>
                    <Icon name="information-circle-outline" size={15} color="#0d9488" />
                    <Text style={{ fontSize: 12, fontWeight: '700', color: '#0d9488' }}>{cat?.name}</Text>
                    <View style={{ backgroundColor: gColor.bg, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20 }}>
                      <Text style={{ fontSize: 10, fontWeight: '700', color: gColor.text, textTransform: 'uppercase' }}>
                        {cat?.gender}
                      </Text>
                    </View>
                  </View>
                );
              })() : null}

              {/* Price + Duration */}
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <TextInput
                  placeholder="Price (₹) *"
                  placeholderTextColor="#9ca3af"
                  keyboardType="numeric"
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: '#e5e7eb',
                    borderRadius: 12,
                    paddingHorizontal: 14,
                    paddingVertical: 11,
                    marginBottom: 12,
                    fontSize: 14,
                    color: '#111827',
                    backgroundColor: '#fafafa',
                  }}
                  value={form.price}
                  onChangeText={v => setField('price', v)}
                />
                <TextInput
                  placeholder="Duration (mins)"
                  placeholderTextColor="#9ca3af"
                  keyboardType="numeric"
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: '#e5e7eb',
                    borderRadius: 12,
                    paddingHorizontal: 14,
                    paddingVertical: 11,
                    marginBottom: 12,
                    fontSize: 14,
                    color: '#111827',
                    backgroundColor: '#fafafa',
                  }}
                  value={form.durationMins}
                  onChangeText={v => setField('durationMins', v)}
                />
              </View>

              <TextInput
                placeholder="Discount %"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
                style={{
                  borderWidth: 1,
                  borderColor: '#e5e7eb',
                  borderRadius: 12,
                  paddingHorizontal: 14,
                  paddingVertical: 11,
                  marginBottom: 12,
                  fontSize: 14,
                  color: '#111827',
                  backgroundColor: '#fafafa',
                }}
                value={form.discountPercent}
                onChangeText={v => setField('discountPercent', v)}
              />

              <TextInput
                placeholder="Description"
                placeholderTextColor="#9ca3af"
                multiline
                numberOfLines={3}
                style={{
                  borderWidth: 1,
                  borderColor: '#e5e7eb',
                  borderRadius: 12,
                  paddingHorizontal: 14,
                  paddingVertical: 11,
                  marginBottom: 12,
                  fontSize: 14,
                  color: '#111827',
                  backgroundColor: '#fafafa',
                  height: 80,
                  textAlignVertical: 'top',
                }}
                value={form.description}
                onChangeText={v => setField('description', v)}
              />

              {/* Service Mode */}
              <Text style={{ fontSize: 12, fontWeight: '600', color: '#6b7280', marginBottom: 8 }}>
                Service Mode *
              </Text>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                {['salon', 'home', 'both'].map(mode => {
                  const active  = form.serviceMode === mode;
                  const mColors = getModeColors(mode);
                  return (
                    <TouchableOpacity
                      key={mode}
                      onPress={() => setField('serviceMode', mode)}
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 4,
                        paddingVertical: 9,
                        borderRadius: 10,
                        borderWidth: 1.5,
                        borderColor: active ? '#156778' : '#e5e7eb',
                        backgroundColor: active ? '#156778' : '#fff',
                      }}
                    >
                      <Icon name={mColors.icon} size={13} color={active ? '#fff' : '#6b7280'} />
                      <Text style={{
                        fontSize: 12,
                        fontWeight: '700',
                        textTransform: 'capitalize',
                        color: active ? '#fff' : '#6b7280',
                      }}>
                        {mode}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* ── Add-ons ───────────────────────────────────────────────── */}
            <View style={{
              paddingHorizontal: H_PAD,
              paddingVertical: 20,
              borderBottomWidth: 1,
              borderBottomColor: '#f3f4f6',
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
                  <Text style={{ fontSize: 16, fontWeight: '800', color: '#1f2937' }}>Add-ons</Text>
                  <Text style={{ fontSize: 11, color: '#9ca3af', fontStyle: 'italic' }}>(Optional)</Text>
                </View>
                {!showAddOnForm && (
                  <TouchableOpacity
                    onPress={() => setShowAddOnForm(true)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 10,
                      borderWidth: 1.5,
                      borderColor: '#f43f5e',
                    }}
                  >
                    <Icon name="add-circle" size={16} color="#f43f5e" />
                    <Text style={{ fontSize: 12, fontWeight: '700', color: '#f43f5e' }}>Add</Text>
                  </TouchableOpacity>
                )}
              </View>

              {showAddOnForm && (
                <>
                  {form.addOns.map((addon, i) => (
                    <View
                      key={addon.id || i}
                      style={{
                        backgroundColor: '#fafafa',
                        borderWidth: 1,
                        borderColor: '#e5e7eb',
                        borderRadius: 14,
                        padding: 14,
                        marginBottom: 12,
                      }}
                    >
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                        <Text style={{ fontSize: 13, fontWeight: '700', color: '#156778' }}>
                          Add-on #{i + 1}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
                          <TouchableOpacity onPress={() => toggleRecommended(i)}>
                            <Icon
                              name={addon.isRecommended ? 'star' : 'star-outline'}
                              size={22}
                              color={addon.isRecommended ? '#f59e0b' : '#9ca3af'}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => removeAddOn(i)}>
                            <Icon name="trash" size={20} color="#e11d48" />
                          </TouchableOpacity>
                        </View>
                      </View>

                      <TextInput
                        placeholder="Add-on Name *"
                        placeholderTextColor="#9ca3af"
                        style={{
                          borderWidth: 1,
                          borderColor: '#e5e7eb',
                          borderRadius: 10,
                          paddingHorizontal: 12,
                          paddingVertical: 9,
                          marginBottom: 8,
                          fontSize: 13,
                          color: '#111827',
                          backgroundColor: '#fff',
                        }}
                        value={addon.name}
                        onChangeText={v => updateAddOn(i, 'name', v)}
                      />

                      <View style={{ flexDirection: 'row', gap: 8 }}>
                        <TextInput
                          placeholder="Price (₹) *"
                          placeholderTextColor="#9ca3af"
                          keyboardType="numeric"
                          style={{
                            flex: 1,
                            borderWidth: 1,
                            borderColor: '#e5e7eb',
                            borderRadius: 10,
                            paddingHorizontal: 12,
                            paddingVertical: 9,
                            fontSize: 13,
                            color: '#111827',
                            backgroundColor: '#fff',
                          }}
                          value={addon.price}
                          onChangeText={v => updateAddOn(i, 'price', v)}
                        />
                        <TextInput
                          placeholder="Duration (mins)"
                          placeholderTextColor="#9ca3af"
                          keyboardType="numeric"
                          style={{
                            flex: 1,
                            borderWidth: 1,
                            borderColor: '#e5e7eb',
                            borderRadius: 10,
                            paddingHorizontal: 12,
                            paddingVertical: 9,
                            fontSize: 13,
                            color: '#111827',
                            backgroundColor: '#fff',
                          }}
                          value={addon.duration}
                          onChangeText={v => updateAddOn(i, 'duration', v)}
                        />
                      </View>

                      {addon.isRecommended && (
                        <View style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 4,
                          backgroundColor: '#fef3c7',
                          borderWidth: 1,
                          borderColor: '#fde68a',
                          paddingHorizontal: 8,
                          paddingVertical: 3,
                          borderRadius: 20,
                          alignSelf: 'flex-start',
                          marginTop: 8,
                        }}>
                          <Icon name="star" size={11} color="#f59e0b" />
                          <Text style={{ fontSize: 11, fontWeight: '700', color: '#92400e' }}>Recommended</Text>
                        </View>
                      )}
                    </View>
                  ))}

                  <TouchableOpacity
                    onPress={addNewAddOn}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 8,
                      paddingVertical: 12,
                      borderRadius: 12,
                      borderWidth: 1.5,
                      borderColor: '#156778',
                      borderStyle: 'dashed',
                      backgroundColor: '#f0fdfa',
                    }}
                  >
                    <Icon name="add" size={18} color="#156778" />
                    <Text style={{ fontSize: 13, fontWeight: '700', color: '#156778' }}>
                      Add Another Add-on
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>

            {/* Modal actions */}
            <View style={{ flexDirection: 'row', gap: 10, paddingHorizontal: H_PAD, paddingVertical: 20, paddingBottom: 40 }}>
              <TouchableOpacity
                onPress={handleSave}
                activeOpacity={0.85}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 8,
                  backgroundColor: '#156778',
                  paddingVertical: 14,
                  borderRadius: 12,
                }}
              >
                <Icon name="checkmark-circle" size={18} color="#fff" />
                <Text style={{ color: '#fff', fontWeight: '700', fontSize: 14 }}>
                  {editingService ? 'Update Service' : 'Add Service'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={closeModal}
                activeOpacity={0.85}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 8,
                  backgroundColor: '#e11d48',
                  paddingVertical: 14,
                  borderRadius: 12,
                }}
              >
                <Icon name="close-circle" size={18} color="#fff" />
                <Text style={{ color: '#fff', fontWeight: '700', fontSize: 14 }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}