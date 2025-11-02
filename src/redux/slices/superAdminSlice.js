import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// ==================== ASYNC THUNKS ====================

// 🔹 SALOONS
export const fetchAllSaloons = createAsyncThunk(
  "superAdmin/fetchAllSaloons",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/super-admin/getAllSaloons");
      return res.data.saloons;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching saloons");
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  "superAdmin/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/super-admin/get-all-users");
      return res.data.users;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching users");
    }
  }
);

// 🔹 CATEGORIES
export const fetchAllCategories = createAsyncThunk(
  "superAdmin/fetchAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/super-admin/getAllCategories");
      return res.data.categories;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching categories");
    }
  }
);

export const createCategory = createAsyncThunk(
  "superAdmin/createCategory",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/super-admin/create-category", data);
      return res.data.category;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error creating category");
    }
  }
);

export const updateCategory = createAsyncThunk(
  "superAdmin/updateCategory",
  async ({ categoryId, data }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(`/super-admin/update-category/${categoryId}`, data);
      return res.data.category;
    } catch (error) {
      console.log(error.response?.data?.message);
      return rejectWithValue(error.response?.data?.message || "Error updating category");
    }
  }
);

// 🔹 OFFERS
export const fetchAllOffers = createAsyncThunk(
  "superAdmin/fetchAllOffers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/super-admin/get-all-offers");
      return res.data.offers;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching offers");
    }
  }
);

export const createOffer = createAsyncThunk(
  "superAdmin/createOffer",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/super-admin/create-offer", data);
      return res.data.offer;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error creating offer");
    }
  }
);

export const updateOffer = createAsyncThunk(
  "superAdmin/updateOffer",
  async ({ offerId, data }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/super-admin/update-offer/${offerId}`, data);
      return res.data.offer;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error updating offer");
    }
  }
);

export const deleteOffer = createAsyncThunk(
  "superAdmin/deleteOffer",
  async (offerId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/super-admin/delete-offer/${offerId}`);
      return offerId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error deleting offer");
    }
  }
);

// ==================== SLICE ====================
const superAdminSlice = createSlice({
  name: "superAdmin",
  initialState: {
    saloons: [],
    users: [],
    categories: [],
    offers: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearSuperAdminError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // SALOONS
      .addCase(fetchAllSaloons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllSaloons.fulfilled, (state, action) => {
        state.loading = false;
        state.saloons = action.payload;
      })
      .addCase(fetchAllSaloons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // USERS
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CATEGORIES
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex(
          (c) => c._id === action.payload._id
        );
        if (index !== -1) state.categories[index] = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // OFFERS
      .addCase(fetchAllOffers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.offers = action.payload;
      })
      .addCase(fetchAllOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createOffer.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOffer.fulfilled, (state, action) => {
        state.loading = false;
        state.offers.push(action.payload);
      })
      .addCase(createOffer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOffer.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOffer.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.offers.findIndex(
          (o) => o._id === action.payload._id
        );
        if (index !== -1) state.offers[index] = action.payload;
      })
      .addCase(updateOffer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteOffer.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOffer.fulfilled, (state, action) => {
        state.loading = false;
        state.offers = state.offers.filter((o) => o._id !== action.payload);
      })
      .addCase(deleteOffer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSuperAdminError } = superAdminSlice.actions;
export default superAdminSlice.reducer;
