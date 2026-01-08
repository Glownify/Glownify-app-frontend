import AsyncStorage from '@react-native-async-storage/async-storage';
import { setCart, showCartPopup } from '../redux/slices/cartSlice';

const getCartKey = (userId) => `@user_cart_${userId || 'guest'}`;

/**
 * Add service to cart (user specific)
 */

export const addToCart = async (dispatch, userId, provider, service) => {
  try {
    const CART_KEY = getCartKey(userId);

    const existingCartData = await AsyncStorage.getItem(CART_KEY);
    let cart = existingCartData ? JSON.parse(existingCartData) : [];

    const providerIndex = cart.findIndex(
      item => item.providerId === provider._id
    );

    if (providerIndex > -1) {
      const serviceExists = cart[providerIndex].services.some(
        s => s._id === service._id
      );
      if (!serviceExists) {
        cart[providerIndex].services.push(service);
      }
    } else {
      cart.push({
        providerId: provider._id,
        providerName: provider.name,
        services: [service],
      });
    }

    dispatch(setCart(cart));
    dispatch(showCartPopup());

    await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
    return cart;
  } catch (error) {
    console.error('Error adding to cart', error);
    throw error;
  }
};

/**
 * Get cart for user
 */
export const getCart = async (userId) => {
  try {
    const CART_KEY = getCartKey(userId);
    const data = await AsyncStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting cart', error);
    return [];
  }
};


export const updateCartItem = async (userId, providerId, updates) => {
  try {
    const CART_KEY = getCartKey(userId);
    const data = await AsyncStorage.getItem(CART_KEY);
    let cart = data ? JSON.parse(data) : [];

    // Map through the cart and update the matching salon
    cart = cart.map(item => {
      if (item.providerId === providerId) {
        return { ...item, ...updates }; // Spread updates (date, time, etc.)
      }
      return item;
    });

    await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));

    return cart;
  } catch (error) {
    console.error('Error updating cart item', error);
    return [];
  }
};

/**
 * Clear cart (on logout / order success)
 */
export const clearCart = async (userId) => {
  try {
    const CART_KEY = getCartKey(userId);
    await AsyncStorage.removeItem(CART_KEY);
  } catch (error) {
    console.error('Error clearing cart', error);
  }
};
