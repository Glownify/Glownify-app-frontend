// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import superAdminReducer from "./slices/superAdminSlice";
import salonAdminReducer from "./slices/salonAdminSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    superAdmin: superAdminReducer,
    salonAdmin: salonAdminReducer,
  },
});
