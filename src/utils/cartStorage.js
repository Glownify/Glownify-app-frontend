import AsyncStorage from '@react-native-async-storage/async-storage';
import { setCart, showCartPopup } from '../redux/slices/cartSlice';

const getCartKey = (userId) => `@user_cart_${userId || 'guest'}`;

/**
 * ADD TO CART
 */
export const addToCart = async (dispatch, userId, provider, service, selectedMode) => {
  try {
    const CART_KEY = getCartKey(userId);
    const data = await AsyncStorage.getItem(CART_KEY);
    let cart = data ? JSON.parse(data) : [];

    const providerIndex = cart.findIndex(
      item => item.providerId === provider._id
    );

    const serviceWithMode = {
      ...service,
      selectedMode, // 🔥 PER SERVICE MODE
    };

    if (providerIndex > -1) {
      const serviceExists = cart[providerIndex].services.some(
        s => s._id === service._id && s.selectedMode === selectedMode
      );

      if (!serviceExists) {
        cart[providerIndex].services.push(serviceWithMode);
      }
    } else {
      cart.push({
        providerId: provider._id,
        providerName: provider.name,
        services: [serviceWithMode],
        selectedDate: null,
        selectedTime: null,
      });
    }

    await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
    dispatch(setCart(cart));
    dispatch(showCartPopup());

    return cart;
  } catch (error) {
    console.error('Add to cart error:', error);
    return [];
  }
};

/**
 * GET CART
 */
export const getCart = async (userId) => {
  try {
    const CART_KEY = getCartKey(userId);
    const data = await AsyncStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Get cart error:', error);
    return [];
  }
};

/**
 * UPDATE DATE / TIME
 */
export const updateCartItem = async (userId, providerId, updates) => {
  try {
    const CART_KEY = getCartKey(userId);
    const data = await AsyncStorage.getItem(CART_KEY);
    let cart = data ? JSON.parse(data) : [];

    cart = cart.map(item =>
      item.providerId === providerId
        ? { ...item, ...updates }
        : item
    );

    await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
    return cart;
  } catch (error) {
    console.error('Update cart error:', error);
    return [];
  }
};

/**
 * REMOVE PROVIDER FROM CART
 */
export const removeFromCart = async (userId, providerId) => {
  try {
    const CART_KEY = getCartKey(userId);
    const data = await AsyncStorage.getItem(CART_KEY);
    let cart = data ? JSON.parse(data) : [];

    cart = cart.filter(item => item.providerId !== providerId);

    await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
    return cart;
  } catch (error) {
    console.error('Remove cart error:', error);
    return [];
  }
};

/**
 * CLEAR CART
 */
export const clearCart = async (userId) => {
  try {
    const CART_KEY = getCartKey(userId);
    await AsyncStorage.removeItem(CART_KEY);
  } catch (error) {
    console.error('Clear cart error:', error);
  }
};
