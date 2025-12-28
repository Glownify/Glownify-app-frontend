import AsyncStorage from '@react-native-async-storage/async-storage';

const CART_KEY = '@user_cart';

export const addToCart = async (salon, service) => {
    console.log("Adding to cart:", { salon, service });
  try {
    const existingCartData = await AsyncStorage.getItem(CART_KEY);
    let cart = existingCartData ? JSON.parse(existingCartData) : [];

    // Find if salon exists in cart
    const salonIndex = cart.findIndex(item => item.salonId === salon._id);

    if (salonIndex > -1) {
      // Salon exists: Check if service is already added
      const serviceExists = cart[salonIndex].services.find(s => s.id === service.id);
      if (!serviceExists) {
        cart[salonIndex].services.push(service);
      }
    } else {
      // New Salon: Add salon and the service
      cart.push({
        salonId: salon._id,
        salonName: salon.name,
        services: [service]
      });
    }

    // Save back to AsyncStorage
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
    return cart;
  } catch (error) {
    console.error("Error adding to cart", error);
  }
};

export const getCart = async () => {
  const data = await AsyncStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
};