import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    visible: false,
  },
  reducers: {
    setCart(state, action) {
      state.items = action.payload;
    },
    showCartPopup(state) {
      state.visible = true;
    },
    hideCartPopup(state) {
      state.visible = false;
    },
    clearCartState(state) {
      state.items = [];
      state.visible = false;
    }
  }
});

export const {
  setCart,
  showCartPopup,
  hideCartPopup,
  clearCartState
} = cartSlice.actions;

export default cartSlice.reducer;
